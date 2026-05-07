import { createFileRoute, Link } from "@tanstack/react-router";
import { ShieldCheck, Users, Heart, Mail } from "lucide-react";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({
    meta: [
      { title: "About Swift Mod – Mod APK Discovery Platform" },
      {
        name: "description",
        content:
          "Swift Mod is a mod APK discovery platform launched in 2025. Learn about our mission, what we offer, and our safety promise.",
      },
      { property: "og:title", content: "About Swift Mod" },
      {
        property: "og:description",
        content: "Learn about Swift Mod, our mission, and our commitment to safe modded APKs.",
      },
    ],
  }),
});

function AboutPage() {
  return (
    <article className="prose prose-invert mx-auto max-w-3xl space-y-6 text-foreground">
      <header>
        <h1 className="text-3xl font-bold">About Swift Mod</h1>
        <p className="mt-2 text-muted-foreground">Last updated: May 2025</p>
      </header>

      <p>
        Swift Mod is a mod APK discovery platform launched in 2025. We help Android users find
        the best modded versions of their favourite games and apps. Every APK listed on our
        platform is sourced from trusted mod communities and verified before listing.
      </p>

      <p>
        Our mission is to make premium gaming features accessible to everyone. We do not charge
        for downloads and never will. Swift Mod is an independent platform and is not
        affiliated with Google Play Store or any original game developers.
      </p>

      <p>
        We take copyright seriously. If you are a developer and wish to have your app removed,
        please use our <Link to="/dmca" className="text-brand underline">DMCA page</Link> to
        submit a takedown request and we will respond within 24 hours.
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-lg border border-border bg-card p-4">
          <Heart className="mb-2 h-5 w-5 text-brand" />
          <h3 className="font-bold">Our Mission</h3>
          <p className="text-sm text-muted-foreground">
            Make premium mobile gaming features free and accessible for every Android user.
          </p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <ShieldCheck className="mb-2 h-5 w-5 text-brand" />
          <h3 className="font-bold">Safety Promise</h3>
          <p className="text-sm text-muted-foreground">
            Every APK is scanned for malware before it is listed. We re-test files weekly.
          </p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <Users className="mb-2 h-5 w-5 text-brand" />
          <h3 className="font-bold">Community First</h3>
          <p className="text-sm text-muted-foreground">
            Anyone can sign up to rate, comment, and request mods. Our directory grows with you.
          </p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <Mail className="mb-2 h-5 w-5 text-brand" />
          <h3 className="font-bold">Contact</h3>
          <p className="text-sm text-muted-foreground">
            Reach us anytime at{" "}
            <a className="text-brand" href="mailto:support@swiftmod.app">
              support@swiftmod.app
            </a>
            .
          </p>
        </div>
      </div>

      <h2 className="text-xl font-bold">DMCA &amp; Takedowns</h2>
      <p>
        We respect intellectual property rights. Please send DMCA notices to{" "}
        <a className="text-brand" href="mailto:dmca@swiftmod.app">dmca@swiftmod.app</a> with the
        URL of the infringing content. Confirmed infringing content is removed within 48 hours.
      </p>
    </article>
  );
}
