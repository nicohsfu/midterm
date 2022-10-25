//const { incrementItem, decrementItem } = require("../../db/queries/order");

// Client facing scripts here
$(() => {

  $('#minus').on('click', () => {
    $.post('/cart/1/edit', {action: 'decrement'})
      .then((res) => {
        const quantity = res.quantity;
        $('#quantity').text(quantity);
      });
    console.log("decrement clicked");
  });

  $('#plus').click(() => {
    $.post('/cart/1/edit', { action: 'increment' })
      .then(res => {
        const quantity = res.quantity;
        $("#quantity").text(quantity);
      });
    console.log("i've been clicked");
  });
});



// $('#plus').click(() => {
//   console.log("i've been clicked");
// });






