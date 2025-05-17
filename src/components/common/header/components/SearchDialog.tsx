import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Search, CloudUpload } from "lucide-react";
import { useViewport } from "@/hooks/use-viewposrt";
import { SearchSection } from "./SearchSection";
import { SearchResults } from "./SearchResults";
import { SearchDialogProps } from "./types";
import { useSearchQuery } from "@/redux/features/products/productsApi";
const recently: string[] = ["Coats-Woman", "Skirts"];
const trending: string[] = ["T-shirt", "Wide Leg", "White Shirt"];
const popular: string[] = ["Dresses", "Hoodies", "Blouses", "Pants", "Shein"];
const results: string[] = ["Summer Dress", "Winter Coat", "Designer Jeans"];

export const SearchDialog: React.FC<SearchDialogProps> = ({ 
  isOpen, 
  setIsOpen, 
  onOpenUpload 
}) => {
  const { isMobile } = useViewport();
  const [searchValue, setSearchValue] = useState<string>("");
  const { data, isLoading } = useSearchQuery(searchValue);
  const searchResults = data?.data?.items;

  const handleClose = () => {
    setIsOpen(false);
    setSearchValue(""); // Clear the search input
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div>
          <Input
            readOnly
            icon={<Search className="h-4 w-4 text-white" />}
            iconPosition="left"
            placeholder="Search..."
            onClick={() => setIsOpen(true)}
            className="bg-black/50 text-white placeholder:text-white"
          />
        </div>
      </DialogTrigger>
      <DialogContent
        className="bg-transparent p-0 border-none [&>button]:hidden"
        style={{
          width: isMobile ? "100%" : "30%",
          maxWidth: isMobile ? "100%" : "50vw",
        }}
      >
        <div className="grid gap-4">
          <Input
            className="rounded-xl h-[50px]"
            iconPosition="right"
            icon={<CloudUpload className="cursor-pointer" onClick={onOpenUpload} />}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search for products..."
          />
          {searchValue ? (
            <div className="space-y-6 bg-background rounded-xl overflow-hidden">
              <SearchResults 
                results={searchResults} 
                onClose={handleClose}
                isLoading={isLoading}
              />
            </div>
          ) : (
            <div className="space-y-6 bg-background p-6 rounded-xl">
              <SearchSection title="Recently Searched" items={recently} />
              <SearchSection title="Trending Searches" items={trending} />
              <SearchSection title="Popular Categories" items={popular} />
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};