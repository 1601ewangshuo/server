<template>
    <div class="list">
        <p class="top" id="#"></p>
        <div v-for="(item, index) in list" :key="index" :id="item.title">
            <p class="top">{{item.title}}</p>
            <ul>
                <li v-for="(value, key) in item.list" :key="key" @click="getlist(value.MasterID)">
                    <img v-lazy="value.CoverPhoto">
                    <span>{{value.Name}}</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  props:{
    list:{
      type:Array
    },
    getlist:{
      type:Function,
      default:()=>{}
    }
  }
}
</script>


<style lang="sass" scoped>
@import "../../scss/_list.scss"
</style>
