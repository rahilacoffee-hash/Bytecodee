import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import {
  Activity,
  BriefcaseBusiness,
  FileText,
  MessageSquare,
  Users,
} from "lucide-react";
import {
  conversations,
  projects,
  quotes,
  dashboard,
  updateAdminQuote,
  adminClients,
  createAdminQuote,
  createAdminProject,
  updateAdminProject,
} from "../../Services/admin.api";

const resources = {
  conversations: ["Conversations", conversations],
  clients: ["Clients", conversations],
  projects: ["Projects", projects],
  quotes: ["Quotes", quotes],
};
const serviceName = (value) =>
  ({
    LANDING_PAGE: "Landing Page",
    BUSINESS_WEBSITE: "Business Website",
    WEB_APPLICATION: "Web Application",
    CUSTOM: "Custom",
  })[value] ||
  value ||
  "—";
const title = (value) =>
  value.replace(/([A-Z])/g, " $1").replace(/^./, (x) => x.toUpperCase());
function Status({ value }) {
  return (
    <span
      className="rounded-full border px-2.5 py-1 text-[10px] font-semibold tracking-wide"
      style={{
        borderColor: "var(--admin-border)",
        color: "var(--admin-accent)",
        background: "color-mix(in srgb, var(--admin-accent) 8%, transparent)",
      }}
    >
      {value?.replaceAll("_", " ") || "—"}
    </span>
  );
}
function Surface({ children, className = "" }) {
  return (
    <div
      className={`admin-surface-panel rounded-2xl border ${className}`}
      style={{ borderColor: "var(--admin-border)" }}
    >
      {children}
    </div>
  );
}
function QuoteCreateForm() {
  const [clients, setClients] = useState([]);
  const [form, setForm] = useState({
    clientId: "",
    amount: "",
    description: "",
    expiresAt: "",
  });
  const [saving, setSaving] = useState(false);
  useEffect(() => {
    adminClients()
      .then((r) => setClients((r.data || r).clients || []))
      .catch(() => toast.error("Unable to load clients."));
  }, []);
  const set = (key) => (e) =>
    setForm((old) => ({ ...old, [key]: e.target.value }));
  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await createAdminQuote({
        clientId: form.clientId,
        amount: form.amount,
        description: form.description,
        expiresAt: form.expiresAt
          ? new Date(form.expiresAt + "T23:59:59").toISOString()
          : null,
      });
      setForm({ clientId: "", amount: "", description: "", expiresAt: "" });
      toast.success(
        "Draft saved. Review it in the list below, then send it to the client.",
      );
      window.dispatchEvent(new Event("quote-created"));
    } catch (e) {
      toast.error(e?.response?.data?.message || "Unable to create quote.");
    } finally {
      setSaving(false);
    }
  };
  return (
    <form
      onSubmit={submit}
      className="admin-surface-panel rounded-2xl border p-5"
      style={{ borderColor: "var(--admin-border)" }}
    >
      <div>
        <p className="admin-kicker">New quote</p>
        <h3 className="admin-heading mt-1 text-lg font-semibold">
          Prepare a client proposal
        </h3>
        <p className="admin-muted mt-1 text-sm">
          Add the investment and a clear description of what the client will
          receive.
        </p>
      </div>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <label className="admin-muted text-sm">
          <span className="mb-1.5 block">Client</span>
          <select
            required
            value={form.clientId}
            onChange={set("clientId")}
            className="admin-search w-full rounded-xl border px-3 py-3 text-sm"
          >
            <option value="">Select a client</option>
            {clients.map((client) => (
              <option key={client.id} value={client.id}>
                {client.name} — {client.email}
              </option>
            ))}
          </select>
        </label>
        <label className="admin-muted text-sm">
          <span className="mb-1.5 block">Quote amount</span>
          <input
            required
            type="number"
            min="1"
            step="0.01"
            value={form.amount}
            onChange={set("amount")}
            placeholder="₦0.00"
            className="admin-search w-full rounded-xl border px-3 py-3 text-sm"
          />
        </label>
        <label className="admin-muted text-sm sm:col-span-2">
          <span className="mb-1.5 block">
            Scope, deliverables, and payment terms
          </span>
          <textarea
            required
            minLength="5"
            maxLength="5000"
            value={form.description}
            onChange={set("description")}
            placeholder="Example: Design and develop a five-page marketing website, including mobile responsiveness and one revision round."
            className="admin-search min-h-32 w-full resize-y rounded-xl border px-3 py-3 text-sm"
          />
        </label>
        <label className="admin-muted text-sm">
          <span className="mb-1.5 block">Valid until (optional)</span>
          <input
            type="date"
            value={form.expiresAt}
            onChange={set("expiresAt")}
            className="admin-search w-full rounded-xl border px-3 py-3 text-sm"
          />
        </label>
      </div>
      <div className="mt-5 flex flex-wrap items-center gap-3">
        <button
          disabled={saving}
          className="rounded-xl bg-[#4ade80] px-5 py-3 text-sm font-semibold text-black disabled:opacity-50"
        >
          {saving ? "Creating…" : "Create draft quote"}
        </button>
      </div>
    </form>
  );
}

