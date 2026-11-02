import {AbsoluteFill, CanvasImage, Easing, interpolate, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {clamp, theme} from '../config/theme';

export type CameraMove = 'campus' | 'gather' | 'gift' | 'contemplate' | 'sunrise' | 'reverence';
export type TextSide = 'right' | 'left' | 'center' | 'lower';

const cameraFromSource = (src: string): CameraMove => src.includes('togetherness') ? 'gather' : src.includes('gift') ? 'gift' : src.includes('nativity') ? 'contemplate' : src.includes('sunrise') ? 'sunrise' : src.includes('worship') ? 'reverence' : 'campus';

/** Each shot follows the subject's meaning; the painted characters remain one honest image plane. */
export const CinematicBackground = ({src, duration, shade = .88, position = '50% 50%', textSide = 'right', camera}: {
  src: string; duration: number; shade?: number; position?: string; textSide?: TextSide; camera?: CameraMove;
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const move = camera ?? cameraFromSource(src);
  const t = frame / fps;
  const shot = {
    campus: {scale: [1.015, 1.035, 1.058], x: [5, -2, -14], y: [7, 2, -8], origin: '34% 48%'},
    gather: {scale: [1.045, 1.035, 1.025], x: [-15, -2, 14], y: [2, -2, -5], origin: '31% 54%'},
    gift: {scale: [1.012, 1.044, 1.06], x: [5, 0, -9], y: [7, 0, -7], origin: '30% 59%'},
    contemplate: {scale: [1.025, 1.038, 1.052], x: [0, -3, -8], y: [6, 0, -8], origin: '32% 58%'},
    sunrise: {scale: [1.015, 1.038, 1.058], x: [-5, -2, 7], y: [7, 0, -9], origin: '32% 47%'},
    reverence: {scale: [1.05, 1.038, 1.024], x: [-10, -2, 8], y: [-4, 1, 5], origin: '33% 42%'},
  }[move];
  const times = [0, duration * .52, duration - 1];
  const gradient = textSide === 'left'
    ? `linear-gradient(90deg, rgba(7,27,43,${shade}), rgba(7,27,43,${shade * .82}) 28%, rgba(7,27,43,.12) 65%, transparent)`
    : textSide === 'center'
      ? `radial-gradient(ellipse at 50% 48%, rgba(7,27,43,${shade * .85}), rgba(7,27,43,${shade * .5}) 46%, rgba(7,27,43,.05) 83%)`
      : textSide === 'lower'
        ? `linear-gradient(0deg, rgba(7,27,43,${shade}) 0%, rgba(7,27,43,${shade * .8}) 24%, rgba(7,27,43,.08) 65%, transparent)`
        : `linear-gradient(90deg, rgba(7,27,43,.02) 18%, rgba(7,27,43,.06) 38%, rgba(7,27,43,${shade * .53}) 56%, rgba(7,27,43,${shade}) 84%, rgba(7,27,43,${shade}) 100%)`;
  return <AbsoluteFill style={{background: theme.navy, overflow: 'hidden'}}>
    <AbsoluteFill style={{
      scale: interpolate(frame, times, shot.scale, {...clamp, easing: Easing.bezier(.35, .05, .55, 1)}),
      translate: `${interpolate(frame, times, shot.x, clamp)}px ${interpolate(frame, times, shot.y, clamp)}px`,
      transformOrigin: shot.origin,
    }}>
      <CanvasImage src={staticFile(src)} premountFor={fps} style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: position}}/>
    </AbsoluteFill>
    <AbsoluteFill style={{pointerEvents: 'none', mixBlendMode: 'screen', opacity: move === 'contemplate' ? .14 : .19,
      background: `radial-gradient(ellipse at ${25 + Math.sin(t * .21) * 6}% ${move === 'sunrise' ? 30 : 61}%, #f9c77b52, transparent 55%)`,
      translate: `${Math.sin(t * .13) * 14}px ${Math.cos(t * .19) * 8}px`,
    }}/>
    <AbsoluteFill style={{background: gradient}}/>
    <AbsoluteFill style={{background: 'linear-gradient(0deg, rgba(3,17,23,.6), transparent 28%, transparent 82%, rgba(3,17,23,.19))'}}/>
    <AbsoluteFill style={{background: 'radial-gradient(ellipse at 35% 45%, transparent 35%, rgba(0,10,16,.25) 100%)'}}/>
  </AbsoluteFill>;
};
