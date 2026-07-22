(() => {
const TARGET_W=372;
const TARGET_H=586;

const input=document.createElement("input");
input.type="file";
input.accept="image/*";

input.onchange=()=>{
const file=input.files[0];
if(!file)return;

const url=URL.createObjectURL(file);
const img=new Image();

img.src=url;

img.onload=()=>{

let target=[...document.images].find(i=>{
let r=i.getBoundingClientRect();
return Math.abs(r.width-TARGET_W)<20&&Math.abs(r.height-TARGET_H)<20;
});

if(!target){
alert("Không tìm thấy ảnh");
return;
}


const wrap=document.createElement("div");
const canvas=document.createElement("canvas");
const btnCrop=document.createElement("button");

const ctx=canvas.getContext("2d");

canvas.width=TARGET_W;
canvas.height=TARGET_H;

wrap.style=`
position:fixed;
inset:0;
background:#000;
z-index:999999;
display:flex;
flex-direction:column;
align-items:center;
justify-content:center;
`;

canvas.style=`
width:100%;
max-height:80vh;
touch-action:none;
`;

btnCrop.textContent="Crop";

wrap.append(canvas,btnCrop);
document.body.append(wrap);


let scale=Math.max(
TARGET_W/img.width,
TARGET_H/img.height
);

let baseW=TARGET_W/scale;
let baseH=TARGET_H/scale;


let x=(img.width-baseW)/2;
let y=(img.height-baseH)/2;

let zoom=1;

let minZoom=1;
let maxZoom=4;


let dragging=false;
let lastX=0;
let lastY=0;

let lastDist=0;


function draw(){

ctx.clearRect(
0,
0,
TARGET_W,
TARGET_H
);


let w=baseW*zoom;
let h=baseH*zoom;


ctx.drawImage(
img,
x,
y,
w,
h,
0,
0,
TARGET_W,
TARGET_H
);


ctx.fillStyle="rgba(0,0,0,.45)";

ctx.fillRect(
0,
0,
TARGET_W,
TARGET_H
);


ctx.clearRect(
0,
0,
TARGET_W,
TARGET_H
);


ctx.drawImage(
img,
x,
y,
w,
h,
0,
0,
TARGET_W,
TARGET_H
);


ctx.strokeStyle="#fff";
ctx.lineWidth=3;

ctx.strokeRect(
2,
2,
TARGET_W-4,
TARGET_H-4
);

}



function limit(){

let w=baseW*zoom;
let h=baseH*zoom;

x=Math.max(
0,
Math.min(x,img.width-w)
);

y=Math.max(
0,
Math.min(y,img.height-h)
);

}


function move(px,py){

let r=canvas.getBoundingClientRect();

x-=((px-lastX)/r.width)*baseW;

y-=((py-lastY)/r.height)*baseH;


limit();

lastX=px;
lastY=py;

draw();

}


canvas.addEventListener(
"pointerdown",
e=>{

dragging=true;

lastX=e.clientX;
lastY=e.clientY;

canvas.setPointerCapture(
e.pointerId
);

});


canvas.addEventListener(
"pointermove",
e=>{

if(!dragging)return;

e.preventDefault();

move(
e.clientX,
e.clientY
);

},
{
passive:false
});


canvas.addEventListener(
"pointerup",
()=>{
dragging=false;
});


canvas.addEventListener(
"touchmove",
e=>{

if(e.touches.length!==2)return;

e.preventDefault();

let a=e.touches[0];
let b=e.touches[1];


let rect=canvas.getBoundingClientRect();


let cx=
((a.clientX+b.clientX)/2-rect.left)
/
rect.width
*
TARGET_W;


let cy=
((a.clientY+b.clientY)/2-rect.top)
/
rect.height
*
TARGET_H;


let dist=Math.hypot(
a.clientX-b.clientX,
a.clientY-b.clientY
);



if(lastDist){

let oldZoom=zoom;


zoom+=(dist-lastDist)/300;


zoom=Math.max(
minZoom,
Math.min(maxZoom,zoom)
);


let ratio=zoom/oldZoom;


x+=(cx/oldZoom)*(1-ratio);
y+=(cy/oldZoom)*(1-ratio);


limit();
draw();

}


lastDist=dist;


},
{
passive:false
});


canvas.addEventListener(
"touchend",
()=>{
lastDist=0;
});


draw();



btnCrop.onclick=()=>{


let preview=document.createElement("canvas");
let pctx=preview.getContext("2d");

preview.width=TARGET_W;
preview.height=TARGET_H;


pctx.drawImage(
img,
x,
y,
baseW*zoom,
baseH*zoom,
0,
0,
TARGET_W,
TARGET_H
);


wrap.innerHTML="";

let title=document.createElement("div");
title.textContent="Preview";
title.style="color:white;font-size:20px";


let ok=document.createElement("button");
let back=document.createElement("button");


ok.textContent="Xác nhận";
back.textContent="Crop lại";


preview.style="width:100%;max-height:80vh";


wrap.append(
title,
preview,
ok,
back
);



ok.onclick=()=>{

target.src=
preview.toDataURL("image/png");

wrap.remove();

alert("Done");

};



back.onclick=()=>{

wrap.innerHTML="";

wrap.append(
canvas,
btnCrop
);

draw();

};


};


};

};


input.click();

})();
