import { injectable } from 'tsyringe'
import Enquirer from 'enquirer'

@injectable()
export default class Packages {

  private packageList: { name: string; path: string; }[] = []

  constructor () {
    this.packageList = [
      { name: 'axios', path: 'axios' },
      { name: 'vuex', path: 'vuex' },
      { name: 'vue-router', path: 'vue-router' },
      { name: 'tsc', path: 'tsc' },
      { name: 'typescript', path: 'typescript' }
    ]
  }

  async list () {
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
        console.log(selections)
      })
      .catch(console.error)
  }

}
