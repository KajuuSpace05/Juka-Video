import {SceneFrame} from '../components/SceneFrame';
import {AnimatedText} from '../components/AnimatedText';
import {copy, plates} from '../config/scenes';
import {theme} from '../config/theme';
export const Scene06Gratitude = () => <SceneFrame src={plates.gratitude} duration={270} top={328} text={<>
  <AnimatedText delay={3.5} size={122} variant="rise" color={theme.pink}>{copy.gratitude.title}</AnimatedText>
  <div style={{marginTop: 24}}><AnimatedText delay={4.4} size={39} style={{fontFamily: theme.sans, lineHeight: 1.4}}>{copy.gratitude.subtitle}</AnimatedText></div>
  <div style={{marginTop: 25}}><AnimatedText delay={5.7} size={66} variant="mask">{copy.gratitude.event}</AnimatedText></div>
</>}/>;
