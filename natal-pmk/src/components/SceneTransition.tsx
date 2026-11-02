import {useId} from 'react';
import {AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {clamp, theme} from '../config/theme';

export type TransitionKind = 'star-iris' | 'ribbon' | 'soft' | 'sunrise' | 'foliage';

/** These 18-frame overlays straddle a cut; they never subtract time from a scene. */
export const SceneTransition = ({kind = 'soft'}: {kind?: TransitionKind}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const id = useId().replace(/:/g, '');
  const peak = .3 * fps;
  const last = .6 * fps - 1;
  const envelope = interpolate(f, [0, peak, last], [0, 1, 0], clamp);
  const travel = interpolate(f, [0, last], [0, 1], {...clamp, easing: Easing.bezier(.45, .02, .4, 1)});
  if (kind === 'star-iris') return <AbsoluteFill style={{pointerEvents: 'none', overflow: 'hidden'}}>
    <svg width="100%" height="100%" viewBox="0 0 1920 1080">
      <defs><radialGradient id={`${id}-star`}><stop stopColor="#fff7e7"/><stop offset=".55" stopColor={theme.amber}/><stop offset="1" stopColor={theme.gold}/></radialGradient></defs>
      <g transform={`translate(960 520) scale(${interpolate(f, [0, peak, last], [.02, 39, .02], clamp)})`} opacity={envelope}>
        <path d="M0 -120 L18 -25 L90 -78 L27 -14 L130 0 L27 14 L90 78 L18 25 L0 120 L-18 25 L-90 78 L-27 14 L-130 0 L-27 -14 L-90 -78 L-18 -25Z" fill={`url(#${id}-star)`}/>
      </g>
    </svg>
  </AbsoluteFill>;
  if (kind === 'ribbon') return <AbsoluteFill style={{pointerEvents: 'none', overflow: 'hidden', perspective: 1400}}>
    <svg width="100%" height="100%" viewBox="0 0 1920 1080" style={{opacity: envelope, translate: `${-640 + travel * 1280}px ${-140 + travel * 280}px`, rotate: `${-6 + travel * 12}deg`}}>
      <defs><linearGradient id={`${id}-satin`} x1="0" y1="0" x2="0" y2="1"><stop stopColor="#ffdce5"/><stop offset=".18" stopColor="#f3a6be"/><stop offset=".53" stopColor="#c9859c"/><stop offset=".72" stopColor="#ffdce5"/><stop offset="1" stopColor="#b16d86"/></linearGradient></defs>
      <path d="M-600 170 C200 1180 850 -280 1460 600 S2240 440 2600 1030" fill="none" stroke="#523c3b" strokeWidth="735" opacity=".15"/>
      <path d="M-600 150 C200 1160 850 -300 1460 580 S2240 420 2600 1010" fill="none" stroke={`url(#${id}-satin)`} strokeWidth="700"/>
      <path d="M-600 -170 C200 840 850 -620 1460 260 S2240 100 2600 690" fill="none" stroke="#ffe6cd" strokeWidth="4" opacity=".72"/>
    </svg>
  </AbsoluteFill>;
  if (kind === 'foliage') return <AbsoluteFill style={{pointerEvents: 'none', overflow: 'hidden'}}>
    <svg width="100%" height="100%" viewBox="0 0 1920 1080" style={{opacity: envelope}}>
      <g transform={`translate(${-510 + travel * 1200} ${1120 - envelope * 280}) rotate(${-35 + travel * 20}) scale(${1.8 + envelope * .8})`}>
        <path d="M0 0 Q430 -70 790 -430" stroke="#705a37" strokeWidth="8" fill="none"/>
        {Array.from({length: 30}, (_, i) => <g key={i} transform={`translate(${i * 26} ${-i * 6 - i * i * .24}) rotate(${-i * .4})`}>
          <path d="M0 0 Q-80 -15 -110 -69 M0 0 Q-21 -77 -51 -112 M0 0 Q49 -36 58 -99 M0 0 Q49 18 69 48 M0 0 Q-49 36 -84 22" stroke={i % 3 ? '#173e2e' : '#29503a'} strokeWidth="6" fill="none"/>
          <path d="M0 0 Q-45 -20 -84 -63 M0 0 Q10 -58 -16 -95" stroke="#476746" strokeWidth="2.1" fill="none" opacity=".8"/>
        </g>)}
      </g>
      <g transform={`translate(${2440 - travel * 1180} ${-70 + envelope * 280}) rotate(145) scale(2.2)`}>
        <path d="M0 0 Q340 -80 620 -330" stroke="#173e2e" strokeWidth="8" fill="none"/>
        {Array.from({length: 24}, (_, i) => <path key={i} d={`M${i * 26} ${-i * 9} l-62 -62 M${i * 26} ${-i * 9} l-4 -95 M${i * 26} ${-i * 9} l55 -48 M${i * 26} ${-i * 9} l-56 28`} stroke="#1e4936" strokeWidth="6" fill="none"/>)}
      </g>
    </svg>
  </AbsoluteFill>;
  if (kind === 'sunrise') return <AbsoluteFill style={{pointerEvents: 'none', mixBlendMode: 'screen', opacity: envelope * .82,
    background: `radial-gradient(ellipse at ${22 + travel * 22}% ${78 - travel * 27}%, #fff4d9 0%, #f9c77bc9 22%, #d8b76a55 47%, transparent 76%)`,
  }}/>;
  return <AbsoluteFill style={{pointerEvents: 'none', opacity: envelope * .42, mixBlendMode: 'screen',
    background: `radial-gradient(ellipse at ${65 - travel * 16}% 55%, #fff0d7 0%, #d8b76a60 40%, transparent 76%)`,
  }}/>;
};
