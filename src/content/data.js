import { Github, Linkedin } from "lucide-react";

export const ME = {
  name: "Davyd Voloshyn",
  tagline: "Data Analytics & Machine Learning",
  blurb:
    "I'm a senior at UNC–Chapel Hill studying CS & Economics with a Data Science minor. I combine quantitative research with hands-on analytics to turn complex data into actionable insights.",
  email: "dav.volosh@gmail.com",
  location: "Chapel Hill, NC",
  education: {
    school: "University of North Carolina at Chapel Hill",
    degree: "B.S. in Computer Science and Economics",
    minor: "Minor in Data Science",
    period: "Aug 2022 – May 2026",
    gpa: "3.84/4.0",
    honors: ["GF Fund for Excellence in Economics", "Dean's List"],
    credentials: "Quantitative Financial Economics",
    coursework: ["Data Science", "Business Analytics", "Database Management (SQL)", "Modern Software Engineering"]
  },
  socials: [
    { icon: Github, label: "GitHub", href: "https://github.com/dvolosh" },
    { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/davyd-voloshyn/" },
  ],
};

export const EXPERIENCE = [
  {
    org: "UNC Kenan-Flagler Business School",
    logo: "/logos/kenan_flagler.png",
    role: "Research Analyst",
    period: "Jan 2025 – Present",
    startDate: "2025-01",
    endDate: null, // present
    where: "Remote, US",
    color: "#3b82f6",
    bullets: [
      "Developed Apache Spark distributed ETL data pipeline for data engineering large-scale fuzzy matching linkage in Python pandas.",
      "Cleaned, validated and integrated large datasets to support master data management and ensure consistency for data analysis.",
      "Performed exploratory data analysis (EDA), and created data quality metrics for assessing accuracy and entity resolution.",
      "Applied econometric time-series analysis for corporate political activity research. Produce documentation in Jupyter Notebooks."
    ],
  },
  {
    org: "LPL Financial",
    role: "Data Analyst Intern",
    period: "Jun 2025 – Aug 2025",
    startDate: "2025-06",
    endDate: "2025-08",
    where: "Fort Mill, SC",
    logo: "/logos/LPL-Logo_White.png",
    color: "#2563eb",
    bullets: [
      "Deployed a Power BI dashboard with KPIs and client segmentation for leadership to prioritize roadmap product features.",
      "Reported and analyzed NPS data in Excel and PowerPoint to identify satisfaction drivers and inform strategic initiatives.",
      "Automated extracting actionable insights with scripts in Python and R to analyze client activity, and AUM growth trends.",
      "Developed an internal Machine Learning Streamlit dashboard for topic modeling and summarization of client feedback."
    ],
  },
  {
    org: "UNC Department of Economics",
    role: "Quantitative Researcher",
    period: "May 2024 – Sep 2024",
    startDate: "2024-05",
    endDate: "2024-09",
    where: "Chapel Hill, NC",
    logo: "/logos/unc_for_econ.png",
    color: "#1d4ed8",
    bullets: [
      "Conducted quantitative research on forecasting market volatility using high-frequency data and large-scale textual data analytics.",
      "Built a web-crawler for data mining over 500,000 headlines and 50,000 full-text articles from major media for AI textual analytics.",
      "Doubled volatility accuracy relative to VIX and NSI with NLP nowcasting of macroeconomic indicators and LLMs using Python."
    ],
  },
  // CV-only entries — visible in Timeline view, hidden in Resume view
  {
    org: "Carolina Investment Group",
    role: "Quantitative Analyst",
    period: "Jan 2024 – Jan 2025",
    startDate: "2024-01",
    endDate: "2025-01",
    where: "Chapel Hill, NC",
    logo: "/logos/carolina_investment_group.jpg",
    color: "#6366f1",
    cvOnly: true,
    bullets: [
      "Modeled long–short and sector-constrained portfolios in Python, integrating API price data to support portfolio management.",
      "Applied mean-variance optimization, VaR analysis, factor models. Performed portfolio analytics and reporting."
    ],
  },
  {
    org: "UNC AI",
    role: "Inferential Thinking — R&D",
    period: "Oct 2023 – May 2024",
    startDate: "2023-10",
    endDate: "2024-05",
    where: "Chapel Hill, NC",
    logo: "/logos/ai_unc_logo.png",
    color: "#8b5cf6",
    cvOnly: true,
    link: "https://www.ai-unc.com/",
    bullets: [
      "Structured model outputs with Pydantic and JSON schemas for data validation.",
      "Built a data parser and utilized prompt engineering to optimize GenAI response quality."
    ],
  },
];

export const LEADERSHIP = [
  {
    org: "HackNC",
    role: "Director Of Finance",
    period: "Oct 2023 – Aug 2025",
    startDate: "2023-10",
    endDate: "2025-08",
    where: "Chapel Hill, NC",
    logo: "/logos/unc_logo.png",
    color: "#06b6d4",
    bullets: [
      "Increased revenue by 30% and reduced outreach time by 60% with GSuite campaign automation and project management in Excel.",
      "Budgeted a $40,000 event with 500+ participants. Managed a committee of 5 people to raise capital for the event."
    ],
  },
  {
    org: "UNC Department of Computer Science",
    role: "Teaching Assistant – Data Structures & Algorithms",
    period: "Jan 2024 – Dec 2024",
    startDate: "2024-01",
    endDate: "2024-12",
    where: "Chapel Hill, NC",
    logo: "/logos/unc_comp.png",
    color: "#0891b2",
    bullets: [
      "Communicated data structures and algorithmic analysis concepts to 400+ students. Debugged Java implementations.",
      "Led review sessions and office hours, presenting material clearly to audiences with diverse technical backgrounds."
    ],
  },
  // CV-only entry — visible in Timeline view, hidden in Resume view
  {
    org: "UNC ITS Service Desk",
    role: "IT Student Lead",
    period: "May 2023 – Jan 2024",
    startDate: "2023-05",
    endDate: "2024-01",
    where: "Chapel Hill, NC",
    logo: "/logos/unc_logo.png",
    color: "#14b8a6",
    cvOnly: true,
    bullets: [
      "Resolved over 1000 tickets in ServiceNow. IT problem-solving and troubleshooting software and hardware issues.",
      "Face-to-face customer service and problem-solving. Troubleshooting software and hardware issues."
    ],
  },
];

export const PROJECTS = [
  {
    title: "Vant",
    subtitle: "Real-Time Housing Market & Social Sentiment Dashboard",
    period: "Feb 2026",
    category: "Full-Stack & Data Engineering",
    blurb:
      "Deployed a full-stack Next.js app, integrating a Plotly Dash dashboard to visualize real-time macroeconomic and behavior data. Automated data ingestion from Zillow, FRED, and Reddit using GCP Cloud Functions into a BigQuery data warehouse for analytics. Developed a Vertex AI sentiment engine to quantify buyer friction points from Reddit and correlate trends with macroeconomics.",
    link: "https://housing-dashboard-gold.vercel.app/",
    github: "https://github.com/dvolosh/housing_dashboard",
    tags: ["Next.js", "GCP", "BigQuery", "Vertex AI", "Plotly Dash"],
    featured: true
  },
  {
    title: "Airbnb Daily Price Prediction",
    period: "Feb 2024",
    category: "Machine Learning",
    blurb:
      "Optimized XGBoost regression and TensorFlow neural network to predict listing prices using numeric and textual features. Engineered features from property descriptions, used KNN clustering algorithm, and created interactive data visualizations.",
    link: "https://github.com/dvolosh/airbnb",
    tags: ["XGBoost", "TensorFlow", "NLP", "KNN"],
  },
  {
    title: "Portfolio Optimization",
    category: "Financial Engineering",
    blurb:
      "Backtested market-neutral portfolio allocation with Monte Carlo simulation. Simulated sector-constrained mean-variance optimization using CAPM.",
    link: "https://github.com/dvolosh/portfolio_optimization",
    tags: ["Monte Carlo", "CAPM", "Portfolio Theory"],
  },
  {
    title: "Spotify SVR Regression",
    category: "Machine Learning",
    blurb:
      "Developed a Support Vector Regression model to predict Spotify song popularity. Analyzed and visualized different trends across regions and time.",
    link: "https://github.com/dvolosh/spotify",
    tags: ["SVR", "Data Visualization"],
  },
];

export const RESEARCH = [
  {
    title: "Forecasting Market Volatility with Macroeconomic Expectations",
    blurb:
      "Funded by The Guest Family Fund for Excellence in Economics. Conducted quantitative research focused on forecasting S&P 500 5-minute intraday realized variance using real-time textual sentiment indicators. Various macroeconomic sentiment indicators were constructed using FiGAS NLP pipeline with a fine-grained sentiment analysis apporoach, and FinBERT for analyzing daily news haedlines. Model performance was benchamrked against similar or common indicators like VIX and NSI.",
    link: "https://econ.unc.edu/wp-content/uploads/sites/1423/2025/03/Voloshyn-summer_econ_research_paper.pdf",
    tags: ["Quantitative Research", "NLP", "Financial Markets"],
    featured: true,
  },
  {
    title: "Bipartisanship and Productivity",
    blurb:
      "Research Analyst under Prof. Gallemore. The project maps the spread of political affiliations across companies to measure internal partisan alignment and examine whether politically aligned workforces perform better and achieve stronger firm outcomes.",
    tags: ["Corporate Politics", "Econometrics", "Data Engineering"],
  },
];
