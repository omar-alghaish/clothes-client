// "use client";
// import { useFormik } from "formik";
// import Image from "next/image";
// import background from "../../../../assets/backgrounds/login.jpg";
// import * as Yup from "yup";
// import { Input } from "@/components/ui/input";
// import { Lock, Mail, User } from "lucide-react";
// import Link from "next/link";
// import { useLocale } from "next-intl";
// import { Button } from "@/components/ui/button";
// import { Separator } from "@/components/ui/separator";
// import { useEffect } from "react";
// import { FcGoogle } from "react-icons/fc";
// import { FaFacebookF } from "react-icons/fa";
// import { useRegisterMutation } from "@/redux/features/auth/authApi";
// import { toast } from "sonner";
// import { useRouter } from "next/navigation";
// import { Toaster } from "@/components/ui/sonner";
// import { Checkbox } from "@/components/ui/checkbox";

// const validationSchema = Yup.object().shape({
//   name: Yup.string().required("Name is required"),
//   email: Yup.string().email("Invalid email").required("Email is required"),
//   password: Yup.string()
//     .min(6, "Password must be at least 6 characters")
//     .required("Password is required"),
//   confirmPassword: Yup.string()
//     .oneOf([Yup.ref("password")], "Passwords must match")
//     .required("Confirm Password is required"),
// });

// const Signup = () => {
//   const locale = useLocale();
//   const router = useRouter();
//   const [register, {isError, isSuccess, data, isLoading,error }] =
//     useRegisterMutation();

//   useEffect(() => {
//     if (isSuccess) {
//       const message = data?.message || "Registration successful";
//       toast.success(message);
//       router.push(`/${locale}`);
    
//     }  if(isError){
//         toast.error("error")
//       }
//   }, [isSuccess, data, router, locale, error, isError]);


//   const formik = useFormik({
//     initialValues: {
//       name: "",
//       email: "",
//       password: "",
//       confirmPassword: "",
//     },
//     validationSchema,
//     onSubmit: async (values) => {
//       await register(values);
//     },
//   });

//   return (
//     <div className=" relative min-h-screen flex flex-col items-center justify-center">
//       <Toaster />

//       {/* Background */}
//       <div className="absolute z-[-1] top-0 left-0 h-[100%] w-[100vw]">
//         <Image
//           className="w-full h-full object-cover"
//           src={background.src}
//           alt="Signup Background"
//           width={1000}
//           height={1000}
//         />
//       </div>

//       {/* Form Container */}
//       <div className="relative z-10 flex items-center justify-center text-center  text-white">
//         <form
//           onSubmit={formik.handleSubmit}
//           className="p-8 w-[600px]  flex flex-col gap-2  rounded shadow-md max-w-[100%] "
//         >
//                 {/* <button onClick={() => toast('My first toast')}>Give me a toast</button> */}

//           <div>
//             <h1 className="text-4xl font-extrabold mb-4">Sign Up</h1>
//             <p className="mb-6 text-2xl opacity-70">
//               Create an account to enjoy our features
//             </p>
//           </div>

//           {/* Name Input */}
//           <div className="mb-4 text-start">
//             <Input
//               name="name"
//               placeholder="Name"
//               icon={<User />}
//               value={formik.values.name}
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               className="bg-transparent border-border/50"
//             />
//             {formik.touched.name && formik.errors.name && (
//               <div className="text-red-500 text-sm">{formik.errors.name}</div>
//             )}
//           </div>

//           {/* Email Input */}
//           <div className="mb-4 text-start">
//             <Input
//               name="email"
//               placeholder="Email"
//               icon={<Mail />}
//               value={formik.values.email}
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               className="bg-transparent border-border/50"
//             />
//             {formik.touched.email && formik.errors.email && (
//               <div className="text-red-500 text-sm">{formik.errors.email}</div>
//             )}
//           </div>

