var groupScreen={
	
	myGroups: [],
	networks:[],
   	leave_inprogress:false,
   	init : function()
   	{
   		this.myGroups=[];
   		this.networks=[];
   		this.leave_inprogress=false;
   	},
	setMyGrooups : function(groups,exParam)
	{
		this.myGroups=[];
		if(groups)
		{
			for(var i=0;i<groups.length;i++)
			{
				this.myGroups.push({"name": groups[i].getElementsByTagName("name")[0].childNodes[0].nodeValue, "covu_id": groups[i].getElementsByTagName("covu_id")[0].childNodes[0].nodeValue,"size":groups[i].getElementsByTagName("size")[0].childNodes[0].nodeValue,"admin":groups[i].getElementsByTagName("admin")[0].childNodes[0].nodeValue,"preferred":groups[i].getElementsByTagName("preferred")[0].childNodes[0].nodeValue});
			}
		}
		var popups = chrome.extension.getViews({type: "popup"});
		if(popups.length)
		{
			popups[0].groupController.loadGroupsData(this.myGroups);
			if(exParam=='deleteGroup')
			{
				popups[0].groupController.onRemoveCompleted();
			}
		}
	},
	
	cbSearchGroups: function(doc,exParam)
	{
		var r = doc.getElementsByTagName("status")[0].childNodes[0].nodeValue;
		if(r==0)
		{
			groups=doc.getElementsByTagName("group");
			groupScreen.setMyGrooups(groups,exParam);
		}
		else
		{
			var error = errorAlerts.getErrorMessage(doc);
						var popups = chrome.extension.getViews({type: "popup"});
								
			if(popups.length)
				popups[0].showErrorAlert(error);
			else
				showNotification(error);
		}
	},
	cbGetNetworks : function(doc)
	{
		var r = doc.getElementsByTagName("status")[0].childNodes[0].nodeValue;
		if(r==0)
		{
			groupScreen.networks=[];
			networks=doc.getElementsByTagName("network");
			if(networks)
			{
				for(var i=0;i<networks.length;i++)
				{
					groupScreen.networks.push({"name": networks[i].getElementsByTagName("name")[0].childNodes[0].nodeValue, "title": networks[i].getElementsByTagName("title")[0].childNodes[0].nodeValue});
				}
			}
		}
		else
		{
			var error = errorAlerts.getErrorMessage(doc);
						var popups = chrome.extension.getViews({type: "popup"});
								
			if(popups.length)
				popups[0].showErrorAlert(error);
			else
				showNotification(error);
		}	
	},
	GetNetworks: function()
	{
		var pl = new RestClientParameters();
		pl.add("login_session_key",login_session_key );	
		invoke(urlAPI, "GetNetworks", pl, groupScreen.cbGetNetworks);
	},
	getMyGroups: function(showCurrent,exParam)
	{
		if(showCurrent!=false)
		{
			var popups = chrome.extension.getViews({type: "popup"});
			if(popups.length)
			{
				popups[0].groupController.loadGroupsData(this.myGroups);
			}
		}
		var pl = new RestClientParameters();
		pl.add("login_session_key",login_session_key );	
		invoke(urlAPI, "SearchGroups", pl, groupScreen.cbSearchGroups,exParam);
		
	},
	cbCreateGroup: function(doc)
	{
		var r = doc.getElementsByTagName("status")[0].childNodes[0].nodeValue;
		if(r==0)
		{
			groupScreen.getMyGroups();	
			getFriends();
		}
		else
		{
			var error = errorAlerts.getErrorMessage(doc);
						var popups = chrome.extension.getViews({type: "popup"});
								
			if(popups.length)
				popups[0].showErrorAlert(error);
			else
				showNotification(error);
		}
	},
	cbGetGroup : function(doc,is_admin)
	{
		groupScreen.leave_inprogress=false;
		var r = doc.getElementsByTagName("status")[0].childNodes[0].nodeValue;
		var memberDetails=[];
		var groupDetails=[];
		if(r==0)
		{
			memeber=doc.getElementsByTagName("member");
			if(memeber)
			{
				for(var i=0;i<memeber.length;i++)
				{
					memberDetails.push({"first_name": memeber[i].getElementsByTagName("first_name")[0].childNodes[0].nodeValue, "last_name": memeber[i].getElementsByTagName("last_name")[0].childNodes[0].nodeValue, "covu_id": memeber[i].getElementsByTagName("covu_id")[0].childNodes[0].nodeValue, "has_avatar": memeber[i].getElementsByTagName("has_avatar")[0].childNodes[0].nodeValue,"admin": memeber[i].getElementsByTagName("admin")[0].childNodes[0].nodeValue});
				}
			}
			var network=doc.getElementsByTagName("network");
			var network_name="";
			var network_title="";
			try
			{
				if(network.length)
				{
					network_name=network[0].getElementsByTagName('name')[0].childNodes[0].nodeValue;
					network_title= doc.getElementsByTagName('title')[0].childNodes[0].nodeValue;
				}
			}
			catch(e)
			{
				
			}
			groupDetails.push({"name": doc.getElementsByTagName('name')[0].childNodes[0].nodeValue, "covu_id": doc.getElementsByTagName('covu_id')[0].childNodes[0].nodeValue, "network_name":network_name, "network_title": network_title});
	
			var popups = chrome.extension.getViews({type: "popup"});
			if(popups.length)
			{
				popups[0].groupController.renderGroupDetails(memberDetails,groupDetails,is_admin);
			}
		}
		else
		{
			var error = errorAlerts.getErrorMessage(doc);
						var popups = chrome.extension.getViews({type: "popup"});
								
			if(popups.length)
				popups[0].showErrorAlert(error);
			else
				showNotification(error);
		}	
	},
	
	GetGroup : function(covu_id,is_admin)
	{
		var pl = new RestClientParameters();
		pl.add("login_session_key",login_session_key );	
		pl.add("group_covu_id",covu_id );		
		invoke(urlAPI, "GetGroup", pl, groupScreen.cbGetGroup,is_admin);
	},
	
	cbLeaveGroup : function(doc)
	{
		groupScreen.leave_inprogress=false;
		var r = doc.getElementsByTagName("status")[0].childNodes[0].nodeValue;

		if(r==0)
		{
			groupScreen.getMyGroups(false);
			getFriends();
		}
		else
		{
			var error = errorAlerts.getErrorMessage(doc);
						var popups = chrome.extension.getViews({type: "popup"});
								
			if(popups.length)
				popups[0].showErrorAlert(error);
			else
				showNotification(error);
		}	
	},
	
	LeaveGroup: function(covu_id)
	{
		this.leave_inprogress=true;
		var pl = new RestClientParameters();
		pl.add("login_session_key",login_session_key );	
		pl.add("group_covu_id",covu_id );	
		invoke(urlAPI, "LeaveGroup", pl, groupScreen.cbLeaveGroup);	
	},
	
	CreateGroup: function(covu_id,name,info,network)
	{
		var pl = new RestClientParameters();
		pl.add("login_session_key",login_session_key );	
		pl.add("group_covu_id",covu_id );	
		pl.add("name",name );	
		pl.add("network",network );	
		invoke(urlAPI, "CreateGroup", pl, groupScreen.cbCreateGroup);
	},
	
	cbSearchGroup : function(doc)
	{
		var r = doc.getElementsByTagName("status")[0].childNodes[0].nodeValue;
		if(r==0)
		{
			groups=doc.getElementsByTagName("group");
			var resutls=[];
			if(groups)
			{
				for(var i=0;i<groups.length;i++)
				{
					resutls.push({"name": groups[i].getElementsByTagName("name")[0].childNodes[0].nodeValue, "covu_id": groups[i].getElementsByTagName("covu_id")[0].childNodes[0].nodeValue,"size":groups[i].getElementsByTagName("size")[0].childNodes[0].nodeValue,"admin":groups[i].getElementsByTagName("admin")[0].childNodes[0].nodeValue,"preferred":groups[i].getElementsByTagName("preferred")[0].childNodes[0].nodeValue,"member":groups[i].getElementsByTagName("member")[0].childNodes[0].nodeValue});
				}
			}
			var popups = chrome.extension.getViews({type: "popup"});
			if(popups.length)
			{
				popups[0].groupController.loadSearchResults(resutls);
			}
		}
		else
		{
			var error = errorAlerts.getErrorMessage(doc);
						var popups = chrome.extension.getViews({type: "popup"});
								
			if(popups.length)
				popups[0].showErrorAlert(error);
			else
				showNotification(error);
		}
	},
	cbJoinGroup : function(doc,id)
	{
		var r = doc.getElementsByTagName("status")[0].childNodes[0].nodeValue;
		if(r==0)
		{	
			getFriends();
		 	var popups = chrome.extension.getViews({type: "popup"});
			if(popups.length)
			{
				popups[0].groupController.joinSuccessful(id);
			}
		}
	},
	JoinGroup : function(covu_id)
	{
		var pl = new RestClientParameters();
		pl.add("login_session_key",login_session_key );	
		pl.add("group_covu_id",covu_id );	
		invoke(urlAPI, "JoinGroup", pl, groupScreen.cbJoinGroup,covu_id);
	},
	search: function(keyword,start)
	{
		var pl = new RestClientParameters();
		pl.add("login_session_key",login_session_key );	
		pl.add("keyword",keyword );	
		pl.add("start",start );
		invoke(urlAPI, "SearchGroups", pl, groupScreen.cbSearchGroup);
	},
	
	cbDeleteGroup : function(doc)
	{
		var r = doc.getElementsByTagName("status")[0].childNodes[0].nodeValue;
		if(r==0)
		{
			groupScreen.getMyGroups(false,'deleteGroup');		
			getFriends();
		}
		else
		{
			var error = errorAlerts.getErrorMessage(doc);
			var popups = chrome.extension.getViews({type: "popup"});
								
			if(popups.length)
				popups[0].showErrorAlert(error);
			else
				showNotification(error);
		}	
	},
	
	cbUpdateGroup : function(doc)
	{
		var r = doc.getElementsByTagName("status")[0].childNodes[0].nodeValue;
		if(r==0)
		{
			groupScreen.getMyGroups();		
			getFriends();
		}
		else
		{
			var error = errorAlerts.getErrorMessage(doc);
			var popups = chrome.extension.getViews({type: "popup"});
								
			if(popups.length)
				popups[0].showErrorAlert(error);
			else
				showNotification(error);
		}		
	},
	UpdateGroup : function(covu_id,name,info,network)
	{
			var pl = new RestClientParameters();
		pl.add("login_session_key",login_session_key );	
		pl.add("group_covu_id",covu_id );	
				pl.add("name",name );
						pl.add("network",network );
		invoke(urlAPI, "UpdateGroup", pl, groupScreen.cbUpdateGroup);	
	},
	
	cbSetPreferredGroup : function(doc)
	{
		groupScreen.getMyGroups();
	},
	SetPreferredGroup : function(covu_id)
	{
		var pl = new RestClientParameters();
		pl.add("login_session_key",login_session_key );	
		pl.add("group_covu_id",covu_id );	
		invoke(urlAPI, "SetPreferredGroup", pl, groupScreen.cbSetPreferredGroup);		
	},
	DeleteGroup : function(covu_id)
	{
		var pl = new RestClientParameters();
		pl.add("login_session_key",login_session_key );	
		pl.add("group_covu_id",covu_id );	
		invoke(urlAPI, "DeleteGroup", pl, groupScreen.cbDeleteGroup);
	},
	cbRemoveFromGroup : function(doc,group_covu_id)
	{
		groupScreen.GetGroup(group_covu_id);
		getFriends();
	},
	RemoveFromGroup : function(friend_covu_id,group_covu_id)
	{
		var pl = new RestClientParameters();
		pl.add("login_session_key",login_session_key );	
		pl.add("group_covu_id",group_covu_id );	
			pl.add("member_covu_id",friend_covu_id );		
		invoke(urlAPI, "LeaveGroup", pl, groupScreen.cbRemoveFromGroup,group_covu_id);
	},
	cbInviteMembersToGroup : function(doc)
	{
		var r = doc.getElementsByTagName("status")[0].childNodes[0].nodeValue;
		if(r==0)
		{
			var popups = chrome.extension.getViews({type: "popup"});
			if(popups.length)
				{
						popups[0].groupController.cbInviteByEmail('successfully sent invitation');
				}
		}
		else
		{
			var popups = chrome.extension.getViews({type: "popup"});
			if(popups.length)
				{
						popups[0].groupController.cbInviteByEmail('unable to send invitation');
				}
		}	
	},
	InviteMembersToGroup : function(group_covu_id,email)
	{
		var pl = new RestClientParameters();
		pl.add("login_session_key",login_session_key );	
					var recipient=email.split(' ').join('');
			recipient=recipient.split(",");
			var rec=new Array();
			
			for(var i=0;i<recipient.length;i++)
			{
				rec[recipient[i]]="xxx"+recipient[i];
			}
			
			for (var p in rec) 
			{
				pl.add("emails[]",encodeData(p));
			}
			pl.add("group_covu_id",encodeData(group_covu_id));
			invoke(urlAPI, "InviteMembersToGroup", pl, groupScreen.cbInviteMembersToGroup);
	}
};