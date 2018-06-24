//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//+++ Semantic-UI 
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
function cardIconClick(target) {
	console.log($(target).attr('lat'), $(target).attr('lon'));
	map.updateBy(naver.maps.LatLng(parseFloat($(target).attr('lat')), parseFloat($(target).attr('lon'))), 13);
	addCircleSymbol(map, parseFloat($(target).attr('lat')), parseFloat($(target).attr('lon')));
}

function updateCardViewSize() {
	$('#cardContainer').css('height', parseFloat($('#lnb').css('height')) - parseFloat($('.ui.vertical.accordion.menu').css('height')) - 15);
}

function appendCard(name, address, emoji, lon, lat) {
	var infoCard = "<div class='card'>";
    infoCard += "<div class='content'>";
	infoCard += "<div class='cardImg'>";
	infoCard += emoji;
	infoCard += "</div>";
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

function appendCardWithUrl(name, address, imageUrl, lon, lat) {
	var infoCard = "<div class='card'>";
    infoCard += "<div class='content'>";
	infoCard += "<div class='cardImg'>";
	infoCard += "<img src='" + imageUrl.replace('size=25x25', 'size=35x35') + "'>";
	infoCard += "</div>";
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

function removeCard() {
	$('.ui.cards').empty();
}


function updateMapSize() {
	// $('#map').css('height', parseFloat($(document.body).css('height')) - parseFloat($('#heaerContainer').css('height')) - 12);
}

function openInfoDialog(jobFlag, imageUrl, item, emoji) {
	if (jobFlag == 0) {
		$('#infoEmoji').css('display', 'none');
		$('#infoIcon').css('display', 'inline-block');
		$('#infoIcon').attr('src', imageUrl.replace('size=30x30', 'size=100x100'));
	   
	} else if (jobFlag == 1) {
		$('#infoEmoji').css('display', 'inline-block');
		$('#infoIcon').css('display', 'none');
		$('#infoEmoji').html(emoji);
	}
     
	$('.ui.tiny.modal').modal('show');
	$('.ui.tiny.modal .header').html(item.name);
	$("#infoAddress").html(item.address);
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
