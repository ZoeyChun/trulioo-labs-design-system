import { createRoot, type Root } from "react-dom/client";
import { UboGraph } from "./components/UboGraph";
import type { LabsTreeNode, RiskFilterMeta } from "./ubo/types";
import "./styles/ubo-graph.css";

export interface KybUboGraphMountOptions {
  tree: LabsTreeNode;
  riskFilter?: RiskFilterMeta | null;
}

const roots = new WeakMap<HTMLElement, Root>();

function mount(container: HTMLElement, options: KybUboGraphMountOptions) {
  let reactRoot = roots.get(container);

  if (!reactRoot) {
    container.innerHTML = "";
    const host = document.createElement("div");
    host.className = "kyb-ubo-react-root";
    container.appendChild(host);
    reactRoot = createRoot(host);
    roots.set(container, reactRoot);
  }

  reactRoot.render(<UboGraph tree={options.tree} riskFilter={options.riskFilter} />);
}

function unmount(container: HTMLElement) {
  const reactRoot = roots.get(container);
  if (!reactRoot) return;
  reactRoot.unmount();
  roots.delete(container);
  container.innerHTML = "";
}

const api = { mount, unmount };

declare global {
  interface Window {
    KybUboGraph?: typeof api;
  }
}

if (typeof window !== "undefined") {
  window.KybUboGraph = api;
}

export default api;
