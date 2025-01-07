/**
 * Main component for the application.
 * 
 * This component displays a header, a search component, a list of frameworks/libraries,
 * and an aside with page purpose and content.
 * 
 * Development status: todo Live state from Search component to App component.
 */

import { useState, useEffect } from 'react';

// Import config data
import { welcomeData } from './config/welcome';

// Import base data
import { frameworksAndLibs as initialProjects } from './data/frameworks';

import SearchTermInput from './components/SearchTermInput';
import ProjectsList from './components/ProjectsList';

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
    "Handle loading states with useState",
    "Handle error states with useState",
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
    // TODO: Rename to useLocalStorageState

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

  /** State for search term */
  const [searchTerm, setSearchTerm] = useStoredState('searchTerm', 'Re');

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

  /** All projects */
  const [projects, setProjects] = useState([]);

  const [isLoadingData, setIsLoadingData] = useState(false);

  const [isDataLoadError, setIsDataLoadError] = useState(false);

  /**
   * Gets projects from the data source asynchronously.
   * @returns {Promise} - Promise that resolves to an object with projects.
   */
  // This is a intermediate solution. Current data source is static.
  const getAsyncProjects = () => {
    setIsLoadingData(true);

    return new Promise((resolve) => {
      setTimeout( // Simulate delay of async operation
        () => {
          resolve({ data: { projects: initialProjects } });
        }, 2000
      );
    });
  }

  /**
   * Load projects from the data source.
   */
  useEffect(() => {
    getAsyncProjects().then(result => {
      setIsLoadingData(true);
      setProjects(result.data.projects);
    }).catch(error => {
      console.error(`Error loading projects: ${error.message}`);
      setIsDataLoadError(true);
    }).finally(
      () => {
        setIsLoadingData(false);
      }
    );
  }, []);


  /** 
   * Remove a project from the projects list. 
   * Save the updated list to state.
  */
  const handleRemoveProject = (projectItem) => {
    const newProjects = projects.filter(
      project => project.objectID !== projectItem.objectID
    );

    setProjects(newProjects);
  }

  /**
   * Get filtered projects based on search term.
   * @returns {Array} - Array of filtered projects
   */
  const searchedProjects = projects.filter(
    project => searchTerm &&
      project.title.toLowerCase().includes(searchTerm.toLowerCase()));


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

        <ProjectsList projects={searchedProjects} onRemoveProject={handleRemoveProject} />
        {isLoadingData && <p className='data-loading-view'>Loading data ...</p>}
        {isDataLoadError && <p className='data-load-error-view'>Error loading data.</p>}
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
