$(() => {
  // Hides cart items until items are added to cart
  $('.all-cart-rows').hide();
  $('#place-order').hide();

  // Menu items fetched will be kept in this array
  let foodData = [];

  // Keeps track of total in users cart. Used in increment and decrement functions below
  let runningPrice = 0;

  // Makes individual menu item on rendered home page
  const createFoodElement = (foods) => {
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

  // Preppends/appeneds the food elements (food cards) and their appropriate
  // button sets (-/+ (user) or delete (admin)) to the page
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

      $.post(`/cart/${foodId}/edit`, { action: 'decrement' })
        .then((res) => {

          const foodId = res.food_id;
          const quantity = res.quantity;
          const matchingFoodObj = foodData.find(food => food.id === foodId);
          const price = parseFloat(matchingFoodObj.price);
          const $tableId = $(`.table-${foodId}`);

          $(`#${foodId}`).find('.quantity').text(quantity);
          $tableId.find('.quantity').text(quantity);
          $tableId.find('.price').text((price * quantity / 100));

          if ($(`#${foodId}`).find('.quantity').text() === '0') {
            console.log('quantity (minus): ', $(`#${foodId}`).find('.quantity').text());
            $tableId.slideUp();
          }

          runningPrice -= price;

          if (runningPrice === 0) {
            $('#place-order').slideUp();
          }

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

      $('#place-order').slideDown();

      $.post(`/cart/${foodId}/edit`, { action: 'increment' })
        .then(res => {
          const foodId = res.food_id;
          const quantity = res.quantity;

          const matchingFoodObj = foodData.find(food => food.id === foodId);
          const price = parseFloat(matchingFoodObj.price);
          const $tableId = $(`.table-${foodId}`);

          $(`#${foodId}`).find('.quantity').text(quantity);
          $tableId.find('.quantity').text(quantity);
          $tableId.find('.price').text((price * quantity / 100));

          if ($(`#${foodId}`).find('.quantity').text() !== '0') {
            console.log('quantity (plus): ', $(`#${foodId}`).find('.quantity').text());
            $tableId.slideDown();
          }

          runningPrice += price;

          $(`#total`).text(`$ ${(runningPrice / 100)}`);
        })
        .catch((err) => { err.message; });
    });

    // Allows admin to delete menu items.
    $('.delete').on('click', (event) => {
      console.log("delete button clicked");

      const foodId = $(event.target).closest('article').attr('id');

      $.post(`/foods/admin/${foodId}/delete`)
        .catch((err) => { err.message; });
    });

  };

  // Fetches json data from /foods/menu_items to render and load food cards
  // to the page
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
});

