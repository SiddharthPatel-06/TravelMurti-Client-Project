exports.botAdminEmail = (name, email, phone) => {
    return `<!DOCTYPE html>
    <html lang="en">
  
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New User Submission from Bot</title>
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
            <div class="message">New Information Submitted via Bot</div>
            <div class="body">
                <p>Dear Admin,</p>
                <p>We have received a new user submission from the bot. Here are the details:</p>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone Number:</strong> ${phone}</p>
            </div>
            <div class="support">
                If you need further assistance, feel free to reach out to support at 
                <a href="mailto:contact@travelmurti.com">contact@travelmurti.com</a>.
            </div>
            <div class="footer">
                &copy; 2024 Travel Murti. All rights reserved.
            </div>
        </div>
    </body>
  
    </html>`;
};
