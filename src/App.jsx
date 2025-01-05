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

// Import base data
import { frameworksAndLibs as initialProjects } from './data/frameworks';

import SearchTermInput from './components/SearchTermInput';
import ProjectItem from './components/ProjectItem';

// Import styles
import './App.css';

/**
 * @summary Describes the React training purpose of this page. Tells what is demonstrated.
 * @returns {Object} - Object with page purpose and content.
 */
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
    "Persist state in localStorage",
    "Use of conditional rendering",
    "Use of callback functions to handle events",
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

  /** State for projects (frameworks and libraries) */
  const [frameworksAndLibs, setProjects] = useState(initialProjects);

  /** 
   * Remove a project from the projects list. 
   * Save the updated list to state.
  */
  const handleRemoveProject = (projectItem) => {
    const newProjects = frameworksAndLibs.filter(
      project => project.objectID !== projectItem.objectID
    );

    setProjects(newProjects);
  }

  /**
   * Get filtered projects based on search term.
   * @returns {Array} - Array of filtered projects
   */
  const searchedProjects = frameworksAndLibs.filter(
    project => searchTerm &&
      project.title.toLowerCase().includes(searchTerm.toLowerCase()));

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
        <SearchTermInput searchTerm={searchTerm} handleSearchTermChange={handleSearchTermChange} />
      </section>

      <section>
        <hr />
        <h2>Frameworks and Libraries</h2>
        {/* Example of adding a list of data objects as a prop */}
        <ListFrameworksAndLibs projects={searchedProjects} onRemoveProject={handleRemoveProject} />
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
 * Displays a list of projects (frameworks/libraries) with the ability to remove a project.
 */
const ListFrameworksAndLibs = ({ projects, onRemoveProject }) =>
  <ul>
    {projects.map((project) =>
      <ProjectItem
        key={"projectItem" + project.objectID}
        project={project}
        onRemoveProject={onRemoveProject} />
    )}
  </ul>

ListFrameworksAndLibs.propTypes = {
  projects: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      num_comments: PropTypes.number.isRequired,
      points: PropTypes.number.isRequired,
      objectID: PropTypes.number.isRequired,
    })
  ).isRequired,
  onRemoveProject: PropTypes.func.isRequired
};

export default App;
