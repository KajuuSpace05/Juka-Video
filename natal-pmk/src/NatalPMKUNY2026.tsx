import {AbsoluteFill, Sequence, useVideoConfig} from 'remotion';
import {Scene01Opening} from './scenes/Scene01Opening';
import {Scene02Togetherness} from './scenes/Scene02Togetherness';
import {Scene03Gift} from './scenes/Scene03Gift';
import {Scene04Nativity} from './scenes/Scene04Nativity';
import {Scene05StudentMeaning} from './scenes/Scene05StudentMeaning';
import {Scene06Gratitude} from './scenes/Scene06Gratitude';
import {Scene07Closing} from './scenes/Scene07Closing';
import {Scene08EndCard} from './scenes/Scene08EndCard';
import {SceneTransition} from './components/SceneTransition';
import {AudioTrack} from './components/AudioTrack';
export const NatalPMKUNY2026 = () => {
  const {fps} = useVideoConfig();
  return <AbsoluteFill style={{background: '#071B2B'}}>
    <AudioTrack/>
    <Sequence  durationInFrames={6 * fps} name="Opening" premountFor={fps}><Scene01Opening/></Sequence>
    <Sequence from={6 * fps} durationInFrames={7 * fps} name="Togetherness" premountFor={fps}><Scene02Togetherness/></Sequence>
    <Sequence from={13 * fps} durationInFrames={8 * fps} name="Gift" premountFor={fps}><Scene03Gift/></Sequence>
    <Sequence from={21 * fps} durationInFrames={9 * fps} name="Nativity" premountFor={fps}><Scene04Nativity/></Sequence>
    <Sequence from={30 * fps} durationInFrames={9 * fps} name="StudentMeaning" premountFor={fps}><Scene05StudentMeaning/></Sequence>
    <Sequence from={39 * fps} durationInFrames={9 * fps} name="Gratitude" premountFor={fps}><Scene06Gratitude/></Sequence>
    <Sequence from={48 * fps} durationInFrames={8 * fps} name="Closing" premountFor={fps}><Scene07Closing/></Sequence>
    <Sequence from={56 * fps} durationInFrames={4 * fps} name="EndCard" premountFor={fps}><Scene08EndCard/></Sequence>
    <Sequence from={5.7 * fps} durationInFrames={.6 * fps} name="Glow-01" premountFor={fps}><SceneTransition/></Sequence>
    <Sequence from={12.7 * fps} durationInFrames={.6 * fps} name="Glow-02" premountFor={fps}><SceneTransition/></Sequence>
    <Sequence from={20.7 * fps} durationInFrames={.6 * fps} name="Glow-03" premountFor={fps}><SceneTransition/></Sequence>
    <Sequence from={29.7 * fps} durationInFrames={.6 * fps} name="Glow-04" premountFor={fps}><SceneTransition/></Sequence>
    <Sequence from={38.7 * fps} durationInFrames={.6 * fps} name="Glow-05" premountFor={fps}><SceneTransition/></Sequence>
    <Sequence from={47.7 * fps} durationInFrames={.6 * fps} name="Glow-06" premountFor={fps}><SceneTransition/></Sequence>
    <Sequence from={55.7 * fps} durationInFrames={.6 * fps} name="Glow-07" premountFor={fps}><SceneTransition/></Sequence>
  </AbsoluteFill>;
};
