function updateColors ( element )
{
	var hsvl, hsvl_comp, hsvl_comp_tint, hsvl_comp_shade, hsvl_base_tint,
		rgb_base, rgb_comp, rgb_comp_tint, rgb_comp_shade, rgb_base_tint;

	rgb = getAverageRGB( element );

	// Get HSVL of RGB
	base          = rgb2hsvly ( rgb[0], rgb[1], rgb[2] );
	comp          = base.slice(0);
	comp_tint     = base.slice(0);
	comp_shade    = base.slice(0);
	base_tint     = base.slice(0);

	// Find the rest of the color palette
	comp[0]       = (comp[0] + .5) % 1;
	comp_tint[0]  = (comp_tint[0] + .5) % 1;
	comp_tint[2]  = Math.min( (comp_tint[2] + .2), 1);
	comp_shade[0] = (comp_shade[0] + .5) % 1;
	comp_shade[2] = Math.max( (comp_shade[2] - .2), 0);
	base_tint[2]  = Math.min( (base_tint[2] + .2), 1);

	// Get RGBs
	rgb_base           = rgb;
	rgb_comp           = hsv2rgb ( comp[0],       comp[1],       comp[3] );
	rgb_comp_tint      = hsv2rgb ( comp_tint[0],  comp_tint[1],  comp_tint[2] );
	rgb_comp_shade     = hsv2rgb ( comp_shade[0], comp_shade[1], comp_shade[2] );
	rgb_base_tint      = hsv2rgb ( base_tint[0],  base_tint[1],  base_tint[2] );

	// Get hex values for all the RGBs
	hex_base = getRGBString( rgb_base[0], rgb_base[1], rgb_base[2] );
    hex_base_tint = getRGBString( rgb_base_tint[0], rgb_base_tint[1], rgb_base_tint[2] );
	hex_comp = getRGBString( rgb_comp[0], rgb_comp[1], rgb_comp[2] );
    hex_comp_tint = getRGBString( rgb_comp_tint[0], rgb_comp_tint[1], rgb_comp_tint[2] );
    hex_comp_shade = getRGBString( rgb_comp_shade[0], rgb_comp_shade[1], rgb_comp_shade[2] );

	// Style text with it
	$('#color1').css( 'background-color', hex_base );
	$('#color2').css( 'background-color', hex_base_tint);
	$('#color3').css( 'background-color', hex_comp_tint);
	$('#color4').css( 'background-color', hex_comp);
	$('#color5').css( 'background-color', hex_comp_shade);

	// Add hex value in text to boxes
	$('#color1 .label').html( '#' + hex_base );
	$('#color2 .label').html( '#' + hex_base_tint );
	$('#color3 .label').html( '#' + hex_comp_tint );
	$('#color4 .label').html( '#' + hex_comp );
	$('#color5 .label').html( '#' + hex_comp_shade );

	// Change text color by lumen value of bg color
	$('#color1').css ( 'color', ( getYfromRGB( rgb_base[0], rgb_base[1], rgb_base[2] ) > .5 ) ? '#000' : '#FFF' );
	$('#color2').css ( 'color', ( getYfromRGB( rgb_base_tint[0], rgb_base_tint[1], rgb_base_tint[2] ) > .5 ) ? '#000' : '#FFF' );
	$('#color3').css ( 'color', ( getYfromRGB( rgb_comp_tint[0], rgb_comp_tint[1], rgb_comp_tint[2] ) > .5 ) ? '#000' : '#FFF' );
	$('#color4').css ( 'color', ( getYfromRGB( rgb_comp[0], rgb_comp[1], rgb_comp[2] ) > .5 ) ? '#000' : '#FFF' );
	$('#color5').css ( 'color', ( getYfromRGB( rgb_comp_shade[0], rgb_comp_shade[1], rgb_comp_shade[2] ) > .5 ) ? '#000' : '#FFF' );

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
