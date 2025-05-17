export interface SearchSectionProps {
    title: string;
    items: string[];
  }
  
  export interface SearchResultsProps {
    results: Array<{
      _id: string;
      name: string;
      price: number;
      img: string;
    }>;
    onClose: () => void;
    isLoading?: boolean;
  }
  
  export interface SearchDialogProps {
    isOpen: boolean;
    setIsOpen: (state: boolean) => void;
    onOpenUpload: () => void;
  }
  
  export interface UploadDialogProps {
    isOpen: boolean;
    setIsOpen: (state: boolean) => void;
    handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    selectedFile: File | null;
    error: string;
    handleClearFile: () => void;
    handleImageSearch: () => Promise<void>;
    isLoading: boolean;
  }
  
  export interface ResultsDialogProps {
    isOpen: boolean;
    setIsOpen: (state: boolean) => void;
    searchResults: CartitemProps[] | null;
  }
  
  export interface DisplaySearchWithImgResultProps {
    results: CartitemProps[];
    onClose: () => void;
  }

  interface Brand{
    _id: string;
    brandName: string;
    brandLogo: string;
  }
  
  export interface CartitemProps {
    _id: string;
    img: string;
    brand: Brand
    title: string;
    price: string;
    rating: string;
    isBrand: boolean;
  }

  export interface Product {
    name: string;
    img: string;
    price: number;
    _id: string;
  }