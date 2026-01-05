import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service - TFTBuddy",
  description: "Terms of Service for TFTBuddy mobile application",
};

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-sm p-8 md:p-12">
          <h1 className="text-4xl font-bold text-black dark:text-zinc-50 mb-2">
            TERMS OF SERVICE
          </h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-8">
            Last Updated: January 03, 2026
          </p>

          <div className="prose prose-zinc dark:prose-invert max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-black dark:text-zinc-50 mb-4">
                1. Acceptance of Terms
              </h2>
              <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                By downloading, installing, or using TFTBuddy, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the application.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-black dark:text-zinc-50 mb-4">
                2. Legal Disclaimer (Riot Games)
              </h2>
              <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                TFTBuddy isn't endorsed by Riot Games and doesn't reflect the views or opinions of Riot Games or anyone officially involved in producing or managing League of Legends. League of Legends and Riot Games are trademarks or registered trademarks of Riot Games, Inc. League of Legends © Riot Games, Inc.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-black dark:text-zinc-50 mb-4">
                3. Use License
              </h2>
              <p className="text-zinc-700 dark:text-zinc-300 mb-3">
                We grant you a limited, non-exclusive, non-transferable license to use the app for personal, non-commercial purposes only. You agree not to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-zinc-700 dark:text-zinc-300 ml-4">
                <li>Modify, copy, or reverse engineer the app.</li>
                <li>Use the app for any commercial purpose or public display.</li>
                <li>Attempt to circumvent any technical limitations in the software.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-black dark:text-zinc-50 mb-4">
                4. Intellectual Property
              </h2>
              <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                The app's original content (excluding Riot Games' assets), features, and functionality are and will remain the exclusive property of TFTBuddy and its licensors.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-black dark:text-zinc-50 mb-4">
                5. Limitation of Liability
              </h2>
              <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                TFTBuddy is provided on an "AS IS" and "AS AVAILABLE" basis. We make no warranties that the data provided (stats, tier lists, or guides) is 100% accurate or up-to-date. In no event shall the developers be liable for any damages arising from the use of this app.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-black dark:text-zinc-50 mb-4">
                6. Governing Law
              </h2>
              <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                These terms shall be governed and construed in accordance with the laws of Viet Nam, without regard to its conflict of law provisions.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-black dark:text-zinc-50 mb-4">
                7. Contact Us
              </h2>
              <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                If you have any questions about these Terms, please contact:{" "}
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

