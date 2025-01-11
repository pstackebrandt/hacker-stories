/**
 * Main component for the application.
 * 
 * This component displays a header, a search component, a list of frameworks/libraries,
 * and an aside with page purpose and content.
 * 
 * Development status: todo Live state from Search component to App component.
 */

import { useState, useEffect, useReducer } from 'react';

// Import config data
import { welcomeData } from './config/welcome';

// Import base data
//import { frameworksAndLibs as initialProjects } from './data/frameworks';

import SearchTermInput from './components/SearchTermInput';
import ProjectsList from './components/ProjectsList';

// Import styles
import './App.css';

/**
 * Action types for the projects reducer
 * @readonly
 * @enum {string}
 */
const ProjectsActions = Object.freeze({
  FETCH_INIT: 'FETCH_INIT',
  FETCH_SUCCESS: 'FETCH_SUCCESS',
  FETCH_FAILURE: 'FETCH_FAILURE',
  REMOVE_PROJECT: 'REMOVE_PROJECT'
});

/**
 * @typedef {Object} Project
 * @property {string} title - The title of the project
 * @property {string} url - The URL of the project
 * @property {string} author - The author of the project
 * @property {number} num_comments - Number of comments
 * @property {number} points - Number of points
 * @property {(string | number)} objectID - Unique identifier
 */

/**
 * @typedef {Object} ProjectsState
 * @property {Project[]} data - Array of projects
 * @property {boolean} isLoadingData - Loading state flag
 * @property {boolean} isLoadError - Error state flag
 */

/**
 * @typedef {Object} ProjectsAction
 * @property {keyof typeof ProjectsActions} type - The action type
 * @property {Project | Project[] | undefined} [payload] - The action payload
 */

/**
 * @typedef {Object} PageDescription
 * @property {string} purpose - The purpose of the page
 * @property {string[]} content - Array of content descriptions
 */

/**
 * Describes the React training purpose of this page.
 * @returns {PageDescription} - Object with page purpose and content.
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


/**
   * Reducer for projects state.
   * @param {ProjectsState} state - Current state of projects.
   * @param {ProjectsAction} action - Action object with type and payload.
   * @returns {ProjectsState} - New state of projects.
   */
const projectsReducer = (state, action) => {

  switch (action.type) {

    case ProjectsActions.FETCH_INIT:
      return {
        ...state,
        isLoading: true,
        isLoadError: false
      };

    case ProjectsActions.FETCH_SUCCESS:
      return {
        ...state,
        data: action.payload,
        isLoading: false,
        isLoadError: false
      }

    case ProjectsActions.FETCH_FAILURE:
      return {
        ...state,
        // We dont want change the projects list.
        isLoading: false,
        isLoadError: true,
      }

    case ProjectsActions.REMOVE_PROJECT:
      return {
        ...state,
        data: state.data.filter(
          project => project.objectID.toString() !== action.payload.objectID.toString()
        ),
        isLoadingData: false,
        isLoadError: false
      }

    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
}


const API_ENDPOINT = 'https://hn.algolia.com/api/v1/search';
const SEARCH_QUERY_TEMPLATE = query => `query=${query}`;
const PAGE_SIZE_TEMPLATE = size => `hitsPerPage=${size}`;
const HITS_PER_PAGE = 5;

// real hacker news API endpoint: 
// hacker news github repo: https://github.com/HackerNews/API

// curl -X GET "https://hn.algolia.com/api/v1/search?query=React&tags=story&hitsPerPage=3" -H "Accept: application/json" | ConvertFrom-Json | ForEach-Object { $_.hits | ForEach-Object { $_.title } }

/**
 * Builds a URL for searching projects.
 * @param {string} searchTerm - The search term to use in the URL.
 * @param {number} hitsPerPage - The number of hits per page to use in the URL.
 * @returns {string} - The URL for searching projects.
 */
const buildSearchUrl = (searchTerm, hitsPerPage = HITS_PER_PAGE) => {
  const searchQuery = SEARCH_QUERY_TEMPLATE(searchTerm);
  const hitsPerPageQuery = PAGE_SIZE_TEMPLATE(hitsPerPage);

  return `${API_ENDPOINT}?${searchQuery}&${hitsPerPageQuery}`;
};

/**
 * Main App component.
 * @returns {JSX.Element} The rendered component
 */
const App = () => {

  /** 
   * @summary Custom hook for management of the state of a date (a data unit).
   * Gets the dates value from localStorage if it exists or uses a given default value.
   * Saves current value to localStorage automatically.
   * @template T
   * @param {string} stateName - Name of the data unit. Used as key in localStorage.
   * @param {T} initialValue - Default value for the data unit.
   * @returns {[T, (value: T) => void]} - Array with state value and setter function.
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

    /**
     * Effect hook to save state to localStorage.
     */
    useEffect(function saveStateToLocalStorage() {
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
  const saveNewSearchTerm = (newSearchTerm = '') => {

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
  const [projects, dispatchProjects] = useReducer(projectsReducer,
    { data: [], isLoadingData: false, isLoadError: false }
  );


  /** 
   * Effect hook to fetch initial projects data on component mount
   */
  useEffect(() => {
    
    dispatchProjects({
      type: ProjectsActions.FETCH_INIT,
    });

    fetch(buildSearchUrl(searchTerm))
      .then(response => response.json())
      .then(result => {
        dispatchProjects({
          type: ProjectsActions.FETCH_SUCCESS,
          payload: result.hits
        });
      })
      .catch(error => {
        console.error(`Error loading projects: ${error.message}`);
        dispatchProjects({
          type: ProjectsActions.FETCH_FAILURE,
        });
      })
  }, [searchTerm]);


  /** 
   * Remove a project from the projects list. 
  */
  const handleRemoveProject = (projectItem) => {
    dispatchProjects({
      type: ProjectsActions.REMOVE_PROJECT,
      payload: projectItem
    });
  }


  /**
   * Get filtered projects based on search term.
   * @returns {Array} - Array of filtered projects
   */
  const searchedProjects = projects.data.filter(
    project => project && project.title && searchTerm &&
      project.title.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div>
      <header>
        {/* Example of using config data from a separate file */}
        <h1>{welcomeData.greeting} {welcomeData.title}</h1>
      </header>

      <main>
        <section>
          {/* Example of adding a callback function as a prop */}
          <SearchTermInput searchTerm={searchTerm} handleSearchTermChange={handleSearchTermChange} />
        </section>

        <section>
          <hr />
          <h2>Frameworks and Libraries for JavaScript</h2>

          <ProjectsList projects={searchedProjects} onRemoveProject={handleRemoveProject} />
          {/* Using conditional rendering to display loading and error messages */}
          {projects.isLoadingData && <p className='data-loading-view'>Loading data ...</p>}
          {projects.isLoadError && <p className='data-load-error-view'>Error loading data.</p>}
        </section>
      </main>

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
