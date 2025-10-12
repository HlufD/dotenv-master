import { spawn } from "node:child_process";
import type { EnvConfigOptions } from "../types/options.js";
import { config } from "../index.js";

export class EnvTool {
  async load(
    options: EnvConfigOptions = {},
    cmd: string[] = []
  ): Promise<Map<string, string>> {
    try {
      const environment = await config(options);
      if (options.debug) {
        console.log("EnvTool: Loaded environment variables:");
        console.log(
          [...environment.entries()]
            .map(([key, value]) => `${key}=${value}`)
            .join("\n")
        );
      } else {
        console.log("EnvTool: Environment loaded");
      }

      if (cmd.length > 0 && cmd[0]) {
        const child = spawn(cmd[0], cmd.slice(1), {
          stdio: "inherit",
          env: process.env,
        });

        child.on("exit", (code) => process.exit(code ?? 0));
      }

      return environment;
    } catch (err) {
      console.error("EnvTool: Failed to load environment", err);
      process.exit(1);
    }
  }
}
