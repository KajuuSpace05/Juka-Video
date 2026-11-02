import React from 'react';
import {useCurrentFrame, useVideoConfig} from 'remotion';

/** Original vector scene art. No institution marks, text, or external imagery. */
const C = {navy: '#071B2B', green: '#103E30', gold: '#D8B76A', pink: '#F3A6BE', ivory: '#FFF0D7', amber: '#F9C77B'};
const seeded = (n: number) => {const x = Math.sin(n * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x);};

const Defs: React.FC<{id: string}> = ({id}) => <defs>
  <linearGradient id={`${id}-stone`} x1="0" y1="0" x2="0.8" y2="1"><stop stopColor="#EADFC4"/><stop offset="0.45" stopColor="#A6B4AD"/><stop offset="1" stopColor="#567A76"/></linearGradient>
  <linearGradient id={`${id}-darkStone`} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#476C69"/><stop offset="1" stopColor="#143831"/></linearGradient>
  <linearGradient id={`${id}-gold`} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#FAE9B2"/><stop offset="0.35" stopColor={C.gold}/><stop offset="0.65" stopColor="#9C743A"/><stop offset="1" stopColor="#F7DDA1"/></linearGradient>
  <linearGradient id={`${id}-pink`} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#F8C1CA"/><stop offset="0.55" stopColor="#CE8D9E"/><stop offset="1" stopColor="#975C71"/></linearGradient>
  <linearGradient id={`${id}-box`} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#38715A"/><stop offset="0.6" stopColor="#1F503F"/><stop offset="1" stopColor="#0C2E25"/></linearGradient>
  <radialGradient id={`${id}-halo`}><stop stopColor={C.amber} stopOpacity="0.5"/><stop offset="0.35" stopColor={C.amber} stopOpacity="0.1"/><stop offset="1" stopColor={C.amber} stopOpacity="0"/></radialGradient>
  <linearGradient id={`${id}-leaf`} x1="0" y1="0" x2="1" y2="0"><stop stopColor="#0C2B28"/><stop offset="0.5" stopColor="#356A50"/><stop offset="1" stopColor="#153F32"/></linearGradient>
  <filter id={`${id}-glow`} x="-150%" y="-150%" width="400%" height="400%"><feGaussianBlur stdDeviation="5"/></filter>
  <linearGradient id={`${id}-robe`} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#739E9A"/><stop offset="0.5" stopColor="#3C7479"/><stop offset="1" stopColor="#163E4B"/></linearGradient>
  <linearGradient id={`${id}-wood`} x1="0" y1="0" x2="1" y2="0"><stop stopColor="#2D281E"/><stop offset="0.5" stopColor="#77603C"/><stop offset="1" stopColor="#352D22"/></linearGradient>
</defs>;

const Star: React.FC<{x:number;y:number;size?:number;opacity?:number}> = ({x,y,size=10,opacity=1}) => <g transform={`translate(${x} ${y})`} opacity={opacity}>
 <path d={`M0 ${-size} L${size*.19} ${-size*.2} L${size} 0 L${size*.19} ${size*.2} L0 ${size} L${-size*.19} ${size*.2} L${-size} 0 L${-size*.19} ${-size*.2} Z`} fill={C.ivory}/>
</g>;

const LeafSpray: React.FC<{x:number;y:number;scale?:number;rotate?:number;id:string}> = ({x,y,scale=1,rotate=0,id}) => <g transform={`translate(${x} ${y}) rotate(${rotate}) scale(${scale})`}>
 <path d="M0 0 Q60 -65 67 -178" fill="none" stroke="#657653" strokeWidth="3"/>
 {Array.from({length:8},(_,i)=><g key={i} transform={`translate(${i*8} ${-i*22})`}>
  <path d="M0 0 Q-57 -7 -47 -47 Q-15 -40 0 0Z" fill={`url(#${id}-leaf)`} stroke="#547353" strokeWidth="0.6"/>
  <path d="M0 0 Q58 -8 55 -47 Q19 -42 0 0Z" fill={`url(#${id}-leaf)`} stroke="#547353" strokeWidth="0.6"/>
 </g>)}
