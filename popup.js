// By Andrew Duncan
// Github Page:
// Using University of Waterloo API found here https://api.uwaterloo.ca/
// Last Updated: Aug 31st, 2014

$( document ).ready(function() {
  // Represent days of the week
  var weekday=new Array(7);
  weekday[1]="Monday";
  weekday[2]="Tuesday";
  weekday[3]="Wednesday";
  weekday[4]="Thursday";
  weekday[5]="Friday";
  weekday[6]="Saturday";
  weekday[7]="Sunday";
  
  // Date information
  $weekNumber = (new Date()).getWeek();  // Get week number (1-52)
  var d = new Date();
  var year = d.getFullYear();
  var day = d.getDate();
  var dayOfWeek = d.getDay();
  
  var count = 0;
  $text = ''; // Text to output to screen
  
  $.getJSON('https://api.uwaterloo.ca/v2/foodservices/' + year + '/' + $weekNumber + '/menu.json?key=b13a3224e1bd4a8a72bfddd903d9e692', function(data){
        for (var i = 0; i < data.data.outlets.length; i++) {
          $outlet = data.data.outlets[i].outlet_name;
          if ($outlet === "Mudie's" || $outlet === "REVelation") {
          count += 1;
          $text += '<div>';
          $text += '<h4 style="text-align:center">' + $outlet + '</h4>';
          for (var j = 0; j < data.data.outlets[i].menu.length; j++) {
            if (data.data.outlets[i].menu[j].day == weekday[dayOfWeek]) {
              if (data.data.outlets[i].menu[j].meals.lunch.length !== 0) {
                $text += '<h5 style="font-family:verdana">Lunch:</h5><ul>';
                for (var k = 0; k < data.data.outlets[i].menu[j].meals.lunch.length; k++) {
                  $text += '<li>' + data.data.outlets[i].menu[j].meals.lunch[k].product_name;
                  if (data.data.outlets[i].menu[j].meals.lunch[k].diet_type + "" !== "null") {
                    $text += ' (' + data.data.outlets[i].menu[j].meals.lunch[k].diet_type + ')</li>'
                    
                  } else {
                    $text += '</li>';
                  }
                }
                $text += '</ul>';
              }
              if (data.data.outlets[i].menu[j].meals.dinner.length !== 0) {
                $text += '<h5 style="font-family:verdana">Dinner:</h5><ul>';
                for (var k = 0; k < data.data.outlets[i].menu[j].meals.dinner.length; k++) {
                  $text += '<li>' + data.data.outlets[i].menu[j].meals.dinner[k].product_name + '</li>';
                }
                $text += '</ul>';
              }
              if (count == 1) {
                $text += '<hr>';
          }
            }
          }
          $text += '</div>';
        
        }
        }
        $('#events').append($text);
    });
});


Date.prototype.getWeek = function() {
    var onejan = new Date(this.getFullYear(),0,1);
    return Math.ceil((((this - onejan) / 86400000) + onejan.getDay()+1)/7);
}