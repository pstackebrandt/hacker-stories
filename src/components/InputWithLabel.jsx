// InputWithLabel.JSX

import PropTypes from 'prop-types';
import styles from './InputWithLabel.module.scss';

/** * InputWithLabel component renders a label and an input field.
 * 
 * @param {Object} props - The properties object.
 * @param {string} props.className - The class name for the input container.
 * @param {string} props.id- The id for the input element.  * If not provided, a unique id will be generated.
 * @param {string} props.inputType - The (initial) value of the input element.
 * @param {string} props.value- The type of the input element.
 * @param {function} props.onInputChange - The function to call when the input value changes.
 * @param {React.ReactNode} props.children - The content to be displayed inside the label.
 * 
 * @returns {JSX.Element} The rendered label and input elements.
 */
const InputWithLabel = ({
    className,
    id,
    inputType = 'text',
    value = '',
    isFocused = true,
    onInputChange,
    placeholderText = 'Insert here...',
    children
}) => {

    /**
     * @summary Generate a unique ID for the input element.
     * @description This function generates a 'unique' ID for the input element by combining 
     * the string "input-" with a short random string. It is highly probable that the generated ID is * unique.
     * @example Math.random().toString(36) -> "0.5g7y8z9x1w", substring(2, 11) -> "5g7y8z9x1"
     * Resulting ID: "input-5g7y8z9x1"
     * @returns {string} - The generated ID.
     */
    const generateUniqueId = () => {
        return `input-${Math.random().toString(36).substring(2, 11)}`;
    }

    const finalId = id || generateUniqueId;

    return (
        <div className={styles.inputContainer}>

            {children && <label htmlFor={finalId}>{children}</label>}
            <input
                className={`${styles.input} ${className || ''}`}
                id={finalId}
                value={value}
                type={inputType}
                placeholder={placeholderText}
                autoFocus={isFocused}
                onChange={onInputChange}>
            </input>
        </div>
    );
}

InputWithLabel.propTypes = {
    className: PropTypes.string,
    id: PropTypes.string,
    value: PropTypes.string,
    inputType: PropTypes.string,
    isFocused: PropTypes.bool,
    onInputChange: PropTypes.func.isRequired,
    placeholderText: PropTypes.string,
    children: PropTypes.node
};

export default InputWithLabel;