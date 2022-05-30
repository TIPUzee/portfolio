
//////// Mouse Down Handler ////////
//////// Mouse Down Handler ////////
function mouseDownHandler(e)
{
	console.log('down');
	count++;
	e.preventDefault();
	if (waiting) 
	{
		return;
	}

	pressed = true;
	mouseX = e.screenX;
	slideHaveMovedX = 0;

	// custom
	slider.style.transition = 'none';
	carousel.style.cursor = 'grabbing';
}

function touchStartHandler(e)
{
	count++;
	e.preventDefault();
	if (waiting) 
	{
		return;
	}
	
	pressed = true;
	mouseX = e.touches[0].screenX;
	slideHaveMovedX = 0;
	
	// custom
	slider.style.transition = 'none';
	carousel.style.cursor = 'grabbing';
}


//////// Mouse Up Handler ////////
//////// Mouse Up Handler ////////
function mouseUpHandler(e)
{
	if (!pressed)
	{
		return;
	}
	waiting = true;
	pressed = false;
	carousel.style.cursor = defaultCursor;

	if (Math.abs(slideHaveMovedX) > 150)
	{
		var sliderCurrPos = window.getComputedStyle(slider).left;
		sliderCurrPos = parseFloat(sliderCurrPos);

		var slideWidth = window.getComputedStyle(firstSlide).width;
		slideWidth = parseFloat(slideWidth);

		if (slideHaveMovedX > 150) 
		{ 
			for (let i = 0; i < totalMainSlides + 2 /* for Cloned */; i++)
			{
				if (sliderCurrPos > slideWidth * i * -1)
				{
					slider.style.transition = originalTransition;
					slider.style.left = `${slideWidth * i * -1}px`;
					sliderOldPos = slideWidth * i * -1;
					
					slides[currSlideNo].classList.remove('active');
					currSlideNo = i % 5;
					slides[currSlideNo].classList.add('active');

					indicators[currIndicator].classList.remove('active');
					currIndicator = (currIndicator + 1) % 3;
					indicators[currIndicator].classList.add('active');
	
					if (sliderOldPos == (slideWidth * (totalMainSlides + 1)) * -1)
					{
						setTimeout(() => 
						{
							slider.style.transition = "none";
							slider.style.left = `${slideWidth * -1}px`;
							sliderOldPos = slideWidth * i * -1;
							waiting = false;

							slides[currSlideNo].classList.remove('active');
							currSlideNo = 1;
							slides[currSlideNo].classList.add('active');
						}, 100);
					}
					else { waiting = false; }
					break;
				}
			}
				
		}
		else 
		{ 
			for (let i = -5 + 1; i <= 0; i++) 
			{
				if (sliderCurrPos < slideWidth * i)
				{
					slider.style.transition = originalTransition;
					slider.style.left = `${slideWidth * i}px`;
					sliderOldPos = slideWidth * i;
					
					slides[currSlideNo].classList.remove('active');
					currSlideNo = (i * -1) % 5;
					slides[currSlideNo].classList.add('active');

					indicators[currIndicator].classList.remove('active');
					currIndicator = currIndicator - 1;
					if (currIndicator < 0) { currIndicator = 2; }
					indicators[currIndicator].classList.add('active');

					if (sliderOldPos == 0)
					{
						setTimeout(()=> {
							slider.style.transition = "none";
							slider.style.left = `${slideWidth * totalMainSlides * -1}px`;
							sliderOldPos = slideWidth * totalMainSlides * -1;
							waiting = false;

							slides[currSlideNo].classList.remove('active');
							currSlideNo = 3;
							slides[currSlideNo].classList.add('active');
						}, 160);
					}
					else { waiting = false; }
					break;
				}
			}
	
		}
	}
	else if (slideHaveMovedX != 0)
	{
		slider.style.transition = originalTransition;
		slider.style.left = `${sliderOldPos}px`;
		waiting = false;
	}
	else 
	{
		waiting = false;
	}

	slideHaveMovedX = 0;
};

