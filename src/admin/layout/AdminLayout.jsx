import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Menu } from "lucide-react";

import AdminSidebar from "./AdminSidebar";
import AdminNavbar from "./AdminNavbar";
import AdminFooter from "./AdminFooter";

function AdminLayout({ isNight, onThemeToggle }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const theme = isNight
    ? {
        "--admin-page": "#050605",
        "--admin-surface": "rgba(10, 14, 11, 0.88)",
        "--admin-border": "rgba(255, 255, 255, 0.12)",
        "--admin-heading": "#f4f7f4",
        "--admin-muted": "#9aa59e",
        "--admin-accent": "#4ade80",
        "--admin-hero": "#0a0f0b",
      }
    : {
        "--admin-page": "#f4f1ec",
        "--admin-surface": "rgba(255, 255, 255, 0.82)",
        "--admin-border": "#e8e2d9",
        "--admin-heading": "#111111",
        "--admin-muted": "#77736d",
        "--admin-accent": "#16834a",
        "--admin-hero": "#e9f3ec",
      };

  // AdminSidebar renders its own backdrop + animation for the mobile
  // overlay now, so this layout no longer needs a second one stacked on top

  return (
    <div
      className={`admin-shell min-h-screen ${isNight ? "admin-night" : "admin-day"}`}
      style={theme}
    >
      {/* Sidebar */}
      <AdminSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        isNight={isNight}
      />

      {/* Main Section - left margin matches the floating sidebar's
          current width (296px expanded / 96px expanded) plus its 16px
          offset from the edge, so content never sits under it or leaves
          an awkward gap */}
      <div
        className={`flex min-h-screen flex-col transition-[margin] duration-300 ${
          collapsed ? "lg:ml-[112px]" : "lg:ml-[312px]"
        }`}
      >
        {/* Navbar */}
        <AdminNavbar isNight={isNight} onThemeToggle={onThemeToggle}>
          <button
            onClick={() => setSidebarOpen(true)}
            className="admin-icon-button flex h-10 w-10 items-center justify-center rounded-full border transition lg:hidden"
          >
            <Menu size={20} />
          </button>
        </AdminNavbar>

        {/* Content */}
        <main className="min-w-0 flex-1 overflow-x-hidden px-4 pb-5 md:px-6 md:pb-8">
          <Outlet />
        </main>

        {/* Footer */}
        <AdminFooter />
      </div>
    </div>
  );
}

export default AdminLayout;
