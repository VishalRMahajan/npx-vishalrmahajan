import open from "open";
import { ABOUT, CONTACTS, FULL_NAME, COLORS } from "../data.js";
import termkit from "terminal-kit";

const { terminal: term } = termkit;

export function processCommand(command) {
  const cmd = command.trim().toLowerCase();
  const parts = cmd.split(" ");

  switch (parts[0]) {
    case "hello":
    case "hi":
      return `Hello, I'm ${FULL_NAME}. Type 'help' to see available commands.`;

    case "about":
      return getWhoami();

    case "help":
      return getHelp();

    case "whoami":
      return getWhoami();

    case "clear":
    case "cls":
      return { action: "clear" };

    case "open":
      return handleOpen(parts[1]);

    case "ls":
    case "list":
      return listCommands();

    case "skills":
      return { action: "changeTab", tab: "Skills" };

    case "experience":
    case "exp":
      return { action: "changeTab", tab: "Experience" };

    case "projects":
    case "proj":
      return { action: "changeTab", tab: "Projects" };

    case "home":
      return { action: "changeTab", tab: "Home" };

    case "exit":
    case "quit":
      return { action: "exit" };

    case "Chat":
      return Chat();

    default:
      if (cmd.length === 0) {
        return "";
      }
      return `Command not found: ${cmd}. Type 'help' for available commands.`;
  }
}

function Chat() {
  open(`https://t.me/${CONTACTS.telegram}`);
  return "Opening Telegram in browser...";
}

function handleOpen(target) {
  if (!target) {
    return "Usage: open [resume|github|linkedin|x]";
  }

  switch (target) {
    case "resume":
      open(`https://${CONTACTS.resume}`);
      return "Opening resume in browser...";

    case "github":
      open(`https://github.com/${CONTACTS.github}`);
      return "Opening GitHub profile in browser...";

    case "linkedin":
      open(`https://linkedin.com/in/${CONTACTS.linkedin}`);
      return "Opening LinkedIn profile in browser...";

    case "x":
    case "twitter":
      open(`https://x.com/${CONTACTS.x}`);
      return "Opening X profile in browser...";

    default:
      return `Cannot open '${target}'. Valid options are: resume, github, linkedin, x`;
  }
}

function getWhoami() {
  return ABOUT;
}

function getHelp() {
  return [
    "help            Show this help message",
    "whoami          Display my information",
    "open [option]   Open website in browser (resume, github, linkedin, x)",
    "clear           Clear the terminal",
    "list            List all available commands",
    "[Tabs]          Go to specific tab (eg. skills, experience, projects, home)",
    "exit            Exit the application",
    "Chat            Chat with me",
  ].join("\n");
}

function listCommands() {
  return "Available commands: help, whoami, open, clear, list, skills, experience, projects, home, exit";
}
