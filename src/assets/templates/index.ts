import { birthdayGreetingTemplate } from './birthday-greeting'
import { birthdayGreetingPremiumTemplate } from './birthday-greeting-premium'

export const TEMPLATES = {
  'birthday-greeting-001': birthdayGreetingTemplate,
  'birthday-greeting-002': birthdayGreetingPremiumTemplate,
}

export const getTemplate = (templateId: string) => {
  return TEMPLATES[templateId as keyof typeof TEMPLATES]
}

export type { Template, TemplateObject } from './types'
