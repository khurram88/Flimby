var peopleScreen={
   
   	friends: [],
   	requests: [],
	sent_requests: [],
	
	clearData: function()
	{
		this.friends=[];
		this.requests=[];
		this.sent_requests=[];
	},
	init: function(friends)
	{
	//	this.friends=friends;
	},
	
	getFriends: function()
	{
		return this.friends;
	},
	
	setFriends: function(friends)
	{
		this.friends=friends;
	},
	
	setFriendsRequests: function(requests)
	{
		this.requests=requests;
	},
	
	setFriendsSentRequests: function(requests)
	{
		this.sent_requests=requests;
	},	
	getRequests: function()
	{
		return this.requests;
	},
	getSentRequests: function()
	{
		return this.sent_requests;
	},
	removeFriend : function(index)
	{
		this.friends.splice(index,1);
	},
	removeSentFrient : function(index)
	{
		this.sent_requests.splice(index,1);
	},
	
	removeRequestFriend : function(index)
	{
		this.requests.splice(index,1);
	},	
	
	search : function(key,start_limit)
	{
		SearchMembers(key,start_limit);
	},
	clearSearch : function()
	{
		var popups = chrome.extension.getViews({type: "popup"});
			if(popups.length)
			{
					popups[0].peopleController.clearSearchResults();
			}
		
		//this.search_started=false;
	},
	
};