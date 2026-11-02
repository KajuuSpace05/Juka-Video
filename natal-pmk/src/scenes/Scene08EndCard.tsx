import {AbsoluteFill, CanvasImage, interpolate, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {ChristmasDecorations, GoldParticles} from '../components/Atmosphere';
import {AnimatedText} from '../components/AnimatedText';
import logos from '../config/logo-assets.json';
import {theme, clamp} from '../config/theme';
import {copy} from '../config/scenes';
const OriginalLogo = ({src, label}: {src: string | null; label: string}) => {
  const {fps} = useVideoConfig();
  return src ? <CanvasImage src={staticFile(src)} premountFor={fps} style={{width: 315, height: 370, objectFit: 'contain'}}/> :
    <div style={{width: 315, height: 350, border: '1px dashed #8a927b', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: '#51614e', fontFamily: theme.sans, fontSize: 23, textAlign: 'center', gap: 18, padding: 25}}>
      <span>{label}</span><span style={{fontSize: 15, lineHeight: 1.5}}>PLACEHOLDER PRATINJAU<br/>Berkas asli belum terpasang</span>
    </div>;
};
export const Scene08EndCard = () => {
  const frame = useCurrentFrame(); const {fps} = useVideoConfig();
  return <AbsoluteFill style={{overflow: 'hidden', background: 'radial-gradient(ellipse at 52% 38%, #fffdf7, #fff0df 63%, #e4e8d4 100%)'}}>
    <ChristmasDecorations light full/>
    <GoldParticles count={28} seed={1080} color="#ae8b43"/>
    <div style={{position: 'absolute', left: 505, top: 257, width: 910, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      opacity: interpolate(frame, [fps, 2 * fps], [0, 1], clamp), translate: interpolate(frame, [fps, 2 * fps], ['0px 20px', '0px 0px'], clamp)}}>
      <OriginalLogo src={logos.uny} label="Logo UNY asli"/>
      <div style={{width: 1, height: 240, background: 'linear-gradient(transparent, #b6a477, transparent)'}}/>
      <OriginalLogo src={logos.natal} label="Logo Natal asli"/>
    </div>
    <div style={{position: 'absolute', left: 200, top: 742, width: 1520}}>
      <AnimatedText delay={2} size={66} align="center" color={theme.evergreen} style={{textShadow: 'none'}}>{copy.blessing}</AnimatedText>
    </div>
  </AbsoluteFill>;
};
