const startBtn = document.querySelector('.start-btn');
const canva = document.querySelector('#c');

startBtn.addEventListener('click', ()=>{
  startBtn.style.display = 'none';
  canva.style.display = 'block'
})

var b = document.body;
var c = document.getElementsByTagName('canvas')[0];
var a = c.getContext('2d');

window.requestAnimFrame = (function(){
    return window.requestAnimationFrame || 
        window.webkitRequestAnimationFrame || 
    function( callback ){
        window.setTimeout(callback, 1000 / 60);
    };
})();

b.onmousemove = function(e){
    m = e.pageX
    y = e.pageY
}

b.onclick = function(e){
    for(l = 600;l--;) {
        v=g[l];
        v.x=m;
        v.y=y;
    }
}

// start of submission //
var w = innerWidth,
    h = innerHeight,
    f = ~~((w * h) / 29E3),
    d = c.getContext("2d"),
    g=[],
    col = 255

c.width = w
c.height = h

l = 900; while (l--) {
    p = {}
    p.x = w/2
    p.y = h/2
    p.c = Math.random() > .4 ? 0 : 1;
    p.b = p.a = Math.random() * 1E5
    p.p = 0
    p.op = .1
    g[l] = p
}

d.fillStyle = "rgba(0, 0, 0, 255)"
d.font = w*.6 - h*.2 + "px sans-serif"
d.textAlign = "center";
d.textBaseline = "middle";
d.fillText('♥', w/2, h/2)

var heartPixelData = d.getImageData( 0, 0, w, h ).data;
d.fillStyle = "rgba(0, 0, 0, 1)"
d.fillRect(0, 0, w, h)

function render() {
    d.fillStyle = "rgba(0, 0, 0, 0.01)"
    d.fillRect(0, 0, w, h)


    var e = g.length; while(e--){
        var p = g[e]
        p.a += Math.random() > .5 ? -1 : 1
        p.b -= (p.b - p.a) * .05
        var m = p.b * 8
        p.x += Math.cos(m / 180 * Math.PI)
        p.y += Math.sin(m / 180 * Math.PI)

        xd = p.x - w/2;
        yd = p.y - h/2;

        distance = Math.sqrt(xd*xd + yd*yd);

        var changeVal = heartPixelData[((~~p.x + (~~p.y * w)) * 4) - 1]

        if(p.p !== changeVal){
           p.op = .01
        }

        p.op += p.op < .5 ? .02:0
        
        col = col < 0 ? 0 : col - 0.001

        if(changeVal){
            d.fillStyle = "rgba(255,0,0,"+p.op+")"
        } else {
            d.fillStyle = "rgba(255,255,255,"+p.op+")"
        }
        

        p.p = changeVal


        if(p.x > w + f) p.x = -f
        if(p.x < -f) p.x = w + f
        if(p.y > h + f) p.y = -f
        if(p.y < -f) p.y = h + f

        // d.fillStyle = "rgba(255, 0, 0, 0.2)";
        a.font = (distance < f*(f/4) ? (distance / (f/4)) >> 0 || 1 : f) + 'px Arial';
        d.fillText('❤',~~p.x,~~p.y)
    }
}

(function animationLoop(){
    requestAnimFrame(animationLoop);
    render();   
})()