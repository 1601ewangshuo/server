<template>
   <div class="letter" 
   @touchstart="touchStart"
   @touchmove="touchMove">
        <span v-for="(item, index) in navlist" :key="index" @click="clickscroll(index)">{{item}}</span>
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
    navlist:{
      type:Array
    },
    scrollTop:{
      type:Function
    },
        clickscroll:{
            type:Function
        }
  },
  methods:{
    touchStart(){
      this.height = window.innerWidth/750*100*0.4;
      this.offsetTop = (window.innerHeight-this.height*this.navlist.length)/2;
    },
    touchMove(e){
     let touch = e.touches[0];
     let index = parseInt((touch.pageY-this.offsetTop)/this.navlist.length);
     if(index<0){
       index=0;
     }else if(index>this.navlist.length-1){
       index=this.navlist.length-1;
       
     }
     this.scrollTop(this.navlist[index])
       
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
@import "../../scss/_letter.scss";
</style>
