requirejs.config({
    baseUrl: 'js/lib',
    paths: {
      app: '../app',
      proj4: '//cdnjs.cloudflare.com/ajax/libs/proj4js/2.5.0/proj4',
      jquery: "//ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min"
    }
});

requirejs(['app/main']);
