import chalk from "chalk";
import { COLORS } from "../data.js";

export default function showProjects() {
  return chalk
    .hex(COLORS.secondary)
    .italic(">>> Welcome to the Projects section!");
}
