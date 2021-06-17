import { autoInjectable } from 'tsyringe'
import Packages from './packages'

@autoInjectable()
export default class Init {

  constructor (
    private packages?: Packages
  ) {
    this.start()
  }

  start () {
    this.packages.list()
  }

}
