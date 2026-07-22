(() => {
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
const box=document.createElement("div");
const canvas=document.createElement("canvas");
const ctx=canvas.getContext("2d");
const cropBtn=document.createElement("button");
const originalBtn=document.createElement("button");
const resetBtn=document.createElement("button");

canvas.width=372;
canvas.height=586;

box.style="position:fixed;inset:10px;background:#111;z-index:999999;text-align:center;padding:10px";
canvas.style="width:100%;touch-action:none;display:block";

cropBtn.textContent="Crop";
originalBtn.textContent="Gốc";
resetBtn.textContent="Reset";

box.append(canvas,cropBtn,originalBtn,resetBtn);
document.body.append(box);

let scale=Math.max(372/img.width,586/img.height);
let cropW=372/scale;
let cropH=586/scale;

let x=(img.width-cropW)/2;
let y=(img.height-cropH)/2;

let zoom=1;
let minZoom=1;
let maxZoom=3;

let dragging=false;
let lastX=0;
let lastY=0;
let lastDist=0;

function draw(){
ctx.clearRect(0,0,372,586);
let w=cropW*zoom;
let h=cropH*zoom;
ctx.drawImage(img,x,y,w,h,0,0,372,586);
}

function limit(){
let w=cropW*zoom;
let h=cropH*zoom;
x=Math.max(0,Math.min(x,img.width-w));
y=Math.max(0,Math.min(y,img.height-h));
}

function move(px,py){
let r=canvas.getBoundingClientRect();
x-=((px-lastX)/r.width)*cropW;
y-=((py-lastY)/r.height)*cropH;
limit();
lastX=px;
lastY=py;
draw();
}

draw();

canvas.addEventListener("pointerdown",e=>{
dragging=true;
lastX=e.clientX;
lastY=e.clientY;
canvas.setPointerCapture(e.pointerId);
});

canvas.addEventListener("pointermove",e=>{
if(!dragging)return;
e.preventDefault();
move(e.clientX,e.clientY);
},{passive:false});

canvas.addEventListener("pointerup",()=>{
dragging=false;
});

canvas.addEventListener("touchmove",e=>{
if(e.touches.length===2){
e.preventDefault();

let a=e.touches[0];
let b=e.touches[1];

let cx=((a.clientX+b.clientX)/2-canvas.getBoundingClientRect().left)/canvas.getBoundingClientRect().width*372;
let cy=((a.clientY+b.clientY)/2-canvas.getBoundingClientRect().top)/canvas.getBoundingClientRect().height*586;

let dist=Math.hypot(a.clientX-b.clientX,a.clientY-b.clientY);

if(lastDist){
let oldZoom=zoom;

zoom+=(dist-lastDist)/300;
zoom=Math.max(minZoom,Math.min(maxZoom,zoom));

let ratio=zoom/oldZoom;

x+=(cx/oldZoom)*(1-ratio);
y+=(cy/oldZoom)*(1-ratio);

limit();
draw();
}

lastDist=dist;
}
},{passive:false});

canvas.addEventListener("touchend",()=>{
lastDist=0;
});

canvas.addEventListener("wheel",e=>{
e.preventDefault();
zoom+=e.deltaY<0?0.1:-0.1;
zoom=Math.max(minZoom,Math.min(maxZoom,zoom));
limit();
draw();
},{passive:false});

resetBtn.onclick=()=>{
zoom=1;
cropW=372/scale;
cropH=586/scale;
x=(img.width-cropW)/2;
y=(img.height-cropH)/2;
draw();
};

function findTarget(){
return [...document.images].find(img=>{
let r=img.getBoundingClientRect();
return Math.abs(r.width-372)<20&&Math.abs(r.height-586)<20;
});
}

cropBtn.onclick=()=>{
let target=findTarget();
if(!target)return alert("Không tìm thấy ảnh");
target.src=canvas.toDataURL("image/png");
box.remove();
alert("Done");
};

originalBtn.onclick=()=>{
let target=findTarget();
if(!target)return alert("Không tìm thấy ảnh");
target.src=url;
box.remove();
alert("Done");
};
};
};
input.click();
})();
