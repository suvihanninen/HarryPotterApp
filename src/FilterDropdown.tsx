import React, { useEffect, useState } from "react";

type Props<T>={
   label: T,
   options: T[],
   onSetFilterAttributes: (x: T[]) => void,
   filterAttributes: T[],
   triggerReset: boolean
}


export default function FilterDropdown<T,>({triggerReset, options, label, filterAttributes, onSetFilterAttributes}:Props<T>) {
    const [selectedOption, setSelectedOption] = useState("");

    useEffect(() => {
        setSelectedOption("")
    
      
    }, [triggerReset])
    
    function handleOptionSelected(e: React.ChangeEvent<HTMLSelectElement>){
        setSelectedOption(e.target.value)
        onSetFilterAttributes([...filterAttributes, e.target.value]);

    }
    

   

    return(
        <div>
            <label htmlFor="dropdown">Choose {label}</label>
            <select id="dropdown" value={selectedOption} onChange={handleOptionSelected}>
                <option value="">Select</option>
                    {options?.map((option, index) => (
                        <React.Fragment key={index}>
                        <option  value={option}>
                        {option}
                        </option>
                        </React.Fragment>
                ))}
            </select>
            <p>Selected value: {selectedOption}</p>
        </div>
    )
}