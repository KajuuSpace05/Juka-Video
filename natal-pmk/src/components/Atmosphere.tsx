import React, { useId } from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const GOLD = "#D8B76A";
const IVORY = "#FFF0D7";
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const hash = (n: number) => {
  const v = Math.sin(n * 127.1 + 311.7) * 43758.5453123;
  return v - Math.floor(v);
};
const safeId = (id: string) => id.replace(/:/g, "");

/** A single deterministic field; intentionally edited as one particle template. */
export const GoldParticles: React.FC<{
  count?: number;
  seed?: number;
  color?: string;
}> = ({ count = 42, seed = 17, color = GOLD }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const id = safeId(useId());
  const seconds = Math.max(0, frame) / fps;
  return (
    <AbsoluteFill style={{ pointerEvents: "none", overflow: "hidden" }}>
      <svg width="100%" height="100%" viewBox="0 0 1920 1080" fill="none">
        <defs>
          <radialGradient id={`${id}-bokeh`}>
            <stop stopColor={IVORY} stopOpacity="0.7" />
            <stop offset="0.32" stopColor={color} stopOpacity="0.35" />
            <stop offset="1" stopColor={color} stopOpacity="0" />
          </radialGradient>
        </defs>
        {Array.from({ length: count }, (_, i) => {
          const s = seed + i * 19;
          const depth = hash(s + 2);
          const x =
            hash(s) * 2000 -
            40 +
            Math.sin(seconds * 0.12 + i * 2.7) * (10 + depth * 24);
          const y =
            ((hash(s + 1) * 1200 - seconds * (8 + depth * 15) + 2400) % 1200) -
            60;
          const radius = i % 9 === 0 ? 8 + depth * 12 : 0.9 + depth * 2.2;
          const opacity =
            (0.18 + depth * 0.3) *
            (0.65 + 0.35 * Math.sin(seconds * (0.8 + depth) + i * 3.1));
          return (
            <g key={i} opacity={opacity}>
              {i % 9 === 0 ? (
                <circle cx={x} cy={y} r={radius} fill={`url(#${id}-bokeh)`} />
              ) : (
                <circle
                  cx={x}
                  cy={y}
                  r={radius}
                  fill={i % 4 === 0 ? IVORY : color}
                />
              )}
              {i % 13 === 0 && (
                <path
                  d={`M ${x - 5} ${y} h 10 M ${x} ${y - 5} v 10`}
                  stroke={IVORY}
                  strokeWidth="0.7"
                  opacity="0.7"
                />
              )}
            </g>
          );
        })}
      </svg>
    </AbsoluteFill>
  );
};

