export interface Template {
  id: string
  name: string
  description: string
  thumbnail: string
  backgroundImage: string
  objects: TemplateObject[]
  canvasWidth: number
  canvasHeight: number
  whatsappMessage: string
}

export interface TemplateObject {
  type: 'text' | 'image'
  content?: string
  left: number
  top: number
  fontSize?: number
  fontFamily?: string
  fill?: string
  textAlign?: string
  width: number
  height: number
  src?: string
}
