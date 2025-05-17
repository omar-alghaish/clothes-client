import { Button } from "@/components/ui/button";
import { SearchSectionProps } from "./types";

export const SearchSection: React.FC<SearchSectionProps> = ({ title, items }) => (
  <div>
    <h1 className="font-extrabold">{title}</h1>
    <div className="flex gap-4 mt-2 flex-wrap">
      {items.map((item, index) => (
        <Button variant="outline" key={index} className="rounded-xl">
          {item}
        </Button>
      ))}
    </div>
  </div>
);