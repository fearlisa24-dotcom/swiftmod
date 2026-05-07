import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/terms")({
  component: TermsPage,
  head: () => ({
    meta: [
      { title: "Terms of Service – Swift Mod" },
      {
        name: "description",
        content:
          "Swift Mod terms of service: how we operate, what we are not responsible for, and your responsibilities as a user.",
      },
    ],
  }),
});

function TermsPage() {
  return (
    <article className="mx-auto max-w-3xl space-y-4 text-sm leading-7 text-foreground">
      <h1 className="text-3xl font-bold">Terms of Service</h1>
      <p className="text-muted-foreground">Last updated: May 2025</p>
      <p>By using Swift Mod you agree to these terms.</p>

      <h2 className="mt-6 text-xl font-bold">1. Use of Platform</h2>
      <p>
        Swift Mod is a mod APK discovery and information platform. We provide information about
        modded Android applications sourced from the community.
      </p>

      <h2 className="mt-6 text-xl font-bold">2. Disclaimer</h2>
      <p>
        Swift Mod does not host APK files on its own servers. We link to files hosted by third
        party mod communities. We are not responsible for the content of those files.
      </p>

      <h2 className="mt-6 text-xl font-bold">3. Copyright</h2>
      <p>
        Swift Mod respects intellectual property rights. If you believe content on our site
        infringes your copyright please contact{" "}
        <a className="text-brand" href="mailto:dmca@swiftmod.app">dmca@swiftmod.app</a>.
      </p>

      <h2 className="mt-6 text-xl font-bold">4. User Responsibilities</h2>
      <p>
        Users are responsible for ensuring that downloading modded APKs complies with the laws
        in their country and the terms of service of the original app.
      </p>

      <h2 className="mt-6 text-xl font-bold">5. Limitation of Liability</h2>
      <p>
        Swift Mod is provided as-is without warranties. We are not liable for any damages
        arising from use of this platform or downloaded files.
      </p>

      <h2 className="mt-6 text-xl font-bold">6. Changes to Terms</h2>
      <p>
        We may update these terms at any time. Continued use of the site constitutes acceptance
        of new terms.
      </p>

      <p>
        Contact:{" "}
        <a className="text-brand" href="mailto:legal@swiftmod.app">
          legal@swiftmod.app
        </a>
      </p>
    </article>
  );
}
