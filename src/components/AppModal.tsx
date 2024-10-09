import AppButton from "./AppButton";
import AppInput from "./AppInput";
import AppSelectDropdown from "./AppSelectDropdown";

export default function AppModal({ visible }: { visible: boolean }) {
  if (visible)
    return (
      <>
        <div className="absolute backdrop-blur-sm bg-white/30 h-full w-full"></div>
        <div className="absolute w-full flex px-4">
          <div className="bg-emerald-700 max-w-lg rounded-lg p-5 m-auto text-white">
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
                  />
                </div>
                <div className="w-full">
                  <AppInput
                    label="Last name"
                    labelClassName="font-medium"
                    className="w-full"
                  />
                </div>
              </div>

              <AppInput label="Business Email" className="w-full" />

              <AppInput label="Are you a brand or agency" className="w-full" />

              <AppSelectDropdown
                label="Are you a brand or agency"
                options={[
                  { label: "Brand", value: 1 },
                  { label: "Agency", value: 2 },
                ]}
                // onChange={(value) => console.log(value)}
              />

              <AppInput label="Company Name" className="w-full" />

              <AppButton
                label="submit"
                primary
                className="bg-emerald-600 px-4"
              />
            </div>
          </div>
        </div>
      </>
    );
}
