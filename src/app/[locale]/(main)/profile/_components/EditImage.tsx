"use client";
import Avatar from "@/components/ui/Avatar";
import { Button } from "@/components/ui/button";
import { FormikProps } from "formik";
import { Upload } from "lucide-react";
import React, { FC, useRef } from "react";

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatar: string;
  avatarFile: File | null;
  gender: string;
}

interface IEditImage {
  formik: FormikProps<FormValues>;
}

const EditImage: FC<IEditImage> = ({ formik }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        formik.setFieldValue("avatar", e.target?.result as string);
      };
      reader.readAsDataURL(file);
      formik.setFieldValue("avatarFile", file);
    }
  };

  const handleRemoveImage = () => {
    formik.setFieldValue("avatar", "");
    formik.setFieldValue("avatarFile", null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-4">
      <div className="gap-4">
        <div className="flex flex-col items-center w-max gap-4">
          <Avatar
            className="w-[100px] h-[100px]"
            src={formik.values.avatar || ""}
          />
          <h1 className="text-xl font-extrabold">profile picture</h1>
        </div>
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
            disabled={!formik.values.avatar}
          >
            Remove
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditImage;
