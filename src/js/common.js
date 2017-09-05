document.addEventListener("DOMContentLoaded", function() {

	validateForms();
	Slider();
});



function validateForms() {
	var form_form = $('.js-validate');
	if (form_form.length) {
		form_form.each(function() {
			var form_this = $(this);
			$.validate({
				form: form_this,
				modules: 'logic',
				borderColorOnError: true,
				scrollToTopOnError: false,
				onSuccess: function($form) {
				},
			});
		});
	}
}
function Slider(){
	var trg = $('.js-slider');
	if(trg.length){
		var carouselStatus = document.querySelector('.carousel-status');
		setTimeout(function(){
		trg.each(function(){
			var _ = $(this);
			_.flickity({
				imagesLoaded: true,
				percentPosition: true,
				cellSelector: '.slider-element',
				accessibility: true,
				pageDots: false,
				setGallerySize: false,
				initialIndex: 0,
				autoPlay: 6500,
				pauseAutoPlayOnHover: false,
				arrowShape: { 
				  x0: 10,
				  x1: 60, y1: 50,
				  x2: 65, y2: 45,
				  x3: 20
				}
			});
			_.flickity('stopPlayer');
			var imgs = _.find('.slider-element .slider-element-inner');
			// get transform property
			var docStyle = document.documentElement.style;
			var transformProp = typeof docStyle.transform == 'string' ?
				'transform' : 'WebkitTransform';
			// get Flickity instance
			var flkty = _.data('flickity');

			_.on( 'scroll.flickity', function() {
				flkty.slides.forEach( function( slide, i ) {
				var img = imgs[i];
				var x = ( slide.target + flkty.x ) * -1/3;
				img.style[ transformProp ] = 'translateX(' + x  + 'px)';
				// img.style[ transformProp ] = 'translateX(' + x  + 'px)';
				});
			});
			var btns = _.find('.flickity-prev-next-button');
			btns.detach().appendTo($('.slider-counter'));

			function updateStatus() {
			  var slideNumber = flkty.selectedIndex + 1;
			  carouselStatus.textContent = slideNumber + '/' + flkty.slides.length;
			}
			updateStatus();
			flkty.on( 'select', updateStatus );
		});
	},100);
	}
}