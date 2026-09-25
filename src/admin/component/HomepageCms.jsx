import { useEffect, useState } from "react";
import { ImagePlus, Plus, RotateCcw, Save, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import {
  getHomepageContent,
  saveHomepageContent,
} from "../../Services/admin.api";
import { HOME_PAGE_DEFAULTS } from "../../data/homepageContent";

const MAX_IMAGE_SIZE = 2 * 1024 * 1024;
const MAX_TOTAL_IMAGE_DATA = 6 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);
const inputClass =
  "admin-search w-full rounded-xl border px-3 py-2.5 text-sm outline-none";

function cloneDefaults() {
  return structuredClone(HOME_PAGE_DEFAULTS);
}

function Field({
  label,
  value,
  onChange,
  multiline = false,
  type = "text",
  className = "",
  ...props
}) {
  const Control = multiline ? "textarea" : "input";
  return (
    <label className={`admin-muted block text-sm ${className}`}>
      <span className="mb-1.5 block">{label}</span>
      <Control
        className={`${inputClass} ${multiline ? "min-h-24 resize-y" : ""}`}
        type={multiline ? undefined : type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        {...props}
      />
    </label>
  );
}

function Panel({ title, description, children }) {
  return (
    <section
      className="admin-surface-panel space-y-5 rounded-2xl border p-5 md:p-6"
      style={{ borderColor: "var(--admin-border)" }}
    >
      <div>
        <h3 className="admin-heading text-lg font-semibold">{title}</h3>
        {description && (
          <p className="admin-muted mt-1 text-sm">{description}</p>
        )}
      </div>
      {children}
    </section>
  );
}

function totalImageDataSize(content) {
  return content.projects.items.reduce(
    (total, project) =>
      total +
      (project.image.startsWith("data:image/") ? project.image.length : 0),
    0,
  );
}

export default function HomepageCms() {
  const [content, setContent] = useState(cloneDefaults);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    getHomepageContent()
      .then((response) => {
        if (response.data?.content) setContent(response.data.content);
      })
      .catch((requestError) => {
        setError(
          requestError.response?.data?.message ||
            "Could not load homepage content.",
        );
      })
      .finally(() => setLoading(false));
  }, []);

  function updateSection(section, key, value) {
    setContent((current) => ({
      ...current,
      [section]: { ...current[section], [key]: value },
    }));
  }

  function updateItem(section, index, key, value) {
    setContent((current) => ({
      ...current,
      [section]: {
        ...current[section],
        items: current[section].items.map((item, itemIndex) =>
          itemIndex === index ? { ...item, [key]: value } : item,
        ),
      },
    }));
  }

  function updateStat(index, key, value) {
    setContent((current) => ({
      ...current,
      about: {
        ...current.about,
        stats: current.about.stats.map((stat, statIndex) =>
          statIndex === index ? { ...stat, [key]: value } : stat,
        ),
      },
    }));
  }

  async function uploadProjectImage(index, file) {
    setError("");
    if (!file) return;
    if (!ALLOWED_IMAGE_TYPES.has(file.type)) {
      toast.error("Choose a JPEG, PNG, WebP, or GIF image.");
      return;
    }
    if (file.size > MAX_IMAGE_SIZE) {
      toast.error("Each image must be 2 MB or smaller.");
      return;
    }

    const image = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () =>
        typeof reader.result === "string"
          ? resolve(reader.result)
          : reject(new Error("The selected image could not be read."));
      reader.onerror = () =>
        reject(new Error("The selected image could not be read."));
      reader.readAsDataURL(file);
    });

    const previousImage = content.projects.items[index].image;
    const previousSize = previousImage.startsWith("data:image/")
      ? previousImage.length
      : 0;
    if (
      totalImageDataSize(content) - previousSize + image.length >
      MAX_TOTAL_IMAGE_DATA
    ) {
      toast.error(
        "Uploaded project images must total 6 MB or less. Remove an image or choose a smaller file.",
      );
      return;
    }
    updateItem("projects", index, "image", image);
    toast.success("Project image added. Save changes to publish it.");
  }

  async function save() {
    setSaving(true);
    setError("");
    try {
      const response = await saveHomepageContent(content);
      setContent(response.data.content);
      toast.success("Homepage changes saved and are now live.");
    } catch (requestError) {
      const validationMessages = requestError.response?.data?.errors
        ?.map((issue) => issue.message)
        .filter(Boolean);
      toast.error(
        validationMessages?.join(" ") ||
          requestError.response?.data?.message ||
          "Unable to save homepage changes.",
      );
    } finally {
      setSaving(false);
    }
  }

  function addProject() {
    updateSection("projects", "items", [
      ...content.projects.items,
      {
        id: `project-${Date.now()}`,
        label: "New project",
        title: "Project name",
        description: "Describe this project.",
        tech: [],
        image: "",
        github: "#",
        live: "#",
      },
    ]);
  }

  function addTestimonial() {
    updateSection("testimonials", "items", [
      ...content.testimonials.items,
      {
        id: `testimonial-${Date.now()}`,
        name: "Client name",
        role: "Role, company",
        quote: "Add the client's testimonial.",
        rating: 5,
        color: "#4ade80",
      },
    ]);
  }

  function addStat() {
    updateSection("about", "stats", [
      ...content.about.stats,
      { value: 0, suffix: "", label: "New stat" },
    ]);
  }

  if (loading) {
    return <p className="admin-muted p-8 text-sm">Loading homepage content…</p>;
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6 pb-8">
      <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p
            className="text-xs font-semibold tracking-[.2em]"
            style={{ color: "var(--admin-accent)" }}
          >
            WEBSITE CONTENT
          </p>
          <h2 className="admin-heading mt-2 text-3xl font-semibold">
            Homepage CMS
          </h2>
          <p className="admin-muted mt-1 text-sm">
            Edit the live homepage, portfolio projects, stats, and testimonials.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            to="/"
            target="_blank"
            className="admin-muted rounded-xl border px-4 py-2.5 text-sm"
            style={{ borderColor: "var(--admin-border)" }}
          >
            View homepage
          </Link>
          <button
            type="button"
            onClick={() => {
              setContent(cloneDefaults());
              toast.success("Default content loaded. Save to publish it.");
            }}
            className="admin-muted flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm"
            style={{ borderColor: "var(--admin-border)" }}
          >
            <RotateCcw size={15} /> Restore defaults
          </button>
          <button
            type="button"
            onClick={save}
            disabled={saving}
            className="flex items-center gap-2 rounded-xl bg-[#4ade80] px-4 py-2.5 text-sm font-semibold text-black disabled:opacity-50"
          >
            <Save size={15} /> {saving ? "Saving…" : "Save changes"}
          </button>
        </div>
      </header>

      {error && (
        <p
          role="alert"
          className="rounded-xl border border-red-400/30 bg-red-400/10 p-4 text-sm text-red-400"
        >
          {error}
        </p>
      )}
      <Panel
        title="Hero"
        description="Update the first message visitors see and the hero background video URL."
      >
        <div className="grid gap-4 md:grid-cols-2">
          <Field
            label="Intro line"
            value={content.hero.eyebrow}
            onChange={(value) => updateSection("hero", "eyebrow", value)}
          />
          <Field
            label="Main title"
            value={content.hero.title}
            onChange={(value) => updateSection("hero", "title", value)}
          />
          <Field
            label="Scroll label"
            value={content.hero.scrollLabel}
            onChange={(value) => updateSection("hero", "scrollLabel", value)}
          />
          <Field
            label="Vertical label"
            value={content.hero.toolsLabel}
            onChange={(value) => updateSection("hero", "toolsLabel", value)}
          />
          <Field
            label="Background video URL"
            value={content.hero.backgroundVideo}
            onChange={(value) =>
              updateSection("hero", "backgroundVideo", value)
            }
            className="md:col-span-2"
          />
          <Field
            label="Hero description"
            value={content.hero.description}
            onChange={(value) => updateSection("hero", "description", value)}
            multiline
            className="md:col-span-2"
          />
        </div>
      </Panel>

      <Panel
        title="About and stats"
        description="Edit the about section, expertise tags, and animated statistics."
      >
        <div className="grid gap-4 md:grid-cols-2">
          <Field
            label="Section intro"
            value={content.about.eyebrow}
            onChange={(value) => updateSection("about", "eyebrow", value)}
          />
          <Field
            label="Heading (white)"
            value={content.about.heading}
            onChange={(value) => updateSection("about", "heading", value)}
          />
          <Field
            label="Heading (green)"
            value={content.about.accentHeading}
            onChange={(value) => updateSection("about", "accentHeading", value)}
          />
          <Field
            label="Heading ending"
            value={content.about.trailingHeading}
            onChange={(value) =>
              updateSection("about", "trailingHeading", value)
            }
          />
          <Field
            label="About description"
            value={content.about.description}
            onChange={(value) => updateSection("about", "description", value)}
            multiline
            className="md:col-span-2"
          />
          <Field
            label="Expertise tags (one per line)"
            value={content.about.tags.join("\n")}
            onChange={(value) =>
              updateSection(
                "about",
                "tags",
                value
                  .split("\n")
                  .map((tag) => tag.trim())
                  .filter(Boolean),
              )
            }
            multiline
            className="md:col-span-2"
          />
        </div>
        <div className="space-y-3">
          {content.about.stats.map((stat, index) => (
            <div
              key={`${stat.label}-${index}`}
              className="grid gap-3 rounded-xl border p-3 sm:grid-cols-[1fr_1fr_2fr_auto]"
              style={{ borderColor: "var(--admin-border)" }}
            >
              <Field
                label="Value"
                type="number"
                min="0"
                value={stat.value}
                onChange={(value) => updateStat(index, "value", Number(value))}
              />
              <Field
                label="Suffix"
                value={stat.suffix}
                onChange={(value) => updateStat(index, "suffix", value)}
              />
              <Field
                label="Label"
                value={stat.label}
                onChange={(value) => updateStat(index, "label", value)}
              />
              <button
                type="button"
                aria-label="Remove stat"
                disabled={content.about.stats.length <= 1}
                onClick={() =>
                  updateSection(
                    "about",
                    "stats",
                    content.about.stats.filter(
                      (_, statIndex) => statIndex !== index,
                    ),
                  )
                }
                className="self-end rounded-lg p-2 text-red-400 disabled:opacity-30"
              >
                <Trash2 size={17} />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addStat}
            className="admin-muted flex items-center gap-2 text-sm"
          >
            <Plus size={15} /> Add stat
          </button>
        </div>
      </Panel>

      <Panel
        title="Portfolio projects"
        description="Add or edit the projects shown in the homepage portfolio. Images selected from your device are saved with the page content (up to 2 MB each, 6 MB total)."
      >
        <div className="grid gap-4 md:grid-cols-2">
          <Field
            label="Section eyebrow"
            value={content.projects.eyebrow}
            onChange={(value) => updateSection("projects", "eyebrow", value)}
          />
          <Field
            label="Section heading"
            value={content.projects.heading}
            onChange={(value) => updateSection("projects", "heading", value)}
          />
          <Field
            label="Section description"
            value={content.projects.intro}
            onChange={(value) => updateSection("projects", "intro", value)}
            multiline
            className="md:col-span-2"
          />
          <Field
            label="GitHub profile URL"
            value={content.projects.githubUrl}
            onChange={(value) => updateSection("projects", "githubUrl", value)}
            className="md:col-span-2"
          />
        </div>
        <div className="space-y-3">
          {content.projects.items.map((project, index) => (
            <details
              key={project.id}
              open={index === 0}
              className="rounded-xl border p-4"
              style={{ borderColor: "var(--admin-border)" }}
            >
              <summary className="admin-heading cursor-pointer font-medium">
                {project.title || "Untitled project"}
              </summary>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <Field
                  label="Project name"
                  value={project.title}
                  onChange={(value) =>
                    updateItem("projects", index, "title", value)
                  }
                />
                <Field
                  label="Category"
                  value={project.label}
                  onChange={(value) =>
                    updateItem("projects", index, "label", value)
                  }
                />
                <Field
                  label="Description"
                  value={project.description}
                  onChange={(value) =>
                    updateItem("projects", index, "description", value)
                  }
                  multiline
                  className="md:col-span-2"
                />
                <Field
                  label="Technologies (comma separated)"
                  value={project.tech.join(", ")}
                  onChange={(value) =>
                    updateItem(
                      "projects",
                      index,
                      "tech",
                      value
                        .split(",")
                        .map((tech) => tech.trim())
                        .filter(Boolean),
                    )
                  }
                  className="md:col-span-2"
                />
                <Field
                  label="GitHub URL"
                  value={project.github}
                  onChange={(value) =>
                    updateItem("projects", index, "github", value)
                  }
                />
                <Field
                  label="Live project URL"
                  value={project.live}
                  onChange={(value) =>
                    updateItem("projects", index, "live", value)
                  }
                />
                <Field
                  label="Image URL (optional)"
                  value={
                    project.image.startsWith("data:image/") ? "" : project.image
                  }
                  onChange={(value) =>
                    updateItem("projects", index, "image", value)
                  }
                  className="md:col-span-2"
                  placeholder="https://…"
                />
                <label className="admin-muted flex cursor-pointer items-center gap-2 text-sm md:col-span-2">
                  <ImagePlus size={18} /> Choose image from device
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/gif"
                    className="sr-only"
                    onChange={(event) => {
                      uploadProjectImage(index, event.target.files?.[0]).catch(
                        (uploadError) => toast.error(uploadError.message),
                      );
                      event.target.value = "";
                    }}
                  />
                </label>
                {project.image && (
                  <img
                    src={project.image}
                    alt={`${project.title} preview`}
                    className="max-h-48 w-full rounded-xl object-cover md:col-span-2"
                  />
                )}
                <button
                  type="button"
                  onClick={() =>
                    updateSection(
                      "projects",
                      "items",
                      content.projects.items.filter(
                        (_, projectIndex) => projectIndex !== index,
                      ),
                    )
                  }
                  className="flex items-center gap-2 text-sm text-red-400"
                >
                  <Trash2 size={15} /> Remove project
                </button>
              </div>
            </details>
          ))}
          <button
            type="button"
            onClick={addProject}
            className="admin-muted flex items-center gap-2 text-sm"
          >
            <Plus size={15} /> Add project
          </button>
        </div>
      </Panel>

      <Panel
        title="Testimonials"
        description="Edit client quotes, names, ratings, and card accent colors."
      >
        <div className="grid gap-4 md:grid-cols-2">
          <Field
            label="Section eyebrow"
            value={content.testimonials.eyebrow}
            onChange={(value) =>
              updateSection("testimonials", "eyebrow", value)
            }
          />
          <Field
            label="Section heading"
            value={content.testimonials.heading}
            onChange={(value) =>
              updateSection("testimonials", "heading", value)
            }
          />
          <Field
            label="Section description"
            value={content.testimonials.intro}
            onChange={(value) => updateSection("testimonials", "intro", value)}
            multiline
            className="md:col-span-2"
          />
        </div>
        <div className="space-y-3">
          {content.testimonials.items.map((testimonial, index) => (
            <details
              key={testimonial.id}
              open={index === 0}
              className="rounded-xl border p-4"
              style={{ borderColor: "var(--admin-border)" }}
            >
              <summary className="admin-heading cursor-pointer font-medium">
                {testimonial.name || "New testimonial"}
              </summary>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <Field
                  label="Client name"
                  value={testimonial.name}
                  onChange={(value) =>
                    updateItem("testimonials", index, "name", value)
                  }
                />
                <Field
                  label="Role / company"
                  value={testimonial.role}
                  onChange={(value) =>
                    updateItem("testimonials", index, "role", value)
                  }
                />
                <Field
                  label="Testimonial"
                  value={testimonial.quote}
                  onChange={(value) =>
                    updateItem("testimonials", index, "quote", value)
                  }
                  multiline
                  className="md:col-span-2"
                />
                <label className="admin-muted text-sm">
                  <span className="mb-1.5 block">Rating</span>
                  <select
                    className={inputClass}
                    value={testimonial.rating}
                    onChange={(event) =>
                      updateItem(
                        "testimonials",
                        index,
                        "rating",
                        Number(event.target.value),
                      )
                    }
                  >
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <option key={rating} value={rating}>
                        {rating} stars
                      </option>
                    ))}
                  </select>
                </label>
                <label className="admin-muted text-sm">
                  <span className="mb-1.5 block">Card color</span>
                  <input
                    type="color"
                    value={testimonial.color}
                    onChange={(event) =>
                      updateItem(
                        "testimonials",
                        index,
                        "color",
                        event.target.value,
                      )
                    }
                    className={`${inputClass} h-10 p-1`}
                  />
                </label>
                <button
                  type="button"
                  disabled={content.testimonials.items.length <= 1}
                  onClick={() =>
                    updateSection(
                      "testimonials",
                      "items",
                      content.testimonials.items.filter(
                        (_, testimonialIndex) => testimonialIndex !== index,
                      ),
                    )
                  }
                  className="flex items-center gap-2 text-sm text-red-400 disabled:opacity-30"
                >
                  <Trash2 size={15} /> Remove testimonial
                </button>
              </div>
            </details>
          ))}
          <button
            type="button"
            onClick={addTestimonial}
            className="admin-muted flex items-center gap-2 text-sm"
          >
            <Plus size={15} /> Add testimonial
          </button>
        </div>
      </Panel>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={save}
          disabled={saving}
          className="flex items-center gap-2 rounded-xl bg-[#4ade80] px-5 py-3 text-sm font-semibold text-black disabled:opacity-50"
        >
          <Save size={16} /> {saving ? "Saving…" : "Save changes"}
        </button>
      </div>
    </div>
  );
}
