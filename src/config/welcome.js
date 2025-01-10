/**
 * @typedef {Object} WelcomeConfig
 * @property {string} greeting - The greeting message
 * @property {string} title - The title to display
 */

/**
 * Welcome configuration data.
 * The object is frozen to prevent modifications.
 * @type {WelcomeConfig}
 */
export const welcomeData = Object.freeze({
  greeting: "Hello",
  title: "Hackers",
});