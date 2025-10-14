# 🌿 Dotenv Master

[![npm version](https://img.shields.io/npm/v/dotenv-master.svg)](https://www.npmjs.com/package/dotenv-master)
[![License](https://img.shields.io/npm/l/dotenv-master.svg)](https://www.npmjs.com/package/dotenv-master)
[![Build Status](https://img.shields.io/github/actions/workflow/status/yourusername/dotenv-master/ci.yml)](https://github.com/hlufD/dotenv-master/actions)

**Dotenv Master** is a modern, TypeScript-first environment file parser and CLI tool for Node.js, designed to handle complex `.env` files, variable expansion, validation, and more.

---

## 🚀 Features

### Core Parsing
- Parse `KEY=value` assignments
- Supports multi-line values
- Handles quotes and inline comments
- Preserves `#` inside quoted strings

### Advanced Syntax
- Variable expansion (`${VAR}`, `${VAR:-default}`)
- Circular reference detection
- Required variables `${MUST_SET:?error}`
- Escape sequences: `\n`, `\t`, `\\`, `\$`, `\uXXXX`

### File Management
- Supports `.env`, `.env.local`, `.env.{NODE_ENV}`, `.env.{NODE_ENV}.local`
- Custom file paths
- Loading precedence rules (environment & local overrides)
- Merge strategies (override, combine, smart — partial support)

### Security & Validation
- Required variable enforcement
- Type validation (string, number, boolean, email, URL)
- Regex and custom validation
- Path traversal protection

### Value Processing
- Automatic type conversion (Boolean, Number)
- Default values for missing variables
- Configurable variable resolution order
- Process environment variable integration

### CLI Tooling
- `dotenv-master load` – load variables into process.env
- `dotenv-master validate` – validate environment variables against schema
- (Planned) `dotenv-master encrypt` / `decrypt` for secure variable management

### Developer & Production Features
- Handles large `.env` files (1000+ lines)
- Streaming/line-by-line parsing
- Detailed error reporting (file, line, snippet)
- Cross-platform support (Linux, macOS, Windows)
- TypeScript typings auto-generated from schema

---

## 📦 Installation

```bash
# Install via npm
npm install dotenv-master --save-dev

# Or globally for CLI access
npm install -g dotenv-master

```
## ⚙️ Usage
```bash
import { config } from "dotenv-master";

await config({
  path: ".env",
  debug: true,
  override: true,
  expand: true,
  multiline: true,
  schema: {
    DATABASE_URL: { required: true, type: "string" },
    PORT: { required: true, type: "number", allowedValues: [3000, 4000, 5000] },
    DEBUG: { required: false, type: "boolean" },
    API_KEY: { 
      required: true, 
      type: "string", 
      regex: /^[A-Z0-9]+$/, 
      custom: (value) => value.startsWith("API_") || "API_KEY must start with 'API_'" 
    }
  },
  validationMode: "throw", // or "warn"
});

console.log(process.env.DATABASE_URL);
console.log(process.env.PORT);
```

## CLI
```bash
# Load environment variables
dotenv-master load --path .env --debug

# Validate against schema
dotenv-master validate --schema ./schema.json

Flags:

--path <file> – path to .env file

--debug – enable debug logs

--load-all-defaults – load all defaults

--override – override existing process.env

--expand – enable variable expansion

--multiline – enable multi-line values

--schema <file> – path to schema JSON

--validation-mode <strict|loose> – validation mode
```

## 📁 Example Schema
``` bash
{
    DATABASE_URL: { required: true, type: "string" },
    PORT: { required: true, type: "number", allowedValues: [3000, 4000, 5000] },
    DEBUG: { required: false, type: "boolean" },
    API_KEY: { 
      required: true, 
      type: "string", 
      regex: /^[A-Z0-9]+$/, 
      custom: (value) => value.startsWith("API_") || "API_KEY must start with 'API_'" 
    }
  }
  ```

##   📜 License
MIT License © [Hluf Abebe]

## ❤️ Contributing
Contributions are welcome! Please open issues or PRs for features, bug fixes, or improvements.

## 🔗 Links
[GitHub Repository](https://github.com/HlufD/dotenv-master)
