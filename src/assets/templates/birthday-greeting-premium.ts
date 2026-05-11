import type { Template } from './types'

export const birthdayGreetingPremiumTemplate: Template = {
  id: 'birthday-greeting-002',
  name: 'Premium Birthday Greeting',
  description:
    'Template ucapan selamat ulang tahun premium dengan pesan formal untuk valued customers',
  thumbnail: '/templates/birthday-greeting-thumb-02.jpeg',
  backgroundImage: '/templates/birthday-greeting-bg-02.png',
  objects: [
    {
      type: 'text',
      content: `Warmest birthday wishes to Bapak / Ibu / Koko / Cece 🎉

May your special day be filled with joy, good health, and continued success. It is truly a pleasure to serve you, and we sincerely appreciate you as one of our most loyal and valued customers.

Wishing you a wonderful year ahead filled with prosperity, happiness, and many meaningful moments.

Cheers to your continued success and happiness 🥂`,
      left: 50,
      top: 50,
      fontSize: 14,
      fontFamily: 'Arial',
      fill: '#FFFFFF',
      textAlign: 'left',
      width: 300,
      height: 80,
    },
  ],
  canvasWidth: 375,
  canvasHeight: 500,
  whatsappMessage: `Warmest birthday wishes to Bapak / Ibu / Koko / Cece 🎉

May your special day be filled with joy, good health, and continued success. It is truly a pleasure to serve you, and we sincerely appreciate you as one of our most loyal and valued customers.

Wishing you a wonderful year ahead filled with prosperity, happiness, and many meaningful moments.

Cheers to your continued success and happiness 🥂`,
}
