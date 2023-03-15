import React from 'react'
import ErrorBoundary from './ErrorBoundary';


const ErrorProneComponent = () => {

  function handleClick(e: React.MouseEvent<HTMLElement>){
    e.preventDefault()
    let number = Math.floor(Math.random() * 2); //0, 1
    console.log(number)
    if(number === 0){
        throw new Error('Something went wrong!');
    }

  }

  return (
    <div>
        <div>ErrorProneComponent</div>
        <button onClick={handleClick}>Try your luck!</button>
    </div>
  
  )
}

export default ErrorProneComponent