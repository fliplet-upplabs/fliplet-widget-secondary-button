var widgetId = Fliplet.Widget.getDefaultId();
var data = Fliplet.Widget.getData() || {};

var linkActionProvider = Fliplet.Widget.open('com.fliplet.link', {
  // If provided, the iframe will be appended here,
  // otherwise will be displayed as a full-size iframe overlay
  selector: '#action',
  // Also send the data I have locally, so that
  // the interface gets repopulated with the same stuff
  data: data.action,
  // Events fired from the provider
  onEvent: function(event, data) {
    if (event === 'interface-validate') {
      Fliplet.Widget.toggleSaveButton(data.isValid === true);
    }
  }

});

// 1. Fired from Fliplet Studio when the external save button is clicked
Fliplet.Widget.onSaveRequest(function() {
  $('form').submit();
});

// 2. Fired when the user submits the form
$('form').submit(function(event) {
  event.preventDefault();
  linkActionProvider.forwardSaveRequest();
});

// 3. Fired when the provider has finished
linkActionProvider.then(function(result) {
  data.action = result.data;
  save(true);
});

function save(notifyComplete) {
  data.label = $('#secondaryButtonLabel').val();

  Fliplet.Widget.save(data).then(function() {
    if (notifyComplete) {
      Fliplet.Widget.complete();
      window.location.reload();
    } else {
      Fliplet.Studio.emit('reload-widget-instance', widgetId);
    }
  });
}

$('#secondaryButtonLabel').on('keyup change paste', $.debounce(function() {
  save();
}, 500));
