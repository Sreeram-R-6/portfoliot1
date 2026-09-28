export const siteContent = {
  metadata: {
    title: "Sreeram — Portfolio",
    description: "CS student and builder, CCE Kerala. Software, embedded systems, and projects.",
  },
  name: "Sreeram",
  role: "CS student and builder, CCE Kerala",
  location: "Kerala, India",
  navigation: {
    label: "Navigation",
    menu: "Menu",
    home: { label: "Sreeram", href: "#identity" },
    links: [
      { label: "About", href: "#identity" },
      { label: "Work", href: "#projects" },
      { label: "Contact", href: "#contact" },
    ],
  },
  sections: {
    identity: {
      id: "identity",
      eyebrow: "Identity hero",
      title: "Sreeram",
      description: "CS student and builder, CCE Kerala",
    },
    manifesto: {
      id: "manifesto",
      eyebrow: "Manifesto",
      title: "Learning by building",
      description: "Exploring software and embedded systems through hands-on projects.",
    },
    statistics: {
      id: "statistics",
      eyebrow: "Statistics and tools",
      title: "In progress",
      description: "[Add personal statistics and tools here]",
    },
    projects: {
      id: "projects",
      eyebrow: "Project showcase",
      title: "Selected projects",
      description: "Software, telemetry, and embedded systems.",
    },
    experience: {
      id: "experience",
      eyebrow: "Experience",
      title: "Learning and building",
      description: "[Add experience and milestones here]",
    },
  },
  projects: [
    { id: "thuzhayan", title: "Thuzhayan", description: "AI-instrumented Vallamkali telemetry", href: "#" },
    { id: "saferoad", title: "SafeRoad", description: "ESP32 + Firebase road safety", href: "#" },
    { id: "dual-drone", title: "AICTE dual-drone disaster rescue system", description: "Dual-drone disaster rescue system", href: "#" },
    { id: "cce-judge", title: "CCE Judge", description: "Competitive programming platform", href: "#" },
    { id: "weather-station", title: "Weather Station Dashboard", description: "Weather station dashboard", href: "#" },
  ],
  footer: {
    id: "contact",
    eyebrow: "Contact footer",
    title: "Let’s connect",
    message: { label: "[email]", href: "#" },
    cv: { label: "[CV]", href: "#" },
    links: [
      { label: "[GitHub]", href: "#" },
      { label: "[LinkedIn]", href: "#" },
    ],
  },
} as const;

export type SectionContent = (typeof siteContent.sections)[keyof typeof siteContent.sections];
