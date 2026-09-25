import {
  Activity,
  ArrowUpRight,
  BriefcaseBusiness,
  MessageSquare,
  Users,
} from "lucide-react";

const stats = [
  {
    label: "Active projects",
    value: "12",
    change: "+18%",
    icon: BriefcaseBusiness,
  },
  { label: "New messages", value: "28", change: "+12%", icon: MessageSquare },
  { label: "Clients", value: "64", change: "+24%", icon: Users },
];

function WelcomeSection() {
  return (
    <section className="admin-dashboard space-y-6">
      <div
        className="admin-hero-panel relative overflow-hidden rounded-[28px] p-6 md:p-9"
        style={{
          background: "var(--admin-hero)",
          color: "var(--admin-heading)",
        }}
      >
        <div className="relative z-10 max-w-2xl">
          <h2 className="mt-4 max-w-xl font-serif text-4xl leading-tight md:text-6xl">
            Build something{" "}
            <span className="admin-accent">worth shipping.</span>
          </h2>
          <p className="admin-muted mt-5 max-w-lg text-sm leading-6">
            Keep the studio moving. Your latest projects, conversations, and
            client activity are ready for review.
          </p>
        </div>
        <div className="admin-hero-mark" aria-hidden="true">{`{}`}</div>
      </div>

     
    </section>
  );
}

export default WelcomeSection;
