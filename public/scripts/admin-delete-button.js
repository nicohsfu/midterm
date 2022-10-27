$(() => {
  // Allows admin to delete menu items.

  $('.delete').on('click', (event) => {
    console.log("delete button clicked");

    const foodId = $(event.target).closest('article').attr('id');

    $.post(`/foods/admin/${foodId}/delete`)
      .catch((err) => { err.message; });
  });
});
