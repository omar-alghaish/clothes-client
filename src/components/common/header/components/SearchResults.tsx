import Link from "next/link";
import { LucideArrowUpLeft } from "lucide-react";
import { SearchResultsProps } from "./types";
import Image from "next/image";
import { Loader2 } from "lucide-react";

export const SearchResults: React.FC<SearchResultsProps> = ({ results, onClose, isLoading }) => (
  <div>
    <div className="flex flex-col gap-2 flex-wrap">
      {isLoading ? (
        <div className="flex justify-center items-center p-4">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      ) : results && results.length > 0 ? (
        results.map((item) => (
          <Link
            href={`/${item._id}`}
            key={item._id}
            className="hover:bg-muted p-4 transition-colors duration-200 flex justify-between items-center text-muted-foreground hover:text-foreground"
            onClick={onClose}
          >
            <div className="flex items-center gap-4">
              <div className="relative w-12 h-12">
                <Image
                  src={item.img}
                  alt={item.name}
                  fill
                  className="object-cover rounded-md"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-bold">{item.name}</span>
                <span className="text-sm">${item.price.toFixed(2)}</span>
              </div>
            </div>
            <LucideArrowUpLeft className="font-extrabold" />
          </Link>
        ))
      ) : (
        <p className="p-4 text-center text-muted-foreground">No results found</p>
      )}
    </div>
  </div>
);