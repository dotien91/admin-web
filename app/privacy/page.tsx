import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - TFTBuddy",
  description: "Privacy Policy for TFTBuddy mobile application",
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
              <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                Welcome to TFTBuddy. We respect your privacy and are committed to protecting your personal data. This Privacy Policy outlines how we collect, use, and safeguard your information when you use our mobile application.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-black dark:text-zinc-50 mb-4">
                2. Information We Collect
              </h2>
              <div className="space-y-4 text-zinc-700 dark:text-zinc-300">
                <div>
                  <p className="font-medium mb-2">Personal Information:</p>
                  <p className="leading-relaxed">
                    We do not collect personally identifiable information unless you voluntarily provide it (e.g., signing up for an account via email).
                  </p>
                </div>
                <div>
                  <p className="font-medium mb-2">Game Data:</p>
                  <p className="leading-relaxed">
                    To provide features such as match history and player stats, we may collect your Riot ID or Summoner Name. This data is fetched via public APIs.
                  </p>
                </div>
                <div>
                  <p className="font-medium mb-2">Usage Data:</p>
                  <p className="leading-relaxed">
                    We may collect anonymous information about how the app is accessed and used (e.g., device type, operating system, and app usage statistics) through third-party tools like Firebase or Google Analytics.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-black dark:text-zinc-50 mb-4">
                3. How We Use Your Data
              </h2>
              <p className="text-zinc-700 dark:text-zinc-300 mb-3">
                We use the collected data to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-zinc-700 dark:text-zinc-300 ml-4">
                <li>Provide and maintain the Service.</li>
                <li>Personalize your user experience (e.g., saving favorite team comps).</li>
                <li>Monitor app performance and fix technical issues.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-black dark:text-zinc-50 mb-4">
                4. Data Retention and Deletion
              </h2>
              <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                We retain your information only as long as necessary. If you wish to delete your account or any associated data, you can do so within the App Settings or by contacting us at{" "}
                <a
                  href="mailto:apporastudio@gmail.com"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  apporastudio@gmail.com
                </a>
                .
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-black dark:text-zinc-50 mb-4">
                5. Contact Us
              </h2>
              <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                If you have any questions about this Privacy Policy, please contact us at:{" "}
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

