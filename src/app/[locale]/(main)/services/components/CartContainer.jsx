import Cart from "./Cart";
import Cart2 from './Cart2'
import { Bot, Filter, ScanEye, ShoppingBag, ShoppingCart } from "lucide-react";

const cartItems = [
    { content: "The website showcases clothing beautifully, highlighting each piece with stunning visuals to give you the best shopping experience.", icon: ShoppingCart },
    { content: "The website displays clothing through easy-to-browse categories, making it simple to find exactly what you’re looking for.", icon: Filter },
    { content: "The website offers personalized suggestions based on your choices, helping you discover styles that suit you best.", icon: ShoppingBag },
    { content: "The website allows you to track your order, keeping you updated on its status every step of the way.", icon: ScanEye },
    { content: "The website includes an AI feature where you can upload your photo to see how the clothes would look on you.", icon: Bot },
];

export default function CartContainer() {
    return (
        <div className="lg:space-y-4 mt-10">
            {/* First Row - 2 Items in a Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 ">
                {cartItems.slice(0, 2).map((item, index) => (
                    <div key={index} className="w-full">
                        <Cart content={item.content} icon={item.icon} />
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3">
                {cartItems.slice(2, 5).map((item, index) => (
                    <div key={index} className="w-full">
                        <Cart2 content={item.content} icon={item.icon} />
                    </div>
                ))}
            </div>
        </div>
    );
}
