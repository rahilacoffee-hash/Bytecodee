import { NavLink, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  MessageSquare,
  CalendarDays,
  Settings,
  LogOut,
  X,
  Image,
  Star,
  ChevronsLeft,
  ChevronsRight,
  Bell,
  Wrench,
  FolderKanban,
} from "lucide-react";

// // import logo from "../../assets/image/Logo/Logo.png";
// // import axiosInstance from "../../api/axiosInstance";
import { adminLogout } from "../../Services/admin.api";

const menuGroups = [{ label: "Workspace", items: [{ name: "Dashboard", icon: LayoutDashboard, path: "/admin" }, { name: "Conversations", icon: MessageSquare, path: "/admin/conversations" }, { name: "Clients", icon: Users, path: "/admin/clients" }, { name: "Projects", icon: FolderKanban, path: "/admin/projects" }, { name: "Homepage CMS", icon: Image, path: "/admin/homepage" }, { name: "Quotes", icon: ShoppingCart, path: "/admin/quotes" }, { name: "Settings", icon: Settings, path: "/admin/settings" }] }];

function AdminSidebar({
  sidebarOpen,
  setSidebarOpen,
  collapsed,
  setCollapsed,
  isNight,
}) {
  const navigate = useNavigate();

  async function handleLogout() {
    try { await adminLogout(); } finally { navigate("/admin/login", { replace: true }); }
  }

  return (
    <>
      {/* Mobile backdrop */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          />
        )}
      </AnimatePresence>

      <motion.aside
        initial={{ opacity: 0, x: -24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={`
          fixed left-4 top-4 z-50 flex h-[calc(100vh-2rem)] flex-col
          rounded-[28px] 
          admin-sidebar
          ${isNight ? "admin-sidebar-night" : "admin-sidebar-day"}
          transition-[width] duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-[calc(100%+2rem)] lg:translate-x-0"}
        `}
        style={{
          width: collapsed ? 96 : 296,
          "--admin-sidebar": isNight ? "#070a08" : "#111712",
          "--admin-sidebar-text": "#f5f7f4",
        }}
      >
        {/* Logo */}
        <div className="flex items-center justify-between border-b border-white/10 px-5">
          <div className="flex min-w-0 items-center gap-3">
            <AnimatePresence>
              
              {!collapsed && (
                
                <motion.div
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                 <div>
                   <motion.img
          src="/logo.png"
          alt="Bytecode"
          initial={{
            opacity: 0,
            y: -10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.5,
          }}
          className="
            h-auto
            w-[150px]
            object-contain

            sm:w-[170px]
            lg:w-[190px]
          "
        />
                 
                 </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button
            onClick={() => setSidebarOpen(false)}
            className="flex-shrink-0 text-white/60 hover:text-white lg:hidden"
          >
            <X size={22} />
          </button>
        </div>

        {/* Navigation with Custom Gold Scrollbar */}
        <nav
          className="
            flex-1 space-y-6 overflow-y-auto overflow-x-hidden px-3 py-6
            [scrollbar-color:#4ade80_transparent] [scrollbar-width:thin]
            [&&::-webkit-scrollbar]:w-1.5
            [&&::-webkit-scrollbar-track]:bg-transparent
            [&&::-webkit-scrollbar-thumb]:rounded-full
            [&&::-webkit-scrollbar-thumb]:bg-[#4ade80]/30
            hover:[&&::-webkit-scrollbar-thumb]:bg-[#4ade80]/60
          "
        >
          {menuGroups.map((group) => (
            <div key={group.label}>
              {!collapsed && (
                <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-[2px] text-white/30">
                  {group.label}
                </p>
              )}

              <div className="space-y-1">
                {group.items.map((item) => {
                  const Icon = item.icon;

                  return (
                    <NavLink
                      key={item.name}
                      to={item.path}
                      end={item.path === "/admin"}
                      onClick={() => setSidebarOpen(false)}
                      title={collapsed ? item.name : undefined}
                      className={({ isActive }) =>
                        `group relative flex items-center gap-3 rounded-2xl px-3 py-3 text-sm transition-all duration-300 ${
                          isActive
                            ? "bg-gradient-to-r from-[#4ade80] to-[#4ade80] text-black "
                            : "text-white/60 hover:bg-white/5 hover:text-white"
                        } ${collapsed ? "justify-center" : ""}`
                      }
                    >
                      <Icon size={19} className="flex-shrink-0" />

                      {!collapsed && (
                        <span className="whitespace-nowrap font-medium">
                          {item.name}
                        </span>
                      )}

                      {/* Tooltip when collapsed */}
                      {collapsed && (
                        <span className="pointer-events-none absolute left-full ml-3 z-50 whitespace-nowrap rounded-lg bg-[#1c1712] px-3 py-1.5 text-xs text-white opacity-0 shadow-xl transition-opacity duration-200 group-hover:opacity-100">
                          {item.name}
                        </span>
                      )}
                    </NavLink>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Collapse toggle */}
        <button
          onClick={() => setCollapsed((prev) => !prev)}
          className="hidden items-center justify-center gap-2 py-3 text-xs text-white/40 transition hover:text-[#4ade80] lg:flex"
        >
          {collapsed ? (
            <ChevronsRight size={16} />
          ) : (
            <>
              <ChevronsLeft size={16} /> Collapse
            </>
          )}
        </button>

        {/* User + Logout */}
        <div className="space-y-3 p-3">
          {!collapsed && (
            <div className="flex items-center gap-3 rounded-2xl bg-white/5 px-3 py-2.5">
              <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-[#4ade80] font-serif text-sm font-semibold text-black">
                B
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-white">
                  Bytecode
                </p>
                <p className="truncate text-xs text-white/40">Admin</p>
              </div>
            </div>
          )}

          <button
            onClick={handleLogout}
            title={collapsed ? "Logout" : undefined}
            className={`flex w-full items-center gap-3 rounded-2xl bg-red-500/10 px-3 py-3 text-red-400 transition hover:bg-red-500 hover:text-white ${
              collapsed ? "justify-center" : ""
            }`}
          >
            <LogOut size={19} className="flex-shrink-0" />
            {!collapsed && <span className="font-medium">Logout</span>}
          </button>
        </div>
      </motion.aside>
    </>
  );
}

export default AdminSidebar;
