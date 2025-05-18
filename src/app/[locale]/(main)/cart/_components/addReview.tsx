"use client";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";
import { useAddReviewMutation } from "@/redux/features/products/productsApi";
interface ReviewFormProps {
  colors: string[];
  sizes: string[];
  productDetails: {
    _id: string;
    color: string;
    size: string;
  };
}

const validationSchema = Yup.object({
  rating: Yup.number().required("Rating is required").min(1, "Please select a rating"),
  color: Yup.string().required("Color is required"),
  size: Yup.string().required("Size is required"),
  review: Yup.string().required("Review is required"),
});

const ReviewForm = ({ colors, sizes, productDetails }: ReviewFormProps) => {
  const formik = useFormik({
    initialValues: {
      rating: 0,
      color: "",
      size: "",
      review: "",
    },
    validationSchema,
    onSubmit: (values) => {
      addReview({
        itemId: productDetails._id,
        rating: values.rating,
        comment: values.review,
      });
    },
  });

    const [addReview, {  }] = useAddReviewMutation();

  return (
    <div className="border rounded-lg p-6 mx-auto space-y-6">
      <h2 className="text-2xl font-semibold">Submit Your Review</h2>
      
      <form onSubmit={formik.handleSubmit} className="space-y-6">
        {/* Rating Section */}
        <div className="space-y-2">
          <Label htmlFor="rating">Add Your Rating *</Label>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Button
                type="button"
                key={star}
                onClick={() => formik.setFieldValue("rating", star)}
                className="focus:outline-none   p-0 bg-transparent hover:bg-transparent"
              >
                <Star
                  className={`w-10 h-10 ${
                    star <= formik.values.rating
                      ? "text-yellow-400 fill-current"
                      : "text-gray-300"
                  }`}
                //   size={20}
                />
              </Button>
            ))}
          </div>
          {formik.touched.rating && formik.errors.rating && (
            <div className="text-sm text-red-500">{formik.errors.rating}</div>
          )}
        </div>

        {/* Product Details */}
        {/* <div className="space-y-2">
          <Label>Product Details</Label>
          <div className="flex gap-4 text-sm text-gray-600">
            <p>Color: {productDetails.color}</p>
            <p>Size: {productDetails.size}</p>
          </div>
        </div> */}
<div className="flex gap-6 flex-col md:flex-row" >
 <div className="space-y-2 flex-1">
          <Label htmlFor="color">Color *</Label>
          <Select
            name="color"
            value={formik.values.color}
            onValueChange={(value) => formik.setFieldValue("color", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Color" />
            </SelectTrigger>
            <SelectContent>
              {colors.map((color) => (
                <SelectItem key={color} value={color}>
                  {color}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {formik.touched.color && formik.errors.color && (
            <div className="text-sm text-red-500">{formik.errors.color}</div>
          )}
        </div>

        {/* Size Selection */}
        <div className="space-y-2 flex-1">
          <Label htmlFor="size">Size *</Label>
          <Select
            name="size"
            value={formik.values.size}
            onValueChange={(value) => formik.setFieldValue("size", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Size" />
            </SelectTrigger>
            <SelectContent>
              {sizes.map((size) => (
                <SelectItem key={size} value={size}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {formik.touched.size && formik.errors.size && (
            <div className="text-sm text-red-500">{formik.errors.size}</div>
          )}
        </div>
</div>
        {/* Color Selection */}
       

        {/* Review Text */}
        <div className="space-y-2">
          <Label htmlFor="review">Write Your Review *</Label>
          <Textarea
            id="review"
            name="review"
            value={formik.values.review}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Write here...."
            className="h-32"
          />
          {formik.touched.review && formik.errors.review && (
            <div className="text-sm text-red-500">{formik.errors.review}</div>
          )}
        </div>

        <Button type="submit" className="w-[200px]">
          Leave feedback
        </Button>
      </form>
    </div>
  );
};

export default ReviewForm;