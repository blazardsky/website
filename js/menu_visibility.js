function toggleMenu(){
	toggleVisibility('menu');
	var MENU_BTN = document.getElementById("toggle-menu");	
	if (MENU_BTN.src.match(/open/) != null) { 
		MENU_BTN.src.replace('open','close'); 
	} else { MENU_BTN.src.replace('close','open'); };
}

function toggleVisibility(primary,secondary){
	secondary = secondary || 0;
	document.getElementById(primary).classList.toggle('d-none');
	if (secondary != 0) { document.getElementById(secondary).classList.toggle('d-none'); }
}