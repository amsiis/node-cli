import { singleton } from 'tsyringe'
import Modules from './modules'
import Packages from './packages'
import Features from './features'

@singleton()
export default class Generate {

  constructor (
    private packages?: Packages,
    private modules?: Modules,
    private features?: Features,
  ) {}

  applyFeatures () {
    console.log(this.features.details)
  }

  packageJson () {
    const dependencies = {}
    this.packages.details.map(m => {
      dependencies[m.name] = m.path
    })
    return {
      ...this.modules.details,
      dependencies
    }
  }

}
