// App.jsx
const title = "Hackers";

const App = () => {
  return (
    <div>
      <h1>Hello {title}</h1>

      {/* Search input field */}
      <label htmlFor="search">Search: </label>
      <input id="search" type="text" />
    </div>
  )
}

export default App;
