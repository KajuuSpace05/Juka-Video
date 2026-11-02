import {SceneFrame} from '../components/SceneFrame';
import {AnimatedText} from '../components/AnimatedText';
import {StarGlow} from '../components/Atmosphere';
import {copy, plates} from '../config/scenes';
import {theme} from '../config/theme';
export const Scene04Nativity = () => <SceneFrame src={plates.nativity} duration={270} top={350} text={<>
  <AnimatedText delay={5.3} size={118}>{copy.nativity.title}</AnimatedText>
  <div style={{marginTop: 25}}><AnimatedText delay={5.9} size={85} script color={theme.gold}>{copy.nativity.subtitle}</AnimatedText></div>
  <div style={{marginTop: 10}}><AnimatedText delay={6.5} size={42} style={{letterSpacing: 3}}>{copy.nativity.footer}</AnimatedText></div>
</>}><StarGlow x={665} y={148} size={85} delay={0}/></SceneFrame>;
