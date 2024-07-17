// sendmail.ts

import * as nodemailer from "nodemailer";

async function sendEmail(userDetails: any, basketItems: any[]) {
  // Destructure user details and address from userDetails object
  const { name, email, addresses } = userDetails;
  const {
    address1 = "N/A",
    address2 = "N/A",
    postalCode = "N/A",
    phoneNumber = "N/A",
  } = addresses?.[0] || {};

  try {
    // Create a nodemailer transporter using Gmail service
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Define email content and options
    const mailOptions = {
      from: "test@gmail.com",
      to: "ali008009@yahoo.com",
      subject: "Order Details",
      html: `
                <h1>Order Details</h1>
                <h2>User Details</h2>
                <p>Name: ${name}</p>
                <p>Email: ${email}</p>
                <p>Phone Number: ${phoneNumber}</p>
                <p>Address1: ${address1}</p>
                <p>Address2: ${address2}</p>
                <p>Postcode: ${postalCode}</p> 
                <h2>Basket Items</h2>
                <ul>
                    ${basketItems
                      .map(
                        (item) => `
                        <li>
                            <p>Pizza Name: ${item.name}</p>
                            <p>Price: £${(item.price || 0).toFixed(2)}</p>
                            <p>Quantity: ${item.quantity}</p>
                            ${
                              item.toppings && item.toppings.length > 0
                                ? `
                                <p>Toppings: ${item.toppings
                                  .map((topping) => topping.name)
                                  .join(", ")}</p>
                            `
                                : ""
                            }
                        </li>
                    `
                      )
                      .join("")}
                </ul>
            `,
    };

    // Send email using the transporter
    const info = await transporter.sendMail(mailOptions);
    console.log("Message sent: %s", info.messageId);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
}

export { sendEmail };
