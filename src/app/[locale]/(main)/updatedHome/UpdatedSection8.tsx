
"use client";
import Image from "next/image";
import b1 from "../../../../assets/backgrounds/b2.png";
import b2 from "../../../../assets/backgrounds/b3.png";
import b3 from "../../../../assets/images/shirt.jpeg";
import b4 from '../../../../assets/images/dress.jpeg'
import Link from "next/link";




const categories = [
    {
        men: [
            'male-shirt',
            'male-pants',
            'male-shoes',
            'male-jacket',
        ],
    },
    {
        female: [
            'female-shirt',
            'female-pants',
            'female-shoes',
            'female-jacket',
        ],
    },
]


const getQueryString = (categoryArray: string[]) =>
    categoryArray.map((cat) => `category=${encodeURIComponent(cat)}`).join('&')

const menCategories = categories.find((item) => item.men)?.men || []
const femaleCategories = categories.find((item) => item.female)?.female || []
const menHref = `/shop?${getQueryString(menCategories)}`
const femaleHref = `/shop?${getQueryString(femaleCategories)}`
const menShirtsHref = `/shop?category=male-shirt`
const femaleDressHref = `/shop?category=female-dress`

export const menPantsHref = `/shop?category=male-pants`



const UpdatedSection8 = () => {
    return (
        <section className="container mx-auto px-4 py-10">
            <div className="flex flex-col md:flex-row gap-6 h-auto md:h-[110vh] overflow-hidden">
                {/* Left Large Item */}
                <div className="w-full md:w-[40%] h-[60vh] md:h-full relative">
                    <Image
                        src={b2.src}
                        alt="Men Fashion"
                        width={500}
                        height={700}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute top-5 right-5 text-forground w-[200px]">
                        <p className="text-sm opacity-75">Men&apos;s Power</p>
                        <h2 className="text-2xl font-bold">Where Dreams Meet Couture</h2>
                        <Link href={menHref}>
                            <button className="mt-2 px-4 py-2 bg-black text-white text-sm">Shop Now</button>
                        </Link>
                    </div>
                </div>

                {/* Right Grid */}
                <div className="flex-1 flex flex-col gap-6">
                    {/* Top Right */}
                    <div className="relative h-[40vh] md:h-[50%]">
                        <Image
                            src={b1.src}
                            alt="Women Fashion"
                            width={500}
                            height={350}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-5 left-5 text-forground w-[200px]">
                            <p className="text-sm opacity-75">Women&apos;s Softness</p>
                            <h2 className="text-2xl font-bold">Enchanting Styles for Every Women</h2>
                            <Link href={femaleHref}>
                                <button className="mt-2 px-4 py-2 bg-black text-white text-sm">Shop Now</button>
                            </Link>
                        </div>
                    </div>

                    {/* Bottom Right Grid */}
                    <div className="flex flex-col md:flex-row gap-6 h-auto md:h-[50%]">
                        {/* Bottom Left */}
                        <div className="relative w-full md:w-[50%] h-[40vh] md:h-full">
                            <Image
                                src={b3.src}
                                alt="Jeans Short"
                                width={250}
                                height={350}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute bottom-10 left-5 text-forground w-[200px]">
                                <p className="text-sm opacity-75">City Stars</p>
                                <h2 className="text-xl font-bold">Shirts for City Living</h2>
                                <Link href={menShirtsHref}>
                                    <button className="mt-2 px-4 py-2 bg-black text-white text-sm">Shop Now</button>
                                </Link>
                            </div>
                        </div>

                        <div className="relative w-full md:w-[50%] h-[40vh] md:h-full overflow-hidden">
                            {/* Background image */}
                            <Image
                                src={b4}
                                alt="Discount Background"
                                fill
                                className="object-cover"
                            />

                            {/* Overlay content */}
                            <div className="absolute inset-0 bg-opacity-40 flex flex-col justify-center items-center text-center p-6 text-black">
                                <h2 className="text-2xl font-bold">Trendsetting Dresses for Her</h2>
                                <Link href={femaleDressHref}>
                                    <button className="mt-2 px-4 py-2 bg-black text-white text-sm">Shop Now</button>
                                </Link>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default UpdatedSection8;
