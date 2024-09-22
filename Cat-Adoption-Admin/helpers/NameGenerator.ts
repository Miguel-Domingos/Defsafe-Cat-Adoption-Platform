import { names } from "./names";

export function NameGenerator() {
  return names[Math.floor(Math.random() * 1000)];
}
