import { PluginClient } from '@remixproject/plugin'
import { createClient } from '@remixproject/plugin-webview'
import EventEmitter from 'events'

export class RemixClient extends PluginClient {
    eventEmitter: EventEmitter
    constructor() {
        super()
        this.eventEmitter = new EventEmitter()
        this.methods = []
        createClient(this)
        this.onload(() => {
            console.log('client loaded')
        })
    }

}