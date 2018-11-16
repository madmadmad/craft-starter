function initMap() {

  $('.map').each(function(index){
    var map,
        lat = parseFloat($(this).attr('data-lat')),
        lng = parseFloat($(this).attr('data-lng')),
        id = 'map-' + index;

    console.log($(this));

    $(this).attr('id', id)

    map = new google.maps.Map(document.getElementById(id), {
      center: {lat: lat, lng: lng},
      zoom: 15,
      styles: mapStyle,
      disableDefaultUI: true,
      gestureHandling: 'none',
      zoomControl: false
    });

    map.marker = new google.maps.Marker({
      position: {lat: lat, lng: lng},
      map: map,
      icon: {
        url: '/assets/images/location.svg',
      }
    });
  });


}
