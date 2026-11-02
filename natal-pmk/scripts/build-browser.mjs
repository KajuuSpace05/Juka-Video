import {readFile, writeFile, mkdir} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import vm from 'node:vm';
import ts from 'typescript';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
function readConfig(source) {
  const compiled = ts.transpileModule(source, {compilerOptions: {module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020}}).outputText;
  const exports = {};
  vm.runInNewContext(compiled, {exports, Object});
  return exports;
}
const sceneConfig = readConfig(await readFile(path.join(root, 'src/config/scenes.ts'), 'utf8'));
const themeConfig = readConfig(await readFile(path.join(root, 'src/config/theme.ts'), 'utf8'));
const timing = readConfig(await readFile(path.join(root, 'src/config/timeline.ts'), 'utf8'));
const logos = JSON.parse(await readFile(path.join(root, 'src/config/logo-assets.json'), 'utf8'));
if (!logos.uny || !logos.natal) throw new Error('Both original logos must be imported before building browser edition.');
const data = {copy: sceneConfig.copy, plates: sceneConfig.plates, theme: themeConfig.theme, timeline: timing.timeline, video: timing.VIDEO, logos};
const esc = value => String(value).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const type = (text, delay, size, kind = 'serif', color = 'ivory', variant = 'rise') => `<div class="type ${kind} ${color}" data-delay="${delay}" data-variant="${variant}" style="font-size:${size}px" aria-label="${esc(text)}">${text.split(' ').map(word => `<span class="word">${esc(word)}</span>`).join(' ')}</div>`;
const {copy:c, plates:p} = data;
const captions = [
  `<div class="caption opening">${type(c.opening.title,2,110,'serif','ivory','mask')}<div class="gap">${type(c.opening.subtitle,3.6,88,'script','gold','script')}</div></div>`,
  `<div class="caption together">${type(c.togetherness.title,3.2,142,'serif','pink','left')}${type(c.togetherness.message,3.8,90,'serif','ivory','rise')}<div class="gap">${type(c.togetherness.footer,5,40,'sans','ivory','mask')}</div></div>`,
  `<div class="caption gift">${type(c.gift.lines[0],4.5,91,'serif','ivory','left')}${type(c.gift.lines[1],4.95,91,'serif','ivory','left')}${type(c.gift.lines[2],5.4,91,'serif','pink','left')}</div><div class="gift-label">${type(c.gift.title,3.6,79,'script','gold','script')}</div>`,
  `<div class="caption nativity">${type(c.nativity.title,5.3,118,'serif','ivory','mask')}<div class="gap">${type(c.nativity.subtitle,5.9,86,'script','gold','script')}</div>${type(c.nativity.footer,6.5,46,'serif','ivory','rise')}</div>`,
  `<div class="caption meaning">${type(c.meaning.lines[0],3.5,122,'serif','pink','rise')}${type(c.meaning.lines[1],4.1,70,'serif','ivory','left')}${type(c.meaning.lines[2],4.8,70,'serif','ivory','left')}${type(c.meaning.lines[3],5.4,70,'serif','ivory','left')}</div>`,
  `<div class="caption gratitude">${type(c.gratitude.title,3.5,124,'serif','pink','mask')}<div class="gap">${type(c.gratitude.subtitle,4.4,40,'sans','ivory','rise')}</div><div class="gap-small">${type(c.gratitude.event,5.7,69,'serif','ivory','left')}</div></div>`,
  `<div class="closing-copy">${type(c.closing.title,1.2,163,'serif','ivory','mask')}<div class="gap">${type(c.closing.event,3.2,62,'serif','pink','rise')}</div><div class="gap">${type(c.closing.subtitle,4.5,103,'script','gold','script')}</div></div>`,
  `<div class="logos" data-delay="1"><img src="../public/${esc(logos.uny)}" alt="Logo UNY asli"><i></i><img src="../public/${esc(logos.natal)}" alt="Logo Natal asli"></div><div class="blessing">${type(c.blessing,2,68,'serif','evergreen','rise')}</div>`,
];
const plateNames = [p.opening,p.togetherness,p.gift,p.nativity,p.meaning,p.gratitude];
const chapters = timing.timeline.map((chapter, index) => `<article class="painting p${index}" data-chapter="${index}" style="left:${index * 1920}px"><div class="camera">${index < 6 ? `<img class="plate" src="../public/${esc(plateNames[index])}" alt="Ilustrasi ${esc(chapter.id)}"><div class="image-pocket"></div>` : `<div class="painted-ground"></div>`}<div class="atmospheric-light"></div><div class="light-shafts"></div></div>${captions[index]}</article>`).join('');
function pineSprig(x,y,rotation,scale=1) {
  let lines='';
  for(let i=0;i<15;i++) {
    const yy=i*14;
    const w=20+(15-i)*2.5;
    lines+=`<path d="M0 ${yy}Q${-w*.4} ${yy-18} ${-w} ${yy-26}M0 ${yy}Q${w*.4} ${yy-18} ${w} ${yy-26}"/>`;
  }
  return `<g transform="translate(${x} ${y}) rotate(${rotation}) scale(${scale})" class="sprig"><path d="M0 -10V220" stroke="#678267" stroke-width="2"/><g fill="none" stroke="#55755a" stroke-width="2.2" stroke-linecap="round">${lines}</g></g>`;
}
let sprigs='';for(const [x,y,r,s] of [[0,90,-54,1.6],[90,0,-5,1.5],[1920,90,54,1.6],[1830,0,5,1.5],[0,1000,-128,1.6],[100,1080,182,1.4],[1920,1000,128,1.6],[1820,1080,178,1.4]])sprigs+=pineSprig(x,y,r,s);
const bows = [180,1740].map((x,i)=>`<g class="bow" data-side="${i}" transform="translate(${x} 112)"><path d="M0 0C-20-52-118-50-83-3Q-50 30 0 0C20-52 118-50 83-3Q50 30 0 0" fill="url(#satin)"/><path d="M-5 1L-25 95L-48 76L-38-4M5 1L25 95L48 76L38-4" fill="url(#satin)"/><ellipse rx="15" ry="19" fill="#e9a4ba"/></g>`).join('');
const baubles=[250,340,1580,1670].map((x,i)=>`<g class="bauble" data-phase="${i}"><path d="M${x} 0V${210+(i%2)*46}" stroke="#bc9c55" stroke-width="1.5"/><circle cx="${x}" cy="${230+(i%2)*46}" r="${20+(i%2)*9}" fill="url(#gold-orb)"/><path d="M${x-15} ${233+(i%2)*46}Q${x} ${250+(i%2)*46} ${x+15} ${233+(i%2)*46}" fill="none" stroke="#68836a" stroke-width="4"/></g>`).join('');
const decorations=`<svg id="decoration" viewBox="0 0 1920 1080"><defs><linearGradient id="satin"><stop stop-color="#f5c8d4"/><stop offset=".5" stop-color="#c87d9b"/><stop offset="1" stop-color="#f4b9cb"/></linearGradient><radialGradient id="gold-orb" cx=".3" cy=".25"><stop stop-color="#fff0b4"/><stop offset=".55" stop-color="#c9a750"/><stop offset="1" stop-color="#7e652e"/></radialGradient></defs>${sprigs}${bows}${baubles}</svg>`;
const css=String.raw`
@font-face{font-family:'Cormorant Garamond';src:url('../public/fonts/CormorantGaramond.ttf') format('truetype');font-weight:300 700;font-display:block}
@font-face{font-family:'Great Vibes';src:url('../public/fonts/GreatVibes.ttf') format('truetype');font-display:block}
@font-face{font-family:Manrope;src:url('../public/fonts/Manrope.ttf') format('truetype');font-weight:200 800;font-display:block}
*{box-sizing:border-box}html,body{margin:0;width:100%;height:100%;overflow:hidden;background:#030b10;color:#fff0d7;font-family:'Cormorant Garamond',Georgia,serif}
#stage{position:fixed;width:1920px;height:1080px;left:50%;top:50%;transform:translate(-50%,-50%);transform-origin:center;overflow:hidden;background:#071b2b}
#world{position:absolute;inset:0;transform-origin:50% 50%}#gallery{position:absolute;top:0;left:0;width:15360px;height:1080px;will-change:transform}.painting{position:absolute;top:0;width:1920px;height:1080px;overflow:hidden;background:#071b2b}.camera{position:absolute;inset:0;transform-origin:38% 50%;will-change:transform}.plate{width:100%;height:100%;object-fit:cover;display:block}.image-pocket{position:absolute;inset:0;background:linear-gradient(90deg,rgba(7,27,43,.02) 20%,rgba(7,27,43,.08) 37%,rgba(7,27,43,.54) 56%,rgba(7,27,43,.92) 88%),linear-gradient(0deg,rgba(3,15,20,.58),transparent 30%,transparent 85%,rgba(3,15,20,.18))}.atmospheric-light{position:absolute;inset:-100px;background:radial-gradient(ellipse at 27% 39%,rgba(249,199,123,.15),transparent 44%);mix-blend-mode:screen;pointer-events:none}.light-shafts{position:absolute;inset:-200px;opacity:.14;background:conic-gradient(from 150deg at 22% 0%,transparent 0deg,rgba(249,199,123,.28) 6deg,transparent 11deg,transparent 25deg,rgba(249,199,123,.2) 29deg,transparent 34deg,transparent 360deg);mix-blend-mode:screen}
.caption{position:absolute;left:1090px;width:730px;top:320px}.opening{top:335px}.together{top:305px}.gift{top:310px}.nativity{top:350px}.meaning{top:280px}.gratitude{top:328px}.type{font-weight:500;line-height:1.03;padding:2px 3px 10px;white-space:normal;text-shadow:0 3px 22px rgba(0,0,0,.2);overflow:hidden}.word{display:inline-block;white-space:nowrap;opacity:0;will-change:transform,opacity}.script{font-family:'Great Vibes',cursive;font-weight:400;line-height:1.15;padding:12px 12px 20px 3px}.sans{font-family:Manrope,Arial,sans-serif;line-height:1.4;font-weight:400}.gold{color:#d8b76a}.pink{color:#f3a6be}.ivory{color:#fff0d7}.evergreen{color:#103e30}.gap{margin-top:25px}.gap-small{margin-top:15px}.gift-label{position:absolute;left:145px;top:845px;width:800px}.closing-copy{position:absolute;left:160px;top:355px;width:1600px;text-align:center}.closing-copy>.type:first-child{letter-spacing:5px}.p6 .painted-ground{position:absolute;inset:0;background:radial-gradient(ellipse at 50% 42%,#285945,#103e30 48%,#071f1b)}.p7 .painted-ground{position:absolute;inset:0;background:radial-gradient(ellipse at 52% 38%,#fffdf7,#fff0df 65%,#e4e8d4)}.p7 .atmospheric-light{mix-blend-mode:multiply;opacity:.2}.p7 .light-shafts{opacity:0}.logos{position:absolute;left:505px;top:257px;width:910px;display:flex;align-items:center;justify-content:space-between;opacity:0}.logos img{width:315px;height:370px;object-fit:contain}.logos i{height:240px;width:1px;background:linear-gradient(transparent,#b6a477,transparent)}.blessing{position:absolute;left:200px;top:742px;width:1520px;text-align:center}.blessing .type{text-shadow:none}
#environment,#decoration,#foreground,#transition{position:absolute;inset:0;width:1920px;height:1080px;pointer-events:none}#decoration{opacity:0}#foreground{transform-origin:50% 100%;opacity:.28}#grain{position:absolute;inset:0;pointer-events:none;opacity:.035;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='2' seed='9' stitchTiles='stitch'/%3E%3C/filter%3E%3Cpath fill='%23fff' filter='url(%23n)' d='M0 0h180v180H0z'/%3E%3C/svg%3E")}
#vignette{position:absolute;inset:0;pointer-events:none;background:radial-gradient(ellipse at 50% 45%,transparent 45%,rgba(0,10,16,.3))}#initial-dark{position:absolute;inset:0;background:#071b2b;pointer-events:none}#review-ui{display:none;position:fixed;z-index:5;left:50%;bottom:20px;transform:translateX(-50%);gap:12px;align-items:center;padding:12px 16px;background:#071b2bea;border:1px solid #d8b76a55;border-radius:12px;font:13px Manrope,Arial,sans-serif;color:#fff0d7}#review-ui.visible{display:flex}#review-ui button{background:#103e30;border:1px solid #d8b76a66;color:inherit;padding:8px 12px;border-radius:7px;cursor:pointer}#scrub{width:min(40vw,450px);accent-color:#d8b76a}#clock{font-variant-numeric:tabular-nums;min-width:80px}
`;
function browserRuntime(DATA){
  const $=s=>document.querySelector(s),$$=s=>Array.from(document.querySelectorAll(s));
  const FPS=DATA.video.fps,DURATION=DATA.video.duration/FPS,clamp=(v,a=0,b=1)=>Math.min(b,Math.max(a,v)),mix=(a,b,p)=>a+(b-a)*p;
  const ease=p=>1-Math.pow(1-clamp(p),4),smooth=p=>{p=clamp(p);return p*p*(3-2*p)};
  const seed=n=>{const v=Math.sin(n*127.1+311.7)*43758.5453123;return v-Math.floor(v)};
  const starts=DATA.timeline.map(c=>c.from/FPS),lengths=DATA.timeline.map(c=>c.duration/FPS);
  const chapterNodes=$$('.painting');
  // Each painting lives on the same scenic rail; the star remains in front of that world.
  const gallery=$('#gallery'),star=$('#star'),tail=$('#star-tail'),environment=$('#environment'),decor=$('#decoration'),foreground=$('#foreground'),transition=$('#transition'),initial=$('#initial-dark');
  const svgns='http://www.w3.org/2000/svg';
  const particles=[];
  for(let i=0;i<36;i++){
    const e=document.createElementNS(svgns,'circle');e.setAttribute('fill',i%4===0?'#fff0d7':'#d8b76a');environment.append(e);particles.push(e);
  }
  const lights=[];
  for(let i=0;i<18;i++){
    const g=document.createElementNS(svgns,'g');
    g.innerHTML='<circle r="11" fill="url(#fairy-halo)"/><circle r="2.2" fill="#fff0d7"/>';
    environment.append(g);lights.push(g);
  }
  const cues=[{x:1438,y:215},{x:1390,y:185},{x:530,y:510},{x:665,y:148},{x:360,y:255},{x:690,y:165},{x:960,y:215},{x:960,y:170}];
  function starPosition(t){
    const i=Math.min(7,Math.max(0,starts.findLastIndex(s=>t>=s)));
    const a=cues[i],b=cues[Math.min(7,i+1)],p=smooth((t-starts[i])/lengths[i]);
    return {x:mix(a.x,b.x,p*.75)+Math.sin(t*.48)*9,y:mix(a.y,b.y,p*.75)+Math.cos(t*.38)*8};
  }
  function renderAtTime(seconds){
    const t=clamp(Number(seconds)||0,0,DURATION-1/FPS),index=Math.min(7,Math.max(0,starts.findLastIndex(s=>t>=s))),local=t-starts[index];
    let rail=index;
    for(let j=1;j<starts.length;j++)if(Math.abs(t-starts[j])<.3)rail=j-1+smooth((t-starts[j]+.3)/.6);
    gallery.style.transform='translate3d('+(-rail*1920)+'px,0,0)';
    const variants=[1,-1,1,-1,1,-1,1,-1];
    chapterNodes.forEach((node,i)=>{
      const lt=clamp(t-starts[i],0,lengths[i]),progress=lt/lengths[i],camera=node.querySelector('.camera');
      const pan=variants[i]*mix(13,-13,progress),scale=i===2?mix(1.055,1.015,smooth(progress)):mix(1.012,1.06,smooth(progress));
      camera.style.transform='translate3d('+pan+'px,'+mix(3,-7,progress)+'px,0) scale('+scale+')';
      node.querySelector('.atmospheric-light').style.transform='translate3d('+(Math.sin(lt*.3+i)*35)+'px,'+(Math.cos(lt*.2+i)*18)+'px,0)';
      node.querySelector('.light-shafts').style.transform='rotate('+(Math.sin(lt*.2+i)*1.5)+'deg)';
      node.querySelectorAll('.type').forEach(el=>{
        const at=Number(el.dataset.delay),mode=el.dataset.variant;
        const words=el.querySelectorAll('.word');
        words.forEach((word,k)=>{
          const p=ease((lt-at-Math.min(k*.055,.35))/.85),x=mode==='left'?(1-p)*32:0,y=mode==='rise'||mode==='mask'?(1-p)*42:(1-p)*16;
          word.style.opacity=String(clamp((lt-at-k*.035)/.5));
          word.style.transform='translate3d('+x+'px,'+y+'px,0)';
          word.style.filter=p<.999?'blur('+((1-p)*4)+'px)':'none';
          if(mode==='script')word.style.clipPath='inset(0 '+((1-p)*100)+'% 0 0)';
        });
      });
      const logos=node.querySelector('.logos');
      if(logos){const p=ease((lt-1));logos.style.opacity=String(clamp(lt-1));logos.style.transform='translateY('+((1-p)*20)+'px)'}
    });
    particles.forEach((e,i)=>{
      const d=seed(i+17),x=seed(i*19+12)*1980-30+Math.sin(t*.12+i*2.7)*(10+d*24),y=((seed(i*19+13)*1200-t*(8+d*15)+3600)%1200)-60;
      e.setAttribute('cx',x);e.setAttribute('cy',y);e.setAttribute('r',i%9===0?3.5+d*4:.9+d*1.8);
      e.setAttribute('opacity',(x>1050&&index<6?.14:.28+d*.2)*(.65+.35*Math.sin(t*(.8+d)+i*3.1)));
      e.setAttribute('fill',index===7?'#ad8c45':i%4===0?'#fff0d7':'#d8b76a');
    });
    lights.forEach((e,i)=>{
      const x=80+i*100,y=70+Math.sin(i/17*Math.PI)*70;
      e.setAttribute('transform','translate('+x+' '+y+')');
      e.setAttribute('opacity',([1,5,6].includes(index)?.68:.18)*(.72+.28*Math.sin(t*.9+i*1.8)));
    });
    const pos=starPosition(t),starFade=clamp((t-.5)/1.2)*(index===7?.06:[0,3].includes(index)?.18:1);
    star.setAttribute('transform','translate('+pos.x+' '+pos.y+') scale('+(1+.045*Math.sin(t*1.3))+')');star.setAttribute('opacity',starFade);
    const pts=[];for(let j=12;j>=0;j--){const p=starPosition(Math.max(0,t-j*.055));pts.push((j===12?'M':'L')+p.x.toFixed(2)+' '+p.y.toFixed(2))}
    tail.setAttribute('d',pts.join(' '));tail.setAttribute('opacity',starFade*.5);
    decor.style.opacity=String(index>=6?clamp(local/.8):.07);
    decor.style.filter=index===7?'none':'brightness(.82)';
    $$('.bow').forEach((e,i)=>e.style.transform='translate('+(i?1740:180)+'px,112px) rotate('+(Math.sin(t*.6+i)*1.4)+'deg)');
    $$('.bauble').forEach((e,i)=>e.style.transform='rotate('+(Math.sin(t*.5+i)*.7)+'deg)');
    foreground.style.opacity=index>=6?'0':'.25';foreground.style.transform='translate3d('+(Math.sin(t*.25)*10)+'px,'+(Math.cos(t*.35)*5)+'px,0) rotate('+(Math.sin(t*.2)*.6)+'deg)';
    $('#grain').style.transform='translate('+(Math.floor(t*6)%3-1)+'px,'+(Math.floor(t*4)%3-1)+'px)';
    $('#vignette').style.opacity=index===7?'0':'.65';initial.style.opacity=String(1-smooth(t/1.1));
    let cut=-1;for(let j=1;j<starts.length;j++)if(Math.abs(t-starts[j])<.3)cut=j;
    transition.style.opacity='0';
    if(cut>0){
      const q=(t-starts[cut]+.3)/.6,cover=Math.sin(q*Math.PI);transition.style.opacity=String(Math.pow(Math.max(0,cover),.7));
      const a=$('#curtain'),b=$('#transition-star');
      const kind=cut%3;
      a.setAttribute('fill',kind===1?'#103e30':kind===2?'#e6a4bc':'#fff0d7');
      // A broad curved satin ribbon passes the lens; the gift-to-Nativity cut blooms through the star.
      a.setAttribute('d',kind===1?'M-600-500Q400-700 2100-250L2400 1350Q1200 1050-600 1500L-100 1050-550 950-100 750-550 650-100 450-550 350Z':'M-600-700C450-550 1500-250 2250-400L2500 1550C1350 1180 450 1190-600 1450Z');
      a.setAttribute('transform','translate('+mix(-2100,2100,q)+' 0) rotate(-12 960 540)');
      b.setAttribute('transform','translate(960 540) scale('+(Math.sin(q*Math.PI)*36)+')');
      b.setAttribute('opacity',kind===0?'1':'.38');
    }
    $('#clock').textContent=t.toFixed(2)+' / 60s';$('#scrub').value=String(t);
    window.__currentVideoState={time:t,frame:Math.floor(t*FPS),scene:DATA.timeline[index].id,localTime:local,sceneIndex:index};
  }
  function fit(){const s=Math.min(innerWidth/1920,innerHeight/1080);$('#stage').style.transform='translate(-50%,-50%) scale('+s+')'}
  addEventListener('resize',fit);fit();
  const clock={t:0};
  const tl=gsap.timeline({paused:true,repeat:-1,onUpdate(){renderAtTime(clock.t)}});
  tl.fromTo(clock,{t:0},{t:DURATION,duration:DURATION,ease:'none',immediateRender:false},0);
  const seek=t=>{tl.pause();tl.time(clamp(t,0,DURATION-1/FPS),true);clock.t=clamp(t,0,DURATION-1/FPS);renderAtTime(clock.t)};
  const play=()=>tl.play(),pause=()=>tl.pause();
  window.__renderAtTime=seek;
  window.__video={seek,play,pause,duration:DURATION,fps:FPS,timeline:tl,config:DATA,getState:()=>({...window.__currentVideoState})};
  window.OPENER={tl,DURATION,seek};
  const query=new URLSearchParams(location.search);
  if(query.get('debug')==='1')$('#review-ui').classList.add('visible');
  $('#scrub').addEventListener('input',e=>seek(Number(e.target.value)));
  $('#toggle').addEventListener('click',()=>tl.paused()?play():pause());$('#restart').addEventListener('click',()=>{seek(0);play()});
  addEventListener('keydown',e=>{if(e.code==='Space'){e.preventDefault();tl.paused()?play():pause()}if(e.key.toLowerCase()==='r'){seek(0);play()}});
  renderAtTime(0);
  window.__ready=Promise.all([document.fonts.ready,...$$('img').map(img=>img.complete?Promise.resolve():new Promise((ok,no)=>{img.addEventListener('load',ok,{once:true});img.addEventListener('error',()=>no(Error('Cannot load '+img.getAttribute('src'))),{once:true})}))]).then(()=>{
    document.documentElement.dataset.ready='true';renderAtTime(0);if(query.get('clean')!=='1')play();return true;
  });
}
let gsap=await readFile(path.join(root,'public/vendor/gsap-3.13.0.min.js'),'utf8');
gsap=gsap.replace(/\/\/# sourceMappingURL=.*$/gm,'').replaceAll('</script','<\\/script');
const html=`<!doctype html>\n<html lang="id"><!-- Motion architecture adapted from Bang Motion v1.19.0 by Bang Tutorial, MIT; original Christmas artwork and exact supplied logos. --><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Natal PMK UNY 2026 — The Greatest Gift</title><style>${css}</style></head><body><main id="stage" aria-label="Natal PMK UNY 2026, The Greatest Gift, video 60 detik"><div id="world"><div id="gallery">${chapters}</div></div><svg id="environment" viewBox="0 0 1920 1080"><defs><radialGradient id="fairy-halo"><stop stop-color="#fff0d7" stop-opacity=".48"/><stop offset="1" stop-color="#f9c77b" stop-opacity="0"/></radialGradient><radialGradient id="star-aura"><stop stop-color="#fff0d7" stop-opacity=".5"/><stop offset="1" stop-color="#f9c77b" stop-opacity="0"/></radialGradient></defs><path id="star-tail" fill="none" stroke="#d8b76a" stroke-width="1.2"/><g id="star"><circle r="64" fill="url(#star-aura)"/><path d="M0-38L6-7L24 0L6 7L0 38L-6 7L-24 0L-6-7Z" fill="#fff0d7"/><path d="M-18-18L0-4L18-18L4 0L18 18L0 4L-18 18L-4 0Z" fill="#d8b76a" opacity=".65"/></g></svg>${decorations}<svg id="foreground" viewBox="0 0 1920 1080">${pineSprig(70,1040,-120,3)}${pineSprig(1880,1040,120,3)}</svg><div id="grain"></div><div id="vignette"></div><svg id="transition" viewBox="0 0 1920 1080"><path id="curtain" d="M-400-400H2300V1500H-400Z"/><g id="transition-star"><path d="M0-40L8-8L40 0L8 8L0 40L-8 8L-40 0L-8-8Z" fill="#fff0d7"/></g></svg><div id="initial-dark"></div></main><aside id="review-ui"><button id="toggle">Play / Pause</button><button id="restart">Ulang</button><input id="scrub" type="range" min="0" max="59.9667" step=".0333333" value="0"><span id="clock">0.00 / 60s</span></aside><script>${gsap}</script><script>(${browserRuntime.toString()})(${JSON.stringify(data).replaceAll('<','\\u003c')});</script></body></html>`;
await mkdir(path.join(root,'watch'),{recursive:true});
await writeFile(path.join(root,'watch/index.html'),html);
await writeFile(path.join(root,'watch/README.md'),`# Tonton tanpa instalasi\n\nKlik dua kali **index.html** dalam folder ini. Pilih Chrome atau Safari jika macOS meminta aplikasi pembuka. Biarkan folder **public** tetap berada di sebelah folder **watch**; gambar, logo, font, dan GSAP sudah lokal. Tidak perlu Node, npm, server, atau internet untuk menonton.\n\nVideo otomatis diputar dan mengulang setelah 60 detik, tanpa panel di layar. **Space** menjeda/memutar; **R** mengulang. Musik belum disediakan. Kedua logo adalah berkas asli pengguna tanpa perubahan.\n\nUntuk panel pemeriksaan, tambahkan **?debug=1** pada akhir alamat file. Untuk snapshot berhenti di awal, gunakan **?clean=1**.\n\nVersi ini memakai arsitektur Bang Motion: satu dunia gambar, kamera scenic rail, bintang penghubung, cahaya, dekorasi foreground, dan reveal kata. Delapan waktu adegan dan semua tulisan diambil dari konfigurasi proyek. Karakter pada plate merupakan ilustrasi datar, bukan rig tubuh terpisah. Versi Remotion di folder src tetap tersedia untuk edit dan ekspor MP4.\n\nPengembang dapat memperbarui HTML setelah mengubah konfigurasi dengan menjalankan \`node scripts/build-browser.mjs\` dari folder natal-pmk.\n`);
console.log('Browser edition built:',path.join(root,'watch/index.html'));
