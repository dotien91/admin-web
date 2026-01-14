import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Support - ChessBuddy",
  description: "Customer support and contact information for ChessBuddy mobile application",
};

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-sm p-8 md:p-12">
          <h1 className="text-4xl font-bold text-black dark:text-zinc-50 mb-2">
            SUPPORT
          </h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-8">
            How can we help you?
          </p>

          <div className="prose prose-zinc dark:prose-invert max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-black dark:text-zinc-50 mb-4">
                Contact Us
              </h2>
              <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-4">
                If you're experiencing any issues with ChessBuddy, have suggestions for improvement, or need assistance, our support team is here to help.
              </p>
              <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                Please reach out to us via email and we'll get back to you as soon as possible.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-black dark:text-zinc-50 mb-4">
                Support Email
              </h2>
              <div className="bg-zinc-50 dark:bg-zinc-800/50 p-6 rounded-lg border border-zinc-200 dark:border-zinc-800">
                <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                  📧{" "}
                  <a
                    href="mailto:apporastudio@gmail.com"
                    className="text-blue-600 dark:text-blue-400 hover:underline font-medium text-lg"
                  >
                    apporastudio@gmail.com
                  </a>
                </p>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-4 italic">
                  Tip: When contacting us, please include your device model and a brief description of the issue for faster assistance.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-black dark:text-zinc-50 mb-4">
                Other Resources
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <a 
                  href="/privacy" 
                  className="block p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition-colors"
                >
                  <h3 className="font-medium text-black dark:text-zinc-50">Privacy Policy</h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">Learn how we handle your data</p>
                </a>
                <a 
                  href="/tos" 
                  className="block p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition-colors"
                >
                  <h3 className="font-medium text-black dark:text-zinc-50">Terms of Service</h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">Read our terms and conditions</p>
                </a>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

