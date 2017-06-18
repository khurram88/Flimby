
function OnSearchFriend(event)
{
	var elem=event.target;
	var eID=elem.id;
	var elemClass=elem.className;
	
	if(elemClass=='primary-link l2' || elemClass=='content-right')
	{
		elem=elem.parentNode;
		showMemberProfile(elem,'screen_people');
	}
	else if(elemClass=='people_name' || elemClass=='people_name' || elemClass=='main' || elemClass=='name' || elemClass=='flimbyID')
	{
		elem=elem.parentNode.parentNode;
		showMemberProfile(elem,'screen_people');
	}
	else if(elemClass=='button-gray-follow')
	{
		peopleController.RequestFriendship(elem);
	}
}

var peopleController={
   

	loadFriendList: function()
	{
		var friends=BACKGROUND.peopleScreen.getFriends();
		id('your-friends-container').innerHTML=''
		for(var i=0;i<friends.length;i++)
		{
			try{
				var friendNode=document.getElementById('my_friend');
				friendNode=friendNode.cloneNode(true);
				friendNode.style.display='block';
				friendNode.id='friend_'+friends[i]['covu_id'];
				var childNodes=friendNode.childNodes;
				var avatar=friendNode.getElementsByTagName('img');
				if(friends[i]['has_avatar']=='true')	
				{
					avatar[0].src=BACKGROUND.member_images+"/"+friends[i]['covu_id'] + ".png";
				}
				var people_content=friendNode.getElementsByClassName('people_name');
				var people_contentMain=friendNode.getElementsByTagName('a');
				people_content[0].innerText=friends[i]['name'];
				people_content[1].innerText=friends[i]['covu_id'];
				var button=friendNode.getElementsByClassName('button-gray');
				button[0].setAttribute('index_attrb',i);
				button[0].setAttribute('data_attrb',friends[i]['covu_id']);
				
				people_contentMain[0].addEventListener('click',function()
					{
						showMemberProfile(this,'screen_people');
					},false);
					
				button[0].addEventListener('click',function()
					{
						peopleController.breakFriendship(this); 
					},false);
	
				id('your-friends-container').appendChild(friendNode);
			}
			catch(e)
			{
				
			}
		}
	},
	loadRequestList: function()
	{
		var friends=BACKGROUND.peopleScreen.getRequests();
		id('request-container').innerHTML=''
		for(var i=0;i<friends.length;i++)
		{
			try{
				var friendNode=document.getElementById('my_requests');
				friendNode=friendNode.cloneNode(true);
				friendNode.style.display='block';
				friendNode.id='friend_request_'+friends[i]['covu_id'];
				var childNodes=friendNode.childNodes;
				var avatar=friendNode.getElementsByTagName('img');
								if(friends[i]['has_avatar']=='true')	
				{
					avatar[0].src=BACKGROUND.member_images+"/"+friends[i]['covu_id'] + ".png";
				}
				var people_content=friendNode.getElementsByClassName('people_name');
				var people_contentMain=friendNode.getElementsByTagName('a');
				people_content[0].innerText=friends[i]['name'];
				people_content[1].innerText=friends[i]['covu_id'];
				var button=friendNode.getElementsByClassName('accept_friendship');
				button[0].setAttribute('index_attrb',i);
				button[0].setAttribute('data_attrb',friends[i]['covu_id']);
				button[1].setAttribute('index_attrb',i);
				button[1].setAttribute('data_attrb',friends[i]['covu_id']);
				button[0].addEventListener('click', function()
					{
						peopleController.acceptRequest(this);
					},false);
					
				button[1].addEventListener('click', function()
					{
						peopleController.breakRequest(this);
					},false);
					
				people_contentMain[0].addEventListener('click',function()
					{
						showMemberProfile(this,'screen_people');
					},false);
					
				id('request-container').appendChild(friendNode);
			}
			catch(e)
			{
				alert('sdfsdf')
			}
		}
	},
	loadSentRequestList: function()
	{
		var friends=BACKGROUND.peopleScreen.getSentRequests();
		id('sent-container').innerHTML=''
		for(var i=0;i<friends.length;i++)
		{
			try{
				var friendNode=document.getElementById('my_sent_requests');
				friendNode=friendNode.cloneNode(true);
				friendNode.style.display='block';
				friendNode.id='friend_sent_'+friends[i]['covu_id'];
				var childNodes=friendNode.childNodes;
				var avatar=friendNode.getElementsByTagName('img');
								if(friends[i]['has_avatar']=='true')	
				{
					avatar[0].src=BACKGROUND.member_images+"/"+friends[i]['covu_id'] + ".png";
				}
				var people_content=friendNode.getElementsByClassName('people_name');
				var people_contentMain=friendNode.getElementsByTagName('a');
				people_content[0].innerText=friends[i]['name'];
				people_content[1].innerText=friends[i]['covu_id'];
				
				var button=friendNode.getElementsByClassName('button-gray');
				button[0].setAttribute('index_attrb',i);
				button[0].setAttribute('data_attrb',friends[i]['covu_id']);
				
				people_contentMain[0].addEventListener('click',function()
					{
						showMemberProfile(this,'screen_people');
					},false);
				
				button[0].addEventListener('click',function()
					{
						peopleController.breakSentRequest(this);
					},false);
				
				id('sent-container').appendChild(friendNode);
			}
			catch(e)
			{
				
			}
		}
	},
	cbInviteByEmail : function(text)
	{
		id('email_success_message').innerText=text;
			$("#email_success_message").fadeIn(3000, function () {
            $("#email_success_message").fadeOut(2000);
          });	
	},
	inviteFriends : function()
	{
		BACKGROUND.RequestFriendship(null,id('friends_request_email').value);

	},

	removeFriendDiv : function(id,index)
	{

				var		friendNode=document.getElementById(id);
				var		parentNode=friendNode.parentNode;
						parentNode.removeChild(friendNode);
						BACKGROUND.peopleScreen.removeFriend(index);


	},
	breakFriendship: function(elem)
	{
		$.prompt('Are you sure you want to remove this friend?',{
			callback:function(result){if(result)
			{
			elem_covu_id=elem.getAttribute('data_attrb');
			BACKGROUND.BreakFriendship(elem_covu_id);
			peopleController.removeFriendDiv('friend_'+elem_covu_id,elem.getAttribute('index_attrb'))
			}},
				buttons:{Ok:true,Cancel:false}, 
				prefix:'extblue'
			});
	},
	removeSentRequestDiv : function(id,index)
	{
		var friendNode=document.getElementById(id);
		var parentNode=friendNode.parentNode;
		parentNode.removeChild(friendNode);
		BACKGROUND.peopleScreen.removeSentFrient(index);
	},
	breakSentRequest: function(elem)
	{
		var elem_covu_id=elem.getAttribute('data_attrb');
		BACKGROUND.BreakFriendship(elem_covu_id);
		this.removeSentRequestDiv('friend_sent_'+elem_covu_id,elem.getAttribute('index_attrb'))
	},
	
	removeRequestDiv : function(id,index)
	{
		var friendNode=document.getElementById(id);
		var parentNode=friendNode.parentNode;
		parentNode.removeChild(friendNode);
		BACKGROUND.peopleScreen.removeRequestFriend(index);
	},
	breakRequest: function(elem)
	{
		var elem_covu_id=elem.getAttribute('data_attrb');
		BACKGROUND.BreakFriendship(elem_covu_id);
		this.removeRequestDiv('friend_request_'+elem_covu_id,elem.getAttribute('index_attrb'));
	},
	acceptRequest: function(elem)
	{
		var elem_covu_id=elem.getAttribute('data_attrb');
		BACKGROUND.AcceptFriendship(elem_covu_id);
		this.removeRequestDiv('friend_request_'+elem_covu_id,elem.getAttribute('index_attrb'))
	},

    changeFriendshipStatus : function(elem)
    {
    	try{
    	var friendNode=document.getElementById(elem);
		var button=friendNode.getElementsByClassName('button-gray-follow');
		var img=friendNode.getElementsByClassName('loading-spinner');
		img[0].style.display='none';
		button[0].style.display='none';
		var span_label=friendNode.getElementsByClassName('span_label');
		span_label[0].style.display='block';
		span_label[0].innerText='pending';
    	}
    	catch(e)
    	{
    		
    	}
    },
    RequestFriendshipSent: function(covu_id)
    {
    	this.changeFriendshipStatus('search_'+covu_id);
    },
    RequestFriendship : function(elem)
    {
    	var elem_covu_id=elem.getAttribute('data_attrb');
    	elem.style.display='none';
    	elem.parentNode.getElementsByClassName('loading-spinner')[0].style.display='block';

		BACKGROUND.RequestFriendship(elem_covu_id);
	//	this.changeFriendshipStatus('search_'+elem_covu_id);
    },
    searchMore: function()
    {

    	$("#dummy_people_search:in-viewport").each(function() {
    		if(peopleController.search_in_progress==false)
    		{
				peopleController.search();
				peopleController.search_in_progress=true;
    		}
        });
    },

    search: function()
    {
    	id("search-content-body-view").style.display = 'block';
		id("search_back").style.display = 'block';
		id("content-body-view").style.display='none';
		id("invitePeople-button-container").style.display='none';
		id('invite-content').style.display='none';
		var keyword=id('search_people').value;
		if(keyword!="")
		{
   	  		BACKGROUND.peopleScreen.search(keyword,this.search_results_length); 
		}
    },
    searchresult : function()
    {
    	this.search_results_length=0;
		this.search();
    },
    search_results_length: 0,
    search_in_progress:false,
    loadSearchResults : function(friends)
    {
    	this.search_in_progress=false;
    	if(this.search_results_length==0)
			id('member-search-container').innerHTML=''
    	this.search_results_length+=friends.length;

		for(var i=0;i<friends.length;i++)
		{
			try{
				var friendNode=document.getElementById('member-search-result');
				friendNode=friendNode.cloneNode(true);
				friendNode.style.display='block';
				friendNode.id='search_'+friends[i]['covu_id'];
				var childNodes=friendNode.childNodes;
				var avatar=friendNode.getElementsByTagName('img');
				if(friends[i]['has_avatar']=='true')	
				{
					avatar[0].src=BACKGROUND.member_images+"/"+friends[i]['covu_id'] + ".png";
				}
				var people_content=friendNode.getElementsByClassName('people_name');
				var people_contentMain=friendNode.getElementsByTagName('a');
				people_content[0].innerText=friends[i]['first_name']+' '+ friends[i]['last_name'];
				people_content[1].innerText=friends[i]['covu_id'];
				var button;
				if(friends[i]['friendship']=='unconnected')
				{
					button=friendNode.getElementsByClassName('button-gray-follow');
					button[0].style.display='block';
					button[0].setAttribute('index_attrb',i);
					button[0].setAttribute('data_attrb',friends[i]['covu_id']);
					
				}
				else
				{
					var span_label=friendNode.getElementsByClassName('span_label');
					span_label[0].style.display='block';
					span_label[0].innerText=friends[i]['friendship'];
				}
									
				id('member-search-container').appendChild(friendNode);

			}
			catch(e)
			{
				
			}
		}
		var element=id('dummy_people_search');
		if(element)
			element.id='';
			
		if(friends.length!=0)
		{
			var wstrHTML = "<div id='dummy_people_search' />";
			document.getElementById("member-search-container").innerHTML+=wstrHTML;

			
			setTimeout(function()
			{
				var targetSearch = document.getElementsByClassName("ui-row-default spaced");
				for(var j=0; j<targetSearch.length; j++)
				{
					var targetSearch_item = targetSearch.item(j);
					targetSearch_item.addEventListener('click',OnSearchFriend ,false);
				}
				
			},0);
			
		}
    },
	clearSearchResults: function()
	{
		id('search_people').value = "";
		id("search-content-body-view").style.display = 'none';
		id("search_back").style.display = 'none';
		id("content-body-view").style.display='block';
		id("invitePeople-button-container").style.display='block';
		id('invite-content').style.display='block'; 
		
			var append_elem = id("member-search-container");
			while (append_elem.hasChildNodes()) 
			{
                append_elem.removeChild(append_elem.lastChild);
            }
	}
};