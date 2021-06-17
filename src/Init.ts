import { autoInjectable } from 'tsyringe'
import shell from 'shelljs'
import yargs from 'yargs'
import Packages from './services/packages'
import Modules from './services/modules'
import Generate from './services/generate'
import Features from './services/features'
import Message from './helpers/message'

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
    console.log(new Message('info', 'Welcome to the CLI').toMessage())
    this.options = yargs
      .usage('Usage: -d <path/to/project/directory>')
      .option('d', { alias: 'dir', describe: 'Directory to which the project needs to be created', type: 'string', demandOption: true })
      .argv
    try {
      await this.modules.ask()
      await this.packages.list()
      await this.features.list()
      console.log(this.generate.packageJson()) // generated details
      console.log(new Message('info', 'Generating project').toMessage(false))
      await this.createProject()
      console.log(new Message('success', 'Project is ready').toMessage(false))
      // modifying the project
      console.log(new Message('info', 'Thank you for using the CLI').toMessage())
    } catch (e) {
      console.log(new Message('error', e ? 'Something wrong happened' : 'Cancelled by user').toMessage(false))
      console.error(e)
    }
  }

  // private executeCommand (command: string): Promise<string> {
  //   return new Promise((resolve, reject) => {
  //     exec(command, (err, out, outerr) => {
  //       if (err || outerr) return reject(err || outerr)
  //       resolve(out)
  //     })
  //   })
  // }

  private createProject (): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      const path: string = `${this.options.dir}`
      shell.mkdir('-p', path) // create the project directory
      shell.cd(path)
      console.log('Cloning base repository')
      shell.exec(`git clone https://github.com/WathiqProject/fm-fe-core.git "${this.modules.name}"`)
      shell.cd(`${path}/${this.modules.name}`)
      shell.exec(`yarn`)
      console.log('Base repository is ready')
      resolve(true)
    })
  }

}
