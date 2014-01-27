// The pixelisation script is from : http://jsfiddle.net/AbdiasSoftware/QznT7/ ; 
// (C) Ken Fyrstenberg Nilsen, Abdias Software, CC3.0-attribute.
$(document).ready(function () {
    $('<style>canvas { image-rendering: optimizeSpeed; image-rendering: -moz-crisp-edges; image-rendering: -webkit-optimize-contrast; image-rendering: -o-crisp-edges; image-rendering: crisp-edges; -ms-interpolation-mode: nearest-neighbor; }</style>').appendTo('head');
    $('img.8bitme').replaceWith(function (i, v) {
        return $('<div/>', {
            class: 'pure-u-1-1',
            html: '<canvas id="canvas" width="' + this.width + '" height="' + this.height + '" data-url=' + this.src + ' data-bit="' + $(this).data("bit") + '"></canvas>'
        });

    });
    var ctx = canvas.getContext('2d'),
        img = new Image();
  
    ctx.mozImageSmoothingEnabled = false;
    ctx.webkitImageSmoothingEnabled = false;
    ctx.imageSmoothingEnabled = false;
    img.onload = pixelate;
  
    setTimeout(function () {
        var $url = $('canvas').data('url');
        img.src = $url;
    }, 001);
  
    //Personal url 
    var inputUrl, images, newCanvas;
    inputUrl = $('input#personal');
    images = $('.wrapper img');
  
    inputUrl.on('click', function () {
        $(this).attr('data-active', 'true');
    });
  
    inputUrl.on('keyup', function () {
        var $this = $(this);
        if (inputUrl.data('active')) {

            images.attr("src", $this.val());
            var newCanvas = $('canvas');

            setTimeout(function () {

                var $url = newCanvas.data('url');

                //Thanks to @dervondenbergen for the next two lines. BULLGIT FTW
                img.src = $this.val();
                pixelate();

            }, 001);
        }
    });

    function pixelate(v) {
        //Ammount of bit/pixels (get the value of data-bit)
        var size = $('canvas').data("bit"),
            w = canvas.width * size,
            h = canvas.height * size;
        ctx.drawImage(img, 0, 0, w, h);
        ctx.drawImage(canvas, 0, 0, w, h, 0, 0, canvas.width, canvas.height);
    }
});