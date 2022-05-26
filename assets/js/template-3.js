

// auto move slides
var TimerID;
function auto_move_slide() 
{

	let carouselObjArray = document.querySelectorAll('.o-carousel-wrapper[data-o-auto-slide-move]');

	for (let i = 0; i < carouselObjArray.length; i++) 
	{
		let thisTimeLapse = carouselObjArray[i].getAttribute('data-o-auto-slide-move');
		let thisId = carouselObjArray[i].getAttribute('id');

		let slideArray = document.querySelectorAll('#' + thisId + ' .o-carousel-slide[data-o-belong-to-carousel="#' + thisId + '"]');
		var carousel_frame = document.querySelector('#' + thisId + ' .o-carousel-frame');
		let frame_width = window.getComputedStyle(carousel_frame).getPropertyValue('width');
		let slides_wrapper = document.querySelector('#' + thisId + ' .o-carousel-slide-wrapper');

		TimerID = setInterval(
			function() 
			{
				let slides_pos = window.getComputedStyle(slides_wrapper).getPropertyValue('left');

				if (-1 * parseFloat(slides_pos) < parseFloat(frame_width) * (slideArray.length - 1))
				{
					let newPos = parseFloat(slides_pos) - parseFloat(frame_width);
					let newPosString = 'left:' + newPos + 'px';
					slides_wrapper.style=newPosString; 
				}
				else {
					slides_wrapper.style='left:0'; 
				}
			}, 
			1000 * parseFloat(thisTimeLapse)
		);
	}
}

auto_move_slide();







function move_slide(caller) 
{
	clearInterval(TimerID);
	let carousel = caller.getAttribute('data-o-belong-to-carousel');
	let slide_number = caller.getAttribute('data-o-indicator-for-slide');

	var slides = document.querySelectorAll(carousel + ' .o-carousel-slide');
	var carousel_frame = document.querySelector(carousel + ' .o-carousel-frame');
	let frame_width = window.getComputedStyle(carousel_frame).getPropertyValue('width');
	let slides_wrapper = document.querySelector(carousel + ' .o-carousel-slide-wrapper');

	let left_position = parseFloat(frame_width) * parseInt(slide_number);
	let mystyle = 'left: -' + left_position + 'px';
	
	slides_wrapper.style=mystyle;

	let indicators = document.querySelectorAll(carousel + " .o-carousel-indicator-item[data-o-belong-to-carousel='" + carousel + "'");
	for (let i = 0; i < indicators.length; i++) {
		indicators[i].classList.remove('active');
	}
	caller.classList.add('active');
	auto_move_slide();
}






function adjust_slides(caller, noOfSlides) 
{
	noOfSlides = parseInt(noOfSlides);
	
	// get calling carousel id
	var carouselId = caller.getAttribute('id');
	carouselId = '#' + carouselId;

	// get frame width	
	let frame = document.querySelector('.o-g-carousel-frame[data-o-g-element-of="' + carouselId + '"]');
	var frameWidth = window.getComputedStyle(frame).getPropertyValue('width');
	frameWidth = parseFloat(frameWidth);

	// get slides wrapper 
	let slidesWrapper = document.querySelector('.o-g-slide-wrapper[data-o-g-element-of="' + carouselId + '"]');

	// get gap between slides
	var slidesGap = window.getComputedStyle(slidesWrapper).getPropertyValue('column-gap');
	slidesGap = parseFloat(slidesGap);

	// get slides
	let slides = document.querySelectorAll('.o-g-slide[data-o-g-element-of="' + carouselId + '"]');
	
	// calculations
	let totalGapPerShow = (noOfSlides - 1) * slidesGap;
	let avaliableSpaceForSlides = frameWidth - totalGapPerShow;

	let computedSlideWidth = avaliableSpaceForSlides / noOfSlides;
	
	// set slides width
	for (let i = 0; i < slides.length; i++)
	{
		slides[i].style='width:' + computedSlideWidth + 'px';
	}
}

// call function to adjust slides width
var g_carousels = document.querySelectorAll('.o-g-carousel-wrapper[data-o-g-adjust-slides]');
for (let i = 0; i < g_carousels.length; i++) 
{
	let noOfSlides = g_carousels[i].getAttribute('data-o-g-adjust-slides');

	adjust_slides(g_carousels[i], noOfSlides);
}





