/**
 * Main component for the application.
 * 
 * This component displays a header, a search component, a list of frameworks/libraries,
 * and an aside with page purpose and content.
 * 
 * Development status: todo Live state from Search component to App component.
 */

import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// Import config data
import { welcomeData } from './config/welcome';

// Import data
import { frameworksAndLibs } from './data/frameworks';

// Import styles
import './App.css';

// Description of this page
const pageDescription = () => ({
  purpose: "Demonstrates the use of function components, event handlers, props, useState, and custom hooks in a React application.",
  content: [
    "Use of listed objects as component input",
    "Create JSX from lists using map()",
    "Use props to pass data and callback functions to components",
    "Use state to manage data",
    "Use event handlers to handle user interactions",
    "Destructure props",
    "Filter data based on search term",
    "Lift state up to manage shared state",
    "Encapsulate logic in functions for cleaner JSX",
    "Implement custom hooks for state management",
    "Handle side effects with useEffect",
    "Use of PropTypes for type checking",
  ]
})

// Main component 
const App = () => {

  /** 
   * @summary Custom hook for management of the state of a date (a data unit).
   * Gets the dates value from localStorage if it exists or uses a given default value.
   * Saves current value to localStorage automatically.
   * @param {string} stateName - Name of the data unit. Used as key in localStorage.
   * @param {string} initialValue - Default value for the data unit. (optional)
   * @returns {[value, setValue]} - Array with search term and setSearchTerm function.
   */
  const useStoredState = (stateName, initialValue) => {
    // Load search term, use default value if saved value found

    const [state, setState] = useState(() => {
      try {
        return localStorage.getItem(stateName) || initialValue;
      } catch (error) {
        console.error(`Error reading ${stateName} from localStorage: ${error.message}`);
        return initialValue;
      }
    });

    // Save search term to localStorage automatically when search term changed
    useEffect(() => {
      try {
        localStorage.setItem(stateName, state);
      } catch (error) {
        console.error(`Error saving ${stateName} with value ${state} to localStorage: ${error.message}`);
      }
    }, [stateName, state]);

    return [state, setState];
  };

  const [searchTerm, setSearchTerm] = useStoredState('searchTerm', '');

  /**
   * @param {Event} event - The event object
   */
  const handleSearchTermChange = (event) => {
    console.log(`handleSearchTermChange() called by ${event.target}
       with value ${event.target.value}.`);
    saveNewSearchTerm(event.target.value);
  }

  /**
   * Save @param newSearchTerm to state if it's newer than active search term.
   * @param {string} newSearchTerm - Candidate for search term value.
   * @returns {void}
   */
  const saveNewSearchTerm = (newSearchTerm) => {

    if (newSearchTerm !== searchTerm) { // Shall not ignore the case.
      // Set new search term
      console.log(`handleSearchTermChange() sets new searchTerm. old \n
        ${searchTerm}, new: ${newSearchTerm}.`);
      setSearchTerm(newSearchTerm);
    } else {
      console.log(`saveSearchTerm(): "new" value (${newSearchTerm}
        ) was not saved because it is equal to current value (${searchTerm}).`);
    }
  }

  /**
   * Get filtered tools based on search term.
   * @returns {Array} - Array of filtered tools
   */
  const searchedTools = frameworksAndLibs.filter(
    tool => searchTerm &&
      tool.title.toLowerCase().includes(searchTerm.toLowerCase()));

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
 * InputWithLabel component renders a label and an input field.
 * 
 * @param {Object} props - The properties object.
 * @param {string} [props.id=''] - The id for the input element.  * If not provided, a unique id will be generated.
 * @param {string} [props.value=''] - The (initial) value of the input element.
 * @param {string} [props.inputType='text'] - The type of the input element.
 * @param {function} props.onInputChange - The function to call when the input value changes.
 * @param {React.ReactNode} props.children - The content to be displayed inside the label.
 * 
 * @returns {JSX.Element} The rendered label and input elements.
 */
const InputWithLabel = ({
  id = 'test',
  value = '',
  inputType = 'text',
  isFocused = true,
  onInputChange,
  children
}) => {

  /**
   * @summary Generate a unique ID for the input element.
   * @description This function generates a 'unique' ID for the input element by combining 
   * the string "input-" with a short random string. It is highly probable that the generated ID is * unique.
   * @example Math.random().toString(36) -> "0.5g7y8z9x1w", substring(2, 11) -> "5g7y8z9x1"
   * Resulting ID: "input-5g7y8z9x1"
   * @returns {string} - The generated ID.
   */
  const generateUniqueId = () => {
    return `input-${Math.random().toString(36).substring(2, 11)}`;
  }

  const finalId = id || generateUniqueId;
  return (
    <>
      <label htmlFor={finalId}>{children}</label>
      <input
        id={finalId}
        value={value}
        type={inputType}
        autoFocus={isFocused}
        onChange={onInputChange}>
      </input>
    </>
  );
}

InputWithLabel.propTypes = {
  id: PropTypes.string,
  value: PropTypes.string,
  inputType: PropTypes.string,
  isFocused: PropTypes.bool,
  onInputChange: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
};

/** 
 * Search component allows users to entering a search term.
 * This will be used by another component to filter frameworks/libraries.
*/
const Search = ({ searchTerm, handleSearchTermChange }) => {

  return (
    <>
      {/* Search term input field */}
      <InputWithLabel
        id="searchTermInput"
        value={searchTerm}
        onInputChange={handleSearchTermChange}>
        <strong>Search: </strong>
      </InputWithLabel>

      <p>
        Searching for {searchTerm ? <strong>{searchTerm}</strong>
          : "no specific value"}.
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
