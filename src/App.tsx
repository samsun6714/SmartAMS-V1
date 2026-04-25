import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "./components/layout/Layout";

import { AssetListPage } from "./pages/AssetListPage";
import { DashboardPage } from "./pages/DashboardPage";
import { AuditPage } from "./pages/AuditPage";

const History = () => <div className="card p-8 text-center text-slate-400">History Component (Coming Soon)</div>;
const Reports = () => <div className="card p-8 text-center text-slate-400">Reports Component (Coming Soon)</div>;
const Users = () => <div className="card p-8 text-center text-slate-400">Users Component (Coming Soon)</div>;
const Settings = () => <div className="card p-8 text-center text-slate-400">Settings Component (Coming Soon)</div>;

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<DashboardPage />} />
          <Route path="assets" element={<AssetListPage />} />
          <Route path="history" element={<History />} />
          <Route path="audit" element={<AuditPage />} />
          <Route path="reports" element={<Reports />} />
          <Route path="users" element={<Users />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
}
