import { CartItem } from "@/components/common";
import img from "../../../assets/images/i1.jpg";
import img2 from "../../../assets/brandIcons/hm.png";

const Section4 = () => {
  return (
    <section>
      <div className="container flex flex-col gap-10 py-10 px-4">
        <div className="flex flex-col items-center gap-6">
          <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white">
            Featured Products
          </h1>
          <p className="prose prose-xl text-foreground/70 text-center">
            Standout Styles and Must-Have Essentials—Check Out Our Featured
            Products
          </p>
        </div>

        <div>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-6 ">
            {Array.from({ length: 8 }, (_, index) => (
              <CartItem
                key={index}
                img={img.src}
                name={"jacket"}
                brandImage={img2.src}
                price={"35"}
                rating={"4.5"}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section4;
