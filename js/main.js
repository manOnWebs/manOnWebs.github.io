	   getWeather("./weather.php");

	   function getWeather(link) {
	   		$.getJSON(link, function(data){

			//console.log(data);

			//set weather id & icon 
			var id = data.weather[0].id;
			var icon = data.weather[0].icon;

			$('#weather-id').text(id);
			$('#weather-icon').text(icon);

			//TESTING 
			//icon = "01n";
			//change such doge and sky based on much icon
			var doge_img = "url(./img/doge/" + icon + ".png)";
			$('.doge-image').css('background-image', doge_img);

			var sky_img = "url(./img/sky-img/" + icon + ".png)";
			$('.bg').css('background-image', sky_img);

			//console.log(icon);

			//get weather description
			var tempCelcius = data.main.temp - 273.15;
			var tempFahrenheit = tempCelcius * 9 / 5 + 32;
			var description = data.weather[0].description;

			$('#weather-desc').text("wow " + description);
			$('#location').text(data.name);

			$('#degreesCelsius .number').text(Math.round(tempCelcius));
			$('#degreesCelsius .cel').text("°C ");
			$('#degreesFahrenheit').text(Math.round(tempFahrenheit) + "°F");

			$(".suchlikes").show();
			$(".ourinfo").show();

			//initialise such doge
			$($.doge);
		});
	   }

	   	$("#browser_geo" ).one('click', function(){
	   		getLocation();

  			 function getLocation()
			  {
			  if (navigator.geolocation)
			    {
			    navigator.geolocation.getCurrentPosition(showPosition);
			    }
			  else
			  	$("#browser_geo").text("Geolocation is not supported by this browser.");
			  }
			function showPosition(position)
			  {
			  //$("#browser_geo").text("Latitude: " + position.coords.latitude + 
			  //"Longitude: " + position.coords.longitude);

			  	var url = 'http://api.openweathermap.org/data/2.5/weather';
                url += '?lat=' + position.coords.latitude + '&lon=' + position.coords.longitude + '&callback=?';

                getWeather(url);
                $("#browser_geo").text("wow, located!").css("cursor", "auto").css("color", "#FF5CFF");
			  }
			});





