import chalk from 'chalk'
import boxen from 'boxen'

export enum MessageType {
  SUCCESS = 'success',
  ERROR = 'error',
  INFO = 'info'
}

export default class Message {

  private status: boolean = false
  private type: MessageType = MessageType.ERROR
  private message: string = ''

  constructor (type?: MessageType, message?: string) {
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

  setType (type: MessageType): this {
    this.type = type
    return this
  }

  correctStatus (): this {
    switch (this.type) {
      case MessageType.ERROR: return this.setStatus(false)
      case MessageType.INFO: return this.setStatus(true)
      case MessageType.SUCCESS: return this.setStatus(true)
    }
  }

  toMessage (boxened: boolean = true): string {
    let message: string = chalk.white.bold(this.message)
    if (! boxened) {
      switch (this.type) {
        case MessageType.SUCCESS:
          message = chalk.green.bold(this.message)
          break
        case MessageType.ERROR:
          message = chalk.red.bold(this.message)
          break
        case MessageType.INFO:
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
      case MessageType.SUCCESS:
        op.borderColor = 'green'
        break
      case MessageType.ERROR:
        op.borderColor = 'red'
        break
      case MessageType.INFO:
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