</g>;

const Blossom: React.FC<{x:number;y:number;s?:number}> = ({x,y,s=1}) => <g transform={`translate(${x} ${y}) scale(${s})`}>
 {Array.from({length:5},(_,i)=><ellipse key={i} cx="0" cy="-9" rx="6" ry="10" fill={i%2? '#D695A9':'#F1BAC6'} transform={`rotate(${i*72})`}/>)}
 <circle r="3" fill={C.gold}/>
</g>;

const Person: React.FC<{x:number;y:number;scale?:number;coat?:string;backpack?:boolean;raised?:boolean;flip?:boolean}> = ({x,y,scale=1,coat='#8CABB0',backpack=false,raised=false,flip=false}) => <g transform={`translate(${x} ${y}) scale(${flip?-scale:scale} ${scale})`}>
 <ellipse cx="0" cy="3" rx="32" ry="8" fill="#020E14" opacity="0.3"/>
 <path d="M-16 -66 L-13 -3 L-1 -3 L4 -61 M4 -64 L9 -3 L22 -3 L20 -73" fill="#152D36"/>
 <path d="M-18 -14 L-21 0 L-1 0 L-1 -8 M9 -12 L10 0 L31 0 Q30 -8 20 -10" fill="#11232B"/>
 <path d="M-16 -139 Q0 -150 18 -137 L28 -66 Q0 -57 -29 -69Z" fill={coat}/>
 <path d="M17 -137 Q30 -126 35 -101 L25 -96 L11 -123" fill={coat}/>
 {raised?<path d="M-18 -135 Q-34 -143 -43 -176 L-49 -201 Q-49 -208 -44 -206 L-35 -184 L-25 -164 L-12 -146 M20 -135 Q42 -154 47 -181 L50 -195 Q55 -201 57 -195 L56 -177 Q51 -141 30 -119" fill={coat}/>:<path d="M-20 -134 Q-33 -122 -35 -90 L-30 -67 L-22 -70 L-24 -97 L-11 -123" fill={coat}/>}
 <path d="M-28 -71 L-30 -59 Q-26 -54 -23 -60 L-21 -71 M28 -99 L34 -91 Q36 -86 31 -83 L23 -94" fill="#C69D7D"/>
 <path d="M-9 -146 L-9 -130 Q0 -125 9 -132 L9 -148" fill="#BB9479"/>
 <ellipse cx="0" cy="-158" rx="17" ry="22" fill="#C5A083"/>
 <path d="M-17 -158 Q-26 -186 -1 -187 Q25 -184 18 -156 L10 -170 Q-6 -167 -15 -174Z" fill="#172A2D"/>
 {backpack&&<g><path d="M-17 -130 Q0 -141 18 -129 L21 -86 Q2 -73 -22 -87Z" fill="#B18467" stroke="#CBA889" strokeWidth="1.4"/><path d="M-12 -109 Q1 -115 14 -109 L14 -91 Q1 -85 -13 -92Z" fill="#91694F"/><path d="M-14 -128 L-20 -88 M14 -129 L19 -88" fill="none" stroke="#DDC1A0" strokeWidth="3"/></g>}
</g>;

const FairyLights: React.FC<{id:string;frame:number;points?:string}> = ({id,frame,points='70,175 360,240 670,190 1030,115'}) => <g>
 <polyline points={points} fill="none" stroke={C.gold} strokeOpacity="0.08"/>
 <path d="M40 155 Q530 315 1070 140" fill="none" stroke="#A48F62" strokeWidth="1.5"/>
 {Array.from({length:23},(_,i)=>{const x=60+i*45;const y=155+95*Math.sin((i/23)*Math.PI);const o=.55+.35*Math.sin(frame*.036+i*1.8);return <g key={i} opacity={o}><circle cx={x} cy={y} r="11" fill={C.amber} filter={`url(#${id}-glow)`}/><circle cx={x} cy={y} r="3.5" fill={C.ivory}/></g>;})}
