//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//+++  Define Global Variable
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
var cuUrl = "https://search.pstatic.net/common/?type=ofullfill&size=25x25&src=http%3A%2F%2Fldb.phinf.naver.net%2F20150831_276%2F1441000171607H9qgJ_JPEG%2F146376578437799_0.jpg";
var gsUrl = "https://search.pstatic.net/common/?type=ofullfill&size=25x25&src=http%3A%2F%2Fldb.phinf.naver.net%2F20160729_12%2F14697916166913CnBg_JPEG%2Fgs25_image1.jpg";
var sevenUrl = "https://search.pstatic.net/common/?type=ofullfill&size=25x25&src=http%3A%2F%2Fldb.phinf.naver.net%2F20160512_248%2F1463013758149jMIK0_JPEG%2F176462497257574_0.jpeg";

var map = null;
var markers = [];
var infoWindows = [];
var symbolMap = {
        cart: './img/cart-36-24.png',
        empty: './img/store-64.png',
        vanagon: './img/vanagon-1919554_640.jpg'
};


//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//+++ Layer 초기화
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
var jeju = new naver.maps.LatLng(33.3590628, 126.534361),
    busan = new naver.maps.LatLng(35.1797865, 129.0750194),
    dokdo = new naver.maps.LatLngBounds(
                new naver.maps.LatLng(37.2380651, 131.8562652),
                new naver.maps.LatLng(37.2444436, 131.8786475)),
    seoul = new naver.maps.LatLngBounds(
                new naver.maps.LatLng(37.42829747263545, 126.76620435615891),
                new naver.maps.LatLng(37.7010174173061, 127.18379493229875)),
    bokjeong = new naver.maps.LatLng(37.46561, 127.127075);

var bicycleLayer = new naver.maps.BicycleLayer();
var cadastralLayer = new naver.maps.CadastralLayer();
var labelMapType = new naver.maps.NaverMapTypeOption.getNormalLabelLayer();
var labelMapTypeRegistry = new naver.maps.MapTypeRegistry({
    'label': labelMapType
});
var labelLayer = new naver.maps.Layer('label', labelMapTypeRegistry);
var bokjeongLayer = null;

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//+++ Map 초기화
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
$(function() {
	map = new naver.maps.Map('map', {
        center: new naver.maps.LatLng(bokjeong), //지도의 초기 중심 좌표
        zoom: 10, //지도의 초기 줌 레벨
        minZoom: 1, //지도의 최소 줌 레벨
        zoomControl: true, //줌 컨트롤의 표시 여부
        zoomControlOptions: { //줌 컨트롤의 옵션
            style: naver.maps.ZoomControlStyle.SMALL,
            position: naver.maps.Position.TOP_RIGHT
        },
        mapTypes: new naver.maps.MapTypeRegistry({
            'normal': naver.maps.NaverMapTypeOption.getVectorMap()
        })
    });

	// map.setOptions("mapTypeControl", true); //지도 유형 컨트롤의 표시 여부
	map.setOptions("disableKineticPan", false);
	map.setOptions("tileTransition", false);
	labelLayer.setMap(map);
	
	naver.maps.Event.addListener(map, 'bounds_changed', function(bounds) {
	    $('#latLon').html(map.getCenter().y + ", " + map.getCenter().x);
	});
	
	naver.maps.Event.addListener(map, 'zoom_changed', function(zoom) {
	    $('#zoomLevel').html(zoom);
	});
	
	updateMapSize();
	$('#addConvenienceStore').trigger('click');
});