import { lazy, Suspense, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
const Home = lazy(() => import("./pages/Home"));
const AdminLayout = lazy(() => import("./admin/layout/AdminLayout"));
const LoginPage = lazy(() => import("./component/Auth/Loginpage"));
const AdminAuthPage = lazy(() => import("./component/Auth/AdminAuthPage"));
const RequireAdmin = lazy(() => import("./component/Auth/RequireAdmin"));
const DashboardHome = lazy(() => import("./admin/component/AdminDataPage").then((module) => ({ default: module.DashboardHome })));
const AdminDataPage = lazy(() => import("./admin/component/AdminDataPage"));
const AdminClientPage = lazy(() => import("./admin/component/AdminDetailPage").then((module) => ({ default: module.AdminClientPage })));
const AdminInbox = lazy(() => import("./admin/component/AdminInbox"));
const HomepageCms = lazy(() => import("./admin/component/HomepageCms"));
const VerifyOTPPage = lazy(() => import("./component/Auth/VerifyOTPPage"));
const ClientChatPage = lazy(() => import("./pages/Clientchatpage"));
const ClientRecoveryPage = lazy(() => import("./component/Auth/ClientRecoveryPage"));


export default function App() {
  const [isNight, setIsNight] = useState(
    () => localStorage.getItem("theme") !== "day",
  );

  useEffect(() => {
    localStorage.setItem("theme", isNight ? "night" : "day");
  }, [isNight]);

  function toggleTheme() {
    setIsNight((current) => !current);
  }

  return (
    <BrowserRouter>
      <Suspense fallback={<div className="grid min-h-screen place-items-center bg-[#090909] text-sm text-[#4ade80]">Loading BYTECODEE…</div>}>
      <Routes>
        <Route
          path="/"
          element={<Home isNight={isNight} onThemeToggle={toggleTheme} />}
        />
        <Route path="/client-chat" element={<ClientChatPage />} />
        <Route path="/client-chat/:conversationId" element={<ClientChatPage />} />
        <Route path="/client/recover" element={<ClientRecoveryPage />} />
         <Route path="/login" element={<LoginPage />} />
        <Route path="/admin/login" element={<AdminAuthPage mode="login" />} />
        <Route path="/admin/register" element={<AdminAuthPage mode="register" />} />
        <Route path="/admin/verify" element={<AdminAuthPage mode="verify" />} />
         <Route path="/verify-otp" element={<VerifyOTPPage />} />
        <Route
          path="/admin"
          element={<RequireAdmin><AdminLayout isNight={isNight} onThemeToggle={toggleTheme} /></RequireAdmin>}
        >
          <Route index element={<DashboardHome />} />
          <Route path="conversations" element={<AdminInbox />} />
          <Route path="conversations/:conversationId" element={<AdminInbox />} />
          <Route path="clients" element={<AdminDataPage type="clients" />} />
          <Route path="clients/:clientId" element={<AdminClientPage />} />
          <Route path="projects" element={<AdminDataPage type="projects" />} />
          <Route path="homepage" element={<HomepageCms />} />
          <Route path="quotes" element={<AdminDataPage type="quotes" />} />
          <Route path="settings" element={<section className="p-4 text-white/60">Settings are managed by the secured backend configuration.</section>} />
        </Route>
      </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
