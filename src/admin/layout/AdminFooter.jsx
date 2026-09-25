import { Heart } from "lucide-react";

function AdminFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="admin-footer mx-4 mb-4 rounded-[24px] border px-6 py-5 shadow-[0_20px_50px_rgba(0,0,0,0.04)] backdrop-blur-xl">
      <div className="admin-muted mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-sm md:flex-row">
        {/* Left */}
        <div className="flex flex-wrap items-center justify-center gap-2 md:justify-start">
          <span className="admin-heading font-serif">Bytecode</span>
          <span>© {year} All Rights Reserved.</span>
        </div>

        {/* Center */}
        <div className="flex items-center gap-1.5">
          <span>Built with</span>
          <Heart size={15} className="admin-accent fill-current" />
          <span>by Bytecode</span>
        </div>

        {/* Right */}
        <div className="flex items-center gap-3">
          <span className="admin-version rounded-full border px-3 py-1 text-xs font-medium">
            Version 1.0.0
          </span>
          <span className="admin-accent text-xs uppercase tracking-[1px]">
            Admin Panel
          </span>
        </div>
      </div>
    </footer>
  );
}

export default AdminFooter;
