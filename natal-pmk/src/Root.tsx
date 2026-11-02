import {Composition, Folder} from 'remotion';
import {NatalPMKUNY2026} from './NatalPMKUNY2026';
import {Scene01Opening} from './scenes/Scene01Opening';
import {Scene02Togetherness} from './scenes/Scene02Togetherness';
import {Scene03Gift} from './scenes/Scene03Gift';
import {Scene04Nativity} from './scenes/Scene04Nativity';
import {Scene05StudentMeaning} from './scenes/Scene05StudentMeaning';
import {Scene06Gratitude} from './scenes/Scene06Gratitude';
import {Scene07Closing} from './scenes/Scene07Closing';
import {Scene08EndCard} from './scenes/Scene08EndCard';
import './style.css';
export const RemotionRoot = () => <>
  <Composition id="NatalPMKUNY2026" component={NatalPMKUNY2026} width={1920} height={1080} fps={30} durationInFrames={1800}/>
  <Folder name="Scenes">
    <Composition id="Opening" component={Scene01Opening} width={1920} height={1080} fps={30} durationInFrames={180}/>
    <Composition id="Togetherness" component={Scene02Togetherness} width={1920} height={1080} fps={30} durationInFrames={210}/>
    <Composition id="Gift" component={Scene03Gift} width={1920} height={1080} fps={30} durationInFrames={240}/>
    <Composition id="Nativity" component={Scene04Nativity} width={1920} height={1080} fps={30} durationInFrames={270}/>
    <Composition id="StudentMeaning" component={Scene05StudentMeaning} width={1920} height={1080} fps={30} durationInFrames={270}/>
    <Composition id="Gratitude" component={Scene06Gratitude} width={1920} height={1080} fps={30} durationInFrames={270}/>
    <Composition id="Closing" component={Scene07Closing} width={1920} height={1080} fps={30} durationInFrames={240}/>
    <Composition id="EndCard" component={Scene08EndCard} width={1920} height={1080} fps={30} durationInFrames={120}/>
  </Folder>
</>;
