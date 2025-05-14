import { useState, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CloudUpload, LucideArrowUpLeft, Search, Loader2 } from "lucide-react";
import { useViewport } from "@/hooks/use-viewposrt";
import { FaImage } from "react-icons/fa";
import Link from "next/link";
import { useSearchByImgMutation } from "@/redux/features/ai/aiApi";
import { CartItem } from "../../cartItem";
import { CartitemProps } from "../../cartItem/components/MainContent";

interface SearchDialogProps {
  isOpen: boolean;
  setIsOpen: (state: boolean) => void;
  onOpenUpload: () => void;
}

interface ResultsDialogProps {
  isOpen: boolean;
  setIsOpen: (state: boolean) => void;
  searchResults: CartitemProps[] | null;
}

interface UploadDialogProps {
  isOpen: boolean;
  setIsOpen: (state: boolean) => void;
  handleFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
  selectedFile: File | null;
  error: string;
  handleClearFile: () => void;
  handleImageSearch: () => Promise<void>;
  isLoading: boolean;
}

interface SearchSectionProps {
  title: string;
  items: string[];
}

interface SearchResultsProps {
  results: string[];
}

interface DisplaySearchWithImgResultProps {
  results: CartitemProps[];
  onClose: () => void;
}

const recently: string[] = ["Coats-Woman", "Skirts"];
const trending: string[] = ["T-shirt", "Wide Leg", "White Shirt"];
const popular: string[] = ["Dresses", "Hoodies", "Blouses", "Pants", "Shein"];
const results: string[] = ["Summer Dress", "Winter Coat", "Designer Jeans"];

const SearchInput: React.FC = () => {
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isUploadOpen, setIsUploadOpen] = useState<boolean>(false);
  const [isResultsOpen, setIsResultsOpen] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string>("");
  const [searchResults, setSearchResults] = useState<CartitemProps[] | null>(null);

  // RTK Query hook for image search
  const [searchByImg, { isLoading }] = useSearchByImgMutation();

  const handleOpenUpload = (): void => {
    setIsSearchOpen(false);
    setIsUploadOpen(true);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0];
    setError("");

    if (!file) return;

    if (file.type.startsWith("image/")) {
      setSelectedFile(file);
    } else {
      setError("Please select an image file (JPEG, PNG, GIF)");
    }
  };

  const handleClearFile = (): void => {
    setSelectedFile(null);
    setError("");
    setSearchResults(null);
  };

  const handleImageSearch = async (): Promise<void> => {
    if (!selectedFile) {
      setError("Please select an image first");
      return;
    }

    try {
      // Create FormData to send file
      const formData = new FormData();
      formData.append("file", selectedFile);

      // Call the API endpoint
      const response = await searchByImg(formData).unwrap();


      console.log("response", response);
      
      // Handle successful response
      console.log("Search results:", response);
      setSearchResults(response || []);
      
      // Close upload dialog and open results dialog
      setIsUploadOpen(false);
      setIsResultsOpen(true);
    } catch (err) {
      console.error("Error searching by image:", err);
      setError("Failed to search with this image. Please try again.");
    }
  };

  return (
    <div className="relative">
      <SearchDialog
        isOpen={isSearchOpen}
        setIsOpen={setIsSearchOpen}
        onOpenUpload={handleOpenUpload}
      />
      <UploadDialog
        isOpen={isUploadOpen}
        setIsOpen={setIsUploadOpen}
        handleFileChange={handleFileChange}
        selectedFile={selectedFile}
        error={error}
        handleClearFile={handleClearFile}
        handleImageSearch={handleImageSearch}
        isLoading={isLoading}
      />
      <ResultsDialog
        isOpen={isResultsOpen}
        setIsOpen={setIsResultsOpen}
        searchResults={searchResults}
      />
    </div>
  );
};

const DisplaySearchWithImgResult: React.FC<DisplaySearchWithImgResultProps> = ({ results, onClose }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {results && results.length > 0 ? (
        results.map((item) => (
          <CartItem 
            key={item._id}
            img={item.img} 
            brand={item.brand} 
            _id={item._id} 
            name={item.title} 
            price={item.price} 
            rating={item.rating} 
            isBrand={false}
            onClick={onClose}
          />
        ))
      ) : (
        <div className="col-span-full text-center p-4">
          <p className="text-muted-foreground">No results found</p>
        </div>
      )}
    </div>
  );
};

