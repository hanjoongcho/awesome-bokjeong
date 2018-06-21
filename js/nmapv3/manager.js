//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//+++ Manager 초기화
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
function initDrawingManager() {
	drawingManager = new naver.maps.drawing.DrawingManager({
	    map: map,
	    drawingControl: [
	        naver.maps.drawing.DrawingMode.HAND,
	        naver.maps.drawing.DrawingMode.RECTANGLE,
	        naver.maps.drawing.DrawingMode.ELLIPSE,
	        naver.maps.drawing.DrawingMode.POLYLINE,
	        naver.maps.drawing.DrawingMode.ARROWLINE,
	        naver.maps.drawing.DrawingMode.POLYGON,
	        naver.maps.drawing.DrawingMode.MARKER
	    ],
	    drawingControlOptions: {
	        position: naver.maps.Position.TOP_RIGHT,
	        style: naver.maps.drawing.DrawingStyle.HORIZONTAL
	    },
	    controlPointOptions: {
	        anchorPointOptions: {
	            radius: 5,
	            fillColor: '#ff0000',
	            strokeColor: '#0000ff',
	            strokeWeight: 2
	        },
	        midPointOptions: {
	            radius: 4,
	            fillColor: '#ff0000',
	            strokeColor: '#0000ff',
	            strokeWeight: 2,
	            fillOpacity: 0.5
	        }
	    },
	    rectangleOptions: {
	        fillColor: '#ff0000',
	        fillOpacity: 0.5,
	        strokeWeight: 3,
	        strokeColor: '#ff0000'
	    },
	    ellipseOptions: {
	        fillColor: '#ff25dc',
	        fillOpacity: 0.5,
	        strokeWeight: 3,
	        strokeColor: '#ff25dc'
	    },
	    polylineOptions: { // 화살표 아이콘 계열 옵션은 무시됩니다.
	        strokeColor: '#222',
	        strokeWeight: 3
	    },
	    arrowlineOptions: { // startIcon || endIcon 옵션이 없으면 endIcon 을 BLOCK_OPEN 으로 설정합니다.
	        endIconSize: 16,
	        strokeWeight: 3
	    },
	    polygonOptions: {
	        fillColor: '#ffc300',
	        fillOpacity: 0.5,
	        strokeWeight: 3,
	        strokeColor:'#ffc300'
	    },
	    markerOptions: {
	        icon: {
	            content: '<img src="/img/pin_default.png" alt="" ' +
	                'style="margin:0px;padding:0px;border:0px solid transparent;display:block;max-width:none;max-height:none; ' +
	                '-webkit-user-select: none; position: absolute; width: 22px; height: 35px; left: 0px; top: 0px;">',
	            size: new naver.maps.Size(22, 35),
	            anchor: new naver.maps.Point(11, 35)
	        }
	    }
	});
}
