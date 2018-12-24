require([ 'js/foo' ], function(foo) {
    console.log(foo.get()); // 0
    foo.increase();
    console.log(foo.get()); // 1
});