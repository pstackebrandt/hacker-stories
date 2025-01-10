/**
 * @typedef {Object} Framework
 * @property {string} title - Name of the framework/library
 * @property {string} url - Official website URL
 * @property {string} author - Creator(s) of the framework/library
 * @property {number} num_comments - Number of comments
 * @property {number} points - Rating points
 * @property {number} objectID - Unique identifier
 */

/**
 * List of JavaScript frameworks and libraries.
 * The list is frozen to prevent modifications.
 * @type {Framework[]}
 */
export const frameworksAndLibs = Object.freeze([
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
]);