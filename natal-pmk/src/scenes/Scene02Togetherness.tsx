import {SceneFrame} from '../components/SceneFrame';
import {AnimatedText} from '../components/AnimatedText';
import {copy, plates} from '../config/scenes';
import {theme} from '../config/theme';
export const Scene02Togetherness = () => <SceneFrame src={plates.togetherness} duration={210} top={325} text={<>
  <AnimatedText delay={3.2} size={138} color={theme.pink}>{copy.togetherness.title}</AnimatedText>
  <AnimatedText delay={3.8} size={89}>{copy.togetherness.message}</AnimatedText>
  <div style={{marginTop: 38}}><AnimatedText delay={5} size={39} style={{fontFamily: theme.sans, fontWeight: 400, lineHeight: 1.4}}>{copy.togetherness.footer}</AnimatedText></div>
</>}/>;
