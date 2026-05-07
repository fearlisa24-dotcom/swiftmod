import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail } from "lucide-react";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  head: () => ({
    meta: [
      { title: "Contact Us – Swift Mod" },
      {
        name: "description",
        content:
          "Contact Swift Mod for general inquiries, bug reports, DMCA requests, or to request a mod. We respond within 24-48 hours.",
      },
      { property: "og:title", content: "Contact Swift Mod" },
      {
        property: "og:description",
        content: "Get in touch with Swift Mod – we respond within 24-48 hours.",
      },
    ],
  }),
});

const FAQ = [
  {
    q: "Are the APKs on Swift Mod safe to download?",
    a: "All APKs listed on Swift Mod are sourced from established mod communities. We recommend always downloading from trusted sources and keeping Google Play Protect enabled on your device.",
  },
  {
    q: "How often are the mods updated?",
    a: "We update our listings daily. When a new version of a game is released, we aim to have the modded version available within 48-72 hours.",
  },
  {
    q: "Why does my antivirus flag the APK file?",
    a: "Antivirus apps sometimes flag modded APKs as suspicious because they have been modified from the original. This is a false positive. The files listed on Swift Mod are tested before publishing.",
  },
  {
    q: "Can I request a specific game or app mod?",
    a: 'Yes! Use the contact form above and select "Request a Mod" as the subject. We will do our best to find and list the mod you need.',
  },
  {
    q: "How do I report a broken download link?",
    a: 'Use the contact form and select "Report Bug". Include the game name and we will fix it within 24 hours.',
  },
];

function ContactPage() {
  const [sent, setSent] = useState(false);
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };
  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-foreground">Contact Us</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Email{" "}
          <a className="text-brand" href="mailto:support@swiftmod.app">
            support@swiftmod.app
          </a>{" "}
          or use the form below. We respond within 24-48 hours.
        </p>
      </header>

      <form onSubmit={onSubmit} className="space-y-3 rounded-lg border border-border bg-card p-5">
        {sent ? (
          <div className="rounded-md bg-primary/10 p-4 text-sm text-primary">
            Thanks! Your message has been queued. We will reply to your email within 24-48
            hours.
          </div>
        ) : (
          <>
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="block text-sm">
                Name
                <input
                  required
                  maxLength={100}
                  className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
                />
              </label>
              <label className="block text-sm">
                Email
                <input
                  type="email"
                  required
                  maxLength={255}
                  className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
                />
              </label>
            </div>
            <label className="block text-sm">
              Subject
              <select
                required
                className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
              >
                <option>General Inquiry</option>
                <option>Report Bug</option>
                <option>DMCA Request</option>
                <option>Request a Mod</option>
                <option>Other</option>
              </select>
            </label>
            <label className="block text-sm">
              Message
              <textarea
                required
                rows={5}
                maxLength={2000}
                className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
              />
            </label>
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-md px-5 py-2.5 text-sm font-bold text-white"
              style={{ backgroundColor: "#22C55E" }}
            >
              <Mail className="h-4 w-4" /> Send Message
            </button>
          </>
        )}
      </form>

      <section>
        <h2 className="mb-4 text-xl font-bold text-foreground">Frequently Asked Questions</h2>
        <div className="space-y-3">
          {FAQ.map((f) => (
            <details
              key={f.q}
              className="rounded-md border border-border bg-card p-4 text-sm"
            >
              <summary className="cursor-pointer font-bold text-foreground">{f.q}</summary>
              <p className="mt-2 text-muted-foreground">{f.a}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
