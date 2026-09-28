import content from "./site.json";

export type SiteContent = Omit<typeof content, "projects"> & {
  projects: Array<Omit<(typeof content.projects)[number], "image"> & { image: string | null; summary?: string }>;
};

// Editorial reminders never enter public component props.
export function publicContent(source: SiteContent) {
  const { todos, projects, ...publicFields } = source;
  void todos;
  return { ...publicFields, projects: projects.map(({ todo, ...project }) => { void todo; return project; }) };
}

export const siteContent = publicContent(content as SiteContent);

export type SectionContent = (typeof siteContent.sections)[keyof typeof siteContent.sections];
