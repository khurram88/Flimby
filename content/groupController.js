function groupDetailPro(event)
{
	var elem=event.target;
	var eID=elem.id;
	var elemClass=elem.className;
	if(elemClass=='primary-link l2')
	{
		showMemberProfile(elem,'screen_groups');
	}
	else if(elemClass=='main' || elemClass=='people_name' || elemClass=='name' || elemClass=='flimbyID')
	{
		var elem=elem.parentNode;
		showMemberProfile(elem,'screen_groups');
	}
	else if(elemClass=='button-gray')
	{
		groupController.removeFriendFromGroup(elem);
	}	
}
function groupJoin(event)
{
	var elem=event.target;
	groupController.joinGroup(elem);
}

function groupControl(event)
{
	var elem=event.target;
	var eID=elem.id;
	var elemClass=elem.className;
	if(elemClass=='star')
	{
		groupController.setPreferredGroup(elem);
	}
	else if(elemClass=='primary-link')
	{
		id('InviteContentGrp').style.display='none';
		groupController.showGroupDetails(elem);
	}
	else if(elemClass=='button-gray')
	{
		groupController.leaveGroup(elem);
	}
}




var groupController={
	join_inprogress: false,
	allow_submit :false,
	groupElement: null,
	
	loadNetworks: function()
	{
		id('dropdownlist').innerHTML="";
		var network=BACKGROUND.groupScreen.networks;
		
		for(var i=0;i<network.length;i++)
		{
			var name=id('network_name').cloneNode(true);
			name.style.display='block';
			name.id='available_network_list_'+i.toString();
			name.setAttribute('name',network[i]['name']);
			name.innerText=network[i]['title'];
			id('dropdownlist').appendChild(name);
		}
	},
	loadEditNetworks: function()
	{
		id('dropdownlist_editgroup').innerHTML="";
		var network=BACKGROUND.groupScreen.networks;
		
		for(var i=0;i<network.length;i++)
		{
			var name=id('edit_network_name').cloneNode(true);
			name.style.display='block';
			name.id='';
			name.setAttribute('name',network[i]['name']);
			name.innerText=network[i]['title'];
			id('dropdownlist_editgroup').appendChild(name);
		}
	},
	
	validate_addgroup : function()
	{
		//resetSignUpFields();
		var missing_field=false;
		
		if(id("create_group_covu_id").value.length<1)
		{
			id("warning_group_lengthCharacters").style. display="block";		
			missing_field=true;
		}
		
		/*if(missing_field)
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
		}*/
		return missing_field;
	},
	
	cbIsCoVuIdAvailablegroup : function(doc)
	{
	
		id("warning_wait_group").style.display = 'none';

		var r = doc.getElementsByTagName("status")[0].childNodes[0].nodeValue;
		if(r==0)
		{
			if(doc.getElementsByTagName("available")[0].childNodes[0].nodeValue=="false")
			{
			    this.allow_submit=false;
				id("warning_notAvailable_group").style.display = 'block';
				
				}
			else
			{
				this.allow_submit=true;
				
				id("warning_notAvailable_group").style.display = 'none';				
				}
		}
		else
		{
			id("warning_notAvailable_group").style.display = 'block';
			
		}
	},
	
	clearCoVuIDAlerts : function ()
	{
		id("warning_allowCharacters_group").style.display = 'none';
		id("warning_allowCharacters1_group").style.display= 'none';
		id("warning_lengthCharacters_group").style.display='none';
		id("warning_notAvailable_group").style.display = 'none';
	},
	
	checkidgroup : function()
	{
	    
		allowSubmit=false;
		if(id("create_group_covu_id").value.length<3 || id("create_group_covu_id").value.length>32)
		{
			groupController.clearCoVuIDAlerts();
			id("warning_lengthCharacters_group").style.display='block';
			id("warning_notAvailable_group").style.display = 'none';
				
			return;
		}
		//id("warning_lengthCharacters_group").style.display='none';
		var pattern=/^([a-zA-Z0-9])+([a-zA-Z0-9_.-])+([a-zA-Z0-9])$/;
		id("warning_notAvailable_group").style.display = 'none';
		if(pattern.test(id("create_group_covu_id").value))
		{
			groupController.clearCoVuIDAlerts();
			
			id("warning_wait_group").style.display = 'block';
			id("warning_notAvailable_group").style.display = 'none';
			
			id("warning_notAvailable_group").style.display = 'none';
				
			groupController.isCoVuIDgroup(id("create_group_covu_id").value);
		}
		else
		{
			var pattern=/^([a-zA-Z0-9]+)$/
			if(pattern.test(id("create_group_covu_id").value[0]) & pattern.test(id("create_group_covu_id").value[id("create_group_covu_id").value.length-1]))
			{
				groupController.clearCoVuIDAlerts();
				id("warning_allowCharacters_group").style.display = 'block';
				id("warning_allowCharacters1_group").style.display= 'none';
				id("warning_notAvailable_group").style.display = 'none';
				
			}
			else
			{
				groupController.clearCoVuIDAlerts();
				id("warning_allowCharacters1_group").style.display= 'block';
				id("warning_allowCharacters_group").style.display= 'none';
				id("warning_notAvailable_group").style.display = 'none';
				
			}
		}
	},
	
	createGroup : function()
	{
	
	   if(!this.allow_submit && id('create_group_name').value=='')
	   {
	       id('create_group_name').style.borderColor = "red";
		   
			return;
			}
		BACKGROUND.groupScreen.CreateGroup(id('create_group_covu_id').value, id('create_group_name').value,id('create_group_info').value,id('selected_network').getAttribute('name'));
		showScreen('screen_groups');
		id('create_group_covu_id').value='';
		id('create_group_name').value='';
		id('create_group_info').value='';
		id('available_network_list_0').click();
	//	name.getAttribute('');
		//id('selected_network').getAttribute('name')='';
	},
	
	isCoVuIDgroup : function(id)
	{
	
		var pl = new BACKGROUND.RestClientParameters();
		pl.add("covu_id", id);
		BACKGROUND.invoke(BACKGROUND.urlAPI, "IsCoVuIdAvailable", pl, groupController.cbIsCoVuIdAvailablegroup);
	},
	covu_channel : function(elem)
	{
		id('dropdownlist').style.display='none';
		id('selected_network').innerText=elem.innerText;
		id('selected_network').setAttribute('name',elem.getAttribute('name'));
	},
	edit_covu_channel : function(elem)
	{
		id('dropdownlist_editgroup').style.display='none';
		id('selected_edit_network').innerText=elem.innerText;
		id('selected_edit_network').setAttribute('name',elem.getAttribute('name'));	
	},
	removeFriendFromGroup : function(elem)
	{
		
		$.prompt('Are you sure you want to remove this friend?',{
			callback:function(result){if(result)
					{
						elem.parentNode.getElementsByClassName('loading-spinner')[0].style.display='block';
						elem.style.display='block';
						BACKGROUND.groupScreen.RemoveFromGroup(
						elem.getAttribute('friend_covu_id'),
						elem.getAttribute('group_covu_id'));
						

					}},
				buttons:{Ok:true,Cancel:false}, 
				prefix:'extblue'
			});

	},
	renderGroupDetails : function(friends,group,my_group)
	{
		if(id('detail_group_header_name').getAttribute('data_attrb')!=group[0]['covu_id'])
			return;
	//	var my_group=false;
		id('Member_detail_group').innerHTML='';	
		id('Admin_detail_group').innerHTML='';
		for(var i=0;i<friends.length;i++)
		{
			try{
				var friendNode=document.getElementById('group_member_1');
				friendNode=friendNode.cloneNode(true);
				friendNode.style.display='block';
				friendNode.id='';
				var childNodes=friendNode.childNodes;
				var avatar=friendNode.getElementsByTagName('img');
				
				if(friends[i]['has_avatar'] =='true')
				{
					avatar[0].src=BACKGROUND.member_images+"/"+friends[i]['covu_id'] + ".png";
				}
				else
				{
					avatar[0].src=BACKGROUND.default_image+"/"+"avatar.png";
				}
				
				var people_content=friendNode.getElementsByClassName('people_name');
				people_content[0].innerText=friends[i]['first_name']+' '+friends[i]['last_name'];
				people_content[1].innerText=friends[i]['covu_id'];
				if(friends[i]['admin']=='false')
				{
					id('Member_detail_group').appendChild(friendNode);
					if(my_group=='true')
					{
						var button=friendNode.getElementsByClassName('button-gray');
						button[0].style.display='block';
						button[0].setAttribute('friend_covu_id',friends[i]['covu_id'])
						button[0].setAttribute('group_covu_id',group[0]['covu_id'])
					}
				}
				else
				{
					if(friends[i]['covu_id']==BACKGROUND.leader_id)
					{
						id('edit_group_button').style.display='block';
						id('InviteContentGrp').style.display='block';
						id('edit_group_button').setAttribute('data_attrb',group[0]['covu_id']);
						id('remove_group_button').setAttribute('data_attrb',group[0]['covu_id']);
						id('edit_group_covu_id').value=group[0]['covu_id'];
						id('selected_edit_network').innerText=group[0]['network_title'];
						id('selected_edit_network').setAttribute('name',group[0]['network_name']);
						id('edit_group_header_name').innerText=id('edit_group_name').value=group[0]['name'];
					//	my_group=true;
					}
					else
					{
						id('edit_group_button').style.display='none';
						id('InviteContentGrp').style.display='none';
					}
					id('Admin_detail_group').appendChild(friendNode);
				}
				setTimeout(function()
				{
					var targeted = document.getElementsByClassName("ui-row-default spaced");
					for(var j=0; j<targeted.length; j++)
					{
						var target_item = targeted.item(j);
						target_item.addEventListener('click',groupDetailPro ,false);
					}
				
				},0);
					
			}
			catch(e)
			{

			}
		}
	},
	updateGroup : function(elem)
	{
		BACKGROUND.groupScreen.UpdateGroup(id('edit_group_covu_id').value,id('edit_group_name').value,id('edit_group_info').value,id('selected_edit_network').getAttribute('name'));		
		showScreen('screen_groups');
	},

	
	onRemoveCompleted : function()
	{
		$.unblockUI();
	},
	
	cbRemoveGroup : function(result)
	{
		if(result)
		{
			$.blockUI();
			showScreen('screen_groups');
			BACKGROUND.groupScreen.DeleteGroup(groupController.groupElement.getAttribute('data_attrb'));
			
		}
	},
	removeGroup : function(elem)
	{
		this.groupElement=elem;
				$.prompt('Are you sure you want to delete  group?',{
				callback: groupController.cbRemoveGroup,
				buttons:{Ok:true,Cancel:false}, 
				prefix:'extblue'
			});

	},
	showGroupDetails : function(elem)
	{
		BACKGROUND.groupScreen.GetGroup(elem.getAttribute('data_attrb'),elem.getAttribute('admin_attrb'));
		id('Member_detail_group').innerHTML='';	
		id('Admin_detail_group').innerHTML='';
		id('edit_group_button').style.display='none';
		id('detail_group_header_name').innerText=elem.getAttribute('title_attrb');
		id('detail_group_header_name').setAttribute('data_attrb',elem.getAttribute('data_attrb'));		
		showScreen('screen_group_detail');
	},
	leaveGroup : function(elem)
	{
		if(BACKGROUND.groupScreen.leave_inprogress==false)
		{
			BACKGROUND.groupScreen.LeaveGroup(elem.getAttribute('data_attrb'));
			elem.parentNode.getElementsByClassName('loading-spinner')[0].style.display='block';
			elem.style.display='none';
		}
	},
    searchMore: function()
    {

    	$("#dummy_group_search:in-viewport").each(function() {
    		if(groupController.search_in_progress==false)
    		{
				groupController.search();
				groupController.search_in_progress=true;
    		}
        });
    },
	joinGroup : function(elem)
	{
		if(this.join_inprogress==false)
		{
			this.join_inprogress=true;
			var covu_id=elem.getAttribute('data_attrb');
			var friendNode=document.getElementById('group_search_'+covu_id);
			var img=friendNode.getElementsByClassName('loading-spinner');
			img[0].style.display='block';
			elem.style.display='none';
			BACKGROUND.groupScreen.JoinGroup(elem.getAttribute('data_attrb'));
		}
	},
	joinSuccessful : function(covu_id)
	{
		try{
			
			this.join_inprogress=false;
			var friendNode=document.getElementById('group_search_'+covu_id);
			var people_content=friendNode.getElementsByClassName('people_name');
			var leaveButton=friendNode.getElementsByClassName('button-gray');
			var img=friendNode.getElementsByClassName('loading-spinner');
			img[0].style.display='none';
			leaveButton[0].style.display='none';
			people_content[2].style.display='block';
		}
		catch(e)
		{
			
		}
		
	},
	search: function()
    {
    	id("Search-page-groupHeader").style.display = 'block';
		id("content-container-searchpage").style.display = 'block';
		id("content-containergroup").style.display='none';
		id("header-group").style.display='none';
		var keyword=id('search_group').value;
		if(keyword!="")
		{
   	  		BACKGROUND.groupScreen.search(keyword,this.search_results_length); 
		}
    },
    searchresult : function()
    {
	   
    	this.search_results_length=0;
		this.search();
    },
    
    loadSearchResults : function(friends)
    {
    	this.search_in_progress=false;
    	if(this.search_results_length==0)
			id('group_search_container').innerHTML=''
    	this.search_results_length+=friends.length;

		for(var i=0;i<friends.length;i++)
		{
			try{
				var friendNode=document.getElementById('group_search_1');
				friendNode=friendNode.cloneNode(true);
				friendNode.style.display='block';
				friendNode.id='group_search_'+friends[i]['covu_id'];
				var childNodes=friendNode.childNodes;

				
				var people_content=friendNode.getElementsByClassName('people_name');
				people_content[0].innerText=friends[i]['name'];
				people_content[1].innerText=friends[i]['covu_id'];
				

				if(friends[i]['member']=='false')
				{
					var leaveButton=friendNode.getElementsByClassName('button-gray');
					leaveButton[0].setAttribute('data_attrb',friends[i]['covu_id']);

				}
				else
				{
					var leaveButton=friendNode.getElementsByClassName('button-gray');
					leaveButton[0].style.display='none';
					people_content[2].style.display='block';
				}
				id('group_search_container').appendChild(friendNode);
			}
			catch(e)
			{

			}
			
			
		}
				var element=id('dummy_group_search');
		if(element)
			element.id='';
			
		if(friends.length!=0)
		{
			var wstrHTML = "<div id='dummy_group_search' />";
			document.getElementById("group_search_container").innerHTML+=wstrHTML;
		}
		
		setTimeout(function()
			{
				var targeted = document.getElementsByClassName("button-gray");
				for(var j=0; j<targeted.length; j++)
				{
					var target_item = targeted.item(j);
					target_item.addEventListener('click',groupJoin ,false);
				}
				
			},0);
    },
    
    search_results_length: 0,
    search_in_progress:false,
	
	loadGroupsData: function(friends)
	{
		this.loadNetworks();
		id('group_perfered_container').innerHTML='';
		id('my_groups_container').innerHTML='';	
		id('joined_container').innerHTML='';	
		//var friends=BACKGROUND.peopleScreen.getFriends();
		for(var i=0;i<friends.length;i++)
		{
			var friendNode;
				if(friends[i]['preferred']=='true')
				{
					friendNode=document.getElementById('perfered_group_1');
				}
				else if(friends[i]['admin']=='true')
				{
					friendNode=document.getElementById('my_group_1');	
				}
				else
					friendNode=document.getElementById('joined_group_1');

				friendNode=friendNode.cloneNode(true);
				friendNode.style.display='block';
				friendNode.id='group_'+friends[i]['covu_id'];
				var childNodes=friendNode.childNodes;
				var people_content=friendNode.getElementsByClassName('primary-link');
				people_content[0].innerText=friends[i]['name']+' ('+friends[i]['size']+')';
				people_content[0].setAttribute('data_attrb',friends[i]['covu_id']);
				people_content[0].setAttribute('title_attrb',friends[i]['name']);
				people_content[0].setAttribute('admin_attrb',friends[i]['admin']);
				if(friends[i]['preferred']=='true')
				{
					id('group_perfered_container').appendChild(friendNode);
				}
				else if(friends[i]['admin']=='true')
				{
					id('my_groups_container').appendChild(friendNode);		
				}
				else
				{
					var leaveButton=friendNode.getElementsByClassName('button-gray');
					leaveButton[0].setAttribute('data_attrb',friends[i]['covu_id']);
					id('joined_container').appendChild(friendNode);	
				}
			setTimeout(function()
			{
				var targeted = document.getElementsByClassName("ui-row-default spaced");
				for(var j=0; j<targeted.length; j++)
				{
					var target_item = targeted.item(j);
					target_item.addEventListener('click',groupControl ,false);
				}
				
			},0);

		}
	},
	cbInviteByEmail : function(text)
	{
		id('group_email_success_message').innerText=text;
			$("#group_email_success_message").fadeIn(3000, function () {
            $("#group_email_success_message").fadeOut(2000);
          });	
	},
	sendGroupInvitation : function(elem)
	{
		if(id('group_email_invite_input').value!='')
			BACKGROUND.groupScreen.InviteMembersToGroup(id('detail_group_header_name').getAttribute('data_attrb'),id('group_email_invite_input').value);
	},
	
	setPreferredGroup : function(elem)
	{
		var covu_id=elem.parentNode.getElementsByClassName('primary-link')[0].getAttribute('data_attrb');
		elem.parentNode.getElementsByClassName('primary-link')[0].getAttribute('data_attrb');
		elem.parentNode.getElementsByClassName('loading-spinner')[0].style.display='block';
		elem.style.display='none';
		BACKGROUND.groupScreen.SetPreferredGroup(covu_id);
		
	}
}