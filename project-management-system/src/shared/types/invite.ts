export interface InvitePending {
  id: string;
  role: "admin" | "developer";
  status: "pending";
  createdAt: string;
  projectId: string;
  project: {
    id: string;
    name: string;
    description: string;
    createdAt: string;
  };
  teamSize: number;
  currentSprint: string;
  createdBy: {
    name: string;
    email: string;
  };
}
