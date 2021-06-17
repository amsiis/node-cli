import { autoInjectable } from 'tsyringe'
import Packages from './services/packages'
import Modules from './services/modules'
import Generate from './services/generate'
import Features from './services/features'
import Message from './helpers/message'

@autoInjectable()
export default class Init {

  constructor (
    private packages?: Packages,
    private modules?: Modules,
    private generate?: Generate,
    private features?: Features
  ) {
    this.start()
  }

  async start () {
    console.log(new Message('info', 'Welcome to the CLI').toMessage())
    try {
      await this.modules.ask()
      await this.packages.list()
      await this.features.list()
      console.log(this.generate.packageJson()) // generated details
      console.log(new Message('info', 'Thank you for using the CLI').toMessage())
    } catch (e) {
      console.log(new Message('error', e ? 'Something wrong happened' : 'Cancelled by user').toMessage(false))
      console.error(e)
    }
  }

}
