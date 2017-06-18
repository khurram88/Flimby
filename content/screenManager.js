var is_live = false;
const BACKGROUND = chrome.extension.getBackgroundPage();

document.addEventListener('DOMContentLoaded', function () 
{
	document.getElementById('signInButton').addEventListener('click', toggleSignIn);
	document.getElementById('signUpCoVuID').addEventListener('blur', checkCoVuID);
	document.getElementById('signUpButton').addEventListener('click', toggleSignIn);
	document.addEventListener('click', ScreenToggle);
	document.addEventListener('click', nxtPage);
	document.getElementById('prevScreen').addEventListener('click', onPreviousScreen);
	document.getElementById('blast_Button').addEventListener('click', submitBlast);
	document.getElementById('link').addEventListener('click', function(){
		blast_type('link_message',event)
		});
	document.getElementById('message_input').addEventListener("cut", pasteMessageHandler , false);
	document.getElementById('message_input').addEventListener("paste", pasteMessageHandler , false);
	document.getElementById('message_input').addEventListener("keyup", saveBlastMessage , false);
	document.getElementById('message_input').addEventListener("change", saveBlastMessage , false);
	document.getElementById('message_input').addEventListener("focus", saveBlastMessage , false);
//	document.getElementById('join_code_footer').addEventListener("keypress", JoinCodeFooter_Press , false);
	//document.getElementById('covu_friends').addEventListener('dblclick', covu_lead);
	//document.getElementById('covu_img').addEventListener('click', covu_lead);
	//document.getElementById('recent_stop').addEventListener('click', closeLeaderSession);
	//document.getElementById('notify_join_btn').addEventListener('click', notify_follow);
 
});

function nxtPage (event)
{
	var elem= event.target;
	
	if(elem.id=="helpQuitBtn" || elem.id=="helpQuitBtn2" || elem.id=="helpQuitBtn3" || elem.id=="helpQuitBtn4" || elem.id=="helpQuitBtn5" || elem.id=='launchButton')
	{
		goto_next_help_page("5");
	}
	else if(elem.id=="helpStrtBtn")
	{
		goto_next_help_page("1");
	}
	else if(elem.id=="helpBackBtn" || elem.id=="helpBackBtn2") 
	{
		goto_next_help_page("0");
	}
	else if(elem.id=="helpNxtBtn" || elem.id=="helpNxtBtn" || elem.id=="helpNxtBtn3")
	{
		goto_next_help_page("2");
	}
	else if(elem.id=="helpNxtBtn2" || elem.id=="helpBackBtn3")
	{
		goto_next_help_page("3");
	}
	else if(elem.id=="helpNxtBtn4")
	{
		goto_next_help_page("4");
	}
	else if(elem.id=="PopupHelpIcn")
	{
		goto_next_help_page("6");
	}
}


