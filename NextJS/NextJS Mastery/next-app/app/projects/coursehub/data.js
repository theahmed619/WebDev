import {
  FaCode,
  FaJava,
  FaPhp,
  FaPython,
  FaReact,
  FaServer,
  FaCloudDownloadAlt,
} from "react-icons/fa";

export const courses = [
  {
    id: "dsa",
    title: "Advanced Data Structure",
    icon: <FaCode color="#facc15" />,
  },
  { id: "java", title: "Java Full Stack", icon: <FaJava color="#f97316" /> },
  {
    id: "python",
    title: "Python Full Stack",
    icon: <FaPython color="#38bdf8" />,
  },
  { id: "mern", title: "MERN Full Stack", icon: <FaReact color="#22c55e" /> },
  { id: "php", title: "PHP Full Stack", icon: <FaPhp color="#a855f7" /> },
  {
    id: "fetch",
    title: "Fetch Data (Client)",
    icon: <FaCloudDownloadAlt color="#eab308" />,
  },
  {
    id: "server",
    title: "Fetch Data (Server)",
    icon: <FaServer color="#ec4899" />,
  },
];

export const courseDetails = [
  {
    id: 1,
    title: "Java Full Stack",
    duration: "6 months",
    level: "Advanced",
    projects: [
      { id: 101, title: "E-Commerce Website" },
      { id: 102, title: "Online Banking System" },
      { id: 103, title: "Job Portal" },
      { id: 104, title: "Library Management System" },
    ],
  },
  {
    id: 2,
    title: "Advance Data Structure - DSA",
    duration: "4 months",
    level: "Intermediate",
    projects: [
      { id: 201, title: "File Compression Tool" },
      { id: 202, title: "Data Caching System" },
      { id: 203, title: "Memory Management Simulator" },
      { id: 204, title: "Graph-based Social Network" },
    ],
  },
  {
    id: 3,
    title: "MERN Full Stack",
    duration: "5 months",
    level: "Advanced",
    projects: [
      { id: 301, title: "Social Media Application" },
      { id: 302, title: "Task Management System" },
      { id: 303, title: "E-Learning Platform" },
      { id: 304, title: "Real-Time Chat Application" },
    ],
  },
  {
    id: 4,
    title: "Python Full Stack",
    duration: "5 months",
    level: "Intermediate",
    projects: [
      { id: 401, title: "Blogging Platform" },
      { id: 402, title: "Weather Forecast App" },
      { id: 403, title: "Hospital Management System" },
      { id: 404, title: "Online Quiz Application" },
    ],
  },
  {
    id: 5,
    title: "Php Full Stack",
    duration: "4 months",
    level: "Basic",
    projects: [
      { id: 501, title: "Portfolio Website" },
      { id: 502, title: "Event Management System" },
      { id: 503, title: "CRM Application" },
      { id: 504, title: "Inventory Management System" },
    ],
  },
  {
    id: 6,
    title: "Fetch Data (Client)",
    duration: "2 months",
    level: "Basic",

    projects: [
      { id: 601, title: "Fetch API with JavaScript" },
      { id: 602, title: "REST API Integration" },
      { id: 603, title: "GraphQL Query Client" },
      { id: 604, title: "Real-Time Data Fetching App" },
    ],
  },
  {
    id: 7,
    title: "Fetch Data (Server)",
    duration: "3 months",
    level: "Intermediate",

    projects: [
      { id: 701, title: "API Server with Node.js" },
      { id: 702, title: "Server-Side Data Caching" },
      { id: 703, title: "Microservices Data Fetching" },
      { id: 704, title: "Streaming Data API" },
    ],
  },
];