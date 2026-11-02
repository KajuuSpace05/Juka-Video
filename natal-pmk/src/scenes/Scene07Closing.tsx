import {AbsoluteFill} from 'remotion';
import {ChristmasDecorations, GoldParticles, MagicalLightTrail, StarGlow} from '../components/Atmosphere';
import {AnimatedText} from '../components/AnimatedText';
import {copy} from '../config/scenes';
import {theme} from '../config/theme';
export const Scene07Closing = () => <AbsoluteFill style={{overflow: 'hidden', background: 'radial-gradient(ellipse at 50% 43%, #204f3f 0%, #103E30 40%, #061d1a 100%)'}}>
  <GoldParticles count={65} seed={700}/>
  <ChristmasDecorations full/>
  <StarGlow x={960} y={220} size={110} delay={.3}/>
  <div style={{position: 'absolute', left: 160, top: 355, width: 1600, textAlign: 'center'}}>
    <AnimatedText delay={1.2} size={163} align="center" color={theme.ivory} style={{letterSpacing: 5}}>{copy.closing.title}</AnimatedText>
    <div style={{marginTop: 26}}><AnimatedText delay={3.2} size={61} align="center" color={theme.pink}>{copy.closing.event}</AnimatedText></div>
    <div style={{marginTop: 35}}><AnimatedText delay={4.5} size={101} script align="center" color={theme.gold}>{copy.closing.subtitle}</AnimatedText></div>
  </div>
  <MagicalLightTrail x={570} y={820} width={780} delay={4.5}/>
</AbsoluteFill>;
