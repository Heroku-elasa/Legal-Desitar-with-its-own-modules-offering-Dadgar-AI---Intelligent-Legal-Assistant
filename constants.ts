export interface ReportTypeOption {
  value: string;
  label: string;
}

export const REPORT_TYPES: ReportTypeOption[] = [
  { value: 'petition', label: 'دادخواست' },
  { value: 'complaint', label: 'شکواییه' },
  { value: 'contract', label: 'قرارداد' },
  { value: 'legal_letter', label: 'اظهارنامه' },
  { value: 'defense_brief', label: 'لایحه دفاعیه' },
  { value: 'legal_research', label: 'تحقیق حقوقی' },
];

// --- TRANSLATIONS ---

export const en = {
    langCode: 'en',
    header: {
        home: 'Home',
        aiAssistant: 'AI Drafter',
        lawyerFinder: 'Lawyer Directory',
        notaryFinder: 'Notary Finder',
        newsSummarizer: 'News Summary',
        caseStrategist: 'Project Planner',
        webAnalyzer: 'Web Analyzer',
        services: 'Services',
        about: 'About Us',
        contact: 'Contact Us',
        createCheckpoint: 'Create Checkpoint',
        createCheckpointTitle: 'Save current state',
        checkpoints: 'Checkpoints',
        projectHistory: 'Project History',
        restore: 'Restore',
        delete: 'Delete',
        noCheckpoints: 'No checkpoints created yet.'
    },
    hero: {
        title: "Your Intelligent<br/>Legal <span class='text-blue-300'>Assistant</span>",
        subtitle: "Drafting legal documents, analyzing cases, and finding specialized lawyers with semantic search.",
        button1: "Start with Assistant",
        button2: "Search for a Lawyer",
    },
    home: {
        servicesTitle: "Our Capabilities",
        services: [
            {
                title: "Drafting Legal Documents",
                text: "Quickly generate professional drafts for petitions, contracts, complaints, and legal letters."
            },
            {
                title: "Case Analysis & Summary",
                text: "Upload your case files and get a structured summary, identifying key points and arguments."
            },
            {
                title: "Smart Legal Research",
                text: "Ask complex legal questions and receive answers supported by relevant laws and regulations."
            },
            {
                title: "Find a Specialist Lawyer",
                text: "Describe your legal issue to get a curated list of specialized lawyers in your area."
            }
        ],
        whyUsTitle: "Why Dadgar AI?",
        whyUsItems: [
             {
                title: "Speed and Efficiency",
                text: "Reduce hours of drafting and research to minutes. Focus on strategy, not paperwork."
            },
            {
                title: "Confidentiality",
                text: "Your data is processed with privacy in mind. We do not store your case details."
            },
            {
                title: "Accuracy and Precision",
                text: "Leveraging advanced AI trained on legal texts to ensure high-quality, relevant outputs."
            }
        ]
    },
    footer: {
        description: "Dadgar AI is an intelligent legal assistant designed to enhance the efficiency of lawyers and provide accessible legal information. Our goal is to simplify complex legal processes through technology.",
        contactTitle: "Contact Us",
        email: "info@dadgar-ai.com",
        addressTitle: "Address",
        address: "Tehran, Iran",
        quickLinksTitle: "Quick Access",
        quickLinks: [
            { text: "Home", link: "#" },
            { text: "AI Assistant", link: "#assistant" },
            { text: "Lawyer Directory", link: "#lawyer-finder" },
            { text: "Privacy Policy", link: "#" },
        ],
        copyright: "Dadgar AI - All rights reserved.",
        madeBy: "Built with React & TypeScript.",
        poweredBy: "Powered by Google Gemini",
        viewOnGitHub: "View Project on GitHub",
    },
    aiHero: {
        title: 'Your AI Legal Co-Pilot',
        subtitle: 'From legal research to drafting winning arguments, let AI accelerate your success.'
    },
    generatorForm: {
        title: 'Generate a New Legal Document',
        docType: 'Document Type',
        topic: 'Subject / Case Title',
        topicPlaceholder: 'e.g., Claim for unpaid dues, Divorce petition',
        description: 'Key Facts & Information',
        descriptionPlaceholder: 'Enter all relevant details, dates, names, and key events for your case...',
        buttonText: 'Generate Document',
        validationError: 'Please fill in both the subject and description fields.',
        useExample: 'Use an example',
    },
    reportTypes: {
        petition: 'Petition',
        complaint: 'Complaint',
        contract: 'Contract',
        legal_letter: 'Legal Letter',
        defense_brief: 'Defense Brief',
        legal_research: 'Legal Research',
    },
    reportExamples: {
        petition: {
            topic: 'Claim for Unpaid Check',
            description: 'I received a check (No. 12345, dated 2024/04/04) from Mr. [Debtor\'s Name] for the amount of 50,000,000 IRR. The check bounced due to insufficient funds. A certificate of non-payment has been obtained from [Bank Name], [Branch Name]. Despite repeated requests, he has refused to pay.'
        },
        complaint: {
            topic: 'Fraud and Sale of Another\'s Property',
            description: 'Mr. [Accused\'s Name] sold me an apartment at [Property Address], which belonged to someone else, using forged documents. I paid 200,000,000 Toman as a down payment. Upon visiting the property, I discovered the real owner is someone else, and the accused has absconded.'
        },
        contract: {
            topic: 'Residential Lease Agreement',
            description: 'This is a one-year lease agreement for a two-bedroom apartment located at [Apartment Address]. The monthly rent is 10,000,000 IRR, with a security deposit of 50,000,000 IRR. The lease begins on 2024/06/01. Utilities are not included.'
        },
        legal_letter: {
            topic: 'Final Demand for Payment of Debt',
            description: 'This is a final notice regarding the outstanding debt of 25,000,000 IRR based on invoice #INV-2023-08-15. Payment is due within 72 hours of receiving this letter. Failure to pay will result in legal action without further notice.'
        },
        defense_brief: {
            topic: 'Defense Against Breach of Contract Claim',
            description: 'The plaintiff claims a breach of contract regarding the delivery of goods. However, the delay was caused by a force majeure event (unforeseen import restrictions) as stipulated in Article 9 of our contract. We have evidence that we notified the plaintiff of the delay in a timely manner.'
        },
        legal_research: {
            topic: 'Legal Basis for Intellectual Property in Software',
            description: 'What are the primary laws and regulations in Iran that protect the intellectual property rights of software developers? Please include information on copyright, patents, and trade secrets as they apply to software code and applications.'
        }
    },
    reportDisplay: {
        title: 'Generated Document',
        export: 'Export',
        copy: 'Copy Text',
        downloadMD: 'Download (.md)',
        downloadDOCX: 'Download (.docx)',
        downloadHTML: 'Download (.html)',
        printPDF: 'Print / Save as PDF',
        generating: 'Generating...',
        placeholder1: 'Your generated document will appear here.',
        placeholder2: 'Fill out the form and click "Generate".',
        docTitle: 'Generated Document',
        headerTitle: "Dadgar AI Legal Services",
        headerDate: "Date",
        headerCaseNo: "Case No.",
        caseNoPlaceholder: "[Placeholder]",
    },
    lawyerFinder: {
        title: 'AI Lawyer Finder',
        subtitle: 'Describe your legal issue or desired specialty to find relevant lawyers.',
        keywordsLabel: 'Describe Your Legal Need (e.g., "divorce lawyer in Tehran")',
        keywordsPlaceholder: 'e.g., corporate law, criminal defense, family court...',
        maxResults: 'Maximum Results',
        findButton: 'Find Lawyers',
        finding: 'Finding lawyers...',
        validationError: 'Please describe your legal need to start the search.',
        loadingTitle: 'Searching for Lawyers...',
        loadingSubtitle: 'Our AI is scanning the web for the best matches. This may take a moment.',
        resultsTitle: 'Found Lawyers',
        relevance: 'Relevance',
        specialty: 'Specialty',
        contact: 'Contact Info',
        address: 'Address',
        save: 'Save to Contacts',
        saved: 'Saved',
        sortBy: 'Sort by',
        sort: {
            relevance: 'Relevance',
            city: 'City',
            experience_desc: 'Experience (High to Low)',
            city_specialty: 'City, then Specialty'
        },
        savedTitle: 'Saved Lawyers',
        clearAll: 'Clear All',
        remove: 'Remove',
        notesLabel: 'My Notes',
        notesPlaceholder: 'Add your notes and strategy here...',
        parseErrorTitle: 'Could not structure all results',
        parseErrorSubtitle: 'The AI returned some information, but it could not be formatted into a table automatically. The raw text is displayed below.',
        crateTitle: 'Lawyer Directory',
        crateSubtitle: 'All lawyers discovered by the AI are stored here.',
        clearCrate: 'Clear Directory',
        crateEmpty: 'Perform a search to discover lawyers. They will be saved here permanently.',
        semanticSearchBadge: 'Powered by Semantic Search',
        filterByCity: 'Filter by City',
        filterBySpecialty: 'Filter by Specialty',
        filterByExperience: 'Min Years of Experience',
        noFilterResults: 'No lawyers match your current filters.',
        prompt: `You are an expert AI legal assistant specializing in finding lawyers in Iran. Your primary goal is to understand the user's legal situation semantically and find the most suitable lawyers using your Google Search tool.

Instead of simple keyword matching, analyze the user's query: "{queries}" for its underlying legal intent and context. For example, if the user says "my business partner stole from me", you should look for lawyers specializing in corporate disputes, fraud, or commercial litigation.

Find the {maxResults} lawyers whose expertise and experience best match this intent.

Your entire response MUST be a markdown table. Do NOT include any introductory text, summary, or explanations before or after the table.

The table MUST have the following columns precisely:
- Name
- Specialty
- City
- Address
- Contact Info
- Website (A direct markdown link to the lawyer's main page or firm website)
- Years of Experience (A number representing their years of professional experience)
- Relevance Score (a percentage from 0% to 100% indicating how well the lawyer matches the user's *semantic intent*)
`,
        example: {
            keywords: 'I need a lawyer specializing in intellectual property for a software startup in Tehran.'
        }
    },
     notaryFinder: {
        title: 'Notary Public Finder',
        subtitle: 'Describe the service you need and the desired city to find official Notary Public offices.',
        keywordsLabel: 'Describe your need (e.g., "notary for car deed of sale in Isfahan")',
        keywordsPlaceholder: 'e.g., power of attorney, signature certification, real estate deed...',
        findButton: 'Find Notaries',
        finding: 'Finding offices...',
        validationError: 'Please describe your need to start the search.',
        resultsTitle: 'Found Notary Offices',
        office: 'Office Name/Number',
        contact: 'Contact Info',
        address: 'Address',
        services: 'Services',
        sortBy: 'Sort by',
        sort: {
            officeName: 'Office Name',
            city: 'City',
        },
        filterByCity: 'Filter by City',
        filterByOfficeName: 'Filter by Office Name',
        filterByService: 'Filter by Service',
        noFilterResults: 'No offices match your current filters.',
        parseErrorTitle: 'Could not structure all results',
        parseErrorSubtitle: 'The AI returned some information, but it could not be formatted into a table automatically. The raw text is displayed below.',
        prompt: `You are an expert AI assistant specializing in finding Notary Public offices ("محضر اسناد رسمی") in Iran. Analyze the user's query: "{queries}" to identify the required service and location. Find the most relevant notary offices using your Google Search tool.

Your entire response MUST be a markdown table. Do NOT include any introductory text, summary, or explanations before or after the table.

The table MUST have the following columns precisely:
- Office Name
- City
- Address
- Contact Info
- Website (A direct markdown link to the office's website, if available)
- Services Offered (A comma-separated list of common services like 'property deeds', 'power of attorney', 'signature certification')
`,
        example: {
            keywords: 'I need to create a legally binding power of attorney for my elderly father in Shiraz.'
        }
    },
    newsSummarizer: {
        title: 'AI News Briefing',
        subtitle: 'Get a quick summary of the latest news on any topic, with sources.',
        queryLabel: 'What news would you like to summarize?',
        queryPlaceholder: 'e.g., latest technology laws in Iran...',
        buttonText: 'Summarize News',
        summarizing: 'Summarizing...',
        resultsTitle: 'News Summary',
        sourcesTitle: 'Sources',
        noSources: 'No sources were found for this summary.',
        validationError: 'Please enter a topic to summarize.',
        prompt: `As an expert news analyst, provide a concise summary of the latest news regarding "{query}" in Iran. Base your summary solely on the provided search results. The summary should be in English. Structure your response clearly using markdown.`,
        example: {
            query: 'What are the latest developments in Iran\'s automotive industry?'
        }
    },
    webAnalyzer: {
        title: 'AI Web Page Analyzer',
        subtitle: 'Provide a URL and a question to analyze its content.',
        urlLabel: 'Web Page URL to Analyze',
        urlPlaceholder: 'https://example.com/article',
        queryLabel: 'What do you want to know about this page?',
        queryPlaceholder: 'e.g., Summarize the main points, extract all mentioned names, what are the key arguments...',
        buttonText: 'Analyze Page',
        analyzing: 'Analyzing...',
        resultsTitle: 'Analysis Result',
        validationError: 'Please provide both a URL and a question.',
        prompt: `You are an expert web page analyst. Your task is to analyze the content of a specific URL and answer a user's question based *only* on that content. Do not use general knowledge or information from other websites.

The URL to analyze is: {url}

The user's question is: "{query}"

Analyze the content at the given URL and provide a detailed, well-structured answer in markdown format. If the URL is inaccessible or doesn't contain the answer, state that clearly.`,
        example: {
            url: 'https://www.irna.ir/news/85250499/Some-new-achievements-in-nanotechnology-unveiled-in-Iran',
            query: 'Summarize the key nanotechnology achievements mentioned in this article.'
        }
    },
    caseStrategist: {
        title: 'AI Project Planner',
        subtitle: 'Describe your goal and get a step-by-step strategic plan with actionable tasks.',
        goalLabel: 'What is your primary goal or project?',
        goalPlaceholder: 'e.g., Launch a new tech startup, write a research paper on international law, start a legal tech podcast...',
        buttonText: 'Generate Strategy',
        generating: 'Generating Strategy...',
        resultsTitle: 'Your Strategic Plan',
        effort: 'Effort',
        deliverable: 'Deliverable',
        suggestedPrompt: 'Show Suggested Prompt',
        executeTask: 'Create Draft with AI',
        executingTask: 'Preparing Drafter...',
        validationError: 'Please describe your goal to generate a strategy.',
        prompt: `You are an expert project manager and strategist. The user will provide a high-level goal. Your task is to break down this goal into a series of concrete, actionable steps. For the user's goal of "{goal}", generate a strategic plan. Your entire response MUST be a JSON array of objects, conforming to the provided schema. Do not include any introductory text, summary, or explanations before or after the JSON. Each object in the array represents a task and must contain: "taskName": A concise name for the task. "description": A brief explanation of what the task involves. "effortPercentage": An estimated percentage of the total project effort this task will take. "deliverableType": A short, clear name for the output of this task (e.g., "Business Plan", "Market Research Report", "Podcast Script", "Code Prototype"). "suggestedPrompt": A detailed, high-quality prompt that the user could give to another AI to generate the deliverable for this task. This prompt should be specific and incorporate details from the user's original goal.`,
        example: {
            goal: 'Develop a comprehensive legal and business strategy to launch an e-commerce platform that sells handmade Iranian crafts internationally.'
        }
    },
    quotaErrorModal: {
        title: 'API Quota Exceeded',
        body: 'You have used your full API quota for today. To continue, please check your billing settings or wait for your quota to reset.',
        cta: 'Check Billing',
        close: 'Close'
    },
    aiGuide: {
        button: "Let AI Guide You",
        title: "What do you want to accomplish?",
        subtitle: "Describe your goal, and our AI will suggest the best tool for the job.",
        placeholder: "e.g., 'I need to sue someone for not paying me back', 'Find me a corporate lawyer in Shiraz', 'What are the new import regulations?', 'I want to launch a company'...",
        submitButton: "Get Suggestions",
        gettingSuggestions: "Analyzing...",
        resultsTitle: "AI Suggestions",
        confidence: "Confidence",
        goTo: "Go to",
        validationError: "Please describe your goal to get suggestions.",
        prompt: `You are an intelligent router for a legal AI application. Your task is to analyze the user's goal and predict which application module is most suitable. Provide a ranked list of the top 3 most relevant suggestions.

The user's goal is: "{goal}"

Here are the available modules:
- 'legal_drafter': Best for when the user wants to generate a specific legal document like a petition, contract, complaint, or legal letter. The user typically knows what kind of document they need.
- 'lawyer_finder': Use this when the user explicitly asks to find, search for, or get a list of lawyers, often specifying a specialty and/or location.
- 'notary_finder': Use this when the user asks to find a Notary Public office, often for official document certification or deeds.
- 'news_summarizer': Ideal for when the user asks for updates, summaries, or information about recent events, laws, or news topics. It uses Google Search to find current information.
- 'case_strategist': The best choice for broad, high-level goals that require multiple steps, like starting a business, planning a complex legal case, or creating a project. It breaks the goal down into a sequence of tasks.
- 'web_analyzer': Use this when the user provides a specific URL and wants to summarize, analyze, or extract information from that single page.

Your entire response MUST be a JSON array of objects, conforming to the provided schema. Do not include any text before or after the JSON. Each object should represent a suggested module. Order the array from most to least confident.
`,
        example: {
            prompt: 'My small business hasn\'t been paid by a client for a large invoice. What are my options?'
        }
    },
    aiSuggestions: {
        thinking: 'Thinking...',
        noResults: 'No suggestions found.',
    },
    prepareDraftFromTask: {
        prompt: `You are a helpful assistant. A user wants to use our 'Legal Drafter' tool based on a task from a project plan. The task is: Task Name: '{taskName}', Description: '{description}', Suggested AI Prompt: '{suggestedPrompt}'.
Our drafter tool needs a 'docType', a 'topic', and a 'description'. Please analyze the task and determine the best values for these three fields.
The available 'docType' options are: [{docTypeOptions}]. Choose the most relevant one.
The 'topic' should be a concise title for the document.
The 'description' should be a detailed paragraph for the AI drafter, combining the key information from the task description and the suggested prompt.
Your entire response MUST be a JSON object with the keys 'docType', 'topic', and 'description'.`
    },
    promptMap: {
      petition: `You are an experienced Iranian lawyer. Your task is to prepare a complete and professional petition draft based on the information provided by the user.

**Petition Subject (Topic):** {topic}
**Description of the incident and supplementary information (Description):** {description}

**Instructions:**
Prepare the petition draft using Markdown format and adhering to the standard structure below. The tone should be formal, legal, and authoritative.

- **Plaintiff:** [Plaintiff's full name], son of [Father's name], with national ID number [National ID], residing at [Exact address]
- **Defendant:** [Defendant's full name], son of [Father's name], with national ID number [National ID], residing at [Exact address]
- **Lawyer or Legal Representative:** [If any]
- **Statement of Claim and its Value:** {topic} [with precise details and financial value if possible]
- **Evidence and Attachments:**
    - [List of documents such as certified copy of ID, national card, contract, witness testimony, etc.]
- **Body of the Petition:**
    - **Honorable Presiding Judge of the Public Civil Court of [City]**
    - Greetings and respects;
    - It is hereby brought to your attention that I, [Plaintiff's name], on [Date]... [In this section, write a full and accurate account of the events, the relationship between the parties, and the legal basis for the claim based on the information provided in {description}.]
    - [State your legal reasoning by referring to relevant legal articles (if possible).]
    - Therefore, considering the above and based on the attached evidence and documents, I request a ruling as described in the statement of claim.

  With renewed respects
  [Plaintiff's full name]
  [Signature]
  `,
      complaint: `You are a lawyer specializing in criminal matters. Your task is to draft a precise and lawful complaint for submission to the prosecutor's office.

**Charge (Topic):** {topic}
**Complaint Description (Description):** {description}

**Instructions:**
Prepare the complaint draft in Markdown format with the following structure.

- **Complainant:** [Full name], son of [Father's name], with national ID number [National ID], residing at [Exact address]
- **Accused:** [Full name], son of [Father's name], [If known: national ID and exact address]
- **Complainant's Lawyer:** [If any]
- **Subject of Complaint:** {topic}
- **Evidence and Attachments:**
    - [List of documents such as police report, witness testimony, text messages, documents, etc.]
- **Text of Complaint:**
    - **Honorable Public and Revolutionary Prosecutor of [City]**
    - Greetings and respects;
    - I, [Complainant's name], hereby state that on [Date] at [Location of crime], a person named [Accused's name]... [Write a full account of the criminal act based on the information in {description}, including details of time, place, and manner of commission.]
    - [Explain which legal article (if known) the accused's act corresponds to.]
    - Therefore, given the submitted evidence and documents, I request the prosecution and punishment of the said person for the charge of {topic} from your honorable judicial authority.

  With thanks and appreciation
  [Complainant's full name]
  [Signature]
  `,
      contract: `You are a legal consultant specializing in drafting contracts. Prepare a comprehensive contract draft based on the user's request.

**Contract Subject (Topic):** {topic}
**Details and Conditions (Description):** {description}

**Instructions:**
Prepare a complete contract draft in Markdown format. Be sure to include the following standard sections and extract details from {description}.

- **Contract Title:** Contract {topic}
- **Article 1: Parties to the Contract**
    - **First Party (e.g., Seller/Lessor/Employer):** Company/Mr./Ms. ... registration/national ID no. ... at address ...
    - **Second Party (e.g., Buyer/Lessee/Employee):** Company/Mr./Ms. ... registration/national ID no. ... at address ...
- **Article 2: Subject of the Contract**
    - It consists of ... [Detailed description of the subject of the contract based on {topic} and {description}]
- **Article 3: Duration of the Contract**
    - This contract is valid from ... to ... for a period of ...
- **Article 4: Contract Amount and Payment Method**
    - The total contract amount is ... Rials, to be paid as follows: ...
- **Article 5: Obligations of the First Party**
    - [List of obligations of the first party]
- **Article 6: Obligations of the Second Party**
    - [List of obligations of the second party]
- **Article 7: Guarantees (if any)**
- **Article 8: Termination of the Contract**
    - [Specify the conditions for termination]
- **Article 9: Force Majeure**
- **Article 10: Dispute Resolution**
    - All disputes arising from this contract will first be resolved through negotiation, and in case of disagreement, the competent authority shall be the courts of [City] / arbitration.
- **Article 11: Copies of the Contract**
    - This contract is drawn up in 11 articles and two copies of equal validity and has been signed by both parties.

  **Signature of the First Party** | **Signature of the Second Party**
  `,
      legal_letter: `You are a lawyer. Draft a formal and legal notice to be sent to the addressee, based on the user's information.

**Subject of the Notice (Topic):** {topic}
**Request and Description (Description):** {description}

**Instructions:**
Draft a formal notice in Markdown format with the following structure.

- **Declarant's (your client's) Details and Residence:**
    - Name: [Full name]
    - Address: [Exact address]
- **Addressee's Details and Residence:**
    - Name: [Full name]
    - Address: [Exact address]
- **Subject of the Notice:** {topic}
- **Summary of Statements:**
    - **Dear Addressee, Mr./Ms. [Addressee's name]**
    - Greetings,
    - As you are aware, under [basis of the legal relationship, e.g., contract no. ...], you had an obligation to [...].
    - [Write a brief description of the unfulfilled obligations or the current legal situation based on {description}.]
    - Unfortunately, despite repeated follow-ups, no action has been taken by you so far.
- **Summary of Request:**
    - Therefore, you are formally notified to, within [number of days, e.g., 72 hours] from the date of this notice, take action to [write your specific request, e.g., pay the debt/vacate the property/fulfill the obligation].
    - It is obvious that if the contents of this notice are disregarded, I reserve the right to pursue the matter through the competent judicial authorities.

  With respect,
  [Declarant's name]
  `,
      defense_brief: `You are an experienced defense attorney. Draft a reasoned and solid defense brief for submission to the court.

**Case Subject (Topic):** {topic}
**Defense Arguments and Key Points (Description):** {description}

**Instructions:**
Prepare a defense brief in Markdown format with the following structure. The tone should be completely legal, respectful, and well-reasoned.

- **Case File No.:** [File number]
- **Branch:** [Branch number] Court of [Court type] [City]
- **Subject:** Defense brief regarding the case of {topic}
- **Submitted by:** [Client's name], [defendant/accused] in the case
- **Submitted to:** Honorable Presiding Judge of Branch [Branch number] of the [Court type] Court

  **Honorable Presiding Judge,**
  With greetings and respects;
  
  Respectfully, regarding the above-mentioned case file, in defense of my client, [Mr./Ms. ...], the following points are brought to your high attention:

  - **1. Description of the incident from the client's perspective:**
      - [Provide a summary of the events from your client's viewpoint based on {description}.]
  - **2. Substantive Defenses:**
      - **A)** [State your first defense argument. E.g., lack of causation, absence of malice, reliance on documents, etc.]
      - **B)** [State your second defense argument and support it with evidence and documents from the case file.]
      - **C)** [If necessary, cite relevant legal articles and provide your interpretation.]
  - **3. Conclusion and Request:**
      - In view of all the mentioned points and considering [the most important defense argument], and in light of the presumption of innocence, it is evident that the charge against the client is without legal basis.
      - Therefore, from your honorable authority, a worthy verdict of [specific request, e.g., acquittal of the client/dismissal of the plaintiff's claim] is requested.

  With thanks and renewed respect,
  [Lawyer's name]
  Attorney at Law
  `,
      legal_research: `You are a legal researcher. Research the user's legal question and provide a documented answer.

**Legal Question (Topic):** {topic}
**Further Details (Description):** {description}

**Instructions:**
Provide a comprehensive and structured response in Markdown format.

- **Research Topic:** {topic}
- **Summary of the Question:**
    - [Rewrite the user's question clearly.]
- **Legal Answer:**
    - **1. Introduction and Definition of Concepts:**
        - [Define key concepts related to the question.]
    - **2. Review of Relevant Laws and Regulations:**
        - [Refer to the main legal articles (such as the Civil Code, Islamic Penal Code, Commercial Code, etc.) that are relevant to the topic, and cite the text of the article.]
        - **Article ... of Law ...:** "[Text of the article]"
    - **3. Analysis and Conclusion:**
        - [Analyze the user's question based on the mentioned laws. Examine different aspects of the issue and personalize the answer based on the information in {description}.]
    - **4. Judicial Precedent (if possible):**
        - [If there is a relevant advisory opinion or a binding precedent, mention it.]
- **Disclaimer:**
    - Please note that this response is for informational and research purposes only and is by no means a substitute for legal advice from a specialized lawyer. The circumstances of each case are unique and must be reviewed individually.
  `,
    },
};