</g>;

const Tree: React.FC<{x:number;y:number;s?:number;id:string;frame:number}> = ({x,y,s=1,id,frame}) => <g transform={`translate(${x} ${y}) scale(${s})`}>
 <path d="M-9 -50 L-8 12 L10 12 L10 -50" fill="#65482C"/>
 <path d="M0 -340 L-70 -230 L-42 -230 L-106 -140 L-70 -140 L-140 -35 Q0 7 140 -35 L70 -140 L106 -140 L42 -230 L70 -230Z" fill={`url(#${id}-leaf)`} stroke="#4F7551" strokeWidth="2"/>
 <path d="M-59 -223 Q0 -180 70 -230 M-94 -135 Q0 -80 103 -141 M-125 -46 Q0 8 132 -43" fill="none" stroke={C.gold} strokeWidth="2" opacity="0.7"/>
 {Array.from({length:20},(_,i)=>{const yy=-265+seeded(i+20)*215;const xx=(seeded(i+40)-.5)*(320+yy*.7);return <g key={i}><circle cx={xx} cy={yy} r={i%3===0?6:3} fill={i%3===0?C.pink:C.gold} opacity={.7+.25*Math.sin(frame*.04+i)}/>{i%3!==0&&<circle cx={xx} cy={yy} r="7" fill={C.gold} filter={`url(#${id}-glow)`} opacity="0.5"/>}</g>;})}
 <Star x={0} y={-353} size={22}/>
</g>;

const SVG: React.FC<{children:React.ReactNode;id:string}> = ({children,id}) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080" width="1920" height="1080" style={{position:'absolute',inset:0,overflow:'hidden'}} aria-label="Original storybook illustration"><Defs id={id}/>{children}</svg>;

