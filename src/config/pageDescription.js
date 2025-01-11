/**
 * @typedef {Object} PageDescription
 * @property {string} purpose - The purpose of the page
 * @property {string[]} content - Array of content descriptions
 */

/**
 * Describes the learning objectives and implemented features of this React training project.
 * @returns {PageDescription} - Object with page purpose and content.
 */
export const pageDescription = () => ({
    /**
     * General purpose of this training project, showcasing fundamental concepts
     * of modern web development with JavaScript and React.
     */
    purpose: "A training project that demonstrates fundamental concepts of modern web development with JavaScript and React, including function components, hooks (useState, useEffect, custom), PropTypes for type checking, and reducer-based state management patterns.",

    /**
     * List of features and principles used in the page
     */
    content: [
        "Use of listed objects as component input",
        "Create JSX from lists using map()",
        "Use props to pass data and callback functions to components",
        "Use state to manage data with useState",
        "Use reducer pattern for complex state management",
        "Use event handlers to handle user interactions",
        "Filter data based on search term",
        "Lift state up to manage shared state",
        "Handle side effects with useEffect",
        "Fetch and manage remote data",
        "Use of PropTypes for type checking",
        "Persist state in localStorage",
        "Use of conditional rendering",
        "Handle loading and error states",
        "Use of component composition patterns"
    ]
}); 