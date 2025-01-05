// ProjectsList.jsx

import PropTypes from 'prop-types';
import ProjectItem from './ProjectItem';

/**
 * Displays a list of projects (frameworks/libraries) with the ability to remove a project.
 */
const ProjectsList = ({ projects, onRemoveProject }) =>
    <ul>
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
            url: PropTypes.string.isRequired,
            author: PropTypes.string.isRequired,
            num_comments: PropTypes.number.isRequired,
            points: PropTypes.number.isRequired,
            objectID: PropTypes.number.isRequired,
        })
    ).isRequired,
    onRemoveProject: PropTypes.func.isRequired
};

export default ProjectsList;