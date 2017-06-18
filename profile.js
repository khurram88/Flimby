
var profileScreen={
	covu_id:'',
	first_name:'',
	last_name: '',
	email_id: '',
	location: '',
	avatar:'http://profiles.covucdn.s3.amazonaws.com/44454641554c54/avatar.png',
	phone:'',
	avatar_file: null,
	admin: 'false',
	init: function(covu_id,first_name,last_name,email_id,location,avatar,phone)
	{
		this.covu_id=covu_id;
		this.first_name=first_name;
		this.last_name=last_name;	
		this.email_id=email_id;
		this.location=location;
		this.avatar=avatar;
		this.phone=phone;
		this.admin='false';
	},
	clearData: function()
	{
		this.covu_id='';
		this.first_name='';
		this.last_name='';	
		this.email_id='';
		this.location='';
		this.avatar='http://profiles.covucdn.s3.amazonaws.com/44454641554c54/avatar.png';
		this.avatar_file=null;
		this.phone='';
		this.admin='false';
	},
	changeProfileImage : function()
	{
		
	}
};