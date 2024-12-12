import { UseFormRegister } from "react-hook-form";

// user register
export type UserRegisterFormData = {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  gender: string;
  username: string;
  password: string;
  confirm?: string;
  agreeTerms?: boolean;
};

export type FormFieldProps = {
  type?: string;
  label?: string;
  name: ValidFieldNames;
  register?: UseFormRegister<any>;
  error?: any;
  isInvalid?: boolean;
  isRequired?: boolean;
  isClearable?: boolean;
  isTextarea?: boolean;
  isCheckbox?: boolean;
  children?: any;
  control?: any;
  onClose?: () => void;
};


export type ValidFieldNames =
  | "firstname"
  | "lastname"
  | "email"
  | "phone"
  | "gender"
  | "username"
  | "password"
  | "confirm"
  | "agreeTerms"
  | "fullname"

// user login
export type UserLoginFormData = {
  email: string;
  password: string;
};

// artisan register
export type ArtisanRegisterFormData = {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  gender: string;
  username: string;
  password: string;
  confirm?: string;
  agreeTerms?: boolean;
};

// user login
export type ArtisanLoginFormData = {
  email: string;
  password: string;
};

export interface CompressionOptions {
  quality?: number; // Adjust quality (0-100), higher quality means larger file size
  width?: number; // Resize width (optional)
  height?: number; // Resize height (optional)
}