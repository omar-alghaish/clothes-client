"use client";
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import Link from 'next/link'

const validationSchema = Yup.object().shape({
  currentPassword: Yup.string()
    .required('Current password is required'),
  newPassword: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('New password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword')], 'Passwords must match')
    .required('Confirm password is required')
})

const PasswordChangePage = () => {
  const formik = useFormik({
    initialValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    },
    validationSchema,
    onSubmit: async (values) => {
      // Handle password change logic here
      console.log('Password change submitted:', values)
      // Add your API call here
    }
  })

  return (
    <div className=" mx-auto  w-full space-y-6">
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
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.currentPassword}
          />
           <div className="text-center mt-4">
          <Link
            href="/forgot-password"
            className="text-sm text-destructive hover:underline"
          >
            Forgot Password?
          </Link>
        </div>
          {formik.touched.currentPassword && formik.errors.currentPassword && (
            <div className="text-red-500 text-sm">
              {formik.errors.currentPassword}
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="newPassword">New Password</Label>
          <Input
            id="newPassword"
            name="newPassword"
            type="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.newPassword}
          />
          {formik.touched.newPassword && formik.errors.newPassword && (
            <div className="text-red-500 text-sm">
              {formik.errors.newPassword}
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.confirmPassword}
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <div className="text-red-500 text-sm">
              {formik.errors.confirmPassword}
            </div>
          )}
        </div>

        <Button
          type="submit"
          className="w-[200px]"
          disabled={formik.isSubmitting}
        >
          {formik.isSubmitting ? 'Updating...' : 'Update Password'}
        </Button>

       
      </form>
    </div>
  )
}

export default PasswordChangePage