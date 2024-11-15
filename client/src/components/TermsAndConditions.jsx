import React from "react";
import { Link } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";

const TermsAndConditions = () => {
  return (
    <div className="terms-and-conditions min-h-screen min-w-fit pt-20 md:pt-24">
      {/* Static Banner Image */}
      <div className="banner relative min-w-full mb-8">
        <img
          src="https://res.cloudinary.com/djrxcdfrr/image/upload/v1731676840/premium_photo-1683140513388-4344c8fc2778_kbd6ff.jpg"
          alt="Terms and Conditions Banner"
          className="banner-image w-full h-48 md:h-64 object-cover"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-black bg-opacity-50">
          <p className="font-bold text-4xl md:text-5xl">Terms & Conditions</p>
          <p className="text-md flex items-center pt-2">
            <Link to="/" className="hover:underline">
              Home
            </Link>
            <FaChevronRight className="mx-2" size={14} />
            Terms & Conditions
          </p>
        </div>
      </div>

      {/* Terms and Conditions Content */}
      <div className="content px-4 md:px-8 lg:px-48 lg:py-14 py-12 text-gray-600">
        <h2 className="font-semibold text-lg md:text-xl mb-4">
          TERMS & CONDITIONS-:
        </h2>
        <p className="text-md md:text-base leading-relaxed mb-4">
          Welcome to Travel Murt, These Terms and Conditions ("Terms") apply to
          all users of our website and services. By using our services, you
          agree to these Terms, so please read them carefully. If you do not
          agree, please do not use our services. All correspondence(s) in
          respect of Tours / Travel Services and bookings should be addressed to
          TRAVEL MURTI..
        </p>

        <h3 className="font-semibold text-md md:text-lg mb-2">Booking:</h3>
        <p className="text-md md:text-base leading-relaxed mb-4">
          On confirmation of booking, your contract is with M/s Travel Murti. A
          contract exists between us when we confirm your tour/travel services
          and have received the deposit amount from your end.
        </p>

        <h3 className="font-semibold text-md md:text-lg mb-2">Payment:</h3>
        <p className="text-md md:text-base leading-relaxed mb-4">
          For the services contracted, a minimum deposit of 25% of the total
          cost is to be paid by you to M/s Travel Murti. The deposit is required
          to hold the booking on a confirmed basis.
        </p>

        <h3 className="font-semibold text-md md:text-lg mb-2">
          Balance Payment:
        </h3>
        <p className="text-md md:text-base leading-relaxed mb-4">
          Balance payment is to be made 15 days prior to the date of start of
          services. Any booking made within 15 working days of the date of
          services would be considered a late booking, and for the same, the
          full and final payment is required at the time of booking.
        </p>
        <p className="text-md md:text-base leading-relaxed mb-4">
          <strong>Note:</strong> For bookings during the peak season (e.g.,
          X-Mas, New Year, Pushkar Fair, Diwali), full payment is required at
          the time of booking itself.
        </p>

        <h3 className="font-semibold text-md md:text-lg mb-2">
          Mode of Payment:
        </h3>
        <ul className="list-disc ml-6 md:ml-8 text-md md:text-base leading-relaxed mb-4">
          <li>
            Online Credit Card Payment (American Express / Visa / Master Card /
            Discover / Diners Club).
          </li>
          <li>Online Debit Card Payment (Master / Visa / Maestro).</li>
          <li>
            Offline Credit Card Payment (American Express / Visa / Master Card /
            Discover / Diners Club).
          </li>
          <li>By Cash / Cheque / Demand Draft.</li>
          <li>By Bank Transfer (RTGS & NEFT and UPI).</li>
        </ul>

        <h3 className="font-semibold text-md md:text-lg mb-2">Note:</h3>
        <ul className="list-disc ml-6 md:ml-8 text-md md:text-base leading-relaxed mb-4">
          <li>
            In case of payment through credit/ debit card, 3% bank charges would
            be levied over and above the total amount.{" "}
          </li>
          <li>
            All payments should be free and clear of any withholding tax and
            deduction.{" "}
          </li>
          <li>
            Bank charges, if any, for remittance (by remitting bank or by
            intermediary bank) would be strictly borne by payer. {" "}
          </li>
        </ul>

        {/*  */}
        <h3 className="font-semibold text-md md:text-lg mb-2">
          Payments Procedure:
        </h3>
        <p className="text-md md:text-base leading-relaxed mb-4">
          All payments are to be made in the name of M/s Travel Murti.
        </p>

        <h3 className="font-semibold text-md md:text-lg mb-2">
          Policy Regarding Cancellation / NO SHOW / EARLY DEPARTURE:
        </h3>
        <p className="text-md md:text-base leading-relaxed mb-4">
          In case of cancellation of tour/travel services due to any
          avoidable/unavoidable reason/s, we must be informed in writing.
          Cancellation charges would be effective from the date we receive the
          written notice, and the charges are as follows:
        </p>
        <ul className="list-disc pl-6 mb-4">
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

        <h3 className="font-semibold text-md md:text-lg mb-2">Please Note:</h3>
        <p className="text-md md:text-base leading-relaxed mb-4">
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
        <ul className="list-disc pl-6 mb-4">
          <li>High Peak Season bookings (from 20th Dec to 15th Jan). </li>
          <li>
            Festival Period Bookings (Festivals like -Diwali, Duseera, Holi,
            Pushkar fair etc).{" "}
          </li>
          <li>Long Weekends Bookings. </li>
        </ul>

        <h3 className="font-semibold text-md md:text-lg mb-2">Refund:</h3>
        <p className="text-md md:text-base leading-relaxed mb-4">
          In regard to refund of unused / unutilized services (which are paid
          for and cancelled in advance) the refund amount would be worked out on
          the basis of cancellation policy as described above and the money
          would be accordingly refunded to the person who has made the payment
          to us. Please note that the refund process may take 2 – 4 weeks due to
          banking procedures. If the refund is made to the credit card account
          OR to Bank account, the bank charges would be debited from the refund
          amount.
        </p>

        <h3 className="font-semibold text-md md:text-lg mb-2">
          Arrival and Departure Policy:
        </h3>
        <ul className="list-disc pl-6 mb-4">
          <li>Check-In Timings: 12:00 – 15:00 Hours </li>
          <li>
            Early arrival is subject to availability. For guaranteed early
            check-in, reservation needs to be made starting from the previous
            night.{" "}
          </li>
          <li>Check-Out Timings: 10:00 – 12:00 Hours </li>
          <li>
            Late check-outs are available on request and subject to availability
            / Payment{" "}
          </li>
        </ul>

        <h3 className="font-semibold text-md md:text-lg mb-2">
          Extra Usage of Vehicle:
        </h3>
        <p className="text-md md:text-base leading-relaxed mb-4">
          Please note that the cost of extra usage of vehicle (cars / coaches
          with the driver) is not included in the services and hence extra usage
          of Vehicle after transfer or after sightseeing is not allowed until
          unless it is mentioned in the detailed itinerary / services.
        </p>

        <h3 className="font-semibold text-md md:text-lg mb-2">
          Our Liabilities & Limitations:
        </h3>
        <p className="text-md md:text-base leading-relaxed mb-4">
          Please note that after the finalization of the tour/service cost, if
          there are any hikes in entrance fees of monuments/museums, taxes, fuel
          cost or guide charges by the Govt. of India, the same would be charged
          as extra.
        </p>
        <p className="text-md md:text-base leading-relaxed mb-4">
          Travel Murti rates are based on the prevailing rates as negotiated by
          us with the hotels, airlines etc. Hotels and Airlines retain the right
          to modify the rates without notice. In case of such change – the rates
          quoted by us before modification can be changed by us according to the
          modifications by hotels or airlines. Travel Murti and its associates
          acts only in the capacity of an agent for the hotels, airlines,
          transporters, railways & the contractors providing other services &
          all exchange orders, receipts, contracts & tickets issued by us – are
          issued subject to terms & conditions under which these services are
          provided by them. The tickets, coupons or passage contract in use by
          carrier / hotel or other contractors rendering services shall
          constitute the sole contract between the Clients and such contractor.
        </p>
        <p className="text-md md:text-base leading-relaxed mb-4">
          Travel Murti – itineraries are sample itineraries, intended to give
          you a general idea of the likely trip schedule. Numerous factors such
          as weather, road conditions, the physical ability of the participants
          etc. may dictate itinerary changes either before the tour or while on
          the trail. Travel Murti reserves the right to amend any aspect of the
          itinerary including transportation and accommodation without notice in
          the interest of the trip, participants’ safety, comfort and general
          wellbeing without making any rebate, allowance or refund and extra
          cost, if any, would be payable by the client.
        </p>
        <p className="text-md md:text-base leading-relaxed mb-4">
          Travel Murti shall not be responsible for any delay or change in
          programme or expenses incurred or special / consequential loss, injury
          and damage – directly or indirectly – due to natural hazards, flight
          cancellations, accident, breakdown of machinery or equipment’s,
          breakdown of transport, weather, sickness, landslides, political
          closures, acts of God, perils incident to the sea, floods, fire, acts
          of Government or any other authorities, wars, civil disturbances,
          riots, theft, pilferage, epidemics, quarantines, medical or custom
          department regulations, defaults, or any other causes beyond our
          control or any untoward incidents or any such causes whatsoever
          including any liability or extra expenses sustained by the Clients.
          Further, the Clients shall be liable for the liability or extra
          expenses incurred by him / her as a result of the forgoing causes.
        </p>
        <p className="text-md md:text-base leading-relaxed mb-4">
          Travel Murti shall not be responsible and shall not accept any
          liability towards the Clients or his/her legal representative for any
          loss of property or damages resulting from death or injuries including
          loss of services which the Clients may sustain on account of act,
          negligence or default by any transportation Company, hotel agents or
          any other body of persons, its agents or service providers providing
          such services or facilities or arising out of or while engaged in any
          tour, means of transportation or other services, whether due to
          ownership, maintenance , use, operation or control of any automobile,
          bicycle, boat, motor, or other vehicle in common carrier or otherwise
          and whether due to its or there negligence or otherwise or regardless
          of how caused. Clients using sporting equipment, bicycles, sailing
          boats, scuba diving gear, hired or supplied by hotels or rental bodies
          shall do so at their own risk.
        </p>
        <p className="text-md md:text-base leading-relaxed mb-4">
          Travel Murti do not have any insurance policy covering the expenses
          for accident, sickness, loss due to theft, or any other reasons.
          Visitors are advised to seek such insurance arrangements in their home
          country. All baggage & personal property/s at all times are at the
          client’s risk.
        </p>
        <p className="text-md md:text-base leading-relaxed mb-4">
          Travel Murti reserves the right to cancel any services in case it
          deems that the tour, trip or passage is impracticable for any reason
          or should circumstances warrant such action, upon refunding the value
          thereof and the Client shall not have any other or further claim
          against the company by any reason thereof.
        </p>
        <p className="text-md md:text-base leading-relaxed mb-4">
          Travel Murti reserves the right to refuse to carry out its contract
          with any person whom it may consider to be undesirable in its absolute
          discretion and it shall not be required to show any reason for doing
          so.
        </p>
        <p className="text-md md:text-base leading-relaxed mb-4">
          All disputes arising in connection with this Agreement shall be
          referred to an Arbitrator to be appointed by Travel Murti All such
          disputes shall be subject to the Jurisdiction of Lucknow High
          Court only. The laws of India shall govern the validity,
          interpretation, construction, performance and enforcement of these
          terms and conditions.
        </p>
      </div>
    </div>
  );
};

export default TermsAndConditions;