export const fa = {
    langCode: 'fa',
    header: {
        home: 'صفحه اصلی',
        aiAssistant: 'پیش‌نویس ساز',
        lawyerFinder: 'جستجوی وکیل',
        notaryFinder: 'جستجوی محضر',
        newsSummarizer: 'خلاصه اخبار',
        caseStrategist: 'برنامه‌ریز پروژه',
        webAnalyzer: 'تحلیلگر وب',
        services: 'خدمات',
        about: 'درباره ما',
        contact: 'تماس با ما',
        createCheckpoint: 'ایجاد ایست بازرسی',
        createCheckpointTitle: 'ذخیره وضعیت فعلی',
        checkpoints: 'ایست‌های بازرسی',
        projectHistory: 'تاریخچه پروژه',
        restore: 'بازیابی',
        delete: 'حذف',
        noCheckpoints: 'هنوز ایست بازرسی ایجاد نشده است.'
    },
    hero: {
        title: "دستیار هوشمند<br/>حقوقی <span class='text-blue-300'>شما</span>",
        subtitle: "تنظیم پیش‌نویس‌های حقوقی، تحلیل پرونده و یافتن وکیل متخصص با جستجوی معنایی.",
        button1: "شروع کار با دستیار",
        button2: "جستجوی وکیل",
    },
    home: {
        servicesTitle: "قابلیت‌های ما",
        services: [
            {
                title: "تنظیم اسناد حقوقی",
                text: "به سرعت پیش‌نویس‌های حرفه‌ای برای دادخواست، قرارداد، شکواییه و اظهارنامه ایجاد کنید."
            },
            {
                title: "تحلیل و خلاصه‌سازی پرونده",
                text: "فایل‌های پرونده خود را بارگذاری کنید و خلاصه‌ای ساختاریافته از نکات و استدلال‌های کلیدی دریافت نمایید."
            },
            {
                title: "تحقیقات حقوقی هوشمند",
                text: "سوالات پیچیده حقوقی خود را بپرسید و پاسخ‌هایی مستند به قوانین و مقررات مرتبط دریافت کنید."
            },
            {
                title: "یافتن وکیل متخصص",
                text: "موضوع حقوقی خود را شرح دهید تا لیستی از وکلای متخصص در حوزه مربوطه را دریافت کنید."
            }
        ],
        whyUsTitle: "چرا دادگر AI؟",
        whyUsItems: [
             {
                title: "سرعت و بهره‌وری",
                text: "ساعت‌ها کار تنظیم پیش‌نویس و تحقیق را به چند دقیقه کاهش دهید. روی استراتژی تمرکز کنید، نه کاغذبازی."
            },
            {
                title: "محرمانگی اطلاعات",
                text: "داده‌های شما با رعایت کامل حریم خصوصی پردازش می‌شوند. ما جزئیات پرونده شما را ذخیره نمی‌کنیم."
            },
            {
                title: "دقت و صحت",
                text: "با بهره‌گیری از هوش مصنوعی پیشرفته آموزش‌دیده بر روی متون حقوقی برای تضمین خروجی‌های باکیفیت و مرتبط."
            }
        ]
    },
    footer: {
        description: "دادگر AI یک دستیار حقوقی هوشمند است که برای افزایش بهره‌وری وکلا و ارائه اطلاعات حقوقی قابل دسترس طراحی شده است. هدف ما ساده‌سازی فرآیندهای پیچیده حقوقی از طریق فناوری است.",
        contactTitle: "تماس با ما",
        email: "info@dadgar-ai.com",
        addressTitle: "آدرس",
        address: "تهران، ایران",
        quickLinksTitle: "دسترسی سریع",
        quickLinks: [
            { text: "صفحه اصلی", link: "#" },
            { text: "دستیار هوشمند", link: "#assistant" },
            { text: "جستجوی وکیل", link: "#lawyer-finder" },
            { text: "سیاست حفظ حریم خصوصی", link: "#" },
        ],
        copyright: "دادگر AI - تمام حقوق محفوظ است.",
        madeBy: "ساخته شده با React و TypeScript.",
        poweredBy: "قدرت گرفته از Google Gemini",
        viewOnGitHub: "مشاهده پروژه در گیت‌هاب",
    },
    aiHero: {
        title: 'همکار هوشمند حقوقی شما',
        subtitle: 'از تحقیقات حقوقی تا تنظیم لوایح برنده، اجازه دهید هوش مصنوعی موفقیت شما را تسریع کند.'
    },
    generatorForm: {
        title: 'تنظیم سند حقوقی جدید',
        docType: 'نوع سند',
        topic: 'موضوع / عنوان پرونده',
        topicPlaceholder: 'مثال: مطالبه وجه چک، دادخواست طلاق',
        description: 'شرح ماجرا و اطلاعات کلیدی',
        descriptionPlaceholder: 'تمام جزئیات مرتبط، تاریخ‌ها، اسامی و وقایع کلیدی پرونده خود را وارد کنید...',
        buttonText: 'تنظیم سند',
        validationError: 'لطفاً هر دو فیلد موضوع و شرح ماجرا را پر کنید.',
        useExample: 'استفاده از نمونه',
    },
    reportTypes: {
        petition: 'دادخواست',
        complaint: 'شکواییه',
        contract: 'قرارداد',
        legal_letter: 'اظهارنامه',
        defense_brief: 'لایحه دفاعیه',
        legal_research: 'تحقیق حقوقی',
    },
    reportExamples: {
        petition: {
            topic: 'مطالبه وجه چک بلامحل',
            description: 'اینجانب یک فقره چک به شماره ۱۲۳۴۵ مورخ ۱۴۰۳/۰۱/۱۵ از آقای [نام بدهکار] به مبلغ ۵۰,۰۰۰,۰۰۰ ریال دریافت نمودم. چک مذکور در تاریخ سررسید به دلیل کسر موجودی برگشت خورد. گواهی عدم پرداخت از بانک [نام بانک] شعبه [نام شعبه] دریافت شده است. با وجود مراجعات مکرر، ایشان از پرداخت وجه خودداری می‌کنند.'
        },
        complaint: {
            topic: 'کلاهبرداری و فروش مال غیر',
            description: 'آقای [نام متهم] یک واحد آپارتمان واقع در [آدرس ملک] را که متعلق به شخص دیگری بوده، با ارائه اسناد جعلی به اینجانب فروخته و مبلغ ۲۰۰,۰۰۰,۰۰۰ تومان به عنوان بیعانه دریافت کرده است. پس از مراجعه به ملک، متوجه شدم که مالک واقعی شخص دیگری است و متهم متواری شده است.'
        },
        contract: {
            topic: 'قرارداد اجاره واحد مسکونی',
            description: 'قرارداد اجاره یکساله برای یک واحد آپارتمان دوخوابه به نشانی [آدرس آپارتمان]. مبلغ اجاره ماهیانه ۱۰,۰۰۰,۰۰۰ ریال و مبلغ ودیعه ۵۰,۰۰۰,۰۰۰ ریال می‌باشد. تاریخ شروع قرارداد ۱۴۰۳/۰۴/۰۱ است. هزینه‌های آب، برق و گاز بر عهده مستاجر است.'
        },
        legal_letter: {
            topic: 'اخطار نهایی برای پرداخت بدهی',
            description: 'این یک اخطار نهایی در خصوص بدهی معوقه به مبلغ ۲۵,۰۰۰,۰۰۰ ریال بر اساس فاکتور شماره INV-2023-08-15 است. مهلت پرداخت ظرف ۷۲ ساعت از تاریخ دریافت این اظهارنامه می‌باشد. در صورت عدم پرداخت، اقدام قانونی بدون اخطار بعدی صورت خواهد گرفت.'
        },
        defense_brief: {
            topic: 'دفاع در برابر دعوای نقض قرارداد',
            description: 'خواهان ادعای نقض قرارداد در خصوص تحویل کالا را دارد. اما تاخیر ایجاد شده به دلیل وقوع فورس ماژور (محدودیت‌های پیش‌بینی نشده واردات) بوده که در ماده ۹ قرارداد ما نیز پیش‌بینی شده است. مدارک مبنی بر اطلاع‌رسانی به موقع به خواهان در خصوص تاخیر موجود است.'
        },
        legal_research: {
            topic: 'مبانی حقوقی مالکیت فکری در نرم‌افزار',
            description: 'قوانین و مقررات اصلی در ایران که از حقوق مالکیت فکری توسعه‌دهندگان نرم‌افزار حمایت می‌کنند کدامند؟ لطفاً اطلاعاتی در مورد حق نشر (کپی‌رایت)، ثبت اختراع و اسرار تجاری در مورد کدها و اپلیکیشن‌های نرم‌افزاری ارائه دهید.'
        }
    },
    reportDisplay: {
        title: 'سند تنظیم شده',
        export: 'خروجی',
        copy: 'کپی متن',
        downloadMD: 'دانلود (.md)',
        downloadDOCX: 'دانلود (.docx)',
        downloadHTML: 'دانلود (.html)',
        printPDF: 'چاپ / ذخیره به عنوان PDF',
        generating: 'در حال تنظیم...',
        placeholder1: 'سند تنظیم شده شما در اینجا نمایش داده خواهد شد.',
        placeholder2: 'فرم را پر کرده و روی "تنظیم سند" کلیک کنید.',
        docTitle: 'سند تنظیم شده',
        headerTitle: "خدمات حقوقی دادگر AI",
        headerDate: "تاریخ",
        headerCaseNo: "شماره پرونده",
        caseNoPlaceholder: "[جای خالی]",
    },
    lawyerFinder: {
        title: 'یابنده وکیل با هوش مصنوعی',
        subtitle: 'موضوع حقوقی یا تخصص مورد نظر خود را برای یافتن وکلای مرتبط شرح دهید.',
        keywordsLabel: 'نیاز حقوقی خود را شرح دهید (مثال: "وکیل طلاق در تهران")',
        keywordsPlaceholder: 'مثال: حقوق شرکت‌ها، دفاع کیفری، دادگاه خانواده...',
        maxResults: 'حداکثر نتایج',
        findButton: 'جستجوی وکیل',
        finding: 'در حال یافتن وکلا...',
        validationError: 'لطفاً نیاز حقوقی خود را برای شروع جستجو شرح دهید.',
        loadingTitle: 'در حال جستجوی وکلا...',
        loadingSubtitle: 'هوش مصنوعی ما در حال بررسی وب برای یافتن بهترین گزینه‌ها است. این ممکن است لحظاتی طول بکشد.',
        resultsTitle: 'وکلای یافت شده',
        relevance: 'ارتباط',
        specialty: 'تخصص',
        contact: 'اطلاعات تماس',
        address: 'آدرس',
        save: 'ذخیره در مخاطبین',
        saved: 'ذخیره شد',
        sortBy: 'مرتب‌سازی بر اساس',
        sort: {
            relevance: 'مرتبط بودن',
            city: 'شهر',
            experience_desc: 'سابقه (نزولی)',
            city_specialty: 'شهر، سپس تخصص'
        },
        savedTitle: 'وکلای ذخیره شده',
        clearAll: 'پاک کردن همه',
        remove: 'حذف',
        notesLabel: 'یادداشت‌های من',
        notesPlaceholder: 'یادداشت‌ها و استراتژی خود را اینجا اضافه کنید...',
        parseErrorTitle: 'ساختاربندی همه نتایج ممکن نبود',
        parseErrorSubtitle: 'هوش مصنوعی اطلاعاتی را برگرداند، اما به طور خودکار به جدول تبدیل نشد. متن خام در زیر نمایش داده شده است.',
        crateTitle: 'فهرست وکلا',
        crateSubtitle: 'تمام وکلای کشف شده توسط هوش مصنوعی در اینجا ذخیره می‌شوند.',
        clearCrate: 'پاک کردن فهرست',
        crateEmpty: 'برای کشف وکلا جستجو کنید. نتایج به طور دائم در اینجا ذخیره خواهند شد.',
        semanticSearchBadge: 'قدرت گرفته از جستجوی معنایی',
        filterByCity: 'فیلتر بر اساس شهر',
        filterBySpecialty: 'فیلتر بر اساس تخصص',
        filterByExperience: 'حداقل سابقه کار (سال)',
        noFilterResults: 'وکیلی با فیلترهای فعلی شما مطابقت ندارد.',
        prompt: `شما یک دستیار هوش مصنوعی حقوقی متخصص در یافتن وکلا در ایران هستید. هدف اصلی شما درک معنایی وضعیت حقوقی کاربر و یافتن مناسب‌ترین وکلا با استفاده از ابزار جستجوی گوگل است.

به جای تطبیق کلیدواژه‌های ساده، درخواست کاربر یعنی "{queries}" را برای یافتن نیت و زمینه حقوقی پنهان در آن تحلیل کنید. به عنوان مثال، اگر کاربر بگوید "شریک تجاری‌ام از من دزدی کرده"، شما باید به دنبال وکلای متخصص در اختلافات شرکتی، کلاهبرداری یا دعاوی تجاری بگردید.

{maxResults} وکیل را که تخصص و تجربه آن‌ها بیشترین تطابق را با این نیت دارد، پیدا کنید.

کل پاسخ شما باید یک جدول مارک‌داون باشد. هیچ متن مقدماتی، خلاصه یا توضیحی قبل یا بعد از جدول نیاورید.

جدول باید دقیقاً شامل ستون‌های زیر باشد:
- Name (نام)
- Specialty (تخصص)
- City (شهر)
- Address (آدرس)
- Contact Info (اطلاعات تماس)
- Website (لینک مستقیم مارک‌داون به صفحه اصلی وکیل یا وب‌سایت موسسه)
- Years of Experience (سابقه کار حرفه‌ای به صورت یک عدد)
- Relevance Score (امتیاز ارتباط - درصدی از ۰٪ تا ۱۰۰٪ که میزان تطابق وکیل با *نیت معنایی* کاربر را نشان می‌دهد)
`,
        example: {
            keywords: 'برای یک استارتاپ نرم‌افزاری در تهران به وکیل متخصص در زمینه مالکیت فکری نیاز دارم.'
        }
    },
    notaryFinder: {
        title: 'یابنده محضر اسناد رسمی',
        subtitle: 'نوع کار و شهر مورد نظر خود را برای یافتن دفاتر اسناد رسمی شرح دهید.',
        keywordsLabel: 'نیاز خود را شرح دهید (مثال: "محضر برای تنظیم وکالت فروش خودرو در اصفهان")',
        keywordsPlaceholder: 'مثال: تنظیم سند ملک، گواهی امضا، تعهدنامه...',
        findButton: 'جستجوی محضر',
        finding: 'در حال یافتن دفاتر...',
        validationError: 'لطفاً نیاز خود را برای شروع جستجو شرح دهید.',
        resultsTitle: 'دفاتر اسناد رسمی یافت شده',
        office: 'نام/شماره دفتر',
        contact: 'اطلاعات تماس',
        address: 'آدرس',
        services: 'خدمات',
        sortBy: 'مرتب‌سازی بر اساس',
        sort: {
            officeName: 'نام دفتر',
            city: 'شهر',
        },
        filterByCity: 'فیلتر بر اساس شهر',
        filterByOfficeName: 'فیلتر بر اساس نام دفتر',
        filterByService: 'فیلتر بر اساس خدمات',
        noFilterResults: 'دفتری با فیلترهای فعلی شما مطابقت ندارد.',
        parseErrorTitle: 'ساختاربندی همه نتایج ممکن نبود',
        parseErrorSubtitle: 'هوش مصنوعی اطلاعاتی را برگرداند، اما به طور خودکار به جدول تبدیل نشد. متن خام در زیر نمایش داده شده است.',
        prompt: `شما یک دستیار هوش مصنوعی متخصص در یافتن دفاتر اسناد رسمی (محضر) در ایران هستید. درخواست کاربر یعنی "{queries}" را تحلیل کرده و مناسب‌ترین دفاتر را با استفاده از ابزار جستجوی گوگل پیدا کنید.

کل پاسخ شما باید یک جدول مارک‌داون باشد. هیچ متن مقدماتی، خلاصه یا توضیحی قبل یا بعد از جدول نیاورید.

جدول باید دقیقاً شامل ستون‌های زیر باشد:
- Office Name (نام دفتر / شماره)
- City (شهر)
- Address (آدرس)
- Contact Info (اطلاعات تماس)
- Website (لینک مستقیم مارک‌داون به وب‌سایت در صورت وجود)
- Services Offered (لیستی از خدمات رایج با کاما جدا شده، مانند 'تنظیم سند ملک'، 'وکالتنامه'، 'گواهی امضا')
`,
        example: {
            keywords: 'می‌خواهم یک وکالت‌نامه رسمی برای پدر سالمندم در شیراز تنظیم کنم.'
        }
    },
    newsSummarizer: {
        title: 'خلاصه اخبار هوشمند',
        subtitle: 'خلاصه‌ای سریع از آخرین اخبار در هر موضوعی را به همراه منابع دریافت کنید.',
        queryLabel: 'چه خبری را می‌خواهید خلاصه کنید؟',
        queryPlaceholder: 'مثال: آخرین قوانین مربوط به فناوری در ایران...',
        buttonText: 'خلاصه کن',
        summarizing: 'در حال خلاصه کردن...',
        resultsTitle: 'خلاصه اخبار',
        sourcesTitle: 'منابع',
        noSources: 'منبعی برای این خلاصه یافت نشد.',
        validationError: 'لطفاً موضوعی را برای خلاصه کردن وارد کنید.',
        prompt: `به عنوان یک تحلیلگر خبره اخبار، خلاصه‌ای موجز از آخرین اخبار مربوط به "{query}" در ایران ارائه دهید. خلاصه خود را صرفاً بر اساس نتایج جستجوی ارائه شده استوار کنید. خلاصه باید به زبان فارسی باشد. پاسخ خود را با استفاده از مارک‌داون به وضوح ساختاربندی کنید.`,
        example: {
            query: 'آخرین تحولات در صنعت خودروسازی ایران چیست؟'
        }
    },
     webAnalyzer: {
        title: 'تحلیلگر صفحه وب با هوش مصنوعی',
        subtitle: 'یک URL و یک سوال برای تحلیل محتوای آن ارائه دهید.',
        urlLabel: 'URL صفحه وب برای تحلیل',
        urlPlaceholder: 'https://example.com/article',
        queryLabel: 'چه چیزی می‌خواهید از این صفحه بدانید؟',
        queryPlaceholder: 'مثال: نکات اصلی را خلاصه کن، تمام اسامی ذکر شده را استخراج کن، استدلال‌های کلیدی چیست...',
        buttonText: 'تحلیل صفحه',
        analyzing: 'در حال تحلیل...',
        resultsTitle: 'نتیجه تحلیل',
        validationError: 'لطفاً هم URL و هم سوال را ارائه دهید.',
        prompt: `شما یک تحلیلگر متخصص صفحات وب هستید. وظیفه شما تحلیل محتوای یک URL مشخص و پاسخ به سوال کاربر *صرفاً* بر اساس آن محتوا است. از دانش عمومی یا اطلاعات وب‌سایت‌های دیگر استفاده نکنید.

URL مورد تحلیل: {url}

سوال کاربر: "{query}"

محتوای URL داده شده را تحلیل کرده و پاسخی دقیق و ساختاریافته در قالب مارک‌داون ارائه دهید. اگر URL قابل دسترس نیست یا حاوی پاسخ سوال نیست، این موضوع را به وضوح بیان کنید.`,
        example: {
            url: 'https://www.irna.ir/news/85424576/۱۰-طرح-کلان-ملی-در-حوزه-صنعت-برق-و-انرژی-به-بهره-برداری-رسید',
            query: 'طرح‌های کلان ملی در حوزه برق که در این مقاله به آن‌ها اشاره شده را خلاصه کن.'
        }
    },
     caseStrategist: {
        title: 'برنامه‌ریز پروژه با هوش مصنوعی',
        subtitle: 'هدف خود را شرح دهید و یک برنامه استراتژیک گام به گام با وظایف عملی دریافت کنید.',
        goalLabel: 'هدف اصلی یا پروژه شما چیست؟',
        goalPlaceholder: 'مثال: راه‌اندازی یک استارتاپ فناوری جدید، نوشتن یک مقاله تحقیقی در مورد حقوق بین‌الملل، شروع یک پادکست حقوقی...',
        buttonText: 'ایجاد استراتژی',
        generating: 'در حال ایجاد استراتژی...',
        resultsTitle: 'برنامه استراتژیک شما',
        effort: 'حجم کار',
        deliverable: 'خروجی',
        suggestedPrompt: 'نمایش پرامپت پیشنهادی',
        executeTask: 'ایجاد پیش‌نویس با AI',
        executingTask: 'در حال آماده‌سازی...',
        validationError: 'لطفاً هدف خود را برای ایجاد استراتژی شرح دهید.',
        prompt: `شما یک مدیر پروژه و استراتژیست خبره هستید. کاربر یک هدف سطح بالا ارائه می‌دهد. وظیفه شما این است که این هدف را به مجموعه‌ای از مراحل مشخص و قابل اجرا تقسیم کنید. برای هدف کاربر یعنی "{goal}"، یک برنامه استراتژیک ایجاد کنید. کل پاسخ شما باید یک آرایه JSON از اشیاء باشد که با اسکیمای ارائه شده مطابقت دارد. هیچ متن مقدماتی، خلاصه یا توضیحی قبل یا بعد از JSON نیاورید. هر شیء در آرایه نشان‌دهنده یک وظیفه است و باید شامل موارد زیر باشد: "taskName": نامی مختصر برای وظیفه. "description": توضیحی کوتاه در مورد آنچه وظیفه شامل می‌شود. "effortPercentage": درصدی تخمینی از کل تلاش پروژه که این وظیفه به خود اختصاص می‌دهد. "deliverableType": نامی کوتاه و واضح برای خروجی این وظیفه (مثلاً «طرح تجاری»، «گزارش تحقیقات بازار»، «اسکریپت پادکست»، «نمونه اولیه کد»). "suggestedPrompt": یک پرامپت دقیق و با کیفیت بالا که کاربر می‌تواند به یک هوش مصنوعی دیگر برای تولید خروجی این وظیفه بدهد. این پرامپت باید مشخص و شامل جزئیات از هدف اصلی کاربر باشد.`,
        example: {
            goal: 'یک استراتژی جامع حقوقی و تجاری برای راه‌اندازی یک پلتفرم تجارت الکترونیک که صنایع دستی ایرانی را به صورت بین‌المللی می‌فروشد، تدوین کن.'
        }
    },
    quotaErrorModal: {
        title: 'سهمیه API تمام شده است',
        body: 'شما از سهمیه کامل API خود برای امروز استفاده کرده‌اید. برای ادامه، لطفاً تنظیمات صورتحساب خود را بررسی کنید یا منتظر بمانید تا سهمیه شما بازنشانی شود.',
        cta: 'بررسی صورتحساب',
        close: 'بستن'
    },
    aiGuide: {
        button: " اجازه بده هوش مصنوعی راهنماییت کنه",
        title: "قصد انجام چه کاری را دارید؟",
        subtitle: "هدف خود را شرح دهید، و هوش مصنوعی ما بهترین ابزار را برای کار شما پیشنهاد می‌دهد.",
        placeholder: "مثال: 'می‌خواهم از کسی که پولم را پس نمی‌دهد شکایت کنم'، 'یک وکیل شرکتی در شیراز پیدا کن'، 'مقررات جدید واردات چیست؟'، 'می‌خواهم یک شرکت تاسیس کنم'...",
        submitButton: "دریافت پیشنهادات",
        gettingSuggestions: "در حال تحلیل...",
        resultsTitle: "پیشنهادات هوش مصنوعی",
        confidence: "درصد اطمینان",
        goTo: "رفتن به",
        validationError: "لطفا هدف خود را برای دریافت پیشنهاد شرح دهید.",
        prompt: `شما یک مسیریاب هوشمند برای یک اپلیکیشن حقوقی مبتنی بر هوش مصنوعی هستید. وظیفه شما تحلیل هدف کاربر و پیش‌بینی مناسب‌ترین ماژول اپلیکیشن است. یک لیست مرتب شده از ۳ پیشنهاد مرتبط ارائه دهید.

هدف کاربر این است: "{goal}"

ماژول‌های موجود به شرح زیر است:
- 'legal_drafter': بهترین گزینه برای زمانی که کاربر قصد تولید یک سند حقوقی مشخص مانند دادخواست، قرارداد، شکواییه یا اظهارنامه را دارد. کاربر معمولا نوع سندی که نیاز دارد را می‌داند.
- 'lawyer_finder': زمانی استفاده شود که کاربر به صراحت درخواست یافتن، جستجو یا لیستی از وکلا را دارد، و اغلب تخصص و/یا مکان را مشخص می‌کند.
- 'notary_finder': زمانی استفاده شود که کاربر درخواست یافتن یک دفتر اسناد رسمی (محضر) را دارد، اغلب برای کارهایی مانند گواهی امضا، تنظیم سند یا وکالتنامه.
- 'news_summarizer': ایده‌آل برای زمانی که کاربر درخواست بروزرسانی، خلاصه یا اطلاعاتی در مورد رویدادها، قوانین یا موضوعات خبری اخیر را دارد. این ماژول از جستجوی گوگل برای یافتن اطلاعات جاری استفاده می‌کند.
- 'case_strategist': بهترین انتخاب برای اهداف کلی و سطح بالا که نیازمند چندین مرحله هستند، مانند راه‌اندازی یک کسب و کار، برنامه‌ریزی یک پرونده حقوقی پیچیده، یا ایجاد یک پروژه. این ماژول هدف را به دنباله‌ای از وظایf تقسیم می‌کند.
- 'web_analyzer': زمانی استفاده شود که کاربر یک URL مشخص ارائه می‌دهد و قصد خلاصه کردن، تحلیل یا استخراج اطلاعات از آن صفحه خاص را دارد.

کل پاسخ شما باید یک آرایه JSON از اشیاء باشد که با اسکیمای ارائه شده مطابقت دارد. هیچ متنی قبل یا بعد از JSON نیاورید. هر شیء باید نشان‌دهنده یک ماژول پیشنهادی باشد. آرایه را از بیشترین به کمترین اطمینان مرتب کنید.
`,
        example: {
            prompt: 'یک مشتری فاکتور بزرگی را به کسب و کار کوچک من پرداخت نکرده است. چه گزینه‌هایی دارم؟'
        }
    },
    aiSuggestions: {
        thinking: 'در حال دریافت پیشنهادات...',
        noResults: 'پیشنهادی یافت نشد.',
    },
    prepareDraftFromTask: {
        prompt: `شما یک دستیار هوشمند هستید. کاربر می‌خواهد بر اساس یک وظیفه از برنامه پروژه، از ابزار «پیش‌نویس ساز حقوقی» ما استفاده کند. وظیفه به این شرح است: نام وظیفه: '{taskName}'، توضیحات: '{description}'، پرامپت پیشنهادی به AI: '{suggestedPrompt}'.
ابزار پیش‌نویس ساز ما به سه فیلد نیاز دارد: 'docType'، 'topic' و 'description'. لطفاً وظیفه را تحلیل کرده و بهترین مقادیر را برای این سه فیلد تعیین کنید.
گزینه‌های 'docType' موجود عبارتند از: [{docTypeOptions}]. مرتبط‌ترین گزینه را انتخاب کنید.
'topic' باید یک عنوان مختصر برای سند باشد.
'description' باید یک پاراگراف با جزئیات برای پیش‌نویس ساز باشد که اطلاعات کلیدی از توضیحات وظیفه و پرامپت پیشنهادی را ترکیب می‌کند.
کل پاسخ شما باید یک شیء JSON با کلیدهای 'docType'، 'topic' و 'description' باشد.`
    },
    promptMap: {
      petition: `شما یک وکیل مجرب ایرانی هستید. وظیفه شما تنظیم یک پیش‌نویس دادخواست کامل و حرفه‌ای بر اساس اطلاعات ارائه شده توسط کاربر است.

**موضوع دادخواست (Topic):** {topic}
**شرح ماجرا و اطلاعات تکمیلی (Description):** {description}

**دستورالعمل‌ها:**
پیش‌نویس دادخواست را با استفاده از فرمت مارک‌داون و با رعایت ساختار استاندارد زیر تنظیم کنید. لحن باید رسمی، حقوقی و متقن باشد.

- **خواهان:** [نام و نام خانوادگی خواهان]، فرزند [نام پدر]، به شماره ملی [شماره ملی]، ساکن [آدرس دقیق]
- **خوانده:** [نام و نام خانوادگی خوانده]، فرزند [نام پدر]، به شماره ملی [شماره ملی]، ساکن [آدرس دقیق]
- **وکیل یا نماینده قانونی:** [در صورت وجود]
- **تعیین خواسته و بهای آن:** {topic} [با ذکر دقیق جزئیات و ارزش مالی در صورت امکان]
- **دلایل و منضمات:**
    - [لیست مستندات مانند کپی مصدق شناسنامه، کارت ملی، قرارداد، شهادت شهود و ...]
- **شرح دادخواست:**
    - **ریاست محترم دادگاه عمومی حقوقی [شهرستان]**
    - با سلام و احترام؛
    - به استحضار می‌رساند اینجانب [نام خواهان] در تاریخ [تاریخ]... [در این بخش، شرح کامل و دقیقی از وقایع، روابط طرفین، و مبنای حقوقی خواسته بر اساس اطلاعات ارائه شده در {description} را بنویسید.]
    - [استدلال حقوقی خود را با اشاره به مواد قانونی مرتبط (در صورت امکان) بیان کنید.]
    - لذا با عنایت به مراتب فوق و با استناد به دلایل و مدارک پیوست، صدور حکم به شرح ستون خواسته، مورد استدعاست.

  با تجدید احترام
  [نام و نام خانوادگی خواهان]
  [امضا]
  `,
      complaint: `شما یک وکیل متخصص در امور کیفری هستید. وظیفه شما تنظیم یک پیش‌نویس شکواییه دقیق و قانونی برای ارائه به دادسرا است.

**عنوان اتهام (Topic):** {topic}
**شرح شکایت (Description):** {description}

**دستورالعمل‌ها:**
پیش‌نویس شکواییه را با فرمت مارک‌داون و ساختار زیر تهیه کنید.

- **شاکی:** [نام و نام خانوادگی]، فرزند [نام پدر]، به شماره ملی [شماره ملی]، ساکن [آدرس دقیق]
- **مشتکی‌عنه (متهم):** [نام و نام خانوادگی]، فرزند [نام پدر]، [در صورت اطلاع: شماره ملی و آدرس دقیق]
- **وکیل شاکی:** [در صورت وجود]
- **موضوع شکایت:** {topic}
- **دلایل و ضمائم:**
    - [لیست مستندات مانند گزارش پلیس، شهادت شهود، پیامک‌ها، اسناد و ...]
- **متن شکواییه:**
    - **دادستان محترم عمومی و انقلاب شهرستان [نام شهرستان]**
    - با سلام و احترام؛
    - اینجانب [نام شاکی]، به استحضار می‌رساند که در تاریخ [تاریخ] در [محل وقوع جرم]، فردی به نام [نام مشتکی‌عنه]... [شرح کامل واقعه مجرمانه بر اساس اطلاعات {description} را با ذکر جزئیات زمان، مکان و نحوه ارتکاب جرم بنویسید.]
    - [توضیح دهید که عمل ارتکابی مشتکی‌عنه با کدام ماده قانونی (در صورت اطلاع) منطبق است.]
    - لذا با توجه به ادله و مستندات تقدیمی، از آن مقام محترم قضایی، تعقیب و مجازات نامبرده به اتهام {topic} مورد استدعاست.

  با تشکر و سپاس
  [نام و نام خانوادگی شاکی]
  [امضا]
  `,
      contract: `شما یک مشاور حقوقی متخصص در تنظیم قراردادها هستید. یک پیش‌نویس قرارداد جامع بر اساس درخواست کاربر تهیه کنید.

**موضوع قرارداد (Topic):** {topic}
**جزئیات و شروط (Description):** {description}

**دستورالعمل‌ها:**
یک پیش‌نویس قرارداد کامل با فرمت مارک‌داون تهیه کنید. حتماً شامل بخش‌های استاندارد زیر باشد و جزئیات را از {description} استخراج کنید.

- **عنوان قرارداد:** قرارداد {topic}
- **ماده ۱: طرفین قرارداد**
    - **طرف اول (مثلاً فروشنده/موجر/کارفرما):** شرکت/آقای/خانم ... به شماره ثبت/ملی ... به نشانی ...
    - **طرف دوم (مثلاً خریدار/مستاجر/کارمند):** شرکت/آقای/خانم ... به شماره ثبت/ملی ... به نشانی ...
- **ماده ۲: موضوع قرارداد**
    - عبارت است از ... [شرح دقیق موضوع قرارداد بر اساس {topic} و {description}]
- **ماده ۳: مدت قرارداد**
    - این قرارداد از تاریخ ... لغایت ... به مدت ... معتبر است.
- **ماده ۴: مبلغ قرارداد و نحوه پرداخت**
    - مبلغ کل قرارداد ... ریال است که به شرح زیر پرداخت می‌گردد: ...
- **ماده ۵: تعهدات طرف اول**
    - [لیست تعهدات طرف اول]
- **ماده ۶: تعهدات طرف دوم**
    - [لیست تعهدات طرف دوم]
- **ماده ۷: تضمینات (در صورت وجود)**
- **ماده ۸: فسخ قرارداد**
    - [شرایط فسخ را مشخص کنید]
- **ماده ۹: قوه قهریه (فورس ماژور)**
- **ماده ۱۰: حل اختلاف**
    - کلیه اختلافات ناشی از این قرارداد ابتدا از طریق مذاکره حل و فصل خواهد شد و در صورت عدم توافق، مرجع صالح دادگاه‌های [شهرستان] / داوری می‌باشد.
- **ماده ۱۱: نسخ قرارداد**
    - این قرارداد در ۱۱ ماده و دو نسخه با اعتبار واحد تنظیم و به امضای طرفین رسیده است.

  **امضای طرف اول** | **امضای طرف دوم**
  `,
      legal_letter: `شما یک وکیل هستید. یک اظهارنامه رسمی و قانونی برای ارسال به مخاطب، بر اساس اطلاعات کاربر، تنظیم کنید.

**موضوع اظهارنامه (Topic):** {topic}
**خواسته و شرح (Description):** {description}

**دستورالعمل‌ها:**
یک اظهارنامه رسمی با فرمت مارک‌داون و ساختار زیر تنظیم کنید.

- **مشخصات و اقامتگاه اظهارکننده (موکل شما):**
    - نام: [نام کامل]
    - نشانی: [آدرس دقیق]
- **مشخصات و اقامتگاه مخاطب:**
    - نام: [نام کامل]
    - نشانی: [آدرس دقیق]
- **موضوع اظهارنامه:** {topic}
- **خلاصه اظهارات:**
    - **مخاطب محترم، جناب آقای/سرکار خانم [نام مخاطب]**
    - با سلام،
    - همانطور که مستحضر هستید، به موجب [مبنای رابطه حقوقی، مثلاً قرارداد شماره...]، تعهدی مبنی بر [...] بر عهده آن محترم بوده است.
    - [شرح مختصری از تعهدات انجام نشده یا وضعیت حقوقی موجود بر اساس {description} را بنویسید.]
    - متاسفانه علی‌رغم پیگیری‌های مکرر، تاکنون اقدامی از سوی شما صورت نگرفته است.
- **خلاصه درخواست:**
    - لذا به طور رسمی به شما ابلاغ می‌گردد که ظرف مدت [تعداد روز، مثلاً ۷۲ ساعت] از تاریخ ابلاغ این اظهارنامه، نسبت به [درخواست مشخص خود را بنویسید، مثلاً پرداخت بدهی/تخلیه ملک/انجام تعهد] اقدام فرمایید.
    - بدیهی است در صورت عدم توجه به مفاد این اظهارنامه، اینجانب حق خود را برای پیگیری موضوع از طریق مراجع قضایی صالح محفوظ می‌دارم.

  با احترام
  [نام اظهارکننده]
  `,
      defense_brief: `شما یک وکیل مدافع با تجربه هستید. یک لایحه دفاعیه مستدل و متقن برای ارائه به دادگاه تنظیم کنید.

**موضوع پرونده (Topic):** {topic}
**شرح دفاعیات و نکات کلیدی (Description):** {description}

**دستورالعمل‌ها:**
یک لایحه دفاعیه با فرمت مارک‌داون و ساختار زیر تهیه کنید. لحن باید کاملاً حقوقی، محترمانه و مستدل باشد.

- **پرونده کلاسه:** [شماره کلاسه]
- **شعبه:** [شماره شعبه] دادگاه [نوع دادگاه] [شهرستان]
- **موضوع:** لایحه دفاعیه در خصوص پرونده {topic}
- **تقدیمی از سوی:** [نام موکل]، [خوانده/متهم] پرونده
- **تقدیم به:** ریاست محترم شعبه [شماره شعبه] دادگاه [نوع دادگاه]

  **ریاست محترم دادگاه،**
  با سلام و عرض ادب؛
  
  احتراماً در خصوص پرونده کلاسه فوق، در مقام دفاع از موکل، [آقای/خانم ...], مراتب ذیل را به استحضار عالی می‌رساند:

  - **۱. شرح ماوقع از منظر موکل:**
      - [خلاصه ای از وقایع را از دیدگاه موکل خود و بر اساس {description} بیان کنید.]
  - **۲. دفاعیات ماهوی:**
      - **الف)** [اولین دلیل دفاعی خود را مطرح کنید. مثلاً عدم وجود رابطه سببیت، فقدان سوء‌نیت، استناد به مدارک و ...]
      - **ب)** [دومین دلیل دفاعی خود را مطرح کنید و آن را با استناد به مدارک و شواهد موجود در پرونده تقویت نمایید.]
      - **ج)** [در صورت لزوم، به مواد قانونی مرتبط استناد کرده و تفسیر خود را ارائه دهید.]
  - **۳. نتیجه‌گیری و تقاضا:**
      - با عنایت به جمیع جهات مذکور و با توجه به [مهمترین دلیل دفاعی]، و نظر به اصل برائت، واضح است که اتهام انتسابی به موکل فاقد وجاهت قانونی است.
      - لذا از آن مقام محترم، تقاضای صدور رأی شایسته مبنی بر [خواسته مشخص، مثلاً برائت موکل/رد دعوای خواهان] مورد استدعاست.

  با سپاس و تجدید احترام
  [نام وکیل]
  وکیل پایه یک دادگتری
  `,
      legal_research: `شما یک پژوهشگر حقوقی هستید. در مورد سوال حقوقی کاربر تحقیق کرده و پاسخی مستند ارائه دهید.

**سوال حقوقی (Topic):** {topic}
**جزئیات بیشتر (Description):** {description}

**دستورالعمل‌ها:**
پاسخی جامع و ساختاریافته با فرمت مارک‌داون ارائه دهید.

- **موضوع تحقیق:** {topic}
- **خلاصه سوال:**
    - [سوال کاربر را به صورت شفاف بازنویسی کنید.]
- **پاسخ حقوقی:**
    - **۱. مقدمه و تعریف مفاهیم:**
        - [مفاهیم کلیدی مرتبط با سوال را تعریف کنید.]
    - **۲. بررسی قوانین و مقررات مرتبط:**
        - [به مواد قانونی اصلی (مانند قانون مدنی، قانون مجازات اسلامی، قانون تجارت و ...) که به موضوع مرتبط هستند، اشاره کنید و متن ماده را ذکر نمایید.]
        - **ماده ... قانون ...:** "[متن ماده]"
    - **۳. تحلیل و نتیجه‌گیری:**
        - [با توجه به قوانین ذکر شده، به تحلیل سوال کاربر بپردازید. جوانب مختلف موضوع را بررسی کرده و بر اساس اطلاعات {description} پاسخ را شخصی‌سازی کنید.]
    - **۴. رویه قضایی (در صورت امکان):**
        - [اگر نظریه مشورتی یا رأی وحدت رویه مرتبطی وجود دارد، به آن اشاره کنید.]
- **سلب مسئولیت:**
    - توجه داشته باشید که این پاسخ صرفاً جنبه اطلاعاتی و پژوهشی داشته و به هیچ عنوان جایگزین مشاوره حقوقی با وکیل متخصص نمی‌باشد. شرایط هر پرونده منحصر به فرد است و باید به صورت جداگانه بررسی شود.
  `,
    }
};