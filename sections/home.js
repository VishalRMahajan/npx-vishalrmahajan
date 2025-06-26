import chalk from "chalk";
import boxen from "boxen";
import terminalLink from "terminal-link";
import gradient from "gradient-string";
import { COLORS, FULL_NAME, CONTACTS } from "../data.js";
import CFonts from "cfonts";

const styledLink = (label, base, user, href) => {
  const paddedLabel = chalk.hex(COLORS.label).bold(label.padEnd(10));
  const text =
    chalk.hex(COLORS.baseText)(base) + chalk.hex(COLORS.secondary).bold(user);
  return `${paddedLabel} ${terminalLink(text, href)}`;
};

export default function showHome() {
  const heading = CFonts.render(FULL_NAME, {
    font: "tiny",
    align: "left",
    colors: ["#8A2BE2", "#6A0DAD"],
    background: "transparent",
    letterSpacing: 1,
    lineHeight: 1,
    space: false,
    maxLength: "0",
  }).string;

  const emailLabel = chalk.hex(COLORS.label).bold("Email:".padEnd(10));
  const email = terminalLink(
    chalk.hex(COLORS.baseText)("mailto:") +
      chalk.hex(COLORS.secondary).bold(CONTACTS.email),
    `mailto:${CONTACTS.email}`
  );

  const content = [
    `${chalk.hex(COLORS.label).bold("Email:".padEnd(10))} ${terminalLink(
      chalk.hex(COLORS.baseText)("mailto:") +
        chalk.hex(COLORS.secondary).bold(CONTACTS.email),
      `mailto:${CONTACTS.email}`
    )}`,
    styledLink("X:", "x.com/", CONTACTS.x, `https://x.com/${CONTACTS.x}`),
    styledLink(
      "GitHub:",
      "github.com/",
      CONTACTS.github,
      `https://github.com/${CONTACTS.github}`
    ),
    styledLink(
      "LinkedIn:",
      "linkedin.com/in/",
      CONTACTS.linkedin,
      `https://linkedin.com/in/${CONTACTS.linkedin}`
    ),
    styledLink("Resume:", "", CONTACTS.resume, `https://${CONTACTS.resume}`),
  ].join("\n");
  const box = boxen(content, {
    padding: { top: 1, bottom: 1, left: 11, right: 11 },
    borderStyle: "none",
    borderColor: COLORS.primary,
    align: "left",
  });

  return heading + box;
}
