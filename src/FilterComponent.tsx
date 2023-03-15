import React, { useEffect, useState } from "react";
import { Character } from './model';
import FilterDropdown from './FilterDropdown';
import './App.css';



type Props={
    data?: Character[],
    setFilterAttributes: React.Dispatch<React.SetStateAction<string[]>>,
    filterAttributes: string[],
}

export default function FilterComponent({data, filterAttributes, setFilterAttributes}:Props) {
    const[triggerReset, setTriggerReset] = useState(true)
    const[inputValue, setInputValue] = useState<string>()
    
    
    function getOptions(category: string){
            //Get all different values behind one key
            let options: Array<string | number | boolean | object> = [];

            if (data !== undefined) {
                for (let obj of data) {
               
                for (let attr in obj) {
                   
                    if (attr === category) {
                        let optionValue = obj[attr];
                        if(typeof optionValue === 'string' || typeof optionValue === 'number'){
                            if(!options.includes(optionValue)){
                                options.push(optionValue)
                            }
                        }
                    }
                }
                }
                console.log(options)
                let optionsStringArray: Array<string> = [];

                optionsStringArray = options.map(option => option.toString())
                return optionsStringArray
            }

            
            
    }     
        
    function handleFiltering(e: React.MouseEvent<HTMLElement>){

    }

    function handleResetFilters(e: React.MouseEvent<HTMLElement>){
        console.log('BEFORE: '+filterAttributes)
        setFilterAttributes([])
        setTriggerReset(prevTrigger => !prevTrigger)
        console.log('AFTER: '+filterAttributes)
    }

    const greeting = () => <p>HELLO</p>;
    
    const greeting1 = (a: string) => <p>{a}</p>

    const greeting2 = (): string => {
        return "Hello!"
    }

    function handleClick(e: React.MouseEvent<HTMLElement>){
        e.preventDefault()
        console.log({inputValue})
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>){
        e.preventDefault()
        setInputValue(e.target.value)
        
    }

    return(
        <div className="filter-dropdown-container">
            <input onChange={handleChange} value={inputValue} placeholder="This is placeholder"/>
            <button onClick={handleClick}>Press button!</button>
            {inputValue && <p>{inputValue}</p>} 
           <FilterDropdown triggerReset={triggerReset} setFilterAttributes={setFilterAttributes} filterAttributes={filterAttributes} options={getOptions('gender')} label='gender'  />
           <FilterDropdown triggerReset={triggerReset} setFilterAttributes={setFilterAttributes} filterAttributes={filterAttributes} options={getOptions('species')} label='species' />
           <FilterDropdown triggerReset={triggerReset} setFilterAttributes={setFilterAttributes} filterAttributes={filterAttributes} options={getOptions('ancestry')} label='ancestry' />
           <FilterDropdown triggerReset={triggerReset} setFilterAttributes={setFilterAttributes} filterAttributes={filterAttributes} options={getOptions('eyeColour')} label='eyeColour' />
           <FilterDropdown triggerReset={triggerReset} setFilterAttributes={setFilterAttributes} filterAttributes={filterAttributes} options={getOptions('hairColour')} label='hairColour' />
           <button onClick={handleFiltering}>Submit filtering attributes</button>
           <button onClick={handleResetFilters}>Reset</button>
           {greeting()}
           {greeting1("HI!")}
           <p>{greeting2()}</p>
        </div>
       
    )
}