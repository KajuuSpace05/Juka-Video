import type {CSSProperties, ReactNode} from 'react';
import {AbsoluteFill} from 'remotion';
import {GoldParticles, MagicalLightTrail} from './Atmosphere';
import {CinematicBackground, type CameraMove} from './CinematicBackground';
import {StoryMotif, storySceneFromSource, type StoryScene} from './StoryMotif';
import {theme} from '../config/theme';

export const SceneFrame = ({src, duration, children, text, top = 300, shade, trail = true, layout = 'right', textLeft, textWidth, textAlign, motif, camera}: {
  src: string; duration: number; children?: ReactNode; text: ReactNode; top?: number; shade?: number; trail?: boolean;
  layout?: 'right' | 'left' | 'center' | 'lower'; textLeft?: number; textWidth?: number; textAlign?: CSSProperties['textAlign']; motif?: StoryScene; camera?: CameraMove;
}) => {
  const story = motif ?? storySceneFromSource(src);
  const left = textLeft ?? (layout === 'left' ? 110 : layout === 'center' || layout === 'lower' ? 240 : 1090);
  const width = textWidth ?? (layout === 'center' || layout === 'lower' ? 1440 : 730);
  return <AbsoluteFill style={{fontFamily: theme.serif, overflow: 'hidden', background: theme.navy}}>
    <CinematicBackground src={src} duration={duration} shade={shade} textSide={layout} camera={camera}/>
    <StoryMotif scene={story} duration={duration}/>
    {children}
    <GoldParticles count={28} seed={duration}/>
    <div style={{position: 'absolute', left, top, width, color: theme.ivory, textAlign: textAlign ?? (layout === 'center' || layout === 'lower' ? 'center' : 'left')}}>{text}</div>
    {trail && story === 'community' ? <MagicalLightTrail x={left} y={800} width={Math.min(590, width)} delay={5.45}/> : null}
  </AbsoluteFill>;
};