export const CampusArt: React.FC<{sunrise?:boolean}> = ({sunrise=false}) => {
 const f=useCurrentFrame();const {fps}=useVideoConfig();const t=f/fps;const id=sunrise?'campus-day':'campus-night';
 return <SVG id={id}>
  <ellipse cx="495" cy={sunrise?490:640} rx="660" ry="470" fill={`url(#${id}-halo)`} opacity={sunrise?0.8:0.28}/>
  {sunrise&&<><circle cx="385" cy="398" r="90" fill="#FFDA9A" opacity="0.35"/><path d="M385 398 L-100 0 L1280 0Z" fill="#F9C77B" opacity="0.025"/><path d="M385 398 L1270 790 L1050 1010Z" fill="#F9C77B" opacity="0.04"/></>}
  <g opacity="0.25" fill="#52706A"><path d="M0 677 Q170 575 348 641 Q512 525 698 624 Q837 570 1040 640 L1130 820 L0 820Z"/></g>
  <g transform={`translate(${-t*1.1} ${-t*.5}) translate(500 665) scale(${1+t*.003}) translate(-500 -665)`}>
   <path d="M118 745 L118 568 L343 568 L343 542 L751 542 L751 568 L930 568 L930 745Z" fill={`url(#${id}-stone)`}/>
   <path d="M93 569 L348 569 L348 541 L756 541 L756 569 L950 569 L950 588 L93 588Z" fill="#D2CBB5"/>
   <path d="M123 598 H930 V614 H123 M123 673 H930 V689 H123" stroke="#3D625E" strokeWidth="5"/>
   <path d="M418 744 L418 351 L637 351 L637 744Z" fill={`url(#${id}-stone)`}/>
   <path d="M438 365 H617 V715 H438Z" fill="#1D4448"/>
   {Array.from({length:9},(_,row)=><g key={row}>{Array.from({length:5},(_,col)=><rect key={col} x={446+col*34} y={379+row*35} width="23" height="23" fill={seeded(row*9+col)>.4?'#D4C39A':'#4D7471'} opacity={sunrise?.72:.5+seeded(row*9+col)*.4}/>)}</g>)}
   <path d="M407 350 L648 350 L648 370 L407 370Z M430 331 L624 331 L624 350 L430 350Z" fill="#D7CEB4"/>
   <path d="M516 331 L516 285 L527 265 L538 285 L538 331" fill={C.gold}/>
   <circle cx="527" cy="312" r="9" fill="#254D53" stroke={C.gold} strokeWidth="2"/>
   {Array.from({length:11},(_,i)=><g key={i}><rect x={137+i*70} y="620" width="45" height="42" fill="#284C50"/>{[0,1].map(j=><rect key={j} x={143+i*70+j*20} y="627" width="13" height="28" fill={i%3===0?'#E0B773':'#789890'} opacity={sunrise?.6:.8}/>)}<rect x={137+i*70} y="699" width="45" height="40" fill="#34574F"/></g>)}
   <path d="M465 745 V690 Q526 645 588 690 V745Z" fill="#12342F"/>
   <path d="M479 746 V702 Q526 667 574 702 V746" fill="#C5B089" opacity="0.55"/>
   <path d="M89 746 H960 L1005 768 H45Z" fill="#6E8371"/>
   <path d="M330 768 H695 L755 814 H267Z" fill="#AA9E80"/>
   {[0,1,2,3].map(i=><path key={i} d={`M${322-i*17} ${776+i*11} H${707+i*17}`} stroke="#D2B98B" strokeWidth="2" opacity="0.6"/>)}
  </g>
  <path d="M0 883 Q326 777 536 806 Q824 848 1090 790 L1110 1080 L0 1080Z" fill="#123B30"/>
  <path d="M265 1080 Q394 881 522 813 L579 813 Q562 971 710 1080Z" fill="#A99470" opacity="0.55"/>
  <path d="M291 1080 Q414 894 536 820" fill="none" stroke="#CEB98D" strokeWidth="2" opacity="0.3"/>
  <g transform={`translate(${Math.sin(t*.2)*3} 0)`}>
   <LeafSpray x={65} y={992} scale={1.9} rotate={-20} id={id}/><LeafSpray x={148} y={1060} scale={1.4} rotate={35} id={id}/>
   <LeafSpray x={960} y={1095} scale={1.3} rotate={-32} id={id}/>
   {Array.from({length:18},(_,i)=><Blossom key={i} x={30+seeded(i+2)*208} y={810+seeded(i+32)*200} s={.35+seeded(i)*.65}/>)}
  </g>
  <Person x={380} y={983} scale={1.03} coat="#B98C9A" backpack/>
  <Person x={483} y={955} scale={.9} coat="#7F9F9B" backpack/>
  <Person x={586} y={989} scale={1.09} coat="#B5A381" backpack/>
  <Person x={690} y={964} scale={.87} coat="#647C8D" backpack/>
  {!sunrise&&<><Tree x={922} y={855} s={.65} id={id} frame={f}/><FairyLights id={id} frame={f}/></>}
  <path d="M0 1046 Q482 1034 1070 1077 L1070 1080 L0 1080Z" fill="#061F20"/>
 </SVG>;
};

