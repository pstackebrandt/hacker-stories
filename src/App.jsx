/**
 * Main component for the application.
 * 
 * This component displays a header, a search component, a list of frameworks/libraries,
 * and an aside with page purpose and content.
 * 
 * Development status: todo Live state from Search component to App component.
 */

import { useState, useEffect, useReducer, useCallback } from 'react';
import styles from './App.module.scss';
//import styles from './App.module.scss';

// Import config data
import { titleData } from './config/pageTitle';
import { pageDescription } from './config/pageDescription';

// Import base data
//import { frameworksAndLibs as initialProjects } from './data/frameworks';

import SearchTermInput from './components/SearchTermInput';
import ProjectsList from './components/ProjectsList';
import PageTitle from './components/PageTitle';

import { isValidSearchTerm } from './utils/validation';

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
 * // eslint-disable-next-line camelcase
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
 * @property {string} [searchTerm] - The search term for FETCH_SUCCESS action
 */

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
        isLoadError: false,
        activeSearchTerm: action.activeSearchTerm
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
 * Builds a URL for searching projects if the search term is valid.
 * @param {string} searchTerm - The search term to use in the URL.
 * @param {number} hitsPerPage - The number of hits per page to use in the URL.
 * @returns {string} - The URL for searching projects.
 */
const buildSearchUrl =
  (searchTerm,
    hitsPerPage = HITS_PER_PAGE
  ) => {
    if (!isValidSearchTerm(searchTerm)) {
      console.warn(`${buildSearchUrl.name}() was wrongly called with searchTerm: ${searchTerm}. Not building URL.`);
      return null;
    }

    console.info(`${buildSearchUrl.name}() called with searchTerm: ${searchTerm}. Building URL.`);
    const searchQuery = SEARCH_QUERY_TEMPLATE(searchTerm);
    const hitsPerPageQuery = PAGE_SIZE_TEMPLATE(hitsPerPage);

    return `${API_ENDPOINT}?${searchQuery}&${hitsPerPageQuery}`;
  };

/**
 * Extracts the search term from a URL's query parameters
 * @param {string} url - The URL to parse
 * @returns {string} The search term from the URL's query parameters
 */
const extractSearchTerm = (url) => {
  return new URL(url).searchParams.get('query');
};

/**
 * Main App component.
 * @returns {JSX.Element} The rendered component
 */
