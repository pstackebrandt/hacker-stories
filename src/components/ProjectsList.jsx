// ProjectsList.jsx

import PropTypes from 'prop-types';
import ProjectItem from './ProjectItem';
import styles from './ProjectsList.module.scss';

/**
 * Displays a list of projects (frameworks/libraries) with the ability to remove a project.
 * 
 * @param {Object} props - Component props
 * @param {import('../data/frameworks').Framework[]} props.projects - Array of projects to display
 * @param {(project: import('../data/frameworks').Framework) => void} props.onRemoveProject - Callback to remove a project
 * @returns {JSX.Element} Rendered list of projects
 */
const ProjectsList = ({ projects, onRemoveProject }) =>
    <ul className={styles.projectsList}>
        {projects.map((project) =>
            <ProjectItem
                key={"projectItem" + project.objectID}
                project={project}
                onRemoveProject={onRemoveProject} />
        )}
    </ul>

ProjectsList.propTypes = {
    projects: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired,
            url: PropTypes.string,
            author: PropTypes.string.isRequired,
            // eslint-disable-next-line camelcase
            num_comments: PropTypes.number.isRequired,
            points: PropTypes.number.isRequired,
            objectID: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.number
            ]).isRequired,
        })
    ).isRequired,
    onRemoveProject: PropTypes.func.isRequired
};

export default ProjectsList;