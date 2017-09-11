document.addEventListener("DOMContentLoaded", function() {

	validateForms();
	Slider();
	scrollAnimations();
	masktel();
	// new Formatter(document.getElementById('birth'), {
	//   'pattern': '{{99}}/{{99}}/{{9999}}'
	// });

});

function scrollAnimations(){
	inView.offset({
		top: 0,
		bottom: 100,
	});
	inView('.anim-cont')
		.on('enter', function(el){
			el.classList.add('active');
		});
}
function masktel(){
	var naame = document.getElementById("nameInp");
	var nam = new Inputmask({ 
		showMaskOnHover: false,
		showMaskOnFocus: false,
		regex: '^[а-яёА-ЯЁ]+ [а-яёА-ЯЁ]+ [а-яёА-ЯЁ]+$',
		// onKeyDown: function(event, buffer, caretPos, opts){

		// }
		// onKeyDown: function (event, buffer, caretPos, opts) {
		// 	console.log(event, buffer, caretPos, opts)
		// 	// if (key >= 48 && key <= 57){
		// 	// 	return false
		// 	// }

	 //    }
	});

	nam.mask(naame);
	var nodes = document.getElementById("birth");
	var im = new Inputmask({ 
		showMaskOnHover: false,
		alias: "date",
		"placeholder": "ДД/ММ/ГГГГ",
		yearrange: {
			minyear: 1900, 
			maxyear: (new Date()).getFullYear() - 15
		}
	});
	im.mask(nodes);
	var birth = document.getElementById("telInp");
	var bi = new Inputmask("+375 (99) 999 99 99",{ 
		showMaskOnHover: false,
	});
	bi.mask(birth);
}
function validateForms() {
	var form_form = $('.js-validate');
	if (form_form.length) {
		form_form.each(function() {
			var form_this = $(this);
			$.validate({
				form: form_this,
				borderColorOnError: true,
				scrollToTopOnError: false,
				onSuccess: function($form) {
					form_this[0].reset();
					form_this.addClass('complete');
					setTimeout(function(){
						form_this.removeClass('complete');
					},1500);
					return false
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