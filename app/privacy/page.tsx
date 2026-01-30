import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - ChessBuddy",
  description: "Privacy Policy for ChessBuddy mobile application",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-sm p-8 md:p-12">
          <h1 className="text-4xl font-bold text-black dark:text-zinc-50 mb-2">
            PRIVACY POLICY
          </h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-8">
            Last Updated: January 30, 2026
          </p>

          <div className="prose prose-zinc dark:prose-invert max-w-none">
            {/* 1. Introduction */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
              <p>
                Welcome to ChessBuddy. We respect your privacy and are committed
                to protecting your information.
              </p>
              <p className="mt-4">
                This Privacy Policy explains how we collect, use, and safeguard
                information when you use the ChessBuddy mobile application.
              </p>
              <p className="mt-4">
                By using ChessBuddy, you agree to the practices described in this
                Privacy Policy.
              </p>
            </section>

            {/* 2. Information We Collect */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">
                2. Information We Collect
              </h2>

              {/* 2.1 Personal Information */}
              <div className="mb-6">
                <h3 className="text-xl font-medium mb-2">
                  2.1 Personal Information
                </h3>
                <p>
                  We do not require you to create an account and do not collect
                  personal information such as your name, email address, phone
                  number, or precise location unless you voluntarily provide it.
                </p>
                <p className="mt-4">
                  If you choose to enter a Riot ID or Summoner Name, this
                  information is used solely to retrieve publicly available
                  game-related data via official Riot Games APIs and is not used
                  to identify you outside of app functionality.
                </p>
              </div>

              {/* 2.2 Location and Language */}
              <div className="mb-6">
                <h3 className="text-xl font-medium mb-2">
                  2.2 Location and Language Information
                </h3>
                <p>We may collect limited non-precise information such as:</p>
                <ul className="list-disc list-inside ml-4 mt-2">
                  <li>Approximate location (country or region)</li>
                  <li>Device language and locale settings</li>
                </ul>
                <p className="mt-4">
                  This information does not include precise GPS location data and
                  is used to improve app localization, performance, and
                  analytics.
                </p>
              </div>

              {/* 2.3 Usage Data */}
              <div className="mb-6">
                <h3 className="text-xl font-medium mb-2">2.3 Usage Data</h3>
                <p>
                  We may collect usage data such as app launches, taps, views,
                  scrolling behavior, and interactions with content and
                  advertisements.
                </p>
                <p className="mt-4">
                  This data may be collected directly by us or by third-party
                  partners for analytics and advertising purposes.
                </p>
              </div>

              {/* 2.4 Advertising & Tracking */}
              <div>
                <h3 className="text-xl font-medium mb-2">
                  2.4 Advertising and Tracking
                </h3>
                <p>
                  ChessBuddy displays third-party advertisements provided by
                  Google AdMob.
                </p>
                <p className="mt-4">
                  AdMob may collect and use device identifiers (such as the
                  device’s advertising identifier), product interaction data,
                  and advertising data to:
                </p>
                <ul className="list-disc list-inside ml-4 mt-2">
                  <li>Deliver personalized or non-personalized ads</li>
                  <li>Measure advertising performance</li>
                  <li>Prevent fraud and abuse</li>
                  <li>Perform analytics and attribution</li>
                </ul>
                <p className="mt-4">
                  This data may be considered “tracking” under Apple’s App
                  Tracking Transparency (ATT) framework.
                </p>
              </div>
            </section>

            {/* 3. How We Use Your Information */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">
                3. How We Use Your Information
              </h2>
              <p>We use collected information to:</p>
              <ul className="list-disc list-inside ml-4 mt-2">
                <li>Provide and maintain core app functionality</li>
                <li>Display game-related information and statistics</li>
                <li>Improve app performance, stability, and user experience</li>
                <li>Analyze aggregated usage and performance metrics</li>
                <li>Display third-party advertisements</li>
                <li>Measure the effectiveness of advertising campaigns</li>
              </ul>
            </section>

            {/* 4. Data Retention */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">4. Data Retention</h2>
              <p>
                We retain collected information only for as long as necessary to
                fulfill the purposes described in this Privacy Policy.
              </p>
              <p className="mt-4">
                Aggregated or anonymized data may be retained for statistical and
                analytical purposes.
              </p>
            </section>

            {/* 5. Data Sharing */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">5. Data Sharing</h2>
              <p>
                We do not sell your personal data. However, we may share certain
                data with trusted third-party service providers, such as Google
                AdMob, solely for advertising, analytics, and app functionality.
              </p>
              <p className="mt-4">
                These third parties process data in accordance with their own
                privacy policies and applicable laws.
              </p>
            </section>

            {/* 6. Data Security */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">6. Data Security</h2>
              <p>
                We implement reasonable technical and organizational safeguards
                to protect the information we collect against unauthorized
                access, loss, or misuse.
              </p>
            </section>

            {/* 7. Children */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">
                7. Children’s Privacy
              </h2>
              <p>
                ChessBuddy does not knowingly collect personal information from
                children under the age of 13.
              </p>
            </section>

            {/* 8. Privacy Rights */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">
                8. Your Privacy Rights
              </h2>
              <p>
                Depending on your jurisdiction, you may have the right to
                access, correct, or delete your data, or withdraw consent where
                applicable.
              </p>
            </section>

            {/* 9. Changes */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">
                9. Changes to This Privacy Policy
              </h2>
              <p>
                We may update this Privacy Policy from time to time. Changes will
                be reflected by updating the “Last Updated” date above.
              </p>
            </section>

            {/* 10. ATT */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">
                10. App Tracking Transparency
              </h2>
              <p>
                In accordance with Apple’s App Tracking Transparency framework,
                ChessBuddy requests your permission before allowing tracking
                across apps and websites owned by other companies.
              </p>
              <p className="mt-4">
                You may allow or deny tracking. Your choice does not affect
                access to core app functionality. You can change your preference
                at any time in your device settings.
              </p>
            </section>

            {/* 11. Contact */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">11. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please
                contact us at{" "}
                <a
                  href="mailto:apporastudio@gmail.com"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  apporastudio@gmail.com
                </a>
                .
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
