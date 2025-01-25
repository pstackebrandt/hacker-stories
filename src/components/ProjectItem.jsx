// ProjectItem.jsx

import PropTypes from 'prop-types';
import styles from './ProjectItem.module.scss';

/**
 * Displays a single project item with its details and a remove button.
 * 
 * @param {Object} props - Component props
 * @param {import('../types/Project').Project} props.project - The project to display
 * @param {(project: import('../types/Project').Project) => void} 
 * props.onRemoveProject - Callback to remove the project
 * @returns {JSX.Element} Rendered project item
 */
const ProjectItem = ({ project, onRemoveProject }) =>
    <li className={styles.projectItem}>
        <h3 className={styles.projectItemTitle}>
            {project.url ? (
                <a className={styles.projectItemTitleLink}
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {project.title}
                </a>
            ) : (
                <span>{project.title}</span>
            )}
        </h3>
        {/* Author */}
        <div>
            <span>
                <span className={styles.byLabel}>by</span>
                <span className={styles.author}>
                    {project.author}
                </span>
            </span>
            <span>
                <button className={styles.removePostButton}
                    type="button"
                    onClick={() => onRemoveProject(project)}
                >
                    Remove
                </button>
            </span>
        </div>
        {/* Likes and number comments */}
        <div className={styles.commentContainer}>
            <span>
                <span className={styles.likes}>
                    {project.points}
                </span>
                <span className="text">
                    likes
                </span>
            </span>
            <span>
                <span className={styles.comments}>
                    {project.num_comments}
                </span>
                <span className="text">
                    comments
                </span>
            </span>
        </div>
    </li>

ProjectItem.propTypes = {
    project: PropTypes.shape({
        url: PropTypes.string,
        title: PropTypes.string.isRequired,
        author: PropTypes.string.isRequired,
        // eslint-disable-next-line camelcase
        num_comments: PropTypes.number.isRequired,
        points: PropTypes.number.isRequired,
        objectID: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]).isRequired,
    }).isRequired,
    onRemoveProject: PropTypes.func.isRequired
};

export default ProjectItem;
