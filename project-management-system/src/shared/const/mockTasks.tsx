//@ts-nocheck

import { Bug, Rocket, Landmark } from "lucide-react";
import { Task } from "../types/task";

export const mockTasks: Task[] = [
  {
    id: "BFL-4017",
    title: "[MOBILE] Restricted Items Bug - PDP",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate nemo, repudiandae, reiciendis rerum quos aut dolore voluptas sint delectus quis recusandae mollitia eveniet ab eligendi iste corporis iusto necessitatibus dolores! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nesciunt hic iste repellendus aspernatur qui, quam consequuntur error perspiciatis sunt, optio in! Ad qui commodi maiores deserunt! Natus maiores cupiditate dolore.",
    status: "to_do",
    assignee: "Abdul Razack",
    assigneeAvatar: "AR",
    type: 'bug',
    reporter: "Anuradha Rajender",
    reporterAvatar: "AR",
    labels: ["MOBILE"],
    priority: "medium",
    estimate: "2d",
    sprintName: "Sprint - 7",
    devStart: "2025-02-27",
    devEnd: "2025-02-27",
    qaStart: "2025-03-10",
    qaEnd: "2025-03-11",
    attachments: [
      {
        id: "1",
        name: "example-image.png",
        url: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=3538&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        type: "image",
      },
      {
        id: "1",
        name: "example-image.png",
        url: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=3538&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        type: "image",
      },
      {
        id: "1",
        name: "example-image.png",
        url: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=3538&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        type: "file",
      }
    ]
    
  },
  {
    id: "BFL-4018",
    title: "[MOBILE] Restricted Items Bug - PDP",
    description: "As discussed found two bugs for restricted items on PDP and cart page...",
    status: "to_do",
    assignee: "Abdul Razack",
    assigneeAvatar: "AR",
    type: 'bug',
    reporter: "Anuradha Rajender",
    reporterAvatar: "AR",
    labels: ["MOBILE"],
    priority: "high",
    estimate: "2d",
    devStart: "2025-02-27",
    devEnd: "2025-02-27",
    qaStart: "2025-03-10",
    qaEnd: "2025-03-11",
    attachments: [
      {
        id: "2",
        name: "example-image.png",
        url: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=3538&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        type: "image",
      }
    ]
    
  },
  {
    id: "BFL-4019",
    title: "[MOBILE] Restricted Items Bug - PDP",
    description: "As discussed found two bugs for restricted items on PDP and cart page...",
    status: "to_do",
    assignee: "Abdul Razack",
    assigneeAvatar: "AR",
    type: 'bug',
    reporter: "Anuradha Rajender",
    reporterAvatar: "AR",
    labels: ["MOBILE"],
    priority: "high",
    estimate: "2d",
    devStart: "2025-02-27",
    devEnd: "2025-02-27",
    qaStart: "2025-03-10",
    qaEnd: "2025-03-11",
  },
];
