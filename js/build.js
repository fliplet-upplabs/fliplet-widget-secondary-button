$('[data-secondary-button-id]').click(function (event) {
  event.preventDefault();

  var data = Fliplet.Widget.getData($(this).data('secondary-button-id'));

  Fliplet.Navigate.to(data.action);
});
