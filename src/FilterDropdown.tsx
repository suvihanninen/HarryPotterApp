import React, { useEffect, useState } from "react";

type Props<T extends string>={
   label: T,
   options?: T[],
   onSetFilterAttributes: (x: T[]) => void,
   filterAttributes: T[],
   triggerReset: boolean
}


export default function FilterDropdown<T extends string,>({triggerReset, options, label, filterAttributes, onSetFilterAttributes}:Props<T>) {
    const [selectedOption, setSelectedOption] = useState<T>();
    
    useEffect(() => {
        setSelectedOption(undefined)
    
      
    }, [triggerReset])
    
    function handleOptionSelected(value: T){
        setSelectedOption(value)
        onSetFilterAttributes([...filterAttributes, value]);

    }
    

   

    return(
        <div>
            <label htmlFor="dropdown">Choose {label}</label>
            <select id="dropdown" value={selectedOption} onChange={(e)=>handleOptionSelected(e.target.value as T)}>
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