function touchEndHandler(e)
{
	if (!pressed)
	{
		return;
	}
	waiting = true;
	pressed = false;
	
	if (Math.abs(slideHaveMovedX) > 150)
	{
		var sliderCurrPos = window.getComputedStyle(slider).left;
		sliderCurrPos = parseFloat(sliderCurrPos);
		
		var slideWidth = window.getComputedStyle(firstSlide).width;
		slideWidth = parseFloat(slideWidth);
		
		if (slideHaveMovedX > 150) 
		{ 
			for (let i = 0; i < totalMainSlides + 2 /* for Cloned */; i++)
			{
				if (sliderCurrPos > slideWidth * i * -1)
				{
					slider.style.transition = originalTransition;
					slider.style.left = `${slideWidth * i * -1}px`;
					sliderOldPos = slideWidth * i * -1;
					
					slides[currSlideNo].classList.remove('active');
					currSlideNo = i % 5;
					slides[currSlideNo].classList.add('active');
					
					indicators[currIndicator].classList.remove('active');
					currIndicator = (currIndicator + 1) % 3;
					indicators[currIndicator].classList.add('active');
	
					if (sliderOldPos == (slideWidth * (totalMainSlides + 1)) * -1)
					{
						setTimeout(() => 
						{
							slider.style.transition = "none";
							slider.style.left = `${slideWidth * -1}px`;
							sliderOldPos = slideWidth * i * -1;
							waiting = false;

							slides[currSlideNo].classList.remove('active');
							currSlideNo = 1;
							slides[currSlideNo].classList.add('active');
						}, 100);
					}
					else { waiting = false; }
					break;
				}
			}
			
		}
		else 
		{ 
			for (let i = -5 + 1; i <= 0; i++) 
			{
				if (sliderCurrPos < slideWidth * i)
				{
					slider.style.transition = originalTransition;
					slider.style.left = `${slideWidth * i}px`;
					sliderOldPos = slideWidth * i;
					
					slides[currSlideNo].classList.remove('active');
					currSlideNo = (i * -1) % 5;
					slides[currSlideNo].classList.add('active');

					indicators[currIndicator].classList.remove('active');
					currIndicator = currIndicator - 1;
					if (currIndicator < 0) { currIndicator = 2; }
					indicators[currIndicator].classList.add('active');

					if (sliderOldPos == 0)
					{
						setTimeout(()=> {
							slider.style.transition = "none";
							slider.style.left = `${slideWidth * totalMainSlides * -1}px`;
							sliderOldPos = slideWidth * totalMainSlides * -1;
							waiting = false;

							slides[currSlideNo].classList.remove('active');
							currSlideNo = 3;
							slides[currSlideNo].classList.add('active');
						}, 160);
					}
					else { waiting = false; }
					break;
				}
			}
	
		}
	}
	else if (slideHaveMovedX != 0)
	{
		slider.style.transition = originalTransition;
		slider.style.left = `${sliderOldPos}px`;
		waiting = false;
	}
	else 
	{
		waiting = false;
	}

	slideHaveMovedX = 0;
};

//////// Mouse Move Handler ////////
// //////// Mouse Move Handler ////////
function mouseMoveHandler(e)
{
	if (waiting == true) { return; };
	if (!pressed) { return; };
	
	e.preventDefault();

	let dragX = mouseX - e.screenX;
	mouseX = e.screenX;
	
	let slideWidth = parseFloat(window.getComputedStyle(firstSlide).width);
	
	if (
		(parseFloat(window.getComputedStyle(slider).left) - dragX < (slideWidth * (totalMainSlides + 1)) * -1)
		|| (parseFloat(window.getComputedStyle(slider).left) - dragX > 0)
		)
		{
		return;
	}

	slider.style.left = `${parseFloat(window.getComputedStyle(slider).left) - dragX}px`;
	slideHaveMovedX += dragX;
};

function touchMoveHandler(e)
{
	if (waiting == true) { return; };
	if (!pressed) { return; };
	
	e.preventDefault();
	
	let dragX = mouseX - e.changedTouches[0].screenX;
	mouseX = e.changedTouches[0].screenX;
	
	let slideWidth = parseFloat(window.getComputedStyle(firstSlide).width);
	
	if (
		(parseFloat(window.getComputedStyle(slider).left) - dragX < (slideWidth * (totalMainSlides + 1)) * -1)
		|| (parseFloat(window.getComputedStyle(slider).left) - dragX > 0)
		)
	{
		return;
	}
	
	slider.style.left = `${parseFloat(window.getComputedStyle(slider).left) - dragX}px`;
	slideHaveMovedX += dragX;
};
	
	
	
	
	function moveToNextSlide() 
	{
		waiting = true;
		for (let i = 0; i < slides.length; i++)
	{
		slides[i].setAttribute('slide', (parseInt(slides[i].getAttribute('slide')) + 1) % 3);
	}
	
	indicators[currIndicator].classList.remove('active');
	currIndicator = (currIndicator + 1) % 3;
	indicators[currIndicator].classList.add('active');

	waiting = false;
}


function moveToPrevSlide() 
{
	waiting = true;
	for (let i = 0; i < slides.length; i++)
	{
		slides[i].setAttribute('slide', (parseInt(slides[i].getAttribute('slide')) + 2) % 3);
	}

	indicators[currIndicator].classList.remove('active');
	currIndicator = (currIndicator + 2) % 3;
	indicators[currIndicator].classList.add('active');
	
	waiting = false;
}



// //////////////////////////////////// //
// //////////////////////////////////// //
// //////////Carousel Slider/////////// //
// //////////////////////////////////// //
// //////////////////////////////////// //

////// indicator //////
////// indicator //////
////// indicator //////

function moveToSlide(number) 
{
	console.log('clicked');
	let slideNumbers = number;

	waiting = true;
	
	// forward
	slides[currSlideNo].setAttribute('slide', 0);
	for (let i = currSlideNo; i < slides.length; i++)
	{
		slides[i].setAttribute('slide', slideNumbers);
		slideNumbers = (slideNumbers + 1) % 3;
	}

	// backward
	slideNumbers = (number - 1);
	for (let i = currSlideNo - 1; i >= 0; i--) 
	{
		if (slideNumbers < 0) { slideNumbers = 2; }
		slides[i].setAttribute('slide', slideNumbers);
		slideNumbers--;
	}

	indicators[currIndicator].classList.remove('active');
	currIndicator = number;
	indicators[currIndicator].classList.add('active');
	
	waiting = false;
}
