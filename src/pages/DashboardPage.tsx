import { useState, useEffect } from "react";
import { assetService } from "../services/assetService";
import { Asset, AssetStatus } from "../types";
import { STATUS_CONFIG, CATEGORY_CONFIG } from "../constants";
import { TrendingUp, AlertTriangle, CheckCircle2, History } from "lucide-react";
import { motion } from "motion/react";

export function DashboardPage() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAssets = async () => {
      const data = await assetService.getAssets();
      setAssets(data);
      setLoading(false);
    };
    fetchAssets();
  }, []);

  const stats = {
    total: assets.length,
    active: assets.filter(a => a.status === AssetStatus.ACTIVE).length,
    maintenance: assets.filter(a => a.status === AssetStatus.MAINTENANCE).length,
    missing: assets.filter(a => a.status === AssetStatus.MISSING).length,
    totalValue: assets.reduce((sum, a) => sum + (a.purchasePrice || 0), 0),
  };

  const recentAssets = [...assets].sort((a, b) => new Date(b.purchaseDate).getTime() - new Date(a.purchaseDate).getTime()).slice(0, 5);

  return (
    <div className="space-y-8">
      <header className="flex flex-col gap-1">
        <h2 className="text-2xl font-extrabold tracking-tight text-text-main">Global Overview</h2>
        <p className="text-sm text-text-muted">Welcome back. Your asset inventory is currently synchronized.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Total Assets", value: stats.total, trend: "↑ 12.5% this month", icon: TrendingUp, color: "text-accent", border: "border-accent/20" },
          { label: "Active Nodes", value: stats.active, trend: `↑ ${((stats.active/stats.total)*100 || 0).toFixed(0)}% ready`, icon: CheckCircle2, color: "text-emerald-400", border: "border-emerald-500/20" },
          { label: "Maintenance", value: stats.maintenance, trend: "↓ 4 items from last week", icon: AlertTriangle, color: "text-amber-400", border: "border-amber-500/20" },
          { label: "Inventory Value", value: stats.totalValue.toLocaleString(), trend: "↑ 8.2% vs yesterday", icon: TrendingUp, color: "text-indigo-400", border: "border-indigo-500/20" },
        ].map((stat, i) => (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className={`card flex flex-col gap-4 group hover:border-accent/40 transition-all`}
          >
            <div className="flex justify-between items-start">
              <span className="text-[11px] font-bold text-text-muted uppercase tracking-wider">{stat.label}</span>
              <stat.icon className={`h-4 w-4 ${stat.color} opacity-70`} />
            </div>
            <div>
              <h3 className="text-3xl font-bold tracking-tight text-text-main">{stat.value}</h3>
              <p className={`text-[10px] font-bold mt-2 ${stat.color} brightness-125`}>{stat.trend}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 card !p-0 overflow-hidden">
          <div className="p-6 border-b border-border-sleek flex items-center justify-between bg-white/5">
            <h3 className="font-bold text-sm tracking-tight text-text-main uppercase tracking-widest opacity-80">Sync Activity</h3>
            <button className="text-[10px] font-bold text-accent uppercase tracking-widest hover:underline">View History</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="text-text-muted uppercase text-[10px] font-bold tracking-widest border-b border-border-sleek/50">
                <tr>
                  <th className="px-6 py-4">Node ID</th>
                  <th className="px-6 py-4">Resource</th>
                  <th className="px-6 py-4">Timestamp</th>
                  <th className="px-6 py-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-sleek/30">
                {recentAssets.map((asset) => (
                  <tr key={asset.id} className="hover:bg-white/5 transition-colors group">
                    <td className="px-6 py-4 font-mono text-[11px] font-bold text-accent">{asset.code}</td>
                    <td className="px-6 py-4 font-semibold text-text-main text-sm">{asset.name}</td>
                    <td className="px-6 py-4 text-text-muted text-xs font-medium">{asset.purchaseDate}</td>
                    <td className="px-6 py-4 text-right">
                      <span className={`status-badge ${STATUS_CONFIG[asset.status].color}`}>
                        {STATUS_CONFIG[asset.status].label}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card !p-6 space-y-6">
          <div className="flex items-center gap-2">
            <History className="h-4 w-4 text-accent" />
            <h3 className="font-bold text-sm text-text-main uppercase tracking-widest opacity-80">Stream</h3>
          </div>
          <div className="space-y-6 relative before:absolute before:left-[7px] before:top-2 before:bottom-2 before:w-px before:bg-border-sleek">
            {[
              { label: "Production", detail: "build succeeded for v2.4.1", time: "2 mins ago", color: "bg-accent" },
              { label: "Deployment", detail: "pushed 4 commits to main", time: "15 mins ago", color: "bg-indigo-400" },
              { label: "Alert", detail: "high latency API-US-EAST", time: "1 hour ago", color: "bg-amber-400" },
              { label: "Environment", detail: "staging refreshed", time: "3 hours ago", color: "bg-emerald-400" },
            ].map((item, i) => (
              <div key={i} className="flex gap-4 relative">
                <div className={`h-3.5 w-3.5 rounded-full border-[3px] border-bg-main ${item.color} shadow-sm z-10 mt-1`} />
                <div className="flex-1">
                  <p className="text-xs">
                    <span className="font-bold text-text-main">{item.label}</span>
                    <span className="ml-1 text-text-muted font-medium">{item.detail}</span>
                  </p>
                  <p className="text-[10px] text-text-muted mt-1 uppercase font-bold tracking-tight">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
