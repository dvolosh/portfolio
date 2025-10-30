import { Github, Linkedin } from "lucide-react";

export const ME = {
  name: "Davyd Voloshyn",
  tagline: "Data Analytics & Machine Learning",
  blurb:
    "I’m a senior at UNC–Chapel Hill studying CS & Economics. I blend research rigor with product sense to turn big questions into data-driven outcomes, and I'm eager to apply my skills for advanced analysis and storytelling.",
  email: "dav.volosh@gmail.com",
  location: "Chapel Hill, NC",
  socials: [
    { icon: Github, label: "GitHub", href: "https://github.com/dvolosh" },
    { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/davyd-voloshyn/" },
  ],
};

export const EXPERIENCE = [
  {
    org: "UNC Kenan-Flagler Business School",
    logo: "/logos/kenan_flagler.png",
    role: "Research Assistant",
    period: "Jan 2025 – Present",
    where: "Remote, US",
    bullets: [
      "Developed a multiprocessing parallel computing ETL pipeline for large-scale 200 GB+ record linkage and NLP entity resolution.",
      "Perform exploratory data analysis (EDA), tokenization, data preprocessing and integrate multiple data sources in Python pandas",
      "Conduct time-series analysis and political leaning data modeling, producing documentation in Jupyter Notebooks and Markdown."
    ],
  },
  {
    org: "LPL Financial",
    role: "Data Analytics Intern",
    period: "Jun 2025 – Aug 2025",
    where: "Fort Mill, SC",
    logo: "/logos/LPL-Logo_White.png",
    bullets: [
      "Reported NPS and survey data analysis to identify improvement areas, satisfaction drivers, and inform strategic initiatives.",
      "Developed Streamlit and Power BI dashboards with KPIs and client segmentation for executives to prioritize product features.",
      "Implemented and visualized topic modeling and summarization methods to turn textual data into actionable business insights.",
    ],
  },
  {
    org: "IBM",
    role: "Client Engineering & Technical Sales",
    period: "Jun 2024 – Jul 2024",
    where: "Remote, US",
    logo: "/logos/ibm.png",
    bullets: [
      "Tailored a customer-focused virtual assistant suited for NLP tasks like summarization, sentiment analysis, and entity retrieval.",
      "Presented demos and MVPs of scalable LLM and AI solutions to stakeholders, emphasizing business impact and innovation.",
    ],
  },
  {
    org: "UNC Department of Economics",
    role: "Undergraduate Researcher",
    period: "May 2024 – Sep 2024",
    where: "Chapel Hill, NC",
    logo: "/logos/unc_for_econ.png",
    bullets: [
      "Conducted quantitative research on forecasting market volatility using high-frequency data and large-scale textual data analytics.",
      "Improved base model accuracy by 25% with NLP by deriving various macro indicators and FinBERT LLM to quantify sentiment.",
      "Built a web-crawler for data mining over 500,000 headlines and 50,000 full-text articles from WSJ, The Economist and others.",
    ],
  },
  {
    org: "UNC Department of Computer Science",
    role: "Data Structures and Analysis TA",
    period: "Jan 2024 – Dec 2024",
    where: "Chapel Hill, NC",
    logo: "/logos/unc_comp.png",
    bullets: [
      "Communicated challenging data structures and analysis concepts to 400+ students. Debugged errors in students' code.",
      "Conducted office hours and led review session presentations to improve student understanding and assisted in grading.",
    ],
  },
];

export const RESEARCH = [
  {
    title:
      "Forecasting Market Volatility with Macroeconomic Expectations from News-Based Textual Data",
    blurb:
      "Awarded The Guest Family Fund for Excellence in Economics. Conducted academic research focused on forecasting S&P 500 5-minute intraday realized variance using various real-time macroeconomic indicators scraped from media.",
    link: "https://econ.unc.edu/wp-content/uploads/sites/1423/2025/03/Voloshyn-summer_econ_research_paper.pdf",
    tags: ["Quantitative Research", "NLP", "LLM"],
  },
  {
    title: "Bipartisanship and Productivity",
    blurb:
      "Work as a Research Assistant under Prof. Gallemore. The project maps the spread of political affiliations across companies to measure internal partisan alignment. It examines whether politically aligned workforces perform better, foster greater collaboration, and achieve stronger firm outcomes.",
    tags: ["Working paper", "Political Science", "Accounting"],
  },
];

export const PROJECTS = [
  {
    title: "Airbnb Daily Price Prediction",
    blurb:
      "Fine-tuned XGBoost regression and a TensorFlow neural network to predict daily listing prices using tabular and textual features. Engineered features from property descriptions using NLTK and built interactive geospatial visualization",
    link: "https://github.com/dvolosh/airbnb",
  },
  {
    title: "Portfolio Optimization",
    blurb:
      "Backtested market-neutral portfolio allocation with Monte Carlo simulation. Simulated sector-constrained mean-variance optimization using CAPM",
    link: "https://github.com/dvolosh/portfolio_optimization",
  },
  {
    title: "Spotify SVR Regression",
    blurb:
      "Developed a Support Vector Regression model to predict Spotify song popularity. Analyzed and visualized different trends across regions and time.",
    link: "https://github.com/dvolosh/spotify",
  },
];
