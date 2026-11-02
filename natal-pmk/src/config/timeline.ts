export const VIDEO = {width: 1920, height: 1080, fps: 30, duration: 1800} as const;
export const timeline = [
  {id: 'Opening', from: 0, duration: 180},
  {id: 'Togetherness', from: 180, duration: 210},
  {id: 'Gift', from: 390, duration: 240},
  {id: 'Nativity', from: 630, duration: 270},
  {id: 'StudentMeaning', from: 900, duration: 270},
  {id: 'Gratitude', from: 1170, duration: 270},
  {id: 'Closing', from: 1440, duration: 240},
  {id: 'EndCard', from: 1680, duration: 120},
] as const;
