import { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { io } from "socket.io-client";
import {
  Bell,
  Search,
  ChevronDown,
  User,
  Settings,
  LogOut,
} from "lucide-react";
import ThemeToggle from "../../component/ThemeToggle";
import { adminLogout, conversations } from "../../Services/admin.api";

// import { useAuth } from "../../context/AuthContext";
// import axiosInstance from "../../api/axiosInstance";

function AdminNavbar({ children, isNight, onThemeToggle }) {
  const location = useLocation();
  const navigate = useNavigate();

  const [dropdown, setDropdown] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [recentNotifications, setRecentNotifications] = useState([]);
  const dropdownRef = useRef(null);
  const notificationRef = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  useEffect(() => {
    const socketUrl = import.meta.env.VITE_SOCKET_URL || "http://localhost:5001";
    const socket = io(socketUrl, { withCredentials: true, path: "/socket.io/" });
    socket.on("notification:new", async (notice) => {
      if (notice?.type !== "NEW_CLIENT_MESSAGE") return;
      try {
        const result = await conversations();
        const rows = (result?.data || result)?.conversations || [];
        const item = rows.find((row) => row.id === notice.conversationId);
        if (!item) return;
        setRecentNotifications((old) => [item, ...old.filter((row) => row.id !== item.id)].slice(0, 8));
        setUnreadCount((count) => count + 1);
        if (document.hidden && "Notification" in window && Notification.permission === "granted") new Notification("New Bytecode client message", { body: item.client?.name || "A client sent a message", tag: item.id });
      } catch { /* the next notification will retry */ }
    });
    return () => socket.disconnect();
  }, []);

  useEffect(() => {
    const closeNotifications = (event) => { if (notificationRef.current && !notificationRef.current.contains(event.target)) setNotificationsOpen(false); };
    document.addEventListener("mousedown", closeNotifications);
    return () => document.removeEventListener("mousedown", closeNotifications);
  }, []);

  async function handleLogout() {
    try { await adminLogout(); } finally { setDropdown(false); navigate("/admin/login", { replace: true }); }
  }

  const pageTitle =
    location.pathname === "/admin"
      ? "Dashboard"
      : location.pathname
          .split("/")
          .pop()
          .replace("-", " ")
          .replace(/\b\w/g, (char) => char.toUpperCase());

  return (
    <header
      className={`admin-navbar sticky top-4 z-30 mx-4 mb-8 rounded-[24px] shadow-[0_20px_50px_rgba(0,0,0,0.06)] backdrop-blur-xl ${isNight ? "admin-navbar-night" : "admin-navbar-day"}`}
    >
      <div className="flex h-20 items-center justify-between px-5 md:px-8">
        {/* Left */}
        <div className="flex items-center gap-5">
          {children}

          <div>
            <h1 className="admin-heading font-serif text-2xl">{pageTitle}</h1>
            <p className="admin-muted text-sm">Welcome back</p>
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-3">
          <ThemeToggle
            isNight={isNight}
            onToggle={onThemeToggle}
            className="admin-icon-button"
          />

          {/* Search */}
          <div className="relative hidden lg:block">
            <Search
              size={17}
              className="admin-muted absolute left-4 top-1/2 -translate-y-1/2"
            />
            <input
              type="text"
              placeholder="Search..."
              className="admin-search h-11 w-64 rounded-full border pl-11 pr-4 text-sm outline-none transition"
            />
          </div>

          {/* Notifications */}
          <div className="relative" ref={notificationRef}>
            <button type="button" onClick={() => { setNotificationsOpen((open) => !open); setUnreadCount(0); }} aria-label="Notifications" aria-expanded={notificationsOpen} className="admin-icon-button relative flex h-11 w-11 items-center justify-center rounded-full border transition">
              <Bell size={19} />
              {unreadCount > 0 && <span className="admin-badge absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-[10px] font-bold">{unreadCount > 9 ? "9+" : unreadCount}</span>}
            </button>
            <AnimatePresence>{notificationsOpen && <motion.div initial={{ opacity: 0, y: -8, scale: .97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -8, scale: .97 }} className="admin-dropdown absolute right-0 mt-3 w-[min(22rem,calc(100vw-2rem))] overflow-hidden rounded-2xl border shadow-[0_20px_50px_rgba(0,0,0,.16)]">
              <div className="admin-dropdown-heading flex items-center justify-between border-b px-4 py-3"><div><p className="admin-heading text-sm font-semibold">Notifications</p><p className="admin-muted mt-0.5 text-xs">Unread client messages</p></div><span className="admin-badge rounded-full px-2 py-1 text-[10px] font-bold">{unreadCount}</span></div>
              {recentNotifications.length ? recentNotifications.map((item) => <Link key={item.id} to={`/admin/conversations/${item.id}`} onClick={() => setNotificationsOpen(false)} className="admin-dropdown-link block border-b px-4 py-3 last:border-0 hover:bg-black/[.03]" style={{ borderColor: "var(--admin-border)" }}><p className="truncate text-sm font-medium">{item.client?.name || "Client"}</p><p className="admin-muted mt-1 truncate text-xs">{item.lastMessage?.content || item.messages?.[0]?.content || "New message"}</p></Link>) : <p className="admin-muted px-4 py-7 text-center text-sm">You are all caught up.</p>}
            </motion.div>}</AnimatePresence>
          </div>

          {/* Profile */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdown(!dropdown)}
              className="admin-profile flex items-center gap-3 rounded-full border py-1.5 pl-1.5 pr-3 transition"
            >
              <div className="admin-avatar flex h-9 w-9 items-center justify-center rounded-full font-serif font-semibold">
                B
              </div>

              <div className="hidden text-left md:block">
                <p className="admin-heading text-sm font-medium">Admin</p>
                <span className="admin-muted text-xs">Administrator</span>
              </div>

              <ChevronDown
                size={16}
                className={`admin-muted transition-transform ${dropdown ? "rotate-180" : ""}`}
              />
            </button>

            <AnimatePresence>
              {dropdown && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.97 }}
                  transition={{ duration: 0.15 }}
                  className="admin-dropdown absolute right-0 mt-3 w-64 overflow-hidden rounded-2xl border shadow-[0_20px_50px_rgba(0,0,0,0.12)]"
                >
                  <div className="admin-dropdown-heading border-b p-5">
                    <h3 className="admin-heading font-serif">Admin</h3>
                    <p className="admin-muted mt-1 text-sm">Administrator</p>
                  </div>

                  <Link
                    to="/admin/profile"
                    onClick={() => setDropdown(false)}
                    className="admin-dropdown-link flex items-center gap-3 px-5 py-3 transition"
                  >
                    <User size={17} className="admin-accent" />
                    Profile
                  </Link>

                  <Link
                    to="/admin/settings"
                    onClick={() => setDropdown(false)}
                    className="admin-dropdown-link flex items-center gap-3 px-5 py-3 transition"
                  >
                    <Settings size={17} className="admin-accent" />
                    Settings
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="admin-logout flex w-full items-center gap-3 border-t px-5 py-3 transition"
                  >
                    <LogOut size={17} />
                    Logout
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
}

export default AdminNavbar;
