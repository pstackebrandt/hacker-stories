// App.jsx
const welcomeData = {
  greeting: "Hello",
  title: "Hackers",
  description: "Example of using a simple data object in a component."
}

const App = () => {
  return (
    <div>
      <header>
        <h1>{welcomeData.greeting} {welcomeData.title}</h1>
        <p>{welcomeData.description}</p>
      </header>

      <section>
        {/* Search input field */}
        <label htmlFor="search">Search: </label>
        <input id="search" type="text" />
      </section>
    </div>
  )
}

export default App;
