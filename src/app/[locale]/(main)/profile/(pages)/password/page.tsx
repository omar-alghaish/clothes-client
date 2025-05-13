"use client";
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import Link from 'next/link'
import { useChangePasswordMutation } from '@/redux/features/user/userApi';
import { toast, Toaster } from 'sonner';

interface PasswordData {
  currentPassword: string;
  newPassword: string;
  newPasswordConfirm: string;
}

interface errortype {
  data?: {
    message?: string;
  };
  status?: number;
}

const validationSchema = Yup.object().shape({
  currentPassword: Yup.string()
    .required('Current password is required'),
  newPassword: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    )
    .notOneOf([Yup.ref('currentPassword')], 'New password cannot be the same as current password')
    .required('New password is required'),
  newPasswordConfirm: Yup.string()
    .oneOf([Yup.ref('newPassword')], 'Passwords must match')
    .required('Confirm password is required')
});

const PasswordChangePage = () => {
  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const formik = useFormik({
    initialValues: {
      currentPassword: '',
      newPassword: '',
      newPasswordConfirm: ''
    },
    validationSchema,
    onSubmit: async (values: PasswordData) => {
      try {
        const result = await changePassword(values).unwrap();
        console.log(result);
        toast.success('Password updated successfully');
        formik.resetForm();
      } catch (error) {
        // Type casting the error to our ApiError interface
        const apiError = error as errortype;
        console.error('Failed to change password:', error);
        toast.error(apiError?.data?.message || 'Failed to update password. Please try again.');
      }
    }
  });

  return (
    <>
      <Toaster />
      <div className="mx-auto w-full space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Change Password</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Update your account password
          </p>
        </div>

        <form onSubmit={formik.handleSubmit} className="space-y-4 w-full">
          <div className="space-y-2 w-full">
            <Label htmlFor="currentPassword">Current Password</Label>
            <Input
              id="currentPassword"
              name="currentPassword"
              type="password"
              autoComplete="current-password"
              aria-describedby="currentPassword-error"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.currentPassword}
            />
            {formik.touched.currentPassword && formik.errors.currentPassword && (
              <div
                id="currentPassword-error"
                className="text-red-500 text-sm"
                aria-live="polite"
              >
                {formik.errors.currentPassword}
              </div>
            )}
            <div className="text-center mt-4">
              <Link
                href="/forgot-password"
                className="text-sm text-destructive hover:underline"
              >
                Forgot Password?
              </Link>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="newPassword">New Password</Label>
            <Input
              id="newPassword"
              name="newPassword"
              type="password"
              autoComplete="new-password"
              aria-describedby="newPassword-error newPassword-requirements"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.newPassword}
            />
            {formik.touched.newPassword && formik.errors.newPassword && (
              <div
                id="newPassword-error"
                className="text-red-500 text-sm"
                aria-live="polite"
              >
                {formik.errors.newPassword}
              </div>
            )}
            <div id="newPassword-requirements" className="text-xs text-gray-500 mt-1">
              Password must be at least 8 characters and include uppercase, lowercase, number, and special character.
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="newPasswordConfirm">Confirm Password</Label>
            <Input
              id="newPasswordConfirm"
              name="newPasswordConfirm"
              type="password"
              autoComplete="new-password"
              aria-describedby="newPasswordConfirm-error"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.newPasswordConfirm}
            />
            {formik.touched.newPasswordConfirm && formik.errors.newPasswordConfirm && (
              <div
                id="newPasswordConfirm-error"
                className="text-red-500 text-sm"
                aria-live="polite"
              >
                {formik.errors.newPasswordConfirm}
              </div>
            )}
          </div>

          <Button
            type="submit"
            className="w-[200px]"
            disabled={isLoading || !formik.dirty || !formik.isValid}
          >
            {isLoading ? 'Updating...' : 'Update Password'}
          </Button>
        </form>
      </div>
    </>

  );
};

export default PasswordChangePage;