// var env = require('node-env-file');
// env('../path/to/.env');

$(document).ready(function() {
  getWeatherFromZip();
  //newUser();
  //signIn();
  logout();
});

  var getWeatherFromZip = function(){
    $('#submit-zip').on('click', function(event){
      event.preventDefault();
      zip = document.getElementById('zipcode').value
      $.ajax({
        url : "https://api.wunderground.com/api/59fc6ecd129fa3cb/geolookup/conditions/q/"+zip+".json",
        type: 'get',
        dataType : "jsonp",
        success : function(parsed_json) {
          var location = parsed_json['location']['city'];
          var temp_f = parsed_json['current_observation']['temp_f'];
          // alert('The weather in '+location+' is '+temp_f);
          console.log(temp_f);
          console.log(parsed_json['current_observation']['precip_today_metric']);
          outfit(temp_f);
          }
        })
    })
  }

  var outfit = function(temp){
      if (temp < 30){
        alert("Just stay inside. If you need to go outside, wear ski attire.");
      } else if (temp > 30 && temp < 40){
        alert("Jeans, boots, long-sleeved shirt, sweater AND jacket. Maybe wear some tights under those jeans.");
      } else if (temp > 40 && temp < 50) {
        alert("Jeans, boots, long-sleeved shirt, jacket.");
      } else if (temp > 50 && temp < 60) {
        alert("Jeans, sneakers, t-shirt, sweater, and jacket.");
      } else if (temp > 60 && temp < 70) {
        alert("Patterned skirt, solid shirt, tights, flats!");
      } else if (temp > 70 && temp < 80) {
        alert("Sundress and sandals.");
      } else if (temp > 80 && temp < 90) {
        alert("Tank top and shorts and flip-flops");
      } else if (temp > 90) {
        alert("Seriously consider moving elsewhere.");
      } else {
        alert("Put in a real zip code, silly!");
      }
  }

  // var newUser = function(){
  //   $('#sign-up').on('click', function(event){
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

  var logout = function(){
    $('.logout').on('click', function(event){
      event.preventDefault();
      console.log("hello!");
      $.ajax({
        url: '/sessions',
        type: 'delete',
        success: function(no_session){
          $('.sign-in').show();
          $('.sign-up').show();
          alert("Goodbye!");
        }
      })
    })
  }
