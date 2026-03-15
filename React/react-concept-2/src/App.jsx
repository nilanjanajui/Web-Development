import './App.css'
import { useState, useEffect } from 'react'

function App() {

  /*
  ================================
  React State Variables
  ================================
  */

  const [clickCount, setClickCount] = useState(0)
  const [typedText, setTypedText] = useState('')
  const [name, setName] = useState('')
  const [submittedName, setSubmittedName] = useState('')

  // Stores data fetched from API
  const [post, setPost] = useState(null)


  /*
  ================================
  Event Handlers
  ================================
  */

  const handleButtonClick = () => {
    setClickCount((prevCount) => prevCount + 1)
  }

  const handleTextChange = (event) => {
    setTypedText(event.target.value)
  }

  const handleNameChange = (event) => {
    setName(event.target.value)
  }

  const handleFormSubmit = (event) => {
    event.preventDefault()
    setSubmittedName(name)
    setName('')
  }


  /*
  ================================
  useEffect Hook Example
  ================================

  useEffect runs after the component renders.

  Here we use it to fetch data from an API.
  */

  useEffect(() => {

    fetch('https://jsonplaceholder.typicode.com/posts/1')
      .then(response => response.json())
      .then(data => {

        // Save API data into state
        setPost(data)

      })

  }, []) // empty array means run once

  // the  destructuring is a method of extracting values from objects or arrays and assigning them to variables in a more concise way.
  // In this case, we are extracting the 'title' and 'body' properties from the 'post' object and assigning them to variables with the same names.
  // const { title, body } = post || {} 
  // This line of code is using destructuring assignment to extract the 'title' and 'body' properties from the 'post' object. The 'post || {}' part is a fallback to ensure that if 'post' is null or undefined, it will default to an empty object, preventing errors when trying to access properties.

  // console.log('API Data:', post)


  return (
    <>
      <h1>React Concept 2</h1>

      {/* ================= Click Event Example ================= */}

      <h2>1) Click Event</h2>

      <button id="btn" onClick={handleButtonClick}>
        Click me
      </button>

      <p>Button clicked: {clickCount} times</p>


      {/* ================= Change Event Example ================= */}

      <h2>2) Change Event</h2>

      <input
        type="text"
        placeholder="Type something..."
        value={typedText}
        onChange={handleTextChange}
      />

      <p>Current input value: {typedText || '(empty)'}</p>


      {/* ================= Submit Event Example ================= */}

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

      <p>
        Submitted name: {submittedName || '(nothing submitted yet)'}
      </p>


      {/* ================= Load API Data Example ================= */}

      <h2>4) Load API Data</h2>

      {post ? (
        <div>

          <h3>{post.title}</h3>

          <p>{post.body}</p>

        </div>
      ) : (
        <p>Loading data...</p>
      )}

    </>
  )
}

export default App