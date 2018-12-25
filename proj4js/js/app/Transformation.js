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
        },
        getDistanceFromLatLonInKm: function(lat1, lon1, lat2, lon2) {
          var R = 6371; // Radius of the earth in km
            var dLat = this.deg2rad(lat2-lat1);  // deg2rad below
            var dLon = this.deg2rad(lon2-lon1);
            var a =
              Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
              Math.sin(dLon/2) * Math.sin(dLon/2)
              ;
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
            var d = R * c; // Distance in km
            return d;
        },
        deg2rad: function(deg) {
           return deg * (Math.PI/180)
        }
    };
});
