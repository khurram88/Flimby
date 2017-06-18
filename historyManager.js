
var historyManager={
	screen:"",
	prev_screen:"",
	prev_type:"",
	conversation_blast_id : 0,
	message_content:"",
	conversation_message_content:"",
	blast_type:"",
	live: false,
	to_list: null,
	search_scroll_pos: 0,
	
	getScreen : function()
	{
		return this.screen;
	},
	getType : function()
	{
		return this.blast_type;
	},
	setScreen : function(name)
	{
		if(this.screen!=name)
			this.prev_screen=this.screen;
		
		this.screen=name;
	},
	getToList : function()
	{
		return this.to_list;
	},
	setToList : function(list)
	{
		this.to_list=list;
	},
	setScroll : function(pos)
	{
		this.search_scroll_pos=pos;
	},
	
	getScroll : function()
	{
		return this.search_scroll_pos;
	},
	getBlastConversation : function()
	{
		return this.conversation_blast_id;
	},
	
	getPrevScreen : function()
	{
		if(this.prev_screen=='help_pages')
		{
			return this.prev_screen='screen_default'
		}
		else
			return this.prev_screen;
	},
	
	getPrevType : function()
	{
		return this.prev_type;
	},
	
	setBlastConversation : function(id)
	{
		this.conversation_blast_id=id;
	},
	
	setMessageContent : function(message)
	{
		this.message_content=message;
	},

	getMessageContent : function()
	{
		return this.message_content;
	},
	
	setBlastReply : function(message)
	{
		this.conversation_message_content=message;
	},
	
	getBlastReply : function()
	{
		return this.conversation_message_content;
	},
	setBlastType : function(type)
	{
		this.prev_type=this.blast_type;
		this.blast_type=type;
	},
	
	setLive : function(isLive)
	{
		this.live=isLive;
	},
	
	getLive : function()
	{
		return this.live;
	},
	init : function()
	{
		this.conversation_message_content="";
		this.message_content="";
		this.screen='';
		this.conversation_blast_id=0;
		this.blast_type="";
		this.live=false;
		this.prev_screen="";
		this.search_scroll_pos=0;
		this.to_list=null;
	},
	
	reset : function()
	{
		this.conversation_message_content="";
		this.message_content="";
		this.screen='';
		this.conversation_blast_id=0;
		this.blast_type="";
		this.live=false;
		this.prev_screen="";
		this.search_scroll_pos=0;
		this.to_list=null;		
	}
	
};