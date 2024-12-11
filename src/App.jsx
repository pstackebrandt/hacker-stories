// App.jsx
const welcomeData = {
  greeting: "Hello",
  title: "Hackers",
}

const pageDescription = () => ({
  purpose: "Examples of using simple structures as input for a component.",
  content: ["Use of object as component input", "Use of arrow function as component input"]
})


const App = () => {
  return (
    <div>
      <header>
        <h1>{welcomeData.greeting} {welcomeData.title}</h1>
      </header>

      <section>
        {/* Search input field */}
        <label htmlFor="search">Search: </label>
        <input id="search" type="text" />
      </section>

      <aside>
        <h2>Page purpose</h2>
        <p>{pageDescription().purpose}</p>
        <ul>{pageDescription().content.map((part, index) =>
          <li key={index}>{part}</li>
        )}
        </ul>
      </aside>
    </div>
  )
}

export default App;
