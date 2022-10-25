// Client facing scripts here
$(() => {

  //   const createFood = (foods) => {`
  //   <article id='${foods.id}'>
  //     <span>
  //       <h2>${foods.name}</h2>
  //       <p>${foods.description}</p>
  //       <div>
  //         <p>${foods.price}</p>
  //         <button id="minus">-</button>
  //         <p id="quantity"> 0 </p>
  //         <button id="plus">+</button>
  //       </div>
  //     </span>
  //     <span>
  //       <img
  //         alt="${foods.name}"
  //         src="${foods.image_url}"
  //       >
  //       </img>
  //     </span>
  //   </article>
  // `};

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
    console.log("increment clicked");
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
