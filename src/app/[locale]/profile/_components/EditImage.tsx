"use client";
import Avatar from "@/components/ui/Avatar";
import { Button } from "@/components/ui/button";
import { FormikProps } from "formik";
import { Upload } from "lucide-react";
import React, { FC, useRef, useState } from "react";

interface FormValues {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    avatar:string
}

interface IEditImage {
  formik: FormikProps<FormValues>;
}
const EditImage: FC<IEditImage> = ({ formik }) => {
  const [image, setImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setImage(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-4">
      <div className="gap-4">
        <Avatar size={50} src={image || ""} />
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
          aria-label="Upload image"
        />
        <div className="flex justify-end gap-4">
          <Button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            variant="default"
          >
            <Upload className="mr-2 h-4 w-4" />
            Upload image
          </Button>
          <Button
            type="button"
            onClick={handleRemoveImage}
            variant="secondary"
            disabled={!image}
          >
            Remove
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditImage;
