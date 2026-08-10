import { assetUrl } from "../../utils/assets";

const homeIcon = (
  <svg className="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M2.5 6.5 8 2l5.5 4.5V13a1 1 0 0 1-1 1H3.5a1 1 0 0 1-1-1V6.5z" />
    <path d="M6 14V9h4v5" />
  </svg>
);

const labsIcon = (
  <svg className="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
    <path d="M6 2.5h4l1 3h2.5v2H2.5v-2H5l1-3zM4.5 9.5h7v4.5h-7V9.5z" />
  </svg>
);

const chevronUpIcon = (
  <svg className="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
    <path d="M4 10l4-4 4 4" />
  </svg>
);

const chevronRightIcon = (
  <svg className="icon icon--sm" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
    <path d="M6 4l4 4-4 4" />
  </svg>
);

const collapseIcon = (
  <svg className="icon icon--sm" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
    <path d="M10 4 6 8l4 4M6 4 2 8l4 4" />
  </svg>
);

function subItemIcon() {
  return (
    <span className="tds-side-nav__sub-item-icon">
      <svg className="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
        <path d="M5 2.5h6l1 2.5h2v8.5a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5h2l1-2.5z" />
        <path d="M6 8.5h4" />
      </svg>
    </span>
  );
}

/** Full expanded SideNav markup for the anatomy diagram (Figma 1187:10323). */
export function SideNavAnatomySpecimen() {
  return (
    <div className="tds-side-nav-preview">
      <aside className="tds-side-nav tds-side-nav--demo-figma">
        <div className="tds-side-nav__header">
          <button type="button" className="tds-side-nav__brand" aria-expanded="true">
            <span className="tds-side-nav__logo">
              <img src={assetUrl("trulioo-logo-mark.svg")} alt="Trulioo" width="40" height="40" />
            </span>
            <span className="tds-side-nav__brand-expanded">
              <span className="tds-side-nav__brand-logo">
                <img src={assetUrl("trulioo-labs-logo.svg")} alt="Trulioo Labs" width="152" height="24" />
              </span>
            </span>
          </button>
        </div>

        <div className="tds-side-nav__main">
          <div className="tds-side-nav__nav-stack">
            <button type="button" className="tds-side-nav__nav-item ds-anatomy-side-nav__home">
              <span className="tds-side-nav__nav-item-label">
                <span className="tds-side-nav__nav-item-icon">{homeIcon}</span>
                <span className="tds-side-nav__nav-item-text">Home</span>
              </span>
            </button>

            <div className="tds-side-nav__nav-group">
              <button
                type="button"
                className="tds-side-nav__nav-item tds-side-nav__nav-item--active"
                aria-current="page"
                aria-expanded="true"
              >
                <span className="tds-side-nav__nav-item-label">
                  <span className="tds-side-nav__nav-item-icon">{labsIcon}</span>
                  <span className="tds-side-nav__nav-item-text">Labs</span>
                </span>
                <span className="tds-side-nav__nav-item-chevron">{chevronUpIcon}</span>
              </button>

              <div className="tds-side-nav__sub-nav">
                <div className="tds-side-nav__section">
                  <div className="tds-side-nav__section-title">KYB</div>
                  <div className="tds-side-nav__section-items">
                    <button type="button" className="tds-side-nav__sub-item">
                      {subItemIcon()}
                      <span className="tds-side-nav__sub-item-text">UBO Agent</span>
                    </button>
                    <button type="button" className="tds-side-nav__sub-item">
                      {subItemIcon()}
                      <span className="tds-side-nav__sub-item-text">Policy Review</span>
                    </button>
                    <button type="button" className="tds-side-nav__sub-item">
                      {subItemIcon()}
                      <span className="tds-side-nav__sub-item-text">Deep Search</span>
                    </button>
                  </div>
                </div>

                <hr className="tds-side-nav__divider" />

                <div className="tds-side-nav__section">
                  <div className="tds-side-nav__section-title">KYC</div>
                  <div className="tds-side-nav__section-items">
                    <button
                      type="button"
                      className="tds-side-nav__sub-item tds-side-nav__sub-item--selected"
                      aria-current="page"
                    >
                      {subItemIcon()}
                      <span className="tds-side-nav__sub-item-text">Document Verification</span>
                    </button>
                    <button type="button" className="tds-side-nav__sub-item">
                      {subItemIcon()}
                      <span className="tds-side-nav__sub-item-text">Bank Verification</span>
                    </button>
                    <button type="button" className="tds-side-nav__sub-item">
                      {subItemIcon()}
                      <span className="tds-side-nav__sub-item-text">Electronic ID</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <button type="button" className="tds-side-nav__collapse-bar" aria-label="Collapse sidebar">
          {collapseIcon}
          <span className="tds-side-nav__collapse-label text-label-sm-uppercase">Hide Sidebar</span>
        </button>

        <div className="tds-side-nav__footer">
          <button type="button" className="tds-side-nav__profile">
            <span className="tds-side-nav__avatar">JD</span>
            <span className="tds-side-nav__profile-info">
              <span className="tds-side-nav__profile-name-row">
                <span className="tds-side-nav__profile-name">Jane Doe</span>
                <span className="tds-side-nav__profile-chevron">{chevronRightIcon}</span>
              </span>
              <span className="tds-side-nav__profile-email">janedoe@trulioo.com</span>
            </span>
          </button>
        </div>
      </aside>
    </div>
  );
}
