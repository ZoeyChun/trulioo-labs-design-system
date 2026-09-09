import React, { useState } from "react";
import type { LabsTreeNode } from "../ubo/types";
import { ChevronDownIcon, graphIcon, SparkleIcon, WarningIcon } from "./icons";

interface UboDrawerProps {
  node: LabsTreeNode;
  onConnectedSelect: (nodeId: string) => void;
}

function DrawerAccordion({
  title,
  trailing,
  children,
  defaultExpanded = true,
}: {
  title: string;
  trailing?: React.ReactNode;
  children: React.ReactNode;
  defaultExpanded?: boolean;
}) {
  const [expanded, setExpanded] = useState(defaultExpanded);

  return (
    <div className={`tds-accordion tds-accordion--sm kyb-ubo-drawer__accordion${expanded ? " tds-accordion--expanded" : ""}`}>
      <button
        type="button"
        className="tds-accordion__header"
        aria-expanded={expanded ? "true" : "false"}
        onClick={() => setExpanded((value) => !value)}
      >
        <span className="tds-accordion__leading">
          <span className="tds-accordion__title-group">
            <span className="tds-accordion__title">{title}</span>
          </span>
        </span>
        <span className="tds-accordion__trailing">
          {trailing && <span className="tds-accordion__tags">{trailing}</span>}
          <span className="tds-accordion__chevron" aria-hidden="true">
            <ChevronDownIcon />
          </span>
        </span>
      </button>
      {expanded && <div className="tds-accordion__content">{children}</div>}
    </div>
  );
}

export function UboDrawer({ node, onConnectedSelect }: UboDrawerProps) {
  const details = node.details || {
    fields: [
      { label: "Relationship", value: node.subtitle || "—" },
      { label: "Entity type", value: node.type === "person" ? "Person" : "Business" },
    ],
  };

  const statusTone = details.statusTone || "positive";
  const findings = details.findings || [];
  const connected = details.connected || [];

  const findingsList = findings.length > 0 ? (
    <div className="kyb-ubo-drawer__findings-section">
      <h4 className="kyb-tab-summary__findings-title">Key Findings</h4>
      <ul className="kyb-ubo-drawer__findings">
        {findings.map((finding, i) => (
          <React.Fragment key={finding}>
            {i > 0 && <hr className="kyb-ubo-drawer__finding-divider" />}
            <li className="kyb-ubo-drawer__finding">
              <span className="kyb-ubo-drawer__finding-icon" aria-hidden="true">
                <WarningIcon />
              </span>
              <span>{finding}</span>
            </li>
          </React.Fragment>
        ))}
      </ul>
    </div>
  ) : null;

  const summaryContent = details.truai || findings.length > 0 ? (
    <div className="kyb-ubo-drawer__summary-slot">
      {details.truai && (
        <div className="kyb-truai-summary-card">
          <div className="kyb-truai-summary-card__block">
            <div className="kyb-truai-summary-card__label-row">
              <span className="kyb-truai-summary-card__sparkle" aria-hidden="true">
                <SparkleIcon />
              </span>
              <span className="kyb-truai-summary-card__label">TruAI:</span>
            </div>
            <p className="kyb-truai-summary-card__text">{details.truai}</p>
          </div>
          {details.prompt && (
            <div className="kyb-truai-summary-card__prompt">
              <p className="kyb-truai-summary-card__prompt-label">Ask TruAI:</p>
              <button
                type="button"
                className="tds-ai-tag tds-ai-tag--sm kyb-truai-prompt-chip"
                data-truai-toggle
                data-truai-prompt={details.prompt}
              >
                <span className="tds-ai-tag__icon" aria-hidden="true">
                  <SparkleIcon />
                </span>
                <span className="tds-ai-tag__label">{details.prompt}</span>
              </button>
            </div>
          )}
        </div>
      )}
      {findingsList}
    </div>
  ) : null;

  return (
    <aside className="kyb-ubo-drawer" aria-label="Selected entity details">
      <div className="kyb-ubo-drawer__header">
        <span className="kyb-ubo-drawer__header-icon" aria-hidden="true">
          {graphIcon(node.type)}
        </span>
        <h3 className="kyb-ubo-drawer__title">{node.name}</h3>
        {details.status && (
          <span className={`tds-tag tds-tag--sm tds-tag--${statusTone}`}>{details.status}</span>
        )}
      </div>

      {details.fields?.length ? (
        <div className="kyb-ubo-drawer__fields">
          {details.fields.map((field, index) => (
            <React.Fragment key={`${field.label}-${index}`}>
              {index > 0 && <hr className="kyb-ubo-drawer__divider" />}
              <div className="kyb-ubo-drawer__field">
                <p className="kyb-ubo-drawer__field-label">{field.label}</p>
                <p className="kyb-ubo-drawer__field-value">{field.value}</p>
              </div>
            </React.Fragment>
          ))}
        </div>
      ) : null}

      <div className="kyb-ubo-drawer__accordions">
        {summaryContent && (
          <DrawerAccordion
            title="Summary"
            trailing={
              <span className="tds-ai-tag tds-ai-tag--sm">
                <span className="tds-ai-tag__icon" aria-hidden="true">
                  <SparkleIcon />
                </span>
                <span className="tds-ai-tag__label">TruAI</span>
              </span>
            }
          >
            {summaryContent}
          </DrawerAccordion>
        )}
        {connected.length > 0 && (
          <DrawerAccordion
            title="Connected Entities"
            trailing={
              <span className="tds-counter tds-counter--secondary tds-counter--sm">{connected.length}</span>
            }
          >
            <div className="kyb-ubo-drawer__connected-list">
              {connected.map((item) => (
                <button
                  key={item.id || item.name}
                  type="button"
                  className="kyb-ubo-drawer__connected-card"
                  onClick={() => item.id && onConnectedSelect(item.id)}
                >
                  <div className="kyb-ubo-drawer__connected-head">
                    <span className="tds-tag tds-tag--sm tds-tag--default kyb-ubo-drawer__role-tag">
                      <span className="kyb-ubo-drawer__role-icon" aria-hidden="true">{graphIcon(item.type)}</span>
                      {item.role}
                    </span>
                    {item.pct && <span className="kyb-ubo-drawer__field-value">{item.pct}</span>}
                  </div>
                  <p className="kyb-ubo-drawer__connected-name">{item.name}</p>
                  <p className="kyb-ubo-drawer__connected-address">{item.address}</p>
                </button>
              ))}
            </div>
          </DrawerAccordion>
        )}
      </div>
    </aside>
  );
}
