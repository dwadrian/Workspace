<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Frameset//EN">
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=Cp1252">
		<title>Administracion Gym</title>
		<link rel="icon" type="image/png" href="../Images/FavIcon.ico" />
		<link rel="stylesheet" type="text/css"href="http://fonts.googleapis.com/css?family=Open+Sans:400,300" />
		<link rel="stylesheet" type="text/css" href="../Styles/Superfish.css" />
		<link rel="stylesheet" type="text/css" href="../Styles/Fancybox.css" />
		<link rel="stylesheet" type="text/css" href="../Styles/Style.css" />
		
		<script>
			<src="../Scripts/jQuery.js" />
	        <src"../Scripts/jQueryEasing.js" />
	        <src="../Scripts/Menu.js" />
	        <src="../Scripts/Fancybox.js" />
	        <src="../Scripts/TBBMs.js" />
	        <src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js" />
	        
	    </script>
	<script>
			var modal = (function(){
				var 
				method = {},
				$overlay,
				$modal,
				$content,
				$close;

				// Center the modal in the viewport
				method.center = function () {
					var top, left;

					top = Math.max($(window).height() - $modal.outerHeight(), 0) / 2;
					left = Math.max($(window).width() - $modal.outerWidth(), 0) / 2;

					$modal.css({
						top:top + $(window).scrollTop(), 
						left:left + $(window).scrollLeft()
					});
				};

				// Open the modal
				method.open = function (settings) {
					$content.empty().append(settings.content);

					$modal.css({
						width: settings.width || 'auto', 
						height: settings.height || 'auto'
					});

					method.center();
					$(window).bind('resize.modal', method.center);
					$modal.show();
					$overlay.show();
				};

				// Close the modal
				method.close = function () {
					$modal.hide();
					$overlay.hide();
					$content.empty();
					$(window).unbind('resize.modal');
				};

				// Generate the HTML and add it to the document
				$overlay = $('<div id="overlay"></div>');
				$modal = $('<div id="modal"></div>');
				$content = $('<div id="content"></div>');
				$close = $('<a id="close" href="#">close</a>');

				$modal.hide();
				$overlay.hide();
				$modal.append($content, $close);

				$(document).ready(function(){
					$('body').append($overlay, $modal);						
				});

				$close.click(function(e){
					e.preventDefault();
					method.close();
				});

				return method;
			}());

			// Wait until the DOM has loaded before querying the document
			$(document).ready(function(){

				$.get('../ModalBox/ajax.html', function(data){
					modal.open({content: data});
				});

				$('a#howdy').click(function(e){
					modal.open({content: "Hows it going?"});
					e.preventDefault();
				});
			});
		</script>
	</head>
	<body>
		
	<a id='howdy' href='#'>Howdy</a>
	
	</body>

</html>
