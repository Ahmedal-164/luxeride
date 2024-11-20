"use client";
import Header from "../components/Header";

export default function PrivacyPolicy() {
  return (
    <Header>
      <div className="min-h-screen bg-white py-16 px-8">
        <div className="max-w-4xl mx-auto">
          {/* Page Title */}
          <h1 className="text-2xl font-bold text-center mb-12 text-black">
            Privacy Policy
          </h1>

          {/* Content Sections */}
          <div className="space-y-8">
            {/* Section 1 */}
            <div className="pt-6 border-t border-black">
              <h2 className="text-xl font-semibold text-black">Introduction</h2>
              <p className="text-black2 mt-2">
                LuxeRide values your privacy and is committed to protecting your
                personal data. This privacy policy outlines how we collect, use,
                and protect your information when you use our platform.
              </p>
            </div>

            {/* Section 2 */}
            <div className="pt-6 border-t border-black">
              <h2 className="text-xl font-semibold text-black">
                Information We Collect
              </h2>
              <p className="text-black2 mt-2">
                We may collect personal information such as your name, email
                address, payment details, and location when you use LuxeRide to
                rent or invest in cars.
              </p>
            </div>

            {/* Section 3 */}
            <div className="pt-6 border-t border-black">
              <h2 className="text-xl font-semibold text-black">
                How We Use Your Information
              </h2>
              <p className="text-black2 mt-2">
                Your information is used to provide and improve our services,
                process payments, communicate with you, and for marketing
                purposes, only with your consent.
              </p>
            </div>

            {/* Section 4 */}
            <div className="pt-6 border-t border-black">
              <h2 className="text-xl font-semibold text-black">
                Data Security
              </h2>
              <p className="text-black2 mt-2">
                LuxeRide takes the security of your data seriously. We implement
                appropriate security measures to prevent unauthorized access,
                disclosure, alteration, or destruction of your personal
                information.
              </p>
            </div>

            {/* Section 5 */}
            <div className="pt-6 border-t border-black">
              <h2 className="text-xl font-semibold text-black">
                Your Privacy Rights
              </h2>
              <p className="text-black2 mt-2">
                You have the right to request access to your personal data,
                request correction or deletion, and withdraw consent for data
                processing. Please contact us for any concerns regarding your
                privacy rights.
              </p>
            </div>

            {/* Section 6 */}
            <div className="pt-6 border-t border-black">
              <h2 className="text-xl font-semibold text-black">
                Changes to This Policy
              </h2>
              <p className="text-black2 mt-2">
                We may update this privacy policy from time to time. Any changes
                will be posted on this page, and we encourage you to review it
                regularly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Header>
  );
}
