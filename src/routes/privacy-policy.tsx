import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy-policy")({
  component: PrivacyPage,
  head: () => ({
    meta: [
      { title: "Privacy Policy – Swift Mod" },
      {
        name: "description",
        content:
          "Swift Mod's privacy policy explains what data we collect, how we use cookies, and how Google AdSense personalises advertising.",
      },
    ],
  }),
});

function PrivacyPage() {
  return (
    <article className="mx-auto max-w-3xl space-y-4 text-sm leading-7 text-foreground">
      <h1 className="text-3xl font-bold">Privacy Policy</h1>
      <p className="text-muted-foreground">Last updated: May 2025</p>

      <p>
        Swift Mod ("we", "us", "our") operates the website swiftmod.app. This page informs you
        of our policies regarding the collection and use of personal data.
      </p>

      <h2 className="mt-6 text-xl font-bold">Information We Collect</h2>
      <p>
        We do not collect personally identifiable information unless you voluntarily provide it
        via our contact form. We collect anonymous usage data through Google Analytics to
        understand how visitors use our site.
      </p>

      <h2 className="mt-6 text-xl font-bold">Cookies</h2>
      <p>
        We use cookies to improve your experience. Google AdSense, our advertising partner, uses
        cookies to serve relevant ads based on your prior visits to our site and other sites on
        the internet. You can opt out of personalised advertising by visiting{" "}
        <a className="text-brand" href="https://adssettings.google.com" target="_blank" rel="noreferrer">
          Google Ad Settings
        </a>
        .
      </p>

      <h2 className="mt-6 text-xl font-bold">Third Party Advertising</h2>
      <p>
        We use Google AdSense to display advertisements. Google uses cookies to serve ads based
        on your visits to this and other websites. These ads help us keep Swift Mod free for all
        users.
      </p>

      <h2 className="mt-6 text-xl font-bold">Third Party Links</h2>
      <p>
        Our site contains links to third party websites. We have no control over the content or
        privacy practices of those sites and accept no responsibility.
      </p>

      <h2 className="mt-6 text-xl font-bold">Children's Privacy</h2>
      <p>
        Swift Mod is not intended for children under 13. We do not knowingly collect data from
        children.
      </p>

      <h2 className="mt-6 text-xl font-bold">Contact</h2>
      <p>
        For privacy questions email{" "}
        <a className="text-brand" href="mailto:privacy@swiftmod.app">
          privacy@swiftmod.app
        </a>
        .
      </p>
    </article>
  );
}
