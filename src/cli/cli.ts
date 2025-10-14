#!/usr/bin/env node
import path from "node:path";
import type { EnvConfigOptions } from "../types/options.js";
import type { EnvSchema } from "../types/schema.js";
import { EnvTool } from "./EnvTool.js";
import fs from "fs";
// ts-node for dev

const args = process.argv.slice(2);
const tool = new EnvTool();

const loadIndex = args.indexOf("load");

if (loadIndex !== -1) {
  const options: EnvConfigOptions = {};
  const cmdIndex = args.indexOf("--");

  const flags =
    cmdIndex === -1
      ? args.slice(loadIndex + 1)
      : args.slice(loadIndex + 1, cmdIndex);

  for (let i = 0; i < flags.length; i++) {
    const flag = flags[i];
    switch (flag) {
      case "--path": {
        const value = flags[++i];
        if (value !== undefined) options.path = value;
        break;
      }

      case "--debug":
        options.debug = true;
        break;

      case "--load-all-defaults":
        options.loadAllDefaults = true;
        break;

      case "--override":
        options.override = true;
        break;

      case "--expand":
        options.expand = true;
        break;

      case "--multiline":
        options.multiline = true;
        break;

      case "--schema": {
        const value = flags[++i];
        if (value !== undefined) {
          const schemaPath = path.resolve(value);
          const raw = fs.readFileSync(schemaPath, "utf-8");
          try {
            options.schema = JSON.parse(raw) as EnvSchema;
          } catch (err) {
            console.error(`Failed to parse schema file: ${schemaPath}`, err);
            process.exit(1);
          }
        }
        break;
      }

      case "--validation-mode": {
        const value = flags[++i];
        if (value !== undefined) options.validationMode = value as any;
        break;
      }

      default:
        console.warn(`Unknown flag: ${flag}`);
    }
  }

  const cmd: string[] =
    cmdIndex !== -1 ? args.slice(cmdIndex + 1).filter(Boolean) : [];
  tool.load(options, cmd.length > 0 ? cmd : []);
} else {
  console.log(`
EnvTool CLI

Usage:
  envtool load [options] -- <command>

Options:
  --path <file>               Path to .env file
  --debug                     Enable debug logs
  --load-all-defaults          Load all default values
  --override                   Override existing process.env
  --expand                     Expand variables
  --multiline                  Support multiline values
  --schema <file>              Path to schema file
  --validation-mode <mode>     Validation mode (strict|loose)
`);
}
