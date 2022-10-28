$(() => {
  // Admin orders page displays appropriate message after sending time estimate.

  $('.admin-orders-p-pressed').hide();

  $('.btn-group').on('click', function(event) {
    console.log("i've been clicked");
    event.preventDefault();
    $('.fa-circle').hide();
    $(this).slideUp();
    $(this).siblings('.admin-orders-p').slideUp();
    setTimeout(() => {
      $(this).siblings('.admin-orders-p-pressed').slideDown();
    }, 400);
  });
});