function ProjectCreateForm() {
  const [clients, setClients] = useState([]);
  const [form, setForm] = useState({
    clientId: "",
    name: "",
    service: "",
    budget: "",
    status: "PENDING",
  });
  const [saving, setSaving] = useState(false);
  useEffect(() => {
    adminClients()
      .then((r) => setClients((r.data || r).clients || []))
      .catch(() => toast.error("Unable to load clients."));
  }, []);
  const set = (key) => (e) =>
    setForm((old) => ({ ...old, [key]: e.target.value }));
  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await createAdminProject({ ...form, budget: form.budget || null });
      setForm({
        clientId: "",
        name: "",
        service: "",
        budget: "",
        status: "PENDING",
      });
      toast.success("Project created successfully.");
      window.dispatchEvent(new Event("project-created"));
    } catch (e) {
      toast.error(e?.response?.data?.message || "Unable to create project.");
    } finally {
      setSaving(false);
    }
  };
  return (
    <form
      onSubmit={submit}
      className="admin-surface-panel rounded-2xl border p-5"
      style={{ borderColor: "var(--admin-border)" }}
    >
      <div>
        <p className="admin-kicker">New project</p>
        <h3 className="admin-heading mt-1 text-lg font-semibold">
          Set up a client project
        </h3>
        <p className="admin-muted mt-1 text-sm">
          Create the delivery workspace before moving work into progress.
        </p>
      </div>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <label className="admin-muted text-sm">
          <span className="mb-1.5 block">Client</span>
          <select
            required
            value={form.clientId}
            onChange={set("clientId")}
            className="admin-search w-full rounded-xl border px-3 py-3 text-sm"
          >
            <option value="">Select a client</option>
            {clients.map((client) => (
              <option key={client.id} value={client.id}>
                {client.name} — {client.email}
              </option>
            ))}
          </select>
        </label>
        <label className="admin-muted text-sm">
          <span className="mb-1.5 block">Project name</span>
          <input
            required
            minLength="2"
            value={form.name}
            onChange={set("name")}
            placeholder="e.g. Acme website redesign"
            className="admin-search w-full rounded-xl border px-3 py-3 text-sm"
          />
        </label>
        <label className="admin-muted text-sm">
          <span className="mb-1.5 block">Service</span>
          <select
            required
            value={form.service}
            onChange={set("service")}
            className="admin-search w-full rounded-xl border px-3 py-3 text-sm"
          >
            <option value="">Select a service</option>
            <option value="LANDING_PAGE">Landing page</option>
            <option value="BUSINESS_WEBSITE">Business website</option>
            <option value="WEB_APPLICATION">Web application</option>
            <option value="CUSTOM">Custom project</option>
          </select>
        </label>
        <label className="admin-muted text-sm">
          <span className="mb-1.5 block">Budget (optional)</span>
          <input
            type="number"
            min="0"
            step="0.01"
            value={form.budget}
            onChange={set("budget")}
            placeholder="₦0.00"
            className="admin-search w-full rounded-xl border px-3 py-3 text-sm"
          />
        </label>
      </div>
      <div className="mt-5 flex flex-wrap items-center gap-3">
        <button
          disabled={saving}
          className="rounded-xl bg-[#4ade80] px-5 py-3 text-sm font-semibold text-black disabled:opacity-50"
        >
          {saving ? "Creating…" : "Create project"}
        </button>
      </div>
    </form>
  );
}

