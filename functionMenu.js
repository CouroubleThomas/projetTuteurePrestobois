function setCheckBox1State()
{
	var checkBox = document.getElementById('cbox1');
	
	if(readCookie('state1') == "check")
	{
		checkBox.checked = true;
	}
	else
	{
		checkBox.checked = false;
	}	
}

function setCheckBox2State()
{
	var checkBox = document.getElementById('cbox2');
	
	if(readCookie('state2') == "check")
	{
		checkBox.checked = true;
	}
	else
	{
		checkBox.checked = false;
	}
}

function setCheckBox3State()
{
	var checkBox = document.getElementById('cbox3');
	
	if(readCookie('state3') == "check")
	{
		checkBox.checked = true;
	}
	else
	{
		checkBox.checked = false;
	}
}

function setCheckBoxState()
{
	
	setCheckBox1State();
	setCheckBox2State();
	setCheckBox3State();
}


function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
	////alert(name+"="+value+expires+";domain=puitgf.oxatis.com; path=/");
	
}

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

function eraseCookie(name) {
	createCookie(name,"",-1);
}

document.getElementById('cbox1').addEventListener('click', function () {
	var checkBox = document.getElementById('cbox1');
	if(checkBox.checked)
		{
			
			eraseCookie('state1');
			createCookie('state1','check',7);
			localStorage.setItem('state1','check');
		}
		else
		{
			
			eraseCookie('state1');
			createCookie('state1','uncheck',7);
			localStorage.setItem('state1','uncheck');
		}
		
});

document.getElementById('cbox2').addEventListener('click', function () {
	var checkBox = document.getElementById('cbox2');
	if(checkBox.checked)
		{
			
			eraseCookie('state2');
			createCookie('state2','check',7);
			localStorage.setItem('state2','check');
		}
		else
		{
			
			eraseCookie('state2');
			createCookie('state2','uncheck',7);
			localStorage.setItem('state2','uncheck');
		}
		
});

document.getElementById('cbox3').addEventListener('click', function () {
	var checkBox = document.getElementById('cbox3');
	if(checkBox.checked)
		{
			
			eraseCookie('state3');
			createCookie('state3','check',7);
			localStorage.setItem('state3','check');
		}
		else
		{
			
			eraseCookie('state3');
			createCookie('state3','uncheck',7);
			localStorage.setItem('state3','uncheck');
		}
});

setCheckBoxState();