//           {/* Password Input */}
//           <div className="mb-4 text-start">
//             <Input
//               name="password"
//               type="password"
//               placeholder="Password"
//               icon={<Lock />}
//               value={formik.values.password}
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               className="bg-transparent border-border/50"
//             />
//             {formik.touched.password && formik.errors.password && (
//               <div className="text-red-500 text-sm">
//                 {formik.errors.password}
//               </div>
//             )}
//           </div>

//           {/* Confirm Password Input */}
//           <div className="mb-4 text-start">
//             <Input
//               name="confirmPassword"
//               type="password"
//               placeholder="Confirm Password"
//               icon={<Lock />}
//               value={formik.values.confirmPassword}
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               className="bg-transparent border-border/50"
//             />
//             {formik.touched.confirmPassword &&
//               formik.errors.confirmPassword && (
//                 <div className="text-red-500 text-sm">
//                   {formik.errors.confirmPassword}
//                 </div>
//               )}
//           </div>

//           {/* API Error Message */}
//           {/* {isError && apiError && (
//             <div className="mb-4 text-red-500">
//               {apiError.message || "An error occurred"}
//             </div>
//           )} */}

// <div className="flex justify-between items-center mb-4">
//             <div className="flex items-center">
//               <Checkbox name="remember" className="bg-gray-500 " />
//               <span className="ml-2 text-gray-400">Remember me</span>
//             </div>
//             <div>
            
//             </div>
//           </div>

//           {/* Signup Button */}
//           <Button
//             type="submit"
//             className="w-full mb-4 bg-secondary/20 font-extrabold text-lg"
//             disabled={isLoading}
//           >
//             {isLoading ? "Signing Up..." : "Sign Up"}
//           </Button>

//           <div className="flex items-center my-4">
//   <Separator className="flex-1 opacity-50" />
//   <span className="mx-4 text-gray-500">or</span>
//   <Separator className="flex-1 opacity-50" />
// </div>


//           {/* Social Signup Options */}
//           <div className="flex items-center justify-center">
//             <Button
//               type="button"
//               variant="ghost"
//               className="flex items-center justify-center w-max"
//               onClick={() => console.log("Google Signup")}
//             >
//               <FcGoogle size={20} />
//             </Button>
//             <Button
//               type="button"
//               variant="ghost"
//               className="flex items-center justify-center w-max"
//               onClick={() => console.log("Facebook Signup")}
//             >
//               <FaFacebookF color="#1877F2" size={20} />
//             </Button>
//           </div>

//           {/* Login Link */}
//           <div className="text-center text-secondary/30">
//            You already have an account?{"  "}
//             <Link href={`/${locale}/signin`} className="text-white">
//               Log in
//             </Link>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Signup;



"use client";
import { useFormik } from "formik";
import Image from "next/image";
import background from "../../../../assets/backgrounds/login.jpg";
import * as Yup from "yup";
import { Input } from "@/components/ui/input";
import { Lock, Mail, User } from "lucide-react";
import Link from "next/link";
import { useLocale } from "next-intl";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";
import { useRegisterMutation } from "@/redux/features/auth/authApi";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/redux/features/auth/authSlice";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Toaster } from "@/components/ui/sonner";
import { Checkbox } from "@/components/ui/checkbox";

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
});

