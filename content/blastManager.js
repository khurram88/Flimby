	function getToList()
	{
		var formatted_list="";
		var list=$("#to_box").tokenInput("get");
		for(var i=0;i<list.length;i++)
		{
			formatted_list+=list[i]["covu_id"]+","
		}
		return formatted_list;
	}
	function clearToList()
	{
		$("#to_box").tokenInput("clear");
		saveToList();
	}
	function isLive()
	{
		if(is_live)
		{
			return true;
		}
		else
		{
			return false;
		}
	}
	function submitLead(toList,type)
	{

			if(BACKGROUND.fLeaderSessionKey=="" && BACKGROUND.leaderSessionKey=="")
			{
				BACKGROUND.closeLeaderSession();
				BACKGROUND.send_Blast(id("message_input").value,toList,type,true);
			//	BACKGROUND.Lead(id("leadSessionName").value,toList,id("message_input").value);
			}
			else
			{
				BACKGROUND.liveSessionAlert();
			}

	}
	function submitBlast()
	{
		toList=getToList();
		if(document.getElementById("bottom_content").style.display == "block")
		{
			if(document.getElementById("link_bottom_content").style.display =='block')
			{
				BACKGROUND.link_title = document.getElementById("name_input").value;
				BACKGROUND.link_url = document.getElementById("url_input").value;
				if(BACKGROUND.link_title!="" && BACKGROUND.link_url!="")
				{
					BACKGROUND.blast_message = id("message_input").value;
					if(!isLive())
					{
						BACKGROUND.send_Blast(id("message_input").value,toList,"link",false);
					}
					else
					{
						submitLead(toList,'link');
					}
					id("message_input").value="";
					//id('link').onclick();
					resetLiveToggle();
					onStreamButton();
					clearToList();
				}
			} 
			else if(document.getElementById("Live_blast"))
			{
				if(id("leadSessionName").value!="")
				{
					submitLead(toList,"link");
					onStreamButton();
				//onLeadContainerResize();
				}
				
			} 
			else if(document.getElementById("ppt_blast"))
			{
				if(document.getElementById("url_input"))
				{
					BACKGROUND.link_title = document.getElementById("name_input").value;
					BACKGROUND.link_url = document.getElementById("url_input").value;
					BACKGROUND.blast_message = id("message_input").value;
					BACKGROUND.send_Blast(id("message_input").value,toList,"ppt");
					onStreamButton();
				}
				else if(!BACKGROUND.ppt_uploading)
				{
					if(document.getElementById("title_bar").value=="")
						document.getElementById("ppt_file_warning").style.display='block';
					else
					{
						document.getElementById("ppt_file_warning").style.display='none';
						BACKGROUND.pptManager.submitForm( BACKGROUND.encodeData(document.getElementById("title_bar").value),BACKGROUND.encodeData(document.getElementById("message_input").value) ,document.getElementById("to_box").value);
						pptUpload();
					}
				}
				//id('pptSubmit').click();
				//pptUpload();
				
			} 
			else if(document.getElementById("Video_blast"))
			{
				addBookmark();
				onStreamButton();
			}
			else
			{
				if(id("message_input").value!="")
				{
					BACKGROUND.blast_message = id("message_input").value;
					if(!isLive())
					{
						BACKGROUND.send_Blast(id("message_input").value,toList,"message",false);
					}
					else
					{
						submitLead(toList,"message");
					}
					onStreamButton();
					id("message_input").value = "";
					resetLiveToggle();
					clearToList();
					id("message_input").focus();
				}
			}
		}
		saveBlastMessage();
	}
	
	
