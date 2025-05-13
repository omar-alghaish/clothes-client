'use client'
import { useFormik } from 'formik';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import * as yup from 'yup';
import { useContactUsMutation } from '@/redux/features/contact/contactApi';
import { toast, Toaster } from "sonner";

interface Contact {
    name: string;
    email: string;
    subject: string;
    message: string;
}

export default function TestForm() {
    const [contactUs, { isLoading }] = useContactUsMutation();

    const initialInputValues = {
        name: '',
        email: '',
        subject: '',
        message: '',
    }

    const contactSchema = yup.object({
        name: yup.string().min(3, 'Name must be 3 characters or more').required('Name is required'),
        email: yup.string().email('Must be a valid email').required('Email is required'),
        subject: yup.string().required('Subject is required'),
        message: yup.string().required('Message is required')
    })

    const handleSubmit = async (values: Contact) => {
        try {
            const result = await contactUs(values).unwrap();
            toast.success('Request sent successfully');
            console.log(result);
            formik.resetForm();
        } catch (error) {
            console.error('Failed to send contact request:', error);
            toast.error('Failed to send request. Please try again.');
        }
    }

    const formik = useFormik({
        initialValues: initialInputValues,
        validationSchema: contactSchema,
        onSubmit: handleSubmit,
    });

    return (
        <>
            <Toaster />
            <form onSubmit={formik.handleSubmit} className="w-full space-y-4 mt-10 lg:space-y-6">
                {/* Name Field */}
                <div>
                    <Input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        className="rounded-lg"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.name}
                    />
                    {formik.touched.name && formik.errors.name &&
                        <p className="ml-2 text-red-600">{formik.errors.name}</p>}
                </div>

                {/* Email Field */}
                <div>
                    <Input
                        type="email"
                        name="email"
                        placeholder="E-mail"
                        className="rounded-lg"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                    />
                    {formik.touched.email && formik.errors.email &&
                        <p className="ml-2 text-red-600">{formik.errors.email}</p>}
                </div>

                {/* Subject Field */}
                <div>
                    <Input
                        type="text"
                        name="subject"
                        placeholder="Subject"
                        className="rounded-lg"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.subject}
                    />
                    {formik.touched.subject && formik.errors.subject &&
                        <p className="ml-2 text-red-600">{formik.errors.subject}</p>}
                </div>

                {/* Message Field */}
                <div>
                    <Textarea
                        name="message"
                        placeholder="Your Message"
                        className="rounded-lg"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.message}
                    />
                    {formik.touched.message && formik.errors.message &&
                        <p className="ml-2 text-red-600">{formik.errors.message}</p>}
                </div>

                {/* Submit Button */}
                <Button
                    type="submit"
                    className="w-40 bg-primary text-[18px] font-bold disabled:bg-gray-400"
                    disabled={isLoading || !formik.isValid}
                >
                    {isLoading ? 'Submitting...' : 'Submit'}
                </Button>
            </form>
        </>
    );
}