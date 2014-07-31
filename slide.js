$(function() {
	var slides = $('.slider ul').children().length;
	var slide_width = $('.slider').width();
	var min = 0;
	var max = -((slides - 1) * slide_width);
	
	$('.slider ul').width(slides*slide_width).draggable({
		axis: 'x',
		drag: function(even, ui) {
			if(ui.position.left > min)
				ui.position.left = min;
			if(ui.position.left < max)
				ui.position.left = max;
		}
	});
});			
