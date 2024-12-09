// App.jsx
// Without Demo code

function App() {
  const daughter_name = "Hannah";
  const daughter_age = 7;

  const family = {
    father: "Peter",
    mother: "Stefanie",
    daughter: "Hannah"    
  }
  
  return (
    <div>
      <h1>Hello {daughter_name}!</h1>
      <p>You are {daughter_age} years old. Nice!</p>

      <h2>Hello {family.mother} and {family.father}!</h2>
      <p>Congratulations! Your child is healthy and lively!</p>

      <h1>Page purpose</h1>
      <p>Show use of simple constants in component.</p>
      <p>Use of an object with data.</p>
    </div>

  )
}

export default App
