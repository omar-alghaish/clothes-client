import { Dialog, DialogContent } from "@/components/ui/dialog"
import ResultTryOn from "./ResultTryOn"

// Import or define the interfaces
interface TryOnResponse {
    success: boolean;
    data?: {
        result_image: string;
        // Add other response properties as needed
    };
    message?: string;
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
                {resultData?.data?.result_image && product && (
                    <ResultTryOn image={resultData.data.result_image} product={product} />
                )}
            </DialogContent>
        </Dialog>
    )
}