/** Coordinates are the star's center in the 1920×1080 video canvas. Delay is seconds. */
export const StarGlow: React.FC<{
  x?: number;
  y?: number;
  size?: number;
  delay?: number;
}> = ({ x = 1450, y = 195, size = 150, delay = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const id = safeId(useId());
  const shimmer = 0.92 + 0.08 * Math.sin((frame / fps) * 1.2);
  return (
    <div
      style={{
        position: "absolute",
        left: x - size / 2,
        top: y - size / 2,
        width: size,
        height: size,
        pointerEvents: "none",
        opacity: interpolate(
          frame,
          [delay * fps, (delay + 1) * fps],
          [0, 1],
          clamp,
        ),
        scale: interpolate(
          frame,
          [delay * fps, (delay + 1.8) * fps],
          [0.78, 1],
          { ...clamp, easing: Easing.bezier(0.2, 0.7, 0.25, 1) },
        ),
        rotate: `${Math.sin((frame / fps) * 0.2) * 1.3}deg`,
      }}
    >
      <svg viewBox="0 0 200 200" width="100%" height="100%">
        <defs>
          <radialGradient id={`${id}-aura`}>
            <stop stopColor={IVORY} stopOpacity="0.45" />
            <stop offset="0.23" stopColor={GOLD} stopOpacity="0.22" />
            <stop offset="1" stopColor={GOLD} stopOpacity="0" />
          </radialGradient>
          <linearGradient id={`${id}-star`} x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#FFF9E9" />
            <stop offset="0.5" stopColor="#F6D598" />
            <stop offset="1" stopColor={GOLD} />
          </linearGradient>
        </defs>
        <circle
          cx="100"
          cy="100"
          r="98"
          fill={`url(#${id}-aura)`}
          opacity={shimmer}
        />
        <path
          d="M100 20 107 88 143 57 112 94 173 100 112 106 143 143 107 112 100 182 93 112 57 143 88 106 27 100 88 94 57 57 93 88Z"
          fill={`url(#${id}-star)`}
          opacity={shimmer}
        />
        <path
          d="M100 56 104 96 143 100 104 104 100 150 96 104 57 100 96 96Z"
          fill="#FFFBEF"
        />
        <circle cx="100" cy="100" r="3.5" fill="white" />
      </svg>
    </div>
  );
};

/** A drawn calligraphic gold flourish. x/y locate its top-left; delay is seconds. */
export const MagicalLightTrail: React.FC<{
  delay?: number;
  x?: number;
  y?: number;
  width?: number;
}> = ({ delay = 0, x = 1160, y = 760, width = 600 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const id = safeId(useId());
  const t = interpolate(frame, [delay * fps, (delay + 1.4) * fps], [0, 1], {
    ...clamp,
    easing: Easing.bezier(0.35, 0, 0.15, 1),
  });
  const path =
    "M10 78C115 20 286 35 425 65S550 98 587 63C612 40 585 23 563 33C542 43 571 55 590 45";
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width,
        height: width / 5,
        pointerEvents: "none",
        opacity: interpolate(
          frame,
          [delay * fps, (delay + 0.18) * fps],
          [0, 1],
          clamp,
        ),
      }}
    >
      <svg viewBox="0 0 620 124" width="100%" height="100%" overflow="visible">
        <defs>
          <linearGradient id={`${id}-stroke`}>
            <stop stopColor={GOLD} stopOpacity="0.1" />
            <stop offset="0.5" stopColor="#FFE8AF" />
            <stop offset="1" stopColor={GOLD} />
          </linearGradient>
        </defs>
        <path
          d={path}
          pathLength="1000"
          stroke={GOLD}
          strokeWidth="10"
          opacity="0.05"
          fill="none"
          strokeDasharray="1000"
          strokeDashoffset={1000 * (1 - t)}
          strokeLinecap="round"
        />
        <path
          d={path}
          pathLength="1000"
          stroke={GOLD}
          strokeWidth="4"
          opacity="0.14"
          fill="none"
          strokeDasharray="1000"
          strokeDashoffset={1000 * (1 - t)}
          strokeLinecap="round"
        />
        <path
          d={path}
          pathLength="1000"
          stroke={`url(#${id}-stroke)`}
          strokeWidth="1.2"
          fill="none"
          strokeDasharray="1000"
          strokeDashoffset={1000 * (1 - t)}
          strokeLinecap="round"
        />
        <path
          d="M55 100C209 63 381 102 489 88"
          pathLength="1000"
          stroke={GOLD}
          strokeWidth="0.65"
          opacity="0.45"
          fill="none"
          strokeDasharray="1000"
          strokeDashoffset={1000 * (1 - t)}
        />
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <circle
            key={i}
            cx={105 + i * 81}
            cy={55 + Math.sin(i * 2) * 16}
            r={i % 2 === 0 ? 1.6 : 1}
            fill={IVORY}
            opacity={
              Math.max(0, Math.min(1, t * 5 - i * 0.65)) *
              (0.55 + Math.sin((frame / fps) * 1.6 + i) * 0.25)
            }
          />
        ))}
      </svg>
    </div>
  );
};

const PineSprig: React.FC<{ light: boolean }> = ({ light }) => (
  <g>
    <path
      d="M0 8Q155 30 358 132"
      stroke={light ? "#7B8258" : "#57765A"}
      strokeWidth="4"
      fill="none"
    />
    {Array.from({ length: 28 }, (_, i) => {
      const t = i / 27;
      const x = t * 350;
      const y = 8 + t * t * 118;
      const length = 65 - t * 35;
      return (
        <g key={i} transform={`translate(${x} ${y}) rotate(${10 + t * 30})`}>
          <path
            d={`M0 0Q${length * 0.35} ${-length * 0.35} ${length * 0.15} ${-length}`}
            fill="none"
            stroke={light ? "#819471" : "#2C5C44"}
            strokeWidth="3.4"
            strokeLinecap="round"
          />
          <path
            d={`M0 0Q${length * 0.2} ${length * 0.6} ${-length * 0.12} ${length}`}
            fill="none"
            stroke={light ? "#A2B08B" : "#38664A"}
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d={`M0 0L${length * 0.43} ${-length * 0.75} M0 0L${length * 0.38} ${length * 0.8}`}
            fill="none"
            stroke={light ? "#BBC7A0" : "#66815A"}
            strokeWidth="1.2"
            strokeLinecap="round"
            opacity="0.8"
          />
        </g>
      );
    })}
  </g>
);

