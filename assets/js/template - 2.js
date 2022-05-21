function pageLoaded() {
	console.log('fn call - pageLoaded()');
	document.getElementById('under-construction').style.display="none";
}

let sidenav_menubar_opened = false;

function sidenav_menu_toggle() {
	document.querySelector('#sidenav #menubar').classList.toggle('show');
	let menubar = document.querySelectorAll('#sidenav #menubar .doc-nav-item');
	if (sidenav_menubar_opened == false) {
		for (let i = 0; i < menubar.length; i++) {
			menubar[i].style='transform: translateX(0); opacity: 1';
		}
		sidenav_menubar_opened = true;
	} else {
		for (let i = 0; i < menubar.length; i++) {
			menubar[i].style='transform: translateX(-20px); opacity: 0';
		}
		sidenav_menubar_opened = false;
	}
}