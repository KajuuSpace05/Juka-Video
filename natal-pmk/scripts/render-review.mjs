import {bundle} from '@remotion/bundler';
import {getCompositions, openBrowser, renderStill} from '@remotion/renderer';
import {mkdir, writeFile} from 'node:fs/promises';
import path from 'node:path';

const out = path.resolve('out/review');
await mkdir(out, {recursive: true});
const browser = await openBrowser('chrome', {browserExecutable: process.env.REMOTION_BROWSER_EXECUTABLE || '/usr/bin/chromium'});
try {
  const serveUrl = await bundle({entryPoint: path.resolve('src/index.ts')});
  const compositions = await getCompositions(serveUrl, {puppeteerInstance: browser});
  const composition = compositions.find(c => c.id === 'NatalPMKUNY2026');
  if (!composition || composition.durationInFrames !== 1800 || composition.fps !== 30 || composition.width !== 1920 || composition.height !== 1080) throw Error('Unexpected composition metadata');
  const frames = [156, 369, 606, 870, 1131, 1404, 1641, 1785];
  for (let i = 0; i < frames.length; i++) {
    const output = path.join(out, `${String(i + 1).padStart(2, '0')}.png`);
    await renderStill({serveUrl, composition, puppeteerInstance: browser, frame: frames[i], imageFormat: 'png', output, scale: .5});
    console.log(`Scene ${i + 1}: frame ${frames[i]} rendered`);
  }
  await writeFile(path.join(out, 'result.json'), JSON.stringify({verifiedAt: new Date().toISOString(), composition: {id: composition.id, width: composition.width, height: composition.height, fps: composition.fps, durationInFrames: composition.durationInFrames}, frames}, null, 2));
} finally {await browser.close({silent: true});}
