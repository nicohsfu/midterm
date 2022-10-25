// Client facing scripts here
$(() => {

  const createFoodElement = (foods) => {
    let $foodArticle = $(`
    <article id='${foods.id}'>
      <span>
        <h2>${foods.name}</h2>
        <p>${foods.description}</p>
        <div>
          <p>${foods.price}</p>
          <button id="minus">-</button>
          <p id="quantity"> 0 </p>
          <button id="plus">+</button>
        </div>
      </span>
      <span>
        <img
          alt="${foods.name}"
          src="${foods.image_url}"
        >
        </img>
      </span>
    </article>
    `);

    return $foodArticle;
  };


  const renderFoods = function(foodsArr) {
    $('#food-card-container').empty();

    console.log("foodsArr:", foodsArr);

    for (let food of foodsArr) {
      let newFood = createFoodElement(food);
      $('#food-card-container').prepend(newFood);
    }
  };


  const loadFoods = function() {
    $.get('/foods/menu_item', { action: 'getFoods' })
      .then((arr) => {
        console.log("this is inside load foods");
        console.log("arr in loadfoods:", arr);
        renderFoods(arr);
      })
      .catch((err) => { err.message; });
  };


  loadFoods();


  $('#minus').on('click', (event) => {
    event.preventDefault();
    $.post('/cart/1/edit', { action: 'decrement' })
      .then((res) => {
        const quantity = res.quantity;
        $('#quantity').text(quantity);
      })
      .catch((err) => { err.message; });
    console.log("decrement clicked");
  });


  $('#plus').on('click', (event) => {
    event.preventDefault();
    $.post('/cart/1/edit', { action: 'increment' })
      .then(res => {
        const quantity = res.quantity;
        $("#quantity").text(quantity);
      })
      .catch((err) => { err.message; });
    console.log("increment clicked");
  });


  $('#twilio').on('click', (event) => {
    // prevents page from changing
    event.preventDefault();
    console.log("An estimated time has been sent.");
    $.ajax({
      url: "/order_status/admin/:order_id",
      method: "POST",
    })
      .catch((error) => {
        console.log("error message: ", error.message);
      });
  });

});
