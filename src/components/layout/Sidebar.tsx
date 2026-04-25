import { NavLink } from "react-router-dom";
import { LayoutDashboard, Box, History, FileText, Settings, Users, ShieldAlert } from "lucide-react";
import { cn } from "../../lib/utils";

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: "แดชบอร์ด", path: "/" },
  { icon: Box, label: "รายการสินทรัพย์", path: "/assets" },
  { icon: History, label: "ประวัติการใช้งาน", path: "/history" },
  { icon: ShieldAlert, label: "การตรวจนับ (Audit)", path: "/audit" },
  { icon: FileText, label: "รายงาน", path: "/reports" },
  { icon: Users, label: "การจัดการพนักงาน", path: "/users" },
  { icon: Settings, label: "ตั้งค่าระบบ", path: "/settings" },
];

export function Sidebar() {
  return (
    <aside className="w-60 bg-bg-sidebar text-text-main flex flex-col h-screen sticky top-0 shrink-0 border-right border-border-sleek">
      <div className="p-6 flex items-center gap-3">
        <div className="h-6 w-6 bg-accent rounded-md flex items-center justify-center font-black text-bg-main text-xs shadow-[0_0_15px_rgba(56,189,248,0.3)]">
          S
        </div>
        <div>
          <h1 className="font-extrabold text-xl leading-tight tracking-tight">Smart AMS</h1>
        </div>
      </div>
      
      <nav className="flex-1 px-3 py-4 space-y-1">
        <div className="px-4 mb-4">
          <p className="text-[10px] font-bold text-text-muted uppercase tracking-[0.1em]">Main Menu</p>
        </div>
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group",
                isActive 
                  ? "sidebar-item-active" 
                  : "sidebar-item-inactive"
              )
            }
          >
            <item.icon className={cn("h-4 w-4 transition-colors")} />
            <span className="text-sm">{item.label}</span>
          </NavLink>
        ))}
      </nav>
      
      <div className="p-4 mx-3 mb-6 bg-white/5 rounded-xl border border-white/5">
        <div className="flex items-center gap-3 mb-3">
          <div className="h-8 w-8 bg-accent/20 rounded-lg flex items-center justify-center">
            <ShieldAlert className="h-4 w-4 text-accent" />
          </div>
          <p className="text-[11px] font-bold text-text-muted uppercase tracking-wider">System Status</p>
        </div>
        <div className="w-full bg-white/5 rounded-full h-1.5 mb-2">
          <div className="bg-accent h-1.5 rounded-full w-[88%]" />
        </div>
        <p className="text-[10px] text-text-muted">Network latency is stable (24ms)</p>
      </div>
    </aside>
  );
}
