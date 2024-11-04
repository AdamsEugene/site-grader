// import React, { useState } from 'react';

interface OptionProps {
  label: string;
  value: string | number;
}

interface AppSelectDropdownProps {
  options: OptionProps[];
  label?: string;
  className?: string;
  onChange?: (value: string) => void;
}

const AppSelectDropdown = ({
  options,
  label,
  onChange,
  className,
}: AppSelectDropdownProps) => {
  // const [selectedOption, setSelectedOption] = useState<OptionProps>();
  return (
    <div className="relative overflow-hidden">
      <label className="block mb-2">{label}</label>
      <select
        onChange={(event) => onChange?.(event.target.value)}
        className={`bg-white rounded-lg text-gray-700 p-2 px-3 outline-none w-full max-h-48 overflow-y-auto ${className}`}
      >
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
    </div>
  );
};

export default AppSelectDropdown;
