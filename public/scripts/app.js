// Client facing scripts here
$(() => {

  // Hide empty fields error message for admin foods page when adding new items.
  $('#empty-fields').hide();

  // Menu items fetched will be kept in this array.
  let foodData = [];

  // Keeps track of total in users cart. Used in increment and decrement functions below.
  let runningPrice = 0;

  // Makes individual menu item on rendered home page.
  const createFoodElement = (foods) => {

    //     <article id='${foods.id}'>
    //   <span>
    //     <h2>${foods.name}</h2>
    //       <p>${foods.description}</p>
    //     <div>
    //       <p>${foods.price / 100}</p>
    //       <div class="button-type">
    //       </div>
    //     </div>
    //   </span>
    //   <span>
    //     <img
    //       alt="${foods.name}"
    //       src="${foods.image_url}"
    //     >
    //     </img>
    //   </span>
    // </article>

    let $foodArticle = $(`
    <article id='${foods.id}'>
      <div class="food-card-article">
        <span class="food-card-info">
          <div class="food-card-info-1">
            <h1>${foods.name}</h1>
          </div>
          <div class="food-card-info-2">
            <p>${foods.description}</p>
          </div>
          <div class="food-card-info-3">
            <p>$${foods.price / 100}</p>
            <div class="button-type">
            </div>
          </div>
        </span>
        <span class="food-card-image">
          <img
            alt="${foods.name}"
            src="${foods.image_url}"
          >
          </img>
        </span>
      </div>
    </article>
    `);

    return $foodArticle;
  };

  const renderFoods = function(foodsArr) {
    $('.food-card-container').empty();

    // console.log("foodsArr:", foodsArr);

    for (let food of foodsArr) {
      let newFood = createFoodElement(food);

      $('.button-type').empty();
      $('.food-card-container').prepend(newFood);

      if ($('title').text() === 'Home') {
        let button = `
          <span><button class="minus">-</button></span>
            <span><p class="quantity"> 0 </p></span>
          <span><button class="plus">+</button></span>
        `;
        $('.button-type').append(button);
      }

      if ($('title').text() === 'Admin - Foods') {

        // ---------- IMPLEMENT AS STRETCH ----------
        // <form method="GET" action="/foods/admin/:foodId">
        //   <button>Edit</button>
        // </form>;
        // ---------- IMPLEMENT AS STRETCH ----------

        let button = `
          <form method="POST" action="/foods/admin/:foodId/delete">
            <button class='delete'>Delete</button>
          </form>
        `;
        $('.button-type').append(button);
      }
    }

    // Decrement quantity of an item in the cart.
    let $minusButton = $('.minus');
    $minusButton.on('click', (event) => {
      event.preventDefault();
      console.log("decrement clicked");
      const foodId = $(event.target).closest('article').attr('id');
      //console.log("(this) minus: ", $(event.target).closest('article').attr('id'));

      $.post(`/cart/${foodId}/edit`, { action: 'decrement' })
        .then((res) => {

          //console.log("foodData:", foodData);
          //console.log("inside minus .then");
          //console.log("res: ", res);

          const foodId = res.food_id;
          const quantity = res.quantity;
          const matchingFoodObj = foodData.find(food => food.id === foodId);
          const price = parseFloat(matchingFoodObj.price);
          console.log("price : ", price)

          $(`#${foodId}`).find('.quantity').text(quantity);
          $(`#table-${foodId}`).find('.quantity').text(quantity);
          $(`#table-${foodId}`).find('.price').text((price * quantity / 100));

          runningPrice -= price;

          $(`#total`).text(`$ ${(runningPrice / 100)}`);
        })
        .catch((err) => { err.message; });
    });

    // Increment quantity of an item in the cart.
    let $plusButton = $('.plus');
    $plusButton.on('click', (event) => {
      event.preventDefault();
      console.log("increment clicked");
      const foodId = $(event.target).closest('article').attr('id');
      //console.log("(this) plus: ", $(event.target).closest('article').attr('id'));

      $.post(`/cart/${foodId}/edit`, { action: 'increment' })
        .then(res => {
          const foodId = res.food_id;
          const quantity = res.quantity;

          const matchingFoodObj = foodData.find(food => food.id === foodId);
          const price = parseFloat(matchingFoodObj.price);
          console.log("price:", price);
          console.log("res: ", res);

          //console.log("price:", price);
          //console.log("res: ", res);

          $(`#${foodId}`).find('.quantity').text(quantity);
          $(`#table-${foodId}`).find('.quantity').text(quantity);
          $(`#table-${foodId}`).find('.price').text((price * quantity / 100));

          //delete all the consle log later !!
          console.log("price", price);
          console.log("typeof parsefloat", typeof price); //number
          console.log("typeof running price", typeof runningPrice); //number
          console.log("typeof price", typeof price); //string


          runningPrice += price;

          $(`#total`).text(`$ ${(runningPrice / 100)}`);
        })
        .catch((err) => { err.message; });
    });

    // Allows admin to delete menu items.
    $('.delete').on('click', (event) => {
      // if preventDefault is un-commented, the page does NOT refresh so the food-item deletion is not reflected on the rendered page, even though the food item HAS been deleted
      //event.preventDefault();
      console.log("delete button clicked");

      const foodId = $(event.target).closest('article').attr('id');
      //console.log('foodId: ', foodId);

      $.post(`/foods/admin/${foodId}/delete`)
        .catch((err) => { err.message; });
    });

    // ---------- IMPLEMENT AS STRETCH ----------
    // $('.edit').on('click', (event) => {
    //   // if preventDefault is un-commented, the page does NOT refresh so the food-item deletion is not reflected on the rendered page, even though the food item HAS been deleted
    //   event.preventDefault();
    //   const foodId = $(event.target).closest('article').attr('id');
    //   console.log('foodId in edit click event: ', foodId);
    //   //console.log('foodId: ', foodId);
    //   //console.log("(this) minus: ", $(event.target).closest('article').attr('id'));

    //   $.post(`/foods/admin/${foodId}/edit`)
    //     .catch((err) => { err.message; });
    //   console.log("edit button clicked");
    // });
    // ---------- IMPLEMENT AS STRETCH ----------

  };

  // Receives json data from /foods/menu_items.
  const loadFoods = function() {
    $.get('/foods/menu_items', { action: 'getFoods' })
      .then((arr) => {
        foodData = [...arr];
        console.log("arr in loadfoods:", arr);
        renderFoods(arr);
      })
      .catch((err) => { err.message; });
  };

  loadFoods();

  // Sends user an SMS text of their estimated wait time.
  $('#twilio').on('click', (event) => {
    event.preventDefault();
    console.log("An estimated time has been sent.");
    $.ajax({
      url: "/order_status/admin/:order_id",
      method: "POST",
    })
      .catch((error) => {
        console.log("error message: ", error.message);
      });

    // ---------- IMPLEMENT AS STRETCH ----------
    // User's order status page will be updated.
    // setTimeout(() => {
    //   console.log("5 seconds have passed")
    //   $('#targetMe').text('5 years');
    // }, 5000);
    // ---------- IMPLEMENT AS STRETCH ----------

  });

  $('.delete').on('click', (event) => {
    // if preventDefault is un-commented, the page does NOT refresh so the food-item deletion is not reflected on the rendered page, even though the food item HAS been deleted
    //event.preventDefault();
    console.log("delete button clicked");

    const foodId = $(event.target).closest('article').attr('id');
    //console.log('foodId: ', foodId);

    $.post(`/foods/admin/${foodId}/delete`)
      .catch((err) => { err.message; });
  });

  $('.admin-orders-p-pressed').hide();

  $('.btn-group').on('click', function(event) {
    console.log("i've been clicked");
    event.preventDefault();
    $(this).slideUp();
    $(this).siblings('.admin-orders-p').slideUp();
    $(this).siblings('.admin-orders-p-pressed').slideDown();
  });
});
