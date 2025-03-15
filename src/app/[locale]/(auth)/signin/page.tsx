"use client";
import { useFormik } from "formik";
import Image from "next/image";
import background from "../../../../assets/backgrounds/login.jpg";
import * as Yup from "yup";
import { Input } from "@/components/ui/input";
import { Lock, Mail } from "lucide-react";
import Link from "next/link";
import { useLocale } from "next-intl";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { toast, Toaster } from "sonner";
import { useRouter } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";
import { signIn } from "next-auth/react"
import { useDispatch } from "react-redux";
import { setCredentials } from "@/redux/features/auth/authSlice";
const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const Login = () => {
  const locale = useLocale();
  const router = useRouter();
  const dispatch = useDispatch();
  const [rememberMe, setRememberMe] = useState(false);

  const [login, { isError, isSuccess, data, isLoading, error }] =
    useLoginMutation();

  useEffect(() => {
    if (isSuccess && data) {
      // Store user data in Redux store
      dispatch(
        setCredentials({
          user: data.userWithoutSensitiveData,
          token: data.token,
          remember: rememberMe
        })
      );

      console.log(data.data.userWithoutSensitiveData, isSuccess);

      const message = data?.message || "login successful";
      toast.success(message);
      router.push(`/${locale}`);
    }
    console.log(data);
    if (isError) {
      let errorMessage = "login failed";
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
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      await login(values);
    },
  });

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center">
      {/* Background */}
      <div className="absolute z-[-1] top-0 left-0 h-[100%] w-[100vw]">
        <Image
          className="w-full h-full object-cover"
          src={background.src}
          alt="Login Background"
          width={1000}
          height={1000}
        />
      </div>
      <Toaster />

      {/* Form Container */}
      <div className="relative z-10 flex items-center justify-center text-center text-white">
        <form
          onSubmit={formik.handleSubmit}
          className="p-8 w-[600px] flex flex-col gap-2 rounded shadow-md max-w-[100%]"
        >
          <div>
            <h1 className="text-4xl font-extrabold mb-4">Log In</h1>
            <p className="mb-6 text-2xl opacity-70">
              Access your account to continue
            </p>
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
              <div className="text-red-500 text-sm">{formik.errors.password}</div>
            )}
          </div>

          {/* Remember Me and Forgot Password */}
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
            <div>
              <Link
                href={`/${locale}/forget-password`}
                className="text-gray-400"
              >
                Forgot password?
              </Link>
            </div>
          </div>

          {/* Login Button */}
          <Button
            type="submit"
            className="w-full mb-4 bg-secondary/20 font-extrabold text-lg"
            disabled={isLoading}
          >
            {isLoading ? "Logging In..." : "Log In"}
          </Button>

          <div className="flex items-center my-4">
            <Separator className="flex-1 opacity-50" />
            <span className="mx-4 text-gray-500">or</span>
            <Separator className="flex-1 opacity-50" />
          </div>

          {/* Social Login Options */}
          <div className="flex items-center justify-center">
            <Button
              type="button"
              variant="ghost"
              className="flex items-center justify-center w-max"
              onClick={() => signIn("google", { callbackUrl: "/" })}
            >
              <FcGoogle size={20} />
            </Button>
            <Button
              type="button"
              variant="ghost"
              className="flex items-center justify-center w-max"
              onClick={() => console.log("Facebook Login")}
            >
              <FaFacebookF color="#1877F2" size={20} />
            </Button>
          </div>

          {/* Signup Link */}
          <div className="text-center text-secondary/30">
            Don&apos;t have an account?{" "}
            <Link href={`/${locale}/signup`} className="text-white">
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
