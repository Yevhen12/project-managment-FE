import styles from './DashboardCards.module.scss';

type Props = {
  title: string;
  status: 'To Do' | 'In Progress' | 'Done';
  priority: 'Low' | 'Medium' | 'High';
  sprint: string;
};

export const TaskCardItem = ({ title, status, priority, sprint }: Props) => {
  const statusColors = {
    'To Do': 'gray',
    'In Progress': 'orange',
    'Done': 'green',
  };

  const priorityColors = {
    Low: 'gray',
    Medium: 'black',
    High: 'red',
  };

  return (
    <div style={{ marginBottom: '0.75rem' }}>
      <div style={{ fontWeight: '600' }}>{title}</div>
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', fontSize: 12 }}>
        <span style={{ backgroundColor: statusColors[status], color: '#fff', padding: '2px 6px', borderRadius: 4 }}>{status}</span>
        <span style={{ backgroundColor: '#eee', color: priorityColors[priority], padding: '2px 6px', borderRadius: 4 }}>{priority}</span>
        <span style={{ color: '#555' }}>{sprint}</span>
      </div>
    </div>
  );
};
