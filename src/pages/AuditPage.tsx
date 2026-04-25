import { useState, useEffect } from "react";
import { assetService } from "../services/assetService";
import { Asset, AssetStatus } from "../types";
import { Check, X, ShieldAlert, Search, Camera } from "lucide-react";
import { motion } from "motion/react";

export function AuditPage() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [auditedIds, setAuditedIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAssets = async () => {
      const data = await assetService.getAssets();
      // Only audit active assets for now
      setAssets(data.filter(a => a.status === AssetStatus.ACTIVE));
      setLoading(false);
    };
    fetchAssets();
  }, []);

  const toggleAudit = (id: string) => {
    const newSet = new Set(auditedIds);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setAuditedIds(newSet);
  };

  const progress = (auditedIds.size / assets.length) * 100 || 0;

  return (
    <div className="space-y-6">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-extrabold tracking-tight text-text-main">Global Audit</h2>
          <p className="text-sm text-text-muted">Verify physical presence of organizational resources.</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-bg-main rounded-lg font-bold shadow-lg shadow-emerald-500/20 hover:brightness-110 transition-all">
            <Camera className="h-4 w-4" />
            Scanner Active
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <div className="card border-t-2 border-t-emerald-500 !p-6">
            <h3 className="font-bold text-xs uppercase tracking-widest text-text-muted mb-6">Cycle Progress</h3>
            <div className="relative h-32 w-32 mx-auto mb-6">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <circle
                  className="stroke-white/5 fill-none"
                  cx="18" cy="18" r="16"
                  strokeWidth="3"
                />
                <circle
                  className="stroke-emerald-500 fill-none transition-all duration-1000 ease-out"
                  cx="18" cy="18" r="16"
                  strokeWidth="3"
                  strokeDasharray={`${progress}, 100`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-black text-text-main leading-none">{progress.toFixed(0)}%</span>
                <span className="text-[9px] text-text-muted font-bold uppercase mt-1 tracking-tighter">Verified</span>
              </div>
            </div>
            <div className="space-y-3 text-[11px] font-bold uppercase tracking-wider">
              <div className="flex justify-between">
                <span className="text-text-muted">Detected</span>
                <span className="text-text-main">{auditedIds.size}</span>
              </div>
              <div className="flex justify-between border-t border-border-sleek pt-2">
                <span className="text-text-muted">Remaining</span>
                <span className="text-text-main">{assets.length - auditedIds.size}</span>
              </div>
            </div>
          </div>
          
          <div className="card !p-6 bg-white/2">
            <h3 className="font-bold text-[10px] uppercase tracking-[0.2em] text-text-muted mb-4 opacity-50">Protocol</h3>
            <ul className="space-y-4 text-[11px] text-text-muted font-medium">
              <li className="flex gap-3">
                <span className="h-5 w-5 bg-white/5 rounded-md flex items-center justify-center shrink-0 font-bold border border-border-sleek text-accent">1</span>
                Initiate optical capture on resource node label.
              </li>
              <li className="flex gap-3">
                <span className="h-5 w-5 bg-white/5 rounded-md flex items-center justify-center shrink-0 font-bold border border-border-sleek text-accent">2</span>
                Cross-reference cryptographic node ID in ledger.
              </li>
              <li className="flex gap-3">
                <span className="h-5 w-5 bg-white/5 rounded-md flex items-center justify-center shrink-0 font-bold border border-border-sleek text-accent">3</span>
                Register validation event if integrity is confirmed.
              </li>
            </ul>
          </div>
        </div>

        <div className="lg:col-span-3 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted h-4 w-4" />
            <input 
              type="text" 
              placeholder="Search resource node ID..." 
              className="w-full bg-bg-sidebar/30 border border-border-sleek rounded-xl py-3 pl-10 pr-4 shadow-sm outline-none focus:ring-1 focus:ring-emerald-500 text-sm font-medium"
            />
          </div>

          <div className="card !p-0 overflow-hidden">
            <div className="bg-white/5 px-6 py-4 border-b border-border-sleek flex items-center justify-between">
              <h3 className="text-[10px] font-bold text-text-muted uppercase tracking-[0.2em]">Queue: Allocation Targets ({assets.length})</h3>
            </div>
            <div className="divide-y divide-border-sleek/30 max-h-[500px] overflow-y-auto">
              {assets.map((asset) => (
                <div key={asset.id} className="p-4 px-6 flex items-center justify-between hover:bg-white/2 transition-colors">
                  <div className="flex items-center gap-5">
                    <div className={`h-9 w-9 rounded-xl flex items-center justify-center border transition-all ${auditedIds.has(asset.id) ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-white/2 border-white/5 text-text-muted opacity-40'}`}>
                      {auditedIds.has(asset.id) ? <Check className="h-5 w-5" /> : <ShieldAlert className="h-5 w-5" />}
                    </div>
                    <div>
                      <p className="font-bold text-text-main text-sm">{asset.name}</p>
                      <p className="text-[10px] text-text-muted font-bold tracking-tight uppercase leading-none mt-1">
                        <span className="text-accent">{asset.code}</span> • {asset.location}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => toggleAudit(asset.id)}
                      className={`px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${
                        auditedIds.has(asset.id) 
                          ? 'bg-white/5 text-text-muted hover:text-text-main border border-border-sleek' 
                          : 'bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500 hover:text-bg-main border border-emerald-500/20 shadow-lg shadow-emerald-500/10'
                      }`}
                    >
                      {auditedIds.has(asset.id) ? "Revoke" : "Validate"}
                    </button>
                    <button className="p-2 hover:bg-red-500/10 text-text-muted hover:text-red-400 rounded-lg transition-colors">
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 px-6 bg-white/5 border-t border-border-sleek flex justify-end">
              <button 
                disabled={auditedIds.size === 0}
                className="px-6 py-2.5 bg-accent text-bg-main rounded-xl text-[11px] font-extrabold uppercase tracking-widest disabled:opacity-20 shadow-lg shadow-accent/20 transition-all hover:brightness-110 active:scale-95"
              >
                Commit Cycle Verification
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
