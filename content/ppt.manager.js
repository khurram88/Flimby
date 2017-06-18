
	var  __pptToken = null;
	var  __pptStatusTimer=null;
	var  __fileInput=null;
var pptManager= {


	getUploadToken : function()
	{
		//this.token = null;
		var	webMethod = ppt_api_url+'/BlastStatus.asmx?op=getUploadToken';
		var soapMessage='<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body><getUploadToken xmlns="http://tempuri.org/" /> </soap:Body></soap:Envelope>';
	    $.ajax({
			type: "POST",
			url: webMethod,
			contentType: "text/xml; charset=\"utf-8\"",
			dataType: "xml",
			data: soapMessage,
			complete: this.setToken
		});
	},
	poolUploadStatus: function()
	{
		__pptStatusTimer=setInterval(this.getTokenStatus,1000);
	},
	getTokenStatus : function()
	{
		if(!__pptToken)
			return;
		var soapMessage='<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body><getTokenStatus   xmlns="http://tempuri.org/" > <token>'+__pptToken["ResponseCode"]+'</token>  </getTokenStatus> </soap:Body></soap:Envelope>';
	    var	webMethod = ppt_api_url+'/BlastStatus.asmx?op=getTokenStatus';
		$.ajax({
			type: "POST",
			url: webMethod,
			contentType: "text/xml; charset=\"utf-8\"",
			dataType: "xml",
			data: soapMessage,
			complete: pptManager.tokenResponse
		});
	},
	tokenResponse : function(xmlHttpRequest, status)
	{
		if(status=="success"  )
		{
			if(ppt_uploading==true)
			{
				var result=xmlHttpRequest.responseXML.documentElement.textContent;
				result=jQuery.parseJSON( result );
				if(result["ResponseCode"]=="1")
				{
					pptManager.getUploadToken();
					//return;
				}
	/*8			else if(result["ResponseCode"]=="0")
				{
					pptManager.getUploadToken();
					alert("Unable to upload your PPT... Try again");
				}*/
				else
				{
					pptManager.getUploadToken();
					alert("An error occured while uploading your file... Please try again.");
				//	alert(result["ResponseCode"]);
				}
			}
		
		}
		else
		{
			alert("Our server was unable to process your request... Please try again.");
					
		}
		ppt_uploading=false;
		//clearInterval(__pptStatusTimer);
	},
	setToken : function(xmlHttpRequest, status)
	{
		if(status=="success"  )
		{
			var result=xmlHttpRequest.responseXML.documentElement.textContent;
			__pptToken=jQuery.parseJSON( result );
		}
		else
		{
			__pptToken=null;
		}
	},
	
	createForm: function()
	{
			var wstrHTML ='';
			wstrHTML += "<form id=\"ppt_form\" enctype=\"multipart/form-data\" method=\"post\" action=\""+ppt_api_url+"/UploadAndConvert.ashx\" target=\"ppt_response_frame1\" >";
			wstrHTML += "<input placeholder=\"Title...\" type=\"text\"  id=\"title_bar\" name=\"blast_title\" />";
			wstrHTML += "<input   id='pptSubmit'  type=\"submit\"   name=\"Submit\" />";
			wstrHTML += "<input type=\"reset\" />";
			wstrHTML += "<input id=\"message_ppt\" type=\"hidden\"  name=\"blast_message\" />";
			wstrHTML +="<input id='ppt_token' type=\"hidden\" value=\"\" name=\"token\" />";
			wstrHTML += "<input id='login_session_key' type=\"hidden\" value=\"\" name=\"login_session_key\" />";
			wstrHTML += "<input id='covu_id' type=\"hidden\" value=\"\" name=\"covu_id\" />";
			wstrHTML += "<input  id=\"who_ppt\" type=\"hidden\" value=\"\" name=\"recipient_name\" />";
			
			wstrHTML += "</form>";
			document.getElementById("idcheck").innerHTML = wstrHTML;
					
	},
	encodeData :function(value)
	{
		value=value.split('&').join('&amp;');
		return encodeURIComponent(value);
	},
	submitForm: function(title,message,recipient)
	{
		recipient=recipient.split(' ').join('');
		recipient=recipient.split(",");
		var rec=new Array();
		for(var i=0;i<recipient.length;i++)
		{
			rec[recipient[i]]="xxx"+recipient[i];
		}
		var recipient_list="";
		for (var p in rec) 
		{
			recipient_list+=","+this.encodeData(p);
		}
		ppt_uploading=true;
		element = document.getElementById("ppt_file");
		
		if(element)
			element.parentNode.removeChild(element);
			
		__fileInput.appendTo(document.getElementById("ppt_form"));
		document.getElementById("title_bar").value=title;
		document.getElementById("login_session_key").value=login_session_key;
		document.getElementById("covu_id").value=leader_id;
		document.getElementById("who_ppt").value=recipient_list;
		document.getElementById("ppt_token").value=getTokenString();
		document.getElementById("message_ppt").value=message;
		
		document.getElementById("pptSubmit").click();
	},
	
		 pptResponse: function()
	{
		this.getTokenStatus();
					var popups = chrome.extension.getViews({type: "popup"});
			if(popups.length)
				popups[0].onStreamButton();
	//	alert("dsd");
	}
};
window.onload = function() {
	pptManager.createForm();
}
