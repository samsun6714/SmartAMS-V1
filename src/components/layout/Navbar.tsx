import { Search, Bell, User } from "lucide-react";

export function Navbar() {
  return (
    <nav className="glass-nav sticky top-0 z-50 px-8 h-20 flex items-center justify-between">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative max-w-sm w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted h-4 w-4" />
          <input
            type="text"
            placeholder="Quick search..."
            className="w-full bg-bg-sidebar/50 border border-border-sleek rounded-xl py-2 pl-10 pr-4 text-xs font-medium text-text-main placeholder:text-text-muted/50 focus:ring-1 focus:ring-accent outline-none transition-all"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-6">
        <button className="p-2 text-text-muted hover:text-text-main transition-colors relative" id="notifications-btn">
          <Bell className="h-5 w-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-bg-main shadow-[0_0_8px_rgba(239,68,68,0.5)]"></span>
        </button>
        
        <div className="flex items-center gap-3 bg-bg-sidebar py-1.5 pl-2 pr-4 rounded-full border border-border-sleek cursor-pointer hover:bg-white/5 transition-all" id="profile-trigger">
          <div className="h-7 w-7 bg-gradient-to-br from-accent to-indigo-400 rounded-full flex items-center justify-center text-bg-main font-bold text-[10px] shadow-sm shadow-accent/20">
            SR
          </div>
          <div className="text-left hidden sm:block">
            <p className="text-[13px] font-bold tracking-tight text-text-main leading-none">สมศักดิ์ รักดี</p>
          </div>
        </div>
      </div>
    </nav>
  );
}
