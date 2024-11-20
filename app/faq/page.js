"use client";
import Header from "../components/Header";

export default function FAQ() {
  return (
    <Header>
      <div className="min-h-screen bg-white py-16 px-8">
        <div className="max-w-4xl mx-auto">
          {/* FAQ Page Title */}
          <h1 className="text-2xl font-bold text-center mb-12 text-black">
            Frequently Asked Questions
          </h1>

          {/* FAQ Section */}
          <div className="space-y-8">
            {/* Question 1 */}
            <div className="pt-6 border-t border-black">
              <h2 className="text-xl font-semibold text-black">
                What is LuxeRide?
              </h2>
              <p className="text-black2 mt-2">
                LuxeRide is a platform where users can rent luxury cars and also
                invest in luxury cars to earn profits.
              </p>
            </div>

            {/* Question 2 */}
            <div className="pt-6 border-t border-black">
              <h2 className="text-xl font-semibold text-black">
                How do I rent a car on LuxeRide?
              </h2>
              <p className="text-black2 mt-2">
                You can browse through our collection of luxury cars, select the
                car you want, choose your rental period, and make a payment
                directly through our platform.
              </p>
            </div>

            {/* Question 3 */}
            <div className="pt-6 border-t border-black">
              <h2 className="text-xl font-semibold text-black">
                How can I invest in cars?
              </h2>
              <p className="text-black2 mt-2">
                LuxeRide offers an investment opportunity where you can
                co-invest in luxury cars. As the value of these cars increases,
                you earn profits based on your share of the investment.
              </p>
            </div>

            {/* Question 4 */}
            <div className="pt-6 border-t border-black">
              <h2 className="text-xl font-semibold text-black">
                What payment methods are accepted?
              </h2>
              <p className="text-black2 mt-2">
                We accept major credit cards, debit cards, and bank transfers.
                We also support payments via cryptocurrencies for your
                convenience.
              </p>
            </div>

            {/* Question 5 */}
            <div className="pt-6 border-t border-black">
              <h2 className="text-xl font-semibold text-black">
                Is LuxeRide available in my country?
              </h2>
              <p className="text-black2 mt-2">
                LuxeRide is expanding globally. Currently, we operate in
                selected countries. Please check the availability of our
                services in your region by visiting our country selection page.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Header>
  );
}
