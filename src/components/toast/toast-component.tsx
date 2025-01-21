import React, { useEffect, useState } from 'react';
import * as Toast from '@radix-ui/react-toast';
import { CheckCircle, AlertTriangle, AlertCircle, Info, X } from 'lucide-react';

type ToastType = 'success' | 'danger' | 'info' | 'warning';

interface ToastProps {
  message: string;
  type: ToastType;
  duration?: number;
  showLoader?: boolean;
  onDismiss?: () => void;
}

const ToastComponent: React.FC<ToastProps> = ({
  message,
  type,
  duration = 5000,
  showLoader = false,
  onDismiss,
}) => {
  const [progress, setProgress] = useState(100);
  const [isPaused, setIsPaused] = useState(false);
  const intervalDuration = 50; // Interval in milliseconds for progress update

  // Update progress based on duration and interval
  useEffect(() => {
    if (!showLoader) return;

    let interval: NodeJS.Timeout;

    if (!isPaused) {
      interval = setInterval(() => {
        setProgress((prev) => Math.max(prev - (100 / (duration / intervalDuration)), 0));
      }, intervalDuration);
    }

    return () => clearInterval(interval);
  }, [isPaused, duration, showLoader]);

  // Map type to background color
  const backgroundClass = {
    success: 'bg-green-500',
    danger: 'bg-red-500',
    info: 'bg-blue-500',
    warning: 'bg-yellow-500',
  }[type];

  const iconMap = {
    success: <CheckCircle className="w-6 h-6 text-white flex-shrink-0" />,
    danger: <AlertCircle className="w-6 h-6 text-white flex-shrink-0" />,
    info: <Info className="w-6 h-6 text-white flex-shrink-0" />,
    warning: <AlertTriangle className="w-6 h-6 text-white flex-shrink-0" />,
  };

  return (
    <Toast.Provider>
      <Toast.Root
        className={`shadow-lg rounded-md p-4 flex items-center gap-4 border mx-auto text-white ${backgroundClass}`}
        style={{
          maxWidth: '80%',
          width: '400px',
        }}
        duration={duration}
        onMouseEnter={() => setIsPaused(true)} // Pause loader on hover
        onMouseLeave={() => setIsPaused(false)} // Resume loader on leave
      >
        <div>{iconMap[type]}</div>
        <div className="flex-1">
          <p className="text-sm sm:text-base font-medium break-words">{message}</p>
        </div>
        <Toast.Close asChild>
          <button
            className="text-white hover:text-gray-200 flex-shrink-0"
            onClick={() => {
              if (onDismiss) onDismiss();
            }}
          >
            <X className="w-5 h-5" />
          </button>
        </Toast.Close>
      </Toast.Root>
      <Toast.Viewport
        className="fixed top-4 sm:right-4 right-1 max-sm:left-1 transform max-sm:translate-x-2 space-y-2 z-50"
      />
    </Toast.Provider>
  );
};

export default ToastComponent;
