import {AbsoluteFill, CanvasImage, interpolate, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {clamp, theme} from '../config/theme';

export const CinematicBackground = ({src, duration, shade = .88, position = '50% 50%'}: {
  src: string; duration: number; shade?: number; position?: string;
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  return <AbsoluteFill style={{background: theme.navy, overflow: 'hidden'}}>
    <AbsoluteFill style={{scale: interpolate(frame, [0, duration - 1], [1, 1.055], clamp), translate: interpolate(frame, [0, duration - 1], ['0px 0px', '-16px -5px'], clamp)}}>
      <CanvasImage src={staticFile(src)} premountFor={fps} style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: position}}/>
    </AbsoluteFill>
    <AbsoluteFill style={{background: `linear-gradient(90deg, rgba(7,27,43,.04) 10%, rgba(7,27,43,.04) 35%, rgba(7,27,43,${shade * .55}) 54%, rgba(7,27,43,${shade}) 83%, rgba(7,27,43,${shade}) 100%)`}}/>
    <AbsoluteFill style={{background: 'linear-gradient(0deg, rgba(3,17,23,.65), transparent 28%, transparent 82%, rgba(3,17,23,.2))'}}/>
    <AbsoluteFill style={{background: 'radial-gradient(ellipse at 30% 44%, transparent 40%, rgba(0,10,16,.3) 100%)'}}/>
  </AbsoluteFill>;
};
