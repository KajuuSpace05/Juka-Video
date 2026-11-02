import {Audio} from '@remotion/media';
import {interpolate, staticFile, useVideoConfig} from 'remotion';
import audio from '../config/audio.json';
import {clamp} from '../config/theme';
export const AudioTrack = () => {
  const {fps, durationInFrames} = useVideoConfig();
  if (!audio.src) return null;
  return <Audio src={staticFile(audio.src)} premountFor={fps} volume={f => audio.volume * interpolate(f, [0, fps, durationInFrames - 2 * fps, durationInFrames - 1], [0, 1, 1, 0], clamp)}/>;
};
