import { VueType, Input } from "../core";
import { Component, Prop } from "vue-property-decorator";
import * as styles from './Line.less'

@Component
export class OneLine extends VueType<{ text: string }> {

  @Input
  text: string

  render() {
    return <p class={[styles.text, styles.light]}>{this.text}</p>
  }
}