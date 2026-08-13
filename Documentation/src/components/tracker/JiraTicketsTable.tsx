import jiraData from "../../data/jira-tickets.json";

type JiraTicket = {
  key: string;
  name: string;
  status: string;
  priority: string;
  assignee: string | null;
};

const STATUS_ORDER: Record<string, number> = {
  "In progress": 0,
  "Development Ready": 1,
  "Backlog": 2,
  "Completed": 3,
};

function statusClass(status: string): string {
  const slug = status.toLowerCase().replace(/\s+/g, "-");
  return `tds-preview__tracker-jira-status tds-preview__tracker-jira-status--${slug}`;
}

export function JiraTicketsTable() {
  const { tickets, baseUrl, lastSyncedAt } = jiraData as {
    tickets: JiraTicket[];
    baseUrl: string;
    lastSyncedAt: string;
  };

  const sorted = [...tickets].sort(
    (a, b) => (STATUS_ORDER[a.status] ?? 99) - (STATUS_ORDER[b.status] ?? 99),
  );

  const statusCounts = tickets.reduce<Record<string, number>>((acc, t) => {
    acc[t.status] = (acc[t.status] || 0) + 1;
    return acc;
  }, {});

  const syncDate = new Date(lastSyncedAt).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });

  return (
    <div className="tds-preview__tracker-jira">
      <div className="tds-preview__tracker-jira-summary">
        {Object.entries(statusCounts)
          .sort(([a], [b]) => (STATUS_ORDER[a] ?? 99) - (STATUS_ORDER[b] ?? 99))
          .map(([status, count]) => (
            <span key={status} className="tds-preview__tracker-jira-summary-item">
              <span className={statusClass(status)} />
              <span className="tds-preview__tracker-jira-summary-label">{status}</span>
              <strong className="tds-preview__tracker-jira-summary-count">{count}</strong>
            </span>
          ))}
      </div>

      <div className="tds-preview__tracker-canvas">
        <div className="tds-preview__tracker-table-wrap">
          <table className="tds-preview__tracker-table tds-preview__tracker-table--jira">
            <thead>
              <tr>
                <th scope="col">Ticket</th>
                <th scope="col">Component</th>
                <th scope="col">Status</th>
                <th scope="col">Priority</th>
                <th scope="col">Assignee</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((ticket) => (
                <tr key={ticket.key} className="tds-preview__tracker-jira-row">
                  <td>
                    <a
                      href={`${baseUrl}/${ticket.key}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="tds-preview__tracker-jira-key"
                    >
                      {ticket.key}
                    </a>
                  </td>
                  <th scope="row">
                    <span className="tds-preview__tracker-name">{ticket.name}</span>
                  </th>
                  <td>
                    <span className={statusClass(ticket.status)}>{ticket.status}</span>
                  </td>
                  <td>{ticket.priority}</td>
                  <td className="tds-preview__tracker-jira-assignee">
                    {ticket.assignee ?? "--"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <p className="tds-preview__tracker-table-meta">
        {tickets.length} tickets from{" "}
        <a
          href={`${baseUrl}/UT-134`}
          target="_blank"
          rel="noopener noreferrer"
          className="tds-preview__tracker-jira-key"
        >
          UT-134
        </a>
        {" "}-- last synced {syncDate}
      </p>
    </div>
  );
}
