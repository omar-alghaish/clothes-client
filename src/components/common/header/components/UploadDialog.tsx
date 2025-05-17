import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useViewport } from "@/hooks/use-viewposrt";
import { Loader2 } from "lucide-react";
import { FaImage } from "react-icons/fa";
import { UploadDialogProps } from "./types";

export const UploadDialog: React.FC<UploadDialogProps> = ({
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
