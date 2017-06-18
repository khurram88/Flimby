// --- file[covu.popup.js] ---
document.addEventListener('DOMContentLoaded', function () 
{
<!--SignUP Screen Events-->
	document.getElementById('screen_signUp').addEventListener('keypress', SignUptrigget);
	document.getElementById('screen_signIn').addEventListener('keypress', onKeyPressSignInScreen);
	document.getElementById('signUpSubmit').addEventListener('click', OnSignUpSubmit);
	document.getElementById('LaunchBtn').addEventListener('click', launchApp);
<!--SignIn Screen Events-->		
	document.getElementById('gigya').addEventListener('click', launchApp);
	document.getElementById('signInCoVuID').addEventListener('focus', hideForgotConrols);
	document.getElementById('signInPassword').addEventListener('focus', hideForgotConrols);
	document.getElementById('signInPassword').addEventListener('keypress', triggetSearch);
	document.getElementById('signInSubmit').addEventListener('click', OnLginInSubmit);
	document.getElementById('forgotPass').addEventListener('click', toogleForgotControls);
	document.getElementById('forgotPasswordSubmit').addEventListener('click', onForgotPasswordSubmit);
<!--Home Screen Events-->	
	document.getElementById('SearchHistory').addEventListener("click", showHistory);
	document.getElementById('default_screen_searchSubmit').addEventListener('click', helperSearch);
	document.getElementById('searchKeywords').addEventListener('keypress', Searchtrigget);
<!--Stream Screen Events-->	
	document.getElementById('searchSubmit').addEventListener('click', getlocalblasts);  //now getlocalblasts
	document.getElementById('SearchFilter').addEventListener('click', getAllBlasts);
	document.getElementById('SearchHistory').addEventListener("click", showHistory);
	document.getElementById('leadSessionStopButton').addEventListener("click", showLeadbox);
	document.getElementById('followerList').addEventListener("click", toogleFollowerListDisplay);
	document.getElementById('searchListingContainer').addEventListener("scroll", searchScroll);
	document.getElementById('stream_searchKeywords').addEventListener('keypress', StreamSearchtrigget);	//StreamSearchtrigget
<!--Conversation Screen Events-->
	document.getElementById('onConversationButton').addEventListener('click', converBack);
	document.getElementById('coversationListingContainer').addEventListener('scroll', conversationScroll);
	document.getElementById('replyButton').addEventListener('click', onReplyBlast);
	document.getElementById('blastReply').addEventListener('cut', pasteReplyHandler);
	document.getElementById('blastReply').addEventListener('paste', pasteReplyHandler);
	document.getElementById('blastReply').addEventListener('change', saveReply);
	document.getElementById('blastReply').addEventListener('keyup', saveReply);
	document.getElementById('blastReply').addEventListener('focus', saveReply);
	document.getElementById('blastReply').addEventListener('blur', saveReply);
<!--People Screen Events-->
	document.getElementById('peopleSearch').addEventListener('keypress', triggetSearch);
	document.getElementById('serach_for_pople_results_button').addEventListener('click', peopleSearch);
	document.getElementById('search_back').addEventListener('click', getbkpeople);
	document.getElementById('content-body-people-mainpage').addEventListener('scroll', peopleSearchMore);
	document.getElementById('invitePeople-button-container').addEventListener('click', getcontentInvite);
	document.getElementById('invite-content').addEventListener('keypress', triggetSearch);
	document.getElementById('people_email_invite_button').addEventListener('click', peopleInvite);
	document.getElementById('minus-sign').addEventListener('click', containers);
	document.getElementById('minus-sign-sent').addEventListener('click', containers);
	document.getElementById('minus-sign-friends').addEventListener('click', containers);
<!--Group Screen Events-->	
	document.getElementsByClassName('addgroupbutton')[0].addEventListener('click', function()
		{
				showScreen('screen_add_groups');
		});
	document.getElementById('groupBK').addEventListener('click', function()
		{
				showScreen('screen_groups');
		});
	document.getElementById('groupSave').addEventListener('click', function()
		{
				groupController.createGroup();
		});
	document.getElementById('detailBK').addEventListener('click', function()
		{
				showScreen('screen_groups');
		});
	document.getElementById('edit_group_button').addEventListener('click', function()
		{
				showScreen('screen_group_edit');
		});
		
	document.getElementById('editBK').addEventListener('click', function()
		{
				showScreen('screen_groups');
		});	
	document.getElementById('groupUpdt').addEventListener('click', updateGroup);	
	document.getElementById('searchBK').addEventListener('click', function()
		{
				showScreen('screen_groups');
		});
	document.getElementById('search_group').addEventListener('keypress', function()
		{
			if(document.getElementById('search_group').value=='')
				return;
			triggetClickOn('group_get_search_results_button');
		});			
	document.getElementById('group_get_search_results_button').addEventListener('click', function()
		{
			if(document.getElementById('search_group').value=='')
				return;
			groupController.searchresult();
		});
	document.getElementById('content-body-searchpage').addEventListener('scroll', function()
		{
			groupController.searchMore();
		});
	document.getElementById('seperatorJoined').addEventListener('click', groupContainers);
	document.getElementById('seperatorMyGrp').addEventListener('click', groupContainers);
	document.getElementById('seperatorPrefGrp').addEventListener('click', groupContainers);
	document.getElementById('create_group_covu_id').addEventListener('blur', function()
		{
				groupController.checkidgroup();
		});
	document.getElementById('create_group_name').addEventListener('focus', function()
		{
				document.getElementById('create_group_name').style.borderColor = '#666666';
		});
	document.getElementById('selectValue').addEventListener('click', dropdownbox);
	document.getElementById('dropdownlist').addEventListener('click', selectChannel);
	document.getElementById('selectValueEdit').addEventListener('click', function()
		{
			dropdownbox_editgroup();
		});
	document.getElementById('dropdownlist_editgroup').addEventListener('click', editChannel);
	document.getElementById('remove_group_button').addEventListener('click', removeGrp);
	document.getElementById('InviteContentGrp').addEventListener('click', inviteContent);
	document.getElementById('group_email_invite_button').addEventListener('click', GrpInvite);
	document.getElementById('sepratorGrpDetailAdmin').addEventListener('click', DetailContainer);
	document.getElementById('MemberTxt').addEventListener('click', DetailContainerMember);
	document.getElementById('group_email_invite_input').addEventListener('keypress', function()
		{
			triggetClickOn('group_email_invite_button');
		});
<!--Profile Screen Events-->	
	document.getElementById('friend_profile_back_button').addEventListener('click', function()
		{
			showScreen('screen_people');
		});
	document.getElementById('editPro').addEventListener('click', function()
		{
			showScreen('edit_profile');
		});
	document.getElementById('editProBK').addEventListener('click', function()
		{
			showScreen('screen_profile');
		});
	document.getElementById('savePro').addEventListener('click', function()
		{
			updateProfile();
		});
	document.getElementById('profile_file').addEventListener('change', function()
		{
			profile_changed(event);
		});
	document.getElementById('edit_profile_phone_number').addEventListener('blur', function()
		{
			editprofile_validate();
		});
	document.getElementById('change_pass').addEventListener('click', changePassword);	
	document.getElementById('changePassCancel').addEventListener('click', changePassCancel);
<!--DashBoard Screen Events-->	
	document.getElementById('admin_button').addEventListener('click', openAdminUrl);
	document.getElementById('member_minus_sign').addEventListener('click', DBcontainer);
	document.getElementById('group_minus_sign').addEventListener('click', DBcontainer);		
<!--Settings Screen Events-->
	document.getElementById('logOutBtn').addEventListener('click', Logout);
	document.getElementById('privat_profile').addEventListener('click', toggleProfile);
	document.getElementById('alert_sound').addEventListener('click', toggleSound);
	document.getElementById('infoIcon').addEventListener('click', function()
		{
			showScreen('info_page');
		});
	document.getElementById('infoBK').addEventListener('click', function()
		{
			showScreen('screen_settings');
		});
	document.getElementById('infoLogOut').addEventListener('click', Logout);
	
	document.getElementById('help_email').addEventListener('click', sendMail);
			
});
function DBcontainer(event)
{
	var elem=event.target;
	var eID=elem.id;
	var elemClass=elem.className;
	if(eID=='member_minus_sign')
	{
		friend_request_container('member_container');
	}
	else if(eID=='group_minus_sign')
	{
		friend_request_container('group_container');
	}
	
}
function DetailContainer(event)
{
	var elem=event.target;
	var eID=elem.id;
	var elemClass=elem.className;
	if(eID=='sepratorGrpDetailAdmin' || eID=='minus-sign-admin-groups' || elemClass=='adminTxt')
	{
		group_detail_container('admin_group');
	}
	groupController.sendGroupInvitation(elem);
}
function DetailContainerMember(event)
{
	var elem=event.target;
	var eID=elem.id;
	if(eID=='MemberTxt' || eID=='minus-sign-member-groups')
	{
		group_detail_container('memebers_group');
	}
	
}
function GrpInvite(event)
{
	var elem=event.target;
	var eID=elem.id;
	var elemClass=elem.className;
	groupController.sendGroupInvitation(elem);
}
function inviteContent(event)
{
	var elem=event.target;
	var eID=elem.id;
	var elemClass=elem.className;
	if(eID=='InviteContentGrp' || elemClass=='add' || elemClass=='primary-link-invite' || elemClass=='ui-row-content-invite')
	{
		getcontent_group();
	}
}
function removeGrp(event)
{
	var elem=event.target;
	var eID=elem.id;
	if(eID=='removeTxt')
	{
		elem=elem.parentNode;
	}
	groupController.removeGroup(elem);
}
function editChannel(event)
{
	var elem=event.target;
	groupController.edit_covu_channel(elem);
}
function selectChannel(event)
{
	var elem=event.target;
	groupController.covu_channel(elem);
}
function groupContainers(event)
{
	var elem=event.target;
	var eID=elem.id;
	var elemClass=elem.className;
	if(eID=='seperatorJoined' || eID=='minus-sign-joinedgroup' || elemClass=='minusJoined')
	{
		group_container('joined_groups');
	}
	else if(eID=='seperatorMyGrp' || eID=='minus-sign-mygroups' || elemClass=='minusMyGrp')
	{
		group_container('my_groups');
	}
	else if(eID=='seperatorPrefGrp' || eID=='minus-sign-perferredgroup' || elemClass=='minusPref')
	{
		group_container('preferred_group');
	}
	
}
function updateGroup(event)
{
	var elem=event.target;	
	groupController.updateGroup(elem);
}
function sendMail()
{
	

	//var contents = 'this is test mail';
	//var sbjct = 'Request for Space';
    var link = "mailto:support@flimby.com";
    chrome.tabs.create({url: link});
}
function containers (event)
{
	var elem=event.target;
	var eID=elem.id;
	if (eID=='minus-sign')
	{
		friend_request_container('friend_request');
	}
	else if (eID=='minus-sign-sent')
	{
		friend_request_container('sent_request');
	}
	else if (eID=='minus-sign-friends')
	{
		friend_request_container('available_friends');
	}
	
}
function getcontentInvite (event)
{
	var elem=event.target;
	var eID=elem.id;
	var elemClass=elem.className;
	if(eID=='addPeople' || eID=='InvitePeopleTxt' || eID=='invitePeople-button-container' || eID=='inviteTxt')
	{
		getcontent();
	}
}
function peopleInvite ()
{
	peopleController.inviteFriends()
}
function peopleSearchMore ()
{
	peopleController.searchMore();
}
function peopleSearch ()
{
	if(document.getElementById('search_people').value=='')
			return;
	peopleController.searchresult ();
}
function triggetSearch (event)
{
	var elem=event.target;
	var eID=elem.id;
	if (eID=='search_people')
	{
		if(document.getElementById('search_people').value=='')
			return;
		triggetClickOn('serach_for_pople_results_button');
	}
	else if (eID=='friends_request_email')
	{
		triggetClickOn('people_email_invite_button');
	}
	else if (eID=='signInPassword')
	{
		triggetClickOn('signInSubmit');
	}
	
}
function converBack ()
{
	onConversationBackButton(true);
}
function SignUptrigget ()
{
	triggetClickOn('signUpSubmit');
}
function showHistory()
{
	showRecentHistory(true);
}
function Searchtrigget () 
{
	if (event.keyCode == 13) 
	{
		if(document.getElementById("searchKeywords").value!='')
		{
			BACKGROUND.search_from_home=true;
			BACKGROUND.search_id=document.getElementById("searchKeywords").value;
			document.getElementById("stream_searchKeywords").value = document.getElementById("searchKeywords").value;
			document.getElementById("recentHistory").style.display = 'none';
			showScreen("screen_home");
		}
    }
		
	 
	//triggetClickOn('default_screen_searchSubmit');
}
function StreamSearchtrigget() 
{
	triggetClickOn('searchSubmit');
}

  	var clicked_element="";
	const BACKGROUND = chrome.extension.getBackgroundPage();
	var trayStarted=false;
	var allow_submit=false;
	var clicked_blast_id=0;
	var search_scroll_pos=0;
	var conversation_scroll_pos=-1;
	var blast_replies_count=0;
	var isTrayOpen=false;
	var openTrayBlast;
	var openTrayBlastsrcElemen;
	var current_button ;
	var trayStartedConvo = false;
	var open_tray_blast=-1;
	var setAutoFill=false;
	var search_scroll=0;
	
	
	function showMediauploader()
	{
		chrome.tabs.create({url:"http://upload.covu.com"});
	}
	function setVersion()
	{
		var elem=document.getElementsByName('versionInfo');
		for(var i=0;i<elem.length;i++)
			elem[i].innerHTML=getVersion();
	}

	function init()
	{
		loadHistory();

		id('signInCoVuID').value=BACKGROUND.getUserName();
		id('signInPassword').value=BACKGROUND.getPassword();

		if(id('signInCoVuID').value!="")
		{
			id('remember_password').checked=true;
		}
		setVersion();
		isTrayOpen=false;
		search_scroll_pos=0;
		conversation_scroll_pos=-1;
		blast_replies_count=0;
		BACKGROUND.blast_limit=30;
		showNotification();
		getTabTitleAndUrl("bookmark");
	}
	
	function launchApp()
	{
		BACKGROUND.getCookie(true);
		id("screen_wait").style.display="block";
		id("screen_signIn").style.display="none";
	}
					
	function pasteMessageHandler()
	{
		window.setTimeout(saveBlastMessage, 0);
	}
	function pasteReplyHandler()
	{
		window.setTimeout(saveReply, 0);
	}	
	window.onload = function() {
	
		if(!BACKGROUND.closeFollow())
		{
			return;
		}
		init();
		showBlastofType(getScreenType());
		if(BACKGROUND.login_in_progress)
		{
			id("screen_wait").style.display="block";	
			return;
		}
		if(BACKGROUND.initial_login_session_key=='')
		{		
			id("screen_signIn").style.display="block";
			//id("screen_wait").style.display="block";
			//id("welcome-screen").style.display="block";
			return;
		}

		current_button = document.getElementById("text"); 
		
		setInterval(getConversationUpdates,10000);
		id("myCoVuID").innerText ="/"+BACKGROUND.leader_id;
		id("leadInfoFollowCount").innerText=BACKGROUND.followerCount;
		id("stream_searchKeywords").value=BACKGROUND.search_id;
		
		if(BACKGROUND.leaderSessionKey!="")
		{	
			showLogin();
			id("leadInfoBox").style.display='block';
			id("leadInfoSessionName").innerText=BACKGROUND.sessionName;
			showLead();
		}
		else if(BACKGROUND.login_session_key=="")
		{
			showSignInScreen(true);
		}
		else
		{
			if(getScreen()=='')
			{
				showLogin();
			}
			else
			{
				var screenValue=getScreen();
				if(screenValue=='help_pages')
				{
					showScreen('screen_default',getScreenType());
				}
				showScreen(getScreen(),getScreenType());
				
			}
		//	if(BACKGROUND.ppt_uploading)
		//	{
		//		showPPTBlastScreen();
				
		//	}
		//	showLogin();
		}
	}


	function setClicked(event)
	{
		clicked_element = document.getElementById(event.srcElement.id);
		hidediv();

	}
	
	function cbIsCoVuIdAvailable(doc)
	{
		id("warning_wait").style.display = 'none';

		var r = doc.getElementsByTagName("status")[0].childNodes[0].nodeValue;
		if(r==0)
		{
			if(doc.getElementsByTagName("available")[0].childNodes[0].nodeValue=="false")
				id("warning_notAvailable").style.display = 'block';
			else
				allow_submit=true;	
		}
		else
		{
			id("warning_notAvailable").style.display = 'block';
		}
	}
	
	function isCoVuID(id)
	{
		var pl = new BACKGROUND.RestClientParameters();
		pl.add("covu_id", id);
		BACKGROUND.invoke(BACKGROUND.urlAPI, "IsCoVuIdAvailable", pl, cbIsCoVuIdAvailable);
	}
	
	function clearCoVuIDAlerts()
	{
		id("warning_allowCharacters").style.display = 'none';
		id("warning_allowCharacters1").style.display= 'none';
		id("warning_lengthCharacters").style.display='none';
		id("warning_notAvailable").style.display = 'none';
	}
	

	
	function OnSignUpSubmit()
	{
		//if(validateSignUp() || !allow_submit)
//			return;
		id("screen_signUp").style.display = 'none';
		id("screen_wait").style.display='block';
		BACKGROUND.signUp(id("signUpCoVuID").value,"public",id("signUpPassword").value,id("signUpConfirmPassword").value,id("signUpFirstName").value,id("signUpLastName").value,id("signUpEmail").value);
	}
	

	function OnLginInSubmit()
	{
		id("screen_signIn").blur();
		id("signInCoVuID").blur();
		id("signInPassword").blur();
		id("screen_signIn").style.display = 'none';
		id("screen_wait").style.display='block';
		BACKGROUND.logIn(id("signInCoVuID").value,id("signInPassword").value,id("remember_password").checked);
	}
	
	function onForgotPasswordSubmit()
	{
		BACKGROUND.resetPassword(id("forgotPasswordEmail").value);
	}
	
	function showSucessfulReset()
	{
		id("requestSentConfirm").style.display='block';
	}

	function cbLogout(result)
	{
		if(result)
		{
			//clearInterval(BACKGROUND.timer_recent_blasts);
			//clearInterval(BACKGROUND.timer_blasts_count);
			BACKGROUND.Logout();
			id('signInCoVuID').value='';
			id('signInPassword').value='';
			showScreen('screen_signIn');
			
		}
	}
	function Logout()
	{
		$.prompt('Are you sure you want to log out?',{
				callback: cbLogout,
				buttons:{Ok:true,Cancel:false}, 
				prefix:'extblue'
			});
		
	}
	
	function onConversationBackButton()
	{
		conversation_scroll_pos=-1;
		id('blastReply').value="";
		id("blastReply").style.height="47px";
		showConversationScreen(false);
	}
	
	function onReplyBlast()
	{
		if(id('blastReply').value!="")
		{ 
			BACKGROUND.send_Blast(id('blastReply').value,"","message",false,clicked_blast_id);
			id('blastReply').blur();
			conversation_scroll_pos=-1;
			id('blastReply').value="";
			//clear converstation screen text
			saveReply();
			trayStartedConvo = false;
			id("blastReply").style.height="47px";
		}
	}
	
	$(function() 
	{
		$( "#resizable" ).resizable({ maxWidth: 230, minWidth: 230, alsoResize: '.other'});
		
		
		 
	});
    
	$(function() 
	{
		
		function split( val ) 
		{
			return val.split( /,\s*/ );
		}
		
		function extractLast( term ) 
		{
			return split( term ).pop();
		}
/*
		$( "#to_box" )
			// don't navigate away from the field on tab when selecting an item
			.bind( "keydown", function( event ) 
			{
				if ( event.keyCode === $.ui.keyCode.TAB &&
						$( this ).data( "autocomplete" ).menu.active )
				{
					event.preventDefault();
				}
			})
			.autocomplete({
				minLength: 0,
				source: function( request, response ) {
					// delegate back to autocomplete, but extract the last term
					response( $.ui.autocomplete.filter(
						BACKGROUND.friend_list, extractLast( request.term ) ) );
				},
				focus: function() {
					// prevent value inserted on focus
					return false;
				},
				select: function( event, ui ) {
					var terms = split( this.value );
					// remove the current input
					terms.pop();
					// add the selected item
					terms.push( ui.item.value.split(',' )[1]);
					// add placeholder to get the comma-and-space at the end
					terms.push( "" );
					this.value = terms.join( ", " );
					return false;
				}
			});*/
	});
	function manageAutoFill()
	{
		if(!setAutoFill)
		{
			setAutoFill=true;
			$("#to_box").tokenInput(
	          BACKGROUND.friend_list, {
	          	theme: "facebook",
	          	placeholder: "To:",
				propertyToSearch: "covu_id",
	              onAdd: function (item) {
                    saveToList();
                },
                onDelete: function (item) {
                    saveToList();
                },
	              resultsFormatter: function(item){ 
	              	if(item.has_avatar!="false")
	              		return "<li>" + "<img src='" + BACKGROUND.member_images+"/"+item.covu_id + ".png' title='" + item.name  + "' height='25px' width='25px' />" + "<div style='display: inline-block; padding-left: 10px;'><div class='full_name'>" + item.name  + "</div><div class='email'>" + item.covu_id + "</div></div></li>" 
	              	else
	             		return "<li>" + "<img src='" + BACKGROUND.default_image+"/"+"avatar.png' " + " title='" + item.name  + "' height='25px' width='25px' />" + "<div style='display: inline-block; padding-left: 10px;'><div class='full_name'>" + item.name  + "</div><div class='email'>" + item.covu_id + "</div></div></li>" 
	           	
	              		},
	              
	              tokenFormatter: function(item) { return "<li><p>" + item.covu_id +"</p></li>" }
	          });
		}
	}
	$(document).ready(function() 
	{
		//if friends_list is empty don't load.
		if(BACKGROUND.login_session_key!="")
			manageAutoFill();
		var SLIDE_SIZE = 232;
		$('.icon-arrow').live('click', function()
		{
			var max = -2 * SLIDE_SIZE;
			var min = 0;
			var curr_pos = parseInt($('.slide-view').css('left'))
			if($(this).hasClass('arrow-l-icon')) 
			{
				if(curr_pos < min) 
				{
					shift_left(curr_pos);
				}
				else if( curr_pos >= min){
					return;
				}
			} 
			else if($(this).hasClass('arrow-r-icon'))
			{
				if(curr_pos > max) 
				{
					shift_right(curr_pos);
				}
				else if(curr_pos <= max)
				{
					return;
				}
	
			}
		});
		
		function shift_left(pos) 
		{
			var temp = pos + SLIDE_SIZE;
			if(temp > 0)
			{  
				hide_arrows(temp); return;
			}
			$('.slide-view').animate({
				left : '+=' + SLIDE_SIZE + 'px'
			}, 300);
			hide_arrows(temp);
		}
	
		function shift_right(pos) {
			var temp = pos - SLIDE_SIZE;
			if(temp < -464){  hide_arrows(temp); return;}
			$('.slide-view').animate({
				left : '-=' + SLIDE_SIZE + 'px'
			}, 300);
			hide_arrows(temp);
		}
	});

	function hide_arrows(position)
	{
	/*	if(!position)
		{
			$('.arrow-r-icon').css('display', 'inline-block');
			$('.arrow-l-icon').css('display', 'none');
			$('.carousel-view').css('marginLeft', '17px');
		} else if(position >= 0){
			$('.arrow-r-icon').css('display', 'inline-block');
			$('.arrow-l-icon').css('display', 'none');
			$('.carousel-view').css('marginLeft', '17px');
		} else if( position < 0 && position > -464){
			$('.arrow-r-icon').css('display', 'inline-block');
			$('.arrow-l-icon').css('display', 'inline-block');
			$('.carousel-view').css('marginLeft', '0');
		} else if( position <= -464){
			$('.arrow-r-icon').css('display', 'none');
			$('.arrow-l-icon').css('display', 'inline-block');
			$('.carousel-view').css('marginLeft', '0');
		}*/
	}
	
	//function to hide ui elements throughout the extenstion when the user clicks outside of the focused element
	function hidediv()
	{
		var el = document.getElementById('SearchHistory');
		if(clicked_element != el && document.getElementById('recentHistory').style.display == 'block')
		{
			if(clicked_element == document.getElementById('background'))
			{
				document.getElementById('recentHistory').style.display = 'block';
				
			} else
			{
				document.getElementById('recentHistory').style.display = 'none';
			}
		}
	}	
	function getAllBlasts()
	{
		id("stream_searchKeywords").value="";
		BACKGROUND.search_id="";
		onSearchButton("everyone");
	}
	var count_entries = 0;
	function create_dashboard_content(doc){
		var friends_container = id('member_container_rows');
		var groups_container = id('group_container_rows');
		
		var names = [];
		var covu_id = [];
		var n_HTML = '';
		var g_HTML = '';
		var picture = [];
		var has_avatar = [];
		count_entries++;

		
		if(count_entries < 2){
			friends_container.innerHTML = '';
			var friends = doc.getElementsByTagName('friend');
			for(var i = 0;i< friends.length; i++)
			{
				try{
					names[i] = friends[i].getElementsByTagName('name')[0].childNodes[0].nodeValue;
					covu_id[i] = friends[i].getElementsByTagName('covu_id')[0].childNodes[0].nodeValue;
					has_avatar[i] = friends[i].getElementsByTagName('has_avatar')[0].childNodes[0].nodeValue;
				}
				catch(e)
				{
				}
				if(has_avatar[i] =='true')	
				{
					picture[i]=BACKGROUND.member_images+"/"+covu_id[i] + ".png";
					console.log(picture[i]);
				}
				else{
					picture[i] = "http://profiles.covucdn.s3.amazonaws.com/44454641554c54/avatar.png?1328783773";
				}
				n_HTML += "<div  id='" + covu_id[i] + "' class='ui-row-default spaced' style='display:block; margin:2px 0 3px 3px; width:305px;'  >";
				n_HTML += "<div class='ui-row-content' style='font-size:12px; margin-top:2px;'>";
				//n_HTML += "<a href='#'  class='primary-link 12'>";
				console.log("before img");
				n_HTML += "<img name='avatar' alt='Avatar' class='main' style='margin-top:2px;' src='"+picture[i]+"' />";
				console.log("after img");
				n_HTML += "<span>Name: </span><span class='people_name'>" +names[i] + "</span><br><span>Flimby ID:</span><span class='people_name'>"+covu_id[i]+"</span>";
				n_HTML += "</div></div>";
			}	
			friends_container.innerHTML += n_HTML;
		} else{
			var groups = doc.getElementsByTagName('group');
			groups_container.innerHTML = '';
			for(var i = 0;i< groups.length; i++){
				names[i] = groups[i].getElementsByTagName('name')[0].childNodes[0].nodeValue;
				covu_id[i] = groups[i].getElementsByTagName('size')[0].childNodes[0].nodeValue;
				picture[i] = "http://profiles.covucdn.s3.amazonaws.com/44454641554c54/avatar.png?1328783773";
				g_HTML += "<div id='" + covu_id[i] + "' class='ui-row-default spaced' style='display:block; margin:3px 0 2px 3px; width:305px;'>";
				g_HTML += "<div class='ui-row-content' style='font-size:12px; margin-top:2px;'>";
				//g_HTML += "<a href='#' class='primary-link 12>";
				g_HTML += "<img name='avatar' alt='Avatar' class='main' style='margin-top:2px;' src='"+picture[i]+"' />";
				g_HTML += "<span>Name: </span><span class='people_name' value>" +names[i] + "</span><br><span>Members:</span><span class='people_name'>"+covu_id[i]+"</span>";
				g_HTML += "</div></div>";
			}
				groups_container.innerHTML += g_HTML;
				count_entries = 0;
		}
	}
	
	function scroller()
	{
//		alert('sdfsdf');
	}
	function conversationScroll()
	{
		var elem = $('#coversationListingContainer');
		conversation_scroll_pos=elem.scrollTop();
	}

	function searchScroll()
	{
		var elem = $('#searchListingContainer');
		search_scroll=elem.scrollTop();
		saveScroll(search_scroll);
		$("#dummy_search:in-viewport").each(function() {
		BACKGROUND.blast_limit=BACKGROUND.getBlastCount()+10;
		BACKGROUND.getRecentBlasts();
        });
	}
	

	
	function helperBlast()
	{
		onHomeButton();
		BACKGROUND.DeleteBlast()
	}

	    
	function helperSearch()
	{
		if(document.getElementById("searchKeywords").value!='')
		{
			BACKGROUND.search_from_home=true;
			BACKGROUND.search_id=document.getElementById("searchKeywords").value;
			document.getElementById("stream_searchKeywords").value = document.getElementById("searchKeywords").value;
			document.getElementById("recentHistory").style.display = 'none';
			showScreen("screen_home");
		}
	}
	

    function setVisibile(id, visible) 
	{
        if (visible) 
		{
            document.getElementById(id).style.display = 'block';
        }
        else 
		{
            document.getElementById(id).style.display = 'none';
        }
    }
	
    function toogleFollowerListDisplay() 
	{
	
        if (document.getElementById('leadInfoFollowerList').style.display == 'block') 
		{
            expandFollowerList(false);
        }
        else 
		{
            expandFollowerList(true);			
			addFollowerItem(BACKGROUND.follower);
        }
    }
	
    function expandFollowerList(expand) 
	{
        if (expand) 
		{
            setVisibile('leadInfoFollowerList', true);
          //  setVisibile('homeSearchFooter', true);
           // setVisibile('homeSearch', false);
            setVisibile('searchListingContainer', false);
            document.getElementById('leadInfoFollowArrow').src = 'img/arrowDown.png';  
        }
        else 
		{
            setVisibile('leadInfoFollowerList', false);
			//setVisibile('homeSearchFooter', false);
            setVisibile('homeSearch', true);
            setVisibile('searchListingContainer', true);
            document.getElementById('leadInfoFollowArrow').src = 'img/arrow.png';
			//onLeadContainerResize2();
        }
    }
	
	function activeFollowers()
	{
		id("leadInfoFollowCount").innerText=BACKGROUND.followerCount;
		addFollowerItem(BACKGROUND.follower);
	}
	

	function cancel_ppt()
		{
		onHomeButton();
	}
	function ppt_filename()
	{
		BACKGROUND.__fileInput=$("#ppt_file");
		 var file_str = '';
		 file_str = document.getElementById("ppt_file").value;
		 file_str = file_str.replace('C:\\fakepath\\','');
		 document.getElementById("title_bar").value = file_str;
		 id("fakefile").value="................... "+file_str;
		 
	}
	
	function pptUpload()
	{

		document.getElementById("who_ppt").value = document.getElementById("to_box").value;
		document.getElementById("message_ppt").value = document.getElementById("message_input").value;
		document.getElementById("ppt_blast").style.display = 'none';
		document.getElementById("bottom_content").innerHTML = "<img src=\"img/spinny.gif\" width='150px;' height='130px' style=\"  margin: 10px 0 0 80px;\" />";
	}
	
	function getTabTitleAndUrl(type)
	{
		chrome.tabs.getSelected(null, function(tab)
		{
			switch(type)
			{
				case "add":
				{
					document.getElementById('addMediaURLName').value = tab.title;
					document.getElementById('addMediaURLHref').value= tab.url;
					break;
				}
				case "bookmark":
				{
					var temp = tab.title;
					temp = temp.replace(/<\/?[^>]+(>|$)/g, "");
					document.getElementById('name_input').value = temp;
					document.getElementById('url_input').value =tab.url;
					break;
				}
				case "video":
				{
					document.getElementById('video_name').value = tab.title;
					document.getElementById('video_url').value = tab.url;
					break;
				}
				default:
				{
					break;
				}
			}

		});
	}
	
	function getlocalblasts()
	{
		if(id("stream_searchKeywords").value!='')
		{
			BACKGROUND.search_id=id("stream_searchKeywords").value;
			BACKGROUND.getLocalBlasts(id("stream_searchKeywords").value);
		}
	}
	
	function onSearchButton(tag)
	{
		var styledef = getComputedStyle(screen_default);
		if(styledef.display == 'block')
		{
			console.log("inside of the if screen_default");
			showScreen("screen_home");
			helperSearch();
		}
		if(tag!="everyone" && id("stream_searchKeywords").value=="")
		{
			return;
		}
		id("stream_searchKeywords").blur();
		if(checkFollow("SEARCH"))
			return;
		
		//BACKGROUND.setTimers("login");
		
		if(BACKGROUND.fLeaderSessionKey=="")
		{
			BACKGROUND.search_id=id("stream_searchKeywords").value;
			BACKGROUND.getRecentBlasts(id("stream_searchKeywords").value);
			
		}
	}
	
	function onSearchHistory(keyword)
	{
		showRecentHistory(false);
		id("stream_searchKeywords").blur();
		if(checkFollow("SEARCH"))
			return;
		
		if(BACKGROUND.fLeaderSessionKey=="")
		{
			id("stream_searchKeywords").value=keyword;
			id("searchKeywords").value=keyword;
			showScreen("screen_home");
			
			BACKGROUND.search_id=keyword;
			BACKGROUND.getRecentBlasts(keyword);
		}
	}
	function startFollow()
	{
	//	if(BACKGROUND.fLeaderSessionKey!="")
	//		id("followStop_"+BACKGROUND.fLeaderSessionKey).style.display='block';
	}
	
	function checkFollow(funcType)
	{
		if(BACKGROUND.fLeaderSessionKey!="")
		{
			if(funcType=="SEARCH")
			{
				BACKGROUND.closeFollow(funcType,id("stream_searchKeywords").value);
			}
			else if(funcType=="HOME")
				BACKGROUND.closeFollow(funcType,BACKGROUND.leader_id);
			else
				BACKGROUND.closeFollow(funcType,"");
			return 1;
		}
		else
			return 0;
	}
	
	function onHomeButton()
	{
		//if(checkFollow("HOME"))
		//	return;
		
		if(BACKGROUND.fLeaderSessionKey=="" && document.getElementById('screen_home').style.display =='block')
		{
			onSearchButton();
		}

			showScreen("screen_default");

		if(	document.getElementById('conversation').style.display == 'none')
		{
		}
	
	}
	function onStreamButton(){
	//	if(checkFollow("HOME"))
	//		return;
			
		if(BACKGROUND.fLeaderSessionKey =="" && document.getElementById('screen_home').style.display == 'block')
		{
			onSearchButton();
		}
		showScreen('screen_home');
		
	}
	
	function getPersonalBlasts(){
		if(BACKGROUND.fLeaderSessionKey=="" && document.getElementById('screen_home').style.display == 'block')
		{
			BACKGROUND.searchblastfromFooter=true;
			document.getElementById("stream_searchKeywords").value = BACKGROUND.leader_id;
			onSearchButton();
			
		}
		else
			showScreen("screen_home");
	}
	
	function addFollowerItem(doc){

		wstrHTML="";
		wstrHTML+="<div id=\"leaderInfoFollowerNames\"  class=\"blackLabelM\" style=\"background: url(img/lead_follower_list_background.png);  margin-left: 20px; width: 270px; height: 257px;overflow-x: hidden; overflow-y: auto; border: solid 1px gray;\">";

		var colorToggle=true;
		if(doc!=null)
		{
			for(var i=0; i<doc.length;i++)
			{
				wstrHTML+="<div  class='follower_list'><img src=\"img/profilePic.png\" style=\"float: left; margin-left:5px; \"  ></img>";
				//wstrHTML+="<td>";
				
				wstrHTML+="<span class=\"blackLabelS \" style=\"padding-left:10px\">"+doc[i].getElementsByTagName("covu_id")[0].childNodes[0].nodeValue+"</span><br />";
				wstrHTML+="<span class=\"blackLabelM \" style=\"positon: absolute; font-size: 17px; padding-left:10px; margin-top: 3 px;\"><b>"+doc[i].getElementsByTagName("name")[0].childNodes[0].nodeValue+"</b></span>";
				
				wstrHTML+="</div>";
			}
		}
		wstrHTML+="</div>";			
		document.getElementById("leadInfoFollowerList").innerHTML=wstrHTML;
	}

	function showNotification()
	{
		if(BACKGROUND.new_blast_count>9 && BACKGROUND.new_blast_count<=99)
		{
			id("blast_notifications").style.display='block';
			id("blast_alerts").className='notification-double';
			id("blast_alerts").innerText=BACKGROUND.new_blast_count;
		}
		else if(BACKGROUND.new_blast_count==0)
		{
			id("blast_notifications").style.display='none';
			id("blast_alerts").className='notification-single';
			id("blast_alerts").innerText=BACKGROUND.new_blast_count;					
		}
		if(BACKGROUND.new_blast_count>99)
		{
			id("blast_notifications").style.display='block';
			id("blast_alerts").className='notification-double';
			id("blast_alerts").innerText='99+';
		}
		else if(BACKGROUND.new_blast_count>0)
		{
			id("blast_notifications").style.display='block';
			id("blast_alerts").className='notification-single';
			id("blast_alerts").innerText=BACKGROUND.new_blast_count;
		}
		
		
		if(BACKGROUND.new_request_count+BACKGROUND.new_approvals_count>9 && BACKGROUND.new_request_count+BACKGROUND.new_approvals_count<=99)
		{
			id("people_notifications").style.display='block';
			id("people_alerts").className='notification-double';
			id("people_alerts").innerText=BACKGROUND.new_request_count+BACKGROUND.new_approvals_count;
		}
		else if(BACKGROUND.new_request_count+BACKGROUND.new_approvals_count==0)
		{
			id("people_notifications").style.display='none';
			id("people_alerts").className='notification-single';
			id("people_alerts").innerText=BACKGROUND.new_request_count+BACKGROUND.new_approvals_count;					
		}
		if(BACKGROUND.new_request_count+BACKGROUND.new_approvals_count>99)
		{
			id("people_notifications").style.display='block';
			id("people_alerts").className='notification-double';
			id("people_alerts").innerText='99+';
		}
		else if(BACKGROUND.new_request_count+BACKGROUND.new_approvals_count>0)
		{
			id("people_notifications").style.display='block';
			id("people_alerts").className='notification-single';
			id("people_alerts").innerText=BACKGROUND.new_request_count+BACKGROUND.new_approvals_count;
		}
	}
	

	function getConversationUpdates()
	{
		if(id("conversation").style.display=="block")
		{
			BACKGROUND.GetBlastReplies(clicked_blast_id);
		}
	}
	
	function getAllRecentContent()
	{
		id("stream_searchKeywords").value = '';
		//BACKGROUND.search_id=id("searchKeywords").value;
		BACKGROUND.getRecentBlasts();
	}

	//todo set search filters on the search box from the drop down menu
	//function searchFilters()
	//{
	//	
	//
	//}
	

	
	//display the users recent history when the history button is pressed
	function mostRecentHistory(value)
	{
		//BACKGROUND.RecentHistory();
		if(checkFollow("MEDIA"))
		{
			toogleAddMedia(false);
			return;
		}
		var wstrHTML="";
		var historyList = BACKGROUND.search_history;//_list.getElementsByTagName("covu_id");
		wstrHTML += "<table class='history'>";
			for(var history in historyList)
			{
				wstrHTML += "<tr>";
				wstrHTML += "<td style=' text-align:left; width:155px; cursor: pointer;' onclick=onSearchHistory(\"" +historyList[history] + "\")>" + historyList[history] + "</td>";
				wstrHTML += "</tr>";
			}
		wstrHTML += "</table>";
		if(value == "default"){
			document.getElementById("recentResults").innerHTML=wstrHTML;
		}
		else if(value == "stream"){
			document.getElementById("stream_recentResults").innerHTML=wstrHTML;
		}
		
	}
	
	function showRecentHistory(show)
	{		
		var styledef = window.getComputedStyle(screen_default);
		if(styledef.display == 'block'){
			if(show)
			{
				if(document.getElementById('recentHistory').style.display == 'block')
				{
					document.getElementById('recentHistory').style.display = 'none';
				}
				else
				{
					
					document.getElementById('recentHistory').style.display = 'block';
					mostRecentHistory("default");
					id("searchKeywords").value = '';
				}
			} 
			else
			{
				document.getElementById('recentHistory').style.display = 'none';
			}
		}else {
			if(show)
			{
				if(document.getElementById('stream_recentHistory').style.display == 'block')
				{
					document.getElementById('stream_recentHistory').style.display = 'none';
				}
				else
				{
					
					document.getElementById('stream_recentHistory').style.display = 'block';
					mostRecentHistory("stream");
					id("stream_searchKeywords").value = '';
				}
			} 
			else
			{
				document.getElementById('stream_recentHistory').style.display = 'none';
			}
		}
		
	}
	
	
	function showLeadbox()
	{
		//is_live=false;
		
		BACKGROUND.closeLeaderSession();
		//id('searchListingContainer').style.maxHeight='370px';
		//document.getElementById('leadSessionInputBox').style.display='block';	
		//showLeadSessionInputBox(false);
		document.getElementById('leadInfoBox').style.display='none';
		id("leadInfoFollowCount").innerText=0;
		expandFollowerList(false);
		document.getElementById('searchListingContainer').style.maxHeight='370px';
		//onLeadContainerResize2();
		
	}

	
    function onKeyPressSignInScreen() 
	{
        if (document.getElementById('forgotPassword').style.display == 'block') {
            triggetClickOn('forgotPasswordSubmit');            
        }
        else {
            triggetClickOn('signInSubmit');
        }
    }
    
    function triggetClickOn(id) 
	{
        if (event.keyCode == 13) 
		{
			document.getElementById(id).blur();
            document.getElementById(id).click(); 
        }
    }
	
	function isLiveBlast(key)
	{

	}
	function cbDelete(result)
	{
		if(result)
		{
			BACKGROUND.DeleteBlast();
			if(id("conversation").style.display == 'block')
				onStreamButton();
		}
	}
	function deleteBlast(key)
	{

		//showAddMedia("blast",true);
		if(!BACKGROUND.opDelete)
		{
			BACKGROUND.blast_key = key;
			$.prompt('Are you sure to delete this Blast?',{
				callback: cbDelete,
				buttons:{Ok:true,Cancel:false}, 
				prefix:'extblue'
			});
		}

	}
    
	function hideForgotConrols()
	{
		 if (document.getElementById('forgotPassword').style.display == 'block') 
		 {
            document.getElementById('forgotPassword').style.display = 'none';
            document.getElementById('signInSubmit').style.display = 'block';
        }
	}
	
    function toogleForgotControls()
	{
        if (document.getElementById('forgotPassword').style.display == 'block') 
		{
            document.getElementById('forgotPassword').style.display = 'none';
            document.getElementById('signInSubmit').style.display = 'block';
        }
        else 
		{
            document.getElementById('forgotPassword').style.display = 'block';
            document.getElementById('signInSubmit').style.display = 'none';
            document.getElementById('requestSentConfirm').style.display = 'none';
        }
    }


	
    function onLeadContainerResize() 
	{
       	var header = document.getElementById('homeHeader').offsetHeight;
        var footer = document.getElementById('homeFooter').offsetHeight;
        //var lead = document.getElementById('leadContainer').offsetHeight;
        var search = document.getElementById('homeSearch').offsetHeight;
     	document.getElementById('searchListingContainer').style.height = 500 - (header + footer + search) - 8; /* body top padding */;
 
     	}
	
	function onLeadContainerResize2() 
	{
        var header = document.getElementById('homeHeader').offsetHeight;
        var footer = document.getElementById('homeFooter').offsetHeight;
        var lead = document.getElementById('leadContainer').offsetHeight;
        var search = document.getElementById('homeSearch').offsetHeight;
		document.getElementById('searchListingContainer').style.height = 500 - (header + footer + search + lead + 78) - 10; /* body top padding */
   	}
   	
   	function onLeadContainerResize3() 
	{
        var header = document.getElementById('homeHeader').offsetHeight;
        var footer = document.getElementById('homeFooter').offsetHeight;
        var lead = document.getElementById('leadContainer').offsetHeight;
        var search = document.getElementById('homeSearch').offsetHeight;
       	document.getElementById('searchListingContainer').style.height = 500 - (header + footer + search + lead) - 8; /* body top padding */;
   	}
	
    function triggerSearchClick(index,show_reply) 
	{
		if(checkFollow(""))
			return;
      //  var dummySearch = document.getElementById('searchListing0');
		clicked_blast_id=index;
		saveBlastID();
		blast_replies_count=0;
		BACKGROUND.searchClick(index,show_reply);
    }


    
    function reset_vars(){
    	var screen = document.getElementById("conversation");
    	if(screen.style.display == 'none'){
    		trayStartedConvo = false;
    	}
    }
    
    
    var temp = 0; //temp var for the resizeText_area function declared here to keep it out of recursive looping
	
	//function that changes the size of the text area on the conversatino screen
	function resizeText_area() {
		var observe;
		var pixelMargin; //var that keeps track of the marginTop of the text area
		var num; //var that keeps track of the height of the page container
		var re_num; //var that keeps track of the marginTop of the container holding the text area
		var text_height; //var that keeps track of the height of the text area
	
	//look for events, cut/copy/paste and so on 
		if(window.attachEvent) {
			observe = function(element, event, handler) {
				element.attachEvent('on' + event, handler);
			};
		} else {
			observe = function(element, event, handler) {
				element.addEventListener(event, handler, false);
			};
		}
	
	//recursive function that changes the size depending on a number of different variables
		function initial() {
			var text = document.getElementById('blastReply');
			var container = document.getElementById('coversationListingContainer');
			var reply_container = document.getElementById('conversation_reply');
	
	//function that actually handles the resizing
			function resize() {
				
				temp = text.style.height;
				text.style.height = 18;
				text.style.height = text.scrollHeight + 'px';
				var styledef = window.getComputedStyle(text);
				pixelMargin = parseInt(styledef.marginTop, 10);
				num = parseInt(container.style.height, 10);
				re_num = parseInt(reply_container.style.marginTop, 10);
				var temp_num = parseInt(temp, 10);
				text_height = parseInt(text.style.height, 10);
				if(temp_num == 0) { //if nothing has been done in the text area do this
					temp = text.style.height;
				} else if(text_height == 18) { //else if the text area is only one line do this
					text.style.marginTop = '3';
					reply_container.style.marginTop = '0px';
					container.style.height = '364px';
					container.scrollTop = container.scrollHeight;
				} else if(temp_num < text_height) { //else the box is getting bigger 
					if(text_height <= 66 ) {
						pixelMargin -= 15;
						num -= 16;
						re_num += 16;
						conversation_scroll_pos += 16;
						text.style.marginTop = pixelMargin.toString() + 'px';
						container.style.height = num.toString() + 'px';
						reply_container.style.marginTop = re_num.toString() + 'px';
						container.scrollTop = container.scrollHeight;
						temp = text.style.height;
					} else if(text_height >= 66 && temp_num > 20) { //case where the box has reached its max height and the user is still typing
						temp = text.style.height;
					} else if(text_height > 66 && pixelMargin == 3) { //edge case to handle cuting and pasting into the box
						text.style.marginTop = '-42px';
						reply_container.style.marginTop = '48px';
						container.style.height = '316px';
						container.scrollTop = container.scrollHeight;
						temp = text.style.height;
					}
				} else if(temp_num > text_height) { //else the box is getting smaller
					if(pixelMargin < 3 && pixelMargin >= -45 && text_height < 66) {
						pixelMargin += 15;
						num += 16;
						re_num -= 16;
						text.style.marginTop = pixelMargin.toString() + 'px';
						container.style.height = num.toString() + 'px';
						reply_container.style.marginTop = re_num.toString() + 'px';
						temp = text.style.height;
					}
				}

			}/* 0-timeout to get the already changed text */
	
	//function that handles the different events that can take place inside of the text area
			function delayedResize() {
				window.setTimeout(resize, 0);
			}
	
			observe(text, 'change', resize);

			observe(text, 'cut', delayedResize);
			observe(text, 'paste', delayedResize);
			observe(text, 'drop', delayedResize);
			observe(text, 'keydown', delayedResize);
			text.focus();
			text.select();
			resize();
		}
	
	//recursive call 
		initial();
	
	}
	function toggleWhoList()
	{

		if(id("whoList").style.display=="block")
			id("whoList").style.display="none";
		else
			id("whoList").style.display="block";
				
		var wstrHTML="";
		var session=BACKGROUND.blastResults.getElementsByTagName("blast");
	    for(var i = 0; i < session.length; i++)
		{

			if(session[i].getElementsByTagName("blast_id")[0].childNodes[0].nodeValue==clicked_blast_id.toString())
			{
				recipients=session[i].getElementsByTagName("covu_id");
				wstrHTML += "<table >";	
				for(var x=0;x<recipients.length;x++)
				{	
					wstrHTML += "<tr>";
					wstrHTML += "<td style=' text-align:left; font-size: 12px;' >" + recipients[x].childNodes[0].nodeValue+ "</td>";
					wstrHTML += "</tr>";
				}
				wstrHTML += "</table>";
				document.getElementById("whoListID").innerHTML=wstrHTML;
				return;
			}	
		}
		
	}
	
	function toggleProfile()
	{
		BACKGROUND.UpdateProfile(id('privat_profile').checked);
		id('privacy_content').style.display='none';
		id('save_privacy').style.display='block';
		
	}	
	
	function getcontent()
    {
    	
   	   
	   if(id("invite-content").style.display == 'none')
	   {
		   id("invite-content").style.display='block';
	   }
	   else
	   {
		   id("invite-content").style.display='none';
	   }
	   
		
    }
	
	function getcontent_group()
    {
    	
   	   
	   if(id("invite-content-group").style.display == 'none')
	   {
		   id("invite-content-group").style.display='block';
	   }
	   else
	   {
		   id("invite-content-group").style.display='none';
	   }
	   
		
    }

	function getbkpeople()
	{
		id("search-content-body-view").style.display = 'none';
		id("search_back").style.display = 'none';
		id("content-body-view").style.display='block';
		id("invitePeople-button-container").style.display='block';
		id("search_people").value='';
	}
    
    function friend_request_container(type)
    {
    	switch (type) 
    	{
			case "friend_request" : 
				{
			    	if(id('minus-sign').className=='minus')
							{
								id('minus-sign').className='plus';
								id('request-container').style.display='none';
							}
							else
							{
								id('minus-sign').className='minus';	
								id('request-container').style.display='block';
							}
							break;
				}
				case "sent_request" : 
				{
				if(id('minus-sign-sent').className=='minus')
							{
								id('minus-sign-sent').className='plus';
								id('sent-container').style.display='none';
							}
							else
							{
								id('minus-sign-sent').className='minus';	
								id('sent-container').style.display='block';
							}
							break;
			   }
			   case "available_friends" : 
				{
				if(id('minus-sign-friends').className=='minus')
							{
								id('minus-sign-friends').className='plus';
								id('your-friends-container').style.display='none';
							}
							else
							{
								id('minus-sign-friends').className='minus';	
								id('your-friends-container').style.display='block';
							}
							break;
			    }
			    case "member_container":
			    {
			    	if(id('member_minus_sign').className=='minus'){
			    		id('member_minus_sign').className = 'plus';
			    		id('member_container_rows').style.display = 'none';
			    	} else {
			    		id('member_minus_sign').className = 'minus';
			    		id('member_container_rows').style.display = 'block';
			    	}
			    	break;
			    }
			    case "group_container":
			    {
			    	if(id('group_minus_sign').className=='minus'){
			    		id('group_minus_sign').className = 'plus';
			    		id('group_container_rows').style.display = 'none';
			    	} else {
			    		id('group_minus_sign').className = 'minus';
			    		id('group_container_rows').style.display = 'block';
			    	}
			    	break;
			    }
			default : {
				
				id("invite-content").style.display='block';
			}
    	}
    }
   	function renderFriendProfile(covu_id,first_name,last_name,phone,city,email,avatar)
   	{

		id('friend_profile_user_name').innerText=first_name+' '+last_name;
		id('friend_profile_email_id').innerText=email;
		id('friend_profile_covu_id').innerText=covu_id;
		id('friend_profile_location').innerText=city;
		id('friend_profile_phone_number').innerText=phone;
		id('friend_avt').src=avatar;
		
   	}
    function showMemberProfile(elem,screen)
    {
    	
    	id('friend_profile_user_name').innerText="";
		id('friend_profile_email_id').innerText="";
		id('friend_profile_covu_id').innerText="";
		id('friend_profile_location').innerText="";
		id('friend_profile_phone_number').innerText="";
		id('friend_avt').src='img/dp_large.png';
		if(screen=='screen_dashboard')
			BACKGROUND.getFriendProfile(elem);
		else
		{
    		var parent=elem.parentNode;
    		BACKGROUND.getFriendProfile(parent.getElementsByClassName('people_name')[1].innerText);
		}
    	showScreen('friend_profile_page');
    	
    	id('friend_profile_back_button').addEventListener('click', function(){
			showScreen(screen);
			});
	//id('friend_profile_page').style.display='block';
    }
	function toggleSound()
	{
		BACKGROUND.toggleSound(id('alert_sound').checked);
	}		
	$(document).click(function() {
	 $('#whoList').hide();
	 BACKGROUND.popup_dom=document;
	});

	$('#whoImage').click(function(event) {
	toggleWhoList();
	 event.stopPropagation();
	});
	
	$('#whoList').click(function(event) {
	 event.stopPropagation();
	});
	
	
	
	
	
	
	
	
	
	$(document).ready(function(){
		    $('#blastReply').hycustextarea();
		});
	
	
	
	
	/*This Jquery plugin is a combination of 2 other jquery plugins
1. http://plugins.jquery.com/project/TextAreaResizer
2. http://unwrongest.com/projects/elastic/

*/

