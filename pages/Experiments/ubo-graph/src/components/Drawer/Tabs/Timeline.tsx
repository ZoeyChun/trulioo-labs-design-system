const timelineEvents = [
  { date: '2024-09-30', event: 'Annual return filed', type: 'filing' },
  { date: '2024-06-15', event: 'Director change registered', type: 'change' },
  { date: '2024-03-01', event: 'Address updated', type: 'change' },
  { date: '2023-12-10', event: 'KYC review completed', type: 'review' },
  { date: '2023-09-28', event: 'Annual return filed', type: 'filing' },
  { date: '2023-06-01', event: 'Shareholder change', type: 'change' },
  { date: '2022-11-15', event: 'Share transfer agreement signed', type: 'agreement' },
  { date: '2015-03-14', event: 'Company incorporated', type: 'incorporation' },
];

const typeDotColor: Record<string, string> = {
  filing: 'bg-indigo-400',
  change: 'bg-amber-400',
  review: 'bg-emerald-400',
  agreement: 'bg-accent',
  incorporation: 'bg-violet-400',
};

export function Timeline() {
  return (
    <div className="flex flex-col p-4">
      <div className="relative pl-6">
        <div className="absolute left-[7px] top-2 bottom-2 w-px bg-border-subtle" />
        {timelineEvents.map((event, idx) => (
          <div key={idx} className="relative flex gap-3 pb-5 last:pb-0">
            <div className={`absolute left-[-17px] top-1.5 w-2 h-2 rounded-full ${typeDotColor[event.type] ?? 'bg-text-muted'} ring-2 ring-surface`} />
            <div className="flex flex-col">
              <span className="text-[10px] text-text-muted font-mono">{event.date}</span>
              <span className="text-sm text-text-primary">{event.event}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