const SatinBow: React.FC<{ id: string }> = ({ id }) => (
  <g>
    <path
      d="M0 0C-25-49-104-67-107-34C-110 4-44 23 0 0Z"
      fill={`url(#${id}-satin)`}
      stroke="#F2BDD0"
      strokeWidth="0.7"
    />
    <path
      d="M0 0C31-47 107-62 110-27C111 4 47 21 0 0Z"
      fill={`url(#${id}-satin)`}
      stroke="#F2BDD0"
      strokeWidth="0.7"
    />
    <path
      d="M-6 2C-22 40-18 89-42 130L-18 122-1 139C20 80 16 32 9 4Z"
      fill={`url(#${id}-satin)`}
    />
    <path
      d="M9 4C24 47 61 67 65 106L81 89 101 89C90 47 54 16 18-2Z"
      fill={`url(#${id}-satin)`}
    />
    <path
      d="M-96-34Q-46-7-5-3 M13-4Q54-11 100-29 M2 11Q-4 84-23 121"
      fill="none"
      stroke="#FFE2E8"
      strokeWidth="1"
      opacity="0.48"
    />
    <rect
      x="-13"
      y="-13"
      width="31"
      height="28"
      rx="8"
      fill={`url(#${id}-satin)`}
      stroke="#E2A0B3"
      strokeWidth="1"
    />
  </g>
);

const Bauble: React.FC<{
  id: string;
  x: number;
  y: number;
  radius: number;
  phase: number;
  seconds: number;
}> = ({ id, x, y, radius, phase, seconds }) => (
  <g
    transform={`translate(${x} 0) rotate(${Math.sin(seconds * 0.4 + phase) * 1.2})`}
  >
    <path
      d={`M0 0V${y - radius - 6}`}
      stroke={GOLD}
      strokeWidth="0.9"
      opacity="0.65"
    />
    <rect x="-5" y={y - radius - 10} width="10" height="9" rx="2" fill={GOLD} />
    <circle
      cy={y}
      r={radius}
      fill={`url(#${id}-gold)`}
      stroke="#F6D990"
      strokeWidth="0.8"
    />
    <ellipse
      cx={-radius * 0.35}
      cy={y - radius * 0.3}
      rx={radius * 0.2}
      ry={radius * 0.48}
      fill={IVORY}
      opacity="0.22"
    />
    <path
      d={`M${-radius * 0.78} ${y}Q0 ${y + radius * 0.5} ${radius * 0.78} ${y} M${-radius * 0.55} ${y - radius * 0.4}Q0 ${y - radius * 0.05} ${radius * 0.55} ${y - radius * 0.4}`}
      stroke="#FBDE9A"
      strokeWidth="0.7"
      fill="none"
      opacity="0.7"
    />
    <path
      d={`M0 ${y - radius * 0.65}L${radius * 0.11} ${y - radius * 0.17}L${radius * 0.53} ${y}L${radius * 0.11} ${y + radius * 0.16}L0 ${y + radius * 0.63}L${-radius * 0.11} ${y + radius * 0.16}L${-radius * 0.53} ${y}L${-radius * 0.11} ${y - radius * 0.17}Z`}
      fill="#FFF0C9"
      opacity="0.62"
    />
  </g>
);

