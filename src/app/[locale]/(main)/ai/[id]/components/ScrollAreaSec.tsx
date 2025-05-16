import { ScrollArea } from "@/components/ui/scroll-area";

interface ScrollAreaSecProps {
    title: string;
    items: Array<{ id: string; title: string }>;
    selectedIndex: number | null;
    onSelect?: (index: number) => void;
    imageSrc: string;
}

export default function ScrollAreaSec({ title, items, selectedIndex, imageSrc }: ScrollAreaSecProps) {
    return (
        <div className="space-y-2">
            <h3 className="text-lg font-semibold">{title}</h3>
            <ScrollArea className="h-[200px] w-full rounded-md border p-4">
                <div className="flex space-x-4">
                    {items.map((item, index) => (
                        <div
                            key={item.id}
                            className={`cursor-pointer rounded-md border p-2 ${
                                selectedIndex === index ? 'border-primary' : ''
                            }`}
                            // onClick={() => onSelect(index)}
                        >
                            <img
                                src={imageSrc}
                                alt={item.title}
                                className="h-32 w-24 object-cover"
                            />
                            <p className="mt-2 text-sm">{item.title}</p>
                        </div>
                    ))}
                </div>
            </ScrollArea>
        </div>
    );
} 