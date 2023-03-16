import React, { useEffect, useState } from "react";
import { Character } from './model';
import FilterDropdown from './FilterDropdown';
import './App.css';



type Props={
    data?: Character[],
    setFilterAttributes: (x: string[]) => void,
    filterAttributes: string[],
}

export default function FilterComponent({data, filterAttributes, setFilterAttributes}:Props) {
    const[triggerReset, setTriggerReset] = useState(true)
    
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


    return(
        <div className="filter-dropdown-container">
           <FilterDropdown triggerReset={triggerReset} onSetFilterAttributes={setFilterAttributes} filterAttributes={filterAttributes} options={getOptions('gender')} label='gender'  />
           <FilterDropdown triggerReset={triggerReset} onSetFilterAttributes={setFilterAttributes} filterAttributes={filterAttributes} options={getOptions('species')} label='species' />
           <FilterDropdown triggerReset={triggerReset} onSetFilterAttributes={setFilterAttributes} filterAttributes={filterAttributes} options={getOptions('ancestry')} label='ancestry' />
           <FilterDropdown triggerReset={triggerReset} onSetFilterAttributes={setFilterAttributes} filterAttributes={filterAttributes} options={getOptions('eyeColour')} label='eyeColour' />
           <FilterDropdown triggerReset={triggerReset} onSetFilterAttributes={setFilterAttributes} filterAttributes={filterAttributes} options={getOptions('hairColour')} label='hairColour' />
           <button onClick={handleFiltering}>Submit filtering attributes</button>
           <button onClick={handleResetFilters}>Reset</button>
        </div>
       
    )
}