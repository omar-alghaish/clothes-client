import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import Image from "next/image";
export default function ScrollAreaSec({ title, items, selectedIndex, onSelect, imageSrc }) {
    return (
        <div className="space-y-3">
            <h2 className="text-2xl font-bold">{title}</h2>
            <ScrollArea className="whitespace-nowrap rounded-md">
                <div className="flex w-max space-x-4 p-1">
                    {items.map((_, index) => (
                        <figure
                            key={index}
                            className={`shrink-0 ${selectedIndex === index ? "border-2 border-black rounded-md" : ""}`}
                            onClick={() => onSelect(index)}
                        >
                            <div className="overflow-hidden rounded-md border">
                                <Image
                                    src={imageSrc}
                                    alt={`${title} item ${index + 1}`}
                                    width={150}
                                    height={200}
                                    className="aspect-[3/4] w-[150px] h-[200px] object-cover lg:w-[200px] lg:h-[235px]"
                                />
                            </div>
                        </figure>
                    ))}
                </div>
                <ScrollBar className="invisible" orientation="horizontal" />
            </ScrollArea>
        </div>
    )
}