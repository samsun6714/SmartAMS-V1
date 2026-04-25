import { X, Calendar, MapPin, Tag, ShieldCheck, Download, Users, TrendingUp, Info } from "lucide-react";
import { Asset } from "../../types";
import { STATUS_CONFIG, CATEGORY_CONFIG } from "../../constants";
import { motion } from "motion/react";
import { QRCodeSVG } from "qrcode.react";

interface AssetDetailModalProps {
  asset: Asset;
  onClose: () => void;
}

export function AssetDetailModal({ asset, onClose }: AssetDetailModalProps) {
  const statusInfo = STATUS_CONFIG[asset.status];
  const categoryInfo = CATEGORY_CONFIG[asset.category];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-bg-main/80 backdrop-blur-sm p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="bg-bg-sidebar w-full max-w-4xl max-h-[90vh] rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.3)] flex flex-col overflow-hidden border border-border-sleek"
      >
        <div className="px-8 py-6 border-b border-border-sleek flex items-center justify-between bg-white/5">
          <div className="flex items-center gap-4">
            <div className={`p-2.5 rounded-xl bg-accent/20 border border-accent/20 shadow-[0_0_15px_rgba(56,189,248,0.1)]`}>
              <categoryInfo.icon className="h-5 w-5 text-accent" />
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-text-main tracking-tight leading-none mb-1">{asset.name}</h3>
              <p className="text-[10px] text-accent font-bold uppercase tracking-[0.2em]">{asset.code}</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-full transition-colors text-text-muted hover:text-text-main"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 lg:flex gap-10">
          <div className="flex-1 space-y-10">
                <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                  {[
                    { label: "Classification", value: CATEGORY_CONFIG[asset.category].label, icon: CATEGORY_CONFIG[asset.category].icon },
                    { label: "Allocation", value: asset.location, icon: MapPin },
                    { label: "Department", value: asset.department, icon: Users },
                    { label: "Sync Date", value: asset.purchaseDate, icon: Calendar },
                    { label: "Net Valuation", value: `฿${asset.purchasePrice.toLocaleString()}`, icon: TrendingUp },
                    { label: "Integrity Status", value: STATUS_CONFIG[asset.status].label, icon: STATUS_CONFIG[asset.status].icon, color: STATUS_CONFIG[asset.status].color },
                  ].map((item, i) => (
                    <div key={i} className="space-y-1.5">
                      <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest flex items-center gap-2">
                        <item.icon className="h-3 w-3 opacity-50" />
                        {item.label}
                      </p>
                      <p className={`text-xs font-bold text-text-main ${item.color?.includes('amber') ? 'text-amber-400' : ''}`}>
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>

            <div className="bg-white/2 p-6 rounded-2xl border border-white/5 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-3 opacity-10">
                <Info className="h-12 w-12" />
              </div>
              <h4 className="text-[10px] font-bold text-text-muted uppercase tracking-[0.2em] mb-3">Resource Metadata</h4>
              <p className="text-sm text-text-main leading-relaxed font-medium opacity-80 italic">
                {asset.description || "No persistent metadata available for this node identifier."}
              </p>
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-[10px] font-bold text-text-muted uppercase tracking-[0.2em]">Maintenance Cycles</h4>
                <button className="text-[10px] font-bold text-accent uppercase tracking-widest hover:underline">+ Register Event</button>
              </div>
              <div className="space-y-3">
                <div className="p-4 bg-white/2 border border-white/5 rounded-xl flex items-center justify-between transition-all hover:bg-white/5">
                  <div className="flex items-center gap-4">
                    <div className="h-9 w-9 bg-accent/20 text-accent rounded-lg flex items-center justify-center font-black text-xs border border-accent/20 shadow-sm">M1</div>
                    <div>
                      <p className="font-bold text-text-main text-sm">System Optimization Cycle</p>
                      <p className="text-[10px] text-text-muted font-bold tracking-tight uppercase mt-0.5">2024-01-12 • Certified by Eng. Sommai</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-black text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20 uppercase">Verified</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:w-72 space-y-8 mt-10 lg:mt-0 pt-10 lg:pt-0 lg:border-l border-border-sleek lg:pl-10">
            <div className="p-8 pb-10 flex flex-col items-center bg-white/2 rounded-3xl border border-white/5 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-accent opacity-50" />
              <h4 className="text-[10px] font-bold text-text-muted uppercase tracking-[0.2em] mb-6">Universal Node ID</h4>
              <div className="bg-white p-4 rounded-2xl shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                <QRCodeSVG value={`ams-asset-${asset.code}`} size={160} level="H" />
              </div>
              <p className="font-mono text-sm font-black text-accent mt-6 tracking-widest">{asset.code}</p>
              <p className="text-[10px] text-text-muted mt-2 text-center font-bold uppercase tracking-tight opacity-50">Scan for direct uplink</p>
              
              <button className="flex items-center gap-2 text-[10px] font-bold text-text-main mt-8 px-4 py-2 bg-white/5 rounded-full hover:bg-white/10 transition-all border border-white/10">
                <Download className="h-3 w-3" />
                Export Node Label
              </button>
            </div>

            <div className="space-y-3">
              <button className="w-full py-4 bg-accent text-bg-main rounded-2xl font-black text-sm uppercase tracking-widest shadow-[0_0_20px_rgba(56,189,248,0.3)] transition-all hover:scale-[1.02] active:scale-95">
                Print Identifier
              </button>
              <button className="w-full py-4 bg-white/5 text-text-main rounded-2xl font-bold text-sm uppercase tracking-widest hover:bg-white/10 transition-all border border-white/10">
                Initiate Service
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
