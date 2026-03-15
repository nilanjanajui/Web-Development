
import './App.css'

function App() {

  const name = "Rahim"
  const age = 25

  return (
    <>

    {/* JSX (JavaScript XML) - A syntax extension for JavaScript that allows you to write HTML-like code in your JavaScript files. It makes it easier to create and manage UI components in React. */}
    
      <div className="box">

      {/* className is used instead of class in JSX because class is a reserved keyword in JavaScript. JSX uses className to avoid conflicts with the JavaScript class keyword. */}
      {/* camelCase is used for attribute names in JSX. For example, instead of using 'class', we use 'className'. */}

        <h1>Learn React</h1>
        <p>Welcome to the world of React!</p>


        {/* dynamic content using JavaScript expressions in JSX. You can embed any JavaScript expression inside curly braces {} in JSX. For example, you can use variables, functions, or even complex expressions to generate dynamic content. In the example above, we have defined two variables, name and age, and we are using them to display dynamic content in the JSX. The output will be "Hello Rahim" and "You are 25 years old." when rendered in the browser. */}

        <h1>Hello {name}</h1>
        <p>You are {age} years old.</p>
      </div>

      



      {/* Using the Greeting component and passing the name prop to it. The Greeting component will receive the name prop and display a personalized greeting message based on the value of the name prop. */}
      <Greeting name={name}></Greeting>

      {/* Using the Product component and passing name, description, and price props to it. The Product component will receive these props and display the product information accordingly. */}
      <Product name="Laptop" description="A high-performance laptop for work and gaming." price={999.99}>  </Product>


      {/* conditonally rendering components based on certain conditions. In the example above, we have a variable called isLoggedIn that determines whether the user is logged in or not. We use a ternary operator to conditionally render either the Greeting component with a personalized message or a message prompting the user to log in. If isLoggedIn is true, it will display "Hello Rahim! Welcome back!" Otherwise, it will display "Please log in to continue." */}

      {/* 6 types of conditional rendering in React:
      1. If-Else Statements: You can use traditional if-else statements to conditionally render components based on certain conditions.
      2. Ternary Operator: The ternary operator is a concise way to conditionally render components in JSX. It allows you to write a simple if-else statement in a single line.
      3. Logical AND (&&) Operator: You can use the logical AND operator to conditionally render a component only if a certain condition is true.
      4. logical OR (||) Operator: The logical OR operator can be used to render a component if at least one of the conditions is true.
      5. Variable condition: You can assign a component to a variable based on certain conditions and then render that variable in your JSX.
      6. Switch Statements: For more complex conditional rendering scenarios, you can use switch statements to determine which component to render based on different cases.
       */}

      <ConditionalRenderingExample  ></ConditionalRenderingExample>

    </>
  )
}

// props are short for "properties" and are a way to pass data from a parent component to a child component in React. They allow you to create reusable components that can be customized with different data. In the example above, we have defined a component called Greeting that takes a prop called name. We can use this component multiple times with different values for the name prop to display personalized greetings.


// props are read-only, meaning that a child component cannot modify the props it receives from its parent. If you need to manage state or allow a child component to modify data, you would typically use state and event handlers instead of props.

function Greeting(props) {
  return <h1>Hello {props.name}</h1>
}

function Product(props) {
  return (
    <>
    <div className="product">
      <h2>{props.name}</h2>
      <p>{props.description}</p>
      <p>Price: ${props.price.toFixed(2)}</p>
    </div>
    </>
  )
} 


function ConditionalRenderingExample() {
  const isLoggedIn = true

  return (
    <>
    {/* Ternary Operator Example */}
      {isLoggedIn ? (
        <Greeting name="Karim" />
      ) : (
        <p>Please log in to continue.</p>
      )}

      {/* and operator  */}
      {isLoggedIn && <Greeting name="Abbas" />}
      {!isLoggedIn && <p>Please log in to continue.</p>}

      {/* OR operator  */}
      {isLoggedIn || <p>Please log in to continue.</p>}

      {/* Variable condition: */}
      {(() => {
        let content;
        if (isLoggedIn) {
          content = <Greeting name="Kuddus" />;
        } else {
          content = <p>Please log in to continue.</p>;
        }
        return content;
      })()}

      {/* Switch statement example */}
      {
        (() => {
          switch (isLoggedIn) {
            case true:
              return <Greeting name="Nasir" />
            case false:
              return <p>Please log in to continue.</p>
            default:
              return null
          }
        })()
      }
    </>
  )
}




export default App
