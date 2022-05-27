////// custom //////
////// custom //////
function Log(str, element)
{
	console.log(str + ' : '+ element);
}

// //////////////////////////////////// //
// //////////////////////////////////// //
// //////////Carousel Slider/////////// //
// //////////////////////////////////// //
// //////////////////////////////////// //

////// touch slide //////
////// touch slide //////
let slider = document.querySelector('#carousel');
let slider2 = document.querySelector('#carousel #slider');
let mouseX = 0;
let mouseY = 0;
let pressed = false;
let moving = false;
let preventSliding = false;
////// mousedown event 
slider.addEventListener('mousedown', (e) =>
{
	e.preventDefault();
	pressed = true;
	mouseX = e.clientX;
	mouseY = e.clientY;
});
////// mouseup event
slider.addEventListener('mouseup', (e) => 
{
	pressed = false;
	moving = false;
	preventSliding = false;
})
////// mousemove event
slider.addEventListener('mousemove', (e) =>
{
	if (!pressed) { return; };
	if (preventSliding)
	{
		console.log('Prevention');
		return;
	}

	e.preventDefault();
	let dragX = mouseX - e.clientX;
	let dragY = mouseY - e.clientY;

	if (Math.abs(dragY) > Math.abs(dragX) && !moving) 
	{
		console.log('Prevention Starts');
		preventSliding = true;
		return; 
	}
	moving = true;
	mouseX = e.clientX;
	console.log(dragX);

	slider2.style.left = `${parseFloat(window.getComputedStyle(slider2).left) - dragX}px`;
});