import React, { useState } from "react";
import { X, Save, AlertCircle } from "lucide-react";
import { Asset, AssetCategory, AssetStatus } from "../../types";
import { CATEGORY_CONFIG, DEPARTMENTS } from "../../constants";
import { motion } from "motion/react";

interface AssetFormProps {
  onClose: () => void;
  onSubmit: (asset: Omit<Asset, "id">) => void;
  initialData?: Asset;
}

export function AssetForm({ onClose, onSubmit, initialData }: AssetFormProps) {
  const [formData, setFormData] = useState<Omit<Asset, "id">>(
    initialData || {
      code: "",
      name: "",
      category: AssetCategory.IT_EQUIPMENT,
      status: AssetStatus.ACTIVE,
      location: "",
      department: DEPARTMENTS[0],
      purchaseDate: new Date().toISOString().split("T")[0],
      purchasePrice: 0,
      condition: "good",
      description: "",
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-end bg-bg-main/60 backdrop-blur-sm">
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="w-full max-w-2xl bg-bg-sidebar h-screen shadow-[0_0_50px_rgba(0,0,0,0.5)] flex flex-col border-l border-border-sleek"
      >
        <div className="px-8 py-6 border-b border-white/5 flex items-center justify-between bg-white/2">
          <div>
            <h3 className="text-xl font-black text-text-main tracking-tight leading-none mb-1">
              {initialData ? "Modify Resource" : "Register Resource"}
            </h3>
            <p className="text-[10px] text-text-muted font-bold uppercase tracking-widest leading-none mt-1 opacity-50">Logistics Node Protocol</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2.5 hover:bg-white/5 rounded-xl transition-colors text-text-muted hover:text-text-main"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-8 space-y-10">
          <div className="space-y-6">
            <h4 className="text-[10px] font-bold text-text-muted uppercase tracking-[0.2em] opacity-50 border-b border-white/5 pb-2">Identity Matrix</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-text-muted uppercase tracking-wider ml-1">Node Code</label>
                <input
                  required
                  type="text"
                  placeholder="IT-NODE-001"
                  className="w-full bg-white/2 border border-white/5 rounded-xl py-3 px-4 text-sm font-mono font-bold text-accent placeholder:text-text-muted/20 focus:ring-1 focus:ring-accent outline-none transition-all"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-text-muted uppercase tracking-wider ml-1">Identifier</label>
                <input
                  required
                  type="text"
                  placeholder="Asset Alias"
                  className="w-full bg-white/2 border border-white/5 rounded-xl py-3 px-4 text-sm font-bold text-text-main placeholder:text-text-muted/20 focus:ring-1 focus:ring-accent outline-none transition-all"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-[10px] font-bold text-text-muted uppercase tracking-[0.2em] opacity-50 border-b border-white/5 pb-2">Specification</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-text-muted uppercase tracking-wider ml-1">Classification</label>
                <select
                  className="w-full bg-white/2 border border-white/5 rounded-xl py-3 px-4 text-sm font-bold text-text-main focus:ring-1 focus:ring-accent outline-none transition-all appearance-none cursor-pointer"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as AssetCategory })}
                >
                  {Object.entries(CATEGORY_CONFIG).map(([key, config]) => (
                    <option key={key} value={key} className="bg-bg-sidebar">{config.label}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-text-muted uppercase tracking-wider ml-1">Integrity Level</label>
                <select
                  className="w-full bg-white/2 border border-white/5 rounded-xl py-3 px-4 text-sm font-bold text-text-main focus:ring-1 focus:ring-accent outline-none transition-all appearance-none cursor-pointer"
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as AssetStatus })}
                >
                  <option value={AssetStatus.ACTIVE} className="bg-bg-sidebar">Operational</option>
                  <option value={AssetStatus.MAINTENANCE} className="bg-bg-sidebar">Offline (Refit)</option>
                  <option value={AssetStatus.DISPOSED} className="bg-bg-sidebar">Decommissioned</option>
                  <option value={AssetStatus.MISSING} className="bg-bg-sidebar">Signal Lost</option>
                </select>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-[10px] font-bold text-text-muted uppercase tracking-[0.2em] opacity-50 border-b border-white/5 pb-2">Deployment</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-text-muted uppercase tracking-wider ml-1">Physical Node</label>
                <input
                  type="text"
                  placeholder="Sector / Zone"
                  className="w-full bg-white/2 border border-white/5 rounded-xl py-3 px-4 text-sm font-bold text-text-main placeholder:text-text-muted/20 focus:ring-1 focus:ring-accent outline-none transition-all"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-text-muted uppercase tracking-wider ml-1">Organizational Unit</label>
                <select
                  className="w-full bg-white/2 border border-white/5 rounded-xl py-3 px-4 text-sm font-bold text-text-main focus:ring-1 focus:ring-accent outline-none transition-all appearance-none cursor-pointer"
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                >
                  {DEPARTMENTS.map((dept) => (
                    <option key={dept} value={dept} className="bg-bg-sidebar">{dept}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-[10px] font-bold text-text-muted uppercase tracking-[0.2em] opacity-50 border-b border-white/5 pb-2">Acquisition</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-text-muted uppercase tracking-wider ml-1">Sync Date</label>
                <input
                  type="date"
                  className="w-full bg-white/2 border border-white/5 rounded-xl py-3 px-4 text-sm font-bold text-text-main focus:ring-1 focus:ring-accent outline-none transition-all [color-scheme:dark]"
                  value={formData.purchaseDate}
                  onChange={(e) => setFormData({ ...formData, purchaseDate: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-text-muted uppercase tracking-wider ml-1">Net Valuation (฿)</label>
                <input
                  type="number"
                  placeholder="0.00"
                  className="w-full bg-white/2 border border-white/5 rounded-xl py-3 px-4 text-sm font-bold text-text-main placeholder:text-text-muted/20 focus:ring-1 focus:ring-accent outline-none transition-all"
                  value={formData.purchasePrice}
                  onChange={(e) => setFormData({ ...formData, purchasePrice: parseFloat(e.target.value) })}
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <label className="text-[11px] font-bold text-text-muted uppercase tracking-wider ml-1 opacity-50">Resource Condition (Visual)</label>
            <div className="flex gap-4 p-4 bg-white/2 border border-white/5 rounded-2xl">
              {["good", "fair", "poor", "broken"].map((c) => (
                <label key={c} className="flex items-center gap-3 cursor-pointer group flex-1">
                  <div className="relative flex items-center justify-center">
                    <input
                      type="radio"
                      name="condition"
                      value={c}
                      checked={formData.condition === c}
                      onChange={() => setFormData({ ...formData, condition: c as any })}
                      className="sr-only"
                    />
                    <div className={`h-4 w-4 rounded-full border-2 transition-all ${formData.condition === c ? 'border-accent bg-accent' : 'border-white/20 group-hover:border-white/40'}`} />
                  </div>
                  <span className={`text-[10px] font-bold uppercase tracking-widest transition-all ${formData.condition === c ? 'text-accent' : 'text-text-muted opacity-50 group-hover:opacity-100'}`}>{c}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[11px] font-bold text-text-muted uppercase tracking-wider ml-1 opacity-50">Persistent Metadata</label>
            <textarea
              rows={4}
              placeholder="Additional node telemetry or notes..."
              className="w-full bg-white/2 border border-white/5 rounded-2xl py-4 px-4 text-sm font-medium text-text-main placeholder:text-text-muted/20 focus:ring-1 focus:ring-accent outline-none resize-none transition-all"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>
        </form>

        <div className="px-8 py-6 border-t border-white/5 bg-white/2 flex items-center justify-end gap-4 mt-auto">
          <button 
            type="button"
            onClick={onClose}
            className="px-6 py-3 text-[11px] font-bold uppercase tracking-widest text-text-muted hover:bg-white/5 hover:text-text-main rounded-xl transition-all"
          >
            Abort
          </button>
          <button 
            onClick={handleSubmit}
            className="px-8 py-3 bg-accent text-bg-main rounded-xl font-black text-[11px] uppercase tracking-widest shadow-lg shadow-accent/20 transition-all hover:brightness-110 active:scale-95 flex items-center gap-2"
          >
            <Save className="h-4 w-4" />
            {initialData ? "Commit Updates" : "Register Node"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