export const CommunityArt: React.FC = () => {
 const f=useCurrentFrame();const {fps}=useVideoConfig();const t=f/fps;const id='community';
 return <SVG id={id}>
  <ellipse cx="460" cy="610" rx="640" ry="480" fill={`url(#${id}-halo)`} opacity="0.6"/>
  <g opacity="0.3" transform={`translate(${-t*1.1} 0)`}><path d="M60 790 V500 L380 500 V460 H710 V530 H1010 V800Z" fill="#6A8270"/><path d="M50 497 H385 V455 H720 V526 H1020" fill="none" stroke="#BDAC7D" strokeWidth="6"/>{Array.from({length:12},(_,i)=><rect key={i} x={90+i*74} y={580+i%2*18} width="34" height="124" fill="#172F2C"/>)}</g>
  <path d="M0 891 Q460 774 1100 847 L1100 1080 H0Z" fill="#244938"/>
  <path d="M-20 977 Q411 831 1031 933 L1070 1080 H0Z" fill="#9D8662" opacity="0.35"/>
  <Tree x={335} y={834} s={1.12} id={id} frame={f}/>
  <g transform={`translate(0 ${Math.sin(t*.8)*2})`}>
   <path d="M35 334 Q470 448 1030 280" stroke="#BB9D6B" fill="none" strokeWidth="2"/>
   {Array.from({length:12},(_,i)=>{const x=75+i*77;const y=336+54*Math.sin(i/12*Math.PI)-i*3;return <path key={i} d={`M${x} ${y} l25 54 23 -45Z`} fill={i%2?C.pink:'#B5C5A1'} opacity="0.55"/>;})}
  </g>
  <FairyLights id={id} frame={f}/>
  <Person x={510} y={916} scale={1.32} coat="#A7B8AB" flip/>
  <Person x={628} y={926} scale={1.46} coat="#C491A0"/>
  <Person x={784} y={926} scale={1.25} coat="#AF9D7D" backpack/>
  <Person x={883} y={918} scale={1.4} coat="#608B8B" flip/>
  <Person x={121} y={919} scale={1.12} coat="#769394"/>
  <g transform="translate(187 813)"><path d="M-40 0 H38 L29 -50 H-33Z" fill={`url(#${id}-pink)`}/><path d="M-43 -50 H43 V-65 H-43Z" fill="#E5AEBD"/><path d="M-4 -65 V0 H5 V-65" fill={C.gold}/></g>
  <g transform={`translate(${Math.sin(t*.2)*3} 0)`}><LeafSpray x={40} y={1100} scale={1.65} rotate={-19} id={id}/><LeafSpray x={1040} y={1135} scale={1.5} rotate={-39} id={id}/>
  {Array.from({length:17},(_,i)=><Blossom key={i} x={seeded(i+8)*190} y={896+seeded(i+42)*180} s={.5+seeded(i)*.7}/>)}
  </g>
 </SVG>;
};

export const GiftArt: React.FC = () => {
 const f=useCurrentFrame();const {fps}=useVideoConfig();const t=f/fps;const id='gift';
 return <SVG id={id}>
  <ellipse cx="501" cy="632" rx="600" ry="520" fill={`url(#${id}-halo)`} opacity={.6+Math.sin(t*.8)*.05}/>
  <ellipse cx="520" cy="905" rx="415" ry="65" fill="#020F15" opacity="0.7"/>
  <g transform={`translate(505 610) scale(${1+t*.003}) translate(-505 -610)`}>
   <path d="M183 620 L532 569 L684 654 L334 714Z" fill="#37705A"/>
   <path d="M183 620 L334 714 V932 L183 836Z" fill="#1A4436"/>
   <path d="M334 714 L684 654 V867 L334 932Z" fill={`url(#${id}-box)`}/>
   <path d="M169 598 L532 544 L703 637 L334 702Z" fill="#4D7B60" stroke="#65906D" strokeWidth="1.5"/>
   <path d="M169 598 L334 702 V732 L169 629Z" fill="#275541"/>
   <path d="M334 702 L703 637 V668 L334 732Z" fill="#1D4B38" stroke="#618167" strokeWidth="1"/>
   <path d="M374 570 L534 665 V901 L579 893 V658 L422 563Z" fill={`url(#${id}-pink)`}/>
   <path d="M229 591 L405 683 L447 675 L273 584Z" fill="#DFA0B0"/>
   <path d="M405 683 L447 675 V911 L405 919Z" fill={`url(#${id}-pink)`}/>
   <path d="M430 576 C309 585 299 453 362 462 C413 470 451 563 439 578 C450 495 519 414 559 459 C610 513 492 580 442 578Z" fill="none" stroke={`url(#${id}-pink)`} strokeWidth="27"/>
   <path d="M435 575 Q377 640 340 643 L359 659 Q397 645 447 589 M447 580 Q489 625 546 632 L529 650 Q474 636 437 591" fill={`url(#${id}-pink)`}/>
   <path d="M443 575 Q513 644 528 713 Q543 752 571 744" fill="none" stroke="#E1A9B7" strokeWidth="15"/>
   <path d="M440 572 Q459 556 477 572 L475 592 L438 596Z" fill="#C48597"/>
   <path d="M342 722 L342 917 M675 678 V858" stroke="#7CA07C" strokeWidth="1.3" opacity="0.7"/>
   {Array.from({length:12},(_,i)=><path key={i} d={`M${357+i*26} ${754-i*4.7} l3 -8 4 6 -4 7Z`} fill={C.gold} opacity="0.2"/>)}
   <g transform="translate(690 775)"><path d="M0 0 L148 -24 L210 13 L60 41Z" fill="#E6B7BD"/><path d="M0 0 L60 41 V155 L0 113Z" fill="#A96E83"/><path d="M60 41 L210 13 V130 L60 155Z" fill={`url(#${id}-pink)`}/><path d="M76 -14 L137 27 V142 L157 138 V23 L97 -17Z" fill={`url(#${id}-gold)`}/><path d="M93 -12 C14 -16 30 -83 61 -58 L94 -12 C92 -58 147 -100 154 -57 C158 -29 110 -6 93 -12" fill="none" stroke={C.gold} strokeWidth="12"/></g>
  </g>
  <g transform={`translate(0 ${Math.sin(t*.7)*3})`}><LeafSpray x={105} y={963} scale={1.9} rotate={-28} id={id}/><LeafSpray x={933} y={1002} scale={1.1} rotate={-43} id={id}/><Blossom x={230} y={877} s={1.6}/><Blossom x={188} y={932} s={1.1}/><Blossom x={902} y={906} s={1.4}/></g>
  <Star x={259} y={420} size={14} opacity={.5+.3*Math.sin(t*2)}/><Star x={803} y={534} size={10} opacity={.6+.3*Math.sin(t*2+1)}/>
 </SVG>;
};

