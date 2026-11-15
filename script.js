// ====== EDIT ME ======
const CONFIG = {
  words: ['Memories','YOU ARE MAGIC','LOVE OF MY LIFE','I LOVE YOU','CELEBRATING YOU','FOREVER YOURS'],
  // Your personal messages (they rotate at the bottom)
  messages: ['Love of my life','The longer we are together, the more I love you','You are my favorite place in the universe','Forever, you and me'],
  // Each star opens a photo. Put an image data URI or leave photo empty for a placeholder.
  stars: [
    {photo:'photos/one.jpg', caption:'kaon ka? ♥'},
    {photo:'photos/two.jpg', caption:'The trip I will never forget'},
    {photo:'photos/three.jpg', caption:'You, laughing — my favorite sound'},
    {photo:'photos/4.jpg', caption:'Every moment with you is a gift'},
    {photo:'photos/five.jpg', caption:'Our first day together ♥'}
  ]
};
// =====================
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, innerWidth/innerHeight, 0.1, 200);
const renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setPixelRatio(Math.min(devicePixelRatio,2));
renderer.setSize(innerWidth, innerHeight);
document.body.prepend(renderer.domElement);

function dotTexture(){
  const c=document.createElement('canvas');c.width=c.height=64;const g=c.getContext('2d');
  const r=g.createRadialGradient(32,32,0,32,32,32);
  r.addColorStop(0,'rgba(255,255,255,1)');r.addColorStop(.3,'rgba(255,255,255,.6)');r.addColorStop(1,'rgba(255,255,255,0)');
  g.fillStyle=r;g.fillRect(0,0,64,64);return new THREE.CanvasTexture(c);
}
const dot = dotTexture();

// Galaxy
const N = innerWidth<600 ? 18000 : 30000, arms = 3;
const gp = new Float32Array(N*3), gc = new Float32Array(N*3);
const inner = new THREE.Color('#ff2f90'), outer = new THREE.Color('#7a2cff'), core = new THREE.Color('#ffd0e6');
for(let i=0;i<N;i++){
  const r = Math.pow(Math.random(),1.6)*15 + .5;
  const a = (i%arms)/arms*Math.PI*2 + r*.55;
  const s = (Math.random()-.5)*Math.pow(Math.random(),2)*3*(r/6+.3);
  gp[i*3]   = Math.cos(a)*r + s;
  gp[i*3+1] = (Math.random()-.5)*.5*(1.2-r/16);
  gp[i*3+2] = Math.sin(a)*r + (Math.random()-.5)*Math.pow(Math.random(),2)*3*(r/6+.3);
  const c = core.clone().lerp(inner, Math.min(r/3,1)).lerp(outer, Math.max((r-5)/12,0));
  gc.set([c.r,c.g,c.b], i*3);
}
const gGeo = new THREE.BufferGeometry();
gGeo.setAttribute('position', new THREE.BufferAttribute(gp,3));
gGeo.setAttribute('color', new THREE.BufferAttribute(gc,3));
const galaxy = new THREE.Points(gGeo, new THREE.PointsMaterial({size:.12,map:dot,vertexColors:true,transparent:true,depthWrite:false,blending:THREE.AdditiveBlending}));
scene.add(galaxy);
const hole = new THREE.Mesh(new THREE.SphereGeometry(.55,32,32), new THREE.MeshBasicMaterial({color:0x000000}));
scene.add(hole);

// Particle heart
const HN = 7000, hp = new Float32Array(HN*3);
for(let i=0;i<HN;i++){
  const t = Math.random()*Math.PI*2, k = Math.random()<.45 ? 1 : Math.pow(Math.random(),.5);
  const x = 16*Math.pow(Math.sin(t),3), y = 13*Math.cos(t)-5*Math.cos(2*t)-2*Math.cos(3*t)-Math.cos(4*t);
  hp[i*3]=x*.2*k+(Math.random()-.5)*.15; hp[i*3+1]=y*.2*k+(Math.random()-.5)*.15; hp[i*3+2]=(Math.random()-.5)*1.1*k;
}
const hGeo = new THREE.BufferGeometry(); hGeo.setAttribute('position', new THREE.BufferAttribute(hp,3));
const heart = new THREE.Points(hGeo, new THREE.PointsMaterial({size:.14,map:dot,color:0xff5fb0,transparent:true,depthWrite:false,blending:THREE.AdditiveBlending}));
heart.position.y = 5.5; scene.add(heart);

