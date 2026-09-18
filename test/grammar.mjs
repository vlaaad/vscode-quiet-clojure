import fs from "node:fs/promises";
import path from "node:path";
import {createRequire} from "node:module";
const require = createRequire(import.meta.url);
const oniguruma = require("vscode-oniguruma");
const textmate = require("vscode-textmate");
const root = path.resolve(import.meta.dirname, "..");
const baseGrammarPath = process.argv[2];

if (!baseGrammarPath) {
  throw new Error("Pass the path to Calva's clojure.tmLanguage.json");
}

const wasmPath = require.resolve("vscode-oniguruma/release/onig.wasm");
const wasm = await fs.readFile(wasmPath);
await oniguruma.loadWASM(wasm.buffer);

const registry = new textmate.Registry({
  onigLib: Promise.resolve({
    createOnigScanner: patterns => new oniguruma.OnigScanner(patterns),
    createOnigString: value => new oniguruma.OnigString(value)
  }),
  getInjections: scopeName => scopeName === "source.clojure" ? ["quiet-clojure.injection"] : [],
  loadGrammar: async scopeName => {
    const grammarPath = scopeName === "source.clojure"
      ? baseGrammarPath
      : path.join(root, "syntaxes", "quiet-clojure.tmLanguage.json");
    return textmate.parseRawGrammar(await fs.readFile(grammarPath, "utf8"), grammarPath);
  }
});

const grammar = await registry.loadGrammar("source.clojure");
const lines = [
  "    (\\( \\)) :paren",
  "(def ^:dynamic *the-system* (atom nil))",
  "(defn ^{:dynamic strict-evaluation-context-scopes} make-evaluation-context [x] x)",
  "(defn top-level [x] x)",
  "(re-find #\"ab\\\\s+cd\" text)",
  "\"ab\\\\ncd\""
];

for (const line of lines) {
  console.log(line);
  const result = grammar.tokenizeLine(line);
  for (const token of result.tokens) {
    console.log(JSON.stringify({
      text: line.slice(token.startIndex, token.endIndex),
      scopes: token.scopes
    }));
  }
}
