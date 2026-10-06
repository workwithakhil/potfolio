// All portfolio content lives here. Edit this file to update the site.
// Empty strings ("") for links mean "not added yet" — the UI shows a
// graceful placeholder instead of a broken link.

export const profile = {
  name: 'Damaramadugu Akhil',
  shortName: 'Akhil',
  initials: 'DA',
  roles: ['Software Engineer', 'Cloud', 'AI/ML', 'Distributed Systems'],
  intro:
    'Computer Science undergraduate building practical software systems across full-stack development, cloud architecture, AI/ML, and distributed systems.',
  availability: 'Available for a 6-Month Internship',
  email: 'aakhilabhay@gmail.com',
  phone: '+91 9440487804',
  phoneHref: 'tel:+919440487804',
  location: 'Nellore, Andhra Pradesh',
  github: 'https://github.com/workwithakhil',
  githubHandle: 'workwithakhil',
  // Put your resume PDF in /public with this exact name.
  resumeUrl: '/Akhil_Damaramadugu_Resume.pdf',
};

export const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
];

// The page is cut like a film: each section is a numbered scene.
export const scenes = [
  { id: 'home', label: 'Opening' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'education', label: 'Education' },
  { id: 'github', label: 'GitHub' },
  { id: 'contact', label: 'Contact' },
];

export const about = {
  paragraphs: [
    "I'm a Computer Science and Engineering undergraduate at KL University, Vijayawada, graduating in May 2027. I'm drawn to software engineering, cloud computing, AI/ML, and distributed systems, and to the places where they meet.",
    'I learn best by building. Rather than stopping at theory, I like turning concepts into working applications: REST APIs with clean service layers, database-backed systems, cloud-ready architectures, and secure prototypes that hold up when you poke at them.',
    "Right now I'm looking for a software engineering internship where I can work on real systems, learn from experienced engineers, and ship things people actually use.",
  ],
  stats: [
    { value: '2027', label: 'Graduation' },
    { value: '7.85/10', label: 'Current CGPA' },
    { value: '2', label: 'Major projects' },
    { value: '2', label: 'AWS certifications' },
  ],
};

export const marquee = [
  'Available for a 6-month internship',
  'Software Engineer',
  'Cloud',
  'AI/ML',
  'Distributed Systems',
  '2× AWS Certified',
];

export const interests = [
  {
    icon: 'Code2',
    title: 'Software Engineering',
    text: 'Modular, readable codebases with clear layers, validation, and error handling built in from the start.',
    tone: 'ink',
  },
  {
    icon: 'Cloud',
    title: 'Cloud Computing',
    text: 'Designing applications that are ready to run on AWS: compute, storage, identity, networking, and monitoring.',
    tone: 'earth',
  },
  {
    icon: 'BrainCircuit',
    title: 'AI / ML',
    text: 'Applying machine learning fundamentals to practical problems like classifying and prioritizing real-world requests.',
    tone: 'stone',
  },
  {
    icon: 'Network',
    title: 'Distributed Systems',
    text: 'Consensus, integrity, and fault awareness across multiple nodes, explored hands-on through blockchain prototypes.',
    tone: 'earth',
  },
];

export const skillGroups = [
  {
    id: 'programming',
    title: 'Programming',
    icon: 'Terminal',
    tone: 'ink',
    items: ['Python', 'C', 'C++', 'JavaScript', 'SQL'],
  },
  {
    id: 'web',
    title: 'Frontend & Backend',
    icon: 'Layers',
    tone: 'earth',
    items: ['React.js', 'HTML5', 'CSS3', 'FastAPI', 'Flask', 'Node.js', 'REST APIs'],
  },
  {
    id: 'databases',
    title: 'Databases',
    icon: 'Database',
    tone: 'stone',
    items: ['MySQL', 'Relational Database Design', 'CRUD', 'SQL fundamentals'],
  },
  {
    id: 'cloud',
    title: 'Cloud & DevOps',
    icon: 'Cloud',
    tone: 'earth',
    wide: true,
    items: [
      'AWS EC2', 'S3', 'IAM', 'Lambda', 'API Gateway', 'RDS', 'DynamoDB', 'CloudWatch',
      'VPC', 'Route 53', 'CloudFront', 'Docker', 'Git', 'GitHub', 'CI/CD',
    ],
  },
  {
    id: 'cs',
    title: 'Computer Science',
    icon: 'Cpu',
    tone: 'stone',
    wide: true,
    items: [
      'Data Structures & Algorithms', 'OOP', 'DBMS', 'Operating Systems', 'Computer Networks',
      'SDLC', 'Debugging', 'Problem Solving', 'Machine Learning Fundamentals',
    ],
  },
];

