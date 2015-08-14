var uuid = require('short-id')
var getCSS = function(el, prop){
	var propValue = document.defaultView.getComputedStyle(el).getPropertyValue(prop)
	if(!propValue) throw new Error("No prop valueValue. Is the element appended to the document yet?")
	if(!propValue) return false
	return (parseInt(propValue) || 0)
};

module.exports = function(children, direction){
	
	var players = Array.prototype.map.call(stage.children, function(player,i){
		if(!player.id.length) player.id = uuid.generate();
		player.uxer = {};
		player.uxer.width = getCSS(player, 'width')//.primitive.val
		player.uxer.height = getCSS(player, 'height')//.primitive.val
		return player
	});
	
	var total = 0
	var property = direction.toLowerCase() == 'left' ? 'width' : 'height'
	
	players.forEach(function(player, i){
		var left = players[i-1] ? players[i-1].uxer[property] : 0;
		total += left;
		player.uxer[direction] = total;
		player.style[direction] = total + 'px';
	})
	
	return players
	
}