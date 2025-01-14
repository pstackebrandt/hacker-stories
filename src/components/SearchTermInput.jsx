// SearchTermInput.jsx

import PropTypes from 'prop-types';
import InputWithLabel from './InputWithLabel';
import * as yup from 'yup';
import { useState } from 'react';
import styles from './SearchTermInput.module.scss';

// Define validation schema
const searchSchema = yup.object().shape({
  searchTerm: yup
    .string()
    .min(2, 'Search term must be at least 2 characters')
    .max(50, 'Search term must not exceed 50 characters')
    .matches(/^[a-zA-Z0-9\s]*$/, 'Only alphanumeric characters and spaces are allowed')
});

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
  const [error, setError] = useState('');

  const validateAndHandleChange = async (event) => {
    // Always update the input value
    handleSearchTermChange(event);

    try {
      await searchSchema.validate({ searchTerm: event.target.value });
      setError('');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className={styles.searchTermInput}>
      {/* Search term input field */}
      <InputWithLabel
        id="searchTermInput"
        value={searchTerm}
        placeholderText="Insert search term here..."
        onInputChange={validateAndHandleChange}>
        <strong>Search: </strong>
      </InputWithLabel>

      {error && <p className={styles.errorMessage}>{error}</p>}

      <p>
        {searchTerm?.length >= 2 && (
          <span>Press button to search for {searchTerm}</span>
        )}
      </p>
    </div>
  )
}

SearchTermInput.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  handleSearchTermChange: PropTypes.func.isRequired
};

export default SearchTermInput;