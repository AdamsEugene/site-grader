import { useState, useEffect } from "react";
import Joi from "joi";
import AppButton from "./AppButton";
import AppInput from "./AppInput";
import AppSelectDropdown from "./AppSelectDropdown";

export interface IModalData {
  first_name: string;
  last_name: string;
  business_email: string;
  brand_or_agency: "Agency" | "brand" | "";
  company_name: string;
  id: string;
}

interface IErrors {
  first_name?: string;
  last_name?: string;
  business_email?: string;
  brand_or_agency?: string;
  company_name?: string;
}

export default function AppModal({
  visible,
  onSubmit,
}: {
  visible: boolean;
  onSubmit?: (values: IModalData) => void;
}) {
  const [values, setValues] = useState<IModalData>({
    first_name: "",
    last_name: "",
    business_email: "",
    brand_or_agency: "",
    company_name: "",
    id: "",
  });

  const [errors, setErrors] = useState<IErrors>({});

  // Define Joi schema for the whole form
  const schema = Joi.object({
    first_name: Joi.string().min(1).required().messages({
      "string.empty": "First name is required",
    }),
    last_name: Joi.string().min(1).required().messages({
      "string.empty": "Last name is required",
    }),
    business_email: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .messages({
        "string.empty": "Business Email is required",
        "string.email": "Invalid email format",
      }),
    brand_or_agency: Joi.string().valid("brand", "Agency").required().messages({
      "string.empty": "Please select either 'Brand' or 'Agency'",
      "any.only": "Invalid selection",
    }),
    company_name: Joi.string().min(1).required().messages({
      "string.empty": "Company name is required",
    }),
  });

  // Validate form data with Joi
  const validateForm = (): boolean => {
    const { error } = schema.validate(values, { abortEarly: false }); // Get all validation errors at once

    if (error) {
      const newErrors = error.details.reduce<IErrors>((acc, curr) => {
        acc[curr.path[0] as keyof IErrors] = curr.message; // Ensure the error message is mapped correctly
        return acc;
      }, {});

      setErrors(newErrors);
      return false;
    }

    setErrors({});
    return true;
  };

  // Handle input change and update values
  const handleChange = (key: keyof IModalData, value: string) => {
    setValues((prevValues) => ({
      ...prevValues,
      [key]: value,
    }));
  };

  // Handle form submit
  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit?.(values); // Pass the form values to the parent if validation passes
    }
  };

  useEffect(() => {
    if (!visible) {
      setErrors({});
    }
  }, [visible]);

  if (visible)
    return (
      <>
        <div className="absolute z-10 backdrop-blur-sm bg-white/30 h-full w-full"></div>
        <div className="absolute bg-black/70 py-10 pb-20 w-full flex px-4 h-full">
          <div className="bg-emerald-800 z-10 overflow-hidden max-w-lg rounded-lg m-auto text-white h-auto">
            <div className="overflow-auto h-full p-8">
              <p className="text-xl font-bold mb-4">Whoops, our bad.</p>
              <p className="text-sm">
                Your audit is taking longer than usual. Enter your information
                below and we’ll email you the audit when it’s ready.
              </p>

              <div className="mt-5 space-y-4">
                <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-3">
                  <div className="w-full">
                    <AppInput
                      label="First name"
                      labelClassName="font-medium"
                      className="w-full"
                      value={values.first_name}
                      onChange={(event) =>
                        handleChange("first_name", event.target.value)
                      }
                      error={errors.first_name}
                    />
                  </div>
                  <div className="w-full">
                    <AppInput
                      label="Last name"
                      labelClassName="font-medium"
                      className="w-full"
                      value={values.last_name}
                      onChange={(event) =>
                        handleChange("last_name", event.target.value)
                      }
                      error={errors.last_name}
                    />
                  </div>
                </div>

                <AppInput
                  label="Business Email"
                  className="w-full"
                  value={values.business_email}
                  onChange={(event) =>
                    handleChange("business_email", event.target.value)
                  }
                  error={errors.business_email}
                />

                <AppSelectDropdown
                  label="Are you a brand or agency"
                  options={[
                    { label: "Brand", value: "brand" },
                    { label: "Agency", value: "Agency" },
                  ]}
                  onChange={(value) => handleChange("brand_or_agency", value)}
                  error={errors.brand_or_agency}
                />

                <AppInput
                  label="Company Name"
                  className="w-full"
                  value={values.company_name}
                  onChange={(event) =>
                    handleChange("company_name", event.target.value)
                  }
                  error={errors.company_name}
                />

                <div className="pt-2">
                  <AppButton
                    label="Submit"
                    onClick={handleSubmit}
                    className="bg-emerald-600 px-4 hover:bg-emerald-600/50"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
}
