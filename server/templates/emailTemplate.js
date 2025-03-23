exports.contactUsEmail = (name, email, mobile, enquiry) => {
  const currentYear = new Date().getFullYear();
  return `<!DOCTYPE html>
    <html lang="en">
  
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Contact Form Confirmation</title>
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
            }
  
            .support {
                font-size: 14px;
                color: #555;
                margin-top: 20px;
            }
  
            a {
                color: #0056b3;
                text-decoration: none;
            }
  
            a:hover {
                text-decoration: underline;
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
            <div class="message">Contact Form Confirmation</div>
            <div class="body">
                <p>Dear ${name},</p>
                <p>Thank you for reaching out to us! We have received your enquiry and will respond shortly.</p>
                <p><strong>Here are the details you provided:</strong></p>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Mobile Number:</strong> ${mobile}</p>
                <p><strong>Enquiry:</strong> ${enquiry}</p>
                <p>Your interest is important to us, and we appreciate your patience while we get back to you.</p>
            </div>
            <div class="support">
                If you have any further questions, feel free to reach out to us at 
                <a href="mailto:contact.travelmurti@gmail.com">contact.travelmurti@gmail.com</a> We are here to assist you!
            </div>
            <div class="footer">
                &copy; ${currentYear} Travel Murti. All rights reserved.
            </div>
        </div>
    </body>
  
    </html>`;
};