function ScreenToggle (event)
{
	var elem = event.target;
	
	if(elem.id=="streamBtn")
	{
		showScreen('screen_home');
	}
	else if(elem.id=="peopleBtn" || elem.id=="peopleFooter")
	{
		showScreen('screen_people');
	}
	else if(elem.id=="groupBtn" || elem.id=="groupFooter")
	{
		showScreen('screen_groups');
	}
	else if(elem.id=="profileBtn")
	{
		showScreen('screen_profile');
	}
	else if(elem.id=="CoVuBtn" || elem.id=="CoVuTxt")
	{
		covu_page();
	}
	else if(elem.id=="shareBtn")
	{
		showScreen('screen_share');
	}
	else if(elem.id=="dashBtn")
	{
		showScreen('screen_dashboard');
	}
	else if(elem.id=="configBtn")
	{
		showScreen('configuration_page');
	}
	else if(elem.id=="helpBtn")
	{
		showScreen('help_pages');
	}
	else if(elem.id=="HomeFooter")
	{
		onHomeButton();
	}
	else if(elem.id=="streamFooter")
	{
		getPersonalBlasts();
	}
	else if(elem.id=="blastFooter")
	{
		blast_page();
	}
	
	else if(elem.id=="blastFooter")
	{
		blast_page();
	}
}




	function showPPTBlastScreen()
	{
		id("screen_default").style.display = 'none';
		id("screen_home").style.display = 'none';
		id("settings_page").style.display = 'none';
		id("conversation").style.display = 'none';
		id("configuration_page").style.display = 'none';
		id("homeFooter").style.display= 'block';
		id("footer_display").style.display= 'none';
		id("blast_page").style.display = 'block';
		blast_type_content('ppt_blast'); 
	}
	function showSignInScreen(show,error)
	{
		if(show)
		{
			showScreen('screen_signIn');

			id("signInCoVuID").focus();
			if(error)
			{
				id('signInPassword').value="";
				id('signInCoVuID').value="";
				id('login_warning').style.display = 'block';
				id('login_warning').innerText=error;
			}
			else
			{
				id('login_warning').style.display = 'none';
			}
		}
		else
		{
			id("screen_signIn").style.display = 'none';
		}
	}
		function checkCoVuID()
	{
		allowSubmit=false;
		if(id("signUpCoVuID").value.length<3 || id("signUpCoVuID").value.length>32)
		{
			clearCoVuIDAlerts();
			id("warning_lengthCharacters").style.display='block';
			return;
		}
		id("warning_lengthCharacters").style.display='none';
		var pattern=/^([a-zA-Z0-9])+([a-zA-Z0-9_.-])+([a-zA-Z0-9])$/;
		id("warning_notAvailable").style.display = 'none';
		if(pattern.test(id("signUpCoVuID").value))
		{
			clearCoVuIDAlerts();
			id("warning_wait").style.display = 'block';
			isCoVuID(id("signUpCoVuID").value);
		}
		else
		{
			var pattern=/^([a-zA-Z0-9]+)$/
			if(pattern.test(id("signUpCoVuID").value[0]) & pattern.test(id("signUpCoVuID").value[id("signUpCoVuID").value.length-1]))
			{
				clearCoVuIDAlerts();
				id("warning_allowCharacters").style.display = 'block';
				id("warning_allowCharacters1").style.display= 'none';
			}
			else
			{
				clearCoVuIDAlerts();
				id("warning_allowCharacters1").style.display= 'block';
				id("warning_allowCharacters").style.display= 'none';
			}
		}
	}
	
	function toggleSignIn()
	{
		if(id("screen_signUp").style.display == 'block')
		{
			id("screen_signUp").style.display = 'none';
			showSignInScreen(true);
		}
		else
		{
			id("screen_signUp").style.display = 'block';
			showSignInScreen(false);
		}
	}
	
	function resetSignUpFields()
	{
		id("warning_first_name").style.  display="none";
		id("warning_last_name").style. display="none";
		id("warning_password").style.  display="none";
		//id("signUpConfirmPassword").style. backgroundImage="url(img/input.png)";
		id("warning_email_address").style. display="none";
		id("warning_lengthCharacters").style. display="none";
		id("warning_missing_fields").style.display='none';
		id("warning_confirm_password").style.display="none";
		id("warning_lengthPassword").style.display="none";
	}
	
	function validateSignUp()
	{
		resetSignUpFields();
		var missing_field=false;
		if(id("signUpFirstName").value.length<1)
		{
			id("warning_first_name").style. display="block";
			missing_field=true;
		}
		if(id("signUpLastName").value.length<1)
		{
			id("warning_last_name").style. display="block";
			missing_field=true;
		}
		if(id("signUpPassword").value.length<1)
		{
			id("warning_password").style. display="block";
			missing_field=true;
		}
		if(id("signUpConfirmPassword").value.length<1)
		{
			missing_field=true;
		}
		if(id("signUpEmail").value.length<1)
		{
			id("warning_email_address").style. display="block";		
			missing_field=true;
		}
		if(id("signUpCoVuID").value.length<1)
		{
			id("warning_lengthCharacters").style. display="block";		
			missing_field=true;
		}
		
		if(missing_field)
		{
			id("warning_missing_fields").style.display='block';
		}
		if(id("signUpPassword").value.length<6 || id("signUpPassword").value.length>32)
		{
			id("warning_password").style.display="block";
			missing_field=true;
		}
		else if(id("signUpConfirmPassword").value!=id("signUpPassword").value)
		{
		
			id("warning_confirm_password").style.display="block";
			missing_field=true;
		}
		return missing_field;
	}
		function showSignIn()
	{
		validateSignUp();
		id("screen_wait").style.display='none';
		showSignInScreen(true);
		BACKGROUND.logIn(BACKGROUND.member_id,BACKGROUND.pwd);

	}
	
	function showLogin()
	{
		if(BACKGROUND.blastResults!=null)
			contentView(BACKGROUND.blastResults);
			
		id("myCoVuID").innerText ="/"+BACKGROUND.leader_id;
		showScreen('screen_default');
	/*	id("screen_wait").style.display='none';
		id("screen_signIn").style.display = 'none';
		id("screen_main").style.display='block';
		id("leadInfoBox").style.display='none';
		id("homeFooter").style.display = 'block';*/
		onLeadContainerResize();
		//show_help_pages();	
	}
		
	function showLead()
	{
		id("leadInfoSessionName").innerText=BACKGROUND.sessionName;
		
		//onLeadContainerResize2();
		id("leadInfoBox").style.display='block';
		if(id("leadInfoBox").style.display=='block')
		{
			showScreen("screen_home");
		}
		
	}
	function showErrorAlert(errorText)
	{
		$.noticeAdd({text:errorText, title: 'Just saying hi', position: 'bottom', type: 'error', stay: false});
	}
	function onPreviousScreen()
	{
		showScreen(getPrevScreen(),getPrevType())
	}
	function screenSelected(value,type)
	{
		//id("blastFooter").style.marginTop='-68px';
		switch(value){
				case"screen_default":
				{
					id("streamFooter").src = 'img/footer-icon-stream.png';
					id("blastFooter").src = 'img/320x480_blast_button.png';
					id("peopleFooter").src = 'img/footer-icon-people.png';
					id("groupFooter").src= 'img/footer-icon-group.png'		
				}
				case"screen_home":
				{
					id("streamFooter").src = 'img/footer_icon_stream_selected.png';
					id("blastFooter").src = 'img/320x480_blast_button.png';
					id("peopleFooter").src = 'img/footer-icon-people.png';
					id("groupFooter").src= 'img/footer-icon-group.png';
					break;				
				}
				case"blast_page":
				{
					id("streamFooter").src = 'img/footer-icon-stream.png';
					//id("blastFooter").src = 'img/footer_icon_blast_selected.png';
					//id("blastFooter").style.marginTop='-67px';
					id("peopleFooter").src = 'img/footer-icon-people.png';
					id("groupFooter").src= 'img/footer-icon-group.png';
					break;
				}
				case"settings_page":
				{
					id("streamFooter").src = 'img/footer-icon-stream.png';
					id("blastFooter").src = 'img/320x480_blast_button.png';
					id("peopleFooter").src = 'img/footer-icon-people.png';
					id("groupFooter").src= 'img/footer-icon-group.png';
					
					if(type=="groups")
					{
						id("groupFooter").src= 'img/footer_icon_groups-selected.png';
					}
					else if(type=="people")
					{
						id("peopleFooter").src = 'img/footer_icon_people_active.png';
					}
					break;				
				}
				case "screen_people":
				{
					id("streamFooter").src = 'img/footer-icon-stream.png';
					id("blastFooter").src = 'img/320x480_blast_button.png';
					id("peopleFooter").src = 'img/footer-icon-people.png';
					id("groupFooter").src= 'img/footer-icon-group.png';
					id("peopleFooter").src = 'img/footer_icon_people_active.png';
					break;				
				}
				case 'screen_add_groups' :
				case 'screen_group_detail' :
				case 'screen_group_edit':
				case "screen_groups" :
				{
					id("streamFooter").src = 'img/footer-icon-stream.png';
					id("blastFooter").src = 'img/320x480_blast_button.png';
					id("peopleFooter").src = 'img/footer-icon-people.png';
					id("groupFooter").src= 'img/footer-icon-group.png';
					id("groupFooter").src= 'img/footer_icon_groups-selected.png';
					break;				
				}
				case "conversation":
				{
					id("streamFooter").src = 'img/footer-icon-stream.png';
					id("blastFooter").src = 'img/320x480_blast_button.png';
					id("peopleFooter").src = 'img/footer-icon-people.png';
					id("groupFooter").src= 'img/footer-icon-group.png'
					break;				
				}	
				default:
				{
					id("streamFooter").src = 'img/footer-icon-stream.png';
					id("blastFooter").src = 'img/320x480_blast_button.png';
					id("peopleFooter").src = 'img/footer-icon-people.png';
					id("groupFooter").src= 'img/footer-icon-group.png'	
					break;
				}
			}
	}
	function resetMobilePages()
	{
		/*id("people_content").src="";
		id("groups_content").src="";
		id("profile_content").src="";
		id("dashboard_content").src="";
		id("help_content").src="";*/
	}
	function showScreen(value,type)
	{
		resetMobilePages();
		reset_vars();
		screenSelected(value,type);
		if(value!='friend_profile_page')
			BACKGROUND.historyManager.setScreen(value);
		id('friend_profile_page').style.display='none';
		switch(value){
			
			case"screen_signIn":
			{
				id('login_warning').style.display = 'none';
				id("screen_main").style.display = 'none';
				id("screen_home").style.display = 'none';
				id("settings_page").style.display = 'none';
				id("conversation").style.display = 'none';
				id("configuration_page").style.display = 'none';
				id("info_page").style.display = 'none';	
				id("footer_display").style.display= 'none';
				id('screen_wait').style.display='none';
				id('screen_signUp').style.display='none';	
				id("blast_page").style.display = 'none';
				id("screen_default").style.display = 'none';
				id("homeFooter").style.display= 'block';
				id('screen_signIn').style.display='block';
				id("welcome-screen").style.display="none";
				id("add-groupHeader").style.display = 'none';
				id("groups_page").style.display = 'none';
				id("content-container-group").style.display = 'none';
				break;				
			}
			case"screen_default":
			{

				id("searchKeywords").style.display = "block";
				id("screen_home").style.display = 'none';
				id("settings_page").style.display = 'none';
				id("conversation").style.display = 'none';
				id('screen_wait').style.display='none';
				id("configuration_page").style.display = 'none';
				id("info_page").style.display = 'none';	
				id("homeFooter").style.display= 'block';
				
				//id("homeFooter").style.display= 'block';
				id("footer_display").style.display= 'none';
				id("blast_page").style.display = 'none';
				id("screen_main").style.display = 'block';
				id("screen_default").style.display = 'block';
				id("welcome-screen").style.display="none";
				id("add-groupHeader").style.display = 'none';
				id("groups_page").style.display = 'none';
				id("content-container-group").style.display = 'none';
				showNotification();
				show_help_pages();
				break;				
			}
			case"help_pages":
			{
				document.getElementById("new_member_help").style.display = "block";
				document.getElementById("help_page_1").style.display = "block";
				id("searchKeywords").style.display = "none";
				break;
			}
			case"screen_home":
			{	
				if(id("leadInfoBox").style.display=='block')
				{
					id('searchListingContainer').style.maxHeight='270px';
				}
				else
					id('searchListingContainer').style.maxHeight='370px';
					
				id("screen_default").style.display = 'none';
				id("screen_home").style.display = 'none';
				id("blast_page").style.display = 'none';
				id("settings_page").style.display = 'none';
				id('conversation').style.display = 'none';
				id("configuration_page").style.display = 'none';
				id("info_page").style.display = 'none';	
				id("screen_main").style.display = 'block';
				id("homeFooter").style.display= 'block';
				id("footer_display").style.display= 'block';
				id("screen_home").style.display = 'block';
				id("welcome-screen").style.display="none";
				id("add-groupHeader").style.display = 'none';
				id("groups_page").style.display = 'none';
				id("content-container-group").style.display = 'none';
				//clear converstation screen text
				id('blastReply').value='';
				saveReply();
				//onLeadContainerResize2();
				id('searchListingContainer').scrollTop =search_scroll;
				
				if(BACKGROUND.search_from_home==true)
				{
					BACKGROUND.getRecentBlasts();
				}
				else
				{
					if(BACKGROUND.search_id!='' && BACKGROUND.searchblastfromFooter==false)
					{
						BACKGROUND.getLocalBlasts(BACKGROUND.search_id);
					}
					else
					{
						BACKGROUND.getRecentBlasts();
					}
				}
				
				
				if(BACKGROUND.blastResults!=null) {
					//contentView(BACKGROUND.blastResults);
				}
				id('searchListingContainer').scrollTop =search_scroll;
				
				break;				
			}
			case "covu_page":
			{
				document.getElementById('blast_page_header').innerText = 'CoVu';
				document.getElementById('blast_Button').src = 'img/320x480_start_covu_button.png';
				if(document.getElementById('token-input-to_box').getAttribute('placeholder')=='To:')
					document.getElementById('token-input-to_box').setAttribute('placeholder', 'Who:');
			}
			case"blast_page":
			{
			//	$.noticeAdd({text:'hello world', title: 'Just saying hi', position: 'center', stay: true});
				id("screen_default").style.display = 'none';
				id("screen_home").style.display = 'none';
				id("settings_page").style.display = 'none';
				id("conversation").style.display = 'none';
				id("configuration_page").style.display = 'none';
				id("info_page").style.display = 'none';	
				id("screen_main").style.display = 'block';
				id("homeFooter").style.display= 'block';
				id("footer_display").style.display= 'none';
				id("blast_page").style.display = 'block';
				id("welcome-screen").style.display="none";
				id("add-groupHeader").style.display = 'none';
				id("groups_page").style.display = 'none';
				id("content-container-group").style.display = 'none';
				//$("#to_box").tokenInput("clear");
			//	list=$("#to_box").tokenInput("get");
			//	$("#to_box").tokenInput("add",list[0]);
			//	hide_arrows();
			//	blast_type(''); //this function call is needed to change to make sure the blast icon defaults to blast message

				break;
			}
			case "settings_page":
			{
				id("screen_default").style.display = 'none';
				id("screen_home").style.display = 'none';
				id("blast_page").style.display = 'none';
				id("conversation").style.display = 'none';
				id("configuration_page").style.display = 'none';
				id("info_page").style.display = 'none';	
				id("screen_main").style.display = 'block';
				id("homeFooter").style.display= 'block';
				id("footer_display").style.display= 'block';
				id("settings_page").style.display = 'block';
				id("welcome-screen").style.display="none";
								id("add-groupHeader").style.display = 'none';
				id("groups_page").style.display = 'none';
				id("content-container-group").style.display = 'none';
				break;				
			}
			case "configuration_page":
			{				
				id("screen_default").style.display = 'none';
				id("screen_home").style.display = 'none';
				id("blast_page").style.display = 'none';
				id("conversation").style.display = 'none';
				id("info_page").style.display = 'none';	
				id("add-groupHeader").style.display = 'none';
				id("groups_page").style.display = 'none';
				id("content-container-group").style.display = 'none';
				id("screen_main").style.display = 'block';
				id("homeFooter").style.display= 'block';
				id("footer_display").style.display= 'block';
				id("settings_page").style.display = 'none';
				id("privat_profile").checked=BACKGROUND.getProfilePrivate();
				id("alert_sound").checked=BACKGROUND.getSoundEnable();
				id("welcome-screen").style.display="none";
				id("configuration_page").style.display = 'block';

				break;	
			}
			case "conversation":
			{
				id("screen_default").style.display = 'none';
				id("screen_home").style.display = 'none';
				id("blast_page").style.display = 'none';
				id("settings_page").style.display = 'none';
				id("configuration_page").style.display = 'none';
				id("info_page").style.display = 'none';	
				id("add-groupHeader").style.display = 'none';
				id("groups_page").style.display = 'none';
				id("content-container-group").style.display = 'none';
				id("screen_main").style.display = 'block';
				id("homeFooter").style.display= 'block';
				id("footer_display").style.display= 'block';
				id("conversation").style.display = 'block';
				id("welcome-screen").style.display="none";

				if(BACKGROUND.blast_replies)
					conversationView(BACKGROUND.blast_replies,clicked_blast_id);


									
				break;				
			}
			case "screen_people":
			{
				id("screen_default").style.display = 'none';
				id("screen_home").style.display = 'none';
				id("blast_page").style.display = 'none';
				id("conversation").style.display = 'none';
				id("configuration_page").style.display = 'none';
				id("add-groupHeader").style.display = 'none';
				id("Detail-groupHeader").style.display = 'none';
				id("content-container-groupdetail").style.display = 'none';
				id("groups_page").style.display = 'none';
				id("content-container-group").style.display = 'none';
				id("info_page").style.display = 'none';	
				id("screen_main").style.display = 'block';
				id("homeFooter").style.display= 'block';
				id("footer_display").style.display= 'block';
				id("settings_page").style.display = 'block';
				id("groups_page").style.display = 'none';
				id("dashboard_page").style.display = 'none';	
				id("profile_page").style.display = 'none';	
				id("help_page").style.display = 'none';
				id("welcome-screen").style.display="none";
				id("edit_profile").style.display="none";
				id("people_page").style.display = 'block';
				id("invite-content").style.display="none";
				loadPeopleInfo();

				break;
			}
			case 'screen_groups':
			{
				id("screen_default").style.display = 'none';
				id('search_group').value=''
				id("screen_home").style.display = 'none';
				id("blast_page").style.display = 'none';
				id("warning_lengthCharacters_group").style.display = 'none';
				id("warning_wait_group").style.display = 'none';
				id("warning_allowCharacters_group").style.display = 'none';
				id("warning_allowCharacters1_group").style.display = 'none';
				id("warning_notAvailable_group").style.display = 'none';
				id("create_group_name").style.borderColor = '#666666';
				id('create_group_covu_id').value='';
				id('create_group_name').value='';
				id('create_group_info').value='';
				id("content-container-searchpage").style.display = 'none';
				id("Search-page-groupHeader").style.display = 'none';
				id("conversation").style.display = 'none';
				id("configuration_page").style.display = 'none';
				id("Edit-groupHeader").style.display = 'none';
				id("content-container-editgroup").style.display = 'none';
				id("Detail-groupHeader").style.display = 'none';
				id("content-container-groupdetail").style.display = 'none';
				id("info_page").style.display = 'none';	
				id("screen_main").style.display = 'block';
				id("homeFooter").style.display= 'block';
				id("add-groupHeader").style.display = 'none';
				id("footer_display").style.display= 'block';
				id("settings_page").style.display = 'block';
				id("people_page").style.display = 'none';	
				id("dashboard_page").style.display = 'none';	
				id("profile_page").style.display = 'none';
				id("help_page").style.display = 'none';				
				id("groups_page").style.display = 'block';	
				id("welcome-screen").style.display="none";
				id("edit_profile").style.display="none";
				id("content-container-group").style.display = 'none';
				id("content-containergroup").style.display = 'block';
				id("group-searchfield").style.display = 'block';
				id("header-group").style.display = 'block';
				id("people_content").src="";
				BACKGROUND.groupScreen.getMyGroups();
				
				break;
			}
			case 'screen_add_groups':
			{
			//Set screen to groups until history is not implemented
				BACKGROUND.historyManager.setScreen('screen_groups');
				id("screen_default").style.display = 'none';
				id("screen_home").style.display = 'none';
				id("header-group").style.display = 'none';
				id("content-container-searchpage").style.display = 'none';
				id("Search-page-groupHeader").style.display = 'none';
				id("content-container-editgroup").style.display = 'none';
				id("Edit-groupHeader").style.display = 'none';
				id("add-groupHeader").style.display = 'block';
				id("Detail-groupHeader").style.display = 'none';
				id("content-container-groupdetail").style.display = 'none';
				id("group-searchfield").style.display = 'none';
				id("blast_page").style.display = 'none';
				id("conversation").style.display = 'none';
				id("configuration_page").style.display = 'none';
				id("info_page").style.display = 'none';	
				id("screen_main").style.display = 'block';
				id("homeFooter").style.display= 'block';
				id("footer_display").style.display= 'block';
				id("settings_page").style.display = 'block';
				id("people_page").style.display = 'none';	
				id("dashboard_page").style.display = 'none';	
				id("profile_page").style.display = 'none';
				id("help_page").style.display = 'none';				
				id("groups_page").style.display = 'block';
				id("content-container-group").style.display = 'block';
				//id("create_group_covu_id").focus();
				id("welcome-screen").style.display="none";
				id("content-containergroup").style.display="none";
				id("edit_profile").style.display="none";
				
					break;
			}
			
			case 'screen_group_detail':
			{
						//Set screen to groups until history is not implemented
				BACKGROUND.historyManager.setScreen('screen_groups');
				id("screen_default").style.display = 'none';
				id("screen_home").style.display = 'none';
				id("header-group").style.display = 'none';
				id("add-groupHeader").style.display = 'none';
				id("content-container-searchpage").style.display = 'none';
				id("Search-page-groupHeader").style.display = 'none';
				id("Edit-groupHeader").style.display = 'none';
				id("content-container-editgroup").style.display = 'none';
				id("Detail-groupHeader").style.display = 'block';
				id("content-container-groupdetail").style.display = 'block';
				id("group-searchfield").style.display = 'none';
				id("blast_page").style.display = 'none';
				id("conversation").style.display = 'none';
				id("configuration_page").style.display = 'none';
				id("info_page").style.display = 'none';	
				id("screen_main").style.display = 'block';
				id("homeFooter").style.display= 'block';
				id("footer_display").style.display= 'block';
				id("settings_page").style.display = 'block';
				id("people_page").style.display = 'none';	
				id("dashboard_page").style.display = 'none';	
				id("profile_page").style.display = 'none';
				id("help_page").style.display = 'none';				
				id("groups_page").style.display = 'block';
				id("content-container-group").style.display = 'none';
				id("welcome-screen").style.display="none";
				id("content-containergroup").style.display="none";
				id("invite-content-group").style.display="none";
				id("edit_profile").style.display="none";
				id('content-container-groupdetail').style.display='block';
				break;
			}
			case 'friend_profile_page':
			{
								id('dropdownlist_editgroup').style.display='none';
				id("screen_default").style.display = 'none';
				id("screen_home").style.display = 'none';
				id("header-group").style.display = 'none';
				id("add-groupHeader").style.display = 'none';
				id("content-container-searchpage").style.display = 'none';
				id("Search-page-groupHeader").style.display = 'none';
				id("Detail-groupHeader").style.display = 'none';
				id("content-container-groupdetail").style.display = 'none';
				id("Edit-groupHeader").style.display = 'block';
				id("content-container-editgroup").style.display = 'none';
				id("group-searchfield").style.display = 'none';
				id("blast_page").style.display = 'none';
				id("conversation").style.display = 'none';
				id("configuration_page").style.display = 'none';
				id("info_page").style.display = 'none';	
				id("screen_main").style.display = 'block';
				id("homeFooter").style.display= 'block';
				id("footer_display").style.display= 'block';
				id("settings_page").style.display = 'block';
				id("people_page").style.display = 'none';	
				id("dashboard_page").style.display = 'none';	
				id("profile_page").style.display = 'none';
				id("help_page").style.display = 'none';				
				id("groups_page").style.display = 'none';
				id("content-container-group").style.display = 'none';
				id("welcome-screen").style.display="none";
				id("content-containergroup").style.display="none";
				
				id("edit_profile").style.display="none";
				id('content-container-groupdetail').style.display='none';
				id('friend_profile_page').style.display='block';
				break;
			}
			case 'screen_group_edit':
			{
						//Set screen to groups until history is not implemented
				BACKGROUND.historyManager.setScreen('screen_groups');
				id('dropdownlist_editgroup').style.display='none';
				id("screen_default").style.display = 'none';
				id("screen_home").style.display = 'none';
				id("header-group").style.display = 'none';
				id("add-groupHeader").style.display = 'none';
				id("content-container-searchpage").style.display = 'none';
				id("Search-page-groupHeader").style.display = 'none';
				id("Detail-groupHeader").style.display = 'none';
				id("content-container-groupdetail").style.display = 'none';
				id("Edit-groupHeader").style.display = 'block';
				id("content-container-editgroup").style.display = 'block';
				id("group-searchfield").style.display = 'none';
				id("blast_page").style.display = 'none';
				id("conversation").style.display = 'none';
				id("configuration_page").style.display = 'none';
				id("info_page").style.display = 'none';	
				id("screen_main").style.display = 'block';
				id("homeFooter").style.display= 'block';
				id("footer_display").style.display= 'block';
				id("settings_page").style.display = 'block';
				id("people_page").style.display = 'none';	
				id("dashboard_page").style.display = 'none';	
				id("profile_page").style.display = 'none';
				id("help_page").style.display = 'none';				
				id("groups_page").style.display = 'block';
				id("content-container-group").style.display = 'none';
				id("welcome-screen").style.display="none";
				id("content-containergroup").style.display="none";
				
				id("edit_profile").style.display="none";
				id('content-container-groupdetail').style.display='none';
				groupController.loadEditNetworks();
				break;
			}
			
			case 'screen_profile':
			{
				id("groups_page").style.display = 'none';
				id("content-container-editgroup").style.display = 'none';
				id("screen_default").style.display = 'none';
				id("screen_home").style.display = 'none';
				id("blast_page").style.display = 'none';
				id("conversation").style.display = 'none';
				id("configuration_page").style.display = 'none';
				id("info_page").style.display = 'none';	
				id("screen_main").style.display = 'block';
				id("homeFooter").style.display= 'block';
				id("footer_display").style.display= 'block';
				id("settings_page").style.display = 'block';
				id("people_page").style.display = 'none';	
				id("groups_page").style.display = 'none';	
				id("dashboard_page").style.display = 'none';
				id("help_page").style.display = 'none';				
				id("profile_page").style.display = 'block';	
				id("welcome-screen").style.display="none";
				id("edit_profile").style.display="none";
				
				setProfileInfo(id("profile_page"));

				break;
			}
			
			case 'edit_profile':
			{
				id("profile_warning_phone_number").style.display = "none";
				id("screen_default").style.display = 'none';
				id("screen_home").style.display = 'none';
				id("blast_page").style.display = 'none';
				id("conversation").style.display = 'none';
				id("configuration_page").style.display = 'none';
				id("info_page").style.display = 'none';	
				id("screen_main").style.display = 'block';
				id("homeFooter").style.display= 'block';
				id("footer_display").style.display= 'block';
				id("settings_page").style.display = 'block';
				id("people_page").style.display = 'none';	
				id("groups_page").style.display = 'none';	
				id("dashboard_page").style.display = 'none';
				id("help_page").style.display = 'none';				
				id("profile_page").style.display = 'none';	
				id("welcome-screen").style.display="none";
				id("edit_profile").style.display="block";
				
				setProfileInfo(id("profile_page"));

				break;
			}
			
			
			case 'screen_dashboard':
			{

				
				BACKGROUND.getDashboardDetails();
				setTimeout(BACKGROUND.getGroupsForDashboard, 500);
				id("screen_default").style.display = 'none';
				id("screen_home").style.display = 'none';
				id("blast_page").style.display = 'none';
				id("conversation").style.display = 'none';
				id("configuration_page").style.display = 'none';
				id("info_page").style.display = 'none';	
				id("screen_main").style.display = 'block';
				id("homeFooter").style.display= 'block';
				id("footer_display").style.display= 'block';
				id("settings_page").style.display = 'block';
				id("people_page").style.display = 'none';	
				id("groups_page").style.display = 'none';	
				id("profile_page").style.display = 'none';
				id("help_page").style.display = 'none';
				id("dashboard_page").style.display = 'block';
				id("welcome-screen").style.display="none";
				id('edit_profile').style.display = 'none';
				var friends_container = id('member_container_rows');
				var groups_container = id('group_container_rows');
				friends_container.innerHTML='';
				groups_container.innerHTML='';
				if(BACKGROUND.profileScreen.admin=='true')
				{
					id('admin_button').style.display='block';
				}
				else
					id('admin_button').style.display='none';	
				//var peopleURL = unescape("http://"+BACKGROUND.url+"/login_by_session_key?login_session_key="+BACKGROUND.login_session_key+"&platform=app&initial_view=dashboard_page");
				//id("dashboard_content").src = peopleURL;
				break;
			}
			case 'screen_settings':
			{
				id("screen_default").style.display = 'none';
				id("screen_home").style.display = 'none';
				id("blast_page").style.display = 'none';
				id("conversation").style.display = 'none';
				id("settings_page").style.display = 'none';
				id("info_page").style.display = 'none';	
								id("screen_main").style.display = 'block';
				id("configuration_page").style.display = 'block';
								
				id("homeFooter").style.display= 'block';
				id("footer_display").style.display= 'block';
				id("welcome-screen").style.display="none";
				break;
			}
			case 'help_page':
			{
				id("screen_default").style.display = 'none';
				id("screen_home").style.display = 'none';
				id("blast_page").style.display = 'none';
				id("conversation").style.display = 'none';
				id("configuration_page").style.display = 'none';
				id("info_page").style.display = 'none';	
				id("screen_main").style.display = 'block';
				id("homeFooter").style.display= 'block';
				id("footer_display").style.display= 'block';
				id("settings_page").style.display = 'block';
				id("people_page").style.display = 'none';	
				id("groups_page").style.display = 'none';	
				id("profile_page").style.display = 'none';
				id("welcome-screen").style.display="none";
				id("dashboard_page").style.display = 'none';	
				id("help_page").style.display = 'block';
				
		
				//var peopleURL = unescape("https://chat2.livechatinc.com/licence/1075661/open_chat.cgi?lang=en&groups=0");
				//id("help_content").src = peopleURL;
				break;
			}
			case 'info_page':
			{
				id("screen_default").style.display = 'none';
				id("screen_home").style.display = 'none';
				id("blast_page").style.display = 'none';
				id("conversation").style.display = 'none';
				id("configuration_page").style.display = 'none';
				id("info_page").style.display = 'none';	
				id("screen_main").style.display = 'block';
				id("homeFooter").style.display= 'block';
				id("footer_display").style.display= 'block';
				id("settings_page").style.display = 'none';
				id("people_page").style.display = 'none';	
				id("groups_page").style.display = 'none';	
				id("profile_page").style.display = 'none';
				id("settings_app_version").innerText=getVersion();
				id("dashboard_page").style.display = 'none';	
				id("help_page").style.display = 'none';
				id("info_page").style.display = 'block';
				id("welcome-screen").style.display="none";
				break;
			}
		}
	}
	
	function openAddGroup()
	{
		id("header").style.display="none";
		id("searchbox-group").style.display="none";
		 id("content-container").style.display="none"; 
		id("add-groupHeader").style.display="block";
		
		id("content-container-group").style.display="block";
       
	}
		function show_help_pages(){
		
		if(BACKGROUND.new_member){
			document.getElementById("new_member_help").style.display = "block";
			document.getElementById("help_page_1").style.display = "block";
		} else{
			document.getElementById("new_member_help").style.display = "none";
		}
	}
	
	function goto_next_help_page(num){
		switch(num){
			case "0":
			{
				document.getElementById("new_member_help").style.display = 'block';
				document.getElementById("new_member_help_finish").style.display = 'none';
				document.getElementById("help_page_1").style.display = 'block';
				document.getElementById("help_page_2").style.display = 'none';
				break;
			}
			case "1":
			{
				document.getElementById("new_member_help").style.display = 'none';
				document.getElementById("new_member_help_finish").style.display = 'block';
				document.getElementById("help_page_1").style.display = "none";
				document.getElementById("help_page_3").style.display = 'none';
				document.getElementById("help_page_2").style.display = "block";
				break;	
			}
			case "2":
			{
				document.getElementById("help_page_2").style.display = 'none';
				document.getElementById("help_page_4").style.display = 'none';
				document.getElementById("help_page_3").style.display = 'block';
				break;
			}
			case "3":
			{
				document.getElementById("help_page_3").style.display = 'none';
				document.getElementById("help_page_5").style.display = 'none';
				document.getElementById("help_page_4").style.display = 'block';
				break;
			}
			case "4":
			{
				document.getElementById("help_page_4").style.display = 'none';
				document.getElementById("help_page_5").style.display = 'block';
				break;
			}
			case "5":
			{
				document.getElementById("new_member_help").style.display = 'none';
				document.getElementById("help_page_1").style.display = "none";
				document.getElementById("help_page_2").style.display = 'none';
				document.getElementById("help_page_3").style.display = 'none';
				document.getElementById("help_page_5").style.display = 'none';
				document.getElementById("help_page_4").style.display = 'none';
				document.getElementById("new_member_help_finish").style.display = 'none';
				id("searchKeywords").style.display = "block";
				BACKGROUND.new_member = false;
				break;
			}
			case "6":
			{
				document.getElementById("help_page_5").style.display = 'none';
				document.getElementById("new_member_help_finish").style.display = 'none';
				showScreen("help_page");
				BACKGROUND.new_member = false;
				break;
			}
		}
	}
	function blast_page()
	{
		
	/*	id("to_box").value="";
		id("message_input").value="";
		
		if(id("leadSessionName"))
			id("leadSessionName").value="";
			*/
		if(id("url_input"))
		{
			getTabTitleAndUrl("bookmark")
		}
		showScreen("blast_page");
		
		document.getElementById('blast_page_header').innerText = 'Blast';
		document.getElementById('blast_Button').src = 'img/320x480_send_blast_button.png';
		if(document.getElementById('token-input-to_box').getAttribute('placeholder')=='Who:')
			document.getElementById('token-input-to_box').setAttribute('placeholder', 'To:');
		is_live = false;
	}
	
	function covu_page() {
		if(id('url_input')){
			getTabTitleAndUrl('bookmark');
		}
		showScreen('covu_page');
		
		is_live = true;
	}
	
	function showConversationScreen(show)
	{
		if(show)
		{
			showScreen("conversation");
			document.getElementById("coversationListingContainer").innerHTML="";
		}
		else
		{
			showScreen("screen_home");
		}
	}
	function showPPTLoadingScreen()
	{
		id('link').className='icon-button link-icon1';
		id('live_blast').className='icon-button live-icon1';
		id('ppt').className='icon-button ppt-icon2';
		id('text').className='icon-button text-icon1';
		current_button = document.getElementById("ppt");
		document.getElementById("bottom_content").innerHTML = "<img src=\"img/spinny.gif\" width='150px;' height='130px' style=\"  margin: 10px 0 0 80px;\" />";
	
	}

	function setProfileInfo(profile_page)
	{
		var inputs=id('profile_form').getElementsByTagName("input");
		var phone=BACKGROUND.profileScreen.phone;
		for(var i=0;i<inputs.length;i++)
		{
			inputs[i].value='';
		}
		id('edit_avt').src=id('avt').src=BACKGROUND.profileScreen.avatar;
		id('profile_user_name').innerText=BACKGROUND.profileScreen.first_name+' '+BACKGROUND.profileScreen.last_name;
		id('edit_profile_f_name').value=BACKGROUND.profileScreen.first_name;
		id('edit_profile_l_name').value=BACKGROUND.profileScreen.last_name;
		id('profile_email_id').innerText=BACKGROUND.profileScreen.email_id;
		id('edit_profile_email_id').value=BACKGROUND.profileScreen.email_id;	
		id('profile_covu_id').innerText=BACKGROUND.profileScreen.covu_id;
		id('profile_location').innerText=BACKGROUND.profileScreen.location;
		id('edit_profile_phone_number').value=BACKGROUND.profileScreen.phone;
		id('edit_profile_location').value=BACKGROUND.profileScreen.location;
		
		if(phone.length=='10')	
		{
			var frstPair=phone.substring(0,phone.length-7);
			var scndPair=phone.substring(phone.length-7,phone.length-4);
			var lastPair=phone.substring(phone.length-4,phone.length);
			id('profile_phone_number').innerText="("+frstPair+")"+scndPair+"-"+lastPair;
		}
		if(phone.length>='12')	
		{
			var frstPair=phone.substring(0,phone.length-10);
			var scndPair=phone.substring(phone.length-10,phone.length-7);
			var thirdPair=phone.substring(phone.length-7,phone.length-4);
			var lastPair=phone.substring(phone.length-4,phone.length);
			id('profile_phone_number').innerText=frstPair+"("+scndPair+")"+thirdPair+"-"+lastPair;
		}	
		
	}

	function	editprofile_validate ()
	{
		var isPhoneValid=true;
		 var regex = /^(\+?((1[\-|\.|\s]?)?([2-9][0-9]{0,2})?)[\-|\.|\s]?)(\(?[2-9][0-9]{0,2}\)?)[\-|\.|\s]?([2-9][0-9]{1,3})[\-|\.|\s]?([0-9]{4})$/;
		var phoneNum=id('edit_profile_phone_number').value;
		 var valid_phone = phoneNum.toString().match(regex);
		 var phoneLength=phoneNum.length;
	     if(id('edit_profile_phone_number').value == "")
		 {
			// id("profile_phone_null_check").style.display = "block";
			//	id("profile_warning_phone_number").style.display = "none";
			//	id("profile_warning_valid_phone_number").style.display = "none";
			isPhoneValid=true;
		}
			else if(valid_phone!= null)
				{
					isPhoneValid=true;
				  id("profile_warning_valid_phone_number").style.display = "none";
				  id("profile_phone_null_check").style.display = "none";
				  id("profile_warning_phone_number").style.display = "none";
					//id('profile_login_key').value=BACKGROUND.login_session_key;
		     		//BACKGROUND.updateProfileImage(id('profile_form'));
					//BACKGROUND.updateProfileImage(id('profile_form'));
					
		    		//showScreen('screen_profile');
					//showScreen('screen_profile');
				} 
				else 
				{
				isPhoneValid=false;
		        id("profile_warning_phone_number").style.display = "block";
				id("profile_warning_valid_phone_number").style.display = "none";
				  id("profile_phone_null_check").style.display = "none";
		 		}

		return isPhoneValid;
	}
	function updateProfile()
	{
		if(editprofile_validate())
		{
			id('profile_login_key').value=BACKGROUND.login_session_key;
	
			BACKGROUND.updateProfileImage(id('profile_form'));
			
			showScreen('screen_profile');
		}
	}
	function profile_changed(evt)
	{

		f=evt.target.files[0];
		var reader = new FileReader();
      	reader.onload = (function(theFile) {
        return function(e) {
        	id('edit_avt').src=e.target.result;
        	id('file_path').value=theFile.name;
        };
      })(f);
        reader.readAsDataURL(f);
	}
	
	
	function changePassword(){
		
			//document.getElementById("avatar").style.display = 'none';
			//document.getElementById("choose").style.display = 'none';
			document.getElementById("change_pass").style.display = 'none';
			document.getElementById("cancel_pass").style.display = 'block';	
		}
		
	function changePassCancel() {
			//document.getElementById("avatar").style.display = 'block';
			//document.getElementById("choose").style.display = 'block';
			document.getElementById("change_pass").style.display = 'block';
			document.getElementById("cancel_pass").style.display = 'none';
	}
   
	function openAddGroup()
	{
		id("group-searchfield").style.display = 'none';
		id("content-container-group").style.display = 'block';
		id("content-containergroup").style.display = 'none';
		id("header-group").style.display = 'none';
		id("add-groupHeader").style.display = 'block';
	}

    function onGroupScreen()
	{
		id("group-searchfield").style.display = 'block';
		id("content-container-group").style.display = 'none';
		id("content-container-searchpage").style.display = 'none';
		id("Search-page-groupHeader").style.display = 'none';
		id("content-container-editgroup").style.display = 'none';
		id("Edit-groupHeader").style.display = 'none';
		id("content-containergroup").style.display = 'block';
		id("header-group").style.display = 'block';
		id("add-groupHeader").style.display = 'none';
		
		id("Detail-groupHeader").style.display = 'none';
				id("content-container-groupdetail").style.display = 'none';
		
	}
	function dropdownbox()
	{
		if(id("dropdownlist").style.display == 'none')
		{
		id("dropdownlist").style.display = 'block';
		}
		else
		{
			id("dropdownlist").style.display = 'none';
		}
	}
	
	function dropdownbox_editgroup()
	{ 
		if(id("dropdownlist_editgroup").style.display == 'none')
		{
		id("dropdownlist_editgroup").style.display = 'block';
		}
		else
		{
			id("dropdownlist_editgroup").style.display = 'none';
		}
	}
	
	function group_container(type)
    {
		
    	switch (type) 
    	{
			case "preferred_group" : 
				{
					
			    	if(id('minus-sign-perferredgroup').className=='minus')
							{
								id('minus-sign-perferredgroup').className='plus';
								id('group_perfered_container').style.display='none';
							}
							else
							{
								id('minus-sign-perferredgroup').className='minus';	
								id('group_perfered_container').style.display='block';
							}
							break;
				}
				case "my_groups" : 
				{
				if(id('minus-sign-mygroups').className=='minus')
							{
								id('minus-sign-mygroups').className='plus';
								id('my_groups_container').style.display='none';
							}
							else
							{
								id('minus-sign-mygroups').className='minus';	
								id('my_groups_container').style.display='block';
							}
							break;
			   }
			   case "joined_groups" : 
				{
					
				if(id('minus-sign-joinedgroup').className=='minus')
							{
								id('minus-sign-joinedgroup').className='plus';
								id('joined_container').style.display='none';
							}
							else
							{
								id('minus-sign-joinedgroup').className='minus';	
								id('joined_container').style.display='block';
							}
							break;
			    }
			default : {
				
				id("invite-content").style.display='block';
			}
    	}
    }
    
	function group_detail_container(type)
    {
		
    	switch (type) 
    	{
			case "admin_group" : 
				{
					
			    	if(id('minus-sign-admin-groups').className=='minus')
							{
								id('minus-sign-admin-groups').className='plus';
								id('Admin_detail_group').style.display='none';
							}
							else
							{
								id('minus-sign-admin-groups').className='minus';	
								id('Admin_detail_group').style.display='block';
							}
							break;
				}
				case "memebers_group" : 
				{
				if(id('minus-sign-member-groups').className=='minus')
							{
								id('minus-sign-member-groups').className='plus';
								id('Member_detail_group').style.display='none';
							}
							else
							{
								id('minus-sign-member-groups').className='minus';	
								id('Member_detail_group').style.display='block';
							}
							break;
			   }
			   case "joined_groups" : 
				{
					
				if(id('minus-sign-joinedgroup').className=='minus')
							{
								id('minus-sign-joinedgroup').className='plus';
								id('joined_container').style.display='none';
							}
							else
							{
								id('minus-sign-joinedgroup').className='minus';	
								id('joined_container').style.display='block';
							}
							break;
			    }
			default : {
				
				id("invite-content").style.display='block';
			}
    	}
    }
	function openAdminUrl()
	{
		chrome.tabs.create({url:"http://flimby.com/admin"});
	}
	function Nuskin_network()
	{
		id('custom_field_group').style.display='block';
		id('dropdownlist').style.display='none';
		
	}
	function covu_channel()
	{
		id('custom_field_group').style.display='none';
		id('dropdownlist').style.display='none';
		
	}
