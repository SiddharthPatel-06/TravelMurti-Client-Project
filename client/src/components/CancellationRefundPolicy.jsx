import React from "react";
import { Link } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";

const CancellationRefundPolicy = () => {
  return (
    <div className="cancellation-refund-policy min-h-screen min-w-fit pt-20 md:pt-24">
      {/* Static Banner Image */}
      <div className="banner relative min-w-full mb-8">
        <img
          src="https://res.cloudinary.com/djrxcdfrr/image/upload/v1731676840/premium_photo-1683140513388-4344c8fc2778_kbd6ff.jpg"
          alt="Cancellation and Refund Policy"
          className="banner-image w-full h-48 md:h-64 object-cover"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-black bg-opacity-50">
          <p className="font-bold text-4xl md:text-5xl">
            Cancellation & Refund Policy
          </p>
          <p className="text-md flex items-center pt-2">
            <Link to="/" className="hover:underline">
              Home
            </Link>
            <FaChevronRight className="mx-2" size={14} />
            Cancellation & Refund Policy
          </p>
        </div>
      </div>

      {/* Cancellation and Refund Policy Description */}
      <div className="description px-4 md:px-8 lg:px-48 lg:py-14 py-12 text-gray-600">
        <p className="text-md md:text-base leading-relaxed mb-4">
          <strong>
            Policy Regarding Cancellation / NO SHOW / EARLY DEPARTURE:
          </strong>
          <br />
          In case of cancellation of tour/travel services due to any
          avoidable/unavoidable reason/s we must be informed in writing.
          Cancellation charges would be effective from the date we receive the
          letter in writing, and cancellation charges would be as follows:
        </p>

        <ul className="list-disc list-inside mb-4">
          <li>60 days & prior to arrival – 10% of the tour/service cost.</li>
          <li>
            59 days to 30 days prior to arrival – 20% of the tour/service cost.
          </li>
          <li>
            29 days to 15 days prior to arrival – 50% of the tour/service cost.
          </li>
          <li>
            14 days to 08 days prior to arrival – 75% of the tour/service cost.
          </li>
          <li>07 days & less, prior to arrival or no show – NO REFUND.</li>
        </ul>

        <p className="text-md md:text-base leading-relaxed mb-4">
          <strong>Please note:</strong>
          <br />
          Irrespective of above mentioned cancellations slabs – in case of
          cancellation of tour / travel services after the booking is made with
          us – a minimum 10% service charges would be applicable.
        </p>

        <p className="text-md md:text-base leading-relaxed mb-4">
          In case you cancel the trip after commencement refund would be
          restricted to a limited amount that too would depend on the amount
          that we would be able to recover from the hoteliers we patronize. For
          unused hotel accommodation, chartered transportation and missed meals
          etc. we do not bear any responsibility to refund.
        </p>

        <p className="text-md md:text-base leading-relaxed mb-4">
          In case of special train journey (like Palace on Wheels, Royal
          Rajasthan on Wheels, Deccan Odyssey, Golden Chariot, Indian Maharaja &
          Maharajas Express) – a separate cancellation policy is applicable
          (which would be advised as and when required).
        </p>

        <p className="text-md md:text-base leading-relaxed mb-4">
          Please note that if booking for following period is/are cancelled, due
          to whatsoever reason, no refund would be made for said cancellation.
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>High Peak Season bookings (from 20th Dec to 15th Jan). </li>
          <li>
            Festival Period Bookings (Festivals like -Diwali, Dussehra, Holi,
            Pushkar fair etc).{" "}
          </li>
          <li>Long Weekends Bookings. </li>
        </ul>

        <p className="text-md md:text-base leading-relaxed mb-4">
          <strong>Refund :</strong>
          <br />
          In regard to refund of unused / unutilized services (which are paid
          for and cancelled in advance) the refund amount would be worked out on
          the basis of cancellation policy as described above and the money
          would be accordingly refunded to the person who has made the payment
          to us. Please note that the refund process may take 2 – 4 weeks due to
          banking procedures. If the refund is made to the credit card account
          OR to Bank account, the bank charges would be debited from the refund
          amount.
        </p>
      </div>
    </div>
  );
};

export default CancellationRefundPolicy;
