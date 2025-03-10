// // src/app/page.tsx
// "use client";

// import { useState, useRef, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Card, CardContent } from "@/components/ui/card";
// import { History, Plus, Send } from "lucide-react";

// interface Message {
//   id: string;
//   content: string;
//   sender: 'user' | 'bot';
// }

// export default function ChatInterface() {
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [inputValue, setInputValue] = useState<string>("");
//   const [showWelcome, setShowWelcome] = useState<boolean>(true);
//   const messagesEndRef = useRef<HTMLDivElement>(null);

//   // Sample initial messages for the demo
//   useEffect(() => {
//     if (messages.length === 0) {
//       // This mimics a new conversation start
//       setMessages([
//         {
//           id: '1',
//           content: 'Can you help me?',
//           sender: 'user'
//         },
//         {
//           id: '2',
//           content: 'Sure! What do you need help with?',
//           sender: 'bot'
//         }
//       ]);
//     }
//   }, []);

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   const handleSendMessage = () => {
//     if (!inputValue.trim()) return;

//     // Add user message
//     const userMessage: Message = {
//       id: Date.now().toString(),
//       content: inputValue,
//       sender: 'user'
//     };

//     setMessages(prev => [...prev, userMessage]);
//     setInputValue("");
//     setShowWelcome(false);

//     // Simulate bot response
//     setTimeout(() => {
//       const botResponse = getBotResponse(inputValue);
//       const botMessage: Message = {
//         id: (Date.now() + 1).toString(),
//         content: botResponse,
//         sender: 'bot'
//       };
//       setMessages(prev => [...prev, botMessage]);
//     }, 500);
//   };

//   const getBotResponse = (message: string): string => {
//     const lowerMsg = message.toLowerCase();

//     if (lowerMsg.includes('green shirt')) {
//       return "You can style your green shirt with blue or white jeans for a fresh look, and pair it with white sneakers or nude heels depending on the occasion. Add simple accessories like a watch, a crossbody bag, and minimal jewelry to complete the outfit!\n\nWhat's the shade of green? And is it a t-shirt, button-down, or something else?";
//     }

//     return "I can suggest trendy pieces just for you. Let's find your perfect look! What specific fashion item are you interested in styling?";
//   };

//   const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === 'Enter') {
//       handleSendMessage();
//     }
//   };

//   const startNewChat = () => {
//     setMessages([]);
//     setShowWelcome(true);
//   };

//   return (
//     <div className="max-w-4xl mx-auto h-screen flex flex-col">
//       <header className="p-4 border-b flex justify-between items-center">
//         <h1 className="text-2xl font-bold">ChatBot</h1>
//         <div className="flex gap-2">
//           <Button variant="outline" onClick={startNewChat}>
//             <Plus className="h-5 w-5 mr-2" />
//             New Chat
//           </Button>
//           <Button variant="outline">
//             <History className="h-5 w-5 mr-2" />
//             History
//           </Button>
//         </div>
//       </header>

//       <div className="flex-1 overflow-auto p-4">
//         {showWelcome ? (
//           <div className="flex flex-col items-center justify-center h-full text-center">
//             <h2 className="text-3xl font-bold mb-2">Welcome to</h2>
//             <h1 className="text-4xl font-bold mb-6">your fashion assistant!</h1>
//             <p className="text-gray-500 mb-2">Not sure what to buy?</p>
//             <p className="text-gray-500 mb-8">I can suggest trendy pieces just for you. Let's find your perfect look</p>

//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl mb-8">
//               <Card className="p-6">
//                 <CardContent className="p-6 text-center">
//                   <h3 className="text-xl font-medium mb-4">Answer all your questions</h3>
//                   <p className="text-gray-500">(Just ask me anything you like)</p>
//                 </CardContent>
//               </Card>

//               <Card className="p-6">
//                 <CardContent className="p-6 text-center">
//                   <h3 className="text-xl font-medium mb-4">Personalized Style Recommendations</h3>
//                   <p className="text-gray-500">Suggest outfits based on the user's preferences, occasion, or weather</p>
//                 </CardContent>
//               </Card>

//               <Card className="p-6">
//                 <CardContent className="p-6 text-center">
//                   <h3 className="text-xl font-medium mb-4">Size & Fit Assistance</h3>
//                   <p className="text-gray-500">Help users find the perfect size by analyzing their measurements or usual sizes in other brands.</p>
//                 </CardContent>
//               </Card>
//             </div>

//             <p className="text-gray-500">These are just a few examples of what i can do</p>
//           </div>
//         ) : (
//           <div className="space-y-4">
//             {messages.map((message) => (
//               <div
//                 key={message.id}
//                 className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
//               >
//                 <div
//                   className={`max-w-[80%] rounded-3xl px-4 py-3 ${
//                     message.sender === 'user'
//                       ? 'bg-gray-100 text-black ml-4'
//                       : 'bg-gray-200 text-black mr-4'
//                   }`}
//                 >
//                   {message.content.split('\n').map((text, i) => (
//                     <p key={i}>{text}</p>
//                   ))}
//                 </div>
//               </div>
//             ))}
//             <div ref={messagesEndRef} />
//           </div>
//         )}
//       </div>

//       <div className="p-4 border-t">
//         <div className="flex gap-2 w-full ">
//             <div className="flex-1">
//                <Input
//             type="text"
//             placeholder="Ask any thing ...."
//             value={inputValue}
//             onChange={(e) => setInputValue(e.target.value)}
//             onKeyPress={handleKeyPress}
//             className="rounded-xl flex-1"
//           />
//             </div>

//           <Button
//             onClick={handleSendMessage}
//             size="icon"
//             variant="ghost"
//           >
//             <Send className="h-5 w-5" />
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// }

// src/components/FashionChatBot.tsx
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
}

interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
}

interface FashionChatBotProps {
  className?: string;
  height?: string;
  onClose?: () => void;
}

const STORAGE_KEY = "fashion_chatbot_conversations";

export default function FashionChatBot({
  className,
  height = "600px",
  onClose,
}: FashionChatBotProps) {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversationId, setCurrentConversationId] =
    useState<string>("");
  const [inputValue, setInputValue] = useState<string>("");
  const [showWelcome, setShowWelcome] = useState<boolean>(true);
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
        }));
        setConversations(formatted);

        // Set the most recent conversation as current if it exists
        if (formatted.length > 0) {
          const latestConv = formatted.sort(
            (a: Conversation, b: Conversation) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
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
  }, []);

  const initializeDefaultConversation = () => {
    const defaultConversation: Conversation = {
      id: Date.now().toString(),
      title: "Fashion Advice",
      messages: [
        {
          id: "1",
          content: "Can you help me?",
          sender: "user",
        },
        {
          id: "2",
          content: "Sure! What do you need help with?",
          sender: "bot",
        },
      ],
      createdAt: new Date(),
    };

    setConversations([defaultConversation]);
    setCurrentConversationId(defaultConversation.id);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const getCurrentMessages = (): Message[] => {
    if (!currentConversationId || showWelcome) return [];
    const conversation = conversations.find(
      (conv) => conv.id === currentConversationId,
    );
    return conversation?.messages || [];
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
    };

    if (showWelcome || !currentConversationId) {
      // Create a new conversation if we're on the welcome screen
      const newConversation: Conversation = {
        id: Date.now().toString(),
        title: generateConversationTitle(inputValue),
        messages: [userMessage],
        createdAt: new Date(),
      };

      setConversations((prev) => [...prev, newConversation]);
      setCurrentConversationId(newConversation.id);
      setShowWelcome(false);
    } else {
      // Add to existing conversation
      setConversations((prev) =>
        prev.map((conv) =>
          conv.id === currentConversationId
            ? { ...conv, messages: [...conv.messages, userMessage] }
            : conv,
        ),
      );
    }

    setInputValue("");

    // Simulate bot response
    setTimeout(() => {
      const botResponse = getBotResponse(inputValue);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: botResponse,
        sender: "bot",
      };

      setConversations((prev) =>
        prev.map((conv) =>
          conv.id === currentConversationId
            ? { ...conv, messages: [...conv.messages, botMessage] }
            : conv,
        ),
      );
    }, 500);
  };

  const generateConversationTitle = (message: string): string => {
    // Generate a conversation title based on the first message
    if (message.length <= 20) return message;
    return message.substring(0, 20) + "...";
  };

  const getBotResponse = (message: string): string => {
    const lowerMsg = message.toLowerCase();

    if (lowerMsg.includes("green shirt")) {
      return "You can style your green shirt with blue or white jeans for a fresh look, and pair it with white sneakers or nude heels depending on the occasion. Add simple accessories like a watch, a crossbody bag, and minimal jewelry to complete the outfit!\n\nWhat's the shade of green? And is it a t-shirt, button-down, or something else?";
    }

    return "I can suggest trendy pieces just for you. Let's find your perfect look! What specific fashion item are you interested in styling?";
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

  return (
    <div
      className={cn(
        "flex flex-col bg-white rounded-lg overflow-hidden",
        className,
      )}
      style={{ height }}
    >
      <header className="p-3 border-b flex justify-between items-center">
        <h1 className="text-xl font-bold">ChatBot</h1>
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
                            new Date(b.createdAt).getTime() -
                            new Date(a.createdAt).getTime(),
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
                              <p className="text-sm text-gray-500">
                                {formatDate(conv.createdAt)}
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
              Not sure what to buy?
            </p>
            <p className="text-gray-500 text-sm mb-6 sm:text-base">
              I can suggest trendy pieces just for you. Let&apos;s find your
              perfect look
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full mb-6">
              <Card className="p-2 sm:p-4">
                <CardContent className="p-2 text-center sm:p-4">
                  <h3 className="text-base text-muted-foreground font-extrabold  mb-2 sm:text-lg">
                    Answer all your questions
                  </h3>
                  <p className="text-gray-500 text-xs sm:text-sm">
                    (Just ask me anything you like)
                  </p>
                </CardContent>
              </Card>

              <Card className="p-2 sm:p-4">
                <CardContent className="p-2 text-center sm:p-4">
                  <h3 className="text-base text-muted-foreground font-extrabold  mb-2 sm:text-lg">
                    Personalized Style
                  </h3>
                  <p className="text-gray-500 text-xs sm:text-sm">
                    Based on preferences, occasion, or weather
                  </p>
                </CardContent>
              </Card>

              <Card className="p-2 sm:p-4">
                <CardContent className="p-2 text-muted-foreground font-extrabold text-center sm:p-4">
                  <h3 className="text-base  mb-2 sm:text-lg">
                    Size & Fit Assistance
                  </h3>
                  <p className="text-gray-500 text-xs sm:text-sm">
                    Find your perfect size across brands
                  </p>
                </CardContent>
              </Card>
            </div>

            <p className="text-gray-500 text-xs sm:text-sm">
              These are just a few examples of what I can do
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
                  className={`max-w-[85%] rounded-xl px-3 py-2 sm:px-4 sm:py-3 ${
                    message.sender === "user"
                      ? "bg-gray-100 text-black ml-4"
                      : "bg-gray-200 text-black mr-4"
                  }`}
                >
                  {message.content.split("\n").map((text, i) => (
                    <p key={i} className="text-sm sm:text-base">
                      {text}
                    </p>
                  ))}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      <div className="p-3 border-t">
        <div className="flex gap-2 w-full">
          <div className="flex-1">
            <Input
              type="text"
              placeholder="Ask any thing ...."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              className="rounded-xl flex-1 text-sm"
            />
          </div>
          <Button
            onClick={handleSendMessage}
            size="icon"
            variant="ghost"
            className="h-9 w-9"
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
