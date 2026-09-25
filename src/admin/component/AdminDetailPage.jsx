import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Send } from "lucide-react";
import { toast } from "sonner";
import {
  adminClient,
  adminConversation,
  adminMessages,
  sendAdminMessage,
  updateAdminConversation,
  createAdminQuote,
} from "../../Services/admin.api";
const statuses = [
  "NEW",
  "DISCUSSING",
  "QUOTE_SENT",
  "NEGOTIATING",
  "PAID",
  "IN_PROGRESS",
  "COMPLETED",
  "ARCHIVED",
];
const service = (value) => value?.replaceAll("_", " ") || "—";
function QuoteForm({ clientId }) {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [expiresAt, setExpiresAt] = useState("");
  const [saving, setSaving] = useState(false);
  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await createAdminQuote({
        clientId,
        amount,
        description,
        expiresAt: expiresAt
          ? new Date(expiresAt + "T23:59:59").toISOString()
          : null,
      });
      toast.success("Draft quote created. Open Quotes to review and send it.");
      setAmount("");
      setDescription("");
      setExpiresAt("");
    } catch (e) {
      toast.error(e?.response?.data?.message || "Unable to create quote.");
    } finally {
      setSaving(false);
    }
  };
  return (
    <form
      onSubmit={submit}
      className="mt-6 border-t pt-5"
      style={{ borderColor: "var(--admin-border)" }}
    >
      <h2 className="admin-heading text-base font-semibold">Create quote</h2>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <input
          required
          type="number"
          min="1"
          step="0.01"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount (₦)"
          className="admin-search rounded-xl border px-3 py-2.5 text-sm"
        />
        <input
          type="date"
          value={expiresAt}
          onChange={(e) => setExpiresAt(e.target.value)}
          className="admin-search rounded-xl border px-3 py-2.5 text-sm"
        />
      </div>
      <textarea
        required
        minLength="5"
        maxLength="5000"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Scope, deliverables, and payment terms"
        className="admin-search mt-3 min-h-24 w-full resize-y rounded-xl border px-3 py-2.5 text-sm"
      />
      <div className="mt-3 flex flex-wrap items-center gap-3">
        <button
          disabled={saving}
          className="rounded-xl bg-[#4ade80] px-4 py-2.5 text-sm font-semibold text-black disabled:opacity-50"
        >
          {saving ? "Creating…" : "Create draft quote"}
        </button>
      </div>
    </form>
  );
}
export function AdminConversationPage() {
  const { conversationId } = useParams();
  const [conversation, setConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  useEffect(() => {
    Promise.all([
      adminConversation(conversationId),
      adminMessages(conversationId),
    ])
      .then(([c, m]) => {
        setConversation((c.data || c).conversation);
        setMessages((m.data || m).messages || []);
      })
      .catch((e) =>
        setError(e?.response?.data?.message || "Unable to load conversation."),
      );
  }, [conversationId]);
  const send = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    try {
      const r = await sendAdminMessage(conversationId, text.trim());
      setMessages((p) => [...p, (r.data || r).message]);
      setText("");
      toast.success("Reply sent.");
    } catch (e) {
      toast.error(e?.response?.data?.message || "Message failed.");
    }
  };
  const change = async (e) => {
    const status = e.target.value;
    try {
      const r = await updateAdminConversation(conversationId, { status });
      setConversation((r.data || r).conversation);
      toast.success("Conversation status updated.");
    } catch (e) {
      toast.error(e?.response?.data?.message || "Status update failed.");
    }
  };
  if (error && !conversation) return <p className="text-red-400">{error}</p>;
  return (
    <section className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[300px_1fr]">
      <aside
        className="admin-surface-panel rounded-2xl border p-5"
        style={{ borderColor: "var(--admin-border)" }}
      >
        <Link to="/admin/conversations" className="admin-muted text-sm">
          ← Conversations
        </Link>
        <h2 className="admin-heading mt-6 text-xl font-semibold">
          {conversation?.client?.name || "Client"}
        </h2>
        <p className="admin-muted mt-2 text-sm">
          {conversation?.client?.email}
        </p>
        <p className="admin-muted text-sm">
          {conversation?.client?.phone || "No phone"}
        </p>
        <p className="admin-muted text-sm">
          {conversation?.client?.companyName || "No company"}
        </p>
        <dl className="admin-muted mt-8 space-y-3 text-sm">
          <div>
            <dt>Service</dt>
            <dd className="admin-heading mt-1">
              {service(conversation?.service)}
            </dd>
          </div>
          <div>
            <dt>Status</dt>
            <dd>
              <select
                value={conversation?.status || "NEW"}
                onChange={change}
                className="admin-search mt-1 w-full rounded-lg border p-2 text-sm"
              >
                {statuses.map((x) => (
                  <option key={x}>{x}</option>
                ))}
              </select>
            </dd>
          </div>
        </dl>
      </aside>
      <main
        className="admin-surface-panel flex min-h-[620px] flex-col overflow-hidden rounded-2xl border"
        style={{ borderColor: "var(--admin-border)" }}
      >
        <header
          className="border-b p-5"
          style={{ borderColor: "var(--admin-border)" }}
        >
          <h1 className="admin-heading font-semibold">
            {service(conversation?.service)}
          </h1>
          <p className="admin-muted text-xs">Secure client conversation</p>
        </header>
        <div className="flex-1 space-y-4 overflow-y-auto p-5">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.senderType === "ADMIN" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm ${message.senderType === "ADMIN" ? "bg-[#4ade80] text-black" : "bg-black/10"}`}
              >
                <p>{message.content}</p>
                <small className="mt-1 block opacity-60">
                  {new Date(message.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </small>
              </div>
            </div>
          ))}
        </div>
        {error && <p className="px-5 text-sm text-red-400">{error}</p>}
        <form
          onSubmit={send}
          className="flex gap-2 border-t p-4"
          style={{ borderColor: "var(--admin-border)" }}
        >
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            maxLength="5000"
            placeholder="Write a reply…"
            className="admin-search min-h-11 flex-1 resize-none rounded-xl border px-3 py-2 text-sm"
          />
          <button className="rounded-xl bg-[#4ade80] px-4 text-black">
            <Send size={17} />
          </button>
        </form>
      </main>
    </section>
  );
}
export function AdminClientPage() {
  const { clientId } = useParams();
  const [client, setClient] = useState(null);
  const [error, setError] = useState("");
  useEffect(() => {
    adminClient(clientId)
      .then((r) => setClient((r.data || r).client))
      .catch((e) =>
        setError(e?.response?.data?.message || "Unable to load client."),
      );
  }, [clientId]);
  if (error) return <p className="text-red-400">{error}</p>;
  if (!client) return <p className="admin-muted">Loading client…</p>;
  return (
    <section className="mx-auto max-w-5xl space-y-6">
      <div
        className="admin-surface-panel rounded-2xl border p-6"
        style={{ borderColor: "var(--admin-border)" }}
      >
        <p className="text-xs font-semibold tracking-[.2em] text-[#4ade80]">
          CLIENT PROFILE
        </p>
        <h1 className="admin-heading mt-3 text-3xl font-semibold">
          {client.name}
        </h1>
        <p className="admin-muted mt-2">
          {client.email} · {client.phone || "No phone"} ·{" "}
          {client.companyName || "Independent"}
        </p>
        <QuoteForm clientId={client.id} />
      </div>
      {[
        ["Conversations", client.conversations, "/admin/conversations/"],
        ["Projects", client.projects, "/admin/projects/"],
        ["Quotes", client.quotes, "/admin/quotes/"],
      ].map(([label, items, path]) => (
        <div
          key={label}
          className="admin-surface-panel rounded-2xl border p-5"
          style={{ borderColor: "var(--admin-border)" }}
        >
          <h2 className="admin-heading font-semibold">{label}</h2>
          <div className="mt-3 space-y-2">
            {items?.length ? (
              items.map((item) => (
                <Link
                  key={item.id}
                  to={`${path}${item.id}`}
                  className="admin-muted block rounded-lg border p-3 hover:bg-black/[.03]"
                  style={{ borderColor: "var(--admin-border)" }}
                >
                  {item.name || service(item.service) || item.amount}
                </Link>
              ))
            ) : (
              <p className="admin-muted text-sm">
                No {label.toLowerCase()} yet.
              </p>
            )}
          </div>
        </div>
      ))}
    </section>
  );
}
