//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//+++ Semantic-UI 
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
function cardIconClick(target) {
	console.log($(target).attr('lat'), $(target).attr('lon'));
	map.updateBy(naver.maps.LatLng(parseFloat($(target).attr('lat')), parseFloat($(target).attr('lon'))), 13)
}

function updateCardViewSize() {
	$('#cardContainer').css('height', parseFloat($('#lnb').css('height')) - parseFloat($('.ui.vertical.accordion.menu').css('height')) - 15);
}

function appendCard(name, address, url, lon, lat) {
	var infoCard = "<div class='card'>";
    infoCard += "<div class='content'>"
    infoCard += "<img class='right floated mini ui image' src='" + url.replace('size=25x25', 'size=35x35') + "'>";
    infoCard += "<div class='header'>";
    infoCard += name;
    infoCard += "<button onclick='cardIconClick(this);' lat=" + lat + " lon=" + lon + " class='ui icon blue button latlon'><i class='map marker alternate icon'></i></button>";
    infoCard += "</div>";
    infoCard += "<div class='meta'>";
    infoCard += "Friends of Veronika";
    infoCard += "</div>";
    infoCard += "<div class='description'>";
    infoCard += address;
    infoCard += "</div>";
    infoCard += "</div>";
    infoCard += "</div>";
	$('.ui.cards').append(infoCard);
}

function updateMapSize() {
	// $('#map').css('height', parseFloat($(document.body).css('height')) - parseFloat($('#heaerContainer').css('height')) - 12);
}

$(function() {
	$(window).resize(function() {
		updateMapSize();
	});

	// $('.ui.accordion').accordion();
	$('.ui.accordion').accordion({
		onOpen: function() { updateCardViewSize(); },
		onClose: function() { updateCardViewSize(); }
	});

	$('#createCardView').on('click', function() {
		this.blur();
		var infoCard = "<div class='card'>";
	    infoCard += "<div class='content'>"
	    infoCard += "<img class='right floated mini ui image' src='img/vanagon-1919554_640.jpg'>";
	    infoCard += "<div class='header'>";
	    infoCard += "Elliot Fu";
	    infoCard += "</div>";
	    infoCard += "<div class='meta'>";
	    infoCard += "Friends of Veronika";
	    infoCard += "</div>";
	    infoCard += "<div class='description'>";
	    infoCard += "Elliot requested permission to view your contact details";
	    infoCard += "</div>";
	    infoCard += "</div>";
	    infoCard += "</div>";
		for (var i = 0; i < 10; i++) {
	    	$('.ui.cards').append(infoCard);
		}
		
		$('.ui.rating').rating();
	});
	

	//$('#createCardView').trigger('click');
	updateCardViewSize();
});
