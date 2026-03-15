import './App.css'
import { useState } from 'react'

function App() {
  // Local state used to show the result of each event.
  const [clickCount, setClickCount] = useState(0)
  const [typedText, setTypedText] = useState('')
  const [name, setName] = useState('')
  const [submittedName, setSubmittedName] = useState('')

  // Runs when the button is clicked.
  const handleButtonClick = () => {
    setClickCount((prevCount) => prevCount + 1)
  }

  // Runs on every input value change and reads from event.target.value.
  const handleTextChange = (event) => {
    setTypedText(event.target.value)
  }

  // Keeps the form input controlled by React state.
  const handleNameChange = (event) => {
    setName(event.target.value)
  }

  // Prevents page reload, stores submitted value, then clears the field.
  const handleFormSubmit = (event) => {
    event.preventDefault()
    setSubmittedName(name)
    setName('')
  }

  return (
    <>
      <h1>React Concept 2</h1>

      {/* onClick triggers the handler when the button is pressed. */}
      <h2>1) Click Event</h2>
      <button id="btn" onClick={handleButtonClick}>Click me</button>
      <p>Button clicked: {clickCount} times</p>

      {/* onChange fires on each keystroke in this controlled input. */}
      <h2>2) Change Event</h2>
      <input
        type="text"
        placeholder="Type something..."
        value={typedText}
        onChange={handleTextChange}
      />
      <p>Current input value: {typedText || '(empty)'}</p>

      {/* onSubmit fires when the form is submitted (button click or Enter). */}
      <h2>3) Submit Event</h2>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={handleNameChange}
        />
        <button type="submit">Submit</button>
      </form>
      <p>Submitted name: {submittedName || '(nothing submitted yet)'}</p>

    </>
  )
}










export default App
