import { singleton } from 'tsyringe'
import Enquirer from 'enquirer'

@singleton()
export default class Packages {

  private packageList: { name: string; path: string; }[] = []
  private selections: { name: string; path: string; }[] = []

  constructor () {
    this.packageList = [
      { name: 'axios', path: 'https://github.com/riyaz/axios' },
      { name: 'vuex', path: 'vuex' },
      { name: 'vue-router', path: 'vue-router' },
      { name: 'tsc', path: 'tsc' },
      { name: 'typescript', path: 'typescript' }
    ]
  }

  get details () {
    return this.selections
  }

  list (): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const prompt = new (Enquirer as any).MultiSelect({
        name: 'package',
        message: 'Choose the packages that you need for the module',
        limit: 7,
        choices: this.packageList.map(p => {
          return {
            name: p.name,
            value: p
          }
        })
      })
      prompt.run()
        .then(selections => {
          this.selections = this.packageList.filter(m => selections.includes(m.name))
          resolve(true)
        })
        .catch(reject)
    })
  }

}
