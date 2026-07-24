import { FileText, CheckCircle, Clock, AlertCircle } from 'lucide-react';

interface DocumentEntry {
  title: string;
  type: string;
  date: string;
  status: 'verified' | 'pending' | 'expired';
}

const documents: DocumentEntry[] = [
  { title: 'Certificate of Incorporation', type: 'incorporation', date: '2015-03-14', status: 'verified' },
  { title: 'Annual Return 2024', type: 'annual-return', date: '2024-09-30', status: 'verified' },
  { title: 'Articles of Association', type: 'articles', date: '2015-03-14', status: 'verified' },
  { title: 'KYC Verification Report', type: 'kyc-report', date: '2023-06-10', status: 'expired' },
  { title: 'Share Transfer Agreement', type: 'agreement', date: '2022-11-15', status: 'pending' },
];

const statusConfig = {
  verified: { icon: CheckCircle, color: 'text-green-400', label: 'Verified' },
  pending: { icon: Clock, color: 'text-yellow-400', label: 'Pending' },
  expired: { icon: AlertCircle, color: 'text-red-400', label: 'Expired' },
};

export function Documents() {
  return (
    <div className="flex flex-col gap-2 p-4">
      {documents.map((doc, idx) => {
        const config = statusConfig[doc.status];
        const StatusIcon = config.icon;
        return (
          <div
            key={idx}
            className="flex items-center gap-3 px-3.5 py-3 rounded-xl bg-surface-overlay border border-border-subtle hover:border-border-default hover:bg-hover transition-all duration-200 cursor-pointer"
          >
            <FileText className="w-4 h-4 text-text-muted shrink-0" strokeWidth={1.5} />
            <div className="flex flex-col min-w-0 flex-1">
              <span className="text-sm text-text-primary truncate">{doc.title}</span>
              <span className="text-[10px] text-text-muted">{doc.date}</span>
            </div>
            <div className="flex items-center gap-1">
              <StatusIcon className={`w-3 h-3 ${config.color}`} strokeWidth={1.5} />
              <span className={`text-[10px] ${config.color}`}>{config.label}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
