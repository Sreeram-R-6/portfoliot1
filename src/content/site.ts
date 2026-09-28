import content from "./site.json";

export type SiteContent = Omit<typeof content, "projects"> & {
  projects: Array<Omit<(typeof content.projects)[number], "image"> & { image: string | null }>;
};

export const siteContent: SiteContent = content;

export type SectionContent = (typeof siteContent.sections)[keyof typeof siteContent.sections];
