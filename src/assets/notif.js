function showNotification(){
	$.notify({
		// options
		message: 'Hello World' 
	},{
		// settings
		type: 'info',
		delay: 2000,
		animate: {
			enter: 'animated fadeInDown',
			exit: 'animated fadeOutUp'
		},
	});
}