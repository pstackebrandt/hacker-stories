// SearchTermInput.jsx

import PropTypes from 'prop-types';
import InputWithLabel from './InputWithLabel';

/** 
 * Search component that allows users to enter a search term.
 * Displays the current search term and provides an input field for updating it.
 * 
 * @param {Object} props - Component props
 * @param {string} props.searchTerm - The current search term
 * @param {(event: React.ChangeEvent<HTMLInputElement>) => void} props.handleSearchTermChange - Callback when search term changes
 * @returns {JSX.Element} Rendered search input with label and current term display
*/
const SearchTermInput = ({ searchTerm, handleSearchTermChange }) => {

  return (
    <>
      {/* Search term input field */}
      <InputWithLabel
        id="searchTermInput"
        value={searchTerm}
        onInputChange={handleSearchTermChange}>
        <strong>Search: </strong>
      </InputWithLabel>

      <p>
        Searching for {searchTerm ? <strong>{searchTerm}</strong>
          : "no specific value"}.
      </p>
    </>
  )
}

SearchTermInput.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  handleSearchTermChange: PropTypes.func.isRequired
};

export default SearchTermInput;