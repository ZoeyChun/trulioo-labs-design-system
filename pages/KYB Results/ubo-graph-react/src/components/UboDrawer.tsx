import React, { useState } from "react";
import type { LabsTreeNode } from "../ubo/types";
import { ChevronDownIcon, CloseIcon, graphIcon, WarningIcon } from "./icons";

type ConnectedEntity = NonNullable<NonNullable<LabsTreeNode["details"]>["connected"]>[number];
type DetailField = NonNullable<NonNullable<LabsTreeNode["details"]>["fields"]>[number];

interface UboDrawerProps {
  node: LabsTreeNode;
  connected: ConnectedEntity[];
  onConnectedSelect: (nodeId: string) => void;
  onDismiss: () => void;
}

function UsFlagIcon() {
  return (
    <svg className="kyb-ubo-drawer__flag" viewBox="0 0 18 12" width="18" height="12" aria-hidden="true">
      <rect width="18" height="12" fill="#B22234" />
      <path
        fill="#fff"
        d="M0 1.33h18v1.34H0zm0 2.67h18v1.33H0zm0 2.67h18V8H0zm0 2.66h18v1.34H0z"
      />
      <rect width="7.2" height="6.4" fill="#3C3B6E" />
    </svg>
  );
}

function FieldFlag({ field }: { field: DetailField }) {
  if (field.flagSrc) {
    return <img className="kyb-ubo-drawer__flag" src={field.flagSrc} alt="" width="18" height="12" />;
  }
  if (field.flag && /^us$/i.test(field.flag)) {
    return <UsFlagIcon />;
  }
  return null;
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

export function UboDrawer({ node, connected, onConnectedSelect, onDismiss }: UboDrawerProps) {
  const details = node.details || {
    fields: [
      { label: "Relationship", value: node.subtitle || "—" },
      { label: "Business entity type", value: node.type === "person" ? "Person" : "Business" },
    ],
  };

  const statusTone = details.statusTone || "positive";
  const findings = details.findings || [];

  const findingsList =
    findings.length > 0 ? (
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
        <button
          type="button"
          className="kyb-ubo-drawer__close"
          aria-label="Close entity details"
          onClick={onDismiss}
        >
          <CloseIcon />
        </button>
      </div>

      {details.fields?.length ? (
        <div className="kyb-ubo-drawer__fields">
          {details.fields.map((field, index) => (
            <React.Fragment key={`${field.label}-${index}`}>
              {index > 0 && <hr className="kyb-ubo-drawer__divider" />}
              <div className="kyb-ubo-drawer__field">
                <p className="kyb-ubo-drawer__field-label">{field.label}</p>
                <div className="kyb-ubo-drawer__field-value-row">
                  <p className="kyb-ubo-drawer__field-value">{field.value}</p>
                  <FieldFlag field={field} />
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>
      ) : null}

      <div className="kyb-ubo-drawer__accordions">
        {findingsList && (
          <DrawerAccordion title="Key Findings" defaultExpanded>
            {findingsList}
          </DrawerAccordion>
        )}
        {connected.length > 0 && (
          <DrawerAccordion
            title="Connected Entities"
            defaultExpanded={false}
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
                      <span className="kyb-ubo-drawer__role-icon" aria-hidden="true">
                        {graphIcon(item.type)}
                      </span>
                      {item.role}
                    </span>
                    {item.pct && <span className="kyb-ubo-drawer__field-value">{item.pct}</span>}
                  </div>
                  <p className="kyb-ubo-drawer__connected-name">{item.name}</p>
                  {item.address && <p className="kyb-ubo-drawer__connected-address">{item.address}</p>}
                </button>
              ))}
            </div>
          </DrawerAccordion>
        )}
      </div>
    </aside>
  );
}
