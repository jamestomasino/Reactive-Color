// Function source from: http://stackoverflow.com/questions/2541481/get-average-color-of-image-via-javascript
function getAverageRGB( img )
{
	var blockSize = 5,
	defaultRGB = [0,0,0],
	canvas = document.createElement('canvas'),
	context = canvas.getContext && canvas.getContext('2d'),
	data, width, height,
	i = -4,
	length,
	rgb = [0,0,0];
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

function rgb2hsvly ( r, g, b )
{
	// Get basics for conversion
	r /= 255;
    g /= 255;
    b /= 255;

	var max = Math.max(r, g, b), min = Math.min(r, g, b);
	var h, s, v = max;
	var d = max - min;

	// Lightness value
	l = 0.5 * (max + min);

	// Luma value
	y = (0.30 * r) + ( 0.59 * g ) + ( 0.11 * b );

	s = max == 0 ? 0 : d / max;

	if (d == 0) {
		h = 0;
	} else {
		switch ( max ) {
			case r: h = ( g - b ) / d + ( g < b ? 6 : 0 ); break;
			case g: h = ( b - r ) / d + 2; break;
			case b: h = ( r - g ) / d + 4; break;
		}

		h /= 6;
	}

	return [h,s,v,l,y];
}

function hsv2rgb ( h, s, v )
{
	h *= 360;
	var c = s * v;
	var h1 = h / 60;
	var x = c * ( 1 - Math.abs( h1 % 2 - 1) );

	if (h1 < 1) {
		rgb = [ c, x, 0 ];
	} else if ( h1 < 2 ) {
		rgb = [ x, c, 0 ];
	} else if ( h1 < 3 ) {
		rgb = [ 0, c, x ];
	} else if ( h1 < 4 ) {
		rgb = [ 0, x, c ];
	} else if ( h1 < 5 ) {
		rgb = [ x, 0, c ];
	} else if ( h1 < 6 ) {
		rgb = [ c, 0, x ];
	}

	var m = v - c;
	rgb = [rgb[0] + m, rgb[1] + m, rgb[2] + m];

	rgb[0] = Math.round(rgb[0] * 255);
	rgb[1] = Math.round(rgb[1] * 255);
	rgb[2] = Math.round(rgb[2] * 255);

	return rgb;
}


function hsl2rgb ( h, s, l )
{
	h *= 360;
	var c = (1 - Math.abs( 2 * l - 1 ) ) * s;
	var h1 = h / 60;
	var x = c * ( 1 - Math.abs( h1 % 2 - 1) );

	if (h1 < 1) {
		rgb = [ c, x, 0 ];
	} else if ( h1 < 2 ) {
		rgb = [ x, c, 0 ];
	} else if ( h1 < 3 ) {
		rgb = [ 0, c, x ];
	} else if ( h1 < 4 ) {
		rgb = [ 0, x, c ];
	} else if ( h1 < 5 ) {
		rgb = [ x, 0, c ];
	} else if ( h1 < 6 ) {
		rgb = [ c, 0, x ];
	}
	var m = l - (c * .5);
	rgb = [rgb[0] + m, rgb[1] + m, rgb[2] + m];

	rgb[0] = Math.round(rgb[0] * 255);
	rgb[1] = Math.round(rgb[1] * 255);
	rgb[2] = Math.round(rgb[2] * 255);

	return rgb;
}

function hcy2rgb ( h, c, y )
{
	h *= 360;
	var h1 = h / 60;
	var x = c * ( 1 - Math.abs( h1 % 2 - 1) );

	if (h1 < 1) {
		rgb = [ c, x, 0 ];
	} else if ( h1 < 2 ) {
		rgb = [ x, c, 0 ];
	} else if ( h1 < 3 ) {
		rgb = [ 0, c, x ];
	} else if ( h1 < 4 ) {
		rgb = [ 0, x, c ];
	} else if ( h1 < 5 ) {
		rgb = [ x, 0, c ];
	} else if ( h1 < 6 ) {
		rgb = [ c, 0, x ];
	}

	var m = y - ( 0.30 * rgb[0] ) + ( 0.59 * rgb[1] ) + ( 0.11 * rgb[2] );
	rgb = [rgb[0] + m, rgb[1] + m, rgb[2] + m];

	rgb[0] = Math.round(rgb[0] * 255);
	rgb[1] = Math.round(rgb[1] * 255);
	rgb[2] = Math.round(rgb[2] * 255);

	return rgb;
}

function getRGBString ( r, g, b )
{
	r = r.toString(16);
	g = g.toString(16);
	b = b.toString(16);

	if (r.length == 1) r = '0' + r;
	if (g.length == 1) g = '0' + g;
	if (b.length == 1) b = '0' + b;

	var rgbString = r + g + b;
	return rgbString;
}

function getRGBArray ( rgbHex )
{
	// strip #
	if (rgbHex.slice(0,1) == '#') rgbHex = rgbHex.slice(1);

	// Parse to 0-255 values
	r = parseInt( rgbHex.slice(0,2), 16 );
	g = parseInt( rgbHex.slice(2,4), 16 );
	b = parseInt( rgbHex.slice(4,6), 16 );
	return [r, g, b];
}

function getYfromRGB ( r, g, b )
{
	// Get basics for conversion
	r /= 255;
    g /= 255;
    b /= 255;

	// Luma value
	y = (0.30 * r) + ( 0.59 * g ) + ( 0.11 * b );

	return y;
}
