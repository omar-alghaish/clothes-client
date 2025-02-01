import React from "react";
import EditImage from "./EditImage";
import { useFormik } from "formik";
import * as Yup from "yup";
import InputsContainer from "./InputsContainer";

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  phone: Yup.string()
    .matches(/^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/, "Invalid phone number")
    .required("Phone is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
});

const MainContent = () => {
  const initialValues = {
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    avatar: "",
  };
  const form = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      // Handle password change logic here
      console.log("Password change submitted:", values);
      // Add your API call here
    },
  });
  return (
    <div>
      <EditImage formik={form} />
      <InputsContainer formik={form} />
    </div>
  );
};

export default MainContent;
