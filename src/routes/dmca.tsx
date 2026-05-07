import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dmca")({
  component: DmcaPage,
  head: () => ({
    meta: [
      { title: "DMCA Policy – Swift Mod" },
      {
        name: "description",
        content:
          "Swift Mod respects intellectual property rights. Submit DMCA takedown requests to dmca@swiftmod.app for a 24-hour response.",
      },
    ],
  }),
});

function DmcaPage() {
  return (
    <article className="mx-auto max-w-3xl space-y-4 text-sm leading-7 text-foreground">
      <h1 className="text-3xl font-bold">DMCA Policy</h1>
      <p>
        Swift Mod respects the intellectual property rights of others. If you believe your
        copyrighted work has been listed on our platform without authorisation, please submit a
        DMCA takedown notice to{" "}
        <a className="text-brand" href="mailto:dmca@swiftmod.app">dmca@swiftmod.app</a>.
      </p>

      <h2 className="mt-6 text-xl font-bold">Your notice must include:</h2>
      <ol className="list-inside list-decimal space-y-1">
        <li>Your full legal name and contact information</li>
        <li>Description of the copyrighted work</li>
        <li>The URL of the infringing content on our site</li>
        <li>A statement of good faith belief</li>
        <li>Your electronic signature</li>
      </ol>

      <p className="mt-6">
        We will respond within 24 hours and remove confirmed infringing content within 48 hours.
      </p>
    </article>
  );
}
