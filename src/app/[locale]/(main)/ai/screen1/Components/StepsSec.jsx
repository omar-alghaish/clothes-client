import Image from "next/image";

export default function StepsSec() {
    return (
        <section className="mx-auto mt-16 space-y-10 px-4 md:px-8 lg:px-16">
            {/* Section Title */}
            <h2 className="text-center text-3xl font-bold text-primary md:text-4xl lg:text-5xl lg:text-start">
                Why You’ll Love AI in Shopping
            </h2>

            {/* Steps Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 lg:gap-10 max-w-[1600px] mx-auto">
                {stepsData.map(({ id, title, description, bgColor }) => (
                    <div
                        key={id}
                        className={`relative flex flex-col justify-between w-full max-w-[380px] h-[320px] mx-auto rounded-xl p-6 shadow-lg ${bgColor}`}
                    >
                        {/* Step Number */}
                        <div className="absolute top-4 right-4 flex items-center justify-center w-16 h-16 rounded-full text-primary text-4xl font-bold">
                            {id}
                        </div>

                        {/* Step Content */}
                        <div className="mt-16 space-y-4">
                            <h3 className="text-xl font-bold text-primary">{title}</h3>
                            <p className="text-base text-gray-600">{description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

// Step Data
const stepsData = [
    {
        id: "01",
        title: "Perfect Fit Every Time",
        description: "No more guessing sizes or worrying about returns. Our AI ensures you pick the right size based on your body shape.",
        bgColor: "bg-gray-400",
    },
    {
        id: "02",
        title: "Save Time and Effort",
        description: "Forget about endless trips to fitting rooms or the hassle of returning items that don’t fit. Everything you need is just a few clicks away.",
        bgColor: "bg-gray-300",
    },
    {
        id: "03",
        title: "Boost Your Confidence",
        description: "See how the clothes match your style and personality before buying. This way, you’ll always step out feeling your best.",
        bgColor: "bg-gray-200",
    },
    {
        id: "04",
        title: "Eco-Friendly Shopping",
        description: "By reducing unnecessary returns, you’re helping the environment by cutting down on waste and shipping emissions.",
        bgColor: "bg-gray-100",
    },
];
