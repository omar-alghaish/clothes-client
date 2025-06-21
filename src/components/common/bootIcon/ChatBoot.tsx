"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { History, Plus, Send, X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
}

interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}

interface FashionChatBotProps {
  className?: string;
  height?: string;
  onClose?: () => void;
  apiKey?: string; // Gemini API key
}

const STORAGE_KEY = "fashion_chatbot_conversations";

export default function FashionChatBot({
  className,
  height = "600px",
  onClose,
  apiKey,
}: FashionChatBotProps) {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversationId, setCurrentConversationId] = useState<string>("");
  const [inputValue, setInputValue] = useState<string>("");
  const [showWelcome, setShowWelcome] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize with saved conversations or create default
  useEffect(() => {
    const savedConversations = localStorage.getItem(STORAGE_KEY);

    if (savedConversations) {
      try {
        const parsed = JSON.parse(savedConversations);
        // Convert string dates back to Date objects
        const formatted = parsed.map((conv: Conversation) => ({
          ...conv,
          createdAt: new Date(conv.createdAt),
          updatedAt: new Date(conv.updatedAt || conv.createdAt),
          messages: conv.messages.map((msg: Message) => ({
            ...msg,
            timestamp: new Date(msg.timestamp || Date.now()),
          })),
        }));
        setConversations(formatted);

        // Set the most recent conversation as current if it exists
        if (formatted.length > 0) {
          const latestConv = formatted.sort(
            (a: Conversation, b: Conversation) =>
              new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
          )[0];
          setCurrentConversationId(latestConv.id);
          setShowWelcome(false);
        }
      } catch (e) {
        console.error("Failed to parse saved conversations:", e);
        initializeDefaultConversation();
      }
    } else {
      initializeDefaultConversation();
    }
  }, []);

  // Save conversations to localStorage whenever they change
  useEffect(() => {
    if (conversations.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(conversations));
    }
  }, [conversations]);

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [conversations, currentConversationId]);

  const initializeDefaultConversation = () => {
    const welcomeMessage: Message = {
      id: "welcome-1",
      content: "Hello! I'm your fashion assistant. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    };

    const defaultConversation: Conversation = {
      id: Date.now().toString(),
      title: "Fashion Advice",
      messages: [welcomeMessage],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setConversations([defaultConversation]);
    setCurrentConversationId(defaultConversation.id);
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const getCurrentMessages = (): Message[] => {
    const conversation = conversations.find(
      (conv) => conv.id === currentConversationId,
    );
    return conversation?.messages || [];
  };

  // Function to call Gemini API
  const getGeminiResponse = async (
    prompt: string,
    conversationHistory: Message[]
  ): Promise<string> => {
    if (!apiKey) {
      return "API key not provided. Please configure your Gemini API key to get AI-powered responses.";
    }

    try {
      const formattedHistory = conversationHistory.map(msg => ({
        role: msg.sender === "user" ? "user" : "model",
        parts: [{ text: msg.content }]
      }));

      formattedHistory.push({
        role: "user",
        parts: [{ text: prompt }]
      });

      const systemPrompt = `You are a helpful and knowledgeable fashion assistant that helps users with style advice, outfit recommendations, and fashion tips. 
      
IMPORTANT RULES:
1. ONLY answer questions related to fashion, clothing, style, and appearance
2. If asked about non-fashion topics, politely redirect to fashion-related advice
3. Format your responses in a clean, easy-to-read format:
   - Use bullet points (•) for lists
   - Use double asterisks (**) for bold text
   - Use headings (starting with # ) for sections
4. Be friendly and personable
5. Always provide specific recommendations
6. Consider the user's budget, style preferences, body type, and occasion
7. Organize your response into logical sections with clear headings

Example response format:
# Wedding Outfit Recommendations

**Here are some great options for your wedding outfit:**

• Consider a classic black tuxedo for formal weddings
• For semi-formal events, a well-tailored suit works perfectly
• Accessorize with:
  • A silk pocket square
  • Classic black oxford shoes
  • A simple watch

**Would you like more specific recommendations based on your style preferences?**`;

      // Call Gemini API
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: systemPrompt }]
            },
            ...formattedHistory
          ],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          },
          safetySettings: [
            {
              category: "HARM_CATEGORY_HARASSMENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_HATE_SPEECH",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_DANGEROUS_CONTENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            }
          ]
        }),
      });

      const data = await response.json();

      if (data.error) {
        console.error("Gemini API error:", data.error);
        return "Sorry, I encountered an error. Please try again later.";
      }

      if (data.candidates && data.candidates[0]?.content?.parts && data.candidates[0].content.parts[0]?.text) {
        return data.candidates[0].content.parts[0].text;
      } else {
        return "I'm sorry, I couldn't generate a response. Please try again.";
      }
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      return "Sorry, there was an error communicating with the AI service. Please try again later.";
    }
  };

  // Fallback response if API fails or isn't configured
  const getFallbackResponse = (message: string): string => {
    const lowerMsg = message.toLowerCase();

    // Check if the message is about fashion/clothing
    const fashionKeywords = ['clothes', 'fashion', 'outfit', 'dress', 'shirt', 'pants', 'shoes', 'style', 'wear', 'accessories', 'jewelry', 'makeup', 'beauty', 'appearance'];
    const isFashionRelated = fashionKeywords.some(keyword => lowerMsg.includes(keyword));

    if (!isFashionRelated) {
      return "# Fashion Focus\n\nI'm your fashion assistant, and I'd be happy to help you with any questions about:\n\n• **Clothing and outfits**\n• **Style advice**\n• **Fashion trends**\n• **Accessories and jewelry**\n• **Beauty and appearance**\n\nPlease ask me anything related to fashion and style!";
    }

    // Existing fashion-related responses
    if (lowerMsg.includes("wedding")) {
      return "# Wedding Outfit Recommendations\n\nTo give you the best suggestions for a wedding outfit, I need a few details:\n\n• **Dress code** of the wedding (formal, semi-formal, casual)\n• **Venue type** (indoor, outdoor, beach, etc.)\n• **Season and time** of the wedding\n• **Your relationship** to the couple\n• **Your personal style** preferences\n• **Budget** you're working with\n\nOnce you provide these details, I can give you specific recommendations tailored to your needs!";
    } else if (lowerMsg.includes("green shirt")) {
      return "# Styling a Green Shirt\n\n**Here are some great ways to style your green shirt:**\n\n• Pair with blue or white jeans for a fresh, casual look\n• Add white sneakers for daytime or nude heels for evening\n• Accessorize with:\n  • A simple watch\n  • A crossbody bag\n  • Minimal jewelry\n\n**What's the shade of green?** And is it a t-shirt, button-down, or something else?";
    } else if (lowerMsg.includes("jeans") || lowerMsg.includes("denim")) {
      return "# Styling Jeans\n\n**Jeans are incredibly versatile pieces!**\n\n• **For a casual look:**\n  • Pair with a t-shirt or sweater\n  • Add sneakers or casual boots\n  • Finish with a denim or leather jacket\n\n• **For an elevated style:**\n  • Wear with a button-down shirt or blouse\n  • Choose loafers, ankle boots, or heels\n  • Add a blazer or structured jacket\n\n**What style of jeans do you have?** Knowing the cut and wash would help me give you more specific advice.";
    } else if (lowerMsg.includes("dress") || lowerMsg.includes("formal")) {
      return "# Formal Outfit Recommendations\n\n**For formal occasions, consider these elegant options:**\n\n• A tailored dress in classic colors like:\n  • Black\n  • Navy\n  • Burgundy\n  • Emerald green\n\n• **Complete the look with:**\n  • Elegant heels (3-4 inches for comfort)\n  • Minimal, sophisticated jewelry\n  • A structured clutch or small bag\n\n**Would you like recommendations based on your body type or specific formal event?**";
    }

    return "# Fashion Assistance\n\nI'd be happy to help with your fashion needs! To provide the best recommendations, I need to know:\n\n• **What specific item** are you looking to style?\n• **What's the occasion** you're dressing for?\n• **What's your personal style** preference?\n\nLet me know these details, and I'll suggest some trendy pieces and outfit combinations just for you!";
  };

  const handleSendMessage = async (message?: string) => {
    const messageContent = message || inputValue.trim();
    if ((!messageContent && !showWelcome) || isLoading) return;

    const timestamp = new Date();

    // Clear input immediately for better UX
    setInputValue("");
    setIsLoading(true);
    setIsTyping(true);

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: messageContent,
      sender: "user",
      timestamp: timestamp,
    };

    let currentConv: Conversation;
    let currentConvMessages: Message[] = [];

    if (showWelcome || !currentConversationId) {
      // Create a new conversation if we're on the welcome screen
      const welcomeMessage: Message = {
        id: "welcome-1",
        content: "Hello! I'm your fashion assistant. How can I help you today?",
        sender: "bot",
        timestamp: new Date(),
      };

      const newConversation: Conversation = {
        id: Date.now().toString(),
        title: generateConversationTitle(messageContent),
        messages: [welcomeMessage, userMessage],
        createdAt: timestamp,
        updatedAt: timestamp,
      };

      // Update state immediately
      setShowWelcome(false);
      setCurrentConversationId(newConversation.id);
      setConversations(prev => [...prev, newConversation]);

      currentConv = newConversation;
      currentConvMessages = [welcomeMessage, userMessage];
    } else {
      // Add to existing conversation
      const updatedConversations = conversations.map((conv) =>
        conv.id === currentConversationId
          ? {
            ...conv,
            messages: [...conv.messages, userMessage],
            updatedAt: timestamp
          }
          : conv
      );

      setConversations(updatedConversations);

      currentConv = updatedConversations.find(conv => conv.id === currentConversationId)!;
      currentConvMessages = currentConv.messages;
    }

    try {
      // Get conversation history for context (limited to last 10 messages)
      const conversationHistory = currentConvMessages.slice(-10);

      // Get response from Gemini API or fallback
      let botResponseText;
      try {
        botResponseText = await getGeminiResponse(userMessage.content, conversationHistory);
      } catch (error) {
        console.error("Error getting AI response:", error);
        botResponseText = getFallbackResponse(userMessage.content);
      }

      // Add bot response
      const botMessage: Message = {
        id: Date.now().toString(),
        content: botResponseText,
        sender: "bot",
        timestamp: new Date(),
      };

      // Update conversations with bot response - ensure this is using the LATEST state
      setConversations(prevConversations => {
        return prevConversations.map(conv => {
          if (conv.id === (currentConv.id)) {
            return {
              ...conv,
              messages: [...conv.messages, botMessage],
              updatedAt: new Date()
            };
          }
          return conv;
        });
      });
    } catch (error) {
      console.error("Error in send message flow:", error);

      // Add error response if something went wrong
      const errorMessage: Message = {
        id: Date.now().toString(),
        content: "Sorry, I encountered an error. Please try again.",
        sender: "bot",
        timestamp: new Date(),
      };

      setConversations(prevConversations => {
        return prevConversations.map(conv => {
          if (conv.id === (currentConv.id)) {
            return {
              ...conv,
              messages: [...conv.messages, errorMessage],
              updatedAt: new Date()
            };
          }
          return conv;
        });
      });
    } finally {
      setIsLoading(false);
      // Add a small delay before hiding typing indicator for better UX
      setTimeout(() => {
        setIsTyping(false);
      }, 500);
    }
  };

  const generateConversationTitle = (message: string): string => {
    // Generate a conversation title based on the first message
    if (message.length <= 20) return message;
    return message.substring(0, 20) + "...";
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const startNewChat = () => {
    setCurrentConversationId("");
    setShowWelcome(true);
  };

  const switchConversation = (conversationId: string) => {
    setCurrentConversationId(conversationId);
    setShowWelcome(false);
  };

  const deleteConversation = (e: React.MouseEvent, conversationId: string) => {
    e.stopPropagation();

    setConversations((prev) =>
      prev.filter((conv) => conv.id !== conversationId),
    );

    if (conversationId === currentConversationId) {
      if (conversations.length > 1) {
        // Switch to another conversation
        const otherConv = conversations.find(
          (conv) => conv.id !== conversationId,
        );
        if (otherConv) {
          setCurrentConversationId(otherConv.id);
        } else {
          setShowWelcome(true);
        }
      } else {
        setShowWelcome(true);
      }
    }
  };

  const formatDate = (date: Date): string => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Fix for asterisks in markdown
  const formatMessageContent = (content: string) => {
    // First, replace double asterisks with <strong> tags
    const formattedContent = content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

    // Now split by lines and render appropriately
    return formattedContent.split("\n").map((text, i) => {
      // Check if text is a bullet point (starts with * or •)
      if (text.trim().startsWith('*') || text.trim().startsWith('•')) {
        return (
          <div key={i} className="flex items-start gap-2 my-1">
            <div className="min-w-4 mt-1">•</div>
            <p className="text-sm sm:text-base flex-1"
              dangerouslySetInnerHTML={{
                __html: text.trim().replace(/^[*•]\s*/, '')
              }}
            />
          </div>
        );
      }
      // Check if text is a heading (starts with #)
      else if (text.trim().startsWith('#')) {
        const matchResult = text.trim().match(/^#+/);
        const level = matchResult ? matchResult[0].length : 1;
        const content = text.trim().replace(/^#+\s*/, '');
        return (
          <p key={i} className={`font-bold text-sm sm:text-base ${level === 1 ? 'text-lg sm:text-xl' : ''} my-1`}
            dangerouslySetInnerHTML={{ __html: content }}
          />
        );
      }
      // Normal text
      else {
        return (
          <p key={i} className="text-sm sm:text-base my-1"
            dangerouslySetInnerHTML={{ __html: text }}
          />
        );
      }
    });
  };

  return (
    <div
      className={cn(
        "flex flex-col bg-white rounded-lg overflow-hidden",
        className,
      )}
      style={{ height }}
    >
      <header className="p-3 border-b flex justify-between items-center">
        <h1 className="text-xl font-bold">Fashion Assistant</h1>
        <div className="flex gap-2">
          <Button size="sm" onClick={startNewChat} className="h-8">
            <Plus className="h-4 w-4 mr-1" />
            <span className="hidden sm:inline">New Chat</span>
          </Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="h-8">
                <History className="h-4 w-4 mr-1" />
                <span className="hidden sm:inline">History</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle>Chat History</SheetTitle>
              </SheetHeader>
              <div className="py-4">
                <ScrollArea className="h-[calc(100vh-100px)]">
                  {conversations.length === 0 ? (
                    <p className="text-center text-gray-500 p-4">
                      No conversations yet
                    </p>
                  ) : (
                    <div className="space-y-2">
                      {conversations
                        .sort(
                          (a, b) =>
                            new Date(b.updatedAt).getTime() -
                            new Date(a.updatedAt).getTime(),
                        )
                        .map((conv) => (
                          <div
                            key={conv.id}
                            onClick={() => switchConversation(conv.id)}
                            className={cn(
                              "p-3 rounded-lg flex justify-between items-center cursor-pointer hover:bg-gray-100",
                              currentConversationId === conv.id
                                ? "bg-gray-100"
                                : "",
                            )}
                          >
                            <div className="flex flex-col truncate">
                              <p className="font-medium truncate">
                                {conv.title}
                              </p>
                              <p className="text-xs text-gray-500">
                                {formatDate(conv.updatedAt)}
                              </p>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={(e) => deleteConversation(e, conv.id)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                    </div>
                  )}
                </ScrollArea>
              </div>
            </SheetContent>
          </Sheet>

          {onClose && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </header>

      <div className="flex-1 overflow-auto p-4">
        {showWelcome ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <h2 className="text-xl font-bold mb-1 sm:text-2xl">Welcome to</h2>
            <h1 className="text-2xl font-bold mb-3 sm:text-3xl sm:mb-4">
              your fashion assistant!
            </h1>
            <p className="text-gray-500 text-sm mb-1 sm:text-base">
              Not sure what to wear or buy?
            </p>
            <p className="text-gray-500 text-sm mb-6 sm:text-base">
              I can suggest trendy pieces just for you. Let&apos;s find your
              perfect look!
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full mb-6">
              <Card className="p-2 sm:p-4 hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-2 text-center sm:p-4">
                  <h3 className="text-base text-muted-foreground font-extrabold mb-2 sm:text-lg">
                    Event Styling
                  </h3>
                  <p className="text-gray-500 text-xs sm:text-sm">
                    Wedding, party, and formal event outfits
                  </p>
                </CardContent>
              </Card>

              <Card className="p-2 sm:p-4 hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-2 text-center sm:p-4">
                  <h3 className="text-base text-muted-foreground font-extrabold mb-2 sm:text-lg">
                    Wardrobe Styling
                  </h3>
                  <p className="text-gray-500 text-xs sm:text-sm">
                    Create outfits from your existing clothes
                  </p>
                </CardContent>
              </Card>

              <Card className="p-2 sm:p-4 hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-2 text-muted-foreground font-extrabold text-center sm:p-4">
                  <h3 className="text-base mb-2 sm:text-lg">
                    Shopping Advice
                  </h3>
                  <p className="text-gray-500 text-xs sm:text-sm">
                    Find perfect pieces for your style and budget
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="w-full max-w-md mb-6">
              <Card
                className="p-3 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => handleSendMessage("What should I wear to a wedding?")}
              >
                <CardContent className="p-1 text-center">
                  <p className="text-sm text-blue-600">
                    &quot;What should I wear to a wedding?&quot;
                  </p>
                </CardContent>
              </Card>
            </div>

            <p className="text-gray-500 text-xs sm:text-sm">
              Start a conversation or click a suggestion to get personalized fashion advice
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {getCurrentMessages().map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-xl px-3 py-2 sm:px-4 sm:py-3 ${message.sender === "user"
                      ? "bg-blue-100 text-black ml-4"
                      : "bg-gray-100 text-black mr-4"
                    }`}
                >
                  <div className="formatted-message">
                    {formatMessageContent(message.content)}
                  </div>
                  <p className="text-xs text-gray-400 mt-1">
                    {formatDate(message.timestamp)}
                  </p>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="max-w-[85%] rounded-xl px-3 py-2 sm:px-4 sm:py-3 bg-gray-100 text-black mr-4">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      <div className="p-3 border-t">
        <div className="flex gap-2 w-full">
          <div className="flex-1">
            <Input
              type="text"
              placeholder={isLoading ? "AI is thinking..." : "Ask about fashion advice..."}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              className="rounded-xl flex-1 text-sm"
              disabled={isLoading}
            />
          </div>
          <Button
            onClick={() => handleSendMessage()}
            size="icon"
            variant="ghost"
            className="h-9 w-9"
            disabled={isLoading || !inputValue.trim()}
          >
            <Send className={cn("h-5 w-5", isLoading && "animate-pulse")} />
          </Button>
        </div>
      </div>
    </div>
  );
}