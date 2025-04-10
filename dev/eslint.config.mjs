import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const eslintConfig = [
  {
    rules: {
      // Disable all ESLint rules
      "*": "off",
    },
  },
];

export default eslintConfig;