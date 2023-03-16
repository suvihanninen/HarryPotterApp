import './App.css';
import { Input } from "@material-tailwind/react";
import { useState, useEffect, useRef, useCallback } from "react";
import Dropdown from './Dropdown';
import React from 'react';
import { Character } from './model';
import { Greetings } from './greetingModel';
import FilterComponent from './FilterComponent';
import ErrorBoundary from './ErrorBoundary';
import ErrorProneComponent from './ErrorProneComponent';

async function fetchData() {
  try {
    const response = await fetch("https://hp-api.onrender.com/api/characters");
    const result = await response.json(); // casted try / catch
    return result as Character[]
  } catch (e) {
    const error = e as Error
    console.log(error.name);
    console.log(error.message);
  }

}



export default function App() {

  const [data, setData] = useState<Character[]>();
  const [greetingData, setGreetingData] = useState<Greetings>();
  const [count, setCount] = useState(0);
  const [selectedName, setSelectedName] = useState("")
  const[filterAttributes, setFilterAttributes] = useState([""])

  const[formValues, setFormValues] = useState({
                                                characterName: "",
                                                wood: "",
                                                core: "",
                                                length: 0
                                              })
//useCallback
  useEffect(() => {
    const getData = async () => {

     const response = await fetchData()
     setData(response);
    }

    getData()
    
  }, [count]);

//UseMemo
  useEffect(() => {
    renderCharacters()
  }, [data])

  const fetchGreetingsData = useCallback(
    async function(){
      try {
        const response = await fetch('https://www.greetingsapi.com/greetings');
        const jsonData = await response.json();
        setGreetingData(jsonData);
      } catch (e) {
        console.log(e)
      }
    },
    [],
  )
  
  
 useEffect(() => {
   fetchGreetingsData()
 
 }, [fetchGreetingsData])
 

  function renderCharacters(){
     
      return data?.map((item) =>(
        <div className='table' key={item.id}>
          <h3 className="text-3xl font-bold underline text-primary" >{item.name}</h3>
          <h4 className='wand-field'>Wand</h4>
          <span className='text-blue-450 pl-4 mr-[150px]' >Wood: {item.wand.wood}</span>
          <span className='text-blue-450 pl-4'>Core: {item.wand.core}</span>
          <span className='text-blue-450 pl-4'>Length: {item.wand.length}</span>
          <img alt="" src={item.image} width={200} height={250}></img>
          <br />
          <br />
        </div>
      )
    )
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>){
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  }
  
  function onSubmit(e: React.FormEvent){
    e.preventDefault()
    console.log(formValues.characterName)
    const matchingCharacter = data?.find(character => character.name === formValues.characterName);
    console.log(matchingCharacter)
    if (matchingCharacter) {
      const updatedCharacter: Character = {
        ...matchingCharacter,

        wand: {
          wood: formValues.wood,
          core: formValues.core,
          length: formValues.length
        }
      };
      
      const updatedData = data?.map(character => character.id === matchingCharacter.id ? updatedCharacter : character);
      updatedData?.map(character => console.log(character))
      setData(updatedData);

    } 
    
    setSelectedName("")
    setFormValues({
      characterName: "",
      wood: "",
      core: "",
      length: 0
    });
  }




  function handleClick() {
    setCount(prevCount => ++prevCount)
    console.log(count)
  }

  function handleSelectedNameChange(selectedName: string) {
    console.log(`Selected name: ${selectedName}`);
    setFormValues(prevState=>({...prevState, characterName: selectedName}))
  }

  function getGreeting(): string{
    let greeting = ""
    if(greetingData !== undefined){
      const number = Math.floor(Math.random() * greetingData?.greetings.length);
      greeting = greetingData.greetings[number]
      return greeting
    }else{
      return "no greetings"
    }


    
  }

  return (
    
    <div >
      {greetingData && <h1>{getGreeting()}</h1>}
      <button onClick={handleClick} className="bg-blue-450 px-10 py-10">Load data</button>
      <FilterComponent filterAttributes={filterAttributes} setFilterAttributes={setFilterAttributes} data={data}/>
      <form onSubmit={onSubmit}>
        {data && <Dropdown  filterAttributes={filterAttributes} setFilterAttributes={setFilterAttributes} selectedName={selectedName} setSelectedName={setSelectedName} onSelectedNameChange={handleSelectedNameChange} data={data} />}

        <div className="form-example">
          <label htmlFor="wood">Enter material: </label>
          <Input type="text" name="wood" id="wood" value={formValues.wood} onChange={handleInputChange} required />
        </div>
        <div className="form-example">
          <label htmlFor="core">Enter core: </label>
          <Input type="text" name="core" id="core" value={formValues.core} onChange={handleInputChange} required />
        </div>
        <div className="form-example">
          <label htmlFor="length">Enter length: </label>
          <Input type="text" name="length" id="length" value={formValues.length} onChange={handleInputChange} required />
        </div>
        <button className="bg-blue-450 px-10 py-10">Submit</button>
      </form>
      <ErrorBoundary>
      <ErrorProneComponent />
    </ErrorBoundary>
      <div>
        {data ? (renderCharacters()) : (<p>Loading...</p>)}

      </div>
      
    </div>
  );
}