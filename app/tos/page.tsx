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
              <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-4">
                TFTBuddy is not endorsed by Riot Games and does not reflect the views or opinions of Riot Games or anyone officially involved in producing or managing League of Legends or Teamfight Tactics.
              </p>
              <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                League of Legends, Teamfight Tactics, and Riot Games are trademarks or registered trademarks of Riot Games, Inc.
              </p>
              <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mt-2">
                © Riot Games, Inc. All rights reserved.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-black dark:text-zinc-50 mb-4">
                3. License and Acceptable Use
              </h2>
              <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-2">
                We grant you a limited, non-exclusive, non-transferable, and revocable license to use TFTBuddy for personal and non-commercial purposes.
              </p>
              <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-2">
                You agree not to:
              </p>
              <ul className="list-disc list-inside space-y-1 text-zinc-700 dark:text-zinc-300 ml-4">
                <li>Copy, modify, or reverse engineer the app.</li>
                <li>Use the app for unlawful purposes.</li>
                <li>Attempt to interfere with or bypass security or technical safeguards.</li>
                <li>Use automated systems to access or scrape the app's content.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-black dark:text-zinc-50 mb-4">
                4. Intellectual Property
              </h2>
              <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-2">
                All original content, features, and functionality of TFTBuddy (excluding third-party content and Riot Games' assets) are the exclusive property of TFTBuddy and its licensors.
              </p>
              <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                Third-party trademarks and assets remain the property of their respective owners.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-black dark:text-zinc-50 mb-4">
                5. Data Accuracy Disclaimer
              </h2>
              <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                TFTBuddy provides game-related data such as statistics, tier lists, and guides for informational purposes only. While we strive for accuracy, we do not guarantee that the information is complete, accurate, or up to date.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-black dark:text-zinc-50 mb-4">
                6. Limitation of Liability
              </h2>
              <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                TFTBuddy is provided on an "AS IS" and "AS AVAILABLE" basis. To the fullest extent permitted by law, TFTBuddy and its developers shall not be liable for any indirect, incidental, or consequential damages arising from the use or inability to use the app.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-black dark:text-zinc-50 mb-4">
                7. Termination
              </h2>
              <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                We reserve the right to suspend or terminate access to TFTBuddy at any time, without prior notice, if you violate these Terms or misuse the application.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-black dark:text-zinc-50 mb-4">
                8. Changes to These Terms
              </h2>
              <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                We may update these Terms of Service from time to time. Continued use of the app after changes are posted constitutes your acceptance of the revised terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-black dark:text-zinc-50 mb-4">
                9. Governing Law
              </h2>
              <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                These Terms shall be governed and construed in accordance with the laws of Viet Nam, without regard to conflict of law principles.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-black dark:text-zinc-50 mb-4">
                10. Contact Us
              </h2>
              <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                If you have any questions about these Terms of Service, please contact us at:
              </p>
              <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mt-2">
                📧{" "}
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

