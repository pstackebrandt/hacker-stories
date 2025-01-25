/**
 * Checks if a search term is valid for use in search operations
 * @param searchTerm - The search term to validate
 * @returns True if the search term is valid, false otherwise
 */
export const isValidSearchTerm = (searchTerm: string): boolean => {
    return !!searchTerm && searchTerm.length > 1;
}; 