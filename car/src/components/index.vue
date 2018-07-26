<template>
<div class="box" ref="wrap">
   <router-view></router-view>
   <Nav :navlist="navlist" :scrollTop="scrollTop" :clickscroll="clickscroll"/>
   <List :list="list" :getlist="getlist" />
   <Master :masterlist="masterlist" :active="active" :hidelist="hidelist"/>
</div>
   
</template>

<script>
 import List from "./commom/list.vue";
 import Nav from "./commom/nav.vue";  
 import Master from "./commom/master.vue";
export default {
  data () {
    return {
      navlist: [],
      list:[],
      masterlist:[],
      active:""
    }
  },
  components:{
   Nav,
   List,
   Master
  },
 
  methods:{
   getbandlist(){
       fetch("https://baojia.chelun.com/v2-car-getMasterBrandList.html").then(res=>{
         res.json().then(data=>{
           console.log(data);
           let navlist = [];
           let list=[];
           data.data.forEach((item)=>{
             item.spelling=item.Spelling[0]
               
           })
          data.data.forEach((item)=>{
               if(navlist.indexOf(item.spelling)===-1){
                 navlist.push(item.spelling)
               }
          })
          navlist.forEach((item)=>{
            let obj ={
              title:item,
              list:[]
            }
            data.data.forEach((val)=>{
                if(obj.title==val.spelling){
                  obj.list.push(val)
                }
            })
            list.push(obj)
          })
          
          this.list=list;
          navlist.unshift("#")
          this.navlist=navlist;
         })
       })
   },
   getlist(id){
            fetch('https://baojia.chelun.com/v2-car-getMakeListByMasterBrandId.html?MasterID='+id)
            .then(res=>{
                res.json().then(body=>{
                    console.log('body：', body);
                    if (body.code == 1){
                        this.masterlist = body.data;
                        this.active="active"
                    }else{
                        alert(body.msg);
                    }
                })
            })
        },
        hidelist(){
          this.active=""
        },
        scrollTop(letter){
          if (letter == '#'){
                return;
            }
            let scrollTop = document.querySelector(`#${letter}`).offsetTop;
            console.log(letter, scrollTop);
            this.$refs.wrap.scrollTop = scrollTop;
        },
        clickscroll(ind){
           document.querySelector(".box").scrollTop=document.querySelectorAll(".top")[ind].offsetTop;
        }
  },
   mounted(){
      this.getbandlist();
       
  }
}
</script>


<style scoped>
    .box{
      height: 100%;
      overflow-y: scroll;
    }
</style>
