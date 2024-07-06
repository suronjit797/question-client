import { useState } from "react";
import { Link } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa";
import { menuItems } from "../../../utils/NavOption";

const SideBar = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleMenu = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full  text-primary font-semibold border-2 border-gray-500 h-[79vh] ">
      {menuItems.map((item, index) => (
        <div key={index}>
          <div
            onClick={() => toggleMenu(index)}
            className="flex justify-between items-center  hover:bg-gray-300 border-b-2 border-primary px-1"
          >
            <button className="w-full text-left px-4 py-2 ">{item.title}</button>
            <FaChevronDown className="text-primary font-semibold text-xl" />
          </div>
          {openIndex === index && (
            <div className="flex flex-col border-s-2 border-black ml-2 bg-gray-100">
              {item.content.map((item, i) => (
                <Link to={item.path} className=" text-primary font-semibold px-5 py-2 border-b-[1px]" key={i}>
                  <h2>{item.name}</h2>
                </Link>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default SideBar;
