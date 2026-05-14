import { birthdayGreetingTemplate } from './birthday-greeting'
import { birthdayGreeting03Template } from './birthday-greeting-03'
import { birthdayGreetingPremiumTemplate } from './birthday-greeting-premium'

export const TEMPLATES = {
  'birthday-greeting-001': birthdayGreetingTemplate,
  'birthday-greeting-002': birthdayGreetingPremiumTemplate,
  'birthday-greeting-003': birthdayGreeting03Template,
}

export const getTemplate = (templateId: string) => {
  return TEMPLATES[templateId as keyof typeof TEMPLATES]
}

export type { Template, TemplateObject } from './types'
