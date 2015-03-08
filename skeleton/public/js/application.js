$(document).ready(function() {
  getWeatherFromZip();
});

  var getWeatherFromZip = function(){
    $('#submit-zip').on('click', function(event){
      event.preventDefault();
      zip = document.getElementById('zipcode').value
      $.ajax({
        url : "http://api.wunderground.com/api/59fc6ecd129fa3cb/geolookup/conditions/q/"+zip+".json",
        type: 'get',
        dataType : "jsonp",
        success : function(parsed_json) {
          var location = parsed_json['location']['city'];
          var temp_f = parsed_json['current_observation']['temp_f'];
          alert('the weather in '+location+' is '+temp_f);
          }
        })
    })
  }


