# Changelog

All notable changes to the Trulioo Design System (Components, Tokens, Scripts) are documented here.
This file tracks DS deliverables only — portal demos, pages, and assets are not versioned.

Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).
Versioning follows [Semantic Versioning](https://semver.org/).

## [1.0.0] — 2026-10-23

Initial baseline of all DS components, tokens, and scripts on the repository.

### Components (34)

- Accordion (`Components/accordion/`)
- Alert (`Components/announcement/`)
- AI Tag (`Components/ai-tag/`)
- Breadcrumb (`Components/breadcrumb/`)
- Button (`Components/button/`)
- ButtonGroup (`Components/button-group/`)
- ButtonMenu (`Components/button-menu/`)
- Checkbox (`Components/checkbox/`)
- CounterLabel (`Components/counter-label/`)
- DataField (`Components/data-field/`)
- DataTable (`Components/data-table/`) — includes SortButton sub-part
- DatePicker (`Components/date-picker/`)
- Dialog (`Components/dialog/`)
- FilterButton (`Components/filter-button/`)
- FilterTab (`Components/filter-tab/`)
- FlagIcon (`Components/flag-icon/`)
- IconButton (`Components/icon-button/`)
- RadioCard (`Components/radio-card/`)
- RadioGroup (`Components/radio-group/`)
- RiskCategoryCard (`Components/risk-category-card/`)
- RiskCategoryStrip (`Components/risk-category-strip/`)
- ScoreGauge (`Components/score-gauge/`)
- SectionHeader (`Components/section-header/`)
- SegmentedControl (`Components/segmented-control/`)
- Select (`Components/select/`) — includes Combobox
- SideNav (`Components/side-nav/`) — includes NavItem, NavList, Icons sub-parts
- Spinner (`Components/spinner/`)
- StatCard (`Components/stat-card/`)
- Stepper (`Components/progress-indicator/`)
- Switch (`Components/switch/`)
- Tabs (`Components/tabs/`) — includes TabItem sub-part
- TextInput (`Components/text-input/`)
- Textarea (`Components/textarea/`)
- Tooltip (`Components/tooltip/`)

### Shared Atoms (7)

- Caret (`Components/_shared/caret/`)
- DropdownPanel (`Components/_shared/dropdown-panel/`)
- FieldCaption (`Components/_shared/field-caption/`)
- FieldLabel (`Components/_shared/field-label/`)
- FieldValidation (`Components/_shared/field-validation/`)
- Radio (`Components/_shared/radio/`)
- Tag (`Components/_shared/tag/`)

### Tokens

- Design tokens (`tokens/tokens.css`)
- Font definitions (`tokens/fonts.css`)
- Inter font files (`tokens/fonts/`)

### Scripts

- `scripts/build-shared-atoms-bundle.mjs`
- `scripts/build-preview.mjs`
- `scripts/check-component-duplicates.py`
