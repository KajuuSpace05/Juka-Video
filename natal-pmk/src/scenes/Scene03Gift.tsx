import {SceneFrame} from '../components/SceneFrame';
import {AnimatedText} from '../components/AnimatedText';
import {copy, plates} from '../config/scenes';
import {theme} from '../config/theme';
export const Scene03Gift = () => <SceneFrame src={plates.gift} duration={240} top={315} text={<>
  <AnimatedText delay={4.5} size={87} variant="mask">{copy.gift.lines[0]}</AnimatedText>
  <AnimatedText delay={4.95} size={87} variant="mask">{copy.gift.lines[1]}</AnimatedText>
  <AnimatedText delay={5.4} size={87} variant="words" color={theme.pink}>{copy.gift.lines[2]}</AnimatedText>
</>}>
  <div style={{position: 'absolute', left: 145, top: 852, width: 790}}>
    <AnimatedText delay={3.6} size={79} script color={theme.gold}>{copy.gift.title}</AnimatedText>
  </div>
</SceneFrame>;