export const certifications = [
  {
    name: 'AWS Certified Solutions Architect – Associate',
    issuer: 'Amazon Web Services',
    level: 'Associate',
    short: 'Solutions Architect',
    description:
      'Covers designing secure, resilient, high-performing, and cost-optimized architectures on AWS.',
    credentialUrl: 'https://www.credly.com/badges/2c355018-d948-43ef-99ed-3c7b020669aa/public_url',
    tone: 'ink',
  },
  {
    name: 'AWS Certified Machine Learning Engineer – Associate',
    code: 'MLA-C01',
    issuer: 'Amazon Web Services',
    level: 'Associate',
    short: 'Machine Learning Engineer',
    description:
      'Covers preparing data, building and deploying ML models, and operating ML workloads on AWS.',
    credentialUrl: 'https://www.credly.com/badges/71dae642-fd20-44d4-9a85-e848df5ea188/public_url',
    tone: 'earth',
  },
];

export const projects = [
  {
    id: 'cloudops',
    title: 'AI-Powered CloudOps Ticket Assistant',
    tagline: 'Full-stack ticketing with classification and priority-based processing',
    tech: ['Python', 'FastAPI', 'React', 'MySQL', 'AWS', 'Docker'],
    description:
      'An end-to-end web application for creating, classifying, prioritizing, assigning, and tracking IT and cloud-support tickets through a responsive React interface and REST APIs.',
    areas: [
      'Full-stack architecture', 'REST APIs', 'Ticket classification', 'Priority-based processing',
      'Database-backed services', 'Input validation', 'Exception handling',
      'Modular backend architecture', 'Docker', 'AWS-ready architecture',
    ],
    visual: 'architecture',
    layers: [
      { label: 'React Frontend', note: 'Responsive UI for creating and tracking tickets' },
      { label: 'FastAPI REST API', note: 'Validated endpoints and structured errors' },
      { label: 'Service Layer', note: 'Classification, priority, and assignment logic' },
      { label: 'MySQL', note: 'Relational storage for tickets and assignments' },
      { label: 'Cloud Infrastructure', note: 'Containerized with Docker, designed for AWS' },
    ],
    aws: ['EC2', 'S3', 'IAM', 'Lambda', 'API Gateway', 'RDS / DynamoDB', 'CloudWatch', 'VPC', 'Route 53', 'CloudFront'],
    detail: {
      problem:
        'IT and cloud-support requests often arrive unstructured. Without consistent classification and prioritization, urgent issues can sit in the same queue as routine ones, and ownership becomes unclear.',
      solution:
        'A web application where tickets are created through a React interface, then classified, prioritized, assigned, and tracked through REST APIs backed by a relational database.',
      features: [
        'Create, classify, prioritize, assign, and track tickets end to end',
        'Responsive React interface talking to a FastAPI backend over REST',
        'Priority-based processing so urgent tickets surface first',
        'Database-backed services on MySQL',
        'Input validation and consistent exception handling across endpoints',
        'Modular backend split into API, service, and data layers',
        'Containerized with Docker',
      ],
      challenges: [
        'Keeping classification and priority logic in a service layer instead of inside route handlers, so the API stays thin and the logic stays reusable.',
        'Validating input at the API boundary and returning predictable error responses instead of letting failures leak through.',
        'Designing the system so it maps cleanly onto AWS services without depending on them during development.',
      ],
      learning:
        'Building this end to end showed how much a clean separation of layers pays off: the frontend, API, business logic, and database can each change without breaking the others. It also gave practical experience planning a deployment around AWS building blocks.',
      awsNote:
        'Presented as an AWS-ready architecture: the design maps to these services, not a claim of a live production deployment.',
    },
    githubUrl: '', // e.g. https://github.com/workwithakhil/cloudops-ticket-assistant
    demoUrl: '',
  },
  {
    id: 'blockchain',
    title: 'Blockchain-Based Insider Threat Monitoring System',
    tagline: 'Tamper-evident activity logging with consensus and integrity checks',
    tech: ['Python', 'Flask', 'React', 'Blockchain'],
    description:
      'A full-stack security prototype that records employee activity as tamper-evident blockchain transactions for auditability and internal-threat monitoring.',
    areas: [
      'Blockchain transaction logging', 'Block hashing', 'Previous-hash linkage',
      'Chain integrity verification', 'Merkle trees', 'Proof-of-work simulation',
      'PBFT-inspired node consensus', 'Activity monitoring', 'Risk-event dashboard',
      'Node health monitoring', 'Distributed systems', 'Secure software design',
    ],
    visual: 'chain',
    flow: ['Employee Activity', 'Transaction', 'Block', 'Consensus', 'Ledger', 'Monitoring Dashboard'],
    detail: {
      problem:
        'Insider threats are hard to investigate when activity logs can be quietly edited or deleted. Audits are only as trustworthy as the records behind them.',
      solution:
        'A prototype that records employee activity as blockchain transactions. Each block is hashed and linked to the previous one, so any tampering breaks the chain and becomes detectable.',
      features: [
        'Employee activity recorded as blockchain transactions',
        'Block hashing with previous-hash linkage',
        'Chain integrity verification to detect tampering',
        'Merkle trees for summarizing transactions within a block',
        'Proof-of-work simulation',
        'PBFT-inspired consensus between nodes',
        'Risk-event dashboard and node health monitoring',
      ],
      challenges: [
        'Implementing hashing, linkage, and verification so that any modified record is caught by the integrity check.',
        'Simulating agreement between multiple nodes with a PBFT-inspired approach rather than trusting a single writer.',
        'Presenting low-level chain data as a dashboard that is useful for monitoring risk events and node health.',
      ],
      learning:
        'This project made distributed-systems ideas concrete: why consensus matters, how hash linkage gives tamper evidence, and how to design security features into software instead of adding them afterward.',
    },
    githubUrl: '',
    demoUrl: '',
  },
];