/*
	jQuery TextAreaResizer plugin
	Created on 17th January 2008 by Ryan O'Dell
	Version 1.0.4

	Converted from Drupal -> textarea.js
	Found source: http://plugins.jquery.com/misc/textarea.js
	$Id: textarea.js,v 1.11.2.1 2007/04/18 02:41:19 drumm Exp $

	1.0.1 Updates to missing global 'var', added extra global variables, fixed multiple instances, improved iFrame support
	1.0.2 Updates according to textarea.focus
	1.0.3 Further updates including removing the textarea.focus and moving private variables to top
	1.0.4 Re-instated the blur/focus events, according to information supplied by dec


*/
(function($) {
		 
	/* private variable "oHover" used to determine if you're still hovering over the same element */
	var textarea, staticOffset;  // added the var declaration for 'staticOffset' thanks to issue logged by dec.
	var iLastMousePos = 0;
	var iMin = 32;
	var grip;
	/* TextAreaResizer plugin */
	$.fn.TextAreaResizer = function() {
		return this.each(function() {
		    textarea = $(this).addClass('processed'), staticOffset = null;

			// 18-01-08 jQuery bind to pass data element rather than direct mousedown - Ryan O'Dell
		    // When wrapping the text area, work around an IE margin bug.  See:
		    // http://jaspan.com/ie-inherited-margin-bug-form-elements-and-haslayout
		    $(this).wrap('<div class="resizable-textarea"><span></span></div>')
		      .parent().append($('<div class="grippie"></div>').bind("mousedown",{el: this} , startDrag));

		    var grippie = $('div.grippie', $(this).parent())[0];
		    grippie.style.marginRight = (grippie.offsetWidth - $(this)[0].offsetWidth) +'px';

		});
	};
	/* private functions */
	function startDrag(e) {
		textarea = $(e.data.el);
		textarea.blur();
		iLastMousePos = mousePosition(e).y;
		staticOffset = textarea.height() - iLastMousePos;
		textarea.css('opacity', 0.25);
		$(document).mousemove(performDrag).mouseup(endDrag);
		return false;
	}

	function performDrag(e) {
		var iThisMousePos = mousePosition(e).y;
		var iMousePos = staticOffset + iThisMousePos;
		if (iLastMousePos >= (iThisMousePos)) {
			iMousePos -= 5;
		}
		iLastMousePos = iThisMousePos;
		iMousePos = Math.max(iMin, iMousePos);
		textarea.height(iMousePos + 'px');
		if (iMousePos < iMin) {
			endDrag(e);
		}
		return false;
	}

	function endDrag(e) {
		$(document).unbind('mousemove', performDrag).unbind('mouseup', endDrag);
		textarea.css('opacity', 1);
		textarea.focus();
		textarea = null;
		staticOffset = null;
		iLastMousePos = 0;
	}

	function mousePosition(e) {
		return { x: e.clientX + document.documentElement.scrollLeft, y: e.clientY + document.documentElement.scrollTop };
	};
})(jQuery);

