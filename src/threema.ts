import axios, { AxiosRequestConfig } from 'axios';
import assert from 'assert';
import qs from 'querystring';

export class ThreemaConnector {

  /**
   * @param {string[]} toIds - List of Threema-Ids receiving the notification
   * @param {string} fromId - ThreemaId sending the notification
   * @param {string} apiSecret - Threema Gateway Api Secret corresponds to the sender
   */
  constructor(private toIds: string[], private fromId: string, private apiSecret: string) {
    assert.ok(this.toIds, "please pass parameter toIds:string[]");
    assert.ok(this.toIds.length > 0, "parameter 'toIds:string[]' must not be empty");
    assert.ok(this.fromId, 'please pass parameter fromId:string');
    assert.ok(this.apiSecret, 'please pass parameter apiSecret:string');
  }

  async sendMessage(message: string) {
    this.toIds.forEach(id => this.sendMessageToId(message, id));
  }

  private sendMessageToId(message: string, toId: string) {
    const data = {
      from: this.fromId,
      to: toId,
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
