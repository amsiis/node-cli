import { prompt } from 'enquirer'
import { singleton } from 'tsyringe'

@singleton()
export default class Modules {

  private moduleInformation!: any

  constructor () {
  }

  get details () {
    return this.moduleInformation
  }

  private versionCheck (val: string): string|boolean {
    if (/^[\d]+\.+[\d]+\.+[\d]+/.test(val)) return true
    return 'Invalid version specification'
  }

  ask (): Promise<boolean> {
    return new Promise((resolve, reject) => {
      prompt([
        {
          name: 'name',
          type: 'input',
          message: 'Provide the package name for your module',
          validate: val => !!val || 'Please input a module name'
        },
        {
          name: 'version',
          type: 'input',
          message: 'version for your package',
          initial: '1.0.0',
          validate: val => this.versionCheck(val)
        },
        {
          name: 'description',
          type: 'input',
          message: 'Provide a description for your module'
        },
        {
          name: 'github',
          type: 'input',
          message: 'Provide project repository'
        }
      ])
      .then(info => {
        this.moduleInformation
        resolve(true)
      })
      .catch(reject)
    })
  }

}
