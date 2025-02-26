import { ResumeType } from "@/app/types/career";

export const sampleResumeData: ResumeType = {
  templateId: 0,
  basics: {
    id: "1",
    name: "John Doe",
    label: "Software Engineer",
    imageName: "https://i.pravatar.cc/150?img=12",
    email: "johndoe@example.com",
    phone: "+1234567890",
    url: "https://johndoe.dev",
    summary:
      "A passionate software engineer with expertise in building scalable applications, cloud computing, and DevOps. I have a proven track record of delivering high-quality software solutions to meet business needs and exceed customer expectations. I am seeking new challenges and opportunities to further develop my skills and contribute to innovative projects.",
    location: {
      address: "123 Main St",
      postalCode: "12345",
      city: "San Francisco",
      countryCode: "US",
      region: "California",
    },
    profiles: [
      {
        network: "LinkedIn",
        username: "johndoe",
        url: "https://linkedin.com/in/johndoe",
      },
      {
        network: "GitHub",
        username: "johndoe",
        url: "https://github.com/johndoe",
      },
      {
        network: "Twitter",
        username: "@johndoe",
        url: "https://twitter.com/johndoe",
      },
    ],
  },
  work: [
    {
      name: "TechCorp",
      position: "Senior Developer",
      url: "https://techcorp.com",
      startDate: "2020-01-01",
      endDate: "2023-01-01",
      summary:
        "Led a team of developers to build innovative software solutions.",
      highlights: [
        "Developed a high-performance API serving millions of users.",
        "Mentored junior developers.",
        "Reduced system latency by 30%.",
      ],
    },
    {
      name: "CodeWorks",
      position: "Software Engineer",
      url: "https://codeworks.com",
      startDate: "2017-06-01",
      endDate: "2019-12-31",
      summary:
        "Designed and implemented key features for the company’s flagship product.",
      highlights: [
        "Implemented CI/CD pipelines.",
        "Optimized database queries.",
        "Enhanced user interface responsiveness.",
      ],
    },
    {
      name: "Startup Inc.",
      position: "Junior Developer",
      url: "https://startupinc.com",
      startDate: "2015-08-01",
      endDate: "2017-05-31",
      summary: "Worked on the backend systems for the company’s main product.",
      highlights: [
        "Created RESTful APIs.",
        "Collaborated with cross-functional teams.",
        "Wrote unit and integration tests.",
      ],
    },
  ],
  volunteer: [
    {
      organization: "Open Source Community",
      position: "Contributor",
      url: "https://opensource.org",
      startDate: "2020-06-01",
      endDate: "2022-06-01",
      summary: "Contributed to several open-source projects.",
      highlights: [
        "Fixed critical bugs in a popular library.",
        "Wrote comprehensive documentation.",
        "Mentored new contributors.",
      ],
    },
    {
      organization: "Local Food Bank",
      position: "Volunteer",
      url: "https://localfoodbank.org",
      startDate: "2018-01-01",
      endDate: "2019-01-01",
      summary: "Helped organize food drives and distribution.",
      highlights: [
        "Coordinated with local businesses.",
        "Managed volunteer schedules.",
        "Distributed meals to over 500 families.",
      ],
    },
  ],
  education: [
    {
      institution: "University of Technology",
      url: "https://universityoftech.edu",
      area: "Computer Science",
      studyType: "Bachelor's",
      startDate: "2012-09-01",
      endDate: "2016-06-01",
      score: "3.9 GPA",
      courses: [
        "Data Structures and Algorithms",
        "Operating Systems",
        "Software Engineering",
      ],
    },
    {
      institution: "Community College",
      url: "https://communitycollege.edu",
      area: "Information Technology",
      studyType: "Associate's",
      startDate: "2010-09-01",
      endDate: "2012-06-01",
      score: "4.0 GPA",
      courses: [
        "Networking Fundamentals",
        "Database Design",
        "Web Development",
      ],
    },
  ],
  awards: [
    {
      title: "Best Developer Award",
      date: "2022-05-15",
      awarder: "TechCorp",
      summary: "Recognized for exceptional contributions to the team.",
    },
    {
      title: "Employee of the Month",
      date: "2021-09-01",
      awarder: "CodeWorks",
      summary: "Awarded for outstanding performance and dedication.",
    },
  ],
  certificates: [
    {
      name: "Certified Kubernetes Administrator",
      date: "2023-02-01",
      issuer: "CNCF",
      url: "https://certificates.cncf.io",
    },
    {
      name: "AWS Certified Solutions Architect",
      date: "2022-07-01",
      issuer: "AWS",
      url: "https://aws.amazon.com/certification",
    },
  ],
  publications: [
    {
      name: "Building Scalable Applications",
      publisher: "TechPress",
      releaseDate: "2021-11-01",
      url: "https://techpress.com/scalable-applications",
      summary: "A comprehensive guide to building scalable software systems.",
    },
    {
      name: "Cloud Computing Essentials",
      publisher: "Cloud Academy",
      releaseDate: "2020-08-01",
      url: "https://cloudacademy.com/cloud-essentials",
      summary: "An introduction to cloud computing technologies.",
    },
  ],
  skills: [
    {
      name: "JavaScript",
      level: "Advanced",
      keywords: ["React", "Node.js", "TypeScript"],
    },
    {
      name: "DevOps",
      level: "Intermediate",
      keywords: ["Docker", "Kubernetes", "CI/CD"],
    },
    {
      name: "Databases",
      level: "Intermediate",
      keywords: ["SQL", "MongoDB", "PostgreSQL"],
    },
  ],
  languages: [
    {
      language: "English",
      fluency: "Native",
    },
    {
      language: "French",
      fluency: "Intermediate",
    },
  ],
  interests: [
    {
      name: "Technology",
      keywords: ["Open Source", "Startups", "AI"],
    },
    {
      name: "Travel",
      keywords: ["Adventure", "Cultural Exploration"],
    },
  ],
  references: [
    {
      email: "manager@gmail.com",
      name: "Jane Smith",
      reference:
        "Jane was my manager at TechCorp and can attest to my technical and leadership skills.",
    },
  ],
  projects: [
    {
      name: "E-Commerce Platform",
      startDate: "2021-01-01",
      endDate: "2021-12-31",
      description: "Developed a full-stack e-commerce platform.",
      highlights: [
        "Implemented secure payment integration.",
        "Designed a responsive user interface.",
        "Optimized performance for high traffic.",
      ],
      url: "https://ecommerceplatform.com",
    },
    {
      name: "Personal Portfolio",
      startDate: "2020-01-01",
      endDate: "2020-06-01",
      description: "Built a personal portfolio to showcase my projects.",
      highlights: [
        "Used React for frontend development.",
        "Deployed on AWS.",
        "Achieved a Lighthouse performance score of 95.",
      ],
      url: "https://johndoe.dev/portfolio",
    },
  ],
} as const;

