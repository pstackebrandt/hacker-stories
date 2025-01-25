import { Project } from "../types/Project";

/**
 * List of JavaScript frameworks and libraries.
 * The list is frozen to prevent modifications.
 * This data was used as mock data for the project.
 * I hold it now in the project as example data.
 */
export const blogEntriesAboutJsFrameworks: readonly Project[] = Object.freeze([
  {
    title: 'React',
    url: 'https://reactjs.org/',
    author: 'Jordan Walke',
    // eslint-disable-next-line @typescript-eslint/naming-convention
    num_comments: 3,
    points: 4,
    objectID: 0,
  },
  {
    title: 'Redux',
    url: 'https://redux.js.org/',
    author: 'Dan Abramov, Andrew Clark',
    // eslint-disable-next-line @typescript-eslint/naming-convention
    num_comments: 2,
    points: 5,
    objectID: 1,
  },
  {
    title: 'Vue.js',
    url: 'https://vuejs.org/',
    author: 'Evan You',
    // eslint-disable-next-line @typescript-eslint/naming-convention
    num_comments: 4,
    points: 3,
    objectID: 2,
  },
  {
    title: 'Svelte',
    url: 'https://svelte.dev/',
    author: 'Rich Harris',
    // eslint-disable-next-line @typescript-eslint/naming-convention
    num_comments: 5,
    points: 5,
    objectID: 3,
  },
]);