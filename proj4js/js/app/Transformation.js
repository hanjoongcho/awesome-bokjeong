define(['proj4'], function (proj4) {
    return {
        getHello: function () {
            return 'Hello World';
        },
        epsg4326ToEpsg3785: function(point4326) {
          return proj4(proj4('EPSG:4326'), proj4('EPSG:3785'), point4326);
        },
        epsg3785ToEpsg4326: function(point3785) {
          return proj4(proj4('EPSG:3785'), proj4('EPSG:4326'), point3785);
        }
    };
});
