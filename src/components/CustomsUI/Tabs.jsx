import { useState } from "react";

function Tabs({ children }) {
 const [activeTab, setActiveTab] = useState(children[0].props.label);
 

 const handleClick = (tab) => {
  setActiveTab(tab);
 };

 return (
  <div>
   <div className="flex flex-wrap items-center gap-5 mb-10">
    {children.map((child) => {
     const { label } = child.props;

     return (
      <button
       onClick={() => handleClick(label)}
       className={
        label === activeTab
         ? "active bg-blue-500 w-full md:w-auto text-white rounded-md px-5 py-2"
         : "bg-slate-100 rounded-md w-full md:w-auto px-5 py-2 border border-gray-300 border-1"
       }
      >
       {label}
      </button>
     );
    })}
   </div>

   <div className="p-10 border border-slate-200 rounded-lg">
    {children.map((child) => {
     if (child.props.label !== activeTab) return undefined;
     return child.props.children;
    })}
   </div>
  </div>
 );
}

export default Tabs;
