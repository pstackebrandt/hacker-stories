/**
 * Checks if a search term is valid for use in search operations
 * @param {string} searchTerm - The search term to validate
 * @returns {boolean} True if the search term is valid, false otherwise
 */
export const isValidSearchTerm = (searchTerm) => {
    return searchTerm && searchTerm.length > 1;
}; 