const ResultsDialog: React.FC<ResultsDialogProps> = ({ isOpen, setIsOpen, searchResults }) => {
  const { isMobile } = useViewport();

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent
        className="bg-background p-6"
        style={{
          width: isMobile ? "100%" : "80%",
          maxWidth: isMobile ? "100%" : "90vw",
          maxHeight: "90vh",
          overflowY: "auto"
        }}
      >
        <DialogHeader className="mb-6">
          <DialogTitle className="text-2xl font-bold">Search Results</DialogTitle>
        </DialogHeader>
        
        {searchResults && searchResults.length > 0 ? (
          <DisplaySearchWithImgResult 
            results={searchResults} 
            onClose={handleClose}
          />
        ) : (
          <div className="text-center p-8">
            <p className="text-muted-foreground">No results found for your search</p>
            <Button className="mt-4" onClick={() => setIsOpen(false)}>
              Try another search
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

const SearchDialog: React.FC<SearchDialogProps> = ({ isOpen, setIsOpen, onOpenUpload }) => {
  const { isMobile } = useViewport();
  const [searchValue, setSearchValue] = useState<string>("");
  
  // Use default results
  const displayResults = results;

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
              <SearchResults results={displayResults} />
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

const UploadDialog: React.FC<UploadDialogProps> = ({
  isOpen,
  setIsOpen,
  handleFileChange,
  selectedFile,
  error,
  handleClearFile,
  handleImageSearch,
  isLoading
}) => {
  const { isMobile } = useViewport();

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent 
        className="[&>button]:hidden"
        style={{
          width: isMobile ? "100%" : "40%",
          maxWidth: isMobile ? "100%" : "50vw",
        }}
      >
        <DialogHeader className="flex flex-col items-center text-center">
          <DialogTitle className="text-3xl font-extrabold">Upload Your Photo</DialogTitle>
          <p className="text-muted-foreground">Upload an image to search for the exact outfit or discover similar styles instantly!</p>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col items-center justify-center gap-4">
            <label
              htmlFor="file-upload"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer hover:border-primary transition-colors gap-4 p-6"
            >
              {selectedFile ? (
                <div className="h-full w-full flex flex-col items-center justify-center">
                  <img 
                    src={URL.createObjectURL(selectedFile)} 
                    alt="Selected preview" 
                    className="max-h-32 object-contain mb-2"
                  />
                  <p className="text-center">
                    Selected file: <br />
                    <span className="text-primary font-medium">{selectedFile.name}</span>
                  </p>
                </div>
              ) : (
                <>
                  <FaImage className="h-12 w-12 text-muted-foreground" />
                  <div className="text-center">
                    <p className="text-lg">Drag and drop your image here</p>
                    <p className="text-sm text-muted-foreground mt-2">Support: JPEG, PNG</p>
                  </div>
                  <Button
                    variant="default"
                    className="mt-4"
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById('file-upload')?.click();
                    }}
                  >
                    Select Image
                  </Button>
                </>
              )}
            </label>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              id="file-upload"
              onChange={handleFileChange}
            />
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            {selectedFile && (
              <div className="w-full flex gap-4">
                <Button 
                  className="w-full" 
                  onClick={handleImageSearch}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Searching...
                    </>
                  ) : (
                    "Search with Image"
                  )}
                </Button>
                <Button
                  variant="outline"
                  onClick={handleClearFile}
                  disabled={isLoading}
                >
                  Clear
                </Button>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const SearchSection: React.FC<SearchSectionProps> = ({ title, items }) => (
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

const SearchResults: React.FC<SearchResultsProps> = ({ results }) => (
  <div>
    <div className="flex flex-col gap-2 flex-wrap">
      {results && results.length > 0 ? (
        results.map((item, index) => (
          <Link 
            href="/" 
            key={index} 
            className="hover:bg-muted p-4 transition-colors duration-200 flex justify-between items-center font-bold text-muted-foreground hover:text-foreground"
          >
            {item}
            <LucideArrowUpLeft className="font-extrabold"/>
          </Link>
        ))
      ) : (
        <p className="p-4 text-center text-muted-foreground">No results found</p>
      )}
    </div>
  </div>
);

export default SearchInput;