'use strict'

var setStage = require('./setStage');
var prefixer = require('./prefix');

module.exports = show

var offset = 0;
var prefix = prefixer().css;
var currentIndex = 0;

function show(title, direction){	
	var theatre = setStage(title, direction);
	var stage = theatre.stage;
	var players = theatre.players;
  var property = direction.toLowerCase() == 'left' ? 'width' : 'height';
  var t = direction.toLowerCase() == 'left' ? 'x' : 'y';
  var locked = false;
	
	return {goTo: centerPiece, next: next, prev: prev}

	function centerPiece(el){
/*		if(locked) return;
		locked = true;
		setTimeout(function(){
			locked = false;
		},667);
*/		if('string' == typeof el) el = doc.getElementById(el);
		else if(!(isNaN(el))) el = players[el];
 		if(!el) throw new Error('No element');

		show(title, direction, currentIndex);

    var set = (stage.uxer[property] / 2) - (el.uxer[property] / 2);
		var cue = (el.uxer[direction] + offset);
		var diff = set - cue + offset;
		var count = players.length;
		
		players.forEach(function(e, i){
			
			e.addEventListener('transitionend', function(e){
				count-=1;
				if(count===0) {
					locked = false;
			  }
				e.target.removeEventListener('transitionend', function(){});
			});

			if (e.id === el.id) {
			  if (e.classList){
			    e.classList.add('scene');					
			  }
			  else {
			    e.className = e.className + ' scene';
			  }
			  currentIndex = i;
			}
			
			else {
			  if (e.classList) {
			    e.classList.remove('scene');					
			  }
			  else {
			    var ci = e.className.search(new RegExp('scene'));
			    if (ci) {
						e.className = e.className.replace('scene', '');
					}
			  }
			}

			e.style[prefix+'transform'] = 'translate'+t+'('+ (diff) +'px)';
			e.style['transform'] = 'translate'+t+'('+ (diff) +'px)';
		});
		
		offset = diff;
				
		return currentIndex
	};
	
	function next(){
		var index = currentIndex + 1;
		if(index > players.length - 1) index = 0;
		centerPiece(index);
		return currentIndex = index;
	};
	
	function prev(){
		var index = currentIndex - 1;
		if(index < 0) index = players.length - 1;
		centerPiece(index);
		return currentIndex = index;
	};

};


/*
  Changing the index of a Player and resetting the stage should work for wraparounds
  and continuous scrolling.
*/