var show = require('./')
var prev = document.getElementById('prev')
var next = document.getElementById('next')

var slider = show('stage', 'left', 0)
next.addEventListener('click', slider.next)
prev.addEventListener('click', slider.prev)
var index = parseInt(window.location.pathname.split(/[/.]+/)[2])
slider.goTo(index)
