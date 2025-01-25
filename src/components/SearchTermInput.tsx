// SearchTermInput.jsx

import InputWithLabel from "./InputWithLabel";
import * as yup from "yup";
import { useState } from "react";
import styles from "./SearchTermInput.module.scss";

// Define validation schema
const searchSchema = yup.object().shape({
  searchTerm: yup
    .string()
    .min(2, "Search term must be at least 2 characters")
    .max(70, "Search term must not exceed 70 characters")
    .matches(
      /^[a-zA-ZÀ-ÿ0-9\s-']*$/,
      "Only letters, numbers, spaces, hyphens and apostrophes are allowed"
    ),
});

interface SearchTermInputProps {
  /** The current search term */
  searchTerm: string;
  /** Callback when search term changes */
  handleSearchTermChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

/**
 * Search component that allows users to enter a search term.
 * Displays the current search term and provides an input field for updating it.
 */
const SearchTermInput = ({
  searchTerm,
  handleSearchTermChange,
}: SearchTermInputProps) => {
  const [error, setError] = useState("");

  const validateAndHandleChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    // Always update the input value
    handleSearchTermChange(event);

    try {
      await searchSchema.validate({ searchTerm: event.target.value });
      setError("");
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        setError(err.message);
      }
    }
  };

  return (
    <div className={styles.searchTermInput}>
      {/* Search term input field */}
      <label htmlFor="searchTermInput" className={styles.searchTermInputLabel}>
        Search for
      </label>

      {/* TODO: Check redundancy of values. */}
      <InputWithLabel
        id="searchTermInput"
        className=""
        inputType="text"
        value={searchTerm}
        placeholderText="Insert search term here..."
        onInputChange={validateAndHandleChange}
      >
        {null}
      </InputWithLabel>

      {error && <div className={styles.searchTermErrorMessage}>{error}</div>}

      {!error && (
        <div className={styles.searchTermInputHelperText}>
          Press button to search for {searchTerm}
        </div>
      )}
    </div>
  );
};

export default SearchTermInput;
