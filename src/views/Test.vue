<template>
  <div>{{text}}</div>
</template>


<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { IUserInfo } from "@/store/UserInfo";


@Component
export default class Header extends Vue {

  @IUserInfo userInfo: IUserInfo;

  text = 'hello'

}
</script>

<style>
.test {
  text-align: center;
  background: coral;
}
</style>
