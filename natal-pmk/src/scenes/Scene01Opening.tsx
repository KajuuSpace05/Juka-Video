import {AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {SceneFrame} from '../components/SceneFrame';
import {AnimatedText} from '../components/AnimatedText';
import {StarGlow, MagicalLightTrail} from '../components/Atmosphere';
import {copy, plates} from '../config/scenes';
import {theme, clamp} from '../config/theme';
export const Scene01Opening = () => {
  const frame = useCurrentFrame(); const {fps} = useVideoConfig();
  return <SceneFrame src={plates.opening} duration={180} top={335} trail={false} text={<>
    <AnimatedText delay={2} size={105} style={{maxWidth: 720}}>{copy.opening.title}</AnimatedText>
    <div style={{marginTop: 30}}><AnimatedText delay={3.6} size={84} script color={theme.gold}>{copy.opening.subtitle}</AnimatedText></div>
  </>}>
    <StarGlow x={1438} y={215} size={95} delay={.6}/>
    <MagicalLightTrail x={1090} y={735} width={620} delay={3.5}/>
    <AbsoluteFill style={{background: theme.navy, opacity: interpolate(frame, [0, 1.1 * fps], [1, 0], clamp)}}/>
  </SceneFrame>;
};