export const NativityArt: React.FC = () => {
 const f=useCurrentFrame();const {fps}=useVideoConfig();const t=f/fps;const id='nativity';
 return <SVG id={id}>
  <ellipse cx="535" cy="708" rx="600" ry="510" fill={`url(#${id}-halo)`} opacity="0.6"/>
  <g opacity="0.3" fill="#49665D"><path d="M0 763 V684 H70 V646 H120 V687 H171 V618 H201 V682 H272 V710 H361 V676 H410 V714 H489 V653 H543 V700 H609 V667 H644 V730 H744 V690 H790 V724 H870 V665 H923 V734 H1100 V840H0Z"/><path d="M156 618 Q185 571 214 618Z M858 665 Q901 607 942 665Z"/></g>
  <path d="M0 928 Q496 798 1090 887 L1120 1080 H0Z" fill="#1C3C30"/>
  <g transform={`translate(540 700) scale(${1+t*.0025}) translate(-540 -700)`}>
   <path d="M124 514 L540 281 L958 514 L943 543 L540 325 L142 543Z" fill={`url(#${id}-wood)`} stroke="#A58B55" strokeWidth="2"/>
   <path d="M180 525 V944 H211 V507 M870 509 V944 H905 V526" fill={`url(#${id}-wood)`}/>
   <path d="M186 581 L291 487 M896 582 L790 487 M212 553 L859 553" stroke="#8D7249" strokeWidth="13"/>
   <path d="M204 552 L870 552 L860 903 H217Z" fill="#2F3125" opacity="0.35"/>
   {[0,1,2,3,4,5,6,7].map(i=><path key={i} d={`M${250+i*83} ${510-Math.sin(i/7*Math.PI)*90} V888`} stroke="#8D7146" strokeWidth="1" opacity="0.12"/>)}
   <ellipse cx="551" cy="844" rx="244" ry="190" fill={`url(#${id}-halo)`} opacity={.7+Math.sin(t*.7)*.04}/>
   <g transform="translate(379 897)">
    <path d="M-89 4 Q-60 -74 -54 -123 Q-49 -193 10 -207 Q55 -180 55 -104 Q70 -30 96 4Z" fill={`url(#${id}-robe)`}/>
    <path d="M-52 -148 Q-74 -230 -16 -261 Q43 -276 63 -207 L36 -165 Q-14 -191 -52 -148Z" fill="#A1B7AC"/>
    <path d="M-22 -219 Q-38 -198 -23 -172 Q-8 -151 13 -173 L30 -206Z" fill="#C39D7A"/>
    <path d="M-31 -224 Q-3 -252 28 -225 L27 -208 Q2 -218 -21 -202Z" fill="#3F4436"/>
    <path d="M-31 -148 Q5 -103 47 -69 L62 -82 Q27 -130 3 -160" fill="#86A5A0"/>
    <path d="M44 -74 Q62 -62 81 -66 L85 -73 Q62 -87 52 -87Z" fill="#C39D7A"/>
    <path d="M-45 -114 Q-63 -55 -62 -10 M-4 -103 Q-5 -48 9 -9" fill="none" stroke="#ADC2B4" strokeWidth="2" opacity="0.22"/>
   </g>
   <g transform="translate(729 899)">
    <path d="M-80 0 Q-61 -79 -52 -181 Q-33 -218 15 -207 Q56 -195 57 -147 L92 0Z" fill="#7E7852"/>
    <path d="M-57 -176 Q-43 -199 -35 -228 Q-21 -252 9 -238 L31 -196 L12 -159Z" fill="#B9AB83"/>
    <path d="M-26 -231 Q-39 -211 -24 -188 Q-7 -171 8 -193 L14 -217Z" fill="#BB9676"/>
    <path d="M-26 -233 Q-8 -254 15 -237 L19 -217 L-10 -219Z" fill="#3E4131"/>
    <path d="M-28 -199 Q-25 -177 -9 -168 L8 -191 L4 -200 Q-13 -184 -28 -199" fill="#4D4A33"/>
    <path d="M-35 -154 Q-68 -116 -86 -88 L-75 -75 Q-34 -105 -4 -140" fill="#A49A71"/>
    <path d="M-84 -91 Q-99 -84 -104 -70 Q-101 -61 -92 -66 L-75 -77Z" fill="#BB9676"/>
    <path d="M49 -167 Q94 -148 104 -163" stroke="#B69A6A" strokeWidth="10" fill="none"/>
    <path d="M104 2 V-248 Q102 -280 88 -272 Q74 -265 80 -244" stroke="#9B8052" strokeWidth="8" fill="none" strokeLinecap="round"/>
    <path d="M-22 -106 Q-35 -45 -29 -9 M40 -135 Q35 -59 60 -8" fill="none" stroke="#E2C89B" strokeWidth="2" opacity="0.18"/>
   </g>
   <g transform="translate(543 873)">
    <ellipse cy="-41" rx="100" ry="60" fill={`url(#${id}-halo)`}/>
    <path d="M-93 -50 L94 -50 L71 4 L-67 4Z" fill="#746342"/>
    {Array.from({length:20},(_,i)=><path key={i} d={`M${-90+i*9} -43 l${10+seeded(i)*22} ${-14-seeded(i+2)*20}`} stroke="#BDA572" strokeWidth="1.5"/>)}
    <path d="M-63 -56 Q-31 -90 25 -69 Q60 -67 65 -51 Q7 -33 -63 -56Z" fill="#EDE4CB"/>
    <ellipse cx="-21" cy="-75" rx="17" ry="14" fill="#D2B18C" transform="rotate(13)"/>
    <path d="M-2 -67 L36 -50 M-29 -49 L8 -67" stroke="#C6C6AC" strokeWidth="2" opacity="0.55"/>
    <path d="M-63 0 L65 92 M64 0 L-64 92" stroke="#7F6743" strokeWidth="13"/>
    <path d="M-72 93 H78" stroke="#A38A59" strokeWidth="5"/>
   </g>
   <g transform="translate(255 592)"><path d="M0 -31V-7" stroke={C.gold} strokeWidth="2"/><path d="M-16 0 L0 -9 L16 0 V41 L0 50 L-16 41Z" fill="#BD9750"/><path d="M-11 5 L0 0 L11 5 V36 L0 41 L-11 36Z" fill={C.amber} opacity={.7+Math.sin(t*2.6)*.08}/><circle cx="0" cy="22" r="43" fill={`url(#${id}-halo)`}/></g>
  </g>
  <g opacity="0.6"><path d="M114 935 Q95 886 127 875 Q150 861 178 885 L196 910 L184 951 H131Z" fill="#7B8372"/><path d="M125 881 L116 847 L130 855 L143 878 M154 882 L158 850 L169 861 L167 889" fill="#9D9C7E"/><path d="M882 942 Q861 906 895 884 Q922 866 949 889 L968 920 L952 944Z" fill="#C6C1A1"/><ellipse cx="966" cy="894" rx="17" ry="21" fill="#7A7B62"/></g>
  <ellipse cx="540" cy="201" rx="158" ry="168" fill={`url(#${id}-halo)`} opacity="0.8"/>
  <Star x={540} y={197} size={37} opacity={.85+Math.sin(t*1.3)*.1}/>
  <path d="M540 239 L540 321" stroke={C.gold} strokeWidth="1" opacity="0.3"/>
 </SVG>;
};

