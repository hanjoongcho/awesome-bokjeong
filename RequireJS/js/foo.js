/* js/foo.js */
// 모듈 정의의 기본 형태
define([ // 의존 모듈들을 나열한다. 모듈이 한 개라도 배열로 넘겨야 한다.  
    'js/util',
    'js/Ajax',
    'js/Event'
], function (util, Ajax, Event) { // 의존 모듈들은 순서대로 매개변수에 담긴다.
    // 의존 모듈들이 모두 로딩 완료되면 이 함수를 실행한다.
    // 초기화 영역
    var i = 0;

    function increase() {
        i++;
    }

    function get() {
      return i;
    }

    // 외부에 노출할 함수들만 반환한다.
    return {
        increase: increase,
        get: get
    };
});
