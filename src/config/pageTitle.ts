
interface PageTitleConfig {
    title: string;
    subtitle: string;
}

/**
 * Page title configuration data.
 * The object is frozen to prevent modifications.
 */
export const titleData: PageTitleConfig = Object.freeze({
  title: "Your Hacker Stories",
  subtitle: "Get your stories from hacker news",
});