// Floating hearts + words (sprites orbiting the galaxy)
function textTex(txt,font,color,w,h){
  const c=document.createElement('canvas');c.width=w;c.height=h;const g=c.getContext('2d');
  g.font=font;g.textAlign='center';g.textBaseline='middle';g.shadowColor='#ff2f90';g.shadowBlur=18;g.fillStyle=color;g.fillText(txt,w/2,h/2);
  return new THREE.CanvasTexture(c);
}
const heartTex = textTex('♥','bold 90px sans-serif','#ff3d8f',128,128);
const floaters = [];
for(let i=0;i<40;i++){
  const s = new THREE.Sprite(new THREE.SpriteMaterial({map:heartTex,transparent:true,depthWrite:false}));
  s.scale.setScalar(.5+Math.random()*.7);
  s.userData={angle:Math.random()*Math.PI*2,radius:4+Math.random()*12,speed:.002+Math.random()*.005,yOffset:(Math.random()-.5)*5,bob:Math.random()*6};
  scene.add(s); floaters.push(s);
}
CONFIG.words.forEach((w,i)=>{
  const s = new THREE.Sprite(new THREE.SpriteMaterial({map:textTex(w,'bold 64px Georgia','#ffd9ea',512,128),transparent:true,depthWrite:false}));
  s.scale.set(4.2,1.05,1);
  s.userData={angle:i/CONFIG.words.length*Math.PI*2,radius:6+(i%3)*2.6,speed:.0025,yOffset:.6+(i%2)*1.2,bob:i};
  scene.add(s); floaters.push(s);
});

