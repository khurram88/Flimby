
	function loadHistory()
	{
		id('message_input').value=BACKGROUND.historyManager.getMessageContent();
		id('blastReply').value=BACKGROUND.historyManager.getBlastReply();	
		
		clicked_blast_id=BACKGROUND.historyManager.getBlastConversation();
		search_scroll=BACKGROUND.historyManager.getScroll();
		loadToList(BACKGROUND.historyManager.getToList());
		if(getLive())
		{
			onLive();
		}
	}
	function loadToList(list)
	{
		try
		{
		for(var i=0;i<list.length;i++)
		{
			$("#to_box").tokenInput("add",list[i]);
		}
		}
		catch(e)
		{
			
		}
	}
	function saveToList()
	{
		BACKGROUND.historyManager.setToList($("#to_box").tokenInput("get"))	;
	}
	function getPrevScreen()
	{
		return BACKGROUND.historyManager.getPrevScreen();	
	}
	function getPrevType()
	{
		return BACKGROUND.historyManager.getPrevType();
	}
	function getScreen()
	{
		return BACKGROUND.historyManager.getScreen();
	}
	
	function getScreenType()
	{
		return BACKGROUND.historyManager.getType();
	}
	
	function getLive()
	{
		return BACKGROUND.historyManager.getLive();
	}
	
	function saveLive(isLive)
	{
		BACKGROUND.historyManager.setLive(isLive);
	}
	function saveReply()
	{
		BACKGROUND.historyManager.setBlastReply(id('blastReply').value);
	}
	
	function saveBlastMessage()
	{
		BACKGROUND.historyManager.setMessageContent(id('message_input').value);
	}
	
	function saveBlastID()
	{
		BACKGROUND.historyManager.setBlastConversation(clicked_blast_id);
	}
	function saveBlastType(type)
	{
		BACKGROUND.historyManager.setBlastType(type);
	}
	
	function saveScroll(pos)
	{
		BACKGROUND.historyManager.setScroll(pos);
	}