/** Pine, satin and gold ornaments stay near the edges; the center is transparent. */
export const ChristmasDecorations: React.FC<{
  light?: boolean;
  full?: boolean;
}> = ({ light = false, full = false }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const seconds = Math.max(0, frame) / fps;
  const id = safeId(useId());
  return (
    <AbsoluteFill
      style={{
        pointerEvents: "none",
        overflow: "hidden",
        opacity: interpolate(frame, [0, 1.1 * fps], [0.12, 1], {
          ...clamp,
          easing: Easing.bezier(0.2, 0.65, 0.25, 1),
        }),
      }}
    >
      <svg width="100%" height="100%" viewBox="0 0 1920 1080" fill="none">
        <defs>
          <linearGradient id={`${id}-satin`} x1="0" y1="0" x2="0.8" y2="1">
            <stop stopColor="#9C5669" />
            <stop offset="0.28" stopColor="#E3A1B5" />
            <stop offset="0.47" stopColor="#F8C6D3" />
            <stop offset="0.62" stopColor="#CA819A" />
            <stop offset="1" stopColor="#A95F79" />
          </linearGradient>
          <radialGradient id={`${id}-gold`} cx="0.32" cy="0.26" r="0.85">
            <stop stopColor="#FFF0C5" />
            <stop offset="0.25" stopColor="#E4C680" />
            <stop offset="0.7" stopColor="#AE8242" />
            <stop offset="1" stopColor="#6C522F" />
          </radialGradient>
          <radialGradient id={`${id}-bulb`}>
            <stop stopColor="#FFF5D6" />
            <stop offset="0.2" stopColor="#F9C77B" stopOpacity="0.8" />
            <stop offset="1" stopColor="#F9C77B" stopOpacity="0" />
          </radialGradient>
        </defs>
        <Bauble
          id={id}
          x={177}
          y={244}
          radius={29}
          phase={0.4}
          seconds={seconds}
        />
        <Bauble
          id={id}
          x={330}
          y={168}
          radius={20}
          phase={1.7}
          seconds={seconds}
        />
        <Bauble
          id={id}
          x={1737}
          y={261}
          radius={36}
          phase={2.4}
          seconds={seconds}
        />
        <Bauble
          id={id}
          x={1613}
          y={159}
          radius={19}
          phase={0.1}
          seconds={seconds}
        />
        <g
          transform={`translate(-35 16) rotate(${Math.sin(seconds * 0.23) * 0.6})`}
        >
          <PineSprig light={light} />
          <g transform="rotate(34)">
            <PineSprig light={light} />
          </g>
          <g transform="translate(150 -26) rotate(-18) scale(.88)">
            <PineSprig light={light} />
          </g>
        </g>
        <g
          transform={`translate(1955 24) scale(-1 1) rotate(${Math.sin(seconds * 0.23 + 2) * 0.6})`}
        >
          <PineSprig light={light} />
          <g transform="rotate(37)">
            <PineSprig light={light} />
          </g>
          <g transform="translate(170 -40) rotate(-15) scale(.85)">
            <PineSprig light={light} />
          </g>
        </g>
        <g
          transform={`translate(122 111) rotate(${-13 + Math.sin(seconds * 0.3) * 0.6}) scale(.73)`}
        >
          <SatinBow id={id} />
        </g>
        <g
          transform={`translate(1807 105) rotate(${14 + Math.sin(seconds * 0.27) * 0.6}) scale(.77)`}
        >
          <SatinBow id={id} />
        </g>
        {full && (
          <>
            <g
              transform={`translate(-14 1090) rotate(${-24 + Math.sin(seconds * 0.2) * 0.5}) scale(1 -1)`}
            >
              <PineSprig light={light} />
              <g transform="rotate(34)">
                <PineSprig light={light} />
              </g>
              <g transform="translate(210 -8) scale(.6)">
                <PineSprig light={light} />
              </g>
            </g>
            <g
              transform={`translate(1934 1090) rotate(${24 + Math.sin(seconds * 0.2 + 2) * 0.5}) scale(-1 -1)`}
            >
              <PineSprig light={light} />
              <g transform="rotate(34)">
                <PineSprig light={light} />
              </g>
              <g transform="translate(210 -8) scale(.6)">
                <PineSprig light={light} />
              </g>
            </g>
            <g transform="translate(1785 961) rotate(17) scale(.55)">
              <SatinBow id={id} />
            </g>
            <g transform="translate(131 974) rotate(-21) scale(.53)">
              <SatinBow id={id} />
            </g>
          </>
        )}
        <path
          d="M-20 93Q197 208 407 83M1514 82Q1725 210 1940 95"
          stroke={light ? "#A6A17D" : "#77835D"}
          strokeWidth="0.7"
          opacity="0.7"
        />
        {Array.from({ length: 19 }, (_, i) => {
          const left = i < 10;
          const t = (left ? i : i - 10) / 9;
          const x = left ? -15 + t * 420 : 1520 + t * 420;
          const y = 95 + Math.sin(t * Math.PI) * 58;
          const pulse = 0.7 + Math.sin(seconds * 1.1 + i * 2.3) * 0.2;
          return (
            <g key={i} opacity={pulse}>
              <circle cx={x} cy={y} r="18" fill={`url(#${id}-bulb)`} />
              <circle cx={x} cy={y} r="2.2" fill="#FFF2CB" />
            </g>
          );
        })}
      </svg>
    </AbsoluteFill>
  );
};
