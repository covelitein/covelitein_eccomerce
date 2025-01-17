export interface Step {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  discount?: number;
  trending?: boolean;
}

export type AspectRatio = {
  value: number;
  label: string;
};

export type CropShape = 'rect' | 'round';

export type ImageCropperProps = {
  onCropComplete?: (croppedImage: string) => void;
  aspectRatio?: number;
  shape?: CropShape;
  minWidth?: number;
  maxWidth?: number;
  quality?: number;
};

export interface Option {
  value: string;
  label: string;
}

export interface MultiSelectProps {
  placeholder?: string;
  emptyMessage?: string;
  loadingMessage?: string;
  onLoadOptions: (inputValue: string) => Promise<Option[]>;
  onChange?: (values: string[]) => void;
  maxSelections?: number;
}