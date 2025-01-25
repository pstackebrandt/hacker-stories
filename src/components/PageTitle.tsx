// PageTitle.tsx

import styles from "./PageTitle.module.scss";

interface PageTitleProps {
  /** The main title text */
  title: string;
  /** The subtitle text */
  subtitle?: string;
}

/**
 * Component that displays a page title and
 * - if content provided - a page subtitle.
 * @returns The rendered component
 */
const PageTitle = ({ title, subtitle }: PageTitleProps) => {
  return (
    <div className={styles.pageTitles}>
      <h1 className={styles.title}>{title}</h1>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
    </div>
  );
};

export default PageTitle;
