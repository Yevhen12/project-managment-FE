import styles from './DashboardCards.module.scss';

type Props = {
  title: string;
  dueDate: string;
};

export const DeadlineItem = ({ title, dueDate }: Props) => (
  <div style={{ marginBottom: '0.75rem' }}>
    <div style={{ fontWeight: 600 }}>{title}</div>
    <div style={{ color: '#666', fontSize: 13 }}>— due {dueDate}</div>
  </div>
);
