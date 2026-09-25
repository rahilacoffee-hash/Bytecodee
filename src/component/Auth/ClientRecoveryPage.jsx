import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { requestClientRecovery, verifyClientRecovery } from "../../Services/auth.api";

export default function ClientRecoveryPage() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  async function submit(event) { event.preventDefault(); setError(""); try { if (!sent) { await requestClientRecovery(email.trim()); setSent(true); } else { await verifyClientRecovery({ email: email.trim(), otp }); navigate("/client-chat", { replace: true }); } } catch (e) { setError(e?.response?.data?.message || "Unable to continue. Please try again."); } }
  return <main className="grid min-h-screen place-items-center bg-[#080a08] p-5 text-white"><form onSubmit={submit} className="w-full max-w-md rounded-3xl border border-white/10 bg-white/[.035] p-7 shadow-2xl">
    <p className="text-xs font-semibold tracking-[.22em] text-[#4ade80]">BYTECODEE</p><h1 className="mt-3 text-2xl font-semibold">Continue your conversation</h1>
    <p className="mt-2 text-sm leading-6 text-white/50">{sent ? `Enter the six-digit code sent to ${email}.` : "Enter your email and we’ll securely reconnect you to your existing conversations."}</p>
    {sent ? <input required inputMode="numeric" pattern="[0-9]{6}" maxLength="6" value={otp} onChange={e => setOtp(e.target.value.replace(/\D/g, ""))} placeholder="000000" className="mt-6 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 tracking-[.5em] outline-none focus:border-[#4ade80]" /> : <input required type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@company.com" className="mt-6 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 outline-none focus:border-[#4ade80]" />}
    {error && <p className="mt-3 text-sm text-red-400">{error}</p>}<button className="mt-6 w-full rounded-xl bg-[#4ade80] px-4 py-3 font-semibold text-black">{sent ? "Verify code" : "Send verification code"}</button>
    <button type="button" onClick={() => navigate("/")} className="mt-4 w-full text-sm text-white/45">Back to portfolio</button>
  </form></main>;
}
