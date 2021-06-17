import Enquirer from 'enquirer'
import { singleton } from 'tsyringe'

@singleton()
export default class Features {

  private featureList: { name: string; value: string; }[] = []
  private selectedFeatures: { name: string; value: string; }[] = []

  constructor () {
    this.featureList = [
      { name: 'http service', value: 'httpService' },
      { name: 'session service', value: 'sessionService' },
      { name: 'authentication service', value: 'authService' },
    ]
  }

  get details () {
    return this.selectedFeatures
  }

  list (): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const prompt = new (Enquirer as any).MultiSelect({
        name: 'package',
        message: 'Choose the packages that you need for the module',
        limit: 7,
        choices: this.featureList.map(p => {
          return {
            name: p.name,
            value: p
          }
        })
      })
      prompt.run()
        .then(selections => {
          this.selectedFeatures = this.featureList.filter(m => selections.includes(m.name))
          resolve(true)
        })
        .catch(reject)
    })
  }

}
