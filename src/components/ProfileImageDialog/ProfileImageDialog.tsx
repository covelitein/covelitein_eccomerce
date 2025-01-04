import React from 'react';
import { Dialog } from './Dialog';
import { ImageCropper } from '../ImageCropper/ImageCropper';
import { UserCircle } from 'lucide-react';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (image: string) => void;
  currentImage?: string;
};

export const ProfileImageDialog: React.FC<Props> = ({
  isOpen,
  onClose,
  onSave,
  currentImage
}) => {
  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title="Update Profile Picture"
      description="Upload a new profile picture. You can crop and adjust the image to your liking."
    >
      <div className="w-full max-w-md mx-auto space-y-6">
        <ImageCropper
          onCropComplete={(image) => {
            onSave(image);
            onClose();
          }}
          aspectRatio={1}
          shape="round"
          quality={0.9}
          maxWidth={400}
        />
        
        {currentImage && (
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-500 mb-2">Current Profile Picture</p>
            <div className="inline-block rounded-full overflow-hidden border-2 border-gray-200">
              <img
                src={currentImage}
                alt="Current profile"
                className="w-20 h-20 object-cover"
              />
            </div>
          </div>
        )}
      </div>
    </Dialog>
  );
};