// ProjectItem.tsx

import styles from "./ProjectItem.module.scss";
import { Project } from "../types/Project";

/**
 * @property project - The project data to display
 * @property onRemoveProject - Callback function when removing a project
 */
interface ProjectItemProps {
  project: Project;
  onRemoveProject: (project: Project) => void;
}

/** Displays a single project item with its details and a remove button. */
const ProjectItem = ({ project, onRemoveProject }: ProjectItemProps) => (
  <li className={styles.projectItem}>
    <h3 className={styles.projectItemTitle}>
      {project.url ? (
        <a
          className={styles.projectItemTitleLink}
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
        <span className={styles.author}>{project.author}</span>
      </span>
      <span>
        <button
          className={styles.removePostButton}
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
        <span className={styles.likes}>{project.points}</span>
        <span className="text">likes</span>
      </span>
      <span>
        <span className={styles.comments}>{project.num_comments}</span>
        <span className="text">comments</span>
      </span>
    </div>
  </li>
);

export default ProjectItem;