export const emptyResumeData: ResumeType = {
  templateId: 0,
  basics: {
    id: "",
    name: "",
    label: "",
    email: "",
    phone: "",
    summary: "",
  },
  work: [],
  education: [],
  skills: [],
} as const;

export const sampleResumeDataMin: ResumeType = {
  templateId: 0,
  basics: {
    id: "2",
    name: "John Doe",
    label: "Software Engineer",
    imageName: "https://i.pravatar.cc/150?img=12",
    email: "johndoe@example.com",
    phone: "+1234567890",
    url: "https://johndoe.dev",
    summary:
      "A passionate software engineer with expertise in building scalable applications, cloud computing, and DevOps. I have a proven track record of delivering high-quality software solutions to meet business needs and exceed customer expectations. I am seeking new challenges and opportunities to further develop my skills and contribute to innovative projects.",
    location: {
      address: "123 Main St",
      postalCode: "12345",
      city: "San Francisco",
      countryCode: "US",
      region: "California",
    },
    profiles: [
      {
        network: "LinkedIn",
        username: "johndoe",
        url: "https://linkedin.com/in/johndoe",
      },
    ],
  },
  work: [
    {
      name: "TechCorp",
      position: "Senior Developer",
      url: "https://techcorp.com",
      startDate: "2020-01-01",
      endDate: "2023-01-01",
      summary:
        "Led a team of developers to build innovative software solutions.",
      highlights: [
        "Mentored junior developers.",
        "Reduced system latency by 30%.",
      ],
    },
    {
      name: "Startup Inc.",
      position: "Junior Developer",
      url: "https://startupinc.com",
      startDate: "2015-08-01",
      endDate: "2017-05-31",
      summary: "Worked on the backend systems for the company’s main product.",
      highlights: [
        "Created RESTful APIs.",
        "Collaborated with cross-functional teams.",
      ],
    },
  ],
  education: [
    {
      institution: "University of Technology",
      url: "https://universityoftech.edu",
      area: "Computer Science",
      studyType: "Bachelor's",
      startDate: "2012-09-01",
      endDate: "2016-06-01",
      score: "3.9 GPA",
      courses: ["Data Structures and Algorithms"],
    },
  ],
  awards: [
    {
      title: "Best Developer Award",
      date: "2022-05-15",
      awarder: "TechCorp",
      summary: "Recognized for exceptional contributions to the team.",
    },
    {
      title: "Employee of the Month",
      date: "2021-09-01",
      awarder: "CodeWorks",
      summary: "Awarded for outstanding performance and dedication.",
    },
  ],
  certificates: [
    {
      name: "Certified Kubernetes Administrator",
      date: "2023-02-01",
      issuer: "CNCF",
      url: "https://certificates.cncf.io",
    },
    {
      name: "AWS Certified Solutions Architect",
      date: "2022-07-01",
      issuer: "AWS",
      url: "https://aws.amazon.com/certification",
    },
  ],
  publications: [
    {
      name: "Building Scalable Applications",
      publisher: "TechPress",
      releaseDate: "2021-11-01",
      url: "https://techpress.com/scalable-applications",
      summary: "A comprehensive guide to building scalable software systems.",
    },
    {
      name: "Cloud Computing Essentials",
      publisher: "Cloud Academy",
      releaseDate: "2020-08-01",
      url: "https://cloudacademy.com/cloud-essentials",
      summary: "An introduction to cloud computing technologies.",
    },
  ],
  skills: [
    {
      name: "JavaScript",
      level: "Advanced",
      keywords: ["React", "Node.js", "TypeScript"],
    },
    {
      name: "DevOps",
      level: "Intermediate",
      keywords: ["Docker", "Kubernetes", "CI/CD"],
    },
  ],
  languages: [
    {
      language: "English",
      fluency: "Native",
    },
    {
      language: "French",
      fluency: "Intermediate",
    },
  ],
  interests: [
    {
      name: "Technology",
      keywords: ["Open Source", "Startups", "AI"],
    },
    {
      name: "Travel",
      keywords: ["Adventure", "Cultural Exploration"],
    },
  ],
  references: [
    {
      email: "manager@gmail.com",
      name: "Jane Smith",
      reference:
        "Jane was my manager at TechCorp and can attest to my technical and leadership skills.",
    },
  ],
  projects: [
    {
      name: "E-Commerce Platform",
      startDate: "2021-01-01",
      endDate: "2021-12-31",
      description: "Developed a full-stack e-commerce platform.",
      highlights: [
        "Implemented secure payment integration.",
        "Designed a responsive user interface.",
        "Optimized performance for high traffic.",
      ],
      url: "https://ecommerceplatform.com",
    },
    {
      name: "Personal Portfolio",
      startDate: "2020-01-01",
      endDate: "2020-06-01",
      description: "Built a personal portfolio to showcase my projects.",
      highlights: [
        "Used React for frontend development.",
        "Deployed on AWS.",
        "Achieved a Lighthouse performance score of 95.",
      ],
      url: "https://johndoe.dev/portfolio",
    },
  ],
} as const;

