
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from "@/components/ui/accordion"

export default function AccordionSec() {


    return (
        <div className="container flex flex-col items-start text-start mx-auto p-6 mt-12 space-y-8 lg:space-y-12 lg:items-start">
            {/* header */}
            <div className="space-y-4">
                <h2 className="text-3xl font-bold text-primary md:text-3xl lg:text-4xl">
                    Frequently Asking Questions
                </h2>
                <p className="text-gray-500 md:text-xl lg:text-2xl">
                    Find answers to some of the most common questions we receive from our customers. if you don’t find what you are looking for, feel free to contact us directly.
                </p>
            </div>
            {/* faq */}
            <Accordion type="single" collapsible className=" w-full space-y-2 md:space-y-4 lg:space-y-6">
                <AccordionItem value="item-1">
                    <AccordionTrigger className="text-xl md:text-2xl lg:text-3xl">What services do you offer? </AccordionTrigger>
                    <AccordionContent className="text-gray-500 text-[18px] md:text-xl lg:text-2xl">
                        Glamora offer several essential services to provide a seamless and enjoyable shopping experience for customers.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger className="text-xl md:text-2xl lg:text-3xl">How can I find clothing that suits me?</AccordionTrigger>
                    <AccordionContent className="text-gray-500 text-[18px] md:text-xl lg:text-2xl">
                        We use advanced AI technology to recommend clothing based on your body type, preferences, and the latest fashion trends. Simply browse our collections, and our system will suggest the best pieces for you!
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                    <AccordionTrigger className="text-xl md:text-2xl lg:text-3xl">Can I try on clothes virtually before buying?</AccordionTrigger>
                    <AccordionContent className="text-gray-500 text-[18px] md:text-xl lg:text-2xl">
                        Yes! Our AI-powered virtual try-on lets you see how clothes will fit and look on you in real time. This feature ensures you make confident shopping decisions before making a purchase.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                    <AccordionTrigger className="text-xl md:text-2xl lg:text-3xl">How do I choose the right size?</AccordionTrigger>
                    <AccordionContent className="text-gray-500 text-[18px] md:text-xl lg:text-2xl">
                        No need to worry about size charts! Our AI-powered virtual fitting tool helps you find the perfect fit by analyzing your body shape and recommending the best size for you. Simply try on clothes virtually and see how they look on you before making a purchase.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5">
                    <AccordionTrigger className="text-xl md:text-2xl lg:text-3xl">What payment methods are available?</AccordionTrigger>
                    <AccordionContent className="text-gray-500 text-[18px] md:text-xl lg:text-2xl">
                        We offer multiple secure payment options to ensure a smooth shopping experience:<br />
                        PayPal for quick and safe transactions.<br />
                        Credit/Debit Cards (Visa, MasterCard, etc.) with the option to save your card for future purchases.<br />
                        Cash on Delivery (COD) for a hassle-free, pay-when-you-receive option.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-6">
                    <AccordionTrigger className="text-xl md:text-2xl lg:text-3xl">How can I contact customer service?</AccordionTrigger>
                    <AccordionContent className="text-gray-500 text-[18px] md:text-xl lg:text-2xl">
                        Our support team is always ready to help! You can reach us through:<br />
                        Live chat on our website<br />
                        Email support at [your support email]<br />
                        Social media channels for quick assistance
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    )
}