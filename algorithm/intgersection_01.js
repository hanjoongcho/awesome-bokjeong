var prop = {
    cicleCenterX: 300,
    cicleCenterY: 250,
    circleRadius: 150,
    sectorSAngel: 0,
    sectorEAngel: 90,
    gridSize: 50,
    canvas: {width: 600, height: 600}
}

var ctx;

function init() {
    var canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    canvas.width = prop.canvas.width;
    canvas.height = prop.canvas.height;
    draw();
}

function draw() {
    // 배경 채우기
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    var gridSize = prop.gridSize;
    // draw vertical grid
    ctx.beginPath();
    for (var x = 1; x <= canvas.width / gridSize ; x++) {
        ctx.moveTo(x * gridSize + 0.5, 0);
        ctx.lineTo(x * gridSize + 0.5, canvas.height);
    }
    ctx.strokeStyle = 'rgb(255, 255, 255)';
    ctx.lineWidth = 1;
    ctx.stroke();
    
    // draw horizontal grid
    ctx.beginPath();
    for (var y = 1; y <= canvas.height / gridSize; y++) {
        ctx.moveTo(0, y * gridSize + 0.5);
        ctx.lineTo(canvas.width, y * gridSize + 0.5);
    }
    ctx.stroke();
    
    ctx.beginPath();
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.moveTo(prop.cicleCenterX, prop.cicleCenterY);
    drawCircleSector(ctx, 0, 90);
    drawCircleSector(ctx, 90, 180);
    drawCircleSector(ctx, 180, 270);
    drawCircleSector(ctx, 270, 360);
    
    
    // draw text
    ctx.fillStyle = 'white';
    ctx.font = "20px Arial";
    ctx.fillText("0 ~ 90", 325, 213);
    ctx.fillText("90 ~ 180", 325, 293);
    ctx.fillText("180 ~ 270", 185, 293);
    ctx.fillText("270 ~ 360", 185, 213);
    ctx.font = "15px Arial";
    ctx.fillText("0 radian", 460, prop.cicleCenterY - 5);
    ctx.fillText("π/2 radian", 305, 90);
    ctx.fillText("2π/2 radian", 60, prop.cicleCenterY - 5);
    ctx.fillText("3π/2 radian", 305, 420);
}

function drawCircleSector(ctx, sAngle, eAngle) {
    ctx.moveTo(prop.cicleCenterX, prop.cicleCenterY);
    ctx.arc(prop.cicleCenterX, prop.cicleCenterY, prop.circleRadius, (Math.PI/180)*(-90 + sAngle), (Math.PI/180)*(-90 + eAngle), false);
    ctx.closePath();
    ctx.stroke();
}

function degreesToRadians(degrees) {
    return degrees * (Math.PI/180);
}

function radiansToDegrees(radians) {
    return radians * (180/Math.PI);
}

function checkPoint(radius, x, y, startAngle, endAngle) { 
    var isCollision = false; 
    var sDegree = startAngle
    var eDegree = endAngle
    
    var polarradius = Math.sqrt(x*x + y*y);
    var tangent = y/x;
    var angle = Math.atan(tangent);
    var positionFromOriginX = Math.cos(angle)*polarradius;
    var positionFromOriginY = Math.sin(angle)*polarradius;
    
    $('#tan').html('tan: ' + tangent);
    $('#cotangent').html('cotangent(radian): ' + angle);
    $('#cotangentD').html('cotangent(degree): ' + radiansToDegrees(angle));
    $('#pointOrigin').html('Click Point(Circle origin): ' + positionFromOriginX + ',' + positionFromOriginY);

    // 마우스 클릭 위치 베어링으로 그리드 크기만큼 라인 그리기
    var offsetX = Math.cos(angle) * prop.gridSize;
    var offsetY = Math.sin(angle) * prop.gridSize;
    if (x > 0 && y > 0) {
        offsetY *= -1
    } else if (x < 0 && y < 0) {
        offsetX *= -1
    } else if (x < 0 && y > 0) {
        offsetX *= -1
    } else {
        offsetY *= -1
    }
    
    console.log(offsetX, offsetY)
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'rgb(0, 0, 255)';
    console.log(x, y)
    ctx.moveTo(prop.cicleCenterX + x, prop.cicleCenterY - y);
    ctx.lineTo(prop.cicleCenterX + x + offsetX, prop.cicleCenterY - y + offsetY);
    ctx.stroke();
    
    var sectorDegree = 0;
    if (x > 0 && y > 0) {         // Quadrant 1
        sectorDegree = 90 - radiansToDegrees(angle)
    } else if (x < 0 && y > 0) {  // Quadrant 2
        sectorDegree = (radiansToDegrees(angle) * -1) + 270
    } else if (x < 0 && y < 0) {  // Quadrant 3
        sectorDegree = 90 - radiansToDegrees(angle) + 180
    } else if (x > 0 && y < 0) {  // Quadrant 4                    
        sectorDegree = (radiansToDegrees(angle) * -1) + 90
    }
    
    if (sectorDegree >= sDegree && sectorDegree <= eDegree && polarradius < radius) {
        isCollision = true;
    }
    
    return isCollision;
} 

var updateMessage = function(pointX, pointY, message) {
    $('#point').html('Click Point(Canvas): ' + pointX + ', ' + pointY)
    $('#message').html(message)
}

$(function() {
    init();
    
    $('#canvas').on('click',function(e) {
        ctx.clearRect(0, 0, prop.canvas.width, prop.canvas.height)
        draw();
        
        var height = document.getElementById('canvas').height;
        var flipY = height - e.offsetY;
        var distanceX = e.offsetX - prop.cicleCenterX;
        var distanceY = prop.cicleCenterY - e.offsetY;
        
        if (checkPoint(prop.circleRadius, distanceX, distanceY, 0, 90)) {
            updateMessage(e.offsetX, e.offsetY, 'sector 0 ~ 90')
        } else if (checkPoint(prop.circleRadius, distanceX, distanceY, 90, 180)) {
            updateMessage(e.offsetX, e.offsetY, 'sector 90 ~ 180')
        } else if (checkPoint(prop.circleRadius, distanceX, distanceY, 180, 270)) {
            updateMessage(e.offsetX, e.offsetY, 'sector 180 ~ 270')
        } else if (checkPoint(prop.circleRadius, distanceX, distanceY, 270, 360)) {
            updateMessage(e.offsetX, e.offsetY, 'sector 270 ~ 360')
        } else {
            updateMessage(e.offsetX, e.offsetY, 'outside circle')
        }
        
        // 원점에서 ~ 클릭포인트 라인그리기
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.strokeStyle = 'rgb(255, 0, 0)';
        ctx.moveTo(prop.cicleCenterX, prop.cicleCenterY);
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
    });
});