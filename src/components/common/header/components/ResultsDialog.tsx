import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useViewport } from "@/hooks/use-viewposrt";
import { DisplaySearchWithImgResult } from "./DisplaySearchWithImgResult";
import { ResultsDialogProps } from "./types";

export const ResultsDialog: React.FC<ResultsDialogProps> = ({ 
  isOpen, 
  setIsOpen, 
  searchResults 
}) => {
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