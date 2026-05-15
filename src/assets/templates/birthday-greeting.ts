import { staticAssets } from '@/static-assets'

import type { Template } from './types'

export const birthdayGreetingTemplate: Template = {
  id: 'birthday-greeting-001',
  name: 'Birthday Greeting',
  description: 'Template ucapan selamat ulang tahun dengan background dan text',
  thumbnail: staticAssets('templates/birthday-greeting-thumb.svg'),
  backgroundImage: staticAssets('templates/birthday-greeting-bg.svg'),
  objects: [
    {
      type: 'text',
      content: 'Selamat Ulang Tahun!',
      left: 50,
      top: 100,
      fontSize: 48,
      fontFamily: 'Arial',
      fill: '#0B1F3A',
      textAlign: 'center',
      width: 300,
      height: 100,
    },
  ],
  canvasWidth: 375,
  canvasHeight: 500,
  whatsappMessage:
    'Selamat Ulang Tahun! 🎉 Semoga hari istimewamu penuh dengan kebahagiaan dan berkah.',
}