(function(g){g.fn.extend({elastic:function(){var h=["paddingTop","paddingRight","paddingBottom","paddingLeft","fontSize","lineHeight","fontFamily","width","fontWeight"];return this.each(function(){function i(c,j){curratedHeight=Math.floor(parseInt(c,10));a.height()!=curratedHeight&&a.css({height:curratedHeight+"px",overflow:j})}function k(){var c=a.val().replace(/&/g,"&amp;").replace(/ /g,"&nbsp;").replace(/<|>/g,"&gt;").replace(/\n/g,"<br />"),j=b.html().replace(/<br>/ig,"<br />");if(c+"&nbsp;"!= j){b.html(c+"&nbsp;");if(Math.abs(b.height()+l-a.height())>3){c=b.height()+l;if(c>=d)i(d,"auto");else c<=e?i(e,"hidden"):i(c,"hidden")}}}if(this.type!="textarea")return false;var a=g(this),b=g("<div />").css({position:"absolute",display:"none","word-wrap":"break-word"}),l=parseInt(a.css("line-height"),10)||parseInt(a.css("font-size"),"10"),e=parseInt(a.css("height"),10)||l*3,d=parseInt(a.css("max-height"),10)||Number.MAX_VALUE,f=0;if(d<0)d=Number.MAX_VALUE;b.appendTo(a.parent());for(f=h.length;f--;)b.css(h[f].toString(), a.css(h[f].toString()));a.css({overflow:"hidden"});a.bind("keyup change cut paste",function(){k()});a.bind("blur",function(){if(b.height()<d)b.height()>e?a.height(b.height()):a.height(e)});a.live("input paste",function(){setTimeout(k,250)});k()})}})})(jQuery);

$.fn.hycustextarea = (function ()
{
	//$(this).elastic();
	$(this).TextAreaResizer();

});