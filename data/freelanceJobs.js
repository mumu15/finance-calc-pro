const freelanceJobs = [
  {
    "slug": "software-developer",
    "name": "Software Developer",
    "avgRate": 125,
    "medRate": 100,
    "lowRate": 60,
    "highRate": 250,
    "desc": "full-stack, backend, or frontend software engineering"
  },
  {
    "slug": "web-designer",
    "name": "Web Designer",
    "avgRate": 85,
    "medRate": 75,
    "lowRate": 40,
    "highRate": 175,
    "desc": "UI/UX design and website visual design"
  },
  {
    "slug": "graphic-designer",
    "name": "Graphic Designer",
    "avgRate": 65,
    "medRate": 55,
    "lowRate": 30,
    "highRate": 150,
    "desc": "brand identity, print, and digital graphic design"
  },
  {
    "slug": "copywriter",
    "name": "Copywriter",
    "avgRate": 75,
    "medRate": 65,
    "lowRate": 35,
    "highRate": 175,
    "desc": "marketing copy, ads, email, and sales writing"
  },
  {
    "slug": "content-writer",
    "name": "Content Writer",
    "avgRate": 55,
    "medRate": 45,
    "lowRate": 25,
    "highRate": 120,
    "desc": "blog posts, articles, and SEO content creation"
  },
  {
    "slug": "seo-specialist",
    "name": "SEO Specialist",
    "avgRate": 100,
    "medRate": 85,
    "lowRate": 50,
    "highRate": 200,
    "desc": "search engine optimization and organic traffic growth"
  },
  {
    "slug": "digital-marketer",
    "name": "Digital Marketer",
    "avgRate": 90,
    "medRate": 80,
    "lowRate": 45,
    "highRate": 180,
    "desc": "paid ads, social media, and campaign management"
  },
  {
    "slug": "video-editor",
    "name": "Video Editor",
    "avgRate": 75,
    "medRate": 65,
    "lowRate": 35,
    "highRate": 175,
    "desc": "video editing, motion graphics, and post-production"
  },
  {
    "slug": "photographer",
    "name": "Photographer",
    "avgRate": 100,
    "medRate": 85,
    "lowRate": 50,
    "highRate": 250,
    "desc": "commercial, portrait, event, or product photography"
  },
  {
    "slug": "data-analyst",
    "name": "Data Analyst",
    "avgRate": 110,
    "medRate": 95,
    "lowRate": 60,
    "highRate": 200,
    "desc": "business intelligence, data visualization, and analytics"
  },
  {
    "slug": "project-manager",
    "name": "Project Manager",
    "avgRate": 100,
    "medRate": 90,
    "lowRate": 55,
    "highRate": 185,
    "desc": "project coordination, agile, and delivery management"
  },
  {
    "slug": "virtual-assistant",
    "name": "Virtual Assistant",
    "avgRate": 35,
    "medRate": 28,
    "lowRate": 15,
    "highRate": 75,
    "desc": "administrative support, scheduling, and remote assistance"
  },
  {
    "slug": "accountant",
    "name": "Accountant / Bookkeeper",
    "avgRate": 80,
    "medRate": 70,
    "lowRate": 40,
    "highRate": 175,
    "desc": "bookkeeping, tax prep, and financial reporting"
  },
  {
    "slug": "lawyer",
    "name": "Freelance Lawyer",
    "avgRate": 250,
    "medRate": 200,
    "lowRate": 100,
    "highRate": 500,
    "desc": "contract review, legal consulting, and document drafting"
  },
  {
    "slug": "consultant",
    "name": "Business Consultant",
    "avgRate": 150,
    "medRate": 125,
    "lowRate": 75,
    "highRate": 350,
    "desc": "strategy, operations, and management consulting"
  },
  {
    "slug": "translator",
    "name": "Translator / Interpreter",
    "avgRate": 55,
    "medRate": 45,
    "lowRate": 25,
    "highRate": 120,
    "desc": "document translation and live interpretation services"
  },
  {
    "slug": "voice-actor",
    "name": "Voice Actor",
    "avgRate": 100,
    "medRate": 80,
    "lowRate": 40,
    "highRate": 300,
    "desc": "commercial, audiobook, and character voice work"
  },
  {
    "slug": "social-media-manager",
    "name": "Social Media Manager",
    "avgRate": 70,
    "medRate": 60,
    "lowRate": 30,
    "highRate": 150,
    "desc": "content creation and community management for brands"
  },
  {
    "slug": "ux-researcher",
    "name": "UX Researcher",
    "avgRate": 125,
    "medRate": 110,
    "lowRate": 70,
    "highRate": 225,
    "desc": "user research, usability testing, and insights reporting"
  },
  {
    "slug": "ios-developer",
    "name": "iOS Developer",
    "avgRate": 150,
    "medRate": 130,
    "lowRate": 80,
    "highRate": 275,
    "desc": "native iPhone and iPad app development"
  },
  {
    "slug": "android-developer",
    "name": "Android Developer",
    "avgRate": 140,
    "medRate": 120,
    "lowRate": 75,
    "highRate": 250,
    "desc": "native Android app development and Google Play publishing"
  },
  {
    "slug": "devops-engineer",
    "name": "DevOps / Cloud Engineer",
    "avgRate": 150,
    "medRate": 130,
    "lowRate": 85,
    "highRate": 275,
    "desc": "cloud infrastructure, CI/CD, and platform engineering"
  },
  {
    "slug": "cybersecurity",
    "name": "Cybersecurity Consultant",
    "avgRate": 175,
    "medRate": 150,
    "lowRate": 90,
    "highRate": 350,
    "desc": "security audits, penetration testing, and compliance"
  },
  {
    "slug": "machine-learning",
    "name": "ML / AI Engineer",
    "avgRate": 175,
    "medRate": 150,
    "lowRate": 100,
    "highRate": 350,
    "desc": "machine learning models, AI integrations, and data science"
  },
  {
    "slug": "technical-writer",
    "name": "Technical Writer",
    "avgRate": 80,
    "medRate": 70,
    "lowRate": 45,
    "highRate": 160,
    "desc": "software docs, API guides, and user manuals"
  },
  {
    "slug": "product-manager",
    "name": "Product Manager",
    "avgRate": 130,
    "medRate": 115,
    "lowRate": 75,
    "highRate": 250,
    "desc": "product strategy, roadmaps, and stakeholder management"
  },
  {
    "slug": "financial-advisor",
    "name": "Financial Advisor (Hourly)",
    "avgRate": 200,
    "medRate": 175,
    "lowRate": 100,
    "highRate": 400,
    "desc": "independent hourly financial planning and advice"
  },
  {
    "slug": "hr-consultant",
    "name": "HR Consultant",
    "avgRate": 100,
    "medRate": 85,
    "lowRate": 55,
    "highRate": 200,
    "desc": "recruiting, HR strategy, and talent management"
  },
  {
    "slug": "real-estate-agent",
    "name": "Real Estate Agent",
    "avgRate": 80,
    "medRate": 70,
    "lowRate": 40,
    "highRate": 150,
    "desc": "independent real estate transactions and consulting"
  },
  {
    "slug": "fitness-trainer",
    "name": "Personal Fitness Trainer",
    "avgRate": 60,
    "medRate": 50,
    "lowRate": 30,
    "highRate": 150,
    "desc": "one-on-one training and online coaching programs"
  },
  {
    "slug": "life-coach",
    "name": "Life Coach",
    "avgRate": 100,
    "medRate": 85,
    "lowRate": 50,
    "highRate": 250,
    "desc": "personal development coaching and executive coaching"
  },
  {
    "slug": "nutritionist",
    "name": "Nutritionist / Dietitian",
    "avgRate": 80,
    "medRate": 70,
    "lowRate": 40,
    "highRate": 175,
    "desc": "nutrition planning and dietary consulting"
  },
  {
    "slug": "therapist",
    "name": "Therapist (Private Practice)",
    "avgRate": 150,
    "medRate": 130,
    "lowRate": 75,
    "highRate": 350,
    "desc": "mental health therapy and counseling sessions"
  },
  {
    "slug": "tutor",
    "name": "Academic Tutor",
    "avgRate": 60,
    "medRate": 50,
    "lowRate": 25,
    "highRate": 150,
    "desc": "K-12 and college tutoring and test prep coaching"
  },
  {
    "slug": "musician",
    "name": "Session Musician",
    "avgRate": 75,
    "medRate": 60,
    "lowRate": 30,
    "highRate": 200,
    "desc": "studio sessions, live performance, and music production"
  },
  {
    "slug": "illustrator",
    "name": "Illustrator",
    "avgRate": 75,
    "medRate": 65,
    "lowRate": 35,
    "highRate": 175,
    "desc": "editorial, book, and commercial illustration"
  },
  {
    "slug": "3d-artist",
    "name": "3D Artist / Animator",
    "avgRate": 100,
    "medRate": 85,
    "lowRate": 50,
    "highRate": 225,
    "desc": "3D modeling, animation, and visual effects"
  },
  {
    "slug": "architect",
    "name": "Architect (Freelance)",
    "avgRate": 150,
    "medRate": 125,
    "lowRate": 75,
    "highRate": 300,
    "desc": "residential design consulting and architectural drawings"
  },
  {
    "slug": "interior-designer",
    "name": "Interior Designer",
    "avgRate": 100,
    "medRate": 85,
    "lowRate": 50,
    "highRate": 225,
    "desc": "space planning, material selection, and decor consulting"
  },
  {
    "slug": "editor",
    "name": "Book / Manuscript Editor",
    "avgRate": 65,
    "medRate": 55,
    "lowRate": 30,
    "highRate": 150,
    "desc": "developmental editing, copyediting, and proofreading"
  },
  {
    "slug": "public-relations",
    "name": "PR Consultant",
    "avgRate": 125,
    "medRate": 105,
    "lowRate": 65,
    "highRate": 250,
    "desc": "media relations, press releases, and brand communications"
  },
  {
    "slug": "event-planner",
    "name": "Event Planner",
    "avgRate": 70,
    "medRate": 60,
    "lowRate": 35,
    "highRate": 175,
    "desc": "corporate events, weddings, and conference planning"
  },
  {
    "slug": "drone-operator",
    "name": "Drone Operator",
    "avgRate": 100,
    "medRate": 85,
    "lowRate": 50,
    "highRate": 250,
    "desc": "aerial photography, videography, and inspection services"
  },
  {
    "slug": "resume-writer",
    "name": "Resume Writer",
    "avgRate": 100,
    "medRate": 85,
    "lowRate": 50,
    "highRate": 250,
    "desc": "professional resume writing, LinkedIn optimization, and cover letters"
  },
  {
    "slug": "podcast-producer",
    "name": "Podcast Producer",
    "avgRate": 75,
    "medRate": 65,
    "lowRate": 35,
    "highRate": 175,
    "desc": "audio editing, show notes, and podcast launch strategy"
  },
  {
    "slug": "shopify-developer",
    "name": "Shopify Developer",
    "avgRate": 110,
    "medRate": 95,
    "lowRate": 55,
    "highRate": 225,
    "desc": "e-commerce store setup, themes, and Shopify apps"
  },
  {
    "slug": "wordpress-developer",
    "name": "WordPress Developer",
    "avgRate": 85,
    "medRate": 75,
    "lowRate": 40,
    "highRate": 175,
    "desc": "WordPress site building, plugins, and customization"
  },
  {
    "slug": "email-marketer",
    "name": "Email Marketing Specialist",
    "avgRate": 85,
    "medRate": 75,
    "lowRate": 45,
    "highRate": 175,
    "desc": "email campaigns, automation flows, and list management"
  },
  {
    "slug": "chatgpt-consultant",
    "name": "AI / ChatGPT Consultant",
    "avgRate": 125,
    "medRate": 100,
    "lowRate": 60,
    "highRate": 300,
    "desc": "AI tool integration, prompt engineering, and automation"
  },
  {
    "slug": "grants-writer",
    "name": "Grant Writer",
    "avgRate": 75,
    "medRate": 65,
    "lowRate": 40,
    "highRate": 175,
    "desc": "nonprofit grant applications and funding proposals"
  }
]
module.exports = freelanceJobs
