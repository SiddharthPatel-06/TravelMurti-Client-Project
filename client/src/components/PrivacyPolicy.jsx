import React from "react";
import { Link } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";

const PrivacyPolicy = () => {
  return (
    <div className="privacy-policy min-h-screen pt-20 md:pt-24">
      {/* Static Banner Section */}
      <div className="banner relative mb-8">
        <img
          src="https://res.cloudinary.com/djrxcdfrr/image/upload/v1731676840/premium_photo-1683140513388-4344c8fc2778_kbd6ff.jpg"
          className="w-full h-48 md:h-64 object-cover"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-black bg-opacity-50">
          <p className="font-bold text-4xl md:text-5xl">Privacy Policy</p>
          <p className="text-md flex items-center pt-2">
            <Link to="/" className="hover:underline">
              Home
            </Link>
            <FaChevronRight className="mx-2" size={14} />
            Privacy Policy
          </p>
        </div>
      </div>

      {/* Privacy Policy Content */}
      <div className="content px-4 md:px-8 lg:px-48 py-12 text-gray-600">
        <h2 className="text-2xl  mb-4 font-semibold text-gray-700">
          PRIVACY POLICY
        </h2>
        <h3 className="text-xl font-semibold mb-2 text-gray-700">
          INTRODUCTION
        </h3>
        <p className="text-md md:text-base leading-relaxed mb-6">
          This Privacy Policy (“Policy”) applies to the securing and processing
          of personal data by Travel Murti in connection with personal data
          provided by any person (“User”) who has purchased or intends to
          purchase or inquiries about any product(s) or service(s) made by
          TRAVEL MURTI through any of TRAVEL MURTI’s interface channels
          including website, mobile site, and mobile app (collectively referred
          herein as “Sales Channels”).
        </p>
        <h3 className="text-xl font-semibold mb-2 text-gray-700">
          For the purpose of Privacy Policy:
        </h3>
        <p className="text-md md:text-base leading-relaxed mb-4 ">
          For the purpose of Privacy Policy:
        </p>
        <ul className="list-disc list-inside mb-6">
          <li>
            References in this policy to “you” or “your” are references to
            ‘User’.
          </li>
          <li>
            References to “we”, “us” or “our” are references to ‘Travel Murti’.
          </li>
          <li>
            References to “website” mean a reference to ‘website(s)’, ‘mobile
            site(s)’ and mobile app(s)’.
          </li>
        </ul>
        <p className="text-md md:text-base leading-relaxed mb-6">
          By accessing or using the website or any other sales channel, the User
          agrees with the terms of the Privacy Policy and the contents herein.
          If you disagree with the Privacy Policy, please do not access or use
          our website or any other Sales Channels.
        </p>
        <p className="text-md md:text-base leading-relaxed mb-6">
          This privacy policy does not apply to any third party website(s),
          mobile site(s) and mobile app(s). Users are requested to take note
          that information and privacy practices of TRAVEL MURTI’s business
          partners, advertisers, sponsors or other sites to which TRAVEL MURTI
          provides hyperlink(s), may be different from this privacy policy,
          Hence, it is recommended that you review the privacy policy of any
          such third parties before you interact. 
        </p>
        <p className="text-md md:text-base leading-relaxed mb-6">
          Your privacy is important to us and we recognize that the use and
          disclosure of personal data has important implications for us and for
          the users whose personal data we process.
        </p>
        <h3 className="text-xl font-semibold mb-2 text-gray-700">
          PURPOSE OF THIS POLICY
        </h3>
        <p className="text-md md:text-base leading-relaxed mb-4">
          We respect your need to understand how and why information is being
          collected, used, disclosed, transferred and stored. Thus we have
          developed this Policy to familiarize you with our practices. This
          policy sets out the way in which we process your information when you
          use our Website or other digital platforms in accordance with
          applicable data protection laws. It is important that you read this
          policy together with any other policies we may provide on specific
          occasions when we are collecting or processing your personal data, so
          that you are fully aware of how and why we are using your personal
          data. This policy supplements the other notices and is not intended to
          override them. 
        </p>
        <h3 className="text-xl font-semibold mb-2 text-gray-700">
          DEFINING CONTROLLER OF PERSONAL DATA
        </h3>
        <p className="text-md md:text-base leading-relaxed mb-4">
          A “Controller” is a person or organization who alone or jointly
          determines the purposes for which, and the manner in which, any
          personal data is, or is likely to be, processed. This notice is issued
          on behalf of TRAVEL MURTI as controller.  
        </p>
        <p className="text-md md:text-base leading-relaxed mb-4">
          Processor is a natural or legal person, public authority, agency or
          other body which processes personal data on behalf of the Controller. 
        </p>
        <p className="text-md md:text-base leading-relaxed mb-4">
          As the circumstances warrant TRAVEL MURTI may be Controller or
          Processor of your personal data.   
        </p>
        {/* <p className="text-md md:text-base leading-relaxed">
          <strong>Note:</strong> Additional policy details are available. Please
          contact us if you have further questions.
        </p> */}
        <h3 className="text-xl font-semibold mb-2 text-gray-700">
          TYPE OF PERSONAL DATA WE COLLECT
        </h3>
        <p className="text-md md:text-base leading-relaxed mb-4">
          Personal data includes any information about any user from which that
          person can be identified. It does not include personal data where the
          identity has been removed (anonymous data).    
        </p>
        <p className="text-md md:text-base leading-relaxed mb-4">
          You may be asked for personal data anytime you are in contact with
          TRAVEL MURTI directly or indirectly through a third party.     
        </p>
        <p className="text-md md:text-base leading-relaxed mb-4">
          We collect, use and share aggregated data such as statistical or
          demographic data for any purpose. Aggregated data may be derived from
          your personal data but is not considered personal data in law as this
          data does not directly or indirectly reveal your identity. For
          example, we may aggregate your Usage Data to calculate the percentage
          of users accessing a specific website feature. However, if we combine
          or connect aggregated data with your personal data so that it can
          directly or indirectly identify you, we treat the combined data as
          personal data which will be used in accordance with this policy.     
        </p>
        <p className="text-md md:text-base leading-relaxed mb-4">
          We do not collect any special categories of personal data about you
          through our Website (this includes details about your race or
          ethnicity, religious or philosophical beliefs, sex life, sexual
          orientation, political opinions, trade union membership, information
          about your health and genetic and biometric data). Nor do we collect
          any information about criminal convictions and offences.     
        </p>
        <p className="text-md md:text-base leading-relaxed mb-4">
          We collect, use, store and transfer different kinds of personal data
          about you. We have grouped together the following categories of
          personal data to explain how this type of information is used by us.
          These terms are used throughout this Notice:     
        </p>
        {/*  */}
        <p className="text-md md:text-base leading-relaxed mb-4">
          “Contact Data”: including your residential address, work address,
          email address and telephone numbers;     
        </p>
        <p className="text-md md:text-base leading-relaxed mb-4">
          “Identity Data”: including your first name, last name, username or
          similar identifier, title;     
        </p>
        <p className="text-md md:text-base leading-relaxed mb-4">
          “Website User Data”: Usernames, Passwords and other security related
          information used by you in relation to our services     
        </p>
        <p className="text-md md:text-base leading-relaxed mb-4">
          “Transaction Data: Transactional history about your e-commerce
          activities, buying behavior. Information pertaining any other
          traveler(s) for whom you made a booking through your registered TRAVEL
          MURTI account. In such case, you must confirm and represent that each
          of the other traveler(s) for whom a booking has been made, has agreed
          to have the information shared by you disclosed to us and further be
          shared by us with the concerned service provider(s). “Marketing and
          Communications Data”: including your marketing and communication
          preferences. We also track when you receive and read marketing
          communications from us, which information we use to improve our
          marketing services, provide you with more relevant information and
          improve the quality of our marketing materials.     
        </p>
        <p className="text-md md:text-base leading-relaxed mb-4">
          Additional information about the personal data we process in
          connection with marketing is included with the marketing
          communications we send you;     
        </p>
        <p className="text-md md:text-base leading-relaxed mb-4">
          “Public Domain or Third Party Data”: Data available in public domain
          or received from any third party including social media channels,
          including but not limited to personal or non-personal information from
          your linked social media channels (like name, email address, friend
          list, profile pictures or any other information that is permitted to
          be received as per your account settings) as a part of your account
          information.     
        </p>
        <p className="text-md md:text-base leading-relaxed mb-4">
          “Profile Data”: including information collected progressively when you
          visit our site including your referral website, pages you visit,
          actions you take, patterns of page visits and information from forms
          you fill in;     
        </p>
        <p className="text-md md:text-base leading-relaxed mb-4">
          <span className="font-bold">“Technical Data”:</span> includes
          information collected when you access our website, mobile site or
          mobile app your internet protocol (IP) address, your login data,
          browser type and version, time zone setting and location, browser
          plug-in types and versions, operating system and platform and other
          technology on the devices you are using; and     
        </p>
        <p className="text-md md:text-base leading-relaxed mb-4">
          <span className="font-bold">“Usage Data”:</span> information about how
          you use our Website.    
        </p>
        <p className="text-md md:text-base leading-relaxed mb-4">
          <span className="font-bold">“Any other Personal Data”:</span> If you
          request TRAVEL MURTI to provide visa related services, then copies of
          your passport, bank statements, originals of the filled in application
          forms, photographs, and any other information which may be required by
          the respective embassy to process your visa application. If you
          request TRAVEL MURTI to provide foreign exchange (forex) related
          services then passport copies, A2 form, air tickets or travel
          authentication document to verify confirmed travel or any other
          documents required to process your Forex transaction.     
        </p>
        {/*  */}
        <h3 className="text-xl font-semibold mb-2 text-gray-700">
          {" "}
          MODES OF COLLECTING PERSONAL DATA{" "}
        </h3>{" "}
        <p className="text-md md:text-base leading-relaxed mb-4">
          {" "}
          The only way we will get any kind of personal data is if you choose to
          give it to us in the following circumstances:{" "}
        </p>{" "}
        <p className="text-md md:text-base leading-relaxed mb-4">
          {" "}
          <strong>(a) Direct interaction:</strong>{" "}
          <ul className="list-disc ml-6">
            {" "}
            <li>
              When you make an enquiry or quotation request or make a
              reservation or purchase from our ‘Website’ or through our customer
              service team - by email(s), letter(s), fax, on the phone or in
              physical store
            </li>{" "}
            <li>
              When you register with us, subscribe to our newsletter, enter in
              lucky draws/competitions/surveys/feedback, send us queries or
              register for promotions
            </li>{" "}
            <li>
              When you engage with us in any online or offline event,
              promotions, or page hosted by us on a third-party platform or
              location
            </li>{" "}
            <li>Through cookies on our Website</li>{" "}
          </ul>{" "}
        </p>{" "}
        <p className="text-md md:text-base leading-relaxed mb-4">
          {" "}
          <strong>(b) Cookies and other technologies:</strong>{" "}
          <ul className="list-disc ml-6">
            {" "}
            <li>
              We receive Technical Data about your equipment, browsing actions
              and patterns. We collect this personal data by using cookies,
              server logs, and other similar technologies. Please see our
              cookies policy for further details of the information collected.
            </li>{" "}
          </ul>{" "}
        </p>{" "}
        <p className="text-md md:text-base leading-relaxed mb-4">
          {" "}
          <strong>(c) Third parties or publicly available sources:</strong>{" "}
          <ul className="list-disc ml-6">
            {" "}
            <li>
              We receive Technical Data from analytics providers such as Google.
            </li>{" "}
          </ul>{" "}
        </p>{" "}
        <h3 className="text-xl font-semibold mb-2 text-gray-700">
          {" "}
          GROUNDS FOR PROCESSING OF DATA{" "}
        </h3>{" "}
        <p className="text-md md:text-base leading-relaxed mb-4">
          {" "}
          When you use our Website, we will use your personal data in the
          following circumstances:{" "}
        </p>{" "}
        <p className="text-md md:text-base leading-relaxed mb-4">
          {" "}
          <ul className="list-disc ml-6">
            {" "}
            <li>
              <strong>“Performance of a contract”:</strong> where we need to
              perform a contract which we are about to enter into or have
              entered into with you as a party or to take steps at your request
              before entering into such a contract.
            </li>{" "}
            <li>
              <strong>“Legal or regulatory obligation”:</strong> where we need
              to comply with a legal or regulatory obligation that we are
              subject to.
            </li>{" "}
            <li>
              <strong>“Legitimate interests”:</strong> where necessary for our
              interests provided that your fundamental rights do not override
              such interests. This can mean, for instance, that it is in our
              interest to monitor how you are using our Website or client
              portals to ensure the security of our Website, client portals, or
              systems is maintained. We make sure we consider and balance any
              potential impact on you (both positive and negative) and your
              rights before we process your personal data for our legitimate
              interests.
            </li>{" "}
            <li>
              <strong>“Consent”:</strong> We rely on consent as a legal basis
              for processing your personal data in relation to sending direct
              marketing communications to you via email or text message.
            </li>{" "}
          </ul>{" "}
        </p>{" "}
        <p className="text-md md:text-base leading-relaxed mb-4">
          {" "}
          We do not use your personal data for activities where our interests
          are overridden by the impact on you (unless we have your consent or
          are otherwise required or permitted by law).{" "}
        </p>{" "}
        <h3 className="text-xl font-semibold mb-2 text-gray-700">
          {" "}
          USE OF PERSONAL DATA{" "}
        </h3>{" "}
        <p className="text-md md:text-base leading-relaxed mb-4">
          {" "}
          We will only process (i.e., use) your personal data when the law
          allows us to. That is, when we have a legal basis for processing. We
          generally use the information to establish and enhance our
          relationship with our users for the following purposes:{" "}
        </p>{" "}
        <p className="text-md md:text-base leading-relaxed mb-4">
          {" "}
          <strong>While you make a booking:</strong>{" "}
          <ul className="list-disc ml-6">
            {" "}
            <li>
              We may use your Personal Information available with us to ease
              your booking process. This information may include all the data
              provided by you earlier, i.e., contact data. We may also use the
              information of travelers listed as available in or linked with
              your account. This information is presented to the user at the
              time of making a booking to enable you to complete your bookings
              expeditiously.
            </li>{" "}
          </ul>{" "}
        </p>{" "}
        <p className="text-md md:text-base leading-relaxed mb-4">
          {" "}
          We may also use your Personal Information for several reasons
          including but not limited to:{" "}
        </p>{" "}
        <p className="text-md md:text-base leading-relaxed mb-4">
          {" "}
          <ul className="list-disc ml-6">
            {" "}
            <li>Keep you informed of the transaction status</li>{" "}
            <li>
              Send booking confirmations either via SMS or WhatsApp or any other
              messaging service
            </li>{" "}
            <li>Send any updates or changes to your booking(s)</li>{" "}
            <li>Allow our customer service to contact you, if necessary</li>{" "}
            <li>Confirm your reservations with respective service providers</li>{" "}
            <li>
              Customize the content of our website, mobile site, and mobile app
            </li>{" "}
            <li>
              Request for reviews of products or services or any other
              improvements
            </li>{" "}
            <li>Send verification message(s) or email(s)</li>{" "}
            <li>
              Validate/authenticate your account and to prevent any misuse or
              abuse
            </li>{" "}
            <li>
              Contact you on your birthday/anniversary to offer a special gift
              or offer
            </li>{" "}
            <li>
              Send you important notices and communications regarding our
              products and services availed or changes to the terms and
              conditions and/or policies
            </li>{" "}
            <li>
              Send information about products and services offered by TRAVEL
              MURTI and its affiliates
            </li>{" "}
            <li>Send you payment reminders and/or travel vouchers</li>{" "}
            <li>
              Newsletters to keep you updated on the travel sector. In the event
              that you don’t wish to receive such intimation, you may
              unsubscribe this facility in the email message you receive.
            </li>{" "}
          </ul>{" "}
        </p>
        <p className="text-md md:text-base leading-relaxed mb-4">
          We may share your personal data to third parties for reasons cited
          below but not limited to:     
        </p>
        <ul className="list-disc ml-6">
          <li>
            Where it is necessary to process your booking, enquiry or
            participation. {" "}
          </li>
          <li>
            To fulfill the service offering and/or to make booking, reservation,
            blocking and any such activity initiated by user. {" "}
          </li>
          <li>
            We may share personal data with companies who provide services such
            as information processing, extending credit, fulfilling customer
            orders, delivering products to you, managing and enhancing customer
            data, providing customer service, assessing your interest in our
            products and services, and conducting customer research or
            satisfaction surveys. These companies are obligated to protect your
            information.{" "}
          </li>
        </ul>
        <p className="text-md md:text-base leading-relaxed mb-4">
          We may share your personal data to third parties for reasons cited
          below but not limited to:     
        </p>
        <ul className="list-disc ml-6 mb-6">
          <li>
            Where it is necessary to process your booking, enquiry or
            participation. {" "}
          </li>
          <li>
            As a registered user, you will receive our latest product and
            service announcements, offers, promotions and event updates. If you
            wish to unsubscribe, you can choose to do so {" "}
          </li>
          <li>
            We may also use the personal data to improve our product offering,
            develop and deliver products, services, content and advertising. -
            Personal data may also be used internally for research, analysis and
            auditing {" "}
          </li>
          <li>
            TRAVEL MURTI may launch travel referral or reward programs from time
            to time by way of which users would win travel related rewards or
            other rewards. We may use your personal information to enroll you in
            the rewards program. Depending on the reward program, each time you
            win a reward, TRAVEL MURTI may share your personal information with
            a third party that will be responsible from fulfilling the reward to
            you. You may however choose to opt out of such reward program if you
            choose to do so. Here too while rewarding any user we at times may
            verify information of customers on selective basis for various
            purposes such as fraud protection or any other purpose. {" "}
          </li>
        </ul>
        {/*  */}
        <h3 className="text-xl font-semibold mb-2 text-gray-700">
          COLLECTION AND USE OF NON-PERSONAL DATA
        </h3>
        <p className="text-md md:text-base leading-relaxed mb-4">
          Non-personal data is data which can never be used to identify an
          individual. We may collect information regarding customer activities
          on our various portals. This aggregated information is used in
          research, analysis, to improve and monitor products and for various
          promotional schemes. It may be shared in aggregated, non-personal form
          with third parties to enhance customer experience, product offerings,
          or services.
        </p>
        <h3 className="text-xl font-semibold mb-2 text-gray-700">
          COOKIES AND OTHER TECHNOLOGIES
        </h3>
        <p className="text-md md:text-base leading-relaxed mb-4">
          We use cookies and other technologies to enhance your experience when
          you use our Website. To that effect, we have developed a cookie policy
          to familiarize you with our practices. You can access the cookie
          policy. 
        </p>
        <h3 className="text-xl font-semibold mb-2 text-gray-700">LINKS</h3>
        <p className="text-md md:text-base leading-relaxed mb-4">
          For your convenience, our Website provides links to other sites. When
          you click on one of these links, you are leaving our Website and
          entering another site. We are not responsible for such third-party
          sites. You should carefully review the privacy statements of any other
          sites you visit, because those privacy statements will apply to your
          visit to such other sites.
        </p>
        <h3 className="text-xl font-semibold mb-2 text-gray-700">
          WITH WHOM YOUR PERSONAL DATA IS SHARED
        </h3>
        <h4 className="text-lg font-semibold mb-2 text-gray-700">
          Group Companies (Companies in the same group):
        </h4>
        <p className="text-md md:text-base leading-relaxed mb-4">
          In the interests of improving personalization and service efficiency,
          we may, under controlled and secure circumstances, share your Personal
          Information with our affiliate or associate entities.
        </p>
        <p className="text-md md:text-base leading-relaxed mb-4">
          If the assets of TRAVEL MURTI are acquired, our customer information
          may also be transferred to the acquirer depending upon the nature of
          such acquisition. In addition, as part of business
          expansion/development/restructuring or for any other reason
          whatsoever, if we decide to sell/transfer/assign our business, any
          part thereof, any of our subsidiaries or any business units, then as
          part of such restructuring exercise customer information including the
          Personal Information collected herein shall be transferred
          accordingly.
        </p>
        <h4 className="text-lg font-semibold mb-2 text-gray-700">
          Service Providers and Suppliers
        </h4>
        <p className="text-md md:text-base leading-relaxed mb-4">
          Your information shall be shared with the end service providers like
          airlines, hotels, bus service providers, cab rental, railways or any
          other suppliers who are responsible for fulfilling your booking. You
          may note that while making a booking with TRAVEL MURTI you authorize
          us and consent to share your information with the said service
          providers and suppliers. It is pertinent to note that TRAVEL MURTI
          does not authorize the end service provider to use your information
          for any other purpose(s) except as for fulfilling their part of
          service.
        </p>
        <p className="text-md md:text-base leading-relaxed mb-4">
          <span className="font-bold ">TRAVEL MURTI </span> does not sell or
          rent individual customer names or other Personal Information of Users
          to third parties except sharing of such information with our
          business/alliance partners or vendors who are engaged by us for
          providing various services and for sharing promotional and other
          benefits to our customers from time to time basis their booking
          history with us.
        </p>
        <h4 className="text-lg font-semibold mb-2 text-gray-700">
          Third-Party Vendors and Business Partners:
        </h4>
        <p className="text-md md:text-base leading-relaxed mb-4">
          We may also share certain filtered Personal Information to our
          corporate affiliates or business partners who may contact the
          customers to offer certain products or services, which may include
          free or paid products / services, which will enable the customer to
          have better travel experience or to avail certain benefits specially
          made for TRAVEL MURTI customers. Examples of such partners are
          entities offering savings/EMI on travel, co-branded credit cards,
          travel insurance, insurance cover against loss of wallet, banking
          cards or similar sensitive information etc. If you choose to avail any
          such services offered by our business partners, the services so
          availed will be governed by the privacy policy of the respective
          service provider.
        </p>
        <p className="text-md md:text-base leading-relaxed mb-4">
          TRAVEL MURTI may share your Personal Information to third party that
          TRAVEL MURTI may engage to perform certain tasks on its behalf,
          including but not limited to payment processing, data hosting, and
          data processing platforms.
        </p>
        <p className="text-md md:text-base leading-relaxed mb-4">
          We may provide non personal data based on this data to suppliers,
          advertisers, affiliates and other current and potential business
          partners. We may also use such aggregate data to inform these third
          parties as to the number of people who have seen and clicked on links
          to their websites.
        </p>
        <p className="text-md md:text-base leading-relaxed mb-4">
          Occasionally, TRAVEL MURTI will hire a third party for market
          research, surveys etc. and will provide information to these third
          parties specifically for use in connection with these projects. The
          information (including aggregate cookie and tracking information) we
          provide to such third parties, alliance partners, or vendors are
          protected by confidentiality agreements and such information is to be
          used solely for completing the specific project, and in compliance
          with the applicable regulations.
        </p>
        <h3 className="text-xl font-semibold mb-2 text-gray-700">
          DISCLOSURE OF INFORMATION
        </h3>
        <p className="text-md md:text-base leading-relaxed mb-4">
          Where required, we will (subject to our professional obligations and
          any terms of business which we may enter into with you) disclose your
          personal data to:
        </p>
        <ul className="list-disc ml-6 mb-6">
          <li>
            any person or entity to whom we are required or requested to make
            such disclosure by any court of competent jurisdiction or by any
            governmental, taxation or other regulatory authority, law
            enforcement agency or similar body; {" "}
          </li>
          <li>
            our professional advisers or consultants, including lawyers,
            bankers, auditors, accountants and insurers providing consultancy,
            legal, banking, audit, accounting or insurance services to us; and{" "}
          </li>
          <li>
            Service-providers who provide information technology and system
            administration services to us.{" "}
          </li>
        </ul>
        <h3 className="text-xl font-semibold mb-2 text-gray-700">
          INTERNATIONAL TRANSFER
        </h3>
        <p className="text-md md:text-base leading-relaxed mb-4">
          Due to the multinational character of Travel Murti, some of the
          affiliated companies and other recipients may be located in countries
          (including the United States) that do not provide a level of data
          protection equivalent to that set forth by the law in your home
          country. TRAVEL MURTI will take steps to make sure that such
          recipients act in accordance with applicable law and provide an
          adequate level of protection for your personal data including
          appropriate technical and organizational security measures, also
          through implementation of appropriate contractual measures to secure
          such transfer, in compliance with the applicable law.
        </p>
        <h3 className="text-xl font-semibold mb-2 text-gray-700">
          USER-GENERATED CONTENT
        </h3>
        <p className="text-md md:text-base leading-relaxed mb-4">
          TRAVEL MURTI provides an option to its users to post their experiences
          by way of reviews, blog articles, ratings and general poll questions.
          The customers also have an option to give their feedback or ask
          questions w.r.t a service offered by TRAVEL MURTI or post answers to
          questions raised by other users. TRAVEL MURTI may also engage a third
          party to contact you and gather your feedback about your recent
          booking with TRAVEL MURTI. Though the participation in the feedback
          process is purely optional, you may still receive emails,
          notifications (app, SMS, WhatsApp or any other messaging service) for
          you to share your review(s). These reviews may be written (with or
          without images) or in video format. The reviews written or posted will
          be visible on TRAVEL MURTI and may also be visible on other travel or
          travel related platforms. The User Generated Content that TRAVEL MURTI
          collects may be of the following kinds:
        </p>
        <ul className="list-disc ml-6 mb-6">
          <li> Articles for Website or Blog </li>
          <li> Review and Ratings</li>
          <li> Question and Answers </li>
          <li> Crowd Source Data Collection (poll questions).</li>
        </ul>
        <p className="text-md md:text-base leading-relaxed mb-4">
          Each User who posts review or ratings, Q&A, photographs shall have a
          profile, which other Users will be able to access. Other Users may be
          able to view the number of trips, reviews written, questions asked and
          answered and photographs posted
        </p>
        <p className="text-md md:text-base leading-relaxed mb-4">
          Each User shall be diligent and take due care to ensure that the views
          expressed by you on the social media platform or TRAVEL MURTI website
          is not derogatory or oppose to law, public policy, morality, religion,
          caste, creed, colour, sex, race, culture, ethics, customs, traditions,
          decency, good conscience, third party intellectual property etc. By
          uploading pictures, views, images, contents, visuals, audios,
          experiences etc. on the social media platform or TRAVEL MURTI website,
          you consent to TRAVEL MURTI to use, reproduce, copy, upload pictures,
          views, look and feel, images, contents, visuals, audios, experiences
          etc. in any manner, as may deem fit by TRAVEL MURTI, without any
          responsibility, liability, compensation or cost due to you or any
          third party, on the part of TRAVEL MURTI hereby disclaims all or any
          disputes, responsibilities, liabilities, litigations, costs, expenses,
          compensations etc., arising with respect to or in connection with the
          use, reproduction, copying, uploading of pictures, views, look and
          feel, images, contents, visuals, audios, experiences etc. contributed,
          shared, expressed by you, or on your behalf and/or otherwise to any
          third party. 
        </p>
        <h3 className="text-xl font-semibold mb-2 text-gray-700">
          PERMISSIONS REQUIRED FOR USING OUR MOBILE APPLICATIONS
        </h3>
        <p className="text-md md:text-base leading-relaxed mb-4">
          When the TRAVEL MURTI app is installed on your phone a list of
          permissions will appear and are needed for the smooth functioning of
          the application. The permissions that TRAVEL MURTI requires and the
          data that shall be accessed and its use are as below:
        </p>
        <h4 className="text-lg font-semibold mb-2 text-gray-700">
          Android Permissions:
        </h4>
        <p className="text-md md:text-base leading-relaxed mb-4">
          <strong>Location:</strong> This permission enables us to give you the
          nearest branch details from your location in case you require any
          physical assistance with regard to any travel query.
        </p>
        <p className="text-md md:text-base leading-relaxed mb-4">
          <strong>SMS:</strong> If you allow us to access your SMS, we can send
          you SMS related to ‘OTP’ and send holiday package details to your
          mobile number.
        </p>
        <p className="text-md md:text-base leading-relaxed mb-4">
          <strong>Phone:</strong> The app requires access to make phone calls so
          that you can make phone calls to our customer contact centers directly
          through the app.
        </p>
        <p className="text-md md:text-base leading-relaxed mb-4">
          <strong>Contacts:</strong> If you allow us to access your contacts, it
          enables us to provide various social features, such as sharing holiday
          packages with your friends, etc.
        </p>
        <p className="text-md md:text-base leading-relaxed mb-4">
          <strong>Photo/Media/Files:</strong> The app uses these permissions to
          save and cache images and document data for your ease and faster use
          of the app. By saving image and document data locally, your phone
          doesn't need to re-download the same content every time you use the
          app.
        </p>
        <h4 className="text-lg font-semibold mb-2 text-gray-700">
          iOS Permissions:
        </h4>
        <p className="text-md md:text-base leading-relaxed mb-4">
          <strong>Notifications:</strong> If you opt in for notifications, it
          enables us to send exclusive deals, promotional offers, and
          travel-related updates directly to your device.
        </p>
        <h3 className="text-xl font-semibold mb-2 text-gray-700">
          INFORMATION PROTECTION AND SECURITY
        </h3>
        <p className="text-md md:text-base leading-relaxed mb-4">
          Taking into account the costs of implementation and the nature, scope,
          context and purposes of processing as well as the risk of varying
          likelihood and severity for the rights and freedoms of natural
          persons, we implement appropriate technical and organizational
          measures to ensure a level of security appropriate to the risk of
          processing, including:
        </p>
        <p className="text-md md:text-base leading-relaxed mb-4">
          (a) the pseudonymisation and encryption of personal data;   
        </p>
        <p className="text-md md:text-base leading-relaxed mb-4">
          (b) the ability to ensure the ongoing confidentiality, integrity,
          availability and resilience of processing systems and services;     
        </p>
        <p className="text-md md:text-base leading-relaxed mb-4">
          (c) the ability to restore the availability and access to personal
          data in a timely manner in the event of a physical or technical
          incident; and     
        </p>
        <p className="text-md md:text-base leading-relaxed mb-4">
          (d) a process for regularly testing, assessing and evaluating the
          effectiveness of technical and organizational measures for ensuring
          the security of the processing.     
        </p>
        <p className="text-md md:text-base leading-relaxed mb-4">
          We ensure that those who have permanent or regular access to personal
          data, or that are involved in the processing of personal data, or in
          the development of tools used to process personal data, are trained
          and informed of their rights and responsibilities in when processing
          personal data.   
        </p>
        <p className="text-md md:text-base leading-relaxed mb-4">
          To protect your personal data and prevent unauthorized access, we have
          put in place appropriate security measures and certifications. We have
          SSL site and user should use it to protect the information
          transmission while transacting online.     
        </p>
        <p className="text-md md:text-base leading-relaxed mb-4">
          We require any third parties processing your information to do the
          implement the same levels of protection with respect to your data.   
            
        </p>
        <p className="text-md md:text-base leading-relaxed mb-4">
          While no system is full-proof, including ours, we will continue using
          internet security procedures to ensure your data remains safe with us.
          By opening, browsing, using this site for transactions or storing any
          data/information, you agree to comply with the latest revised privacy
          notice in effect at such time. If you use some social networking or
          other service which maintains your information, it is governed by
          their terms of use and privacy notice.      
        </p>
        {/*  */}
        <h3 className="text-xl font-semibold mb-2 text-gray-700">
          DATA RETENTION
        </h3>
        <p className="text-md md:text-base leading-relaxed mb-4">
          We will only retain your personal data for as long as necessary to
          fulfil the purposes we collected it for. This includes, for example,
          the purposes of satisfying any legal, regulatory, accounting,
          reporting requirements, to carry out legal work, for the establishment
          or defense of legal claims.     
        </p>
        <p className="text-md md:text-base leading-relaxed mb-4">
          We will retain your personal data in our databases in accordance with
          our document management, retention and destruction policy and
          applicable laws. This period may extend beyond the end of your
          relationship with us, but it will be only as long as it is necessary
          for us to have sufficient information to respond to any issues that
          may arise later. For example, we may need or be required to retain
          information to allow you to obtain credit for trip you purchased but
          had to cancel. We may also need the retain certain information to
          prevent fraudulent activity; to protect ourselves against liability,
          permit us to pursue available remedies or limit any damages that we
          may sustain; or if we believe in good faith that a law, regulation,
          rule or guideline requires it.     
        </p>
        <p className="text-md md:text-base leading-relaxed mb-4">
          In some circumstances we may anonyms your personal data (so that it
          can no longer be associated with you) for research or statistical
          purposes in which case we may use this information indefinitely
          without further notice to you.     
        </p>
        <h3 className="text-xl font-semibold mb-2 text-gray-700">
          CHANGES TO THE POLICY
        </h3>
        <p className="text-md md:text-base leading-relaxed mb-4">
          This notice is effective as of January 01, 2020. We reserve the right
          to update or change this Policy at any time, and we will provide you
          with the updated policy when we make any substantial updates at the
          earliest either through email or by providing a prominent notice of
          change on our Website. You should check the policy periodically. Your
          continued use of our Website after we post any modifications to the
          policy on this page will constitute your acknowledgment of the
          modifications and your consent to abide and be bound by the modified
          notice.     
        </p>
        <h3 className="text-xl font-semibold mb-2 text-gray-700">
          YOUR RIGHTS
        </h3>
        <p className="text-md md:text-base leading-relaxed mb-4">
          Under certain circumstances, you have rights under applicable data
          protection laws in relation to your personal data. It is our policy to
          respect your rights and we will act promptly and in accordance with
          any applicable law, rule or regulation relating to the processing of
          your personal data.     
        </p>
        <p className="text-md md:text-base leading-relaxed mb-4">
          Details of your rights under General Data Protection Regulation (GDPR)
          are set out below:     
        </p>
        <p className="text-md md:text-base leading-relaxed mb-4">
          (a) right to be informed about how personal data is used – you have a
          right to be informed about how we will use and share your personal
          data. This explanation will be provided to you in a concise,
          transparent, intelligible and easily accessible format and will be
          written in clear and plain language;     
        </p>
        <p className="text-md md:text-base leading-relaxed mb-4">
          (b) right to access personal data – you have a right to obtain
          confirmation of whether we are processing your personal data, access
          to your personal data and information regarding how your personal data
          is being used by us;     
        </p>
        <p className="text-md md:text-base leading-relaxed mb-4">
          (c) right to have inaccurate personal data rectified – you have a
          right to have any inaccurate or incomplete personal data rectified. If
          we have disclosed the relevant personal data to any third parties, we
          will take reasonable steps to inform those third parties of the
          rectification where possible;     
        </p>
        <p className="text-md md:text-base leading-relaxed mb-4">
          (d) right to have personal data erased in certain circumstances – you
          have a right to request that certain personal data held by us is
          erased. This is also known as the right to be forgotten. This is not a
          blanket right to require all personal data to be deleted. We will
          consider each request carefully in accordance with the requirements of
          any laws relating to the processing of your personal data;     
        </p>
        <p className="text-md md:text-base leading-relaxed mb-4">
          (e) right to restrict processing of personal data in certain
          circumstances – you have a right to block the processing of your
          personal data in certain circumstances. This right arises if you are
          disputing the accuracy of personal data, if you have raised an
          objection to processing, if processing of personal data is unlawful
          and you oppose erasure and request restriction instead or if the
          personal data is no longer required by us but you require the personal
          data to be retained to establish, exercise or defend a legal claim;   
        </p>
        <p className="text-md md:text-base leading-relaxed mb-4">
          (f) right to data portability – in certain circumstances you can
          request to receive a copy of your personal data in a commonly used
          electronic format. This right only applies to personal data that you
          have provided to us (for example by completing a form or providing
          information through a Website). Information about you which has been
          gathered by monitoring your behavior will also be subject to the right
          to data portability. The right to data portability only applies if the
          processing is based on your consent or if the personal data must be
          processed for the performance of a contract and the processing is
          carried out by automated means (i.e. electronically);
        </p>
        <p className="text-md md:text-base leading-relaxed mb-4">
          (g) right to object to processing of personal data in certain
          circumstances, including where personal data is used for marketing
          purposes – you have a right to object to processing being carried out
          by us if (a) we are processing personal data based on legitimate
          interests or for the performance of a task in the public interest
          (including profiling), (b) if we are using personal data for direct
          marketing purposes, or (c) if information is being processed for
          scientific or historical research or statistical purposes. You will be
          informed that you have a right to object at the point of data
          collection and the right to object will be explicitly brought to your
          attention and be presented clearly and separately from any other
          information; and   
        </p>
        <p className="text-md md:text-base leading-relaxed mb-4">
          (h) right not to be subject to automated decisions where the decision
          produces a legal effect or a similarly significant effect – you have a
          right not to be subject to a decision which is based on automated
          processing where the decision will produce a legal effect or a
          similarly significant effect on you.     
        </p>
        <p className="text-md md:text-base leading-relaxed mb-4">
          You may exercise any of the above-mentioned rights by sending a
          request to info@suvidhayatri.com. You will not have to pay a fee to
          access your personal data (or to exercise any of the other rights).
          However, we may charge a reasonable fee if your request is clearly
          unfounded, repetitive or excessive. Alternatively, we may refuse to
          comply with your request in these circumstances.   
        </p>
        <p className="text-md md:text-base leading-relaxed mb-4">
          Additionally, in case you have any questions, comments or concerns
          about this Policy, you may contact info@travelmurti.com.
          Contact.travelmurti@gmail.com   
        </p>
        <p className="text-md md:text-base leading-relaxed mb-4">
          We may need to request specific information from you to help us
          confirm your identity and ensure your right to access your personal
          data (or to exercise any of your other rights). This is a security
          measure to ensure that personal data is not disclosed to any person
          who has no right to receive it. We may also contact you to ask you for
          further information in relation to your request to speed up our
          response.   
        </p>
        <p className="text-md md:text-base leading-relaxed mb-4">
          We try to respond to all legitimate requests within one calendar
          month. Occasionally it may take us longer than one calendar month if
          your request is particularly complex or you have made a number of
          requests. In this case, we will notify you and keep you updated.   
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
