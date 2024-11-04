import { useState, useEffect } from "react";
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

  const [errors, setErrors] = useState({
    first_name: "",
    last_name: "",
    business_email: "",
    brand_or_agency: "",
    company_name: "",
  });

  const validateField = (key: keyof IModalData, value: string) => {
    switch (key) {
      case "first_name":
        return value ? "" : "Required Field"; // Returns empty string if valid
      case "last_name":
        return value ? "" : "Required Field";
      case "business_email":
        if (!value) return "Required Field";
        return /\S+@\S+\.\S+/.test(value) ? "" : "Invalid email format"; // Proper validation
      case "brand_or_agency":
        return value ? "" : "Required Field";
      case "company_name":
        return value ? "" : "Required Field";
      default:
        return "";
    }
  };

  const addValue = (key: keyof IModalData, value: string) => {
    // Update the input value
    setValues((prevValues) => ({
      ...prevValues,
      [key]: value,
    }));

    // Validate the field and update the error state immediately
    const errorMessage = validateField(key, value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [key]: errorMessage,
    }));
  };

  const validateForm = () => {
    const formErrors = {
      first_name: validateField("first_name", values.first_name),
      last_name: validateField("last_name", values.last_name),
      business_email: validateField("business_email", values.business_email),
      brand_or_agency: validateField("brand_or_agency", values.brand_or_agency),
      company_name: validateField("company_name", values.company_name),
    };

    setErrors(formErrors);

    return !Object.values(formErrors).some((error) => error);
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit?.(values); // Pass the collected form values to the parent
    }
  };

  useEffect(() => {
    if (!visible) {
      setErrors({
        first_name: "",
        last_name: "",
        business_email: "",
        brand_or_agency: "",
        company_name: "",
      });
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
                        addValue("first_name", event.target.value)
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
                        addValue("last_name", event.target.value)
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
                    addValue("business_email", event.target.value)
                  }
                  error={errors.business_email}
                />

                <AppSelectDropdown
                  label="Are you a brand or agency"
                  options={[
                    { label: "Brand", value: "brand" },
                    { label: "Agency", value: "Agency" },
                  ]}
                  onChange={(value) => addValue("brand_or_agency", value)}
                  error={errors.brand_or_agency}
                />

                <AppInput
                  label="Company Name"
                  className="w-full"
                  value={values.company_name}
                  onChange={(event) =>
                    addValue("company_name", event.target.value)
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
