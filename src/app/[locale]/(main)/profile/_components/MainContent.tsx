"use client";
import React, { useEffect } from "react";
import EditImage from "./EditImage";
import { useFormik } from "formik";
import * as Yup from "yup";
import InputsContainer from "./InputsContainer";
import { Button } from "@/components/ui/button";
import { useIsUser } from "@/hooks/useIsUser";
import { useUpdateUserMutation } from "@/redux/features/auth/authApi";
import { toast, Toaster } from "sonner";

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  phone: Yup.string()
    .matches(/^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/, "Invalid phone number")
    .required("Phone is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  // avatarFile: Yup.mixed()
  //   // .test("fileSize", "File too large", (value) =>
  //   //   !value || (value instanceof File && value.size <= 1024 * 1024) // 1MB
  //   // )
  //   .test("fileType", "Unsupported file format", (value) =>
  //     !value || (value instanceof File && ["image/jpeg", "image/png"].includes(value.type))
  //   ),
  gender: Yup.string().required("Gender is required"),
});

const MainContent = () => {
  const [updateUser, { isLoading, isSuccess, error }] = useUpdateUserMutation();
  
  const user = useIsUser();

  const initialValues = {
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    phone: user?.phone || "",
    email: user?.email || "",
    avatar: user?.avatar || "",
    avatarFile: null as File | null,
    gender: user?.gender || "",
  };

  const form = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {

      try {
        const response = await updateUser(values).unwrap();
        console.log("Server Response:", response);
      } catch (err) {
        console.error("Error in form submission:", err);
      }
    },
  });

  console.log("Formik errors:", form.errors);

  // Handle API response
  useEffect(() => {
    if (isSuccess) {
      toast.success("Profile updated successfully");
    }
    
    if (error) {
      let errorMessage = "Something went wrong";
      if ('data' in error) {
        // @ts-ignore - handle potential error response structure
        errorMessage = error.data?.message || errorMessage;
      }
      toast.error(errorMessage);
    }
  }, [isSuccess, error]);

  return (
    <form onSubmit={form.handleSubmit} className="space-y-8">
      <h1 className="font-extrabold text-3xl">Edit Profile</h1>
      <EditImage formik={form} />
      <InputsContainer formik={form} />
      <div className="flex justify-end">
        <Button 
          type="submit" 
          disabled={isLoading}
          // onClick={() => console.log("Button clicked")}
        >
          {isLoading ? "Updating..." : "Submit"}
        </Button>
      </div>
      <Toaster />
    </form>
  );
};

export default MainContent;