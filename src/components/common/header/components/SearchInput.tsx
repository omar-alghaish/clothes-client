import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useViewport } from "@/hooks/use-viewposrt";
import { CloudUpload, Search } from "lucide-react";
import React from "react";

const recently = ["Coats-Woman", "Skirts"];
const trending = ["T-shirt", "Wide Leg", "White Shirt"];
const popular = ["Dresses", "Hoodies", "Blouses", "pants", "Shein"];
const SearchInput = () => {
  const { isMobile } = useViewport();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="relative">
          <Input
            className=""
            icon={<Search className="h-4 w-4" />}
            iconPosition="left"
            placeholder="Search..."
          />
          <CloudUpload className="absolute right-2 top-2.5 h-5 w-5 cursor-pointer" />
        </div>
      </SheetTrigger>
      <SheetContent
        style={{
          width: isMobile ? "100%" : "50%",
          maxWidth: isMobile ? "100%" : "50vw",
        }}
      >
        <SheetHeader>
          <SheetTitle>Search</SheetTitle>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <Input icon={<Search />} />
          {/* suugests */}
          <div>
            <div>
              <h1 className="font-extrabold">Recently Searched</h1>
              <div className="flex gap-4 mt-2 flex-wrap">
                {recently.map((item, index) => (
                  <Button
                    variant="outline"
                    key={index}
                    className=" rounded-xl t"
                  >
                    {item}
                  </Button>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <h1 className="font-extrabold">Trending Searches</h1>
              <div className="flex gap-4 mt-2 flex-wrap">
                {trending.map((item, index) => (
                  <Button
                    variant="outline"
                    key={index}
                    className=" rounded-xl t"
                  >
                    {item}
                  </Button>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <h1 className="font-extrabold">Popular Categories</h1>
              <div className="flex gap-4 mt-2 flex-wrap">
                {popular.map((item, index) => (
                  <Button
                    variant="outline"
                    key={index}
                    className=" rounded-xl t"
                  >
                    {item}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SearchInput;
