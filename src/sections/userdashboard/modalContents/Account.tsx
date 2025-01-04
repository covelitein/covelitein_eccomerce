"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PhoneInput } from "@/components/ui/phone-input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React, { useState } from "react";
import { FileWithPreview, ImageCropper } from "@/components/ui/image-cropper";
import { FileWithPath, useDropzone } from "react-dropzone";

const accept = {
  "image/*": [],
};

export default function Account() {
  const [selectedFile, setSelectedFile] = useState<FileWithPreview | null>(
    null
  );
  const [isDialogOpen, setDialogOpen] = React.useState(false);

  const onDrop = React.useCallback(
    (acceptedFiles: FileWithPath[]) => {
      const file = acceptedFiles[0];
      if (!file) {
        alert("Selected image is too large!");
        return;
      }

      const fileWithPreview = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      setSelectedFile(fileWithPreview);
      setDialogOpen(true);
    },
    []
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept,
  });

  return (
    <div className="mt-5 px-4 md:px-6 lg:px-8">
      {/* Profile Image Section */}
      <div className="relative mb-4 flex justify-center">
        {selectedFile ? (
          <ImageCropper
            dialogOpen={isDialogOpen}
            setDialogOpen={setDialogOpen}
            selectedFile={selectedFile}
            setSelectedFile={setSelectedFile}
          />
        ) : (
          <Avatar
            {...getRootProps()}
            className="size-24 md:size-36 cursor-pointer ring-offset-2 ring-2 ring-slate-200"
          >
            <input {...getInputProps()} />
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        )}
      </div>

      {/* Form Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <Input placeholder="First name..." />
        </div>
        <div>
          <Input placeholder="Last name..." />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
        <div>
          <Input placeholder="Email..." />
        </div>
        <div>
          <Input placeholder="Address..." />
        </div>
      </div>
      <div className="mt-4 mb-4">
        <PhoneInput defaultCountry="NG" placeholder="Enter a phone number" />
      </div>
      <div className="flex justify-center md:justify-end">
        <Button>Update Account</Button>
      </div>
    </div>
  );
}