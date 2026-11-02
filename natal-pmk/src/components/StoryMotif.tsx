import {useId} from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {clamp, theme} from '../config/theme';

export type StoryScene = 'opening' | 'community' | 'gift' | 'nativity' | 'sunrise' | 'worship';
export const storySceneFromSource = (src: string): StoryScene => src.includes('togetherness') ? 'community' : src.includes('gift') ? 'gift' : src.includes('nativity') ? 'nativity' : src.includes('sunrise') ? 'sunrise' : src.includes('worship') ? 'worship' : 'opening';

const starPath = 'M0 -18 L3.5 -4 L14 0 L3.5 4 L0 18 L-3.5 4 L-14 0 L-3.5 -4Z';

const PineSprig = ({time, sunrise}: {time: number; sunrise: boolean}) => <g transform={`translate(-80 1070) rotate(${-21 + Math.sin(time * .25) * 1.1})`} opacity={sunrise ? .84 : .76}>
  <path d="M0 0 C120 -35 238 -124 355 -243" stroke={sunrise ? '#122f23' : '#061d18'} strokeWidth="8" fill="none"/>
  {Array.from({length: 21}, (_, i) => {
    const x = i * 16;
    const y = -i * 9 - (i * i) * .12;
    return <g key={i} transform={`translate(${x} ${y}) rotate(${-i * .3})`}>
      <path d="M0 0 Q-26 -16 -60 -13 M0 0 Q-23 -32 -42 -50 M0 0 Q9 -32 -4 -62 M0 0 Q26 -13 37 -46" stroke={i % 3 === 0 ? '#244a32' : '#173b2a'} strokeWidth="2.8" fill="none"/>
      <path d="M0 0 Q-12 19 -44 27 M0 0 Q17 15 16 37" stroke="#0a281e" strokeWidth="2.6" fill="none"/>
    </g>;
  })}
</g>;

