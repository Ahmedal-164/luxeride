"use client";

import Image from "next/image";
import Header from "../components/Header";
import car from "../images/car4.jpeg";
import arabicman from "../images/arabicman.jpeg";
import arabicwoman from "../images/arabicwoman.jpeg";
import american from "../images/american.jpeg";
import chinese from "../images/chinese.jpeg";
import french from "../images/french.jpeg";
import german from "../images/german.jpeg";
import japanesse from "../images/japanesse.jpeg";

const About = () => {
  return (
    <Header>
      <div className="bg-white">
        {/* Section 1: Two write-ups side by side */}
        <section className="flex flex-col lg:flex-row justify-between items-center p-8 lg:space-x-8 space-y-8 lg:space-y-0 bg-gray-100">
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <h2 className="text-xl font-bold mb-4 text-black">Our Mission</h2>
            <p className="text-black text-base">
              At LuxeRide, our mission is to provide our clients with a luxury
              car rental experience like no other. We aim to bring convenience,
              style, and affordability into the luxury car market.
            </p>
          </div>
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <h2 className="text-xl font-bold mb-4 text-black">Our Vision</h2>
            <p className="text-black text-base">
              We envision a future where luxury cars are not just a dream but a
              reality for everyone. Through our investment opportunities, we
              want to bring high-end automobiles to more people and redefine
              mobility.
            </p>
          </div>
        </section>

        {/* Section 2: Background image */}
        <section
          className="relative w-full h-64 bg-cover bg-center"
          style={{ backgroundImage: `url(${car.src})` }}
        >
          <div className="absolute inset-0 bg-black opacity-60 z-0"></div>
          <div className="relative z-10 bg-black bg-opacity-50 flex items-center justify-center"></div>
        </section>

        {/* Section 3: Team Members */}
        <section className="p-8 bg-gray-100">
          <h2 className="text-center text-3xl font-bold mb-8">Meet Our Team</h2>
          <div className="flex flex-wrap justify-center gap-6">
            {/* First Row: 4 members */}
            <div className="flex flex-wrap justify-center gap-6">
              {[
                {
                  name: "Ahmed Al-Farsi",
                  position: "CEO",
                  image: arabicman,
                },
                {
                  name: "Laila Khalil",
                  position: "COO",
                  image: arabicwoman,
                },
                {
                  name: "Sophia Müller",
                  position: "CTO",
                  image: german,
                },
                {
                  name: "Thomas Devereux",
                  position: "CFO",
                  image: french,
                },
              ].map((member, index) => (
                <div
                  key={index}
                  className="w-full sm:w-1/2 lg:w-1/4 bg-white2 shadow-lg p-4 rounded-lg"
                >
                  <Image
                    src={member.image}
                    alt={`${member.name}`}
                    width={150}
                    height={150}
                    className="rounded-full mx-auto mb-4"
                  />
                  <h3 className="text-xl font-semibold text-center text-black">
                    {member.name}
                  </h3>
                  <p className="text-black2 text-center">{member.position}</p>
                </div>
              ))}
            </div>

            {/* Second Row: 3 members */}
            <div className="flex flex-wrap justify-center gap-6 mt-6">
              {[
                {
                  name: "Jessica Taylor",
                  position: "Marketing Head",
                  image: american,
                },
                {
                  name: "Mei Lin Chen",
                  position: "Lead Developer",
                  image: chinese,
                },
                {
                  name: "Haruto Sato",
                  position: "HR Manager",
                  image: japanesse,
                },
              ].map((member, index) => (
                <div
                  key={index}
                  className="w-full sm:w-1/2 lg:w-1/3 bg-white2 shadow-lg p-4 rounded-lg"
                >
                  <Image
                    src={member.image}
                    alt={`${member.name}`}
                    width={150}
                    height={150}
                    className="rounded-full mx-auto mb-4"
                  />
                  <h3 className="text-xl font-semibold text-center text-black">
                    {member.name}
                  </h3>
                  <p className="text-gray-600 text-center text-black2">
                    {member.position}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </Header>
  );
};

export default About;
