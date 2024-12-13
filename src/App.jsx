// App.jsx
const welcomeData = {
  greeting: "Hello",
  title: "Hackers",
}

const frameworksAndLibs = [
  {
    title: 'React',
    url: 'https://reactjs.org/',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 0,
  },
  {
    title: 'Redux',
    url: 'https://redux.js.org/',
    author: 'Dan Abramov, Andrew Clark',
    num_comments: 2,
    points: 5,
    objectID: 1,
  },
  {
    title: 'Vue.js',
    url: 'https://vuejs.org/',
    author: 'Evan You',
    num_comments: 4,
    points: 3,
    objectID: 2,
  },
  {
    title: 'Svelte',
    url: 'https://svelte.dev/',
    author: 'Rich Harris',
    num_comments: 5,
    points: 5,
    objectID: 3,
  },
];

const pageDescription = () => ({
  purpose: "Examples of using listed objects as input for a component.",
  content: ["Use of listed objects as component input", "Create JSX from lists by map()"]
})

const Search = () => {
  const handleOnChange = (event) => {
    // synthetic event
    console.log(event); // prints information about this event instance

    // value of target
    console.log(`handleOnChange of ${event.target} called with ${event.target.value}`);
  }

  const handleOnBlur = (event) => {
    console.log(event);

    console.log(`handleOnBlur: called by ${event.target}, called with value: ${event.target.value}`);
  }

  return (
    <>
      {/* Search input field */}
      <label htmlFor="search">Search: </label>
      <input id="search" type="text" onChange={handleOnChange} onBlur={handleOnBlur}  />
    </>
  )
}

const App = () => {
  return (
    <div>
      <header>
        <h1>{welcomeData.greeting} {welcomeData.title}</h1>
      </header>

      <section>
        <Search />
      </section>

      <section>
        <hr />
        <h2>Frameworks and Libraries</h2>
        <ul>
          {frameworksAndLibs.map((tool) =>
            <li key={tool.objectID}>
              <label htmlFor={tool.title + "Link"}>{tool.title}: </label>
              <a id={tool.title + "Link"} href={tool.url}>{tool.url}</a>
            </li>
          )}
        </ul>
      </section>

      <aside>
        <hr />
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
