<template>
    <div ref="master" :class='"master "+active'
    @touchmove.stop="touchMove"
    @touchstart.stop="touchStart"
    @touchend.stop="touchEnd"
    >
      <div v-for="(item,index) in masterlist" :key="index">
          <p class="name">{{item.GroupName}}</p>
          <ul>
             <li v-for="(value, key) in item.GroupList" :key="key" @click="getdital(value.SerialID)">
                    <img v-lazy="value.Picture">
                    <div>
                        <p>{{value.AliasName}}</p>
                        <p>{{value.DealerPrice}}</p>
                    </div>
                </li>
          </ul>
      </div>
    </div>
</template>

<script>
export default {
  
  props:{
    masterlist:{
      type:Array
    },
    active:{
      type:String
    },
    hidelist:{
        type:Function
    }
  },
  mounted(){
      console.log(this.masterlist)
  },
  methods:{
      touchStart(e){
       this.touchs=e.touches[0].pageX
      },
      touchMove(e){
       let pageX= e.touches[0].pageX - this.touchs;
       this.pageX = pageX;
       if(pageX<0){

       }else{
          this.$refs.master.style=`transform:translate3d(${pageX}px,0,0)`
       }
      },
      touchEnd(e){
         this.$refs.master.style=``;
         if (this.pageX<100){
             
            }else{
                this.hidelist();
            }
      },
      getdital(id){
          this.$router.push({path:"/detail?id="+id});
      }
  }
  
}
</script>


<style lang="sass" scoped>
@import "../../scss/_master.scss"
</style>