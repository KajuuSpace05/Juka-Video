import {SceneFrame} from '../components/SceneFrame';
import {AnimatedText} from '../components/AnimatedText';
import {copy, plates} from '../config/scenes';
import {theme} from '../config/theme';
export const Scene05StudentMeaning = () => <SceneFrame src={plates.meaning} duration={270} top={284} text={<>
  <AnimatedText delay={3.5} size={122} color={theme.pink}>{copy.meaning.lines[0]}</AnimatedText>
  <AnimatedText delay={4.1} size={69}>{copy.meaning.lines[1]}</AnimatedText>
  <AnimatedText delay={4.8} size={69}>{copy.meaning.lines[2]}</AnimatedText>
  <AnimatedText delay={5.4} size={69}>{copy.meaning.lines[3]}</AnimatedText>
</>}/>;
