$(function() {

  var badge = parseInt($('.badge').html());
  console.log(badge);

  $('#promocodeButton').on('click', function() {

    var input = $('#code').val();
    if (input === '') {
      return false;
    } else {
      $.ajax({
        type: 'POST',
        url: '/promocode',
        data: {
          promocode: input
        },
        success: function(data) {
         
          if (data === 0) {
            $('#promocodeButton').html("Code Doesn't exist");
          } else {
            $('#promocodeButton').html('Applied');
            $('#promocodeButton').prop('disabled', true);
            $('#promocodeButton').html("Successfully Applied the code!");
            console.log("dataaa<<>>>>>"+data);
            $('#totalPrice').html(data);
          }
        }
      });
    }
  });
});