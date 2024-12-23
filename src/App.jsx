/**
 * Main component for the application.
 * 
 * This component displays a header, a search component, a list of frameworks/libraries,
 * and an aside with page purpose and content.
 * 
 * Development status: todo Live state from Search component to App component.
 */

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
    "Create JSX from lists using map()",
    "Use props to pass data and callback functions to components",
    "Use state to manage data",
    "Use event handlers to handle user interactions",
    "Destructure props",
    "Filter data based on search term",
    "Lift state up to manage shared state",
    "Encapsulate logic in functions for cleaner JSX"
  ]
})

// Main component 
const App = () => {

  const [searchTerm, setSearchTerm] = useState('');

  /**
   * Handle new search term.
   * @param {Event} event - The event object
   */
  const handleSearchTermChange = (event) => {
    console.log(`handleSearchTermChange() called by ${event.target} with value ${event.target.value}.`);

    // Set new search term
    console.log(`handleSearchTermChange() sets new searchTerm. old ${searchTerm}, new: ${event.target.value}.`);
    setSearchTerm(event.target.value);
  }

  /**
   * Get filtered tools based on search term.
   * @returns {Array} - Array of filtered tools
   */
  const searchedTools = frameworksAndLibs.filter(
      tool => tool.title.toLowerCase().includes(searchTerm.toLowerCase()));
  
  /**
   * Handle new search term.
   * @param {Event} event - The event object
   */

  return (
    <div>
      <header>
        {/* Example of using config data from a separate file */}
        <h1>{welcomeData.greeting} {welcomeData.title}</h1>
      </header>

      <section>
        {/* Example of adding a callback function as a prop */}
        <Search searchTerm={searchTerm} handleSearchTermChange={handleSearchTermChange} />
      </section>

      <section>
        <hr />
        <h2>Frameworks and Libraries</h2>
        {/* Example of adding a list of data objects as a prop */}
        <ListFrameworksAndLibs tools={searchedTools} />
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

/** 
 * Search component allows users to entering a search term.
 * This will be used by another component to filter frameworks/libraries.
*/
const Search = ({ searchTerm, handleSearchTermChange }) => {

  return (
    <>
      {/* Search input field */}
      <label htmlFor="search">Search: </label>
      <input id="search" type="text" onChange={handleSearchTermChange} />

      <p>
        Searching for <strong>{searchTerm}</strong>.
      </p>
    </>
  )
}

Search.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  handleSearchTermChange: PropTypes.func.isRequired
};

/**
 * Displays a list of frameworks/libraries
 */
const ListFrameworksAndLibs = ({ tools }) =>
  <ul>
    {tools.map((tool) =>
      <ToolItem key={"toolItem" + tool.objectID} tool={tool} />
    )}
  </ul>

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

/**
 * Displays a single framework/library.
 * 
 * Current functionality matches page 32 of the book with minor improvements.
 */
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

export default App;
