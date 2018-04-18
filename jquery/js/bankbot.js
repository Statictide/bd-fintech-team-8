$(document).ready(function() {
    bot.init();
});

var bot = (function(){
	"use strict";

	var annoyanceCounter;
    var annoyanceBurst = 3;

	var _init = function(){
        insertChatMessage("bot", "Hej, du snakker med Banky Bot");
        bindListeners();
    };
    
    //add click listeners
    var bindListeners = function(){
        $('#submit-btn').on('click', function(e) {
            sendMessage();
            return false;
        });
    };

    //send message to server and clear input field
    var sendMessage = function(){
        let clientmsg = $("#user-msg").val();
        if(clientmsg == '') {
            return false;
        } 
        $("#user-msg").val("");
        insertChatMessage("self", clientmsg);
        service.fetchBotIntent(clientmsg, function(response){
            let handledResponse = handleBotResponse(response);
            insertChatMessage("bot", handledResponse);
        });
        return false;
    };

    //insert chat message in UI
    var insertChatMessage = function(sender, message){
        let photo = '<div class="image ' + sender +'"></div>';
        let msg = '<p class="chat-message ' + sender + '">' + message + '</p>';
        let responseMsg = '<div class="chat">' + photo + msg + '</div>';
        $('#chat-window').append(responseMsg);
    };
    
    //handle server response
    var handleBotResponse = function(response){
        let limit = 0.7;
        let intent = null;
        response.forEach(element => {
            if(element.value < limit){
                limit = element.value;
                intent = element.label;
            }
        });
        let intentMsg;
        console.log(response);
        switch(intent){
            case "Budgetkonto":
                annoyanceCounter = 0;
                intentMsg = "Budgetkonto";
                break;
            case "Overblik":
                annoyanceCounter = 0;
                intentMsg = "Overblik";
                break;
            case "Hilsen":
                annoyanceCounter++;
                intentMsg = welcomeMessage();
                break;
            default:
                intentMsg = "Den besked forstod jeg desværre ikke.";
                break;
        }
        return intentMsg;
    };
    
    //return random greeting
    var welcomeMessage = function(){
        let responseList = [];
        responseList.push("Hej med dig, hvad leder du efter?");
        responseList.push("Hej, hvordan kan jeg hjælpe?");
        responseList.push("Øh hejsa du");
        responseList.push("Hej, hvad leder du efter?");
        if(annoyanceCounter >= annoyanceBurst){
            return "Hvad vil du mig?!";
        }
        let idx = Math.floor(Math.random() * responseList.length);
        return responseList[idx];
    };

	//public functions
	return {
		init : _init
	}
})();