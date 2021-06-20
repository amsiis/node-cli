import { autoInjectable } from 'tsyringe'
import fs from 'fs'
import Generate from '../services/generate'

@autoInjectable()
export default class PackageGenerator {

  private _dir: string = ''
  private _package!: any

  constructor (
    private generate?: Generate
  ) { }

  setDir (dir: string): this {
    this._dir = dir
    const data = fs.readFileSync(`${this._dir}package.json`)
    this._package = JSON.parse(data.toString())
    return this
  }
  
  start () {
    this.applyDependencies()
      .finish()
  }

  finish () {
    fs.writeFileSync(`${this._dir}package.json`, JSON.stringify(this._package, null, 2))
  }

  private applyDependencies (): this {
    const mPackage: any = this.generate.packageJson()
    this._package.dependencies = Object.assign(this._package.dependencies || {}, mPackage.dependencies || {})
    return this
  }

}
