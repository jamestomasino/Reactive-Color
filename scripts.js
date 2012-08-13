function updateColors ( element )
{
	var hsvl, new_hsvl, rgb, compliment;

	rgb = getAverageRGB( element );
	console.log ( 'Image Average RGB: #' + rgb );

	// Set background color to average RGB for easy viewing
	document.body.style.backgroundColor = rgb;

	// Get HSVL of RGB
	hsvl = rgb2hsvl ( rgb );

	new_hsvl = hsvl.slice(0);

	// Find complimentary color
	new_hsvl[0] += .5;
	if (new_hsvl[0] > 1) new_hsvl[0] -= 1;

	// Find reverse lumi
	new_hsvl[3] = (new_hsvl[3] + .5) % 1;

	// Get RGB of compliment
	compliment = hsl2rgb ( new_hsvl[0], new_hsvl[1], new_hsvl[3] );

	console.log ( 'Image Compliment RGB: #' + compliment );

	// Style text with it
	document.getElementById('header').style.color = compliment;
}

function thumbClick ( image )
{
	updateColors( this );
}

function onWindowLoad ()
{
	// Attach events to image tags
	var images = document.getElementsByTagName('img');
	var i = images.length; while (i--)
	{
		images[i].addEventListener('click', thumbClick );
	}

	if (images.length) images[0].click();
}

$(window).load ( onWindowLoad );