// declaration when app starts to set current button to first in the carousel
	
	//function that changes the current button on the carousel to whatever was clicked
	//@type var for the switch to pick which bottom content is showen.
	//@event var that holds the current mouse event on screen.
	var selected_button='';
	function inactiveBlastTypes()
	{
		id('link').className='link-icon1';	
		id('link_bottom_content').style.display='none';
	}
	function showBlastofType(type)
	{
		if(type=='link')
		{

			if(id('link').className=='link-icon1')
			{
				id('link').className='link-icon2';
				id('link_bottom_content').style.display='block';
				saveBlastType("link");
			}
			//if(id('link').className=='')
		}		
		else
		{
				id('link').className='link-icon1';	
				id('link_bottom_content').style.display='none';
				saveBlastType("");	
		}
	}
	function blast_type(type, event)
	{
		getTabTitleAndUrl("bookmark");
	//	inactiveBlastTypes();
		if(type=='link_message')
		{
			if(id('link').className=='link-icon1')
			{
				id('link').className='link-icon2';
				id('link_bottom_content').style.display='block';
				saveBlastType("link");
			}
			else
			{
				id('link').className='link-icon1';	
				id('link_bottom_content').style.display='none';
				saveBlastType("");
			}
			//if(id('link').className=='')
		}
		else
		{
			saveBlastType("");
		}
		
		/*
		var re_current = new RegExp(current_button.className, "g");
		var str1 = current_button.className;
		str1 = str1.slice(0, -1);
		str1 += "1";
		if(type == ''){
			current_button.className = current_button.className.replace(re_current, '');
			current_button.className += str1;
			current_button = '';
			current_button = document.getElementById("text");
			str1 = current_button.className;
			re_current = new RegExp(current_button.className, "g");
			str1 = str1.slice(0, -1);
			str1 += '2';
			current_button.className = current_button.className.replace(re_current, '');
			current_button.className += str1;
			blast_type_content("text_message");
		}else{
			blast_type_content(type);
			clicked_element = document.getElementById(event.srcElement.id);
		
			var re_clicked = new RegExp(clicked_element.className, "g");

			var str2 = clicked_element.className;
			wstrHTML="";
		
		
			str2 = str2.slice(0, -1);
			str2 += "2";

			if(current_button != clicked_element)
			{
			current_button.className = current_button.className.replace(re_current, '');
			clicked_element.className = clicked_element.className.replace(re_clicked, '');
			
			current_button.className += str1;
			clicked_element.className += str2;
			current_button = clicked_element;
			}
		}*/


	}
	
	//function that changes the bottom content of the blast screen
	//@type var that switchs the content depending on button clicked
	function blast_type_content(type,reblast){
		var wstrHTML = '';
		switch(type)
		{
			case "link_message":
			{
				id('link').className='icon-button link-icon2';
				id('live_blast').className='icon-button live-icon1';
				id('ppt').className='icon-button ppt-icon1';
				id('text').className='icon-button text-icon1';
				current_button = document.getElementById("link");
				//document.getElementById("blast_Button").style.display = "block";
				if(!reblast)
					getTabTitleAndUrl("bookmark");

				id("blast_page_header").innerText="Bookmark Blast";
				id("blast_page_header").style.marginLeft='87px';
				document.getElementById("bottom_content").style.display = "block";
				
				wstrHTML += "<div id=\"Link_blast\" class=\"LinkBlast\">";
				wstrHTML += "<span></span><input id=\"name_input\" style='outline: none; margin-top: 25px; background: url(img/input_filed_blastscreen.png); width:238px; height: 24px; border: 0;'></input>";
				wstrHTML +="<br></br>";
				wstrHTML += "<span></span><input id =\"url_input\" style='outline: none; background: url(img/input_filed_blastscreen.png); width:238px; height: 24px; border: 0;'></input>";
				wstrHTML +="<br></br>";
				wstrHTML += "</div>";
				
				document.getElementById("bottom_content").innerHTML = wstrHTML;
									//id("name_input").value="SDF";
				//document.getElementById('message_input').value = "";
				//document.getElementById('blast_Button').style.margin  = '0 0 0 0';
				break;
			}
			case "text_message":
			{
				id('link').className='icon-button link-icon1';
				id('live_blast').className='icon-button live-icon1';
				id('ppt').className='icon-button ppt-icon1';
				id('text').className='icon-button text-icon2';
				current_button = document.getElementById("text");
				
				id("blast_page_header").innerText="Message Blast";
				id("blast_page_header").style.marginLeft='95px';
				//document.getElementById("blast_Button").style.display = "block";
				document.getElementById('bottom_content').style.display = 'none';
				//document.getElementById('blast_Button').style.margin  = '10px 0 0 0';
			//	document.getElementById('message_input').disabled = false;
				break;
			}
			case "live_blast":
			{
				id('link').className='icon-button link-icon1';
				id('live_blast').className='icon-button live-icon2';
				id('ppt').className='icon-button ppt-icon1';
				id('text').className='icon-button text-icon1';
				current_button = document.getElementById("live_blast");
				
				id("blast_page_header").innerText="Live Blast";
				id("blast_page_header").style.marginLeft='115px';
				//document.getElementById("blast_Button").style.display = "block";
				document.getElementById("bottom_content").style.display = "block";
	
				wstrHTML +="<div id=\"Live_blast\" class=\"LinkBlast\">";
				wstrHTML += "<span></span>";
				wstrHTML += "<input id='leadSessionName' maxlength='30' placeholder=' Live Blast Name' type=\"text\" style='outline: none; margin-top: 25px; background: url(img/input_filed_blastscreen.png); width: 238px; height: 24px; border: 0;' onkeypress=\"triggetClickOn('blast_Button');\" />";
				wstrHTML += "</div>";
					
				document.getElementById("bottom_content").innerHTML = wstrHTML;
			//	document.getElementById("blast_Button").style.margin = '10px 0 0 0';
				break;
			}
			case "ppt_blast":
			{
					id('link').className='icon-button link-icon1';
					id('live_blast').className='icon-button live-icon1';
					id('ppt').className='icon-button ppt-icon2';
					id('text').className='icon-button text-icon1';
					current_button = document.getElementById("ppt");
				if(reblast)
				{

					id("blast_page_header").innerText="Powerpoint Blast";
					id("blast_page_header").style.marginLeft='82px';
					document.getElementById("bottom_content").style.display = "block";
					
					wstrHTML += "<div id=\"ppt_blast\" class=\"LinkBlast\">";
					wstrHTML += "<input id=\"name_input\" style='background: url(img/input_filed_blastscreen.png); margin-top: 25px; width:238px; height: 24px; border: 0;'></input>";
					wstrHTML +="<br></br>";
					wstrHTML += "<input id =\"url_input\" style='background: url(img/input_filed_blastscreen.png);width:238px; height: 24px; border: 0;'></input>";
					wstrHTML +="<br></br>";
					wstrHTML += "</div>";
				
					document.getElementById("bottom_content").innerHTML = wstrHTML;
				}
				else
				{

					if(BACKGROUND.getTokenString()==0)
					{
						return;
					}
					id("blast_page_header").innerText="Powerpoint Blast";
					id("blast_page_header").style.marginLeft='82px';
					//document.getElementById("blast_Button").style.display = "none";
					var strHTML ='';
					document.getElementById("bottom_content").style.display = "block";
					wstrHTML += "<div id=\"ppt_blast\" style=\" display: block; margin: 0 auto 0 40px;\">";
					//wstrHTML += "<span>Upload a PowerPoint Presentation</span>";
					wstrHTML += "<form id=\"ppt_form\" enctype=\"multipart/form-data\" method=\"post\" action=\"http://pptuploader.covu.com:8085/dev/UploadAndConvert.ashx\" target=\"ppt_response_frame\">";
					wstrHTML += "<span id='ppt_file_warning' class='warning' style='display: none;'>* please select the file first.</span>";
					wstrHTML +="<div class='fileinputs'>";
					wstrHTML += "<input id=\"ppt_file\" class='file' type=\"file\" name=\"filename\" onchange=\"ppt_filename()\" accept='application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation'  style=\" margin: 25px 0 0 0px;\" />";
					wstrHTML +="<div class='fakefile'><input placeholder='................... ....' id='fakefile' style='background: url(img/input_filed_blastscreen.png); width:238px; height: 24px; border: 0; margin: 25px 0 5px 0px;'/><img src='img/pptBrowse.png'  style=' margin: -29px 0 40px; 40px; padding-left: 0px;' /></div></div>";

					wstrHTML += "<input placeholder=\" Title...\" type=\"text\" id=\"title_bar\" style='background: url(img/input_filed_blastscreen.png); width:238px; height: 24px; border: 0; margin: 20px 0 5px 0px;' name=\"blast_title\" />";
					
					wstrHTML += "<input   id='pptSubmit'  onclick=\"pptUpload()\"  type=\"submit\" style=\" background:url() no-repeat; width:112px; height: 38px; margin: 10px auto 0 0px; border:none; cursor: pointer; display:none;\"  name=\"Submit\" />";
					wstrHTML += "<input type=\"reset\" onclick=\"cancel_ppt()\" style=\" background:url() no-repeat; width:112px; height: 38px; margin: -38px auto 0 130px; border:none; cursor: pointer; display:none;\" value='' />";
					wstrHTML += "</form>";
					wstrHTML += "</div>";
					//wstrHTML += "<img style='width: 80px; height: 35px; margin-left:120px; cursor:pointer;'src='img/box.png' onclick='showBoxNet();'/>"
					document.getElementById("bottom_content").innerHTML = wstrHTML;
					
					strHTML += "<input id=\"message_ppt\" type=\"hidden\" value=\""+ document.getElementById("message_input").value +"\" name=\"blast_message\" />";
					strHTML += "<input type=\"hidden\" value=\""+ BACKGROUND.login_session_key +"\" name=\"login_session_key\" />";
					strHTML += "<input type=\"hidden\" value=\""+ BACKGROUND.leader_id +"\" name=\"covu_id\" />";
					strHTML += "<input  id=\"who_ppt\" type=\"hidden\" value=\""+ document.getElementById("to_box").value +"\" name=\"recipient_name\" />";
					
					document.getElementById("ppt_form").innerHTML += strHTML;
					if(BACKGROUND.ppt_uploading)
					{
						showPPTLoadingScreen();
						return;
					}
					}
				break;
			}
			case "video_blast":
			{
				getTabTitleAndUrl("video");
				document.getElementById("bottom_content").style.display = "block";
				
				wstrHTML += "<div id=\"Video_blast\" class=\"LinkBlast\">";
				wstrHTML += "<span>Video Name</span><input id=\"video_name\" style='background: url(img/input_filed_blastscreen.png); width: 238px; height: 24px; border: 0;'/>";
				wstrHTML += "<br/><br/>";
				wstrHTML += "<span>Video URL</span><input id=\"video_url\" style='background: url(img/input_filed_blastscreen.png); width: 238px; height: 24px; border: 0;'/>";
				wstrHTML += "<br/><br/>";
				wstrHTML += "</div>";
				
				document.getElementById("bottom_content").innerHTML = wstrHTML;
				document.getElementById("message_input").disabled = 'disabled';
				document.getElementById("message_input").value = "";
				//document.getElementById("blast_Button").style.margin = '0 0 0 0';
				break;
				
			}
			default:
			{
				break;
			}
			
		}
		return true;
	}
		function reblast(id)
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
			
				try
				{
					type = blast[i].getElementsByTagName("type")[0].childNodes[0].nodeValue;
				}
				catch(e)
				{
				}
			
				var content="";
				
				try
				{
					content = blast[i].getElementsByTagName("content")[0].childNodes[0].nodeValue;
					content=decodeData(content);
					content=getDivContent(content);
				}
				catch(e)
				{
					content="";
				}
				showBlastofType(type);
				showScreen('blast_page');
				
				document.getElementById('blast_page_header').innerText = 'Blast';
				document.getElementById('blast_Button').src = 'img/320x480_send_blast_button.png';
				if(document.getElementById('token-input-to_box').getAttribute('placeholder')=='Who:')
					document.getElementById('token-input-to_box').setAttribute('placeholder', 'To:');
				is_live = false;	
				
				switch(type)
				{
					case "link":
						var notes="";
						var title="";
						//if(blast_type_content('link_message',true))
						//{
							try{	
								notes = blast[i].getElementsByTagName("memo")[0].childNodes[0].nodeValue;
								notes=decodeData(notes);
								notes=getDivContent(notes);
							}
							catch(e)
							{
								notes="";
							}
							try{
								title = decodeData(blast[i].getElementsByTagName("title")[0].childNodes[0].nodeValue);
								title=getDivContent(title);
							}
							catch(e)
							{
								title="";
							}
							$("#message_input").val(notes);
							$("#name_input").val(title);				
							$("#url_input").val(content);
							
							document.getElementById('link').className='link-icon2';
							document.getElementById('link_bottom_content').style.display='block';
							saveBlastType('link');
							saveBlastMessage();
						break;

					case "ppt":
						if(blast_type_content('ppt_blast',true))
						{
							try{	
								notes = decodeData(blast[i].getElementsByTagName("memo")[0].childNodes[0].nodeValue);
								notes=getDivContent(notes);
							//	notes= notes.replace(/\n/g, "<br />");
							//	notes=unescape(notes);
							}
							catch(e)
							{
								notes="";
							}
							try{
								title = decodeData(blast[i].getElementsByTagName("title")[0].childNodes[0].nodeValue);
								title=getDivContent(title);
							}
							catch(e)
							{
								title="";
							}
							$("#message_input").val(notes);
							$("#name_input").val(title);				
							$("#url_input").val(content);	
						}
						break;
						case "session":
						if(blast_type_content('live_blast',true))
						{
							var notes="";
							var name="";
							try{	
								notes = decodeData(blast[i].getElementsByTagName("notes")[0].childNodes[0].nodeValue);
								notes=decodeData(notes);
								notes=getDivContent(notes);
							}
							catch(e)
							{
								notes="";
							}
							try{
								name = decodeData(blast[i].getElementsByTagName("name")[0].childNodes[0].nodeValue);
								name=getDivContent(name);
							}
							catch(e)
							{
								name="";
							}
							$("#message_input").val(notes);
							$("#leadSessionName").val(name);	
						}
							break;
						case "message":
							showScreen('blast_page');
							$("#message_input").val(content);
						default: 
				}
			}
		}
	}
	
	function mouseOver()
	{
		if(document.getElementById("b1").alt=="off" || document.getElementById("b1").alt=="off1" )
		{
			document.getElementById("b1").src="img/footer_live_button_off_1.png";	
			document.getElementById("b1").alt='off1'
		}
		else
		{
			document.getElementById("b1").src="img/footer_live_button_on_1.png";
			document.getElementById("b1").alt='on1'
		}
	}
	function resetLiveToggle()
	{
			// document.getElementById("b1").src ="img/footer_live_button_off.png";
			// document.getElementById("b1").alt='off'
			// id('blast_page_header').innerText='Blast';
			// id("blast_page_header").style.marginLeft='137px';
			// saveLive(false);
	}
	function mouseOut()
	{
		if(document.getElementById("b1").alt=="off" || document.getElementById("b1").alt=="off1" )
		{
			document.getElementById("b1").src ="img/footer_live_button_off.png";
			document.getElementById("b1").alt='off';
		}
		else
		{
			document.getElementById("b1").src ="img/footer_live_button_on.png";	
			document.getElementById("b1").alt='on'
		}
	}
	function onLive()
	{
		if(document.getElementById("b1").alt=="off" || document.getElementById("b1").alt=="off1" )
		{
			document.getElementById("b1").src ="img/footer_live_button_on.png";
			document.getElementById("b1").alt='on'
			id('blast_page_header').innerText='Live Blast';
			id("blast_page_header").style.marginLeft='115px';
			saveLive(true);
		}
		else
		{
			document.getElementById("b1").src ="img/footer_live_button_off.png";
			document.getElementById("b1").alt='off'
			id('blast_page_header').innerText='Blast';
			id("blast_page_header").style.marginLeft='137px';
			saveLive(false);
		}
	
	}
