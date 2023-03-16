import React, { useMemo } from "react";
import { useState, useEffect } from "react";
import { Character } from './model';


type Props={
    data: Character[],//string array of names, we do not neet the whole object here
    onSelectedNameChange: (selectedName: string) => void;
    selectedName: string,
    setSelectedName: React.Dispatch<React.SetStateAction<string>>,
    setFilterAttributes: React.Dispatch<React.SetStateAction<string[]>>,
    filterAttributes: string[],
}

const Dropdown = ({data, selectedName, filterAttributes, setFilterAttributes, setSelectedName, onSelectedNameChange}:Props) =>{
    

    useEffect(() => {
        console.log("Mounted")
    
      return () => {
        console.log("unMounted")
      }
    }, [])

    const filteredCharacters = useMemo(() => {
        console.log("useMemo was ran")
        return data.filter(characters => filterAttributes.includes(characters.species) && filterAttributes.includes(characters.eyeColour) && filterAttributes.includes(characters.gender) && filterAttributes.includes(characters.ancestry) && filterAttributes.includes(characters.hairColour))}
     
    
    , [data, filterAttributes])
    //control + space
    //cmd + d
    
    
    const handleSelectNameChange = (e: React.ChangeEvent<HTMLSelectElement>) =>{
        onSelectedNameChange(e.target.value);
        setSelectedName(e.target.value)
    }
    
//Render only if wand is null
    return(
        <div>
            <label htmlFor="dropdown">Choose an option:</label>
            <select id="dropdown" value={selectedName} onChange={handleSelectNameChange}>
                <option value="">Select</option>
                {filteredCharacters.map((filteredCharacter) => (
                    <React.Fragment key={filteredCharacter.name}>
                    <option  value={filteredCharacter.name}>
                    {filteredCharacter.name}
                    </option>
                    </React.Fragment>
                ))}
            </select>
            <p>You have selected: {selectedName}</p>
        </div>
    )
}

export default Dropdown