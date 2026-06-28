// // utils/keywordExtractor.js

// // Known short tech terms that should NEVER be filtered by length
// const SHORT_TECH_TERMS = new Set([
//   "ai",
//   "ml",
//   "c",
//   "r",
//   "go",
//   "os",
//   "db",
//   "ui",
//   "ux",
//   "qa",
//   "ci",
//   "cd",
//   "aws",
//   "gcp",
//   "sql",
//   "css",
//   "api",
//   "cli",
//   "ide",
//   "npm",
//   "git",
// ]);

// // Multi-word / aliased tech terms -> normalize to one canonical form
// const SYNONYM_MAP = {
//   "machine learning": "machinelearning",
//   "deep learning": "deeplearning",
//   "artificial intelligence": "ai",
//   "node.js": "nodejs",
//   "node js": "nodejs",
//   "nodejs": "nodejs",
//   "react.js": "react",
//   "react js": "react",
//   "vue.js": "vue",
//   "vue js": "vue",
//   "next.js": "nextjs",
//   "nextjs": "nextjs",
//   "express.js": "express",
//   "express js": "express",
//   "c++": "cpp",
//   "c#": "csharp",
//   ".net": "dotnet",
//   "rest api": "restapi",
//   "restful api": "restapi",
//   "ci/cd": "cicd",
//   "mongo db": "mongodb",
// };

// const STOPWORDS = new Set([
//   "the",
//   "a",
//   "an",
//   "and",
//   "or",
//   "but",
//   "in",
//   "on",
//   "at",
//   "to",
//   "for",
//   "of",
//   "with",
//   "by",
//   "is",
//   "are",
//   "was",
//   "were",
//   "be",
//   "been",
//   "being",
//   "have",
//   "has",
//   "had",
//   "do",
//   "does",
//   "did",
//   "will",
//   "would",
//   "should",
//   "this",
//   "that",
//   "these",
//   "those",
//   "we",
//   "you",
//   "your",
//   "our",
//   "their",
//   "as",
//   "it",
//   "its",
//   "from",
//   "into",
//   "about",
//   "who",
//   "what",
//   "which",
//   "when",
//   "where",
//   "why",
//   "how",
//   "all",
//   "any",
//   "both",
//   "each",
//   "more",
//   "most",
//   "other",
//   "some",
//   "such",
//   "no",
//   "nor",
//   "not",
//   "only",
//   "own",
//   "same",
//   "so",
//   "than",
//   "too",
//   "very",
//   "just",
//   "also",
//   "etc",
// ]);

// // Step 1: Replace known multi-word phrases BEFORE splitting into words
// const applySynonyms = (text) => {
//   let result = text.toLowerCase();
//   // Sort by length descending so longer phrases are replaced first
//   const sortedPhrases = Object.keys(SYNONYM_MAP).sort(
//     (a, b) => b.length - a.length,
//   );
//   sortedPhrases.forEach((phrase) => {
//     const escaped = phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
//     const regex = new RegExp(escaped, "g");
//     result = result.replace(regex, SYNONYM_MAP[phrase]);
//   });
//   return result;
// };

// export const extractKeywords = (text) => {
//   const normalized = applySynonyms(text);

//   const words = normalized
//     .replace(/[^a-z0-9+#.\s]/g, " ")
//     .split(/\s+/)
//     .filter((word) => {
//       if (word.length === 0) return false;
//       if (STOPWORDS.has(word)) return false;
//       if (word.length <= 2 && !SHORT_TECH_TERMS.has(word)) return false;
//       return true;
//     });

//   return [...new Set(words)];
// };

// export const compareKeywords = (resumeText, jdText) => {
//   const resumeWords = new Set(extractKeywords(resumeText));
//   const jdKeywords = extractKeywords(jdText);

//   const matched = [];
//   const missing = [];

//   jdKeywords.forEach((keyword) => {
//     if (resumeWords.has(keyword)) {
//       matched.push(keyword);
//     } else {
//       missing.push(keyword);
//     }
//   });

//   const matchScore =
//     jdKeywords.length > 0
//       ? Math.round((matched.length / jdKeywords.length) * 100)
//       : 0;

//   return { matchScore, matched, missing };
// };

// utils/keywordExtractor.js

