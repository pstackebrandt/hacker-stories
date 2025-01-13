// ProjectItem.jsx

import PropTypes from 'prop-types';

/**
 * Displays a single framework/library item with its details and a remove button.
 * 
 * @param {Object} props - Component props
 * @param {import('../data/frameworks').Framework} props.project - The project to display
 * @param {(project: import('../data/frameworks').Framework) => void} props.onRemoveProject - Callback to remove the project
 * @returns {JSX.Element} Rendered project item
 */
const ProjectItem = ({ project, onRemoveProject }) => // Example of using props with destructuring.
    <li className='project-item'>

        {/* Link as title or title */}
        <h3 className="project-item-title">
            {project.url ? (
                <a href={project.url} target="_blank" rel="noopener noreferrer">{project.title}</a>
            ) : (
                <span>{project.title}</span>
            )}
        </h3>

        {/* Author */}
        <div>
            <span>
                <span className="by-label">by</span>
                <span className="author">
                    {project.author}
                </span>
            </span>
            <span>
                <button className='remove-post-button'
                    type="button"
                    onClick={() => onRemoveProject(project)}
                >
                    Remove
                </button>
            </span>

        </div>

        {/* Likes and number comments */}
        <div className="comment-container">
            <span>
                <span className="likes">
                    {project.points}
                </span>
                <span className="text">
                    likes
                </span>
            </span>
            <span>
                <span className="comments">
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
