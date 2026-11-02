import type {ReactNode} from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {GoldParticles, MagicalLightTrail} from './Atmosphere';
import {CinematicBackground} from './CinematicBackground';
import {theme, clamp} from '../config/theme';

export const SceneFrame = ({src, duration, children, text, top = 300, shade, trail = true}: {
  src: string; duration: number; children?: ReactNode; text: ReactNode; top?: number; shade?: number; trail?: boolean;
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  return <AbsoluteFill style={{fontFamily: theme.serif, overflow: 'hidden', background: theme.navy}}>
    <CinematicBackground src={src} duration={duration} shade={shade}/>
    {children}
    <GoldParticles count={40} seed={duration}/>
    <div style={{position: 'absolute', left: 1090, top, width: 730, color: theme.ivory}}>{text}</div>
    {trail ? <MagicalLightTrail x={1080} y={830} width={650} delay={Math.min(duration / fps - 1.6, 5.7)}/> : null}
    <div style={{position: 'absolute', bottom: 86, right: 118, width: 90, height: 1, background: theme.gold, opacity: .5 * interpolate(frame, [fps, fps * 2], [0, 1], clamp)}}/>
  </AbsoluteFill>;
};
