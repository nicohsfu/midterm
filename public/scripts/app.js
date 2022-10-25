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

  $('#plus').click(() => {
    $.post('/cart/1/edit', { action: 'increment' })
      .then(res => {
        const quantity = res.quantity;
        $("#quantity").text(quantity);
      })
      .catch((err) => { err.message; });
    console.log("i've been clicked");
  });
});



