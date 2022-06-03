
// //////////////////////////////////// //
// //////////////////////////////////// //
// /////////// menu toggler /////////// //
// //////////////////////////////////// //
// //////////////////////////////////// //

function addClass(evnt, targets)
{
	if (targets instanceof Array)
	{
		// pending
	}
	else 
	{
		targets.classList.toggle(evnt.target.getAttribute('addClass'));
		if (evnt.target.getAttribute('bodyOverFlow') == 'hidden')
		{
			if (document.body.style['overflow-y'] == 'auto')
			{
				document.body.style['overflow-y'] = 'hidden';
				console.log(true);
			}
			else 
			{
				console.log(false);
				document.body.style['overflow-y'] = 'auto';
			}
		}
	}
}