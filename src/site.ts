// Everything about you lives in this file. Edit it and every page updates.
// Projects live in src/projects/, one Markdown file each.

export const profile = {
  name: 'Satyam Bhanot',
  role: 'Software engineer',
  location: 'Calgary, Alberta',
  intro:
    'I build backend services, data pipelines, and the occasional systems tool, and I like knowing why they behave the way they do.',
  // Shown in Google results and link previews.
  description: 'Software engineer in Calgary building backend, data, and machine learning projects.',
  now: { title: 'MEng, Software Engineering', detail: 'University of Calgary' },
  openTo: 'Backend, data, and ML roles',
  email: 'satyambhanot@gmail.com',
  github: 'https://github.com/satyambhanot',
  linkedin: 'https://www.linkedin.com/in/satyam-bhanot/',
  // Put your PDF at public/resume.pdf, then set this to '/resume.pdf'.
  // While it's empty, résumé buttons stay hidden instead of linking to a missing file.
  resume: '',
};

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
