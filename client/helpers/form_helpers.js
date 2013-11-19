clearForm = function(form) {
  var el, _i, _len, _ref, _results;
  _ref = $(form).find(':input');
  _results = [];
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    el = _ref[_i];
    _results.push((function(el) {
      switch (el.type) {
        case 'password':
          return el.value = "";
        case 'select-multiple':
          return el.value = "";
        case 'select-one':
          return el.value = "";
        case 'text':
          return el.value = "";
        case 'number':
          return el.value = "";
        case 'date':
          return el.value = "";
        case 'textarea':
          return el.value = "";
        case 'file':
          return el.value = "";
        case 'checkbox':
          return el.value = "";
        case 'radio':
          return el.checked = false;
      }
    })(el));
  }
  return _results;
};