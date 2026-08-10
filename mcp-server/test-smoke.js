import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

const transport = new StdioClientTransport({
  command: "node",
  args: ["src/server.js"],
  cwd: new URL(".", import.meta.url).pathname,
});

const client = new Client({ name: "test", version: "1.0.0" });
await client.connect(transport);

let passed = 0;
let total = 0;

async function test(label, fn) {
  total++;
  try {
    await fn();
    console.log(`  ✓ ${label}`);
    passed++;
  } catch (e) {
    console.log(`  ✗ ${label}: ${e.message}`);
  }
}

console.log("\nTrulioo Design System MCP — smoke tests\n");

// --- Resources ---

await test("List resources", async () => {
  const { resources } = await client.listResources();
  const names = resources.map((r) => r.name);
  if (!names.includes("system-prompt")) throw new Error("missing system-prompt");
  if (!names.includes("component-catalog")) throw new Error("missing component-catalog");
  if (!names.includes("token-reference")) throw new Error("missing token-reference");
});

await test("Read system-prompt", async () => {
  const { contents } = await client.readResource({ uri: "tds://system-prompt" });
  const text = contents[0].text;
  if (!text.includes("Trulioo Design System")) throw new Error("missing TDS mention");
  if (!text.includes("tds-btn")) throw new Error("missing component example");
  if (text.length < 500) throw new Error(`too short: ${text.length} chars`);
  console.log(`    (${text.length} chars)`);
});

await test("Read component-catalog", async () => {
  const { contents } = await client.readResource({ uri: "tds://components/catalog" });
  const text = contents[0].text;
  if (!text.includes("Button")) throw new Error("missing Button");
  if (!text.includes("TextInput")) throw new Error("missing TextInput");
  if (!text.includes("DataTable")) throw new Error("missing DataTable");
});

await test("Read token-reference", async () => {
  const { contents } = await client.readResource({ uri: "tds://tokens/reference" });
  const text = contents[0].text;
  if (!text.includes("--text-default")) throw new Error("missing --text-default");
  if (!text.includes("--padding-md")) throw new Error("missing --padding-md");
});

// --- Tools ---

await test("List tools", async () => {
  const { tools } = await client.listTools();
  const names = tools.map((t) => t.name);
  if (!names.includes("get_component")) throw new Error("missing get_component");
  if (!names.includes("search_components")) throw new Error("missing search_components");
  if (!names.includes("get_tokens")) throw new Error("missing get_tokens");
});

await test("get_component: button (HTML + guidelines)", async () => {
  const res = await client.callTool({ name: "get_component", arguments: { component_id: "button" } });
  const text = res.content[0].text;
  if (!text.includes("tds-btn")) throw new Error("missing tds-btn");
  if (!text.includes("HTML Examples")) throw new Error("missing HTML examples");
  if (!text.includes("tds-btn--primary")) throw new Error("missing primary variant");
  if (!text.includes("Usage Guidelines")) throw new Error("missing guidelines");
});

await test("get_component: text-input", async () => {
  const res = await client.callTool({ name: "get_component", arguments: { component_id: "text-input" } });
  const text = res.content[0].text;
  if (!text.includes("tds-text-input")) throw new Error("missing class");
  if (!text.includes("HTML Examples")) throw new Error("missing examples");
});

await test("get_component: invalid → not found", async () => {
  const res = await client.callTool({ name: "get_component", arguments: { component_id: "nonexistent" } });
  if (!res.content[0].text.includes("not found")) throw new Error("should report not found");
});

await test("search_components: 'dropdown' → Select", async () => {
  const res = await client.callTool({ name: "search_components", arguments: { query: "dropdown" } });
  const text = res.content[0].text.toLowerCase();
  if (!text.includes("select")) throw new Error("dropdown should find Select");
});

await test("search_components: 'toggle' → Switch", async () => {
  const res = await client.callTool({ name: "search_components", arguments: { query: "toggle" } });
  const text = res.content[0].text.toLowerCase();
  if (!text.includes("switch")) throw new Error("toggle should find Switch");
});

await test("search_components: 'form' → Form Inputs", async () => {
  const res = await client.callTool({ name: "search_components", arguments: { query: "form" } });
  if (!res.content[0].text.includes("Form")) throw new Error("should return Form Inputs");
});

await test("search_components: 'table' → DataTable", async () => {
  const res = await client.callTool({ name: "search_components", arguments: { query: "table" } });
  const text = res.content[0].text.toLowerCase();
  if (!text.includes("data-table") && !text.includes("datatable")) throw new Error("should find DataTable");
});

await test("get_tokens: spacing", async () => {
  const res = await client.callTool({ name: "get_tokens", arguments: { category: "spacing" } });
  const text = res.content[0].text;
  if (!text.includes("--padding")) throw new Error("missing --padding tokens");
  if (!text.includes("--gap")) throw new Error("missing --gap tokens");
});

await test("get_tokens: colors", async () => {
  const res = await client.callTool({ name: "get_tokens", arguments: { category: "colors" } });
  const text = res.content[0].text;
  if (!text.includes("--text-default")) throw new Error("missing semantic color tokens");
});

await test("get_tokens: all", async () => {
  const res = await client.callTool({ name: "get_tokens", arguments: { category: "all" } });
  const text = res.content[0].text;
  if (!text.includes("--text-default")) throw new Error("missing color tokens");
  if (!text.includes("--padding")) throw new Error("missing spacing tokens");
  if (!text.includes("--radius")) throw new Error("missing radius tokens");
});

// --- Prompts ---

await test("List prompts", async () => {
  const { prompts } = await client.listPrompts();
  if (!prompts.some((p) => p.name === "build_ui")) throw new Error("missing build_ui");
});

console.log(`\n${passed}/${total} tests passed\n`);
await client.close();
process.exit(passed === total ? 0 : 1);