// Camera orbit (drag / touch) + auto spin
let yaw=0, pitch=.55, dist=34, targetDist=34, drag=false, lx=0, ly=0, entered=false;
const el = renderer.domElement;
// Clickable stars -> photo
const starTex = textTex('★','bold 100px sans-serif','#fff0a0',128,128);
const stars = [];
function placeholder(i){
  const c=document.createElement('canvas');c.width=600;c.height=720;const g=c.getContext('2d');
  const gr=g.createLinearGradient(0,0,600,720);gr.addColorStop(0,'#ff4fa3');gr.addColorStop(1,'#5b1fb8');
  g.fillStyle=gr;g.fillRect(0,0,600,720);
  g.font='bold 260px sans-serif';g.textAlign='center';g.textBaseline='middle';g.fillStyle='rgba(255,255,255,.9)';g.fillText('♥',300,320);
  g.font='28px Georgia';g.fillText('Your photo #'+(i+1)+' goes here',300,560);
  return c.toDataURL('image/jpeg',.8);
}
CONFIG.stars.forEach((d,i)=>{
  const s = new THREE.Sprite(new THREE.SpriteMaterial({map:starTex,transparent:true,depthWrite:false}));
  const base = 1.1; s.scale.setScalar(base);
  s.userData={star:true,base,idx:i,angle:i/CONFIG.stars.length*Math.PI*2+.4,radius:5+(i%3)*3.2,speed:.0018+i*.0004,yOffset:1+(i%2)*1.6,bob:i*1.7};
  scene.add(s); floaters.push(s); stars.push(s);
});
const ray = new THREE.Raycaster(), ndc = new THREE.Vector2();
const photo=document.getElementById('photo'), pimg=document.getElementById('pimg'), cap=document.getElementById('cap');
function openStar(i){const d=CONFIG.stars[i];pimg.src=d.photo||placeholder(i);cap.textContent=d.caption||'';photo.classList.add('on')}
document.getElementById('close').onclick=()=>photo.classList.remove('on');
photo.addEventListener('pointerdown',e=>{if(e.target===photo)photo.classList.remove('on')});
let sx=0, sy=0;
el.addEventListener('pointerdown',e=>{drag=true;lx=sx=e.clientX;ly=sy=e.clientY});
addEventListener('pointerup',e=>{
  drag=false;
  if(!entered||wasPinch||Math.hypot(e.clientX-sx,e.clientY-sy)>8||e.target!==el)return;
  ndc.set(e.clientX/innerWidth*2-1,-(e.clientY/innerHeight)*2+1);
  ray.setFromCamera(ndc,camera);
  const hit=ray.intersectObjects(stars)[0];
  if(hit)openStar(hit.object.userData.idx);
});
let pinch=0, wasPinch=false;
const pd=e=>Math.hypot(e.touches[0].clientX-e.touches[1].clientX,e.touches[0].clientY-e.touches[1].clientY);
el.addEventListener('touchstart',e=>{if(e.touches.length===2){pinch=pd(e);wasPinch=true;drag=false}},{passive:true});
el.addEventListener('touchmove',e=>{if(e.touches.length===2&&pinch&&entered){const d=pd(e);targetDist=Math.max(8,Math.min(40,targetDist*pinch/d));pinch=d}},{passive:true});
el.addEventListener('touchend',e=>{if(e.touches.length<2)pinch=0;if(!e.touches.length)setTimeout(()=>wasPinch=false,80)},{passive:true});
addEventListener('pointermove',e=>{if(!drag||pinch)return;yaw-=(e.clientX-lx)*.006;pitch=Math.max(.1,Math.min(1.35,pitch+(e.clientY-ly)*.004));lx=e.clientX;ly=e.clientY});
el.addEventListener('wheel',e=>{if(entered)targetDist=Math.max(8,Math.min(40,targetDist+e.deltaY*.02))});

// UI
const intro=document.getElementById('intro'), msg=document.getElementById('msg'), back=document.getElementById('back');
let mi=0, timer;
function showMsg(){msg.classList.remove('on');setTimeout(()=>{msg.textContent=CONFIG.messages[mi++%CONFIG.messages.length];msg.classList.add('on')},900)}
document.getElementById('enter').onclick=()=>{
  entered=true;targetDist=19;intro.classList.add('hide');back.classList.add('on');document.getElementById('hint').classList.add('on');showMsg();timer=setInterval(showMsg,5200);
};
back.onclick=()=>{
  entered=false;targetDist=34;intro.classList.remove('hide');back.classList.remove('on');msg.classList.remove('on');document.getElementById('hint').classList.remove('on');photo.classList.remove('on');clearInterval(timer);
};

addEventListener('resize',()=>{camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight)});

let t=0;
(function loop(){
  requestAnimationFrame(loop); t+=.016;
  if(!drag) yaw += entered ? .0012 : .0025;
  dist += (targetDist-dist)*.03;
  camera.position.set(Math.sin(yaw)*Math.cos(pitch)*dist, Math.sin(pitch)*dist, Math.cos(yaw)*Math.cos(pitch)*dist);
  camera.lookAt(0,entered?2.5:0,0);
  galaxy.rotation.y += .0012;
  const beat = 1+Math.sin(t*3)*.04+Math.max(0,Math.sin(t*3))*.03;
  heart.scale.setScalar(beat); heart.rotation.y = Math.sin(t*.4)*.5;
  floaters.forEach(s=>{
    const u=s.userData; u.angle+=u.speed;
    s.position.set(Math.cos(u.angle)*u.radius, u.yOffset+Math.sin(t+u.bob)*.35, Math.sin(u.angle)*u.radius);
    if(u.star)s.scale.setScalar(u.base*(1+Math.sin(t*3+u.bob)*.18));
  });
  renderer.render(scene,camera);
})();
