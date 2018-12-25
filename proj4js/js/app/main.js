define(['jquery', 'app/Transformation'], function (jquery, Transformation) {
    $('button').eq(0).on('click', function() {
      var point4326 = [parseFloat($('input').eq(0).val()), parseFloat($('input').eq(1).val())];
      var point3785 = Transformation.epsg4326ToEpsg3785(point4326);
      $('input').eq(2).val(point3785[0])
      $('input').eq(3).val(point3785[1])
    });

    $('button').eq(1).on('click', function() {
      var point3785 = [parseFloat($('input').eq(2).val()), parseFloat($('input').eq(3).val())];
      var point4326 = Transformation.epsg3785ToEpsg4326(point3785);
      $('input').eq(0).val(point4326[0])
      $('input').eq(1).val(point4326[1])
    });

    console.log(Transformation.getDistanceFromLatLonInKm(37, 127, 37, 127.1));
//return jquery.noConflict( true );
});
