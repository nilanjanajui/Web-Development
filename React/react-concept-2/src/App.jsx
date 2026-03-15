import './App.css'
import { useState } from 'react'

function App() {

  /*
  ================================
  React State Variables
  ================================

  useState is a React Hook that lets functional components
  store and update dynamic data.

  Syntax:
  const [state, setState] = useState(initialValue)

  state → current value
  setState → function used to update it

  Updating state causes React to re-render the component.
  */

  // Tracks how many times the button was clicked
  const [clickCount, setClickCount] = useState(0)

  // Stores the current value typed in the text input
  const [typedText, setTypedText] = useState('')

  // Stores the value currently inside the form input
  const [name, setName] = useState('')

  // Stores the value after the form is submitted
  const [submittedName, setSubmittedName] = useState('')


  /*
  ================================
  Event Handlers
  ================================

  Event handlers are functions that run
  when a user interacts with the UI.
  */

  // Runs when the button is clicked
  const handleButtonClick = () => {

    /*
    We use the functional update pattern.

    prevCount = previous state value
    This avoids bugs when multiple updates happen quickly.
    */

    setClickCount((prevCount) => prevCount + 1)
  }


  // Runs whenever the user types in the input field
  const handleTextChange = (event) => {

    /*
    event.target.value contains the current
    text inside the input field.
    */

    setTypedText(event.target.value)
  }


  // Updates the "name" state as the user types
  const handleNameChange = (event) => {
    setName(event.target.value)
  }


  // Runs when the form is submitted
  const handleFormSubmit = (event) => {

    /*
    Prevent default browser behavior.

    Normally, submitting a form reloads the page.
    In React we prevent that so the app behaves
    like a single-page application.
    */

    event.preventDefault()

    // Save the entered name
    setSubmittedName(name)

    // Clear the input field
    setName('')
  }


  return (
    <>
      <h1>React Concept 2</h1>

      {/* ================= Click Event Example ================= */}

      <h2>1) Click Event</h2>

      {/* onClick triggers handleButtonClick when pressed */}
      <button id="btn" onClick={handleButtonClick}>
        Click me
      </button>

      {/* Display the click count */}
      <p>Button clicked: {clickCount} times</p>


      {/* ================= Change Event Example ================= */}

      <h2>2) Change Event</h2>

      {/* 
      Controlled Input:
      value is controlled by React state
      onChange updates the state when typing
      */}

      <input
        type="text"
        placeholder="Type something..."
        value={typedText}
        onChange={handleTextChange}
      />

      {/* Display current typed value */}
      <p>Current input value: {typedText || '(empty)'}</p>


      {/* ================= Submit Event Example ================= */}

      <h2>3) Submit Event</h2>

      {/* onSubmit runs handleFormSubmit when form is submitted */}
      <form onSubmit={handleFormSubmit}>

        {/* Controlled input for name */}
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={handleNameChange}
        />

        {/* Button that submits the form */}
        <button type="submit">Submit</button>

      </form>

      {/* Show the submitted name */}
      <p>
        Submitted name: {submittedName || '(nothing submitted yet)'}
      </p>

    </>
  )
}

export default App