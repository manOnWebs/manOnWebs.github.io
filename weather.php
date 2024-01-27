<?php

function get_client_ip() {
    $ipaddress = '';
    if(getenv('REMOTE_ADDR'))
        $ipaddress = getenv('REMOTE_ADDR');
    else if (getenv('HTTP_CLIENT_IP'))
        $ipaddress = getenv('HTTP_CLIENT_IP');
    else if(getenv('HTTP_X_FORWARDED_FOR'))
        $ipaddress = getenv('HTTP_X_FORWARDED_FOR');
    else if(getenv('HTTP_X_FORWARDED'))
        $ipaddress = getenv('HTTP_X_FORWARDED');
    else if(getenv('HTTP_FORWARDED_FOR'))
        $ipaddress = getenv('HTTP_FORWARDED_FOR');
    else if(getenv('HTTP_FORWARDED'))
        $ipaddress = getenv('HTTP_FORWARDED');
    else
        $ipaddress = 'UNKNOWN';
    return $ipaddress; 
}

$ip = get_client_ip(); // the IP address to query

$query = @unserialize(file_get_contents('http://ip-api.com/php/'.$ip));
if($query && $query['status'] == 'success') {
    //get Coords
    $lat = $query['lat'];
    $lon = $query['lon'];
    $city = $query['city'];

    $url = "https://api.openweathermap.org/data/2.5/weather?lat={$lat}&lon={$lon}&appid=d2c802cde8f7a79706d39cffc29696de";

    $djson = @file_get_contents($url);
    if ($djson !== false) {
        echo $djson; // Output the weather data if fetched successfully
    } else {
        echo '{"weather":[{"description":"dunno"}]}'; // Display "dunno" in case of an error fetching weather data
    }
} else {
    $url = "http://api.openweathermap.org/data/2.5/weather?q=Paris&appid=d2c802cde8f7a79706d39cffc29696de";

    $djson = @file_get_contents($url);
    if ($djson !== false) {
        echo $djson; // Output the weather data if fetched successfully
    } else {
        echo '{"weather":[{"description":"srsly dunno"}]}'; // Display "srsly dunno" in case of an error fetching weather data
    }
}
?>
