import React from "react";
import { Link } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";

const TourPackageBookingTerms = () => {
  return (
    <div className="tour-package-booking-terms min-h-screen min-w-fit pt-20 md:pt-24">
      {/* Static Banner Image */}
      <div className="banner relative min-w-full mb-8">
        <img
          src="https://res.cloudinary.com/djrxcdfrr/image/upload/v1731676840/premium_photo-1683140513388-4344c8fc2778_kbd6ff.jpg"
          alt="Banner"
          className="banner-image w-full h-48 md:h-64 object-cover"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-black bg-opacity-50">
          <p className="font-bold text-4xl text-center md:text-5xl">
            Tour Package Booking Terms
          </p>
          <p className="text-md flex items-center pt-2">
            <Link to="/" className="hover:underline">
              Home
            </Link>
            <FaChevronRight className="mx-2" size={14} />
            Tour Package Booking Terms
          </p>
        </div>
      </div>

      {/* Tour Package Booking Terms Description */}
      <div className="description px-4 md:px-8 lg:px-48 lg:py-14 py-12 text-gray-600">
        <p className="text-md md:text-base leading-relaxed mb-4">
          Welcome to Travel Murti. These Terms and Conditions ("Terms") apply to
          all users of our website and services. By using our services, you
          agree to these Terms, so please read them carefully. If you do not
          agree, please do not use our services .All correspondence(s) in
          respect of Tours / Travel Services and bookings should be addressed to
          M/s. Travel Murti..
        </p>

        <h2 className="font-bold text-lg md:text-xl mt-6">Booking:</h2>
        <p className="text-md md:text-base leading-relaxed mb-4">
          On confirmation of booking, your contract is with M/s Travel Murti. A
          contract exists between us when we confirm your tour/travel services
          and have received the deposit amount from your end.
        </p>

        <h2 className="font-bold text-lg md:text-xl mt-6">Payment:</h2>
        <p className="text-md md:text-base leading-relaxed mb-4">
          For the services contracted, a minimum deposit of 25% of the total
          cost is to be paid by you to M/s Travel Murti. The deposit is required
          to hold the booking on confirmed basis.
        </p>

        <h2 className="font-bold text-lg md:text-xl mt-6">Balance Payment:</h2>
        <p className="text-md md:text-base leading-relaxed mb-4">
          Balance payment is to be made 15 days prior to the date of start of
          services. Any booking made within 15 working days of the date of
          services would be considered to be a late booking, and for the same,
          the full and final payment is required to be made at the time of
          booking itself.
        </p>

        <h2 className="font-bold text-lg md:text-xl mt-6">Note:</h2>
        <p className="text-md md:text-base leading-relaxed mb-4">
          Apart from the above, in case of bookings for special train journeys,
          hotel or resort bookings during the peak season (X-Mas, New Year,
          Pushkar Fair, Diwali, etc.), full payment is required to be made at
          the time of booking itself.
        </p>

        <h2 className="font-bold text-lg md:text-xl mt-6">Mode of Payment:</h2>
        <ul className="list-disc pl-5 text-md md:text-base leading-relaxed mb-4">
          <li>
            Domestic clients can make payment using any of the following
            methods:-{" "}
          </li>
          <li>
            By Online Credit Card Payment (American Express / Visa / Master Card
            / Discover / Diners Club).
          </li>
          <li>By Online Debit Card Payment (by Master / Visa / Maestro).</li>
          <li>
            By Offline Credit Card Payment (American Express / Visa / Master
            Card / Discover / Diners Club).
          </li>
          <li>By Cash / Cheque / Demand Draft.</li>
          <li>By Bank Transfer (RTGS & NEFT and UPI).</li>
        </ul>

        <h2 className="font-bold text-lg md:text-xl mt-6">Note:</h2>
        <p className="text-md md:text-base leading-relaxed mb-4">
          In case of payment through credit/debit card, 3% bank charges would be
          levied over and above the total amount.
        </p>
        <p className="text-md md:text-base leading-relaxed mb-4">
          All payments should be free and clear of any withholding tax and
          deduction.
        </p>
        <p className="text-md md:text-base leading-relaxed mb-4">
          Bank charges, if any, for remittance (by remitting bank or by
          intermediary bank) would be strictly borne by payer. 
        </p>

        <h2 className="font-bold text-lg md:text-xl mt-6">
          Payments Procedure:
        </h2>
        <p className="text-md md:text-base leading-relaxed mb-4">
          All payments are to be made in the name of M/s Travel Murti.
        </p>
      </div>
    </div>
  );
};

export default TourPackageBookingTerms;
