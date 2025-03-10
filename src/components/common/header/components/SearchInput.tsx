// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//   Sheet,
//   SheetContent,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
// } from "@/components/ui/sheet";
// import { useViewport } from "@/hooks/use-viewposrt";
// import { CloudUpload, Search } from "lucide-react";
// import React from "react";

// const recently = ["Coats-Woman", "Skirts"];
// const trending = ["T-shirt", "Wide Leg", "White Shirt"];
// const popular = ["Dresses", "Hoodies", "Blouses", "pants", "Shein"];
// const SearchInput = () => {
//   const { isMobile } = useViewport();

//   return (
//     <Sheet>
//       <SheetTrigger asChild>
//         <div className="relative">
//           <Input
//             className=""
//             icon={<Search className="h-4 w-4" />}
//             iconPosition="left"
//             placeholder="Search..."
//           />
//           <CloudUpload className="absolute right-2 top-2.5 h-5 w-5 cursor-pointer" />
//         </div>
//       </SheetTrigger>
//       <SheetContent
//         style={{
//           width: isMobile ? "100%" : "50%",
//           maxWidth: isMobile ? "100%" : "50vw",
//         }}
//       >
//         <SheetHeader>
//           <SheetTitle>Search</SheetTitle>
//         </SheetHeader>
//         <div className="grid gap-4 py-4">
//           <Input icon={<Search />} />
//           {/* suugests */}
//           <div>
//             <div>
//               <h1 className="font-extrabold">Recently Searched</h1>
//               <div className="flex gap-4 mt-2 flex-wrap">
//                 {recently.map((item, index) => (
//                   <Button
//                     variant="outline"
//                     key={index}
//                     className=" rounded-xl t"
//                   >
//                     {item}
//                   </Button>
//                 ))}
//               </div>
//             </div>

//             <div className="mt-6">
//               <h1 className="font-extrabold">Trending Searches</h1>
//               <div className="flex gap-4 mt-2 flex-wrap">
//                 {trending.map((item, index) => (
//                   <Button
//                     variant="outline"
//                     key={index}
//                     className=" rounded-xl t"
//                   >
//                     {item}
//                   </Button>
//                 ))}
//               </div>
//             </div>

//             <div className="mt-6">
//               <h1 className="font-extrabold">Popular Categories</h1>
//               <div className="flex gap-4 mt-2 flex-wrap">
//                 {popular.map((item, index) => (
//                   <Button
//                     variant="outline"
//                     key={index}
//                     className=" rounded-xl t"
//                   >
//                     {item}
//                   </Button>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </SheetContent>
//     </Sheet>
//   );
// };

// export default SearchInput;





import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CloudUpload, LucideArrowUpLeft, Search } from "lucide-react";
import { useViewport } from "@/hooks/use-viewposrt";
import { FaImage } from "react-icons/fa";
import Link from "next/link";

const recently = ["Coats-Woman", "Skirts"];
const trending = ["T-shirt", "Wide Leg", "White Shirt"];
const popular = ["Dresses", "Hoodies", "Blouses", "Pants", "Shein"];
const results = ["Summer Dress", "Winter Coat", "Designer Jeans"]; // Added missing results array

const SearchInput = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState("");

  const handleOpenUpload = () => {
    setIsSearchOpen(false);
    setIsUploadOpen(true);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setError("");

    if (!file) return;

    if (file.type.startsWith("image/")) {
      setSelectedFile(file);
      // Add your upload logic here
    } else {
      setError("Please select an image file (JPEG, PNG, GIF)");
    }
  };

  const handleClearFile = () => {
    setSelectedFile(null);
    setError("");
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
      />
    </div>
  );
};

const SearchDialog = ({ isOpen, setIsOpen, onOpenUpload }: {
  isOpen: boolean;
  setIsOpen: (state: boolean) => void;
  onOpenUpload: () => void
}) => {
  const { isMobile } = useViewport();
  const [searchValue, setSearchValue] = useState(""); // Fixed initial state

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
          />
          {searchValue ? (
            <div className="space-y-6 bg-background rounded-xl overflow-hidden">
              <SearchResults />
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

const UploadDialog = ({
  isOpen,
  setIsOpen,
  handleFileChange,
  selectedFile,
  error,
  handleClearFile
}: {
  isOpen: boolean;
  setIsOpen: (state: boolean) => void;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  selectedFile: File | null;
  error: string;
  handleClearFile: () => void;
}) => {
  const { isMobile } = useViewport();

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <CloudUpload className="absolute right-2 top-2.5 h-5 w-5 cursor-pointer text-white" />
      </DialogTrigger>
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
              <FaImage className="h-12 w-12 text-muted-foreground" />
              {selectedFile ? (
                <p className="text-center">
                  Selected file: <br />
                  <span className="text-primary font-medium">{selectedFile.name}</span>
                </p>
              ) : (
                <div className="text-center">
                  <p className="text-lg">Drag and drop your image here</p>
                  <p className="text-sm text-muted-foreground mt-2">Support: JPEG, PNG</p>
                </div>
              )}
              <Button
                variant="default"
                className="mt-4"
                onClick={(e) => e.preventDefault()}
              >
                {selectedFile ? "Process Image" : "Select Image"}
              </Button>
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
                <Button className="w-full">Search with Image</Button>
                <Button
                  variant="outline"
                  onClick={handleClearFile}
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

const SearchSection = ({ title, items }: { title: string; items: string[] }) => (
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

const SearchResults = () => (
  <div>
    <div className="flex flex-col gap-2 flex-wrap">
      {results.map((item: string, index: number) => (
        <Link 
          href="/" 
          key={index} 
          className="hover:bg-muted p-4 transition-colors duration-200 flex justify-between items-center font-bold text-muted-foreground hover:text-foreground"
        >
          {item}
          <LucideArrowUpLeft className="font-extrabold"/>
        </Link>
      ))}
    </div>
  </div>
);

export default SearchInput;