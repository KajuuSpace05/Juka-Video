import {AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {clamp} from '../config/theme';

// The overlay spans each cut, while scene boundaries stay at their exact global frames.
export const SceneTransition = () => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const peak = .3 * fps;
  return <AbsoluteFill style={{pointerEvents: 'none', mixBlendMode: 'screen',
    opacity: interpolate(f, [0, peak, .6 * fps - 1], [0, .94, 0], clamp),
    background: 'radial-gradient(ellipse at 42% 55%, #fff5db 0%, #f9c77bb8 28%, #d8b76a55 65%, transparent 100%)',
  }}>
    <div style={{position: 'absolute', left: 0, top: 0, width: '30%', height: '100%',
      translate: interpolate(f, [0, .6 * fps], ['-650px 0px', '2300px 0px'], clamp),
      background: 'linear-gradient(90deg, transparent, #fff9dfb0, transparent)', rotate: '-15deg', filter: 'blur(30px)'}}/>
  </AbsoluteFill>;
};
