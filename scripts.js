Namespace.import ( this, 'org.incrediberry.display.Color' );

function getAverageRGB( img ) {
	"use strict";
	var blockSize = 5,
	defaultRGB = [0,0,0],
	canvas = document.createElement('canvas'),
	context = canvas.getContext && canvas.getContext('2d'),
	data, width, height,
	i = -4,
	length,
	rgb = [0,0,0],
	count = 0;

	if (!context)
	{
		return defaultRGB;
	}

	height = canvas.height = img.naturalHeight || img.offsetHeight || img.height;
	width = canvas.width = img.naturalWidth || img.offsetWidth || img.width;

	context.drawImage(img, 0, 0);

	try
	{
		data = context.getImageData(0, 0, width, height);
	}
	catch(e)
	{
		//alert('Image is on a different domain. Cannot access color info with canvas');
		return defaultRGB;
	}

	length = data.data.length;

	while ( (i += blockSize * 4) < length )
	{
		++count;
		rgb[0] += data.data[i];
		rgb[1] += data.data[i+1];
		rgb[2] += data.data[i+2];
	}

	// ~~ used to floor values
	rgb[0] = ~~(rgb[0] / count);
	rgb[1] = ~~(rgb[1] / count);
	rgb[2] = ~~(rgb[2] / count);

	return rgb;
}

function updateColors ( element )
{
	"use strict";
	var rgb = getAverageRGB( element );

	var base = new Color ();
	base.setR (rgb[0]);
	base.setG (rgb[1]);
	base.setB (rgb[2]);

	var comp       = base.clone();
	var base_tint  = base.clone();

	// Find the rest of the color palette
	comp.setH ( comp.getH() + 0.5 );

	var comp_tint  = comp.clone();
	var comp_shade = comp.clone();

	comp.setY ( comp.getY() + 0.5 );

	comp_shade.setV ( comp_shade.getV() - 0.2 );
	comp_tint.setV  ( comp_tint.getV()  + 0.2 );
	base_tint.setV  ( base_tint.getV()  + 0.2 );

	// Style text with it
	$('#color1').css( 'background-color', base.getHex() );
	$('#color2').css( 'background-color', base_tint.getHex() );
	$('#color3').css( 'background-color', comp_tint.getHex() );
	$('#color4').css( 'background-color', comp.getHex() );
	$('#color5').css( 'background-color', comp_shade.getHex() );

	// Add hex value in text to boxes
	$('#color1 .label').html( '#' + base.getHex()  );
	$('#color2 .label').html( '#' + base_tint.getHex()  );
	$('#color3 .label').html( '#' + comp_tint.getHex()  );
	$('#color4 .label').html( '#' + comp.getHex()  );
	$('#color5 .label').html( '#' + comp_shade.getHex()  );

	// Change text color by lumen value of bg color
	$('#color1').css ( 'color', ( base.getY() > .5 ) ? '#000' : '#FFF' );
	$('#color2').css ( 'color', ( base_tint.getY() > .5 ) ? '#000' : '#FFF' );
	$('#color3').css ( 'color', ( comp_tint.getY() > .5 ) ? '#000' : '#FFF' );
	$('#color4').css ( 'color', ( comp.getY() > .5 ) ? '#000' : '#FFF' );
	$('#color5').css ( 'color', ( comp_shade.getY() > .5 ) ? '#000' : '#FFF' );

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
