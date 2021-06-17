import chalk from 'chalk'
import boxen from 'boxen'

export default class Message {

  private status: boolean = false
  private type: 'success'|'error'|'info' = 'error'
  private message: string = ''

  constructor (type?: 'success'|'error'|'info', message?: string) {
    this.type = type || this.type
    this.message = message || this.message
    this.correctStatus()
  }

  setMessage (msg: string): this {
    this.message = msg
    return this
  }

  setStatus (status: boolean): this {
    this.status = status
    return this
  }

  setType (type: 'success'|'error'|'info'): this {
    this.type = type
    return this
  }

  correctStatus (): this {
    switch (this.type) {
      case 'error': return this.setStatus(false)
      case 'info': return this.setStatus(true)
      case 'success': return this.setStatus(true)
    }
  }

  toMessage (boxened: boolean = true): string {
    let message: string = chalk.white.bold(this.message)
    if (! boxened) {
      switch (this.type) {
        case 'success':
          message = chalk.green.bold(this.message)
          break
        case 'error':
          message = chalk.red.bold(this.message)
          break
        case 'info':
          message = chalk.white.bold(this.message)
          break
      }
      return message
    }
    let op: any = {
      padding: 1,
      margin: 1
    }
    switch (this.type) {
      case 'success':
        op.borderColor = 'green'
        break
      case 'error':
        op.borderColor = 'red'
        break
      case 'info':
        op.borderColor = 'white'
        break
    }
    return boxen(message, op as boxen.Options)
  }

  toJSON () {
    return {
      status: this.status,
      type: this.type,
      message: this.message
    }
  }

  toString () {
    return JSON.stringify(this.toJSON())
  }

}
