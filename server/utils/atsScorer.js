export const calculateATSScore = (text) => {
  const lowerText = text.toLowerCase();

  const breakdown = {
    hasEmail: /[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,}/.test(text),
    hasPhone:
      /(\+?\d{1,3}[-.\s]?)?\(?\d{3,5}\)?[-.\s]?\d{3,4}[-.\s]?\d{3,4}/.test(
        text,
      ),
    hasGithub: /github\.com/i.test(text),
    hasLinkedin: /linkedin\.com/i.test(text),
    hasSkills: /skills/i.test(lowerText),
    hasProjects: /projects/i.test(lowerText),
    hasExperience: /(experience|internship|work history)/i.test(lowerText),
    hasEducation: /(education|academic|university|college|degree)/i.test(
      lowerText,
    ),
  };

  const points = {
    hasEmail: 10,
    hasPhone: 10,
    hasGithub: 10,
    hasLinkedin: 10,
    hasSkills: 15,
    hasProjects: 15,
    hasExperience: 15,
    hasEducation: 15,
  };

  let score = 0;
  const missingItems = [];

  for (const key in breakdown) {
    if (breakdown[key]) {
      score += points[key];
    } else {
      missingItems.push(formatMissingLabel(key));
    }
  }

  return { score, breakdown, missingItems };
};

const formatMissingLabel = (key) => {
  const labels = {
    hasEmail: "Email address",
    hasPhone: "Phone number",
    hasGithub: "GitHub link",
    hasLinkedin: "LinkedIn link",
    hasSkills: "Skills section",
    hasProjects: "Projects section",
    hasExperience: "Experience section",
    hasEducation: "Education section",
  };
  return labels[key];
};
