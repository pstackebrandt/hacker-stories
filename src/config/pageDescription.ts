interface PageDescription {
    /** General purpose of this training project. */
    purpose: string;

    /** List of features and principles used in the page. */
    content: string[];
  }

/**
 * Describes the learning objectives and implemented features of this React
 * training project.
 * @returns Object with page purpose and content.
 */
export const pageDescription = (): PageDescription => ({
    /**
     * General purpose of this training project, showcasing fundamental concepts
     * of modern web development with JavaScript and React.
     */
    purpose: "This is a training project that demonstrates fundamental concepts of modern web development with JavaScript and React, including function components, hooks (useState, useEffect, custom), TypeScript for type checking, and reducer-based state management patterns. It follows the book 'Road to React' by Robin Wieruch conceptionally. I made a lot of changes to the original project, but the core ideas I got from it.",

    /**
     * List of features and principles used in the page
     */
    content: [
        /* Update prompt for AI:
        Please review and update the list (object pageDescription.content) of React features, web development technologies and web development principles  according to these criteria:
        
        1. Verify each item is actually used in the current codebase
        2. Maximum of 15 items
        2.a Tell me if you think that the list should be longer or shorter. In that case tell me which items should be additionally used (more then 15 items) or which items should be removed (less then 15 items).
        3. Focus on the most significant features used
        4. Remove any features, that are not any used in the current codebase
        5. Update descriptions to match current implementation
        6. Order items by importance/frequency of use
        7. Use consistent terminology
        8. Work step by step
        9. If you have questions about this task or specific implementations, please ask for clarification.
        10. Don't remove the prompts or comments.
                
        When reviewing, consider:
        - Component architecture
        - State management patterns
        - Hook usage
        - Data fetching
        - User interactions
        - Error handling
        - Type checking
        - Performance optimizations
        - Styling approaches
        
        */
        "Use TypeScript for type checking",
        "Use state to manage data with useState",
        "Use a reducer pattern for complex state management",
        "Handle side effects with useEffect",
        "Fetch and manage data from a remote API",
        "Filter data based on a search term",
        "Use event handlers for user interactions",
        "Use SCSS modules for styling",
        "Use data objects as component inputs",
        "Create JSX from lists using map()",
        "Lift state up to manage shared state",
        "Persist state in localStorage",
        "Use conditional rendering",
        "Handle loading and error states",
        "Use of component composition patterns"
    ]
}); 