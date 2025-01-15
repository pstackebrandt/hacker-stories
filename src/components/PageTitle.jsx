// PageTitle.jsx

import PropTypes from 'prop-types';
import styles from './PageTitle.module.scss';

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
        <div className={styles.pageTitles}>
            <h1 className={styles.title}>{title}</h1>
            {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </div>
    );
};

PageTitle.propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string
};

export default PageTitle; 