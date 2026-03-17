import { useState } from "react";

const initialData = {
  team: [
    { id: 1, name: "Cynthia Okwu", role: "Operations & Content", location: "Lagos, Nigeria", status: "Pending Start", checkIn: "Daily", color: "#E8B86D" },
    { id: 2, name: "Deborah Onimole", role: "Sales & Client Relations", location: "Lagos, Nigeria", status: "Pending Start", checkIn: "Daily", color: "#7EB8A4" },
    { id: 3, name: "Angel Ariyibi", role: "AI & Strategy Consultant", location: "Ireland", status: "Pending Start", checkIn: "Weekly", color: "#A78BCA" },
  ],
  tasks: [
    { id: 1, assignee: "Cynthia Okwu", task: "Build California retailer database (50 bike shops)", priority: "High", status: "To Do", market: "USA" },
    { id: 2, assignee: "Cynthia Okwu", task: "Build Ireland retailer database (50 bike shops)", priority: "High", status: "To Do", market: "Ireland" },
    { id: 3, assignee: "Cynthia Okwu", task: "Set up VBM social media content calendar", priority: "Medium", status: "To Do", market: "Both" },
    { id: 4, assignee: "Deborah Onimole", task: "Draft cold email outreach templates for retailers", priority: "High", status: "To Do", market: "Both" },
    { id: 5, assignee: "Deborah Onimole", task: "Begin outreach to 20 California retailers", priority: "High", status: "To Do", market: "USA" },
    { id: 6, assignee: "Deborah Onimole", task: "Build WhatsApp follow-up sequences", priority: "Medium", status: "To Do", market: "Both" },
    { id: 7, assignee: "Angel Ariyibi", task: "Audit VBM operations — identify AI automation opportunities", priority: "High", status: "To Do", market: "Both" },
    { id: 8, assignee: "Angel Ariyibi", task: "Set up AI-powered outreach assistant", priority: "Medium", status: "To Do", market: "Both" },
    { id: 9, assignee: "Angel Ariyibi", task: "Ireland retailer strategy call with Aaron", priority: "High", status: "To Do", market: "Ireland" },
  ],
  pipeline: [
    { id: 1, retailer: "Cycle Superstore", location: "Dublin, Ireland", stage: "Not Contacted" },
    { id: 2, retailer: "360 Cycles", location: "Dublin, Ireland", stage: "Not Contacted" },
    { id: 3, retailer: "Joe Daly Cycles", location: "Dundrum, Ireland", stage: "Not Contacted" },
    { id: 4, retailer: "ThinkBike", location: "Dublin, Ireland", stage: "Not Contacted" },
    { id: 5, retailer: "California Retailer 1", location: "Los Angeles, CA", stage: "Not Contacted" },
    { id: 6, retailer: "California Retailer 2", location: "San Diego, CA", stage: "Not Contacted" },
  ],
  checkins: [],
  salesTeam: [
    { id: 1, name: "Sales Rep 1", market: "USA", revenue: 0, target: 50000, deals: 0, rank: 1 },
    { id: 2, name: "Sales Rep 2", market: "Ireland", revenue: 0, target: 40000, deals: 0, rank: 2 },
    { id: 3, name: "Sales Rep 3", market: "USA", revenue: 0, target: 50000, deals: 0, rank: 3 },
    { id: 4, name: "Sales Rep 4", market: "Ireland", revenue: 0, target: 40000, deals: 0, rank: 4 },
    { id: 5, name: "Sales Rep 5", market: "USA", revenue: 0, target: 50000, deals: 0, rank: 5 },
  ],
};

const priorityColor = { High: "#E8534A", Medium: "#E8B86D", Low: "#7EB8A4" };
const stageColor = {
  "Not Contacted": "#555",
  "Contacted": "#E8B86D",
  "Meeting Booked": "#A78BCA",
  "Demo Done": "#5BA4D4",
  "Order Placed": "#7EB8A4",
  "Recurring": "#E8534A",
};
const taskStatusColor = { "To Do": "#555", "In Progress": "#E8B86D", "Done": "#7EB8A4" };

export default function App() {
  const [data, setData] = useState(initialData);
  const [activeTab, setActiveTab] = useState("overview");
  const [newCheckin, setNewCheckin] = useState({ member: "", note: "" });
  const [newTask, setNewTask] = useState({ assignee: "", task: "", priority: "Medium", status: "To Do", market: "Both" });
  const [showAddTask, setShowAddTask] = useState(false);
  const [showAddCheckin, setShowAddCheckin] = useState(false);
  const [editingSale, setEditingSale] = useState(null);
  const [showAddRep, setShowAddRep] = useState(false);
  const [newRep, setNewRep] = useState({ name: "", market: "USA", revenue: 0, target: 50000, deals: 0 });

  const tabs = ["overview", "team", "tasks", "pipeline", "checkins", "sales team"];

  const tasksByAssignee = (name) => data.tasks.filter(t => t.assignee === name);
  const doneCount = data.tasks.filter(t => t.status === "Done").length;
  const inProgressCount = data.tasks.filter(t => t.status === "In Progress").length;
  const pipelineActive = data.pipeline.filter(p => p.stage !== "Not Contacted").length;
  const totalRevenue = data.salesTeam.reduce((s, r) => s + r.revenue, 0);
  const totalTarget = data.salesTeam.reduce((s, r) => s + r.target, 0);

  const updateTaskStatus = (id, status) => {
    setData(d => ({ ...d, tasks: d.tasks.map(t => t.id === id ? { ...t, status } : t) }));
  };

  const updatePipelineStage = (id, stage) => {
    setData(d => ({ ...d, pipeline: d.pipeline.map(p => p.id === id ? { ...p, stage } : p) }));
  };

  const updateSalesRep = (id, field, value) => {
    setData(d => {
      const updated = d.salesTeam.map(r => r.id === id ? { ...r, [field]: field === "name" ||
