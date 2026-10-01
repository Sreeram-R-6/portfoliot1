import content from "./site.json";

type IdentityContent = Omit<(typeof content.sections)["identity"], "portraitImage"> & {
  portraitImage: string | null;
};

type SiteSections = Omit<typeof content.sections, "identity"> & {
  identity: IdentityContent;
};

export type SiteContent = Omit<typeof content, "projects" | "sections"> & {
  sections: SiteSections;
  projects: Array<Omit<(typeof content.projects)[number], "image"> & {
    image: string | null; summary?: string; role?: string; year?: string;
    tags?: string[]; gallery?: Array<string | null>; caseStudy?: string[];
  }>;
};

// Editorial reminders never enter public component props.
export function publicContent(source: SiteContent) {
  const { todos, projects, ...publicFields } = source;
  void todos;
  return { ...publicFields, projects: projects.map(({ todo, ...project }) => { void todo; return project; }) };
}

export const siteContent = publicContent(content as SiteContent);
export type PublicSiteContent = ReturnType<typeof publicContent>;

export type SectionContent = (typeof siteContent.sections)[keyof typeof siteContent.sections];
