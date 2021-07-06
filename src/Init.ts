import { autoInjectable } from 'tsyringe'
import shell from 'shelljs'
import yargs from 'yargs'
import fs from 'fs'
import Packages from './services/packages'
import Modules from './services/modules'
import Generate from './services/generate'
import Features from './services/features'
import Message, { MessageType } from './helpers/message'
import PackageGenerator from './generator/package'

@autoInjectable()
export default class Init {

  private options: any

  constructor (
    private packages?: Packages,
    private modules?: Modules,
    private generate?: Generate,
    private features?: Features
  ) {
    this.start()
  }

  async start () {
    console.log(new Message(MessageType.INFO, 'Welcome to the CLI').toMessage())
    this.options = yargs
      .usage('Usage: -d <path/to/project/directory>')
      .option('d', { alias: 'dir', describe: 'Directory to which the project needs to be created', type: 'string', demandOption: true })
      .argv
    try {
      await this.modules.ask()
      await this.packages.list()
      await this.features.list()
      console.log(new Message(MessageType.INFO, 'Generating project').toMessage(false))
      await this.createProject()
      // generate the package.json
      new PackageGenerator()
        .setDir(`${this.options.dir}/${this.modules.name}/`)
        .start()

      console.log(new Message(MessageType.SUCCESS, 'Project is ready').toMessage(false))
      // modifying the project
      console.log(new Message(MessageType.INFO, 'Thank you for using the CLI').toMessage())
    } catch (e) {
      console.log(new Message(MessageType.ERROR, e ? 'Something wrong happened' : 'Cancelled by user').toMessage(false))
      console.error(e)
    }
  }

  private createProject (): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      const path: string = `${this.options.dir}`
      shell.mkdir('-p', path) // create the project directory
      shell.cd(path)
      console.log('Cloning base repository')
      shell.exec(`git clone https://github.com/WathiqProject/fm-fe-core.git "${this.modules.name}"`)
      console.log('Base repository is ready')
      resolve(true)
    })
  }

}
