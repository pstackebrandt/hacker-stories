import PropTypes from 'prop-types';
import { useState } from 'react';

// Import config data
import { welcomeData } from './config/welcome';

// Import data
import { frameworksAndLibs } from './data/frameworks';

// Import styles
import './App.css';

// Description of this page
const pageDescription = () => ({
  purpose: "Examples of using function components, event handlers, props, useState.",
  content: [
    "Use of listed objects as component input",
    "Create JSX from lists by map()",
    "Use props to pass data and callback functions to a component",
    "Use state to manage data",
    "Use event handlers to handle user interactions",
    "Destructure props",
  ]
})

// Search component allows users to filter frameworks/libraries 
//by entering search terms
const Search = ({ onSearch }) => {

  const [searchTerm, setSearchTerm] = useState('');

  const handleOnChange = (event) => {
    setSearchTerm(event.target.value);
    onSearch(event); // Start search

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
      <input id="search" type="text" onChange={handleOnChange} onBlur={handleOnBlur} />

      <p>
        Searching for <strong>{searchTerm}</strong>.
      </p>
    </>
  )
}

Search.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

// Displays a list of frameworks/libraries
const ListFrameworksAndLibs = ({ tools }) => {
  return (
    <ul>
      {tools.map((tool) =>
        <ToolItem key={"toolItem" + tool.objectID} tool={tool} />
      )}
    </ul>
  )
}

// Displays a single framework/library
const ToolItem = ({ tool }) => // Example of using props with destructuring.
  <li>
    <h3 className="tool-title">{tool.title}</h3>
    {/* Link and autors*/}
    <div>
      <span>
        <a href={tool.url}>{tool.url}</a>
      </span>
      <span className="by-label">by</span>
      <span>
        {tool.author}
      </span>
      {/* Number of comments and star level */}
      <div className="comment-container">
        <span>
          {tool.num_comments} comments
        </span>
        <span className="star-level">
          {'*'.repeat(tool.points)}
        </span>
      </div>
    </div>
  </li>

ToolItem.propTypes = {
  tool: PropTypes.shape({
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    num_comments: PropTypes.number.isRequired,
    points: PropTypes.number.isRequired,
    objectID: PropTypes.number.isRequired,
  }).isRequired,
};

ListFrameworksAndLibs.propTypes = {
  tools: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      num_comments: PropTypes.number.isRequired,
      points: PropTypes.number.isRequired,
      objectID: PropTypes.number.isRequired,
    })
  ).isRequired,
};

// Main component 
const App = () => {
  /**
   * Handle new search term.
   * @param {Event} event - The event object
   */
  const handleSearch = (event) => {
    console.log(`Search could be started with new value ${event.target.value}`);
  }

  return (
    <div>
      <header>
        {/* Example of using config data from a separate file */}
        <h1>{welcomeData.greeting} {welcomeData.title}</h1>
      </header>

      <section>
        {/* Example of adding a callback function as a prop */}
        <Search onSearch={handleSearch} />
      </section>

      <section>
        <hr />
        <h2>Frameworks and Libraries</h2>
        {/* Example of adding a list of data objects as a prop */}
        <ListFrameworksAndLibs tools={frameworksAndLibs} />

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
