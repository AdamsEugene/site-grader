import React, { useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import { MdChevronRight } from "react-icons/md";

interface CollapsibleProps {
  title: string;
  children: React.ReactNode;
}

const Collapsible: React.FC<CollapsibleProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="border rounded-lg shadow-md text-white bg-gray-800">
      <div
        onClick={toggleOpen}
        className="flex justify-between items-center px-3 cursor-pointer"
      >
        <p className="w-full text-left py-3 capitalize text-sm">{title}</p>
        {isOpen ? <BiChevronDown size={25} /> : <MdChevronRight size={25} />}
      </div>
      {isOpen && <div className="max-h-40 overflow-auto">{children}</div>}
    </div>
  );
};

export default Collapsible;
