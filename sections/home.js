import chalk from "chalk";
import boxen from "boxen";
import terminalLink from "terminal-link";
import { COLORS, FULL_NAME, CONTACTS } from "../data.js";

const styledLink = (label, base, user, href) => {
  const paddedLabel = chalk.hex(COLORS.label).bold(label.padEnd(10));
  const text =
    chalk.hex(COLORS.baseText)(base) + chalk.hex(COLORS.secondary).bold(user);
  return `${paddedLabel} ${terminalLink(text, href)}`;
};

export default function showHome() {
  const emailLabel = chalk.hex(COLORS.label).bold("Email:".padEnd(10));
  const email = terminalLink(
    chalk.hex(COLORS.baseText)("mailto:") +
      chalk.hex(COLORS.secondary).bold(CONTACTS.email),
    `mailto:${CONTACTS.email}`
  );

  const content = `
${emailLabel} ${email}
${styledLink("X:", "x.com/", CONTACTS.x, `https://x.com/${CONTACTS.x}`)}
${styledLink(
  "GitHub:",
  "github.com/",
  CONTACTS.github,
  `https://github.com/${CONTACTS.github}`
)}
${styledLink(
  "LinkedIn:",
  "linkedin.com/in/",
  CONTACTS.linkedin,
  `https://linkedin.com/in/${CONTACTS.linkedin}`
)}
${styledLink("Resume:", "", CONTACTS.resume, `https://${CONTACTS.resume}`)}
  `.trim();

  return boxen(content, {
    titleAlignment: "center",
    padding: { top: 1, bottom: 1, left: 4, right: 4 },
    margin: { top: 1, bottom: 1, left: 2, right: 2 },
    borderStyle: "bold",
    borderColor: COLORS.primary,
    align: "left",
  });
}
