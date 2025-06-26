import chalk from "chalk";
import terminalLink from "terminal-link";
import { COLORS, FULL_NAME, CONTACTS } from "../data.js";
import CFonts from "cfonts";
import termkit from "terminal-kit";
import stripAnsi from "strip-ansi";

const term = termkit.terminal;

export default function showHome() {
  const heading = CFonts.render(FULL_NAME, {
    font: "tiny",
    align: "center",
    colors: ["#8A2BE2", "#6A0DAD"],
    background: "transparent",
    letterSpacing: 1,
    lineHeight: 1,
    space: false,
    maxLength: "0",
  }).string;

  const contactsContent = [
    `Email:     ${CONTACTS.email}`,
    `X:         x.com/${CONTACTS.x}`,
    `GitHub:    github.com/${CONTACTS.github}`,
    `LinkedIn:  linkedin.com/in/${CONTACTS.linkedin}`,
    `Resume:    ${CONTACTS.resume}`,
  ];

  const termWidth = term.width || process.stdout.columns || 80;
  const result = heading.split("\n");

  const longestLine = Math.max(
    ...contactsContent.map((line) => stripAnsi(line).length)
  );
  const padding = Math.floor((termWidth - longestLine) / 2);

  contactsContent.forEach((line) => {
    const labelPart = line.split(":")[0] + ":";
    const contentPart = line.split(":")[1].trim();

    const styledLabel = chalk.hex(COLORS.label).bold(labelPart.padEnd(10));

    let styledContent;
    if (labelPart === "Email:") {
      styledContent = terminalLink(
        chalk.hex(COLORS.secondary).bold(contentPart),
        `mailto:${CONTACTS.email}`
      );
    } else if (labelPart === "X:") {
      styledContent = terminalLink(
        chalk.hex(COLORS.baseText)("x.com/") +
          chalk.hex(COLORS.secondary).bold(CONTACTS.x),
        `https://x.com/${CONTACTS.x}`
      );
    } else if (labelPart === "GitHub:") {
      styledContent = terminalLink(
        chalk.hex(COLORS.baseText)("github.com/") +
          chalk.hex(COLORS.secondary).bold(CONTACTS.github),
        `https://github.com/${CONTACTS.github}`
      );
    } else if (labelPart === "LinkedIn:") {
      styledContent = terminalLink(
        chalk.hex(COLORS.baseText)("linkedin.com/in/") +
          chalk.hex(COLORS.secondary).bold(CONTACTS.linkedin),
        `https://linkedin.com/in/${CONTACTS.linkedin}`
      );
    } else if (labelPart === "Resume:") {
      styledContent = terminalLink(
        chalk.hex(COLORS.secondary).bold(contentPart),
        `https://${CONTACTS.resume}`
      );
    } else {
      styledContent = chalk.hex(COLORS.secondary).bold(contentPart);
    }

    result.push(" ".repeat(padding) + styledLabel + " " + styledContent);
  });

  return result.join("\n");
}
