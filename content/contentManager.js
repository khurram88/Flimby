
	var wstrHTMLCopy; 
	
	function contentView(doc)
	{

		
	//	if(trayStarted)
		//	return;
		BACKGROUND.search_from_home=false;
		var blast = doc.getElementsByTagName("blast");
		BACKGROUND.localblasts = doc.getElementsByTagName("blast");
		
		wstrHTML="";
		var blast_length=0;
		if(BACKGROUND.blast_limit==30 && blast.length>=30)
		{
			blast_length=30;
		}
		else
		{
			blast_length=blast.length;
		}
		wstrHTML="<div style='position:absolute; width: 93.5%; height:1px; margin-top: 5px; marign-button: 2px; margin-left: 8px;  border-top: solid 1px rgb(200, 200, 200);'></div>";
		wstrHTML+="<div style='height: 1px; margin-top: 5px; ' ></div>"
		for(var i = 0; i < blast_length; i++)
		{
			var covu_id="";
			var has_avatar="";
			var profile_image_url="";
			var blastDate="";
			var currentDate="";
			var type="";
			var blast_id="";
			var replies="";
			
			try{
			
				covu_id = blast[i].getElementsByTagName("from_covu_id")[0].childNodes[0].nodeValue;
				has_avatar=blast[i].getElementsByTagName("from_covu_id")[0].getAttribute('has_avatar');
				profile_image_url="";
				if(has_avatar=="true")
				{
					profile_image_url=BACKGROUND.member_images+"/thumb_"+covu_id+".png";

				}
				else
				{
					profile_image_url= BACKGROUND.default_image+"/"+"avatar.png";
				}
				
				date = blast[i].getElementsByTagName("created_at")[0].childNodes[0].nodeValue;
				blastDate = new Date(date);
				currentDate= new Date();
				date=timeDifference(currentDate,blastDate);		
				updated_at = blast[i].getElementsByTagName("updated_at")[0].childNodes[0].nodeValue;
				updated_at=new Date(updated_at);
				var classHighlight="nan";
				
				if(updated_at.getTime()>BACKGROUND.prev_update_time.getTime() && BACKGROUND.search_id=="")
				{
					classHighlight="classHighlight";
				}
	
				type = blast[i].getElementsByTagName("type")[0].childNodes[0].nodeValue;
				session = blast[i].getElementsByTagName("live_session")[0];
				if(session)
				{
					 key=session.getElementsByTagName("key")[0].childNodes[0].nodeValue;
					 type="session";
				}

				blast_id = blast[i].getElementsByTagName("blast_id")[0].childNodes[0].nodeValue;
				replies = blast[i].getElementsByTagName("replies")[0].childNodes[0].nodeValue;
				if(replies=="1")
					replies+=" comment";
				else
					replies+=" comments";				
			}
			catch(e)
			{
			}
			
			var content=".";
			try{
				content = blast[i].getElementsByTagName("content")[0].childNodes[0].nodeValue;
				
				content=decodeData(content);
				content = linkify(content);
				content= content.replace(/\n/g, "<br />");
			}
			catch(e){
				content=".";
			}
			var recipeint_list="";
			try{
			
				recipients=blast[i].getElementsByTagName("covu_id");
				for(var x=0;x<recipients.length;x++)
				{
					if(x==0)
						recipeint_list+=recipients[x].childNodes[0].nodeValue;
					else
						recipeint_list+=","+recipients[x].childNodes[0].nodeValue;	
				
				}
			}
			catch(e){
			recipeint_list="";
			}
				
					switch(type)
					{
						case "link":
							var notes=".";
							var title=".";
							try{
							
								notes = blast[i].getElementsByTagName("memo")[0].childNodes[0].nodeValue;
								
								notes=decodeData(notes);
								notes = linkify(notes);
								notes= notes.replace(/\n/g, "<br />");
								
							}
							catch(e)
							{
								notes=".";
							}
							try{
								title = decodeData(blast[i].getElementsByTagName("title")[0].childNodes[0].nodeValue);
							}
							catch(e)
							{
								title=".";
							}
							wstrHTML += "<div name="+classHighlight+" id='items_content"+i+"' class=\"blasts\" setidblast="+blast_id+" blastType='link' covuID="+covu_id+">";
							
								if(document.getElementById(blast_id))
								{
									var target = document.getElementById(blast_id);
									var wrap = document.createElement('div');
									wrap.appendChild(target.cloneNode(true));		
									wstrHTML +="<div id='link_div'>";
									wstrHTML +="<img src='"+profile_image_url+"' class='blast_profile_image' id='Blast_img'/><div class=\"blast_text \" ><a href='#'><span id='Linkreciepient_span' class='blast_covu_id' title='"+recipeint_list+"' style='width:224px;'>" + covu_id + "<font size='1px;'>  :  "+recipeint_list + "</font></span></a><span id='message_span"+i+"' class=\"blast_content\" ><div id='div_span"+ i +"' class=\"blast_span\">" + notes + "</div></span><br/></div>"+wrap.innerHTML;
									wstrHTML +="<a href=\"#\" id='BookmarkTab' class=\"attachment\" style='margin-top: -11px;' title=\""+ blast[i].getElementsByTagName('content')[0].childNodes[0].nodeValue + "\"><img src='img/stream_bookmark_icon.png' class='attachment_icon' /><span class=\"blast_link\">" + title + "</span></a>";
									wstrHTML +="<a id='Link_blast_text' href='#' class='blast_text' style='background: url() no-repeat 5px 5px;'><span style='position:absolute; font-size: 10px; color: #888; margin:-5px 0 0 177px;' id='replies'>" + replies + "</span><span style='font-size: 10px; color: #888; margin:-5px 0 0 80px;' id='LinkDate'>"+date+"</span><span style='height: 2px' id='Linkempty_span'></span></a>";
									wstrHTML +="</div>";
								}
								else
								{
									wstrHTML +="<div>";
									wstrHTML +="<img src='"+profile_image_url+"' class='blast_profile_image'/><div onclick='triggerSearchClick(\"" + blast_id + "\",true)' class=\"blast_text \" ><a href='#'><span class='blast_covu_id' title='"+recipeint_list+"' style='width:224px;'>" + covu_id + "<font size='1px;'>  :  "+recipeint_list + "</font></span></a><span id='message_span"+i+"' class=\"blast_content\" ><div id='div_span"+ i +"' class=\"blast_span\">" + notes + "</div></span><br/></div>"+createTray("",blast_id,covu_id);
									wstrHTML +="<a href=\"#\" id='BookmarkTab' class=\"attachment\"  style='margin-top: -11px;' title=\""+ blast[i].getElementsByTagName('content')[0].childNodes[0].nodeValue + "\"><img src='img/stream_bookmark_icon.png' class='attachment_icon' /><span class=\"blast_link\">" + title + "</span></a>";
									wstrHTML +="<a href='#' class='blast_text' style='background: url() no-repeat 5px 5px;'><span style='position:absolute; color: #888; font-size: 10px; margin:-5px 0 0 177px;' id='replies'>" + replies + "</span><span style='font-size: 10px; color: #888; margin:-5px 0 0 80px;' id='LinkDate'>"+date +"</span><span style='height: 2px' id='Linkempty_span'></span></a>";	
									wstrHTML +="</div>";
								}
							wstrHTML += "</div>";
							wstrHTMLCopy = wstrHTML;
								break;
						case "ppt":
							var notes=".";
							var title=".";
							try{
							
								notes = blast[i].getElementsByTagName("memo")[0].childNodes[0].nodeValue;
								
								notes=decodeData(notes);
								notes = linkify(notes);
								notes= notes.replace(/\n/g, "<br />");
							}
							catch(e)
							{
								notes=".";
							}
							try{
								title = decodeData(blast[i].getElementsByTagName("title")[0].childNodes[0].nodeValue);
							}
							catch(e)
							{
								title=".";
							}
							wstrHTML += "<div name="+classHighlight+" id='items_content"+i+"' class=\"blasts\">";
								if(document.getElementById(blast_id))
								{
									var target = document.getElementById(blast_id);
									var wrap = document.createElement('div');
									wrap.appendChild(target.cloneNode(true));
									wstrHTML +="<div>";
									wstrHTML +="<img src='"+profile_image_url+"' class='blast_profile_image' onclick='triggerSearchClick(\"" + blast_id + "\",true);'/><div onclick='triggerSearchClick(\"" + blast_id + "\",true)' class=\"blast_text \"  ><a href='#'><span class='blast_covu_id' title='"+recipeint_list+"' style='width:224px;'>" + covu_id + "<font size='1px;'>  :  "+recipeint_list + "</font></span></a><span id='message_span"+i+"' class=\"blast_content\" ><div id='div_span"+ i +"'style='margin-bottom:6px;'>" + notes + "</div></span></div>"+wrap.innerHTML;
									wstrHTML +="<a href=\"#\" onclick='triggerSearchClick(\"" + blast_id + "\")' class=\"attachment\" title=\""+ blast[i].getElementsByTagName('content')[0].childNodes[0].nodeValue + "\"><img src='img/stream_ppt_icon.png' class='attachment_icon' /><span class=\"blast_link\">" + title + "</span></a>";
									wstrHTML +="<a href='#' onclick='triggerSearchClick(\"" + blast_id + "\",true)' class='blast_text' style='background: url() no-repeat 5px 5px;'><span style='position:absolute; font-size: 10px; color: #888; margin:-5px 0 0 177px;'>" + replies + "</span><span style='font-size: 10px; color: #888; margin:-5px 0 0 80px;'>"+date+"</span><span style='height: 2px'></span></a>";
									wstrHTML +="</div>";
								}
								else
								{
									wstrHTML +="<div>";
									wstrHTML +="<img src='"+profile_image_url+"' class='blast_profile_image' onclick='triggerSearchClick(\"" + blast_id + "\",true);'/><div onclick='triggerSearchClick(\"" + blast_id + "\",true)' class=\"blast_text \"  ><a href='#'><span class='blast_covu_id' title='"+recipeint_list+"' style='width:224px;'>" + covu_id + "<font size='1px;'>  :  "+recipeint_list + "</font></span></a><span id='message_span"+i+"' class=\"blast_content\"><div id='div_span"+ i +"'style='margin-bottom:6px;'>" + notes + "</div></span></div>"+createTray("",blast_id,covu_id);
									wstrHTML +="<a href=\"#\" onclick='triggerSearchClick(\"" + blast_id + "\")' class=\"attachment\" title=\""+ blast[i].getElementsByTagName('content')[0].childNodes[0].nodeValue + "\"><img src='img/stream_ppt_icon.png' class='attachment_icon' /><span class=\"blast_link\">" + title + "</span></a>";
									wstrHTML +="<a href='#' onclick='triggerSearchClick(\"" + blast_id + "\",true)' class='blast_text' style='background: url() no-repeat 5px 5px;'><span style='position:absolute; font-size: 10px; color: #888; margin:-5px 0 0 177px;'>" + replies + "</span><span style='font-size: 10px; color: #888; margin:-5px 0 0 80px;'>"+date +"</span><span style='height: 2px'></span></a>";	
									wstrHTML +="</div>";
								}
							wstrHTML += "</div>";
								break;

						case "session":
								var notes=".";
								var name=".";
								try{
									if(blast[i].getElementsByTagName("type")[0].childNodes[0].nodeValue=="message")
									{
										notes = content;
									}
									else
									{
										notes = blast[i].getElementsByTagName("memo")[0].childNodes[0].nodeValue;
										notes=decodeData(notes);
										notes = linkify(notes);
										notes= notes.replace(/\n/g, "<br />");

									}
									
								}
								catch(e)
								{
									notes=".";
								}
								try{
									name = decodeData(blast[i].getElementsByTagName("title")[0].childNodes[0].nodeValue);
								}
								catch(e)
								{
									name=".";
								}
					try{
							if(session.getElementsByTagName("active")[0].childNodes[0].nodeValue =="true") 
							{
								wstrHTML += "<div name="+classHighlight+" id='items_content"+i+"' class=\"blasts\" setidblast="+blast_id+" blastType='session' covuID="+covu_id+">";

								if(document.getElementById(blast_id))
								{
									var target = document.getElementById(blast_id);
									var wrap = document.createElement('div');
									wrap.appendChild(target.cloneNode(true));
									wstrHTML +="<div>";
									wstrHTML +="<img src='"+profile_image_url+"' class='blast_profile_image' /><div  class=\"blast_text\"  ><a href='#'><span class='blast_covu_id' title='"+recipeint_list+"' style='width:224px;'>" + covu_id +"<font size='1px;'>  :  "+recipeint_list + "</font></span></a><span id='message_span"+i+"' class=\"blast_content\"><div id='div_span"+ i +"' style=''>" + notes+ "</div></span><br/></div>"+wrap.innerHTML;
									wstrHTML +="<a href=\"#\" id='BookmarkTab' class=\"attachment\"  style='margin-top: -11px;'  ><img src='img/stream_live_icon.png' class='attachment_icon' /><span class=\"blast_link\">" +name + "</span></a>";
									wstrHTML +="<a href='#' class='blast_text' style='background: url() no-repeat 5px 5px;'><span style='position:absolute; font-size: 10px; color: #888; margin:-5px 0 0 177px;'>" + replies + "</span><span style='font-size: 10px; color: #888; margin:-5px 0 0 80px;'>"+ date+"</span><span style='height: 2px'></span></a>";	
									wstrHTML +="</div>";
								}
								else
								{
									wstrHTML +="<div>";
									wstrHTML +="<img src='"+profile_image_url+"' class='blast_profile_image' /><div  class=\"blast_text\"   ><a href='#'><span class='blast_covu_id' title='"+recipeint_list+"' style='width:224px;'>" + covu_id +"<font size='1px;'>  :  "+recipeint_list + "</font></span></a><span id='message_span"+i+"' class=\"blast_content\"><div id='div_span"+ i +"' style=''>" + notes+ "</div></span><br/></div>"+createTray("",blast_id,covu_id,type);
									wstrHTML +="<a href=\"#\" class=\"attachment\"  style='margin-top: -11px;'  ><img src='img/stream_live_icon.png' class='attachment_icon' /><span class=\"blast_link\">" +name + "</span></a>";
									wstrHTML +="<a href='#'  class='blast_text' style='background: url() no-repeat 5px 5px;'><span style='position:absolute; font-size: 10px; color: #888; margin:-5px 0 0 177px;'>" + replies + "</span><span style='font-size: 10px; color: #888; margin: -5px 0 0 80px;'>"+date +"</span><span style='height: 2px'></span></a>";
									wstrHTML +="</div>";
								}
								wstrHTML += "</div>";
								wstrHTMLCopy = wstrHTML;
							}
						
							else{
								}
								}
						catch(e)
						{
						}
							break;
						case "message":
								wstrHTML += "<div name="+classHighlight+" id='items_content"+i+"' setidblast="+blast_id+" class=\"blasts\" blastType='message' covuID="+covu_id+">";

								if(document.getElementById(blast_id))
								{
									var target = document.getElementById(blast_id);
									var wrap = document.createElement('div');
									wrap.appendChild(target.cloneNode(true));
									wstrHTML += "<div id='message_div'><img src='"+profile_image_url+"' class='blast_profile_image' id='Blast_img'/><div id='blast_div' class=\"blast_text\" ><a href='#'><span class='blast_covu_id' id='reciepient_span' title='"+recipeint_list+"' style='width:224px;'>"+ covu_id +"<font size='1px;'>  :  "+recipeint_list + "</font> </span></a><span id='message_span"+i+"' class=\"blast_content\" ><div class=\"extraClass\" id='div_span"+ i +"'>" + content + "</div></span><span id='replies' style=' float:right;  font-size: 10px; color: #888; margin:5px 34px 3px auto;'>" + replies + "</span><span style='position:relative; font-size: 10px; color: #888; margin-top:4px; margin-left: 80px; float:left;' id='date_span'>"+date +"</span><span style='height: 2px' id='empty'></span></div>"+wrap.innerHTML+"</div>";
								}
								else
									wstrHTML += "<div id='message_div'><img src='"+profile_image_url+"' class='blast_profile_image' id='Blast_img'/><div id='blast_div' class=\"blast_text\"  ><a href='#'><span class='blast_covu_id' title='"+recipeint_list+"' id='reciepient_span' style='width:224px;'>"+ covu_id +"<font size='1px;'>  :  "+recipeint_list + "</font> </span></a><span id='message_span"+i+"' class=\"blast_content\" '><div id='div_span"+ i +"' class=\"extraClass\" >" + content + "</div></span><span id='replies'  style='float:right; font-size: 10px; color: #888; margin:5px 34px 3px auto;'>" +  replies + "</span><span style='position:relative; font-size: 10px; color: #888; margin-top:4px; margin-left:  80px; float:left;' id='date_span'>"+ date +"</span><span style='height: 2px' id='empty'></span></div>"+createTray("",blast_id,covu_id)+"</div>";//+"<div><br/><br/><br/><span style='float: right; color: #9F9F9F;   font-family: arial; font-size: 14px;'><b>"+replies+" replies </b></span></div></div>";
									
						
								wstrHTML += "</div>";
								wstrHTMLCopy = wstrHTML;								
								break;
						default: 
					}
		}
		if(blast_length)
		{
			wstrHTML += "<div id='dummy_search' />";
			document.getElementById("searchListingContainer").innerHTML=wstrHTML;			
			$('div[name="classHighlight"]').effect("highlight", {color:"#AAD4FF"}, 3000);
		}
		else
		{
			elem=id('stream_loader');
			if(elem)
			{
				elem.style.display='none';
			}
		}

		BACKGROUND.setBlastUpdateTime(true);
		//onLeadContainerResize2();
		startFollow();
		hide_show_expand_button(blast_length);
		
		
		setTimeout(function(){
			var targeted = document.getElementsByClassName("blasts");
				for(var j=0; j<targeted.length; j++)
				{
					var target_item = targeted.item(j)
					//alert("items_content"+j);
					//break;
					//createTray("",blast_id,covu_id);
					if(document.getElementById("BookmarkTab"))
					{
						document.getElementById("BookmarkTab").addEventListener('click',joinSession ,false);	
					}
					
					target_item.addEventListener('click',getID ,false);
					
					//alert(blast_id);
				}
				
			},0)
	
	}
	
	
	function getLocallyblast(search_value)
	{
		
		BACKGROUND.searchblastfromFooter=false;
		
	//	if(trayStarted)
		//	return;
		var localblasts = BACKGROUND.localblasts;
		
		var counter=false;
		wstrHTML="";
		var blast_length=0;
		if(BACKGROUND.blast_limit==30 && localblasts.length>=30)
		{
			blast_length=30;
		}
		else
		{
			blast_length=localblasts.length;
		}
		
		wstrHTML="<div style='position:absolute; width: 93.5%; height:1px; margin-top: 5px; marign-button: 2px; margin-left: 8px;  border-top: solid 1px rgb(200, 200, 200);'></div>";
		wstrHTML+="<div style='height: 1px; margin-top: 5px; ' ></div>"
		
		
		for(var i = 0; i < blast_length; i++)
		{
			var covu_id="";
			var has_avatar="";
			var profile_image_url="";
			var blastDate="";
			var currentDate="";
			var type="";
			var blast_id="";
			var replies="";
		
		covu_id = localblasts[i].getElementsByTagName("from_covu_id")[0].childNodes[0].nodeValue;
		content = localblasts[i].getElementsByTagName("content")[0].childNodes[0].nodeValue;
		var content_search = content.search(search_value)
		if(covu_id==search_value || content_search!=-1)
		{		
			
			
			counter=true;
			try
			{
			
				
				has_avatar=localblasts[i].getElementsByTagName("from_covu_id")[0].getAttribute('has_avatar');
				profile_image_url="";
				if(has_avatar=="true")
				{
					profile_image_url=BACKGROUND.member_images+"/thumb_"+covu_id+".png";

				}
				else
				{
					profile_image_url= BACKGROUND.default_image+"/"+"avatar.png";
				}
				
				date = localblasts[i].getElementsByTagName("created_at")[0].childNodes[0].nodeValue;
				blastDate = new Date(date);
				currentDate= new Date();
				date=timeDifference(currentDate,blastDate);		
				updated_at = localblasts[i].getElementsByTagName("updated_at")[0].childNodes[0].nodeValue;
				updated_at=new Date(updated_at);
				var classHighlight="nan";
				
				if(updated_at.getTime()>BACKGROUND.prev_update_time.getTime() && BACKGROUND.search_id=="")
				{
					classHighlight="classHighlight";
				}
	
				type = localblasts[i].getElementsByTagName("type")[0].childNodes[0].nodeValue;
				session = localblasts[i].getElementsByTagName("live_session")[0];
				if(session)
				{
					 key=session.getElementsByTagName("key")[0].childNodes[0].nodeValue;
					 type="session";
				}

				blast_id = localblasts[i].getElementsByTagName("blast_id")[0].childNodes[0].nodeValue;
				replies = localblasts[i].getElementsByTagName("replies")[0].childNodes[0].nodeValue;
				if(replies=="1")
					replies+=" comment";
				else
					replies+=" comments";				
			}
			catch(e)
			{
			}
			
			var content=".";
			try{
				content = localblasts[i].getElementsByTagName("content")[0].childNodes[0].nodeValue;
				
				content=decodeData(content);
				content = linkify(content);
				content= content.replace(/\n/g, "<br />");
			}
			catch(e){
				content=".";
			}
			var recipeint_list="";
			try{
			
				recipients=localblasts[i].getElementsByTagName("covu_id");
				for(var x=0;x<recipients.length;x++)
				{
					if(x==0)
						recipeint_list+=recipients[x].childNodes[0].nodeValue;
					else
						recipeint_list+=","+recipients[x].childNodes[0].nodeValue;	
				
				}
			}
			catch(e){
			recipeint_list="";
			}
				
					switch(type)
					{
						case "link":
							var notes=".";
							var title=".";
							try{
							
								notes = localblasts[i].getElementsByTagName("memo")[0].childNodes[0].nodeValue;
								
								notes=decodeData(notes);
								notes = linkify(notes);
								notes= notes.replace(/\n/g, "<br />");
								
							}
							catch(e)
							{
								notes=".";
							}
							try{
								title = decodeData(localblasts[i].getElementsByTagName("title")[0].childNodes[0].nodeValue);
							}
							catch(e)
							{
								title=".";
							}
							wstrHTML += "<div name="+classHighlight+" id='items_content"+i+"' class=\"blasts\" setidblast="+blast_id+" blastType='link' covuID="+covu_id+">";
							
								if(document.getElementById(blast_id))
								{
									var target = document.getElementById(blast_id);
									var wrap = document.createElement('div');
									wrap.appendChild(target.cloneNode(true));		
									wstrHTML +="<div id='link_div'>";
									wstrHTML +="<img src='"+profile_image_url+"' class='blast_profile_image' id='Blast_img'/><div class=\"blast_text \" ><a href='#'><span id='Linkreciepient_span' class='blast_covu_id' title='"+recipeint_list+"' style='width:224px;'>" + covu_id + "<font size='1px;'>  :  "+recipeint_list + "</font></span></a><span id='message_span"+i+"' class=\"blast_content\" ><div id='div_span"+ i +"' class=\"blast_span\">" + notes + "</div></span><br/></div>"+wrap.innerHTML;
									wstrHTML +="<a href=\"#\" id='BookmarkTab' class=\"attachment\" style='margin-top: -11px;' title=\""+ localblasts[i].getElementsByTagName('content')[0].childNodes[0].nodeValue + "\"><img src='img/stream_bookmark_icon.png' class='attachment_icon' /><span class=\"blast_link\">" + title + "</span></a>";
									wstrHTML +="<a id='Link_blast_text' href='#' class='blast_text' style='background: url() no-repeat 5px 5px;'><span style='position:absolute; font-size: 10px; color: #888; margin:-5px 0 0 177px;' id='replies'>" + replies + "</span><span style='font-size: 10px; color: #888; margin:-5px 0 0 80px;' id='LinkDate'>"+date+"</span><span style='height: 2px' id='Linkempty_span'></span></a>";
									wstrHTML +="</div>";
								}
								else
								{
									wstrHTML +="<div>";
									wstrHTML +="<img src='"+profile_image_url+"' class='blast_profile_image'/><div onclick='triggerSearchClick(\"" + blast_id + "\",true)' class=\"blast_text \" ><a href='#'><span class='blast_covu_id' title='"+recipeint_list+"' style='width:224px;'>" + covu_id + "<font size='1px;'>  :  "+recipeint_list + "</font></span></a><span id='message_span"+i+"' class=\"blast_content\" ><div id='div_span"+ i +"' class=\"blast_span\">" + notes + "</div></span><br/></div>"+createTray("",blast_id,covu_id);
									wstrHTML +="<a href=\"#\" id='BookmarkTab' class=\"attachment\"  style='margin-top: -11px;' title=\""+ localblasts[i].getElementsByTagName('content')[0].childNodes[0].nodeValue + "\"><img src='img/stream_bookmark_icon.png' class='attachment_icon' /><span class=\"blast_link\">" + title + "</span></a>";
									wstrHTML +="<a href='#' class='blast_text' style='background: url() no-repeat 5px 5px;'><span style='position:absolute; color: #888; font-size: 10px; margin:-5px 0 0 177px;' id='replies'>" + replies + "</span><span style='font-size: 10px; color: #888; margin:-5px 0 0 80px;' id='LinkDate'>"+date +"</span><span style='height: 2px' id='Linkempty_span'></span></a>";	
									wstrHTML +="</div>";
								}
							wstrHTML += "</div>";
							wstrHTMLCopy = wstrHTML;
								break;
						case "ppt":
							var notes=".";
							var title=".";
							try{
							
								notes = localblasts[i].getElementsByTagName("memo")[0].childNodes[0].nodeValue;
								
								notes=decodeData(notes);
								notes = linkify(notes);
								notes= notes.replace(/\n/g, "<br />");
							}
							catch(e)
							{
								notes=".";
							}
							try{
								title = decodeData(localblasts[i].getElementsByTagName("title")[0].childNodes[0].nodeValue);
							}
							catch(e)
							{
								title=".";
							}
							wstrHTML += "<div name="+classHighlight+" id='items_content"+i+"' class=\"blasts\">";
								if(document.getElementById(blast_id))
								{
									var target = document.getElementById(blast_id);
									var wrap = document.createElement('div');
									wrap.appendChild(target.cloneNode(true));
									wstrHTML +="<div>";
									wstrHTML +="<img src='"+profile_image_url+"' class='blast_profile_image' onclick='triggerSearchClick(\"" + blast_id + "\",true);'/><div onclick='triggerSearchClick(\"" + blast_id + "\",true)' class=\"blast_text \"  ><a href='#'><span class='blast_covu_id' title='"+recipeint_list+"' style='width:224px;'>" + covu_id + "<font size='1px;'>  :  "+recipeint_list + "</font></span></a><span id='message_span"+i+"' class=\"blast_content\" ><div id='div_span"+ i +"'style='margin-bottom:6px;'>" + notes + "</div></span></div>"+wrap.innerHTML;
									wstrHTML +="<a href=\"#\" onclick='triggerSearchClick(\"" + blast_id + "\")' class=\"attachment\" title=\""+ localblasts[i].getElementsByTagName('content')[0].childNodes[0].nodeValue + "\"><img src='img/stream_ppt_icon.png' class='attachment_icon' /><span class=\"blast_link\">" + title + "</span></a>";
									wstrHTML +="<a href='#' onclick='triggerSearchClick(\"" + blast_id + "\",true)' class='blast_text' style='background: url() no-repeat 5px 5px;'><span style='position:absolute; font-size: 10px; color: #888; margin:-5px 0 0 177px;'>" + replies + "</span><span style='font-size: 10px; color: #888; margin:-5px 0 0 80px;'>"+date+"</span><span style='height: 2px'></span></a>";
									wstrHTML +="</div>";
								}
								else
								{
									wstrHTML +="<div>";
									wstrHTML +="<img src='"+profile_image_url+"' class='blast_profile_image' onclick='triggerSearchClick(\"" + blast_id + "\",true);'/><div onclick='triggerSearchClick(\"" + blast_id + "\",true)' class=\"blast_text \"  ><a href='#'><span class='blast_covu_id' title='"+recipeint_list+"' style='width:224px;'>" + covu_id + "<font size='1px;'>  :  "+recipeint_list + "</font></span></a><span id='message_span"+i+"' class=\"blast_content\"><div id='div_span"+ i +"'style='margin-bottom:6px;'>" + notes + "</div></span></div>"+createTray("",blast_id,covu_id);
									wstrHTML +="<a href=\"#\" onclick='triggerSearchClick(\"" + blast_id + "\")' class=\"attachment\" title=\""+ localblasts[i].getElementsByTagName('content')[0].childNodes[0].nodeValue + "\"><img src='img/stream_ppt_icon.png' class='attachment_icon' /><span class=\"blast_link\">" + title + "</span></a>";
									wstrHTML +="<a href='#' onclick='triggerSearchClick(\"" + blast_id + "\",true)' class='blast_text' style='background: url() no-repeat 5px 5px;'><span style='position:absolute; font-size: 10px; color: #888; margin:-5px 0 0 177px;'>" + replies + "</span><span style='font-size: 10px; color: #888; margin:-5px 0 0 80px;'>"+date +"</span><span style='height: 2px'></span></a>";	
									wstrHTML +="</div>";
								}
							wstrHTML += "</div>";
								break;

						case "session":
								var notes=".";
								var name=".";
								try{
									if(localblasts[i].getElementsByTagName("type")[0].childNodes[0].nodeValue=="message")
									{
										notes = content;
									}
									else
									{
										notes = localblasts[i].getElementsByTagName("memo")[0].childNodes[0].nodeValue;
										notes=decodeData(notes);
										notes = linkify(notes);
										notes= notes.replace(/\n/g, "<br />");

									}
									
								}
								catch(e)
								{
									notes=".";
								}
								try{
									name = decodeData(localblasts[i].getElementsByTagName("title")[0].childNodes[0].nodeValue);
								}
								catch(e)
								{
									name=".";
								}
					try{
							if(session.getElementsByTagName("active")[0].childNodes[0].nodeValue =="true") 
							{
								wstrHTML += "<div name="+classHighlight+" id='items_content"+i+"' class=\"blasts\" setidblast="+blast_id+" blastType='session' covuID="+covu_id+">";

								if(document.getElementById(blast_id))
								{
									var target = document.getElementById(blast_id);
									var wrap = document.createElement('div');
									wrap.appendChild(target.cloneNode(true));
									wstrHTML +="<div>";
									wstrHTML +="<img src='"+profile_image_url+"' class='blast_profile_image' /><div  class=\"blast_text\"  ><a href='#'><span class='blast_covu_id' title='"+recipeint_list+"' style='width:224px;'>" + covu_id +"<font size='1px;'>  :  "+recipeint_list + "</font></span></a><span id='message_span"+i+"' class=\"blast_content\"><div id='div_span"+ i +"' style=''>" + notes+ "</div></span><br/></div>"+wrap.innerHTML;
									wstrHTML +="<a href=\"#\" id='BookmarkTab' class=\"attachment\"  style='margin-top: -11px;'  ><img src='img/stream_live_icon.png' class='attachment_icon' /><span class=\"blast_link\">" +name + "</span></a>";
									wstrHTML +="<a href='#' class='blast_text' style='background: url() no-repeat 5px 5px;'><span style='position:absolute; font-size: 10px; color: #888; margin:-5px 0 0 177px;'>" + replies + "</span><span style='font-size: 10px; color: #888; margin:-5px 0 0 80px;'>"+ date+"</span><span style='height: 2px'></span></a>";	
									wstrHTML +="</div>";
								}
								else
								{
									wstrHTML +="<div>";
									wstrHTML +="<img src='"+profile_image_url+"' class='blast_profile_image' /><div  class=\"blast_text\"   ><a href='#'><span class='blast_covu_id' title='"+recipeint_list+"' style='width:224px;'>" + covu_id +"<font size='1px;'>  :  "+recipeint_list + "</font></span></a><span id='message_span"+i+"' class=\"blast_content\"><div id='div_span"+ i +"' style=''>" + notes+ "</div></span><br/></div>"+createTray("",blast_id,covu_id,type);
									wstrHTML +="<a href=\"#\" class=\"attachment\"  style='margin-top: -11px;'  ><img src='img/stream_live_icon.png' class='attachment_icon' /><span class=\"blast_link\">" +name + "</span></a>";
									wstrHTML +="<a href='#'  class='blast_text' style='background: url() no-repeat 5px 5px;'><span style='position:absolute; font-size: 10px; color: #888; margin:-5px 0 0 177px;'>" + replies + "</span><span style='font-size: 10px; color: #888; margin: -5px 0 0 80px;'>"+date +"</span><span style='height: 2px'></span></a>";
									wstrHTML +="</div>";
								}
								wstrHTML += "</div>";
								wstrHTMLCopy = wstrHTML;
							}
						
							else{
								}
								}
						catch(e)
						{
						}
							break;
						case "message":
								wstrHTML += "<div name="+classHighlight+" id='items_content"+i+"' setidblast="+blast_id+" class=\"blasts\" blastType='message' covuID="+covu_id+">";

								if(document.getElementById(blast_id))
								{
									var target = document.getElementById(blast_id);
									var wrap = document.createElement('div');
									wrap.appendChild(target.cloneNode(true));
									wstrHTML += "<div id='message_div'><img src='"+profile_image_url+"' class='blast_profile_image' id='Blast_img'/><div id='blast_div' class=\"blast_text\" ><a href='#'><span class='blast_covu_id' id='reciepient_span' title='"+recipeint_list+"' style='width:224px;'>"+ covu_id +"<font size='1px;'>  :  "+recipeint_list + "</font> </span></a><span id='message_span"+i+"' class=\"blast_content\" ><div class=\"extraClass\" id='div_span"+ i +"'>" + content + "</div></span><span id='replies' style=' position:absolute;  font-size: 10px; color: #888; margin:6px 0 0 177px;'>" + replies + "</span><span style='position:relative; font-size: 10px; color: #888; margin-top:6px; margin-left: 80px;' id='date_span'>"+date +"</span><span style='height: 2px' id='empty'></span></div>"+wrap.innerHTML+"</div>";
								}
								else
									wstrHTML += "<div id='message_div'><img src='"+profile_image_url+"' class='blast_profile_image' id='Blast_img'/><div id='blast_div' class=\"blast_text\"  ><a href='#'><span class='blast_covu_id' title='"+recipeint_list+"' id='reciepient_span' style='width:224px;'>"+ covu_id +"<font size='1px;'>  :  "+recipeint_list + "</font> </span></a><span id='message_span"+i+"' class=\"blast_content\" '><div id='div_span"+ i +"' class=\"extraClass\" >" + content + "</div></span><span id='replies'  style='position:absolute; font-size: 10px; color: #888; margin:6px 0 0 177px;'>" +  replies + "</span><span style='position:relative; font-size: 10px; color: #888; margin-top:6px; margin-left:  80px;' id='date_span'>"+ date +"</span><span style='height: 2px' id='empty'></span></div>"+createTray("",blast_id,covu_id)+"</div>";//+"<div><br/><br/><br/><span style='float: right; color: #9F9F9F;   font-family: arial; font-size: 14px;'><b>"+replies+" replies </b></span></div></div>";
									
						
								wstrHTML += "</div>";
								wstrHTMLCopy = wstrHTML;								
								break;
						default: 
					}
		} // if(covu_id==search_value) endssss
	} 
	
	if(counter==false)
	{
		if(blast_length)
		{
			//wstrHTML += "<div id='dummy_search' />";
		
			document.getElementById("searchListingContainer").innerHTML=wstrHTMLCopy;			
			$('div[name="classHighlight"]').effect("highlight", {color:"#AAD4FF"}, 3000);
		}
		else
		{
			elem=id('stream_loader');
			if(elem)
			{
				elem.style.display='none';
			}
		}
	}
	else
	{
		if(blast_length)
		{
			//wstrHTML += "<div id='dummy_search' />";
			
			document.getElementById("searchListingContainer").innerHTML=wstrHTML;
			$('#searchListingContainer').highlight(search_value);			
			$('div[name="classHighlight"]').effect("highlight", {color:"#AAD4FF"}, 3000);
		}
		else
		{
			elem=id('stream_loader');
			if(elem)
			{
				elem.style.display='none';
			}
		}
	}	
		

		BACKGROUND.setBlastUpdateTime(true);
		//onLeadContainerResize2();
		startFollow();
		hide_show_expand_button(blast_length);
		
		
		setTimeout(function(){
			var targeted = document.getElementsByClassName("blasts");
				for(var j=0; j<targeted.length; j++)
				{
					var target_item = targeted.item(j)
					//alert("items_content"+j);
					//break;
					//createTray("",blast_id,covu_id);
					if(document.getElementById("BookmarkTab"))
					{
						document.getElementById("BookmarkTab").addEventListener('click',joinSession ,false);	
					}
					
					target_item.addEventListener('click',getID ,false);
					
					//alert(blast_id);
				}
				
			},0)
	
	}
	
	function joinSession (event) 
	{
		var elem= event.target;
		var eID=elem.id;
		
	}
	
	function getID(event) 
	{
		var elem= event.target;
		var eID=elem.id;
		if (eID=="replies" || eID=="date_span" || eID=="empty" || elem.className=='blast_content' || eID=="Linkreciepient_span"|| eID=="replies" || eID=="LinkDate" || eID=="Linkempty_span" )
		{
			elem=elem.parentNode.parentNode.parentNode;
		}
		else if(eID=='reciepient_span' || elem.className=='extraClass' || elem.className=='blast_covu_id' || elem.className=='blast_span')
		{
			elem=elem.parentNode.parentNode.parentNode.parentNode;
		}
		else if(eID=='Blast_img' || eID=='blast_div' || content=='link_content')
		{
			elem=elem.parentNode.parentNode;
		}
		if (eID=="BookmarkTab")
		{
			elem=elem.parentNode.parentNode;
			var blast_id= elem.getAttribute('setidblast');
			triggerSearchClick(blast_id);
			return;
		}
		else if(elem.className=='attachment_icon' || elem.className=='blast_link')
		{
			elem=elem.parentNode.parentNode.parentNode;
			var blast_id= elem.getAttribute('setidblast');
			triggerSearchClick(blast_id);
			return;
		}
		
		
		else if(eID=='SlideOutArrow')
		{
			elem=elem.parentNode.parentNode.parentNode;
			var blast_id= elem.getAttribute('setidblast');
			var blast_type= elem.getAttribute('blastType');
			var covu_id= elem.getAttribute('covuID');
			slide_out(event,blast_id);
			return ;
		}
		else if(eID=='trash_icon')
		{
			elem=elem.parentNode.parentNode.parentNode;
			var blast_id= elem.getAttribute('setidblast');
			var blast_type= elem.getAttribute('blastType');
			var covu_id= elem.getAttribute('covuID');
			if(blast_type=='session')
			{	
				return ;
			}
			else if(covu_id==BACKGROUND.leader_id)
			{
				deleteBlast(blast_id);
				return ;				
			}
			else
			{
				return ;
			}
		}
		else if(eID=='reblast_icon')
		{
			elem=elem.parentNode.parentNode.parentNode;
			var blast_id= elem.getAttribute('setidblast');
			var blast_type= elem.getAttribute('blastType');
			var covu_id= elem.getAttribute('covuID');
			if(blast_type=='session')
			{	
				return ;
			}
			else if(covu_id==BACKGROUND.leader_id)
			{
				reblast(blast_id);
				return ;				
			}
			else 
			{
				reblast(blast_id);
				return ;
			}
		}
		else if(eID=='reply_icon')
		{
			elem=elem.parentNode.parentNode.parentNode;
			var blast_id= elem.getAttribute('setidblast');
			var blast_type= elem.getAttribute('blastType');
			var covu_id= elem.getAttribute('covuID');
			if(blast_type=='session')
			{	
				return ;
			}
			else if(covu_id==BACKGROUND.leader_id)
			{
				triggerSearchClick(blast_id,true);
				return ;				
			}
			else
			{
				triggerSearchClick(blast_id,true);
				return ;
			}
		}
		else if(elem.className=='expand_colapse_button' || elem.className=='expand_colapse_button_attatchment')
		{
			var expandNum= elem.getAttribute('xpandNum');
			expand_colapse(expandNum);
			return ;
		}
		
		var blast_id= elem.getAttribute('setidblast');
		var blast_type= elem.getAttribute('blastType');
		if(blast_type=='link')
		{
			triggerSearchClick(blast_id,true);
		}
		else if(blast_type=='message')
		{
			triggerSearchClick(blast_id);
		}
		
	}
	
	function getParentBlastHTML(id)
	{
		var blast = BACKGROUND.blastResults.getElementsByTagName("blast");
		for(var i=0;i<blast.length; i++)
		{
			var blast_id="";
			try
			{
				blast_id= blast[i].getElementsByTagName("blast_id")[0].childNodes[0].nodeValue;
			}
			catch(e)
			{
			}

			if(blast_id==id)
			{
				var covu_id="";
				var has_avatar="";
				var profile_image_url="";
				var blastDate="";
				var currentDate="";
				var type="";
				var replies="";
			
				try{
			
					covu_id = blast[i].getElementsByTagName("from_covu_id")[0].childNodes[0].nodeValue;
					has_avatar=blast[i].getElementsByTagName("from_covu_id")[0].getAttribute('has_avatar');
					profile_image_url="";
					if(has_avatar=="true")
					{
						profile_image_url=BACKGROUND.member_images+"/thumb_"+covu_id+".png";

					}
					else
					{
						profile_image_url= BACKGROUND.default_image+"/"+"avatar.png";
					}
					
					date = blast[i].getElementsByTagName("created_at")[0].childNodes[0].nodeValue;
					blastDate = new Date(date);
					currentDate= new Date();
					date=timeDifference(currentDate,blastDate);
					type = blast[i].getElementsByTagName("type")[0].childNodes[0].nodeValue;
					replies = blast[i].getElementsByTagName("replies")[0].childNodes[0].nodeValue;
				}
				catch(e)
				{
				}
			
			var content=".";
			try{
				content = blast[i].getElementsByTagName("content")[0].childNodes[0].nodeValue;	
				content=decodeData(content);
				content = linkify(content);
				content= content.replace(/\n/g, "<br />");
			}
			catch(e){
				content=".";
			}
			
				wstrHTML += "<div id=\"items_content_convo\" class=\"blasts\" style='background : url(); border:0; margin-left: 0px;' setidblast="+blast_id+" covuID="+covu_id+">";
				
				switch(type)
				{
					case "link":
						var notes=".";
						var title=".";
						try{	
							notes = blast[i].getElementsByTagName("memo")[0].childNodes[0].nodeValue;
							
							notes=decodeData(notes);
							notes = linkify(notes);						
							notes= notes.replace(/\n/g, "<br />");
						}
						catch(e)
						{
							notes=".";
						}
						try{
							title = decodeData(blast[i].getElementsByTagName("title")[0].childNodes[0].nodeValue);
						}
						catch(e)
						{
							title=".";
						}

						if(document.getElementById("conversation_"+blast_id))
						{
							var target = document.getElementById("conversation_"+blast_id);
							var wrap = document.createElement('div');
							wrap.appendChild(target.cloneNode(true));
							wstrHTML +="<div>";
							wstrHTML +="<img src='"+profile_image_url+"' class='blast_profile_image' /><div  class=\"blast_text \" ><a href='#'><span style=' float: right;  padding-left: 3px; font-size: 10px; margin-top:5px;'>" + date + "</span><span class='blast_covu_id' style=''>" + covu_id + "</span></a><span id=\"message_span_convo\" class=\"blast_content\" style='max-height:none;'>" + notes + "</span><br/></div>"+wrap.innerHTML;
							wstrHTML +="<a href=\"#\" class=\"attachment\"  onclick='triggerSearchClick(\"" + blast_id + "\")'  style='margin-top:-11px; cursor: default' title=\""+ blast[i].getElementsByTagName('content')[0].childNodes[0].nodeValue + "\" ><img src='img/stream_bookmark_icon.png' class='attachment_icon' /><span class=\"blast_link\">" + title + "</span></a>";
							wstrHTML +="</div>";
							break;
						} else { 

							wstrHTML +="<div>";
							wstrHTML +="<img src='"+profile_image_url+"' class='blast_profile_image' /><div class=\"blast_text \" ><a href='#'><span style=' float: right;  padding-left: 3px; font-size: 10px; margin-top:5px;'>" + date + "</span><span class='blast_covu_id' style=''>" + covu_id + "</span></a><span id=\"message_span_convo\" class=\"blast_content\" style='max-height:none;'>" + notes + "</span><br/></div>"+createTray("conversation_",blast_id,covu_id);//<a id=\"converastion_" + i +"\" onclick=\"slide_out(event)\" href=\"#\"  class=\"options-bar slide-out\";/><img src=\"img/trash.png\" style=\"margin-left:30px\" class=\"tray_buttons\" onclick='deleteBlast(\"" + blast_id + "\");' /><img src=\"img/reblast.png\" style=\"margin-left:10px\" class=\"tray_buttons\" /><img src=\"img/reply.png\" style=\"margin-left:10px\" class=\"tray_buttons\" /><img src=\"img/blast_share.png\" style=\"margin-left:10px\" class=\"tray_buttons\" /></a></div>";
							wstrHTML +="<a href=\"#\" id='BookmarkTab' class=\"attachment\" style='margin-top:-11px; cursor: default' title=\""+ blast[i].getElementsByTagName('content')[0].childNodes[0].nodeValue + "\"><img src='img/stream_bookmark_icon.png' class='attachment_icon' /><span class=\"blast_link\">" + title + "</span></a>";
							wstrHTML +="</div>";							
							break;
						}
					case "ppt":
						var notes=".";
						var title=".";
						try{	
							notes = blast[i].getElementsByTagName("memo")[0].childNodes[0].nodeValue;
							
							notes=decodeData(notes);
							notes = linkify(notes);
							notes= notes.replace(/\n/g, "<br />");
						}
						catch(e)
						{
							notes=".";
						}
						try{
							title = decodeData(blast[i].getElementsByTagName("title")[0].childNodes[0].nodeValue);
						}
						catch(e)
						{
							title=".";
						}

						if(document.getElementById("conversation_"+blast_id))
						{
							var target = document.getElementById("conversation_"+blast_id);
							var wrap = document.createElement('div');
							wrap.appendChild(target.cloneNode(true));
							wstrHTML +="<div>";
							wstrHTML +="<img src='"+profile_image_url+"' class='blast_profile_image' /><div  class=\"blast_text \" ><a href='#'><span style=' float: right;  padding-left: 3px; font-size: 10px; margin-top:5px;'>" + date + "</span><span class='blast_covu_id' style=''>" + covu_id + "</span></a><span id=\"message_span_convo\" class=\"blast_content\"  style='max-height:none;'>" + notes + "<br/></span></div>"+wrap.innerHTML;
							wstrHTML +="<a href=\"#\" class=\"attachment\"  onclick='triggerSearchClick(\"" + blast_id + "\")' title=\""+ blast[i].getElementsByTagName('content')[0].childNodes[0].nodeValue + "\" ><img src='img/stream_ppt_icon.png' class='attachment_icon' /><span class=\"blast_link\">" + title + "</span></a>";
							wstrHTML +="</div>";
							break;
						} else { 

							wstrHTML +="<div>";
							wstrHTML +="<img src='"+profile_image_url+"' class='blast_profile_image' /><div  class=\"blast_text \" ><a href='#'><span style=' float: right;  padding-left: 3px; font-size: 10px; margin-top:5px;'>" + date + "</span><span class='blast_covu_id' style=''>" + covu_id + "</span></a><span id=\"message_span_convo\" class=\"blast_content\" style='max-height:none;'>" + notes + "<br/></span></div>"+createTray("conversation_",blast_id,covu_id);;
							wstrHTML +="<a href=\"#\" class=\"attachment\"  onclick='triggerSearchClick(\"" + blast_id + "\")' title=\""+ blast[i].getElementsByTagName('content')[0].childNodes[0].nodeValue + "\"><img src='img/stream_ppt_icon.png' class='attachment_icon' /><span class=\"blast_link\">" + title + "</span></a>"; 
							wstrHTML +="</div>";							
							break;
						}
						case "session":
							var notes=".";
							var name=".";
							try{	
								notes = blast[i].getElementsByTagName("notes")[0].childNodes[0].nodeValue;
								
								notes=decodeData(notes);
								notes = linkify(notes);
								notes= notes.replace(/\n/g, "<br />");
							}
							catch(e)
							{
								notes=".";
							}
							try{
								name = blast[i].getElementsByTagName("name")[0].childNodes[0].nodeValue;
							}
							catch(e)
							{
								name=".";
							}
							if(blast[i].getElementsByTagName("session")[0].getElementsByTagName("active")[0].childNodes[0].nodeValue =="true")
							{
								if(document.getElementById("conversation_"+blast_id))
								{
									var target = document.getElementById("conversation_"+blast_id);
									var wrap = document.createElement('div');
									wrap.appendChild(target.cloneNode(true));
									wstrHTML +="<div>";
									wstrHTML +="<img src='"+profile_image_url+"' class='blast_profile_image' /><div  class=\"blast_text\" ><a href='#'><span style=' float: right;  padding-left: 3px; font-size: 10px; margin-top:5px;'>" + date + "</span><span class='blast_covu_id' style=''>" + covu_id + "</span></a><span id=\"message_span_convo\" class=\"blast_content\" style='max-height:none;'>" + notes+ "<br/><br/></span></div>"+wrap.innerHTML;
									wstrHTML +="<a href=\"#\" class=\"attachment\" title=\""+ blast[i].getElementsByTagName('content')[0].childNodes[0].nodeValue + "\"><img src='img/stream_live_icon.png' class='attachment_icon' /><span class=\"blast_link\">" +name + "</span></a>";
									wstrHTML +="</div>";
								}									
								else
								{
									wstrHTML +="<div>";
									wstrHTML +="<img src='"+profile_image_url+"' class='blast_profile_image' /><div  class=\"blast_text\" ><a href='#'><span style=' float: right;  padding-left: 3px; font-size: 10px; margin-top:5px;'>" + date + "</span><span class='blast_covu_id' style=''>" + covu_id + "</span></a><span id=\"message_span_convo\" class=\"blast_content\" style='max-height:none;'>" + notes+ "<br/><br/></span></div>"+createTray("conversation_",blast_id,covu_id,type);//<a id=\"converastion_" + i +"\" onclick=\"slide_out(event)\" href=\"#\"  class=\"options-bar slide-out\";/><img src=\"img/trash.png\" style=\"margin-left:30px\" class=\"tray_buttons\" onclick='deleteBlast(\"" + blast_id + "\");' /><img src=\"img/reblast.png\" style=\"margin-left:10px\" class=\"tray_buttons\" /><img src=\"img/reply.png\" style=\"margin-left:10px\" class=\"tray_buttons\" /><img src=\"img/blast_share.png\" style=\"margin-left:10px\" class=\"tray_buttons\" /></a></div>";
									wstrHTML +="<a href=\"#\" class=\"attachment\" title=\""+ blast[i].getElementsByTagName('content')[0].childNodes[0].nodeValue + "\"><img src='img/stream_live_icon.png' class='attachment_icon' /><span class=\"blast_link\">" +name + "</span></a>";
									wstrHTML +="</div>";
								}
									
							}
							else{
							}
							break;
						case "message":
							if(document.getElementById("conversation_"+blast_id))
							{
								var target = document.getElementById("conversation_"+blast_id);
								var wrap = document.createElement('div');
								wrap.appendChild(target.cloneNode(true));
								wstrHTML += "<div style='height:60px;'><img src='"+profile_image_url+"' class='blast_profile_image' /><div  class=\"blast_text\"  ><a href='#'><span style=' float: right;  padding-left: 3px; font-size: 10px; margin-top:5px;'>" + date + "</span><span class='blast_covu_id' style=''>"+ covu_id + "</span></a><span id=\"message_span_convo\" class=\"blast_content\" style='max-height:none;' >" + content + "</span><br/></div>"//+createTray("",blast_id,covu_id)+"</div>";//+"<div><br/><br/><br/><span style='float: right; color: #9F9F9F;   font-family: arial; font-size: 14px;'><b>"+replies+" replies </b></span></div></div>";
								wstrHTML+=wrap.innerHTML+"</div>";
								break;
							}else {
								wstrHTML += "<div style='height:60px;'><img src='"+profile_image_url+"' class='blast_profile_image' /><div  class=\"blast_text\"  ><a href='#'><span style=' float: right;  padding-left: 3px; font-size: 10px; margin-top:5px;'>" + date + "</span><span class='blast_covu_id' style=''>"+ covu_id + "</span></a><span id=\"message_span_convo\" class=\"blast_content\" style='max-height:none;'>" + content + "</span><br/></div>"//+createTray("",blast_id,covu_id)+"</div>";//+"<div><br/><br/><br/><span style='float: right; color: #9F9F9F;   font-family: arial; font-size: 14px;'><b>"+replies+" replies </b></span></div></div>";
								wstrHTML+=createTray("conversation_",blast_id,covu_id)+"</div>";
								break;	
							}
						default: 
				}
				wstrHTML += "</div>";
				
				setTimeout(function()
				{
					var targeted = document.getElementById("items_content_convo");
					
					if(document.getElementById("BookmarkTab"))
					{
						document.getElementById("BookmarkTab").addEventListener('click',joinSession ,false);	
					}
					targeted.addEventListener('click',getConvoID ,false);				
				
				},0);
				
				return wstrHTML;
			}
		}
	}
	function getConvoID ()
	{
		var elem= event.target;
		var eID=elem.id;
		if (eID=="BookmarkTab")
		{
			elem=elem.parentNode.parentNode;
			var blast_id= elem.getAttribute('setidblast');
			triggerSearchClick(blast_id);
			return;
		}
		else if(elem.className=='attachment_icon' || elem.className=='blast_link')
		{
			elem=elem.parentNode.parentNode.parentNode;
			var blast_id= elem.getAttribute('setidblast');
			triggerSearchClick(blast_id);
			return;
		}
		
		if(eID=='SlideOutArrow')
		{
			elem=elem.parentNode.parentNode.parentNode;
			var blast_id= elem.getAttribute('setidblast');
			var blast_type= elem.getAttribute('blastType');
			var covu_id= elem.getAttribute('covuID');
			slide_out(event,"conversation_"+blast_id);
		}
		else if(eID=='trash_icon')
		{
			elem=elem.parentNode.parentNode.parentNode;
			var blast_id= elem.getAttribute('setidblast');
			var blast_type= elem.getAttribute('blastType');
			var covu_id= elem.getAttribute('covuID');
			if(blast_type=='session')
			{	
				return ;
			}
			else if(covu_id==BACKGROUND.leader_id)
			{
				deleteBlast(blast_id);
				return ;				
			}
			else
			{
				return ;
			}
		}
		else if(eID=='reblast_icon')
		{
			elem=elem.parentNode.parentNode.parentNode;
			var blast_id= elem.getAttribute('setidblast');
			var blast_type= elem.getAttribute('blastType');
			var covu_id= elem.getAttribute('covuID');
			if(blast_type=='session')
			{	
				return ;
			}
			else if(covu_id==BACKGROUND.leader_id)
			{
				reblast(blast_id);
				return ;				
			}
			else 
			{
				reblast(blast_id);
				return ;
			}
		}
		else if(eID=='expand_colapse_button')
		{
			expand_colapse_convo();
			return ;
		}
		else if(eID=='reply_icon')
		{
			elem=elem.parentNode.parentNode.parentNode;
			var blast_id= elem.getAttribute('setidblast');
			var blast_type= elem.getAttribute('blastType');
			var covu_id= elem.getAttribute('covuID');
			if(blast_type=='session')
			{	
				return ;
			}
			else if(covu_id==BACKGROUND.leader_id)
			{
				triggerSearchClick(blast_id,true);
				return ;				
			}
			else
			{
				triggerSearchClick(blast_id,true);
				return ;
			}
		}
		
	}
	var prev_conver_blast_id=null;
	function conversationView(doc,blast_id)
	{
		if(trayStartedConvo)
			return;
		if(blast_id!=clicked_blast_id)
			return;

		var blast = doc.getElementsByTagName("blast");
		wstrHTML="";
		wastrHTML=getParentBlastHTML(clicked_blast_id);
		for(var i = 0; i < blast.length; i++)
		{
			var covu_id="";
			var has_avatar="";
			var profile_image_url="";
			var blastDate="";
			var currentDate="";
			var type="";
			var blast_id="";
			var replies="";
			
			try{
			
				covu_id = blast[i].getElementsByTagName("from_covu_id")[0].childNodes[0].nodeValue;
				has_avatar=blast[i].getElementsByTagName("from_covu_id")[0].getAttribute('has_avatar');
				profile_image_url="";
				if(has_avatar=="true")
				{
					profile_image_url=BACKGROUND.member_images+"/thumb_"+covu_id+".png";

				}
				else
				{
					profile_image_url= BACKGROUND.default_image+"/"+"avatar.png";
				}
				
				date = blast[i].getElementsByTagName("created_at")[0].childNodes[0].nodeValue;
				blastDate = new Date(date);
				currentDate= new Date();
				date=timeDifference(currentDate,blastDate);
				type = blast[i].getElementsByTagName("type")[0].childNodes[0].nodeValue;
				blast_id = blast[i].getElementsByTagName("blast_id")[0].childNodes[0].nodeValue;
				replies = blast[i].getElementsByTagName("replies")[0].childNodes[0].nodeValue;
			}
			catch(e)
			{
			}
			
			var content=".";
			try{
				content = blast[i].getElementsByTagName("content")[0].childNodes[0].nodeValue;
				
				content=decodeData(content);
					content = linkify(content);				
				content= content.replace(/\n/g, "<br />");
			}
			catch(e){
				content=".";
			}
			
			
			wstrHTML += "<div id='items_contents"+i+"' class=\"blasts\" style='background : url(); width: 300px; border: 0px; margin-left: 0px;'>";
				switch(type)
				{
					case "link":
						var notes=".";
						var title=".";
						try{
						
							notes = blast[i].getElementsByTagName("memo")[0].childNodes[0].nodeValue;
							
							notes=decodeData(notes);
							notes= notes.replace(/\n/g, "<br />");
						}
						catch(e)
						{
							notes=".";
						}
						try{
							title = decodeData(blast[i].getElementsByTagName("title")[0].childNodes[0].nodeValue);
						}
						catch(e)
						{
							title=".";
						}
						notes = linkify(notes);
						wstrHTML +="<div>";
						wstrHTML +="<img src='"+profile_image_url+"' style='width 35px; height: 35px; position:absolute; cursor:pointer;' onclick='profileHTML(\""+covu_id+"\");'/><div class=\"website\" style='background: url() no-repeat 8px 5px; background-size: 35px 35px;'  ><a href='#'><span style=' float: right; padding-left: 3px;'>" + date + "</span><span class='blast_covu_id' style=''>" + covu_id + "</span></a><span class=\"blast_content\">" + notes + "</span></div>";
						wstrHTML +="<a href=\"#\"  class=\"attachment\" style='cursor: default' title=\""+ blast[i].getElementsByTagName('content')[0].childNodes[0].nodeValue + "\"><img src='img/blast_link_attachment_icon.png' class='attachment_icon' /><span class=\"blast_link\">" + title + "</span></a>";
						wstrHTML +="</div>";
						break;
					case "ppt":
						var notes=".";
						var title=".";
						try{
						
							notes = blast[i].getElementsByTagName("memo")[0].childNodes[0].nodeValue;
							
							notes=decodeData(notes);
							
							notes= notes.replace(/\n/g, "<br />");
						}
						catch(e)
						{
							notes=".";
						}
						try{
							title = decodeData(blast[i].getElementsByTagName("title")[0].childNodes[0].nodeValue);
						}
						catch(e)
						{
							title=".";
						}
						wstrHTML +="<div>";
						wstrHTML +="<img src='"+profile_image_url+"' style='width 35px; height: 35px;  position:absolute; cursor:pointer;' onclick='profileHTML(\""+covu_id+"\");'/><div class=\"website\" style='background: url() no-repeat 8px 5px; background-size: 35px 35px;'  ><a href='#'><span style=' float: right; padding-left: 3px;'>" + date + "</span><span class='blast_covu_id' style=''>" + covu_id + "</span></a><span class=\"blast_content\">" + notes + "</span></div>";
						wstrHTML +="<a href=\"#\"  class=\"attachment\" title=\""+ blast[i].getElementsByTagName('content')[0].childNodes[0].nodeValue + "\"><img src='img/stream_ppt_icon.png' class='attachment_icon' /><span class=\"blast_link\">" + title + "</span></a>";
						wstrHTML +="</div>";
						break;
						
					case "session":
							var notes=".";
							var name=".";
							try{
							
								notes = blast[i].getElementsByTagName("notes")[0].childNodes[0].nodeValue;
								
								notes=decodeData(notes);
								
								notes= notes.replace(/\n/g, "<br />");
							}
							catch(e)
							{
								notes=".";
							}
							try{
								name = blast[i].getElementsByTagName("name")[0].childNodes[0].nodeValue;
							}
							catch(e)
							{
								name=".";
							}
							notes = linkify(notes);
							if(blast[i].getElementsByTagName("session")[0].getElementsByTagName("active")[0].childNodes[0].nodeValue =="true")
							{
								wstrHTML +="<div>";
									wstrHTML +="<img src='"+profile_image_url+"' style='width 35px; height: 35px; position:absolute; cursor:pointer;' onclick='profileHTML(\""+covu_id+"\");'/><div class=\"website\" style='background: url(img/profile-background.png) no-repeat 8px 5px; background-size: 35px 35px;' ><a href='#'><span style=' float: right; padding-left: 3px;'>" + date + "</span><span class='blast_covu_id' style=''>" + covu_id + "</span></a><span class=\"blast_content\">" + notes+ "</span></div>";
									wstrHTML +="<a href=\"#\"   class=\"attachment\" > <img src='img/stream_live_icon.png' class='attachment_icon' /><span class=\"blast_link\">" +name + "</span></a>";
								wstrHTML +="</div>";
							}
							else{
							}
						break;
					case "message":

						wstrHTML += "<div style='height:44px;'><img src='img/profile-background.png' style='position:absolute; width: 34px; height 34px; margin: 0 0 0 5px;'/><img src='"+profile_image_url+"' style='width 25px; height: 25px;  position:absolute; padding-left:10px; padding-top:5px; cursor:normal;'/><div class=\"blast_text\" style='background: url(img/reply_background.png)  bottom repeat; margin-left: 45px; margin-top: 2px; cursor: default; width: 255px;' ><a href='#'><span style=' float: right;  padding-left: 3px; font-size: 10px; margin:5px 30px 0 0;'>" + date + "</span><span class='blast_covu_id' style='margin-left:10px; padding-top:0px;'>"+ covu_id + "</span></a><span id='message_spans"+i+"' class=\"blast_content\" style='max-height:none; margin-left:10px;' >" + content + "</span><div style='height: 5px;'/></div></div></div>";
						break;
				    default: 
				}
			wstrHTML += "</div>";
		}
		document.getElementById("coversationListingContainer").innerHTML=wstrHTML;
		
		if(prev_conver_blast_id)
		{
			if(prev_conver_blast_id!=clicked_blast_id)
			{
				id('coversationListingContainer').scrollTop = id('coversationListingContainer').scrollHeight;
				prev_conver_blast_id=clicked_blast_id;
				if(blast)
					blast_replies_count=blast.length;
			}
			else
			{
				if(blast_replies_count<blast.length)
				{
					id('coversationListingContainer').scrollTop = id('coversationListingContainer').scrollHeight;
					blast_replies_count=blast.length;
					
				}
			}
		}
		else
		{
			id('coversationListingContainer').scrollTop = id('coversationListingContainer').scrollHeight;
			prev_conver_blast_id=clicked_blast_id;
			blast_replies_count=blast.length;
		}
	/*	if(blast_replies_count<blast.length)
		{

			blast_replies_count=blast.length;
		}		*/	
//		hide_show_button_convo(blast.length);
	}
	function createTray(prefix,blast_id,covu_id,blast_type)
	{
		
		if(blast_type=="session")
		{
			return "<a tabindex='-1' style='outline:none; ' id=\"" + prefix+blast_id +"\" href=\"#\" class=\"options-bar slide-out\"> <img id='SlideOutArrow' src=\"img/blast-slide-out-button.png\" style='margin-left: 0px;' \"  /><img src=\"img/trash.png\" style=\"position:absolute; margin-left:6px; margin-top:5px; \" class=\"tray_buttons\"  /><img src=\"img/reblast.png\"  style=\"position:absolute; margin-left:55px; margin-top:5px;\" class=\"tray_buttons\" /><img src=\"img/reply.png\"  style=\"position:absolute; margin-left:105px; margin-top:5px;\" class=\"tray_buttons\" /><img src=\"img/blast_share.png\" style=\"position:absolute; margin-left:155px; margin-top:5px;\" class=\"tray_buttons\" /></a>";				
		}
		if(covu_id==BACKGROUND.leader_id)
		{
			return "<a tabindex='-1' style='outline:none; ' id=\"" + prefix+blast_id +"\" href=\"#\" class=\"options-bar slide-out\"> <img id='SlideOutArrow' src=\"img/blast-slide-out-button.png\" style='margin-left: 0px;' \" /><img src=\"img/trash.png\" id='trash_icon' style=\"position:absolute; margin-left:6px; margin-top:5px; \" class=\"tray_buttons\" /><img src=\"img/reblast.png\" id='reblast_icon' style=\"position:absolute; margin-left:55px; margin-top:5px;\" class=\"tray_buttons\" /><img src=\"img/reply.png\" id='reply_icon' style=\"position:absolute; margin-left:105px; margin-top:5px;\" class=\"tray_buttons\" /><img src=\"img/blast_share.png\" style=\"position:absolute; margin-left:155px; margin-top:5px;\" class=\"tray_buttons\" /></a>";
		}
		else
		{
			return "<a tabindex='-1' style='outline:none; ' id=\"" + prefix+blast_id +"\" href=\"#\" class=\"options-bar slide-out\"> <img id='SlideOutArrow' src=\"img/blast-slide-out-button.png\" style='margin-left: 0px;' \" /><img src=\"img/trash.png\" style=\"position:absolute; opacity : 0.4;  margin-left:6px; margin-top:5px; \" class=\"tray_buttons\"  /><img src=\"img/reblast.png\" id='reblast_icon' style=\"position:absolute; margin-left:55px; margin-top:5px;\" class=\"tray_buttons\" /><img src=\"img/reply.png\" id='reply_icon' style=\"position:absolute; margin-left:105px; margin-top:5px;\" class=\"tray_buttons\" /><img src=\"img/blast_share.png\" style=\"position:absolute; margin-left:155px; margin-top:5px;\" class=\"tray_buttons\" /></a>";
		}
		
		

	}
		function linkify(inputText) {
	    var replaceText, replacePattern1, replacePattern2, replacePattern3;
	
	    //URLs starting with http://, https://, or ftp://
	    replacePattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_()|!:,.;]*[-A-Z0-9+&@#\/%=~_|()])/gim;
	    replacedText = inputText.replace(replacePattern1, '<a href="$1" target="_blank">$1</a>');
	
	    //URLs starting with "www." (without // before it, or it'd re-link the ones done above).
	    replacePattern2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
	    replacedText = replacedText.replace(replacePattern2, '$1<a href="http://$2" target="_blank">$2</a>');
	
	    //Change email addresses to mailto:: links.
	    replacePattern3 = /(\w+@[a-zA-Z_]+?\.(?:[a-zA-Z]{2,6})+)/gim;
	    replacedText = replacedText.replace(replacePattern3, '<a href="mailto:$1">$1</a>');
	    
	    if (typeof String.prototype.startsWith != 'function') {
  			String.prototype.startsWith = function (str){
    			return this.slice(0, str.length) == str;
  			};
		}
		if (typeof String.prototype.endsWith != 'function') {
  			String.prototype.endsWith = function (str){
    			return this.slice(-str.length) == str;
  			};
		}
	    
	    if(replacedText.startsWith("(") && replacedText.endsWith(")"))
	    {
	    	console.log("inside the if for linkify parens");
	    	return replacedText.substring(1, replacedText.length - 2);
	    }
	
	    return replacedText;
	}
		function trayCompleted()
	{
			trayStarted=false;
	}

	function slide_out(event,id)
	{
		if(checkFollow(""))
		{
			return;
		}
		clicked_element = document.getElementById(id);
		prefix= id.split('_');

		var re_clicked = new RegExp(clicked_element.className, "g");
		if(clicked_element.className == "options-bar slide-out")
		{
			/*if(isTrayOpen && prefix[0]!="conversation")
			{
				return;
			}*/
			if( prefix[0]=="conversation")
			{
				child=clicked_element.children[0];
				child.src="img/blast-slide-out-button2.png";
	
				clicked_element.className = clicked_element.className.replace(re_clicked, '');
				clicked_element.className += "options-bar slide-out open";
			}
			else
			{
				prev_clicked_element = document.getElementById(open_tray_blast);
				
				if(prev_clicked_element)
				{
					var prev_re_clicked = new RegExp(prev_clicked_element.className, "g");
					child=prev_clicked_element.children[0];
					child.src="img/blast-slide-out-button.png";
		
					prev_clicked_element.className = prev_clicked_element.className.replace(prev_re_clicked, '');
					prev_clicked_element.className += "options-bar slide-out";
				}
				child=clicked_element.children[0];
				child.src="img/blast-slide-out-button2.png";
	
				clicked_element.className = clicked_element.className.replace(re_clicked, '');
				clicked_element.className += "options-bar slide-out open";
				open_tray_blast=id;
			}
		}
		else
		{
		/*	if( prefix[0]!="conversation")
			{
				isTrayOpen=false;
			}*/
			child=clicked_element.children[0];
			child.src="img/blast-slide-out-button.png";
			clicked_element.className = clicked_element.className.replace(re_clicked, '');
			clicked_element.className += "options-bar slide-out";
			open_tray_blast=-1;

		}
	//	trayStarted=true;
	//	setTimeout("trayCompleted()", 3000);
	}
	function loadPeopleInfo()
	{
		peopleController.loadFriendList();
		peopleController.loadRequestList();
		peopleController.loadSentRequestList();
	}
	function hide_show_expand_button(length){
		var current_div = '';
		var current_span = '';
		var current_span_div = '';
		for(var i = 0; i < length; i++){
			if(document.getElementById("message_span"+i)){
				current_div = document.getElementById("items_content"+i);
				current_span = document.getElementById("message_span"+i);
				current_span_div = document.getElementById("div_span"+i);
				if(current_span_div.scrollHeight > 128 && current_div.scrollHeight > 199){ //blast with any type of attachment check
					current_div.innerHTML+="<a href=\"#\" id='expand_colapse_button"+i+"' class=\"expand_colapse_button_attatchment\" style=\"color:#1175BC;\" xpandNum="+i+" >More...</a>";
				} else if(current_span_div.scrollHeight > 128 && current_div.scrollHeight < 199){ //message blast check
					current_div.innerHTML +="<a href=\"#\" id='expand_colapse_button"+i+"' class=\"expand_colapse_button\" style=\"color:#1175BC; \" xpandNum="+i+" >More...</a>";
				}
			}
		}
    }
    
    function hide_show_button_convo(length){

    		if(document.getElementById("message_span_convo")){
	    		var current_div = document.getElementById("items_content_convo");
	    		if(document.getElementById("message_span_convo").scrollHeight > 128 && current_div.scrollHeight < 170){
	    			current_div.innerHTML +="<a href=\"#\" id='expand_colapse_button' class=\"expand_colapse_button_conversation_head\" style=\"color:1175BC;\" >More...</a>";
	    		} else if (document.getElementById("message_span_convo").scrollHeight > 128 && current_div.scrollHeight > 170){
	    			current_div.innerHTML +="<a href=\"#\" id='expand_colapse_button' class=\"expand_colapse_button_conversation_head_attatchment\" style=\"color:1175BC;\">More...</a>";    			
	    		}
	    	} 
    	var current_divs = '';
    	var current_span = '';
    		for(var i = 0; i< length; i++){
    			if(document.getElementById("message_spans"+i)){
	    		 	current_span = document.getElementById("message_spans"+i);
	    		 	current_divs = document.getElementById("items_contents"+i);
			 		if(current_span.scrollHeight > 128 && current_divs.scrollHeight < 170){ //check for the conversation screen
						current_divs.innerHTML +="<a href=\"#\" id='expand_colapse_button_convo"+i+"' class=\"expand_colapse_button_conversation\" style=\"color:1175BC;\" onclick='expand_colapse_convo(\""+ i + "\")'>More...</a>";
	    			}
	    		}
    		}
    }
    var temp_bottom = 0;
    var temp_div = 0;
    function expand_colapse(num){
	
    		temp_bottom = 0;

    	 var current_span_div = document.getElementById("div_span"+num);
    	 var current_span = document.getElementById("message_span"+num);
    	 var height = '128px';
    	 var maxHeight = parseInt(current_span.style.maxHeight, 10);
    	 
    	 if(maxHeight != current_span_div.scrollHeight){
    	 		current_span.style.maxHeight = current_span_div.scrollHeight;
    	 		document.getElementById("expand_colapse_button"+num).innerHTML = "Less... "
    	 		temp_bottom = temp_bottom +20;
    	 		current_span.style.marginBottom = temp_bottom + 'px';
    	 		trayStarted = true;
    	 }
    	 else {
    	 		document.getElementById("expand_colapse_button"+num).innerHTML = "More...";
    	 		current_span.style.marginBottom = temp_bottom + 'px';
    	 		current_span.style.maxHeight = height;
    	 		trayStarted = false;
    	 }
    	  temp_div = num;
    }
    
    function expand_colapse_convo(num){
    	
    	temp_bottom = 0;
    	var height = '128px';
    	var head_span = document.getElementById("message_span_convo");
    	var maxHeight = parseInt(head_span.style.maxHeight, 10);
    	
    	if(num){
    		var current_span = document.getElementById("message_spans"+num);
    		var max_span_height = parseInt(current_span.style.maxHeight, 10);
	    	if(max_span_height != current_span.scrollHeight){
	    		current_span.style.maxHeight = current_span.scrollHeight;
	    		document.getElementById("expand_colapse_button_convo"+num).innerHTML = "Less...";
	    		temp_bottom = temp_bottom + 20;
	    		current_span.style.marginBottom = temp_bottom +'px';
	    		trayStartedConvo = true;
	    	}else {
	    		current_span.style.maxHeight = height;
	    		document.getElementById("expand_colapse_button_convo"+num).innerHTML = "More...";
	    		current_span.style.marginBottom = temp_bottom + 'px';
	    		trayStartedConvo = false;

	    	}
	    }else {
	    	if(maxHeight != head_span.scrollHeight){
	    		head_span.style.maxHeight = head_span.scrollHeight;
	    	 	document.getElementById("expand_colapse_button").innerHTML = "Less...";
	    	 	temp_bottom = temp_bottom + 20;
	    	 	head_span.style.marginBottom = temp_bottom + 'px';
	    	 	trayStartedConvo = true;
	    	} else {
	    		 	head_span.style.maxHeight = height;
	    	 		document.getElementById("expand_colapse_button").innerHTML = "More...";
	    	 		head_span.style.marginBottom = temp_bottom + 'px';
	    	 		trayStartedConvo = false;
	    	}
    	}
    }