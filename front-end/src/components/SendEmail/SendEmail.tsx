async function sendEmail(userDetails: any, basketItems: any) {
   
    try {
    const response = await fetch("https://pizza-project-pagq.onrender.com/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userDetails,
        basketItems,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to send email");
    }

    const data = await response.json();
    return data.message;
  } catch (error) {
    console.error("Failed to send email:", error);
    throw new Error("Failed to send email");
  }
}

export default sendEmail;
