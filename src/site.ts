// Everything about you lives in this file. Edit it and every page updates.
// Projects live in src/projects/, one Markdown file each.

export const profile = {
  name: 'Satyam Bhanot',
  role: 'Software engineer',
  location: 'Calgary, Alberta',
  // The big line under your name, then a supporting sentence.
  tagline: 'I build software that makes complex systems easier to reason about.',
  intro: 'Backend services, data pipelines, and the occasional systems tool. I like knowing why they behave the way they do.',
  // Shown in Google results and link previews.
  description: 'Software engineer in Calgary building backend, data, and machine learning projects.',
  now: { title: 'MEng, Software Engineering', detail: 'University of Calgary' },
  openTo: 'Backend, data, and ML roles',
  // Used for the live local-time clock in the footer.
  timezone: 'America/Edmonton',
  email: 'satyambhanot@gmail.com',
  github: 'https://github.com/satyambhanot',
  linkedin: 'https://www.linkedin.com/in/satyam-bhanot/',
  // Put your PDF at public/resume.pdf, then set this to '/resume.pdf'.
  // While it's empty, résumé buttons stay hidden instead of linking to a missing file.
  resume: '',
};

// The big numbers on the home page. Each one counts up when it scrolls into view.
// Only put numbers here that a project page or your résumé backs up.
export const highlights = [
  {
    value: 25.2,
    decimals: 1,
    prefix: '−',
    suffix: '%',
    label: 'risk-weighted dark nights vs oldest-first',
    source: 'Lamplighter, tuned policy',
    href: '/projects/lamplighter/',
  },
  {
    value: 774,
    label: 'real 311 street-light tickets replayed',
    source: 'Lamplighter',
    href: '/projects/lamplighter/',
  },
  {
    value: 50,
    suffix: '+',
    label: 'incidents handled every week',
    source: 'Rogers Communications',
  },
  {
    value: 4,
    label: 'detectors compared, plus five ablation studies',
    source: "Where's Waldo? detector",
    href: '/projects/wheres-waldo/',
  },
];

// Habits that show up across the case studies. Each links to where it happened.
export const principles = [
  {
    title: 'One source of truth',
    text: 'Lamplighter’s offline replay and its live API call the same score(), so the reported results describe the logic dispatchers actually use.',
    href: '/projects/lamplighter/',
  },
  {
    title: 'Split where leakage hides',
    text: 'Where’s Waldo? splits by image, not by tile. Overlapping tiles in both training and test would flatter the scores.',
    href: '/projects/wheres-waldo/',
  },
  {
    title: 'Change one thing at a time',
    text: 'Five ablation studies on the Waldo detector: preprocessing, detection heads, tile size, colour, and backbone. Each varies a single factor so a change in score has one explanation.',
    href: '/projects/wheres-waldo/',
  },
  {
    title: 'Keep the goalposts fixed',
    text: 'In Lamplighter the cost of a dark night is set in config and never tuned, so the tuner can only change policy, not the scoring of success.',
    href: '/projects/lamplighter/',
  },
];

// Newest first. Leave out `end` while a degree is in progress.
export const education = [
  {
    degree: 'Master of Engineering, Software Engineering',
    school: 'University of Calgary',
    start: 'Sep 2026',
  },
  {
    degree: 'BSc (Honours), Computer Science',
    school: 'University of Manitoba',
    end: 'Apr 2026',
    notes: [
      'Minor in Mathematics and Statistics',
      "Dean's Honour List, Fall 2024 (term GPA 3.90)",
      'University 1 Honour List, Winter 2021 (GPA 3.83)',
    ],
  },
];

// Newest first. Leave out `end` for a current role.
export const experience = [
  {
    title: 'Tech Support Specialist',
    org: 'Rogers Communications · Remote',
    start: 'May 2023',
    summary:
      'Handle 50+ incidents a week across hardware, software, and network problems: diagnose, fix or escalate, and document what worked.',
  },
  {
    title: 'Student Mentor and Campus Leader',
    org: 'University of Manitoba',
    start: '2024',
    end: '2026',
    summary: 'Helped new students through orientation, finding campus resources, and their first terms.',
  },
  {
    title: 'Peer Tutor',
    org: "UofM Science Students' Association · Nimbus Learning",
    start: 'Sep 2023',
    end: 'Aug 2025',
    summary: 'One-on-one and group tutoring in computer science, mathematics, and statistics.',
  },
];

export const tools = [
  { group: 'Languages', items: 'Python, Java, C, SQL, JavaScript, C++' },
  { group: 'Backend', items: 'FastAPI, SQLite, PostgreSQL, Node.js, REST APIs' },
  { group: 'Data and ML', items: 'pandas, scikit-learn, PyTorch, XGBoost, Streamlit, Jupyter' },
  { group: 'Systems and workflow', items: 'Linux, gdb, Valgrind, Make, Git, pytest' },
];
