import { useState } from 'react';

type ToastData = {
  id: number;
  message: string;
  type: 'success' | 'danger' | 'info' | 'warning';
  duration?: number;
  showLoader?: boolean;
};

export const useToast = () => {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const addToast = (toast: Omit<ToastData, 'id'>) => {
    const id = new Date().getTime();
    setToasts((prev) => [...prev, { ...toast, id }]);
    setTimeout(() => removeToast(id), toast.duration || 5000);
  };

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return { toasts, addToast };
};
