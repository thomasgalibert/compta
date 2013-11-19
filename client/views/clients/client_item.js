////////// Helpers for in-place editing //////////

// Returns an event map that handles the "escape" and "return" keys and
// "blur" events on a text input (given by selector) and interprets them
// as "ok" or "cancel".
var okCancelEvents = function (selector, callbacks) {
  var ok = callbacks.ok || function () {};
  var cancel = callbacks.cancel || function () {};

  var events = {};
  events['keyup '+selector+', keydown '+selector+', focusout '+selector] =
    function (evt) {
      if (evt.type === "keydown" && evt.which === 27) {
        // escape = cancel
        cancel.call(this, evt);

      } else if (evt.type === "keyup" && evt.which === 13 ||
                 evt.type === "focusout") {
        // blur/return/enter = ok/submit if non-empty
        var value = String(evt.target.value || "");
        if (value)
          ok.call(this, value, evt);
        else
          cancel.call(this, evt);
      }
    };

  return events;
};

var activateInput = function (input) {
  input.focus();
  input.select();
};


Template.clientItem.helpers({
	editing: function(){
		return Session.equals('editing_client', this._id);
	}
});

Template.clientItem.events(okCancelEvents(
	'#editNameClient',
	{
		ok: function (value){
			if (value != "") {
				Clients.update(this._id, {$set: {name: value}});	
			}
			Session.set('editing_client', null);
		},
		cancel: function (){
			Session.set('editing_client', null);
		}
	}
));

Template.clientItem.events({
  'click #deleteClient': function(e){
    Clients.remove(this._id);
  },
});