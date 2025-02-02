"use client";
import React from "react";
import EditImage from "./EditImage";
import { useFormik } from "formik";
import * as Yup from "yup";
import InputsContainer from "./InputsContainer";
import { Button } from "@/components/ui/button";

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  phone: Yup.string()
    .matches(/^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/, "Invalid phone number")
    .required("Phone is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  avatarFile: Yup.mixed()
    .test("fileSize", "File too large", (value) => 
      !value || (value instanceof File && value.size <= 1024 * 1024) // 1MB
    )
    .test("fileType", "Unsupported file format", (value) => 
      !value || (value instanceof File && ["image/jpeg", "image/png"].includes(value.type))
    ),
  gender: Yup.string().required("Gender is required"),
});

const MainContent = () => {
  const initialValues = {
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    avatar: "",
    avatarFile: null as File | null,
    gender: "",
  };

  const handleSubmit = async (values: typeof initialValues) => {
    const formData = new FormData();
    
    if (values.avatarFile) {
      formData.append("avatar", values.avatarFile);
    }
    
    formData.append("firstName", values.firstName);
    formData.append("lastName", values.lastName);
    formData.append("email", values.email);
    formData.append("phone", values.phone);
    formData.append("gender", values.gender);

    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Submission failed");
      
      const result = await response.json();
      console.log("Success:", result);
      // Handle success (e.g., show toast, redirect)
    } catch (error) {
      console.error("Error:", error);
      // Handle error (e.g., show error message)
    }
  };

  const form = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <form onSubmit={form.handleSubmit} className="space-y-8">
     <h1 className="font-extrabold text-3xl">Edit Profile</h1> 
      <EditImage formik={form} />
      <InputsContainer formik={form} />
      <div className="flex justify-end">
        <Button type="submit">Submit</Button>
      </div>
    </form>
  );
};

export default MainContent;