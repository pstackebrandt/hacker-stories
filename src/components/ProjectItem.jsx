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
        <h3 className="project-item-title">{project.title}</h3>
        {/* Link and authors */}
        <div>
            <span>
                <a href={project.url}>{project.url}</a>
            </span>
            <span className="by-label">by</span>
            <span>
                {project.author}
            </span>
            {/* Number of comments and star level */}
            <div className="comment-container">
                <span>
                    {project.num_comments} comments
                </span>
                <span className="star-level">
                    {'*'.repeat(project.points)}
                </span>
            </div>
            <div>
                <button
                    type="button"
                    onClick={() => onRemoveProject(project)}
                >
                    Remove
                </button>
            </div>
        </div>
    </li>

ProjectItem.propTypes = {
    project: PropTypes.shape({
        title: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
        author: PropTypes.string.isRequired,
        num_comments: PropTypes.number.isRequired,
        points: PropTypes.number.isRequired,
        objectID: PropTypes.number.isRequired,
    }).isRequired,
    onRemoveProject: PropTypes.func.isRequired
};

export default ProjectItem;