const Signup = () => {
  const locale = useLocale();
  const router = useRouter();
  const dispatch = useDispatch();
  const [rememberMe, setRememberMe] = useState(false);
  
  const [register, { isError, isSuccess, data, isLoading, error }] =
    useRegisterMutation();

  useEffect(() => {
    if (isSuccess && data) {
      // Store user data in Redux store
      dispatch(
        setCredentials({
          user: data.data.userWithoutSensitiveData,
          token: data.token,
          remember: rememberMe
        })
      );
      
      const message = data?.message || "Registration successful";
      toast.success(message);
      router.push(`/${locale}`);
    }
    
    if (isError) {
      let errorMessage = "Registration failed";
      if (error && 'data' in error) {
        errorMessage = 
        // error.data?.message ||
         errorMessage;
      }
      toast.error(errorMessage);
      console.log(error);
    }
  }, [isSuccess, data, router, locale, error, isError, dispatch, rememberMe]);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      await register(values);
    },
  });

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center">
      <Toaster />

      {/* Background */}
      <div className="absolute z-[-1] top-0 left-0 h-[100%] w-[100vw]">
        <Image
          className="w-full h-full object-cover"
          src={background.src}
          alt="Signup Background"
          width={1000}
          height={1000}
        />
      </div>

      {/* Form Container */}
      <div className="relative z-10 flex items-center justify-center text-center text-white">
        <form
          onSubmit={formik.handleSubmit}
          className="p-8 w-[600px] flex flex-col gap-2 rounded shadow-md max-w-[100%]"
        >
          <div>
            <h1 className="text-4xl font-extrabold mb-4">Sign Up</h1>
            <p className="mb-6 text-2xl opacity-70">
              Create an account to enjoy our features
            </p>
          </div>

          {/* First Name Input */}
          <div className="mb-4 text-start">
            <Input
              name="firstName"
              placeholder="First Name"
              icon={<User />}
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="bg-transparent border-border/50"
            />
            {formik.touched.firstName && formik.errors.firstName && (
              <div className="text-red-500 text-sm">{formik.errors.firstName}</div>
            )}
          </div>

          {/* Last Name Input */}
          <div className="mb-4 text-start">
            <Input
              name="lastName"
              placeholder="Last Name"
              icon={<User />}
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="bg-transparent border-border/50"
            />
            {formik.touched.lastName && formik.errors.lastName && (
              <div className="text-red-500 text-sm">{formik.errors.lastName}</div>
            )}
          </div>

          {/* Email Input */}
          <div className="mb-4 text-start">
            <Input
              name="email"
              placeholder="Email"
              icon={<Mail />}
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="bg-transparent border-border/50"
            />
            {formik.touched.email && formik.errors.email && (
              <div className="text-red-500 text-sm">{formik.errors.email}</div>
            )}
          </div>

          {/* Password Input */}
          <div className="mb-4 text-start">
            <Input
              name="password"
              type="password"
              placeholder="Password"
              icon={<Lock />}
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="bg-transparent border-border/50"
            />
            {formik.touched.password && formik.errors.password && (
              <div className="text-red-500 text-sm">
                {formik.errors.password}
              </div>
            )}
          </div>

          {/* Confirm Password Input */}
          <div className="mb-4 text-start">
            <Input
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              icon={<Lock />}
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="bg-transparent border-border/50"
            />
            {formik.touched.confirmPassword &&
              formik.errors.confirmPassword && (
                <div className="text-red-500 text-sm">
                  {formik.errors.confirmPassword}
                </div>
              )}
          </div>

          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <Checkbox 
                id="remember" 
                className="bg-gray-500" 
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(checked === true)}
              />
              <label htmlFor="remember" className="ml-2 text-gray-400 cursor-pointer">
                Remember me
              </label>
            </div>
          </div>

          {/* Signup Button */}
          <Button
            type="submit"
            className="w-full mb-4 bg-secondary/20 font-extrabold text-lg"
            disabled={isLoading}
          >
            {isLoading ? "Signing Up..." : "Sign Up"}
          </Button>

          <div className="flex items-center my-4">
            <Separator className="flex-1 opacity-50" />
            <span className="mx-4 text-gray-500">or</span>
            <Separator className="flex-1 opacity-50" />
          </div>

          {/* Social Signup Options */}
          <div className="flex items-center justify-center">
            <Button
              type="button"
              variant="ghost"
              className="flex items-center justify-center w-max"
              onClick={() => console.log("Google Signup")}
            >
              <FcGoogle size={20} />
            </Button>
            <Button
              type="button"
              variant="ghost"
              className="flex items-center justify-center w-max"
              onClick={() => console.log("Facebook Signup")}
            >
              <FaFacebookF color="#1877F2" size={20} />
            </Button>
          </div>

          {/* Login Link */}
          <div className="text-center text-secondary/30">
            You already have an account?{"  "}
            <Link href={`/${locale}/signin`} className="text-white">
              Log in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;