/** A small light is handed from campus to gift to manger; the artwork itself is never warped into fake body motion. */
export const StoryMotif = ({scene = 'opening', duration = 180}: {scene?: StoryScene; duration?: number}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const id = useId().replace(/:/g, '');
  const t = Math.max(0, frame) / fps;
  const progress = interpolate(frame, [0, Math.max(duration - 1, 1)], [0, 1], clamp);
  const entry = interpolate(frame, [.3 * fps, 1.5 * fps], [0, 1], clamp);
  const points = {
    opening: {x: 635, y: 132},
    community: {x: 760 - progress * 110, y: 182 + Math.sin(progress * Math.PI) * 27},
    gift: {x: 650 - progress * 140, y: 280 + Math.sin(progress * Math.PI) * 52},
    nativity: {x: 650, y: 160},
    sunrise: {x: 620 + progress * 70, y: 195 - progress * 45},
    worship: {x: 705 + progress * 80, y: 225 - progress * 35},
  }[scene];
  return <AbsoluteFill style={{pointerEvents: 'none', overflow: 'hidden'}}>
    <svg width="100%" height="100%" viewBox="0 0 1920 1080" fill="none">
      <defs>
        <radialGradient id={`${id}-warm`}><stop stopColor={theme.amber} stopOpacity=".55"/><stop offset=".25" stopColor={theme.gold} stopOpacity=".2"/><stop offset="1" stopColor={theme.gold} stopOpacity="0"/></radialGradient>
        <linearGradient id={`${id}-ribbon`} x1="0" y1="0" x2="1" y2="1"><stop stopColor={theme.gold} stopOpacity="0"/><stop offset=".35" stopColor={theme.ivory}/><stop offset=".7" stopColor={theme.gold}/><stop offset="1" stopColor={theme.pink} stopOpacity="0"/></linearGradient>
      </defs>
      {scene === 'sunrise' || scene === 'worship' ? <g opacity={entry * (scene === 'sunrise' ? .1 : .065)} transform={`translate(${Math.sin(t * .16) * 9} 0)`}>
        <path d="M610 -80 L-50 1040 L260 1040Z" fill={theme.amber}/>
        <path d="M625 -80 L360 1080 L525 1080Z" fill={theme.ivory}/>
        <path d="M635 -80 L690 1030 L820 1030Z" fill={theme.amber}/>
      </g> : null}
      {scene === 'nativity' ? <ellipse cx="520" cy="672" rx={285 + Math.sin(t * .5) * 9} ry="220" fill={`url(#${id}-warm)`} opacity={interpolate(frame, [0, 3.5 * fps, 5.5 * fps, duration], [.13, .15, .35, .32], clamp)}/> : null}
      {scene === 'opening' ? <g transform={`translate(86 ${820 + Math.sin(t * .65) * 3}) rotate(${Math.sin(t * .3) * .8})`} opacity={entry}>
        <ellipse cx="60" cy="91" rx="130" ry="175" fill={`url(#${id}-warm)`} opacity=".5"/>
        <path d="M33 20 Q60 -12 87 20 M59 2 V-36" stroke="#513f23" strokeWidth="5"/>
        <path d="M26 24 H94 L88 139 H32Z" fill="#102e29" stroke="#947745" strokeWidth="3"/>
        <path d="M39 37 H81 L77 122 H43Z" fill="#edbb6c" opacity={.7 + Math.sin(t * 4) * .05}/>
        <path d="M60 38 V123 M29 28 H91 M32 139 H89" stroke="#473d28" strokeWidth="5"/>
        <path d="M50 110 Q51 89 60 74 Q69 91 68 111Z" fill="#fff1c5"/>
      </g> : null}
      {scene === 'community' ? <g opacity={entry * .67}>
        <path d="M-80 28 Q430 225 1060 28" stroke="#5c684b" strokeWidth="2"/>
        {Array.from({length: 15}, (_, i) => {
          const x = 20 + i * 67;
          const y = 52 + Math.sin((i / 14) * Math.PI) * 80;
          return <g key={i}>
            <path d={`M${x} ${y - 9} v14`} stroke="#726d47" strokeWidth="1.2"/>
            <circle cx={x} cy={y + 10} r="4.5" fill={i % 4 === 0 ? theme.pink : theme.ivory} opacity={.58 + Math.sin(t * 1.1 + i) * .2}/>
            <circle cx={x} cy={y + 10} r="22" fill={`url(#${id}-warm)`} opacity={.4 + Math.sin(t + i) * .15}/>
          </g>;
        })}
      </g> : null}
      {scene === 'gift' ? <g opacity={interpolate(frame, [.7 * fps, 2 * fps, 5.5 * fps, duration], [0, .42, .3, .1], clamp)}>
        <path d="M150 690 C92 420 805 355 880 540 C950 745 235 845 150 690" pathLength="1" stroke={`url(#${id}-ribbon)`} strokeWidth="2.1" strokeLinecap="round" strokeDasharray="1" strokeDashoffset={interpolate(frame, [1.4 * fps, 4.2 * fps], [1, 0], clamp)}/>
        <path d="M150 690 C92 420 805 355 880 540 C950 745 235 845 150 690" pathLength="1" stroke={theme.gold} strokeWidth="8" opacity=".08" strokeDasharray="1" strokeDashoffset={interpolate(frame, [1.4 * fps, 4.2 * fps], [1, 0], clamp)}/>
      </g> : null}
      {Array.from({length: 11}, (_, i) => {
        const x = 140 + ((i * 137) % 760) + Math.sin(t * .28 + i * .8) * 9;
        const y = 960 - ((i * 91 + t * (12 + i % 5)) % 870);
        return <circle key={i} cx={x} cy={y} r={i % 3 === 0 ? 2.4 : 1.3} fill={theme.gold} opacity={entry * (.12 + Math.sin(t * .5 + i) * .05)}/>;
      })}
      <g transform={`translate(${points.x} ${points.y}) scale(${.56 + Math.sin(t * 1.15) * .03})`} opacity={entry * (scene === 'nativity' ? .58 : .72)}>
        <circle r="55" fill={`url(#${id}-warm)`}/>
        {scene !== 'opening' && scene !== 'nativity' ? <>
          <path d={starPath} fill={theme.ivory}/>
          <path d="M-8 -9 L8 9 M8 -9 L-8 9" stroke={theme.gold} strokeWidth="1" opacity=".65"/>
        </> : null}
      </g>
      <PineSprig time={t} sunrise={scene === 'sunrise'}/>
    </svg>
  </AbsoluteFill>;
};
