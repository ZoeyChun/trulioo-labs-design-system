import type { GraphNodeData, CompanyData, IndividualData, AddressData, DocumentData } from '../../../types/graph';

interface OverviewProps {
  nodeData: GraphNodeData;
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1 px-3.5 py-3 rounded-xl bg-surface-overlay border border-border-subtle">
      <span className="text-[10px] font-medium text-text-muted uppercase tracking-widest">{label}</span>
      <span className="text-sm text-text-primary">{value}</span>
    </div>
  );
}

function CompanyOverviewFields({ entity }: { entity: CompanyData }) {
  return (
    <>
      <Field label="Jurisdiction" value={entity.jurisdiction} />
      <Field label="Registration No." value={entity.registrationNumber} />
      <Field label="Incorporated" value={entity.incorporationDate} />
      <Field label="Status" value={entity.status} />
      <Field label="Type" value={entity.companyType} />
      <Field label="Industry" value={entity.industry} />
    </>
  );
}

function IndividualOverviewFields({ entity }: { entity: IndividualData }) {
  return (
    <>
      <Field label="Role" value={entity.role} />
      <Field label="Nationality" value={entity.nationality} />
      <Field label="Date of Birth" value={entity.dateOfBirth} />
      <Field label="PEP Status" value={entity.pep ? 'Yes — Politically Exposed' : 'No'} />
      <Field label="Sanctions" value={entity.sanctioned ? 'Match Found' : 'Clear'} />
    </>
  );
}

function AddressOverviewFields({ entity }: { entity: AddressData }) {
  const fullAddress = [entity.line1, entity.line2, entity.city, entity.country, entity.postalCode]
    .filter(Boolean)
    .join(', ');

  return (
    <>
      <Field label="Full Address" value={fullAddress} />
      <Field label="Type" value={entity.addressType} />
      <Field label="Country" value={entity.country} />
    </>
  );
}

function DocumentOverviewFields({ entity }: { entity: DocumentData }) {
  return (
    <>
      <Field label="Document Type" value={entity.documentType} />
      <Field label="Date" value={entity.date} />
      <Field label="Status" value={entity.status} />
    </>
  );
}

export function Overview({ nodeData }: OverviewProps) {
  return (
    <div className="flex flex-col gap-2.5 p-4">
      {nodeData.entityType === 'company' && <CompanyOverviewFields entity={nodeData.entity} />}
      {nodeData.entityType === 'individual' && <IndividualOverviewFields entity={nodeData.entity} />}
      {nodeData.entityType === 'address' && <AddressOverviewFields entity={nodeData.entity} />}
      {nodeData.entityType === 'document' && <DocumentOverviewFields entity={nodeData.entity} />}
    </div>
  );
}
