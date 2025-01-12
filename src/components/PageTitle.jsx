// PageTitle.jsx

import PropTypes from 'prop-types';

/**
 * PageTitle component that displays a title and subtitle.
 * 
 * @param {Object} props - Component props
 * @param {string} props.title - The main title text
 * @param {string} props.subtitle - The subtitle text
 * @returns {JSX.Element} The rendered component
 */
const PageTitle = ({ title, subtitle }) => {
    return (
        <div className="page-title">
            <h1>{title}</h1>
            {subtitle && <p>{subtitle}</p>}
        </div>
    );
};

PageTitle.propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string
};

export default PageTitle; 