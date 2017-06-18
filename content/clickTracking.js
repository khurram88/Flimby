var click_id=null;
function __covu_recordMouseClick(event,apiUrl,page_url)
{
	var selector;

	if (event.target.id && event.target.id != "")
	{
	    selector = event.target.id;
	}
	else
	{
	    selector = __covu_generateElementSelector(event.target);
	}

	jQuery.getJSON(apiUrl+ "&selector="+ selector+"&url="+escape(page_url), 
	function(data) {
		elements=selector.split(">");
					
		if(elements.length==1)
		{
			animateDiv("#"+elements[0]);
		//	$("#"+elements[0]).effect("highlight", {color:"#F57E20"}, 3000);
		}
		else
		{
			var div=__covu_getDivClick(elements);
			animateDiv(div);
		}
	});

}

function __covu_getLeaderSessionEvents(apiUrl,page_url)
{
		jQuery.getJSON(apiUrl, function(data) 
		{	
			if(data.event!=null)
			{
					if(data.event.selector!=null)
					{
					if(escape(data.event.url)==escape(page_url) && click_id!=data.event.id)
					{
						click_id=data.event.id;
						var elements=data.event.selector;
						elements=elements.split(">");
						
						if(elements.length==1)
						{


							//$("#"+elements[0]).css("border","3px solid red");

							scrollToDiv("#"+elements[0]);
							//	$('html,body').animate({scrollTop: $("#"+elements[0]).offset().top}, 1000, function() 
							//	{
							//	});

							animateDiv("#"+elements[0]);
							//$("#"+elements[0]).effect("highlight", {color:"#F57E20"}, 3000);
						}
						else
						{
							var div=__covu_getDivClick(elements);
							scrollToDiv(div);
							animateDiv(div);
						}
					}
				}
			}
		});
}
function scrollToDiv(div)
{
	try
	{
		$('html,body').animate({scrollTop: $(div).offset().top}, 1000, function() 
		{
		});
	}
	
	catch(e)
	{
	}
}
function animateDiv(div)
{
	$(div).effect("highlight", {color:"#F57E20"}, 3000);
	//$(div).click();
}
function __covu_generateElementSelector(e)
{
	var parentTag = "";
	var childIndex = "";
	var h = "";
	var index = 0;
	
	if( e.parentNode )
	{
		if( e.parentNode.tagName != "HTML" )
		{
		    h = __covu_generateElementSelector(e.parentNode);
		}
		
		parentTag = e.parentNode.tagName;
		
		for(var i = 0; i < e.parentNode.childNodes.length; i++)
		{
			if( e.parentNode.childNodes[i].tagName == e.tagName )
			{
				index = index + 1;
			}
				
			if( e.parentNode.childNodes[i] == e )
			{
				childIndex = index;
				break;
			}
		}
		
		if( e.tagName == "BODY" )
		{
			return e.tagName;
		}
		else
		{
			return h + ">" + childIndex + ":" + e.tagName;
		}
	}
	
	return "";
}
function __covu_getDivClick(elements)
{
	var elem=$(elements[0]).get(0);
	
	for(var i=1;i<elements.length;i++)
	{	
		var record=elements[i].split(":");
	
		if(record.length>1)
		{
			elem=$(elem).children(record[1])[record[0]-1];
		}
		else
		{
			elem=$(elem).children(record[1])[0];
		}

	}
	return elem;
}
