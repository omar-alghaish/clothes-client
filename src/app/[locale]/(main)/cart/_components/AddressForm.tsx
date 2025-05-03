"use client"
import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "sonner";
import { Check, ChevronsUpDown, Search, X } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useCreateAddressMutation, useUpdateAddressMutation } from "@/redux/features/user/userApi";

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  phoneNumber: Yup.string()
    .matches(/^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/, "Invalid phone number")
    .required("Phone is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  country: Yup.string().required("Country is required"),
  city: Yup.string().required("City is required"),
  state: Yup.string().required("State is required"),
  streetAddress: Yup.string().required("Street address is required"),
  zipCode: Yup.string().required("Zip code is required"),
});

interface AddressFormProps {
  onSuccess?: (id?: string) => void;
  initialValues?: {
    id?: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    country: string;
    city: string;
    state: string;
    streetAddress: string;
    zipCode: string;
  };
}

const AddressForm: React.FC<AddressFormProps> = ({ onSuccess, initialValues }) => {
  const [createAddress, { isLoading: isCreating }] = useCreateAddressMutation();
  const [updateAddress, { isLoading: isUpdating }] = useUpdateAddressMutation();
  
  const isLoading = isCreating || isUpdating;
  const isEditing = Boolean(initialValues?.id);

  // Location data states
  const [countries, setCountries] = useState<{ value: string; label: string }[]>([]);
  const [states, setStates] = useState<{ value: string; label: string }[]>([]);
  const [cities, setCities] = useState<{ value: string; label: string }[]>([]);
  
  // Loading states
  const [loadingCountries, setLoadingCountries] = useState(false);
  const [loadingStates, setLoadingStates] = useState(false);
  const [loadingCities, setLoadingCities] = useState(false);

  const formik = useFormik({
    initialValues: initialValues || {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      country: "",
      city: "",
      state: "",
      streetAddress: "",
      zipCode: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        if (isEditing && initialValues?.id) {
          const result = await updateAddress({ 
            id: initialValues.id, 
            address: values 
          }).unwrap();

          console.log(result)
          
          toast.success("Address updated successfully!");
          if (onSuccess) onSuccess(initialValues.id);
        } else {
          const result = await createAddress(values).unwrap();
          const addressId = result?._id;
          
          toast.success("Address saved successfully!");
          if (onSuccess) onSuccess(addressId);
        }
      } catch (error) {
        console.error('Failed to save address:', error);
        toast.error('Failed to save address. Please try again.');
      }
    },
  });

  useEffect(() => {
    fetchCountries();
  }, []);

  useEffect(() => {
    if (formik.values.country) {
      fetchStates(formik.values.country);
      // Reset state and city when country changes
      if (!isEditing) {
        formik.setFieldValue("state", "");
        formik.setFieldValue("city", "");
      }
    }
  }, [formik.values.country]);

  // Fetch cities when state changes
  useEffect(() => {
    if (formik.values.state) {
      fetchCities(formik.values.country, formik.values.state);
      // Reset city when state changes
      if (!isEditing) {
        formik.setFieldValue("city", "");
      }
    }
  }, [formik.values.state]);

  // Fetch countries from API
  const fetchCountries = async () => {
    setLoadingCountries(true);
    try {
      const response = await fetch('https://countriesnow.space/api/v0.1/countries');
      const data = await response.json();
      
      if (data.data && Array.isArray(data.data)) {
        const formattedCountries = data.data.map((country: { country: string; iso2?: string }) => ({
          value: country.iso2 || country.country,
          label: country.country
        }));
        setCountries(formattedCountries);
      }
    } catch (error) {
      console.error('Error fetching countries:', error);
      toast.error('Failed to load countries');
    } finally {
      setLoadingCountries(false);
    }
  };

  // Fetch states for a specific country
  const fetchStates = async (countryCode: string) => {
    setLoadingStates(true);
    setStates([]);
    try {
      // Find country name from the selected country code
      const countryName = countries.find(c => c.value === countryCode)?.label;
      
      if (!countryName) {
        setStates([]);
        return;
      }
      
      const response = await fetch('https://countriesnow.space/api/v0.1/countries/states', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ country: countryName }),
      });
      
      const data = await response.json();
      
      if (data.data && data.data.states && Array.isArray(data.data.states)) {
        const formattedStates = data.data.states.map((state: { state_code?: string; name: string }) => ({
          value: state.state_code || state.name,
          label: state.name
        }));
        setStates(formattedStates);
      }
    } catch (error) {
      console.error('Error fetching states:', error);
      toast.error('Failed to load states');
    } finally {
      setLoadingStates(false);
    }
  };

  // Fetch cities for a specific country and state
  const fetchCities = async (countryCode: string, stateCode: string) => {
    setLoadingCities(true);
    setCities([]);
    try {
      // Find country name from the selected country code
      const countryName = countries.find(c => c.value === countryCode)?.label;
      // Find state name from the selected state code
      const stateName = states.find(s => s.value === stateCode)?.label;
      
      if (!countryName || !stateName) {
        setCities([]);
        return;
      }
      
      const response = await fetch('https://countriesnow.space/api/v0.1/countries/state/cities', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          country: countryName,
          state: stateName
        }),
      });
      
      const data = await response.json();
      
      if (data.data && Array.isArray(data.data)) {
        const formattedCities = data.data.map((city: string) => ({
          value: city,
          label: city
        }));
        setCities(formattedCities);
      }
    } catch (error) {
      console.error('Error fetching cities:', error);
      toast.error('Failed to load cities');
    } finally {
      setLoadingCities(false);
    }
  };

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-6">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col lg:flex-row gap-6">
          <FormField
            label="First Name"
            name="firstName"
            placeholder="Ex. John"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.firstName && formik.errors.firstName}
          />

          <FormField
            label="Last Name"
            name="lastName"
            placeholder="Ex. Doe"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.lastName && formik.errors.lastName}
          />
        </div>

        <FormField
          label="Phone"
          name="phoneNumber"
          placeholder="+1 234 567 890"
          value={formik.values.phoneNumber}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.phoneNumber && formik.errors.phoneNumber}
        />

        <FormField
          label="Email"
          name="email"
          type="email"
          placeholder="john@example.com"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && formik.errors.email}
        />

        <FormSelect
          label="Country"
          name="country"
          placeholder={loadingCountries ? "Loading countries..." : "Select Country"}
          value={formik.values.country}
          onChange={(value: string) => formik.setFieldValue("country", value)}
          error={formik.touched.country && formik.errors.country}
          options={countries}
          isLoading={loadingCountries}
        />

        <FormSelect
          label="State"
          name="state"
          placeholder={
            !formik.values.country 
              ? "Select country first" 
              : loadingStates 
                ? "Loading states..." 
                : "Select State"
          }
          value={formik.values.state}
          onChange={(value: string) => formik.setFieldValue("state", value)}
          error={formik.touched.state && formik.errors.state}
          options={states}
          isLoading={loadingStates}
          isDisabled={!formik.values.country || loadingStates}
        />

        <FormSelect
          label="City"
          name="city"
          placeholder={
            !formik.values.state 
              ? "Select state first" 
              : loadingCities 
                ? "Loading cities..." 
                : "Select City"
          }
          value={formik.values.city}
          onChange={(value: string) => formik.setFieldValue("city", value)}
          error={formik.touched.city && formik.errors.city}
          options={cities}
          isLoading={loadingCities}
          isDisabled={!formik.values.state || loadingCities}
        />

        <FormField
          label="Zip Code"
          name="zipCode"
          placeholder="12345"
          value={formik.values.zipCode}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.zipCode && formik.errors.zipCode}
        />

        <FormField
          label="Street Address"
          name="streetAddress"
          placeholder="123 Main St"
          value={formik.values.streetAddress}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.streetAddress && formik.errors.streetAddress}
        />
      </div>

      <Button 
        type="submit" 
        className="w-full"
        disabled={!formik.isValid || isLoading}
      >
        {isLoading ? 'Saving...' : isEditing ? 'Update Address' : 'Save Address'}
      </Button>
    </form>
  );
};

