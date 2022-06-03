////// custom //////
////// custom //////


////// mousedown event 
carousel.addEventListener('mousedown', mouseDownHandler);
carousel.addEventListener('mouseup', mouseUpHandler);
carousel.addEventListener('mousemove', mouseMoveHandler);
carousel.addEventListener('touchstart', touchStartHandler);
carousel.addEventListener('touchend', touchEndHandler);
carousel.addEventListener('touchmove', touchMoveHandler);








// //////////////////////////////////// //
// //////////////////////////////////// //
// /////////// menu toggler /////////// //
// //////////////////////////////////// //
// //////////////////////////////////// //

for (let i = 0; i < togglers.length; i++)
{
	if (togglers[i].getAttribute('addClass') != null)
	{
		togglers[i].addEventListener('click', (evnt) => 
		{
			addClass(evnt, togglersTargets[i]);
		});
	}
}
