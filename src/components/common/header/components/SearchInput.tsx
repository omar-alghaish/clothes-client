import { useState, ChangeEvent } from "react";
import { useSearchByImgMutation } from "@/redux/features/ai/aiApi";
import { CartitemProps } from "./types";
import { SearchDialog } from "./SearchDialog";
import { UploadDialog } from "./UploadDialog";
import { ResultsDialog } from "./ResultsDialog";

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

export default SearchInput;
