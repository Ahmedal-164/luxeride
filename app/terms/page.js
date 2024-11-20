"use client";

import Header from "../components/Header";

export default function TermsOfService() {
  return (
    <Header>
      <div className="min-h-screen bg-white py-16 px-8">
        <div className="max-w-4xl mx-auto">
          {/* Page Title */}
          <h1 className="text-2xl font-bold text-center mb-12 text-black">
            Terms of Service
          </h1>

          {/* Content Sections */}
          <div className="space-y-8">
            {/* Section 1 */}
            <div className="pt-6 border-t border-black">
              <h2 className="text-xl font-semibold text-black">
                Acceptance of Terms
              </h2>
              <p className="text-black2 mt-2">
                By using LuxeRide, you agree to comply with these Terms of
                Service. Please read them carefully before accessing or using
                our platform.
              </p>
            </div>

            {/* Section 2 */}
            <div className="pt-6 border-t border-black">
              <h2 className="text-xl font-semibold text-black">
                User Responsibilities
              </h2>
              <p className="text-black2 mt-2">
                As a user, you are responsible for providing accurate
                information, maintaining the confidentiality of your account,
                and complying with applicable laws while using LuxeRide.
              </p>
            </div>

            {/* Section 3 */}
            <div className="pt-6 border-t border-black">
              <h2 className="text-xl font-semibold text-black">
                Prohibited Activities
              </h2>
              <p className="text-black2 mt-2">
                You agree not to use LuxeRide for illegal activities,
                unauthorized access, or to infringe the rights of others.
                Violating these terms may result in account suspension or legal
                action.
              </p>
            </div>

            {/* Section 4 */}
            <div className="pt-6 border-t border-black">
              <h2 className="text-xl font-semibold text-black">
                Payment and Refunds
              </h2>
              <p className="text-black2 mt-2">
                All payments made on LuxeRide are final. We may issue refunds at
                our discretion in accordance with our refund policy, which is
                available upon request.
              </p>
            </div>

            {/* Section 5 */}
            <div className="pt-6 border-t border-black">
              <h2 className="text-xl font-semibold text-black">
                Limitation of Liability
              </h2>
              <p className="text-black2 mt-2">
                LuxeRide is not liable for any direct, indirect, incidental, or
                consequential damages arising from the use or inability to use
                the platform.
              </p>
            </div>

            {/* Section 6 */}
            <div className="pt-6 border-t border-black">
              <h2 className="text-xl font-semibold text-black">Termination</h2>
              <p className="text-black2 mt-2">
                We reserve the right to terminate or suspend your account at any
                time if you violate these Terms of Service or engage in any
                fraudulent activity.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Header>
  );
}
