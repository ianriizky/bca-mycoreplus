import { staticAssets } from '@/static-assets'

import type { Template } from './types'

export const birthdayGreeting03Template: Template = {
  id: 'birthday-greeting-003',
  name: 'Birthday Greeting',
  description: 'Template ucapan selamat ulang tahun dengan background dan text',
  thumbnail: staticAssets('templates/birthday-greeting-thumb-03.jpeg'),
  backgroundImage: staticAssets('templates/birthday-greeting-bg-03.jpeg'),
  objects: [
    {
      type: 'text',
      content: 'Andi Kangnata',
      left: 483,
      top: 655,
      fontSize: 48,
      fontFamily: 'Georgia',
      fill: '#FFFFFF',
      textAlign: 'center',
      width: 400,
      height: 100,
    },
  ],
  canvasWidth: 1203,
  canvasHeight: 843,
  whatsappMessage: `Warmest birthday wishes to Bapak Andi Kangnata / Ko Fukang 🎉

May your special day be filled with joy, good health, and continued success. It is truly a pleasure to serve you, and we sincerely appreciate you as one of our most loyal and valued customers.

Wishing you a wonderful year ahead filled with prosperity, happiness, and many meaningful moments.

Cheers to your continued success and happiness 🥂`,
}
