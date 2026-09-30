import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

/** Answers from the dev-only design portal (/design). Committed so decisions are on record. */
export type DesignChoices = {
  answers: Record<string, { picks: string[]; note: string }>
  extra: string
  savedAt?: string
}

const file = path.join(process.cwd(), 'docs/design/choices.json')

export async function readDesignChoices(): Promise<DesignChoices> {
  try {
    return JSON.parse(await readFile(file, 'utf8')) as DesignChoices
  } catch {
    return { answers: {}, extra: '' }
  }
}

export async function writeDesignChoices(choices: DesignChoices) {
  await mkdir(path.dirname(file), { recursive: true })
  const data: DesignChoices = { ...choices, savedAt: new Date().toISOString() }
  await writeFile(file, JSON.stringify(data, null, 2) + '\n')
  return data
}
