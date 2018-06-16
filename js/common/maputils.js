//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//+++ Common Function 
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
function addImageMarker(title, imageUrl, lat, lon) {
    var content = "<div class='mapImageIcon widePadding'><img style='width: 24px; height: 24px;' src='" + imageUrl +  "'/></div>";
    var loc = new naver.maps.LatLng(lat, lon);
    var marker = new naver.maps.Marker({
            map: map,
            position: loc,
            title: title, 
            icon: {
                content: content, 
                size: new naver.maps.Size(25, 25),
                anchor: new naver.maps.Point(12.5, 25)
            }, 
            zIndex: 100
        });
    return marker;
}

function removeMarkerAll() {
    markers.map(x => x.setMap(null));
    markers = [];
}