import * as nodemailer from "nodemailer";

interface UserDetails {
  name: string;
  email: string;
  addresses: Address[];
}

interface Topping {
  id: number;
  name: string;
}

interface Address {
  id: number;
  address1: string;
  address2: string;
  city: string;
  postalCode: string;
  country: string;
  phoneNumber: string;
}

interface BasketItem {
  id_pizza: number;
  name: string;
  price: number;
  quantity: number;
  size: string;
  base: string;
  basePrice: number;
  toppings: Topping[];
  removedToppings: Topping[];
}

async function sendEmail(userDetails: UserDetails, basketItems: BasketItem[]) {
  const { name, email, addresses } = userDetails;
  const {
    address1 = "N/A",
    address2 = "N/A",
    postalCode = "N/A",
    phoneNumber = "N/A",
  } = addresses?.[0] || {};

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: "test@gmail.com",
      to: email, // Sending email to user's email
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
                  <p>Base: ${item.base}</p>
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
                  ${
                    item.removedToppings && item.removedToppings.length > 0
                      ? `
                    <p>Removed Toppings: ${item.removedToppings
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

    const info = await transporter.sendMail(mailOptions);
    console.log("Message sent: %s", info.messageId);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
}

export { sendEmail };