function unactiveAllIndicators(indicators) 
{
	for (let i = 0; i < indicators.length; i++)
	{
		indicators[i].classList.remove('active');
	}
}


function active_indicator(carouselId, totalSlides, activeSlideNo) 
{
	// get indicators 
	let indicators = document.querySelectorAll('.o-g-indicator-item[data-o-g-element-of="' + carouselId + '"]');

	// number of indicators
	let noOfIndicators = indicators.length;

	// unactive All Indicators
	unactiveAllIndicators(indicators);
	
	// calculate indicator to be active
	let slidesRangePerIndicator = totalSlides / noOfIndicators;

	for (let i = 0, currIndicator = 0; i < totalSlides; i += slidesRangePerIndicator, currIndicator += 1) 
	{
		if (i <= activeSlideNo && i + slidesRangePerIndicator > activeSlideNo)
		{
			indicators[currIndicator].classList.add('active');
		}
	}
}





///////////////////////////////////////////////
///////////////////////////////////////////////
///////////// auto move slides ////////////////
///////////////////////////////////////////////
///////////////////////////////////////////////

let auto_move_slides_obj;

function g_auto_move_slide() 
{
	// call function to enable auto move
	var g_carousels = document.querySelectorAll('.o-g-carousel-wrapper[data-o-g-auto-move]');
	for (let i = 0; i < g_carousels.length; i++) 
	{

		let carouselObj = g_carousels[i];

		// get carousel Id 
		let carouselId = '#' + carouselObj.getAttribute('id');
		let intervalTimer = carouselObj.getAttribute('data-o-g-auto-move');

		// get slides wrapper
		let slidesWrapper = document.querySelector('.o-g-slide-wrapper[data-o-g-element-of="' + carouselId + '"]');

		// get all slides
		let slides = document.querySelectorAll('.o-g-slide[data-o-g-element-of="' + carouselId + '"]');

		// get slides widths
		let slidesWidth = [];
		for (let i = 0; i < slides.length; i++)
		{
			slidesWidth.push(parseFloat(window.getComputedStyle(slides[i]).getPropertyValue('width')));
		}

		// get column gap in slides wrapper
		let colGap = parseFloat(window.getComputedStyle(slidesWrapper).getPropertyValue('column-gap'));
		
		auto_move_slides_obj = setInterval(
			() => 
			{
				if (carouselObj.getAttribute('backend-o-g-currSlide'))
				{
					// get current slide 
					var currSlideNo = parseInt(carouselObj.getAttribute('backend-o-g-currSlide'));
					
					// get current left position
					let currPos = parseFloat(window.getComputedStyle(slidesWrapper).getPropertyValue('left'));
					
					// get no of slides per show
					let noOfSlidesPerShow = parseInt(carouselObj.getAttribute('data-o-g-adjust-slides'));
					
					// moving function
					// calculate move width
					let moveWidth;
					var newPos;
					if (currSlideNo == slides.length - 2) {
						newPos = 0;
						currSlideNo = 0;
					}
					else if (currSlideNo >= slides.length - noOfSlidesPerShow)
					{
						newPos = currPos;
						currSlideNo++;
					}
					else if (currSlideNo < slides.length - noOfSlidesPerShow)
					{
						moveWidth = slidesWidth[currSlideNo] + colGap;
						newPos = currPos - moveWidth;
						currSlideNo++;
					}
			
					// update position
					slidesWrapper.style='left:' + newPos + 'px';
			
					// update curr slide no
					carouselObj.setAttribute('backend-o-g-currSlide', currSlideNo);				

					// update active indicator
					active_indicator(carouselId, slides.length, currSlideNo);
				}
				else 
				{
					carouselObj.setAttribute('backend-o-g-currSlide', 0);
				}
			}, 
			1000 * parseFloat(intervalTimer)
		);
	}
}

g_auto_move_slide();




///////////////////////////////////////////////
///////////////////////////////////////////////
///// click event for slides indicator ////////
///////////////////////////////////////////////
///////////////////////////////////////////////

