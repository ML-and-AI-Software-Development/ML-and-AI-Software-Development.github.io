import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

const virtualId = "virtual:site-config";
const resolvedId = "\0" + virtualId;

function loadSiteConfig(): Record<string, string> {
  const path = fileURLToPath(new URL("../_config.yml", import.meta.url));
  const site: Record<string, string> = {};
  for (const line of readFileSync(path, "utf8").split("\n")) {
    const match = line.match(
      /^([A-Za-z0-9_]+):\s*(?:"([^"]*)"|'([^']*)'|([^\s#][^#]*?))\s*(?:#.*)?$/,
    );
    if (!match) continue;
    const value = (match[2] ?? match[3] ?? match[4])?.trim();
    if (!value || value === ">" || value === ">-" || value === "|" || value === "|-") continue;
    site[match[1]] = value;
  }
  return site;
}

export default defineConfig({
  plugins: [
    {
      name: "site-config",
      resolveId(id) {
        if (id === virtualId) return resolvedId;
      },
      load(id) {
        if (id === resolvedId) return `export default ${JSON.stringify(loadSiteConfig())}`;
      },
    },
  ],
});