export default function AdminDataPage({ type }) {
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);
  useEffect(() => {
    const refresh = () => setRefreshKey((value) => value + 1);
    window.addEventListener("quote-created", refresh);
    window.addEventListener("project-created", refresh);
    return () => {
      window.removeEventListener("quote-created", refresh);
      window.removeEventListener("project-created", refresh);
    };
  }, []);
  const [heading, load] = resources[type];
  useEffect(() => {
    setLoading(true);
    load()
      .then((r) => {
        const d = r.data || r;
        const rows = d[type] || d.conversations || d.projects || d.quotes || [];
        setItems(
          type === "clients"
            ? [
                ...new Map(rows.map((x) => [x.client?.id, x.client])).values(),
              ].filter(Boolean)
            : rows,
        );
      })
      .catch((e) =>
        setError(e?.response?.data?.message || "Unable to load this section."),
      )
      .finally(() => setLoading(false));
  }, [type, load, refreshKey]);
  const filtered = useMemo(
    () =>
      items.filter((item) =>
        JSON.stringify(item).toLowerCase().includes(query.toLowerCase()),
      ),
    [items, query],
  );
  const updateProjectStatus = async (item, status) => {
    try {
      const result = await updateAdminProject(item.id, { status });
      const project = (result.data || result).project;
      setItems((old) => old.map((row) => (row.id === item.id ? project : row)));
      toast.success("Project status updated.");
    } catch (e) {
      toast.error(
        e?.response?.data?.message || "Project status could not be updated.",
      );
    }
  };
  const sendQuote = async (item) => {
    if (!window.confirm("Send this quote to the client?")) return;
    try {
      const result = await updateAdminQuote(item.id, { status: "SENT" });
      const quote = (result.data || result).quote;
      setItems((old) => old.map((row) => (row.id === item.id ? quote : row)));
      toast.success("Quote sent to the client.");
    } catch (e) {
      toast.error(e?.response?.data?.message || "Quote could not be sent.");
    }
  };
  const money = (value) =>
    value == null
      ? "—"
      : new Intl.NumberFormat("en-NG", {
          style: "currency",
          currency: "NGN",
          maximumFractionDigits: 0,
        }).format(Number(value));
  const date = (value) =>
    value
      ? new Date(value).toLocaleDateString(undefined, {
          day: "numeric",
          month: "short",
          year: "numeric",
        })
      : "—";
  const fields =
    type === "projects"
      ? ["Project", "Client", "Service", "Budget", "Status", "Updated"]
      : type === "quotes"
        ? [
            "Client",
            "Service / scope",
            "Amount",
            "Status",
            "Expires",
            "Created",
          ]
        : ["Client / name", "Service", "Status", "Last activity"];
  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto max-w-7xl space-y-6"
    >
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p
            className="text-xs font-semibold tracking-[.2em]"
            style={{ color: "var(--admin-accent)" }}
          >
            BYTECODEE CRM
          </p>
          <h2 className="admin-heading mt-2 text-3xl font-semibold">
            {heading}
          </h2>
          <p className="admin-muted mt-1 text-sm">
            Manage your studio’s live records.
          </p>
        </div>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={`Search ${heading.toLowerCase()}…`}
          className="admin-search w-full rounded-xl border px-4 py-3 text-sm outline-none sm:w-72"
        />
      </div>
      {type === "quotes" && <QuoteCreateForm />}
      {type === "projects" && <ProjectCreateForm />}
      {error ? (
        <p className="rounded-xl border border-red-400/20 bg-red-400/10 p-4 text-red-400">
          {error}
        </p>
      ) : (
        <Surface className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-[760px] w-full text-left text-sm">
              <thead
                className="admin-muted border-b text-[11px] uppercase tracking-wider"
                style={{ borderColor: "var(--admin-border)" }}
              >
                <tr>
                  {fields.map((field) => (
                    <th key={field} className="p-4">
                      {field}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {loading
                  ? [...Array(4)].map((_, i) => (
                      <tr key={i}>
                        <td colSpan={fields.length} className="p-4">
                          <div className="h-5 animate-pulse rounded bg-black/10" />
                        </td>
                      </tr>
                    ))
                  : filtered.map((item) =>
                      type === "projects" ? (
                        <tr
                          key={item.id}
                          className="border-b hover:bg-black/[.025]"
                          style={{ borderColor: "var(--admin-border)" }}
                        >
                          <td className="p-4">
                            <p className="admin-heading font-medium">
                              {item.name || "Untitled project"}
                            </p>
                            <p className="admin-muted mt-1 text-xs">
                              {item.id.slice(-8)}
                            </p>
                          </td>
                          <td className="p-4">
                            <p className="admin-heading">
                              {item.client?.name || "—"}
                            </p>
                            <p className="admin-muted text-xs">
                              {item.client?.email || ""}
                            </p>
                          </td>
                          <td className="admin-muted p-4">
                            {serviceName(item.service)}
                          </td>
                          <td className="admin-heading p-4 font-medium">
                            {money(item.budget)}
                          </td>
                          <td className="p-4">
                            <select
                              aria-label={`Status for `}
                              value={item.status}
                              onChange={(e) =>
                                updateProjectStatus(item, e.target.value)
                              }
                              className="admin-search rounded-lg border px-2 py-1.5 text-[11px] font-semibold"
                            >
                              <option value="PENDING">Pending</option>
                              <option value="IN_PROGRESS">In progress</option>
                              <option value="REVIEW">Review</option>
                              <option value="COMPLETED">Completed</option>
                              <option value="CANCELLED">Cancelled</option>
                            </select>
                          </td>
                          <td className="admin-muted p-4">
                            {date(item.updatedAt)}
                          </td>
                        </tr>
                      ) : type === "quotes" ? (
                        <tr
                          key={item.id}
                          className="border-b hover:bg-black/[.025]"
                          style={{ borderColor: "var(--admin-border)" }}
                        >
                          <td className="p-4">
                            <p className="admin-heading font-medium">
                              {item.client?.name || "—"}
                            </p>
                            <p className="admin-muted text-xs">
                              {item.client?.email || ""}
                            </p>
                          </td>
                          <td className="p-4">
                            <p className="admin-heading">
                              {serviceName(
                                item.conversation?.service ||
                                  item.project?.service,
                              )}
                            </p>
                            <p className="admin-muted mt-1 max-w-xs truncate text-xs">
                              {item.description}
                            </p>
                          </td>
                          <td className="admin-heading p-4 font-medium">
                            {money(item.amount)}
                          </td>
                          <td className="p-4">
                            <Status value={item.status} />
                            {item.status === "DRAFT" && (
                              <button
                                onClick={() => sendQuote(item)}
                                className="mt-2 block rounded-lg bg-[#4ade80] px-2 py-1 text-[10px] font-bold text-black"
                              >
                                Send Quote
                              </button>
                            )}
                          </td>
                          <td className="admin-muted p-4">
                            {date(item.expiresAt)}
                          </td>
                          <td className="admin-muted p-4">
                            {date(item.createdAt)}
                          </td>
                        </tr>
                      ) : (
                        <tr
                          key={item.id}
                          className="border-b"
                          style={{ borderColor: "var(--admin-border)" }}
                        >
                          <td className="p-4">
                            <Link
                              to={`/admin/clients/${item.id}`}
                              className="admin-heading font-medium hover:underline"
                            >
                              {item.name || "—"}
                            </Link>
                            <p className="admin-muted text-xs">
                              {item.email || ""}
                            </p>
                          </td>
                          <td className="admin-muted p-4">—</td>
                          <td className="p-4">—</td>
                          <td className="admin-muted p-4">
                            {date(item.updatedAt)}
                          </td>
                        </tr>
                      ),
                    )}
              </tbody>
            </table>
            {!loading && !filtered.length && (
              <p className="admin-muted p-10 text-center">
                No {heading.toLowerCase()} found.
              </p>
            )}
          </div>
        </Surface>
      )}
    </motion.section>
  );
}

export function DashboardHome() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  useEffect(() => {
    dashboard()
      .then((r) => setData(r.data || r))
      .catch((e) =>
        setError(e?.response?.data?.message || "Unable to load dashboard."),
      );
  }, []);
  const stats = data?.stats || {};
  const cards = [
    ["Total clients", stats.totalClients, Users],
    ["Active conversations", stats.activeConversations, MessageSquare],
    ["Projects in progress", stats.projectsInProgress, BriefcaseBusiness],
    ["Pending quotes", stats.pendingQuotes, FileText],
    ["Unread messages", stats.unreadMessages, Activity],
  ];
  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto max-w-7xl space-y-6"
    >
      <div
        className="rounded-3xl border p-7 md:p-9"
        style={{
          borderColor: "var(--admin-border)",
          background: "var(--admin-hero)",
        }}
      >
        <p
          className="text-xs font-semibold tracking-[.2em]"
          style={{ color: "var(--admin-accent)" }}
        >
          BYTECODEE ADMIN
        </p>
        <h2 className="admin-heading mt-4 max-w-xl text-3xl font-semibold md:text-5xl">
          A clear view of the work moving through your studio.
        </h2>
        <p className="admin-muted mt-4 max-w-xl text-sm leading-6">
          Monitor clients, conversations, projects and quotes from one secure
          workspace.
        </p>
      </div>
      {error ? (
        <p className="text-red-400">{error}</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          {cards.map(([label, value, Icon], i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
            >
              <Surface className="p-5">
                <Icon size={18} style={{ color: "var(--admin-accent)" }} />
                <p className="admin-muted mt-5 text-sm">{label}</p>
                <p className="admin-heading mt-2 text-3xl font-semibold">
                  {data ? (value ?? 0) : "—"}
                </p>
              </Surface>
            </motion.div>
          ))}
        </div>
      )}
      <Surface className="overflow-hidden">
        <div
          className="flex items-center justify-between border-b p-5"
          style={{ borderColor: "var(--admin-border)" }}
        >
          <div>
            <h3 className="admin-heading font-semibold">
              Recent conversations
            </h3>
            <p className="admin-muted mt-1 text-sm">Latest client activity</p>
          </div>
          <MessageSquare size={18} style={{ color: "var(--admin-accent)" }} />
        </div>
        <div
          className="divide-y"
          style={{ borderColor: "var(--admin-border)" }}
        >
          {(data?.recentConversations || []).slice(0, 6).map((row) => (
            <div
              key={row.id}
              className="flex items-center justify-between gap-4 p-5"
            >
              <div>
                <p className="admin-heading text-sm font-medium">
                  {row.client?.name || "Client"}
                </p>
                <p className="admin-muted mt-1 text-xs">
                  {serviceName(row.service)} ·{" "}
                  {row.messages?.[0]?.content || "No messages yet"}
                </p>
              </div>
              <Status value={row.status} />
            </div>
          ))}
          {data && !data.recentConversations?.length && (
            <p className="admin-muted p-8 text-center text-sm">
              No conversations yet.
            </p>
          )}
        </div>
      </Surface>
    </motion.section>
  );
}
