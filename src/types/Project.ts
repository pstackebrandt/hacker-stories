export interface Project {
  title: string;
  url: string;
  author: string;
  // Property name matches external API response format
  // Probably won't fix such issues in this project.
  // eslint-disable-next-line @typescript-eslint/naming-convention
  num_comments: number;
  points: number;
  objectID: string | number;
} 