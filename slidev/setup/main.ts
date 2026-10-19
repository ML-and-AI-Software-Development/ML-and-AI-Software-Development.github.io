import { defineAppSetup } from "@slidev/types";
import site from "virtual:site-config";

export default defineAppSetup(({ app }) => {
  app.config.globalProperties.site = site;
});