export const education = [
  {
    school: 'KL University',
    place: 'Vijayawada',
    degree: 'B.Tech, Computer Science and Engineering',
    period: 'Expected May 2027',
    score: '7.85/10',
    scoreLabel: 'CGPA, declared semesters',
    note: 'Third-year results are awaited; cumulative CGPA is pending university declaration.',
    current: true,
  },
  {
    school: 'Narayana Junior College',
    degree: 'Intermediate (Class XII)',
    score: '65%',
    scoreLabel: 'Class XII',
  },
  {
    school: 'Sri Sai Vidyanikethan',
    degree: 'Class X',
    score: '584/600',
    scoreLabel: 'Class X',
  },
];

export const coursework = [
  'Data Structures and Algorithms', 'Object-Oriented Programming', 'Database Management Systems',
  'Operating Systems', 'Computer Networks', 'Machine Learning', 'Cloud Computing', 'Software Engineering',
];

// Optional live list of public repos. If the GitHub API is unreachable
// or rate-limited, the section falls back to the projects above.
export const githubConfig = {
  fetchRepos: true,
  maxRepos: 6,
};

// Contact form: set VITE_FORM_ENDPOINT in a .env file (e.g. a Formspree
// form URL) to receive messages. Without it, the form opens the visitor's
// email app with the message pre-filled. No secrets belong in this file.
export const contactConfig = {
  endpoint: import.meta.env.VITE_FORM_ENDPOINT || '',
};
