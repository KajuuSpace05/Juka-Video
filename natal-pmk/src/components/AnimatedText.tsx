import type {CSSProperties, ReactNode} from 'react';
import {Easing, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {clamp, theme} from '../config/theme';

export const AnimatedText = ({children, delay = 0, size = 88, script = false, color = theme.ivory, align = 'left', style = {}}: {
  children: ReactNode; delay?: number; size?: number; script?: boolean; color?: string;
  align?: CSSProperties['textAlign']; style?: CSSProperties;
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  return <div style={{overflow: 'hidden', padding: script ? '12px 10px 16px 3px' : '2px 2px 10px', marginLeft: -3}}>
    <div style={{
      fontFamily: script ? theme.script : theme.serif, fontSize: size, fontWeight: script ? 400 : 500,
      lineHeight: script ? 1.1 : 1.03, color, textAlign: align, whiteSpace: 'pre-line',
      opacity: interpolate(frame, [delay * fps, (delay + .65) * fps], [0, 1], clamp),
      translate: interpolate(frame, [delay * fps, (delay + .95) * fps], ['0px 46px', '0px 0px'], {...clamp, easing: Easing.bezier(.16, 1, .3, 1)}),
      filter: `blur(${interpolate(frame, [delay * fps, (delay + .6) * fps], [5, 0], clamp)}px)`,
      letterSpacing: script ? 0 : interpolate(frame, [delay * fps, (delay + 1.1) * fps], [1.1, 0], clamp),
      textShadow: '0 2px 32px rgba(0,0,0,.26)', ...style,
    }}>{children}</div>
  </div>;
};
