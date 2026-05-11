import { birthdayGreetingTemplate } from './birthday-greeting'

export const TEMPLATES = {
  'birthday-greeting-001': birthdayGreetingTemplate,
}

export const getTemplate = (templateId: string) => {
  return TEMPLATES[templateId as keyof typeof TEMPLATES]
}

export type { Template, TemplateObject } from './types'
