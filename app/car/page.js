"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import cars from "../components/Cars";

export default function CarsPage() {
  const formatAmount = (amount) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    })
      .format(amount)
      .replace("NGN", "₦");
  };

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-6 text-black">Cars Collection</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-black">
        {cars.map((car, index) => (
          <Link
            href={`/car/${car.model.replace(/\s+/g, "-").toLowerCase()}`}
            key={index}
            className="bg-white2 rounded-md overflow-hidden shadow-lg transition-transform transform hover:scale-105"
          >
            <div className="relative">
              <Image
                src={car.mainImage}
                alt={car.make}
                width={300}
                height={250}
                className="w-full h-3/6 rounded-lg"
              />
              <div className="absolute top-5 left-5 bg-white2 text-black p-2 rounded-md text-xl">
                <p className="text-lg">
                  <span className="font-extrabold">
                    {formatAmount(car.rentingPrice)}
                  </span>
                  /Day
                </p>
              </div>
            </div>
            <div className="p-4">
              <h2 className="text-xl font-semibold">
                {car.make} {car.model}
              </h2>
              <p className="text-black2">
                Market Price: {formatAmount(car.purchasePrice)}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </DashboardLayout>
  );
}
