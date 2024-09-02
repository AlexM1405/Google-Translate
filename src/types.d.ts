import { Auto_Language, Supported_Languages } from "./const"

export type Language = keyof typeof Supported_Languages
export type AUTOlanguage = typeof Auto_Language
export type FromLanguage = Language | AUTOlanguage


export interface State  {
  fromLanguage: FromLanguage
  toLanguage: Language
  fromText: string
  result: string
  loading: boolean
}

export type Action =
  | { type: 'SET_FROM_LANGUAGE', payload: FromLanguage}
  | { type: 'INTERCHANGE_LANGUAGES' }
  | { type: 'SET_TO_LANGUAGE', payload: Language }
  | { type: 'SET_FROM_TEXT', payload: string }
  | { type: 'SET_RESULT', payload: string }

  export enum SectionType {
    From = 'from',
    To = 'to'
  }
