// SearchTermInput.jsx

import PropTypes from 'prop-types';
import InputWithLabel from './InputWithLabel';

/** 
 * Search component allows users to enter a search term.
 * This will be used by another component to filter frameworks/libraries.
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