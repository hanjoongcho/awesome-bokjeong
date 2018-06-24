//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//+++ Common Function 
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

function panToBounds(map, latlon) {
	map.panToBounds(latlon);
}

function panTo(map, latlon) {
	map.panTo(latlon);
}

function addCircleSymbol(map, lat, lon) {
	if (forcusMarker) {
		forcusMarker.setMap(null)
	}
	
	forcusMarker = new naver.maps.Marker({
	    map: map,
	    position: new naver.maps.LatLng(lat, lon),
	    icon: {
	        style: "circle",
	        strokeColor: '#ff0000',
	        strokeStyle: 'solid',
	        anchor: new naver.maps.Point(22, 22),
	        strokeWeight: 5, radius: 17
	    },
	    zIndex: 99
	});
}

function addImageMarker(title, emoji, lat, lon) {
	var latLon = new naver.maps.LatLng(lat, lon);
	return addImageMarker(title, emoji, latLon);
}

function addImageMarker(title, emoji, latLon) {
	var content = "<div class='mapImageIcon emoji'>" + emoji + "</div>";
    var marker = new naver.maps.Marker({
            map: map,
            position: latLon,
            title: title, 
            icon: {
                content: content, 
                anchor: new naver.maps.Point(16, 16)
            }, 
            zIndex: 100
        });
    return marker;
}

function removeMarkerAll() {
    markers.map(x => x.setMap(null));
    markers = [];
    
    if (forcusMarker) {
		forcusMarker.setMap(null)
	}
}

function showLayer(map, layer) {
	layer.setMap(map);
}

function hideLayer(layer) {
	layer.setMap(null);
}

function toggleMapControl(map, enableControl) {
	if (enableControl) {
		map.setOptions({ //모든 지도 컨트롤 보이기
            scaleControl: true,
            logoControl: true,
            mapDataControl: true,
            zoomControl: true,
            mapTypeControl: true
        });
    } else {
    	map.setOptions({ //모든 지도 컨트롤 숨기기
            scaleControl: false,
            logoControl: false,
            mapDataControl: false,
            zoomControl: false,
            mapTypeControl: false
        });
    }
}

function toggleInteraction(map, enableInteraction) {
	if (enableInteraction) {
		map.setOptions({ //지도 인터랙션 켜기
            draggable: true,
            pinchZoom: true,
            scrollWheel: true,
            keyboardShortcuts: true,
            disableDoubleTapZoom: false,
            disableDoubleClickZoom: false,
            disableTwoFingerTapZoom: false
        });
	} else {
		 map.setOptions({ //지도 인터랙션 끄기
             draggable: false,
             pinchZoom: false,
             scrollWheel: false,
             keyboardShortcuts: false,
             disableDoubleTapZoom: true,
             disableDoubleClickZoom: true,
             disableTwoFingerTapZoom: true
         });
	}
}

function changeMapOption(map, optionName, enable) {
	map.setOptions(optionName, enable); 
}

function requestGeoJson(layer, jsonUrl, isVisible, callback) {
	var resultLayer;
	var tooltip = $('<div style="position:absolute;z-index:1000;padding:5px 10px;background-color:#fff;border:solid 2px #000;font-size:14px;pointer-events:none;display:none;"></div>');
    tooltip.appendTo(map.getPanes().floatPane);
    
    if (isVisible) {
        $.ajax({
            url: jsonUrl,
            success: function(geojson) {
            	resultLayer = geojson;
                map.data.setStyle(function(feature) {
                    var styleOptions = {
                        fillColor: '#ff0000',
                        fillOpacity: 0.3,
                        strokeColor: '#ff0000',
                        strokeWeight: 2,
                        strokeOpacity: 0.4
                    };

                    if (feature.getProperty('focus')) {
                        styleOptions.fillOpacity = 0.6;
                        styleOptions.fillColor = '#0f0';
                        styleOptions.strokeColor = '#0f0';
                        styleOptions.strokeWeight = 4;
                        styleOptions.strokeOpacity = 1;
                    }

                    return styleOptions;
                });
                
                map.data.addGeoJson(resultLayer);
                
                map.data.addListener('mouseover', function(e) {
                    var feature = e.feature,
                        regionName = feature.getProperty('area1') + ' ' + feature.getProperty('area2') + ' ' + feature.getProperty('area1');

                    tooltip.css({
                        display: '',
                        left: e.offset.x,
                        top: e.offset.y
                    }).text(regionName);

                    map.data.overrideStyle(feature, {
                        fillOpacity: 0.6,
                        strokeWeight: 4,
                        strokeOpacity: 1
                    });
                });
                
                map.data.addListener('mouseout', function(e) {
                    tooltip.hide().empty();
                    map.data.revertStyle();
                });
                
                map.data.addListener('click', function(e) {
                    var feature = e.feature;

                    if (feature.getProperty('focus') !== true) {
                        feature.setProperty('focus', true);
                    } else {
                        feature.setProperty('focus', false);
                    }
                });
                callback(resultLayer);
            }
        });
    } else {
        map.data.removeGeoJson(layer);
        layer = null;
    }
}

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//+++ Custom Function 
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
var addConvenienceStorePoi = function(index, item, imageUrl, latlonArr) {
	var content = "<div class='mapImageIcon'><img style='width: 20px; height: 20px;' src='" + imageUrl +  "'/></div>";
    var loc = new naver.maps.LatLng(item.y, item.x);
    var marker = new naver.maps.Marker({
            map: map,
            position: loc,
            title: item.name,
            icon: {
                content: content,
                anchor: new naver.maps.Point(16, 16)
            },
            zIndex: 100
        });
    latlonArr.push(loc);
    markers.push(marker);
    appendCardWithUrl(item.name, item.address, imageUrl, item.x, item.y);
    naver.maps.Event.addListener(marker, 'click', function() { 
    	openInfoDialog(0, imageUrl, item, null);
    });
}

function getLatLngBounds(latlonArr) {
	var minX, minY, maxX, maxY;
	$.each(latlonArr, function(idx, item) {
		if (minX == undefined || item.x < minX) minX = item.x;
	    if (minY == undefined || item.y < minY) minY = item.y;
	    if (maxX == undefined || item.x > maxX) maxX = item.x;
	    if (maxY == undefined || item.y > maxY) maxY = item.y;
	});
    console.log(minX, minY, maxX, maxY);
    var latLngBounds = new naver.maps.LatLngBounds(
    		new naver.maps.LatLng(minY, minX),
			new naver.maps.LatLng(maxY, maxX)
		);
    return latLngBounds;
}

function resizeMap() {
	 var size = new naver.maps.Size( $('#wrap').width(), $('#wrap').height());
     map.setSize(size);
}
