import { AbstractCategoryLogger, RuntimeSettings, Category, CategoryLogMessage } from "typescript-logging"
import { writeFileSync, appendFileSync } from 'fs'

export class CustomLogger extends AbstractCategoryLogger {
    constructor(category: Category, runtimeSettings: RuntimeSettings, private integrityFile: string) {
      super(category, runtimeSettings)
      writeFileSync(integrityFile, '')
    }
  
    private push (msg: string) {
        appendFileSync(this.integrityFile, `${msg}\n`)
    }

    protected doLog(msg: CategoryLogMessage): void {
      this.push(this.createDefaultLogMessage(msg))
    }
  }

export function createCustomLogger (category: Category, runtimeSettings: RuntimeSettings) {
    return new CustomLogger(category, runtimeSettings, 'integrity.log')
}