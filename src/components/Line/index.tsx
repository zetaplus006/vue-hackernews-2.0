import { Input, VueType } from '@/core';
import { Component } from 'vue-property-decorator';
import * as styles from './style.less';

@Component
export class OneLine extends VueType<{ text: string }> {

  @Input text!: string;

  render() {
    return <p class={[styles.text, styles.light]}>{this.text}</p>;
  }
}