const SHORT_TECH_TERMS = new Set([
    'ai', 'ml', 'c', 'r', 'go', 'os', 'db', 'ui', 'ux', 'qa', 'ci', 'cd',
    'aws', 'gcp', 'sql', 'css', 'api', 'cli', 'ide', 'npm', 'git'
]);

const SYNONYM_MAP = {
    'machine learning': 'machinelearning',
    'deep learning': 'deeplearning',
    'artificial intelligence': 'ai',
    'node.js': 'nodejs',
    'node js': 'nodejs',
    'nodejs': 'nodejs',
    'react.js': 'react',
    'reactjs': 'react',
    'vue.js': 'vue',
    'vuejs': 'vue',
    'next.js': 'nextjs',
    'nextjs': 'nextjs',
    'express.js': 'express',
    'expressjs': 'express',
    'c++': 'cpp',
    'c#': 'csharp',
    '.net': 'dotnet',
    'rest api': 'restapi',
    'restful api': 'restapi',
    'ci/cd': 'cicd',
    'mongo db': 'mongodb',
};

// Generic English words that are NEVER skills, regardless of context.
// This is a much bigger list than before, focused on JD filler language.
const FILLER_WORDS = new Set([
    'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for',
    'of', 'with', 'by', 'is', 'are', 'was', 'were', 'be', 'been', 'being',
    'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'should',
    'this', 'that', 'these', 'those', 'we', 'you', 'your', 'our', 'their',
    'as', 'it', 'its', 'from', 'into', 'about', 'who', 'what', 'which',
    'when', 'where', 'why', 'how', 'all', 'any', 'both', 'each', 'more',
    'most', 'other', 'some', 'such', 'no', 'nor', 'not', 'only', 'own',
    'same', 'so', 'than', 'too', 'very', 'just', 'also', 'etc',
    // job-description filler verbs/nouns/adjectives
    'looking', 'seeking', 'searching', 'wanted', 'required', 'require',
    'requires', 'requiring', 'developer', 'engineer', 'candidate',
    'candidates', 'applicant', 'skilled', 'skill', 'skills', 'experience',
    'experienced', 'knowledge', 'familiar', 'familiarity', 'proficient',
    'proficiency', 'understanding', 'ability', 'plus', 'bonus', 'nice',
    'good', 'strong', 'excellent', 'great', 'team', 'work', 'working',
    'job', 'role', 'position', 'responsibilities', 'responsible',
    'years', 'year', 'minimum', 'preferred', 'must', 'should', 'ideal',
    'ideally', 'someone', 'person', 'individual', 'company', 'join',
    'opportunity', 'including', 'include', 'includes', 'related',
    'similar', 'other', 'using', 'use', 'used'
]);

const applySynonyms = (text) => {
    let result = text.toLowerCase();
    const sortedPhrases = Object.keys(SYNONYM_MAP).sort((a, b) => b.length - a.length);
    sortedPhrases.forEach(phrase => {
        const escaped = phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(escaped, 'g');
        result = result.replace(regex, SYNONYM_MAP[phrase]);
    });
    return result;
};

// Strip trailing/leading punctuation but keep internal dots (Node.js) and pluses (C++)
const cleanToken = (word) => {
    return word.replace(/^[.,;:!?()'"]+|[.,;:!?()'"]+$/g, '');
};

export const extractKeywords = (text) => {
    const normalized = applySynonyms(text);

    const words = normalized
        .replace(/[^a-z0-9+#.\s]/g, ' ')
        .split(/\s+/)
        .map(cleanToken)
        .filter(word => {
            if (word.length === 0) return false;
            if (FILLER_WORDS.has(word)) return false;
            if (word.length <= 2 && !SHORT_TECH_TERMS.has(word)) return false;
            return true;
        });

    return [...new Set(words)];
};

export const compareKeywords = (resumeText, jdText) => {
    const resumeWords = new Set(extractKeywords(resumeText));
    const jdKeywords = extractKeywords(jdText);

    const matched = [];
    const missing = [];

    jdKeywords.forEach(keyword => {
        if (resumeWords.has(keyword)) {
            matched.push(keyword);
        } else {
            missing.push(keyword);
        }
    });

    const matchScore = jdKeywords.length > 0
        ? Math.round((matched.length / jdKeywords.length) * 100)
        : 0;

    return { matchScore, matched, missing };
};