export const WorshipArt: React.FC = () => {
 const f=useCurrentFrame();const {fps}=useVideoConfig();const t=f/fps;const id='worship';
 return <SVG id={id}>
  <ellipse cx="533" cy="481" rx="629" ry="526" fill={`url(#${id}-halo)`} opacity="0.6"/>
  <path d="M93 934 V306 Q540 -20 987 306 V934Z" fill="#2C3C31" opacity="0.45" stroke="#7F7B50" strokeWidth="2"/>
  <path d="M141 934 V337 Q540 24 938 337 V934" fill="none" stroke="#8E8155" strokeWidth="2" opacity="0.45"/>
  <path d="M173 934 V363 Q539 73 907 363 V934" fill="none" stroke="#8E8155" strokeWidth="1" opacity="0.25"/>
  <path d="M530 316 L171 1080 L539 1080 L549 316Z M552 316 L837 1080 L1011 1080Z" fill={C.amber} opacity="0.025"/>
  <g opacity={.85+Math.sin(t*.8)*.04}>
   <path d="M517 286 H554 V364 H631 V397 H554 V571 H517 V397 H440 V364 H517Z" fill={C.amber} opacity="0.45" filter={`url(#${id}-glow)`}/>
   <path d="M524 293 H547 V371 H624 V390 H547 V564 H524 V390 H447 V371 H524Z" fill={C.ivory}/>
   <path d="M531 297 H541 V558 H531Z" fill="#FFE3A4"/>
  </g>
  <path d="M268 720 H810 L865 759 H212Z" fill="#677358"/>
  <path d="M213 759 H865 V791 H213Z" fill="#354A37"/>
  <Tree x={229} y={764} s={.7} id={id} frame={f}/>
  <Tree x={858} y={764} s={.62} id={id} frame={f}/>
  <FairyLights id={id} frame={f}/>
  <g opacity="0.68"><Person x={280} y={890} scale={1.25} coat="#5D7566" raised/><Person x={423} y={877} scale={1.18} coat="#A78F74"/><Person x={567} y={888} scale={1.3} coat="#B4848F" raised/><Person x={715} y={895} scale={1.14} coat="#798D7C"/><Person x={880} y={910} scale={1.25} coat="#63777C" raised/></g>
  <g transform={`translate(${Math.sin(t*.3)*1.5} 0)`}><Person x={146} y={1117} scale={2.05} coat="#213D38" raised/><Person x={363} y={1130} scale={1.93} coat="#3F5143"/><Person x={609} y={1130} scale={2.14} coat="#694E52" raised/><Person x={842} y={1140} scale={2.01} coat="#344C4A"/></g>
  <path d="M0 1063 Q505 1025 1080 1080 H0Z" fill="#071E20"/>
 </SVG>;
};
