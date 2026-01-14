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
            Last Updated: January 03, 2026
          </p>

          <div className="prose prose-zinc dark:prose-invert max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-black dark:text-zinc-50 mb-4">
                1. Introduction
              </h2>
              <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-4">
                Welcome to ChessBuddy.
              </p>
              <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                We respect your privacy and are committed to protecting your information. This Privacy Policy explains how we collect, use, and safeguard information when you use our mobile application.
              </p>
              <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mt-4">
                By using ChessBuddy, you agree to the practices described in this Privacy Policy.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-black dark:text-zinc-50 mb-4">
                2. Information We Collect
              </h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-medium text-black dark:text-zinc-50 mb-2">2.1 Personal Information</h3>
                  <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-4">
                    We do not collect personally identifiable information such as your name, email address, phone number, or precise location unless you voluntarily provide it.
                  </p>
                  <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                    If you choose to enter a Riot ID or Summoner Name, this information is used solely to retrieve publicly available game-related data via official Riot Games APIs. We do not use this information for identification outside of in-app functionality.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-medium text-black dark:text-zinc-50 mb-2">2.2 Location and Language Information</h3>
                  <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-2">
                    We may collect:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-zinc-700 dark:text-zinc-300 ml-4 mb-4">
                    <li>Approximate location information (such as country or region)</li>
                    <li>Device language settings</li>
                  </ul>
                  <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-2">
                    This information:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-zinc-700 dark:text-zinc-300 ml-4">
                    <li>Is collected in an anonymized form</li>
                    <li>Is not linked to your identity</li>
                    <li>Does not include precise GPS location data</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-medium text-black dark:text-zinc-50 mb-2">2.3 Usage Data</h3>
                  <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-2">
                    We may collect anonymous usage data, such as:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-zinc-700 dark:text-zinc-300 ml-4 mb-4">
                    <li>App interactions</li>
                    <li>Device type</li>
                    <li>Operating system version</li>
                    <li>General usage patterns</li>
                  </ul>
                  <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                    This data is used only to understand overall app performance and feature usage. We do not use third-party advertising or analytics SDKs for tracking purposes.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-black dark:text-zinc-50 mb-4">
                3. How We Use Your Information
              </h2>
              <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-2">
                We use the collected information to:
              </p>
              <ul className="list-disc list-inside space-y-1 text-zinc-700 dark:text-zinc-300 ml-4 mb-4">
                <li>Provide and maintain core app functionality</li>
                <li>Display game-related information and statistics</li>
                <li>Improve app performance, stability, and user experience</li>
                <li>Analyze aggregated usage trends to guide future improvements</li>
              </ul>
              <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-2">
                We do not use your data for:
              </p>
              <ul className="list-disc list-inside space-y-1 text-zinc-700 dark:text-zinc-300 ml-4">
                <li>Advertising</li>
                <li>Marketing communications</li>
                <li>Cross-app or cross-service tracking</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-black dark:text-zinc-50 mb-4">
                4. Data Retention
              </h2>
              <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-4">
                We retain collected information only for as long as necessary to fulfill the purposes described in this Privacy Policy.
              </p>
              <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                Aggregated and anonymized data may be retained for statistical analysis. You may request deletion of any associated data by contacting us.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-black dark:text-zinc-50 mb-4">
                5. Data Sharing
              </h2>
              <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-4">
                We do not sell, rent, or share your data with third parties for advertising or tracking purposes.
              </p>
              <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                Game-related data retrieved using Riot APIs is governed by Riot Games’ terms and policies.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-black dark:text-zinc-50 mb-4">
                6. Data Security
              </h2>
              <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                We implement reasonable technical and organizational measures to protect the information we collect against unauthorized access, loss, or misuse.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-black dark:text-zinc-50 mb-4">
                7. Children’s Privacy
              </h2>
              <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                ChessBuddy does not knowingly collect personal information from children under the age of 13. If you believe such information has been collected, please contact us and we will take appropriate action.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-black dark:text-zinc-50 mb-4">
                8. Your Privacy Rights
              </h2>
              <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-2">
                Depending on your jurisdiction, you may have the right to:
              </p>
              <ul className="list-disc list-inside space-y-1 text-zinc-700 dark:text-zinc-300 ml-4">
                <li>Access your data</li>
                <li>Request correction or deletion</li>
                <li>Withdraw consent where applicable</li>
              </ul>
              <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mt-4">
                You may exercise these rights by contacting us.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-black dark:text-zinc-50 mb-4">
                9. Changes to This Privacy Policy
              </h2>
              <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                We may update this Privacy Policy from time to time. Any changes will be reflected by updating the “Last Updated” date above.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-black dark:text-zinc-50 mb-4">
                10. Contact Us
              </h2>
              <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                If you have any questions or concerns about this Privacy Policy, please contact us at:{" "}
                <a
                  href="mailto:apporastudio@gmail.com"
                  className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                >
                  apporastudio@gmail.com
                </a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
