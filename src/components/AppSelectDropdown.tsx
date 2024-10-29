interface OptionProps {
  label: string;
  value: string | number;
}

interface AppSelectDropdownProps {
  options: OptionProps[];
  label?: string;
  className?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  error?: string;
}

const AppSelectDropdown = ({
  options,
  label,
  onChange,
  className,
  placeholder = "Select",
  error,
}: AppSelectDropdownProps) => {
  return (
    <div className="relative overflow-hidden">
      {label && <label className="block mb-2 text-sm">{label}</label>}
      <div className="relative">
        <select
          onChange={(event) => onChange?.(event.target.value)}
          className={`bg-white rounded-lg text-[#5C6670] p-2 px-3 pr-10 outline-none w-full max-h-48 overflow-y-auto appearance-none ${className}`}
          defaultValue=""
        >
          <option value="" disabled hidden>
            {placeholder}
          </option>
          {options.map((option, index) => (
            <option
              key={index}
              value={option.value}
              className="bg-white text-gray-700 hover:bg-gray-200"
            >
              {option.label}
            </option>
          ))}
        </select>
        {/* Custom arrow */}
        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
      {/* Error display */}
      {error && <span className="text-errorRed text-sm">{error}</span>}
    </div>
  );
};

export default AppSelectDropdown;
