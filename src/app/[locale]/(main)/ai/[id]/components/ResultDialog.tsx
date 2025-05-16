import { Dialog, DialogContent } from "@/components/ui/dialog"
import ResultTryOn from "./ResultTryOn"

// Import or define the interfaces
interface TryOnResponse {
    image_url: string;

}

interface Product {
    img: string;
    clothingType: string;
    name: string;
    price: number;
    // Add other product properties as needed
}

interface ResultDialogProps {
    isOpen: boolean;
    onClose: () => void;
    resultData: TryOnResponse | null;
    product: Product | undefined;
}

export default function ResultDialog({ isOpen, onClose, resultData, product }: ResultDialogProps) {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="min-w-[100vw] min-h-[100vh]">
                <ResultTryOn image={resultData?.image_url || ''} product={product as Product} />
            </DialogContent>
        </Dialog>
    )
}