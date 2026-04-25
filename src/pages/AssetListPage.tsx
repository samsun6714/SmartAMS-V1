import { useState, useEffect } from "react";
import { Plus, Filter, Download, MoreHorizontal, Eye, Edit3, Trash2 } from "lucide-react";
import { assetService } from "../services/assetService";
import { Asset } from "../types";
import { STATUS_CONFIG, CATEGORY_CONFIG } from "../constants";
import { motion, AnimatePresence } from "motion/react";
import { AssetForm } from "../components/assets/AssetForm";
import { AssetDetailModal } from "../components/assets/AssetDetailModal";

export function AssetListPage() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingAsset, setEditingAsset] = useState<Asset | undefined>(undefined);
  const [viewingAsset, setViewingAsset] = useState<Asset | undefined>(undefined);

  const fetchAssets = async () => {
    setLoading(true);
    try {
      const data = await assetService.getAssets();
      setAssets(data);
    } catch (error) {
      console.error("Failed to fetch assets:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssets();
  }, []);

  const handleCreateAsset = async (assetData: Omit<Asset, "id">) => {
    try {
      await assetService.createAsset(assetData);
      setIsFormOpen(false);
      fetchAssets(); // Refresh list
    } catch (error) {
      alert("Failed to create asset");
    }
  };

  const handleEditAsset = (asset: Asset) => {
    setEditingAsset(asset);
    setIsFormOpen(true);
  };

  const handleDeleteAsset = async (id: string) => {
    if (window.confirm("คุณต้องการลบสินทรัพย์นี้ใช่หรือไม่?")) {
      // In a real app, call service.deleteAsset
      setAssets(prev => prev.filter(a => a.id !== id));
    }
  };

  const filteredAssets = assets.filter(asset => 
    asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    asset.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    asset.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-extrabold tracking-tight text-text-main">Asset Inventory</h2>
          <p className="text-sm text-text-muted">Manage and track organizational resources across nodes.</p>
        </div>
        <button 
          onClick={() => {
            setEditingAsset(undefined);
            setIsFormOpen(true);
          }}
          className="btn-primary shadow-lg shadow-accent/20"
        >
          <Plus className="h-4 w-4" />
          Add Resource
        </button>
      </header>

      <div className="card !p-4 flex flex-col md:flex-row gap-4 bg-bg-sidebar/30">
        <div className="flex-1 relative">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted h-4 w-4" />
          <input
            type="text"
            placeholder="Search by ID, name, or location..."
            className="w-full bg-bg-sidebar/50 border border-border-sleek rounded-xl py-2.5 pl-10 pr-4 text-xs font-medium text-text-main placeholder:text-text-muted/50 focus:ring-1 focus:ring-accent outline-none transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <select className="bg-bg-sidebar/50 border border-border-sleek rounded-xl py-2 px-3 text-xs font-bold text-text-main focus:ring-1 focus:ring-accent outline-none">
            <option value="">All Categories</option>
            {Object.entries(CATEGORY_CONFIG).map(([key, config]) => (
              <option key={key} value={key}>{config.label}</option>
            ))}
          </select>
          <select className="bg-bg-sidebar/50 border border-border-sleek rounded-xl py-2 px-3 text-xs font-bold text-text-main focus:ring-1 focus:ring-accent outline-none">
            <option value="">All Statuses</option>
            {Object.entries(STATUS_CONFIG).map(([key, config]) => (
              <option key={key} value={key}>{config.label}</option>
            ))}
          </select>
          <button className="p-2.5 border border-border-sleek rounded-xl hover:bg-white/5 text-text-muted transition-colors">
            <Download className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="card !p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-white/5 text-text-muted uppercase text-[10px] font-bold tracking-widest border-b border-border-sleek/50">
              <tr>
                <th className="px-6 py-5">Node ID</th>
                <th className="px-6 py-5">Item Details</th>
                <th className="px-6 py-5">Classification</th>
                <th className="px-6 py-5">Allocation</th>
                <th className="px-6 py-5">Condition</th>
                <th className="px-6 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-sleek/30">
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td colSpan={6} className="px-6 py-5">
                      <div className="h-4 bg-white/5 rounded w-full"></div>
                    </td>
                  </tr>
                ))
              ) : filteredAssets.length > 0 ? (
                filteredAssets.map((asset) => {
                  const statusInfo = STATUS_CONFIG[asset.status];
                  const categoryInfo = CATEGORY_CONFIG[asset.category];
                  const StatusIcon = statusInfo.icon;
                  const CategoryIcon = categoryInfo.icon;

                  return (
                    <motion.tr 
                      key={asset.id} 
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="hover:bg-white/5 transition-colors group cursor-default"
                    >
                      <td className="px-6 py-5 font-mono text-[11px] font-bold text-accent">{asset.code}</td>
                      <td className="px-6 py-5">
                        <div className="font-bold text-text-main text-[13px]">{asset.name}</div>
                        <div className="text-[10px] text-text-muted mt-1 uppercase font-bold tracking-tight">Sync: {asset.purchaseDate}</div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-2 text-text-muted">
                          <CategoryIcon className="h-3.5 w-3.5 opacity-60" />
                          <span className="text-[11px] font-bold uppercase tracking-tight">{categoryInfo.label}</span>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="text-xs font-bold text-text-main">{asset.location}</div>
                        <div className="text-[10px] text-text-muted mt-0.5 font-medium">{asset.department}</div>
                      </td>
                      <td className="px-6 py-5">
                        <span className={`status-badge ${statusInfo.color} flex items-center gap-1.5 w-fit`}>
                          <StatusIcon className="h-2.5 w-2.5" />
                          {statusInfo.label}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-right">
                        <div className="flex items-center justify-end gap-3">
                          <button 
                            onClick={() => setViewingAsset(asset)}
                            className="p-1 px-2 text-[10px] font-bold uppercase tracking-widest text-text-muted hover:text-accent transition-all bg-white/5 rounded-md"
                          >
                            Read
                          </button>
                          <button 
                            onClick={() => handleEditAsset(asset)}
                            className="p-1 px-2 text-[10px] font-bold uppercase tracking-widest text-text-muted hover:text-indigo-400 transition-all bg-white/5 rounded-md"
                          >
                            Edit
                          </button>
                          <button 
                            onClick={() => handleDeleteAsset(asset.id)}
                            className="p-1 px-2 text-[10px] font-bold uppercase tracking-widest text-text-muted hover:text-red-400 transition-all bg-white/5 rounded-md"
                          >
                            Del
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-text-muted">
                    <p className="font-bold uppercase tracking-widest text-xs opacity-50">Empty result set</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="bg-white/5 px-6 py-4 flex items-center justify-between border-t border-border-sleek/50">
          <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-text-muted">
            Found {filteredAssets.length} nodes
          </p>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 border border-border-sleek rounded-lg text-[10px] font-bold uppercase text-text-muted hover:bg-white/5 disabled:opacity-30 transition-all" disabled>Prev</button>
            <button className="px-4 py-1.5 bg-accent text-bg-main rounded-lg text-[10px] font-extrabold uppercase transition-all">1</button>
            <button className="px-3 py-1.5 border border-border-sleek rounded-lg text-[10px] font-bold uppercase text-text-muted hover:bg-white/5 transition-all">Next</button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isFormOpen && (
          <AssetForm 
            onClose={() => setIsFormOpen(false)} 
            onSubmit={handleCreateAsset}
            initialData={editingAsset}
          />
        )}
        {viewingAsset && (
          <AssetDetailModal 
            asset={viewingAsset} 
            onClose={() => setViewingAsset(undefined)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}
