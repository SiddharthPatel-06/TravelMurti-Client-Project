exports.enquiryEmailTemplate = (
  name,
  email,
  contactNo,
  country,
  adults,
  children,
  arrival,
  departure,
  travelRequirement
) => {
  const year = new Date().getFullYear();
  return `<!DOCTYPE html>
    <html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Enquiry Received</title>
        <style>
            body {
                background-color: #f9f9f9;
                font-family: Arial, sans-serif;
                font-size: 16px;
                line-height: 1.6;
                color: #333;
                margin: 0;
                padding: 0;
            }

            .container {
                max-width: 600px;
                margin: 40px auto;
                padding: 20px;
                background-color: #ffffff;
                border-radius: 8px;
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                text-align: center;
                border: 1px solid #e0e0e0; /* Light gray border */
            }

            .logo {
                max-width: 150px;
                margin: 0 auto 20px;
            }

            .message {
                font-size: 24px;
                font-weight: bold;
                color: #0056b3;
                margin-bottom: 20px;
            }

            .body {
                font-size: 16px;
                margin-bottom: 20px;
                line-height: 1.5;
                text-align: left; /* Align text to the left for better readability */
            }

            .footer {
                margin-top: 30px;
                font-size: 12px;
                color: #777;
            }
        </style>
    </head>

    <body>
        <div class="container">
            <img class="logo" src="https://lh4.googleusercontent.com/-43TdC72iuWI/AAAAAAAAAAI/AAAAAAAAAAA/vLm5URYYrSY/s44-p-k-no-ns-nd/photo.jpg" alt="Company Logo">
            <div class="message">New Enquiry Received</div>
            <div class="body">
                <p>Dear Admin,</p>
                <p>You have received a new enquiry from the website. Here are the details:</p>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Contact No:</strong> ${contactNo}</p>
                <p><strong>Country:</strong> ${country}</p>
                <p><strong>Adults:</strong> ${adults}</p>
                <p><strong>Children:</strong> ${children}</p>
                <p><strong>Arrival:</strong> ${arrival}</p>
                <p><strong>Departure:</strong> ${departure}</p>
                <p><strong>Travel Requirement:</strong> ${travelRequirement}</p>
                <p>Thank you for attending to this enquiry details.</p>
            </div>
            <div class="footer">
                &copy; ${year} Travel Murti. All rights reserved.
            </div>
        </div>
    </body>

    </html>`;
};

exports.userConfirmationEmailTemplate = (name) => {
  const year = new Date().getFullYear();
  return `<!DOCTYPE html>
    <html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Enquiry Confirmation</title>
        <style>
            body {
                background-color: #f9f9f9;
                font-family: Arial, sans-serif;
                font-size: 16px;
                line-height: 1.6;
                color: #333;
                margin: 0;
                padding: 0;
            }

            .container {
                max-width: 600px;
                margin: 40px auto;
                padding: 20px;
                background-color: #ffffff;
                border-radius: 8px;
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                text-align: center;
                border: 1px solid #e0e0e0; /* Light gray border */
            }

            .logo {
                max-width: 150px;
                margin: 0 auto 20px;
            }

            .message {
                font-size: 24px;
                font-weight: bold;
                color: #0056b3;
                margin-bottom: 20px;
            }

            .body {
                font-size: 16px;
                margin-bottom: 20px;
                line-height: 1.5;
                text-align: left; /* Align text to the left for better readability */
            }

            .footer {
                margin-top: 30px;
                font-size: 12px;
                color: #777;
            }
        </style>
    </head>

    <body>
        <div class="container">
            <img class="logo" src="https://lh4.googleusercontent.com/-43TdC72iuWI/AAAAAAAAAAI/AAAAAAAAAAA/vLm5URYYrSY/s44-p-k-no-ns-nd/photo.jpg" alt="Company Logo">
            <div class="message">Enquiry Confirmation</div>
            <div class="body">
                <p>Dear ${name},</p>
                <p>Thank you for contacting us! We have received your enquiry and appreciate your interest.</p>
                <p>Our team will review the details and get back to you shortly.</p>
                <p>If you have any urgent questions, please feel free to reply to this email or reach us at <a href="mailto:contact.travelmurti@gmail.com">contact.travelmurti@gmail.com</a></p>
                <p>We appreciate your patience and look forward to assisting you!</p>

            </div>
            <div class="footer">
                &copy; ${year} Travel Murti. All rights reserved.
            </div>
        </div>
    </body>

    </html>`;
};
