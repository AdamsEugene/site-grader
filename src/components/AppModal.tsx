import { useState } from "react";
import AppButton from "./AppButton";
import AppInput from "./AppInput";
import AppSelectDropdown from "./AppSelectDropdown";

export interface IModalData {
  first_name: string;
  last_name: string;
  business_email: string;
  brand_or_agency: "Agency" | "brand";
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
    brand_or_agency: "brand", // Default value
    company_name: "",
    id: "",
  });

  const addValue = (key: keyof IModalData, value: string) => {
    setValues((prevValues) => ({
      ...prevValues,
      [key]: value,
    }));
  };

  const handleSubmit = () => {
    onSubmit?.(values); // Pass the collected form values to the parent
  };

  if (visible)
    return (
      <>
        <div className="absolute z-10 backdrop-blur-sm bg-white/30 h-full w-full"></div>
        <div className="absolute py-10 pb-20 w-full flex px-4 h-full">
          <div className="bg-emerald-700 z-10 overflow-hidden h-full max-w-lg rounded-lg m-auto text-white">
            <div className="overflow-auto h-full p-5">
              <p className="text-xl font-bold mb-4">Unlock Your Full Audit</p>
              <p>
                Enter your details to access comprehensive insights and
                personalized recommendations to boost your site's performance.
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
                />

                <AppSelectDropdown
                  label="Are you a brand or agency"
                  options={[
                    { label: "Brand", value: "brand" },
                    { label: "Agency", value: "agency" },
                  ]}
                  onChange={(value) => addValue("brand_or_agency", value)}
                />

                <AppInput
                  label="Company Name"
                  className="w-full"
                  value={values.company_name}
                  onChange={(event) =>
                    addValue("company_name", event.target.value)
                  }
                />

                <div className="pt-7">
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
