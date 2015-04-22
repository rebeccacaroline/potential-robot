$(document).ready(function() {
  getWeatherFromZip();
});

  var getWeatherFromZip = function(){
    $('#submit-zip').on('click', function(event){
      event.preventDefault();
      var zip = document.getElementById('zipcode').value
      console.log(zip)
      $.ajax({
        url: "/outfit",
        type: 'get',
        data: {code: zip},
        success: function(parsed_json) {
          console.log(parsed_json)
          var location = parsed_json['location']['city'];
          var temp_f = parsed_json['current_observation']['temp_f'];
          console.log(temp_f);
          console.log(parsed_json['current_observation']['precip_today_metric']);
          outfit(location, temp_f);
          }
        })
    })
  }

  var outfit = function(location, temp){
    var weatherInLocation = "The weather in "+location+" is "+temp+"."
      if (temp < 30){
        alert(weatherInLocation + "Seriously consider moving elsewhere.");
      } else if (temp > 30 && temp < 40){
        alert(weatherInLocation + "Wear jeans, boots, long-sleeved shirt, sweater AND jacket. Maybe wear some tights under those jeans.");
      } else if (temp > 40 && temp < 50) {
        alert(weatherInLocation + "Wear jeans, boots, long-sleeved shirt, jacket.");
      } else if (temp > 50 && temp < 60) {
        alert(weatherInLocation + " Wear jeans, sneakers, t-shirt, sweater, and jacket.");
      } else if (temp > 60 && temp < 70) {
        alert(weatherInLocation + " Wear a patterned skirt, solid shirt, tights, flats!");
      } else if (temp > 70 && temp < 80) {
        alert(weatherInLocation + "sundress and sandals.");
      } else if (temp > 80 && temp < 90) {
        alert(weatherInLocation + " Wear tank top and shorts and flip-flops");
      } else if (temp > 90) {
        alert(weatherInLocation + "Seriously consider moving elsewhere.");
      } else {
        alert("Put in a real zip code, silly!");
      }
  }


  // var newUser = function(){
  //   $('#sign-up').on('submit', function(event){
  //     event.preventDefault();
  //     formData = $(this).serialize();
  //     $.ajax({
  //       url: '/users',
  //       type: 'post',
  //       data: formData,
  //       success: function(id){
  //         alert("You are now a user!");
  //         $('.sign-in').hide();
  //         $('.sign-up').hide();
  //         $
  //       }
  //     })
  //   })
  // }

  // var signIn = function(){
  //   $('#sign-in').on('click', function(event){
  //     event.preventDefault();
  //     formData = $(this).serialize();
  //     $.ajax({
  //       url: '/sessions',
  //       type: 'post',
  //       data: formData,
  //       success: function(id){
  //         alert("You are signed in!");
  //         $('.sign-in').hide();
  //         $('.sign-up').hide();
  //       }
  //     })
  //   })
  // }

  // var logout = function(){
  //   $('.logout').on('click', function(event){
  //     event.preventDefault();
  //     console.log("hello!");
  //     $.ajax({
  //       url: '/sessions',
  //       type: 'delete',
  //       success: function(no_session){
  //         $('.sign-in').show();
  //         $('.sign-up').show();
  //         alert("Goodbye!");
  //       }
  //     })
  //   })
  // }
