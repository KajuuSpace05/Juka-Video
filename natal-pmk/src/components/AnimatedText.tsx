import type {CSSProperties, ReactNode} from 'react';
import {Easing, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {clamp, theme} from '../config/theme';

export type TextRevealVariant = 'rise' | 'mask' | 'words' | 'script' | 'soft';

/** Word rhythm and a satin mask share one source of exact editable text. */
export const AnimatedText = ({children, delay = 0, size = 88, script = false, color = theme.ivory, align = 'left', style = {}, variant}: {
  children: ReactNode; delay?: number; size?: number; script?: boolean; color?: string;
  align?: CSSProperties['textAlign']; style?: CSSProperties; variant?: TextRevealVariant;
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const mode = variant ?? (script ? 'script' : size >= 110 ? 'words' : size < 50 ? 'soft' : 'mask');
  const start = delay * fps;
  const easing = Easing.bezier(.16, 1, .3, 1);
  const words = mode === 'words' && typeof children === 'string' ? children.split(/(\s+)/) : null;
  const content = words ? words.map((word, i) => /^\s+$/.test(word) ? word : <span key={i} style={{
    display: 'inline-block',
    opacity: interpolate(frame, [start + i * .035 * fps, start + (.6 + i * .035) * fps], [0, 1], clamp),
    translate: interpolate(frame, [start + i * .035 * fps, start + (.9 + i * .035) * fps], ['0px 30px', '0px 0px'], {...clamp, easing}),
    filter: `blur(${interpolate(frame, [start + i * .035 * fps, start + (.55 + i * .035) * fps], [4, 0], clamp)}px)`,
  }}>{word}</span>) : children;
  return <div style={{overflow: 'hidden', padding: script ? '13px 10px 18px 3px' : '3px 2px 12px', marginLeft: -3}}>
    <div style={{
      fontFamily: script ? theme.script : theme.serif, fontSize: size, fontWeight: script ? 400 : 500,
      lineHeight: script ? 1.12 : 1.04, color, textAlign: align, whiteSpace: 'pre-line',
      opacity: words ? 1 : interpolate(frame, [start, start + .65 * fps], [0, 1], clamp),
      translate: mode === 'mask' ? interpolate(frame, [start, start + .95 * fps], ['24px 0px', '0px 0px'], {...clamp, easing})
        : mode === 'rise' ? interpolate(frame, [start, start + .95 * fps], ['0px 42px', '0px 0px'], {...clamp, easing})
          : mode === 'soft' ? interpolate(frame, [start, start + .85 * fps], ['0px 12px', '0px 0px'], {...clamp, easing}) : undefined,
      clipPath: mode === 'script' ? `inset(0 ${interpolate(frame, [start, start + 1.1 * fps], [100, 0], {...clamp, easing})}% 0 0)`
        : mode === 'mask' ? `inset(0 0 ${interpolate(frame, [start, start + .9 * fps], [100, 0], {...clamp, easing})}% 0)` : undefined,
      filter: words ? undefined : `blur(${interpolate(frame, [start, start + .6 * fps], [mode === 'soft' ? 3 : 2, 0], clamp)}px)`,
      letterSpacing: script ? 0 : interpolate(frame, [start, start + 1.1 * fps], [.65, 0], clamp),
      textShadow: '0 2px 18px rgba(0,0,0,.28)', ...style,
    }}>{content}</div>
  </div>;
};
