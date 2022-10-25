// Client facing scripts here
$(() => {

  $('#minus').on('click', () => {
    $.post('/cart/1/edit', { action: 'decrement' })
      .then((res) => {
        const quantity = res.quantity;
        $('#quantity').text(quantity);
      })
      .catch((err) => { err.message; });
    console.log("decrement clicked");
  });


  $('#plus').on('click', () => {
    $.post('/cart/1/edit', { action: 'increment' })
      .then(res => {
        const quantity = res.quantity;
        $("#quantity").text(quantity);
      })
      .catch((err) => { err.message; });
    console.log("i've been clicked");
  });


  $('#twilio').on('click', (event) => {
    console.log("An estimated time has been sent.");
    // prevents page from changing
    event.preventDefault();
    $.ajax({
      url: "/order_status/admin/:order_id",
      method: "POST",
    })
      .catch((error) => {
        console.log("error message: ", error.message);
      });
  });

});