const App = () => {



  /**
   * URL object for fetching blog entries.
   * @typedef {Object} SearchUrlConfig
   * @property {string} searchUrl - The complete URL string for the API endpoint
   * @property {boolean} shouldFetch - Flag indicating whether this URL change should trigger a fetch operation
   * 
   * Format example:
   * {
   *   url: "https://hn.algolia.com/api/v1/search?query=react&hitsPerPage=5",
   *   shouldFetch: true
   * }
   */
  const [searchUrl, setSearchUrl] = useState();

  /**
   * Flag indicating whether this search URL change should trigger a fetch operation
   */
  const [shouldFetch, setShouldFetch] = useState(false);

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
   * Save @param newSearchTerm to state if it's newer than active search term.
   * @param {string} newSearchTerm - Candidate for search term value.
   * @returns {void}
   */
  const saveNewSearchTerm = (newSearchTerm = '') => {
    if (newSearchTerm !== searchTerm) { // Shall not ignore the case.
      console.info(`saveNewSearchTerm() sets new searchTerm. old \n
      ${searchTerm}, new: ${newSearchTerm}.`);
      setSearchTerm(newSearchTerm);
    } else {
      console.info(`saveNewSearchTerm(): "new" value (${newSearchTerm}
      ) was not saved because it is equal to current value (${searchTerm}).`);
    }
  }

  /**
   * Builds and sets a new search URL if the search term is valid
   * @returns {void}
   */
  const buildAndSetSearchUrl = useCallback(() => {
    // TODO: Think about that 'build' in the name might be redundant.
    if (!isValidSearchTerm(searchTerm)) {
      // It is not an error if the search term is not valid.
      console.info(`buildAndSetSearchUrl() was called with invalid searchTerm: '${searchTerm}'`);
      return;
    }

    const newUrl = buildSearchUrl(searchTerm);
    if (newUrl) {
      setSearchUrl({ url: newUrl });
      console.info(`buildAndSetSearchUrl() set new url '${newUrl}'`);
    }
  }, [searchTerm]);

  /**
   * Handle search term change. Saves new search term.
   * Does not start search.
   * @param {Event} event - The event object
   */
  const handleSearchTermChange = (event) => {
    console.info(`handleSearchTermChange() called by ${event.target}
     with value ${event.target.value}.`);
    saveNewSearchTerm(event.target.value);
  }

  /** All projects */
  const [projects, dispatchProjects] = useReducer(projectsReducer,
    { data: [], isLoadingData: false, isLoadError: false, activeSearchTerm: '' }
  );


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
   * Fetch search results from the API. Sends the results to the reducer.
   * @returns {void}
   */
  const handleFetchBlogEntries = useCallback(() => {
    /* This creates a memoized version of the function that only changes when its dependencies change. In this case, the function only changes when the url changes.
     This is important for performance optimization, as it prevents unnecessary re-renders. We extract the search term directly from the URL instead of depending on the searchTerm state.
     */
    if (!searchUrl) {
      console.info('handleFetchBlogEntries() was called while no url available. Not fetching.');
      return;
    }

    dispatchProjects({
      type: ProjectsActions.FETCH_INIT,
    });

    fetch(searchUrl.url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(result => {
        dispatchProjects({
          type: ProjectsActions.FETCH_SUCCESS,
          payload: result.hits,
          activeSearchTerm: extractSearchTerm(searchUrl.url)
        });
        // Reset the shouldFetch flag after successful fetch
        setSearchUrl(prevUrl => ({ ...prevUrl, shouldFetch: false }));
        // prevUrl is by convention the previous state of the url object.
      })
      .catch(error => {
        console.error(`Error loading projects: ${error.message}`);
        dispatchProjects({
          type: ProjectsActions.FETCH_FAILURE,
        });
        // Reset the shouldFetch flag even if there's an error
        setSearchUrl(prevUrl => ({ ...prevUrl, shouldFetch: false }));
      });
  }, [searchUrl]);

  /* When the URL changes, handleFetchBlogEntries is called again through useEffect:
   * 
   * The function is memoized with useCallback and only recreated when the URL changes.
   * However, recreating the function doesn't automatically execute it.
   * To trigger the actual data fetch when the URL changes, we use the useEffect hook below.
   * 
   * This two-hook implementation provides:
   * 1. Memoization to prevent unnecessary recreation of the fetch function
   * 2. Automatic execution when the URL is updated
   * 3. Prevention of unnecessary data reloads on component re-renders
   */

  /**
   * Effect hook to fetch blog entries when it's allowed.
   */
  useEffect(() => {
    if (shouldFetch && searchUrl) {
      handleFetchBlogEntries();
      setShouldFetch(false); // Reset after triggering fetch
    }
  }, [shouldFetch, searchUrl, handleFetchBlogEntries]);


  /**
   * Effect hook to allow initial fetch of blog entries when component mounts
   * (and searchTerm may be loadable from localStorage)
   */
  useEffect(() => {
    setShouldFetch(true); // Pass true to trigger initial fetch
    // TODO: Think about that a fetch without an initial searchTerm should not be allowed.
    // It would (could) lead to an automatic fetch after the user has entered 2 characters.
    // This would be an unexpected behaviour of the app.
    console.info(`useEffect() called once at mount set 'shouldFetch' to true`);
  }, []);

  /**
   * Handle search submitbutton click.
   * @param {React.MouseEvent<HTMLButtonElement>} event - The click event
   * @returns {void}     * 
   */
  const handleSearchSubmit = (event) => {
    console.info(`handleSearchSubmit() called by ${event.target}.`);
    event.preventDefault();
    /* Remember: 
    Submit button is enabled if search term is valid.
    If search term has changed and is valid, the url will be updated
    automatically.
    So a rebuild of the url is not needed. We only need to set the the 
    fetch flag of the url true to trigger the fetch.
    */
    setShouldFetch(true);
  }

  /**
   * Get filtered projects based on search term.
   * @returns {Array} - Array of filtered projects
   */
  const searchedProjects = projects.data.filter(
    project => project && project.title && searchTerm &&
      project.title.toLowerCase().includes(searchTerm.toLowerCase()));

  useEffect(() => {
    if (searchTerm) {
      buildAndSetSearchUrl();
    }
  }, [searchTerm, buildAndSetSearchUrl]);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <PageTitle title={titleData.title} subtitle={titleData.subtitle} />
      </header>

      <main className={styles.main}>

        <form
          onSubmit={handleSearchSubmit}
          className={styles.searchInputSection}>

          <SearchTermInput
            searchTerm={searchTerm}
            handleSearchTermChange={handleSearchTermChange}
          />

          {/* Button to start search. Disabled if search term is not valid. */}
          <button
            className={styles.submitButton}
            disabled={!isValidSearchTerm(searchTerm)}
            type="submit"
          >
            Search
          </button>

          {projects.isLoadingData &&
            <p className={styles.dataLoadingView}>Loading data ...</p>
          }

          {projects.isLoadError &&
            <p className={styles.dataLoadErrorView}>Error loading data.</p>
          }
        </form>

        <section className={styles.searchResultsSection}>
          {searchedProjects.length > 0 && (
            <>
              <h2>Your News {projects.activeSearchTerm ? `about ${projects.activeSearchTerm}` : ''}</h2>
              <ProjectsList projects={searchedProjects} onRemoveProject={handleRemoveProject} />
            </>
          )}
        </section>
      </main>

      <aside className={styles.learningObjectivesSection}>
        <h2>Learning Objectives</h2>
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
