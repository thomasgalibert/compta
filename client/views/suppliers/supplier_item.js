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


Template.supplierItem.helpers({
	editing: function(){
		return Session.equals('editing_supplier', this._id);
	}
});

Template.supplierItem.events(okCancelEvents(
	'#editNameSupplier',
	{
		ok: function (value){
			if (value != "") {
				Suppliers.update(this._id, {$set: {name: value}});	
			}
			Session.set('editing_supplier', null);
		},
		cancel: function (){
			Session.set('editing_supplier', null);
		}
	}
));

Template.supplierItem.events({
  'click #deleteSupplier': function(e){
    Suppliers.remove(this._id);
  },
})