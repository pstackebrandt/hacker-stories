import { Project } from "../types/Project";
import ProjectItem from "./ProjectItem";
import styles from "./ProjectsList.module.scss";

interface ProjectsListProps {
  projects: Project[];
  onRemoveProject: (project: Project) => void;
}

/**
 * Displays a list of projects (frameworks/libraries) with the ability to remove a project.
 * @returns {JSX.Element} Rendered list of projects
 */
const ProjectsList = ({ projects, onRemoveProject }: ProjectsListProps) => (
  <ul className={styles.projectsList}>
    {projects.map((project) => (
      <ProjectItem
        key={"projectItem" + project.objectID}
        project={project}
        onRemoveProject={onRemoveProject}
      />
    ))}
  </ul>
);

export default ProjectsList;
