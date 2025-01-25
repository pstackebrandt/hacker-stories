// InputWithLabel.tsx

import styles from "./InputWithLabel.module.scss";

interface InputWithLabelProps {
  className?: string;
  id?: string | (() => string);
  inputType?: string;
  /** The (initial) value of the input element */
  value?: string;
  /** Whether the input should be focused */
  isFocused?: boolean;
  /** The function to call when the input value changes */
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholderText?: string;
  /** The content to be displayed inside the label */
  children?: React.ReactNode;
}

/** This component renders an input field and - if content given - a label.
 * @returns The rendered label and input elements.
 */
const InputWithLabel = ({
  className = "",
  id,
  inputType = "text",
  value = "",
  isFocused = true,
  onInputChange,
  placeholderText = "Insert here...",
  children,
}: InputWithLabelProps) => {
  /**
   * @summary Generate a unique ID for the input element.
   * @description This function generates a 'unique' ID for the input element by combining
   * the string "input-" with a short random string. It is highly probable that the generated ID is * unique.
   * @example Math.random().toString(36) -> "0.5g7y8z9x1w", substring(2, 11) -> "5g7y8z9x1"
   * Resulting ID: "input-5g7y8z9x1"
   * @returns The generated ID.
   */
  const generateUniqueId = () => {
    return `input-${Math.random().toString(36).substring(2, 11)}`;
  };

  const finalId = id || generateUniqueId;

  return (
    <div className={styles.inputContainer}>
      {children && (
        <label htmlFor={typeof finalId === "function" ? finalId() : finalId}>
          {children}
        </label>
      )}
      <input
        className={`${styles.input} ${className || ""}`}
        id={typeof finalId === "function" ? finalId() : finalId}
        value={value}
        type={inputType}
        placeholder={placeholderText}
        autoFocus={isFocused}
        onChange={onInputChange}
      ></input>
    </div>
  );
};

export default InputWithLabel;