// get carousel wrapper
var carousels = document.querySelectorAll('.o-g-carousel-wrapper');

for (let i = 0; i < carousels.length; i++)
{
	addMoveSlideEventToIndicators(carousels[i]);
}

function addMoveSlideEventToIndicators(carouselObj)
{
	// indicator 
	let indicators = document.querySelectorAll('.o-g-indicator-item[data-o-g-element-of="#' + carouselObj.id + '"]');

	// get slides
	let slides = document.querySelectorAll('.o-g-slide[data-o-g-element-of="#' + carouselObj.id + '"]');

	// get slides wrapper
	let slidesWrapper = document.querySelector('.o-g-slide-wrapper[data-o-g-element-of="#' + carouselObj.id + '"]');

	// get slides widths
	let slidesWidth = [];
	for (let i = 0; i < slides.length; i++)
	{
		slidesWidth.push(parseFloat(window.getComputedStyle(slides[i]).getPropertyValue('width')));
	}

	// get column gap in slides wrapper
	let colGap = parseFloat(window.getComputedStyle(slidesWrapper).getPropertyValue('column-gap'));

	for (let i = 0; i < indicators.length; i++)
	{

	}
	// get slides for each indicator
	let slidesForOneIndicator = parseInt(slides.length / indicators.length);

	// sum of slides width of every slides for each indicator 
	var slidesWidthForEachIndicator = [];
	
	// calculations
	
	for (let i = 0; i < indicators.length && i < slides.length; i++)
	{
		// calculate moving width for each indicator
		slidesWidthForEachIndicator.push(0);
		// calculations
		for (let j = 0; j < slidesForOneIndicator; j++)
		{
			slidesWidthForEachIndicator[i] += slidesWidth[j + (i * slidesForOneIndicator)];
		}
		if (i != 0) 
		{
			slidesWidthForEachIndicator[i] += slidesWidthForEachIndicator[i - 1];
		}

		slidesWidthForEachIndicator[i] += (colGap * (slidesForOneIndicator));
		
		indicators[i].addEventListener('click', () => 
		{
			clearInterval(auto_move_slides_obj);
			
			unactiveAllIndicators(indicators);
			indicators[i].classList.add('active');

			if (i == 0) 
			{
				slidesWrapper.style='left:0';
				
				// update curr slide no
				carouselObj.setAttribute('backend-o-g-currSlide', 0);				
			}
			else 
			{
				slidesWrapper.style='left:-' + slidesWidthForEachIndicator[i - 1] + 'px';

				// update curr slide no
				carouselObj.setAttribute('backend-o-g-currSlide', slidesForOneIndicator * i);				
			}
			g_auto_move_slide(g_carousels);
		});
	}
}



///////////////////////////////////////////////
///////////////////////////////////////////////
//////////////// dropdown /////////////////////
///////////////////////////////////////////////
///////////////////////////////////////////////


let togglerBtns = document.querySelectorAll('[data-o-toggler-for]');

for (let i = 0; i < togglerBtns.length; i++) 
{
	let togglerFor = togglerBtns[i].getAttribute('data-o-toggler-for');
	if (togglerFor == 'next-uncle')
	{
		togglerBtns[i].addEventListener('click', () =>
		{
			let parent = togglerBtns[i].parentElement;
			let uncle = parent.nextElementSibling;
			
			uncle.classList.toggle('shown');
		});
	}
	else if (togglerFor == 'next-sibling') 
	{
		togglerBtns[i].addEventListener('click', () => 
		{
			let sibling = togglerBtns[i].nextElementSibling;
			
			sibling.classList.toggle('shown');
		})
	}
	else if (togglerFor == 'all-siblings')
	{
		togglerBtns[i].addEventListener('click', () =>
		{
			let parent = togglerBtns[i].parentElement;
			let siblingsCount = parent.childElementCount;

			let sibling = parent.firstElementChild;
			for (let siblingIt = 0; siblingIt < siblingsCount; siblingIt++, sibling = sibling.nextElementSibling)
			{
				if (sibling != togglerBtns[i]) 
				{
					sibling.classList.toggle('shown');
				}
			}
		})
	}
}
