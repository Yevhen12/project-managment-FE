import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import styles from './DashboardCards.module.scss';

const data = [
  { date: '2025-04-18', activity: 4 },
  { date: '2025-04-19', activity: 4.2 },
  { date: '2025-04-20', activity: 3.1 },
  { date: '2025-04-21', activity: 6 },
  { date: '2025-04-22', activity: 4 },
];

export const ProjectActivityChart = () => (
  <div style={{ height: 250 }}>
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="activity" stroke="#2563eb" strokeWidth={2} dot />
      </LineChart>
    </ResponsiveContainer>
  </div>
);
