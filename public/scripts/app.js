// Client facing scripts here
$(() => {
  // Fetches all menu items.
  let foodData = [];

  // Total of the user's cart.
  let runningPrice = 0;

  const createFoodElement = (foods) => {

    let $foodArticle = $(`
    <article id='${foods.id}'>
    <span>
    <h2>${foods.name}</h2>
    <p>${foods.description}</p>
    <div>
    <p>${foods.price}</p>
    <div class="button-type">
    </div>
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

    // if ($('title').text() === 'Home') {
    //   let button = `
    //     <button class="minus">-</button>
    //       <p class="quantity"> 0 </p>
    //     <button class="plus">+</button>
    //   `;
    //   $('.button-type').append(button);
    // }
    // if ($('title').text() === 'Admin - Foods') {
    //   let button = `
    //     <form method="GET" action="/foods/admin/:foodId">
    //       <button>Edit</button>
    //     </form>
    //     <form method="POST" action="/foods/admin/:foodId/delete">
    //       <button>Delete</button>
    //     </form>
    // `;
    //   $('.button-type').append(button);
    // }
    return $foodArticle;
  };

  // const addButtons = function(foodsArr) {
  //   $('.button-type').empty();

  //   if ($('#user')) {
  //     for (let food of foodsArr) {
  //       let button = `
  //         <button class="minus">-</button>
  //           <p class="quantity"> 0 </p>
  //         <button class="plus">+</button>
  //       `;
  //       $('.button-type').prepend(button);
  //     }
  //   }

  // };


  const renderFoods = function(foodsArr) {
    $('.food-card-container').empty();

    console.log("foodsArr:", foodsArr);

    for (let food of foodsArr) {
      let newFood = createFoodElement(food);
      $('.button-type').empty();
      $('.food-card-container').prepend(newFood);
      if ($('title').text() === 'Home') {
        let button = `
          <button class="minus">-</button>
            <p class="quantity"> 0 </p>
          <button class="plus">+</button>
        `;
        $('.button-type').append(button);
      }
      if ($('title').text() === 'Admin - Foods') {
        let button = `
          <form method="GET" action="/foods/admin/:foodId">
            <button>Edit</button>
          </form>
          <form method="POST" action="/foods/admin/:foodId/delete">
            <button>Delete</button>
          </form>
      `;
        $('.button-type').append(button);
      }
    }

    $('.minus').on('click', (event) => {
      event.preventDefault();
      const foodId = $(event.target).closest('article').attr('id');
      //console.log("(this) minus: ", $(event.target).closest('article').attr('id'));

      $.post(`/cart/${foodId}/edit`, { action: 'decrement' })
        .then((res) => {

          console.log("foodData:", foodData);

          console.log("inside minus .then");

          const foodId = res.food_id;
          const quantity = res.quantity;

          const matchingFoodObj = foodData.find(food => food.id === foodId);
          const price = matchingFoodObj.price;
          console.log("res: ", res);

          $(`#${foodId}`).find('.quantity').text(quantity);
          $(`#table-${foodId}`).find('.quantity').text(quantity);
          $(`#table-${foodId}`).find('.price').text((price * quantity));

          runningPrice -= price;

          $(`#total`).text(runningPrice);
        })
        .catch((err) => { err.message; });
      console.log("decrement clicked");
    });

    $('.plus').on('click', (event) => {
      event.preventDefault();
      const foodId = $(event.target).closest('article').attr('id');
      //console.log("(this) plus: ", $(event.target).closest('article').attr('id'));

      $.post(`/cart/${foodId}/edit`, { action: 'increment' })
        .then(res => {

          console.log("inside plus .then");

          const foodId = res.food_id;
          const quantity = res.quantity;

          const matchingFoodObj = foodData.find(food => food.id === foodId);
          const price = matchingFoodObj.price;
          console.log("price:", price);
          console.log("res: ", res);


          $(`#${foodId}`).find('.quantity').text(quantity);
          $(`#table-${foodId}`).find('.quantity').text(quantity);
          $(`#table-${foodId}`).find('.price').text((price * quantity));

          runningPrice += price;

          $(`#total`).text(runningPrice);
        })
        .catch((err) => { err.message; });
      console.log("increment clicked");
    });

  };

  // receive json data from /foods/menu_items
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


  // const createOrder = () => {
  //   let $orderArticle = $('#cart').html();
  //   return $orderArticle;
  // };

  // const renderOrder = () => {
  //   $('#cart-container').empty();

  //   let newOrder = createOrder();
  //   $('#cart-container').prepend(newOrder);
  // };

  // $('#place-order').on('click', (event) => {
  //   event.preventDefault();
  //   renderOrder();
  // });

});
