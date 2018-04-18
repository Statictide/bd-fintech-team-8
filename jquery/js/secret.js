$(document).ready(function() {
    secret.init();
});

var secret = (function(){
    "use strict";
    var secret;
    var inputsequence;

    var _init = function(){
		secret = [66,65,78,75,68,65,84,65];
        inputsequence = [];
        bindListeners();
    };
    
    var bindListeners = function(){
        $(document).on('keydown', function(event) {
            if (event.keyCode) {
                inputsequence.push(event.keyCode);
          
                if (inputsequence.length > secret.length) {
                  inputsequence.shift();
                }
          
                if (isFound()) {
                    service.secret(function(response){
                        alert('Cæsar siger: ' + response['response']);
                    });
                }
            }
            
        });
    };
    
    
    var isFound = function() {
        if(secret.length != inputsequence.length){
          return false;
        }
        return secret.every((element, index) => element === inputsequence[index]);
    }

    //public functions
	return {
		init : _init
	}
}());