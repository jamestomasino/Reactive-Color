// Function source from: http://stackoverflow.com/questions/2541481/get-average-color-of-image-via-javascript
function getAverageRGB(imgEl) {

	var blockSize = 5,
	defaultRGB = {r:0,g:0,b:0},
	canvas = document.createElement('canvas'),
	context = canvas.getContext && canvas.getContext('2d'),
	data, width, height,
	i = -4,
	length,
	rgb = {r:0,g:0,b:0},
	count = 0;

	if (!context) {
		return defaultRGB;
	}

	height = canvas.height = imgEl.naturalHeight || imgEl.offsetHeight || imgEl.height;
	width = canvas.width = imgEl.naturalWidth || imgEl.offsetWidth || imgEl.width;

	context.drawImage(imgEl, 0, 0);

	try {
		data = context.getImageData(0, 0, width, height);
	} catch(e) {
		/* security error, img on diff domain */
		alert('Image is on a different domain. Cannot access color info with canvas');
		return defaultRGB;
	}

	length = data.data.length;

	while ( (i += blockSize * 4) < length ) {
		++count;
		rgb.r += data.data[i];
		rgb.g += data.data[i+1];
		rgb.b += data.data[i+2];
	}

	// ~~ used to floor values
	rgb.r = ~~(rgb.r/count);
	rgb.g = ~~(rgb.g/count);
	rgb.b = ~~(rgb.b/count);

	var r = Math.round(rgb.r).toString(16);
	var g = Math.round(rgb.g).toString(16);
	var b = Math.round(rgb.b).toString(16);

	if (r.length == 1) r = '0' + r;
	if (g.length == 1) g = '0' + g;
	if (b.length == 1) b = '0' + b;

	return r + g + b;
}

function rgb2hsvl (rgbHex)  // RGB Values:Number 0-255, HSVL Results:Number 0-1
{
	var R,G,B;

	// strip #
	if (rgbHex.slice(0,1) == '#') rgbHex = rgbHex.slice(1);

	// Parse to 0-255 values
	R = parseInt( rgbHex.slice(0,2), 16 );
	G = parseInt( rgbHex.slice(2,4), 16 );
	B = parseInt( rgbHex.slice(4,6), 16 );

	L = Math.sqrt ( .241 * ( R * R ) + .691 * ( G * G ) + .068 * ( B * B) ) / 255;

	// Convert to 0-1 values
	R /= 255;
	G /= 255;
	B /= 255;

	// Get basics for conversion
	var max = Math.max(R, G, B), min = Math.min(R, G, B);
	var H, S, V = max;
	var d = max - min;

	S = max == 0 ? 0 : d / max;

	if (d == 0) {
		H = 0;
	} else {
		switch ( max ) {
			case R: H = ( G - B ) / d + ( G < B ? 6 : 0 ); break;
			case G: H = ( B - R ) / d + 2; break;
			case B: H = ( R - G ) / d + 4; break;
		}

		H /= 6;
	}

	return [H,S,V,L];
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

	var r = Math.round(rgb[0] * 255).toString(16);
	var g = Math.round(rgb[1] * 255).toString(16);
	var b = Math.round(rgb[2] * 255).toString(16);

	if (r.length == 1) r = '0' + r;
	if (g.length == 1) g = '0' + g;
	if (b.length == 1) b = '0' + b;

	var rgbString = r + g + b;

	return rgbString;
}

