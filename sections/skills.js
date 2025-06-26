import chalk from "chalk";
import { COLORS } from "../data.js";

export default function showSkills() {
  return chalk
    .hex(COLORS.secondary)
    .italic(">>> Welcome to the Skills section!");
}
