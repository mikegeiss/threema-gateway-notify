import assert from 'assert';
import axios, { AxiosRequestConfig } from 'axios';
import qs from 'querystring';

export class ThreemaConnector {
  toIds: string[];
  fromId: string;
  apiSecret: string;

  // todo nicht mit context sondern konkreten params arbeiten
  // todo assertions nicht hier machen?
  constructor(context: any) {
    assert.ok(context.secrets.THREEMA_TO_IDS, 'Parameter "THREEMA_TO_IDS" wurde nicht gesetzt.');
    assert.ok(context.secrets.THREEMA_FROM_ID, 'Parameter "THREEMA_FROM_ID" wurde nicht gesetzt.');
    assert.ok(context.secrets.THREEMA_API_SECRET, 'Parameter "THREEMA_API_SECRET" wurde nicht gesetzt.');
    this.toIds = context.secrets.THREEMA_TO_IDS.split(',');
    this.fromId = context.secrets.THREEMA_FROM_ID;
    this.apiSecret = context.secrets.THREEMA_API_SECRET;
  }

  async sendMessage(message: string) {
    console.log('send to Threema');
    this.toIds.forEach(id => this.sendMessageToId(message, id));
  }

  private sendMessageToId(message: string, toId: string) {
    const data = {
      from: this.fromId,
      to: this.toIds,
      text: message,
      secret: this.apiSecret
    };
    const config: AxiosRequestConfig = {
      url: 'https://msgapi.threema.ch/send_simple',
      method: 'post',
      headers: { 'content-type': 'application/x-www-form-urlencoded;charset=utf-8' },
      data: qs.stringify(data)
    };
    return axios(config);
  }
}
