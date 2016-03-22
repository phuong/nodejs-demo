

function doLike($element) {
  var data = {
    'id': $element.data('id'),
    'name': $element.data('name')
  }
  $.ajax({
    url: "/like/",
    data: data,
    type: 'post',
    success: function (res) {
      window.location = '/';
    },
    error: function (err) {
      window.location = '/';
    }
  });
}

$(document).ready(function() {
  $(".like").on('click', function() {
    doLike($(this));
  });
});