interface FormFieldProps {
  label: string;
  name: string;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  error?: string | boolean;
}

const FormField: React.FC<FormFieldProps> = ({ label, name, type = "text", placeholder, value, onChange, onBlur, error }) => {
  return (
    <div className="space-y-2 flex-1">
      <Label>{label}</Label>
      <Input
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

interface FormSelectProps {
  label: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  error?: string | boolean;
  options: { value: string; label: string }[];
  isLoading?: boolean;
  isDisabled?: boolean;
}

const FormSelect: React.FC<FormSelectProps> = ({ 
  label, 
  placeholder, 
  value, 
  onChange, 
  error, 
  options,
  isLoading = false,
  isDisabled = false
}) => {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Focus input when popover opens
  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);
  
  // Filter options based on search term
  const filteredOptions = options.filter(option => 
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Get selected option label
  const selectedLabel = value ? 
    options.find(option => option.value === value)?.label || placeholder : 
    placeholder;
  
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Popover open={open && !isDisabled} onOpenChange={(openState) => !isDisabled && setOpen(openState)}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
            disabled={isDisabled}
          >
            {isLoading ? (
              <div className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span className="truncate">Loading...</span>
              </div>
            ) : (
              <span className="truncate">{selectedLabel}</span>
            )}
            <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0" align="start">
          <div className="flex items-center border-b p-2">
            <Search className="mr-2 h-4 w-4 opacity-50" />
            <Input
              ref={inputRef}
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border-0 p-1 shadow-none focus-visible:ring-0"
            />
            {searchTerm && (
              <X
                className="h-4 w-4 opacity-50 cursor-pointer" 
                onClick={() => setSearchTerm("")}
              />
            )}
          </div>
          
          <div className="max-h-60 overflow-y-auto">
            {filteredOptions.length === 0 ? (
              <div className="p-2 text-center text-sm text-muted-foreground">
                No options found.
              </div>
            ) : (
              filteredOptions.map((option) => (
                <div
                  key={option.value}
                  className={cn(
                    "flex cursor-pointer items-center justify-between px-2 py-1.5 hover:bg-muted",
                    value === option.value && "bg-muted"
                  )}
                  onClick={() => {
                    onChange(option.value);
                    setSearchTerm("");
                    setOpen(false);
                  }}
                >
                  <span>{option.label}</span>
                  {value === option.value && (
                    <Check className="h-4 w-4" />
                  )}
                </div>
              ))
            )}
          </div>
        </PopoverContent>
      </Popover>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default AddressForm;