type Props = {
  title: string;
  status: string;
  priority: string;
  sprint: string;
};

export const TaskCardItem = ({ title, status, priority, sprint }: Props) => {
  if (!title || !status || !priority) return null;

  const statusColors: Record<string, string> = {
    TO_DO: '#3b82f6',       
    IN_PROGRESS: '#f59e0b',  
    DONE: '#10b981',          
    REVIEW: '#8b5cf6',      
    QA_READY: '#ec4899',   
    QA_TESTING: '#0ea5e9',   
  };

  const priorityColors: Record<string, string> = {
    Low: '#a3e635',     
    Medium: '#facc15',  
    High: '#ef4444',    
  };

  return (
    <div style={{ marginBottom: '0.75rem' }}>
      <div style={{ fontWeight: 600, marginBottom: '4px' }}>{title}</div>
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', fontSize: 12 }}>
        <span
          style={{
            backgroundColor: statusColors[status] || '#9ca3af',
            color: '#fff',
            padding: '2px 8px',
            borderRadius: 12,
            fontWeight: 500,
          }}
        >
          {status}
        </span>

        <span
          style={{
            backgroundColor: priorityColors[priority] || '#d1d5db',
            color: '#111827',
            padding: '2px 8px',
            borderRadius: 12,
            fontWeight: 500,
          }}
        >
          {priority}
        </span>

        <span style={{ color: '#6b7280' }}>{sprint}</span>
      </div>
    </div>
  );
};
