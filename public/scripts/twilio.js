$(() => {
  // Sends user an SMS text of their estimated wait time.

  $('#twilio').on('click', (event) => {
    event.preventDefault();
    console.log("An estimated time has been sent via SMS.");
    $.ajax({
      url: "/order_status/admin/:order_id",
      method: "POST",
    })
      .catch((error) => {
        console.log("error message: ", error.message);
      });
  });
});
