function sendUrl()
{
	chrome.extension.sendRequest({sendUrl: document.location.href});
}
function GetLeaderSessionEvents()
{
			chrome.extension.sendRequest({ msg: 'GetLeaderSessionLastClick' },function(response)
			{
				if(response.result!=false)
				{	
					__covu_getLeaderSessionEvents(response.result,response.page_url);
				}
			});
}
function onLoad()
{	
			//setInterval(GetLeaderSessionEvents, 7000);
			chrome.extension.sendRequest({ getOMLURL: document.location.protocol },function(response)
			{
				if(response.result!=false)
				{	
					var omlScript = document.createElement('script');
					omlScript.src = response.result;
					document.body.appendChild(omlScript);
				}				
			});

}
function onMouseDown(event)
{
	chrome.extension.sendRequest({ msg: 'getMouseClickUrl' },function(response)
	{
		if(response.result!=false)
		{	
			__covu_recordMouseClick(event,response.result,document.location.href);
		}
	});
}
window.addEventListener("load", function(e) { onLoad(e); }, false);
try {
    window.addEventListener('mousedown', onMouseDown, false);
}
catch (e) {
    alert(e);
}
sendUrl(); 