<template>

        <div class="car-img">
            <div class="flex-row tit">
                <p data-hover="hover"><span>颜色</span></p> <p data-hover="hover"><span><em>车款</em></span></p>
            </div> 
             <div class="img-list">
                <ul v-for="(item, index) in list" :key="index">
                    <li v-for="(value, key) in item.List" :key="key">
                        <span :style="{'backgroundImage': `url(${value.Url.replace('{0}', value.LowSize)})`}"></span>
                        <p v-if="!key" @click="clickAll(item.Id)">
                            <span>{{item.Name}}</span>
                            <span>{{item.Count}}张></span>
                        </p>
                    </li>
                </ul>
            </div>
            <div class="img-detail" v-if="showDetail" @scroll="scrollAll">
                 <ul ref="ul">
                 <li v-for="(value, key) in categoryList" :key="key">
                    <span @click="clickSwiper(key)" :style="{'backgroundImage': `url(${value.Url.replace('{0}', value.LowSize)})`}"></span>
                </li>
                </ul>
            </div>
            <div v-show="isShowSwiper" class="img-swiper" @click="hideSwiper">
                <swiper  ref="mySwiper">
            
                <swiper-slide v-for="(item, index) in categoryList" :key="index">
                    <img :src="item.Url.replace('{0}', item.HighSize)">
                </swiper-slide>

          
                <div class="swiper-pagination"  slot="pagination"></div>
                
            </swiper>
            </div>
        </div>    
  
</template>
<script>
import 'swiper/dist/css/swiper.css';
import { swiper, swiperSlide } from 'vue-awesome-swiper';
    export default {
        data(){
            return {
             id:null,
             list:[],
             categoryList:[],
             showDetail:false,
             page:1,
             imgid:null,
             isShowSwiper:false
            }
        },
        computed:{
            
        swipe() {
            return this.$refs.mySwiper.swiper
        }
        }
        ,
        methods:{
         init(){
             this.id = this.$route.query.id
             fetch("https://baojia.chelun.com/v2-car-getImageList.html?SerialID="+this.id).then(res=>{
                 res.json().then(body=>{
                    this.list= body.data 
                    console.log(body)
                    
                 })
             })
         },
         getimg(ind){
             fetch(`https://baojia.chelun.com/v2-car-getCategoryImageList.html?SerialID=${this.id}&ImageID=${ind}&Page=${this.page}&PageSize=30`)
             .then(res=>{
             return res.json()
            })
            .then(body=>{
                console.log('category...', body);
                
                if (body.code == 1){
                   this.categoryList=body.data.List;
                   return this.categoryList
                }else{
                    alert(body.msg);
                }
            })
         },
         showSwiper(bar){
          this.isShowSwiper = bar;
         },
         clickAll(ind){
           this.showDetail = true;
           this.imgid = ind;
           this.getimg(this.imgid)
             
         },
         clickSwiper(ind){
         this.showSwiper(true);
         this.swipe.slideTo(ind);
         },
         scrollAll(e){
              if (this.fetchingAll){
                return;
            }
            let scrollHeight = this.$refs.ul.getBoundingClientRect().height - window.innerHeight;
            let current = e.target.scrollTop;
            console.log('current...', current, scrollHeight);
            if (current > (scrollHeight-20)){
                // 加载下一页数据
                this.page++;
                this.fetchingAll = true;
                 const imglist = this.getimg(this.imgid)
                this.categoryList.concat(imglist)
                 this.fetchingAll = false;
            }
           
         },
         hideSwiper(e){
            if (e.target == e.currentTarget){
                this.showSwiper(false);
            }
        }
         
           
        },
        components: {
          swiper,
           swiperSlide
        },
        mounted(){
            this.init()
        }
    }
</script>
<style lang="scss" scoped>
    .car-img{
        height: 100%;
        background: #f4f4f4;
    }
    .tit{
        position: fixed;
        background: #fff;
        display: flex;
        top: 0;
        width: 100%;
        height: .8rem;
        -webkit-box-align: center;
        align-items: center;
        box-sizing: border-box;
        // z-index: 99;
      p {
            -webkit-box-flex: 1;
            flex: 1;
            text-align: center;
            box-sizing: border-box;
            color: #454545;
            display: inline-block;
         }
         p:nth-child(2) {
         border-left: 1px solid #ececec;
      }
    p span {
    max-width: 2.6rem;
    display: inline-block;
    vertical-align: middle;
    line-height: 1.25;
    font-size: .28rem;
}

    }
    .img-list{
        overflow: hidden;
        position: absolute;
        background: #fff;
        top: .98rem;
        bottom: 0;
        overflow-y: scroll;
        -webkit-overflow-scrolling: touch;
        border-bottom: .4rem solid #f4f4f4;
    }
    ul{
        margin-bottom: .1rem;
        overflow: hidden;
        position: relative;
        p{
            position: absolute;
            top: 0;
            width: 100%;
            height: 100%;
            text-align: center;
            background: rgba(56,90,130,.5);
            span{
                font-size: .28rem;
                margin-top: .8rem;
                color: #fff;
                display: block;
            }
            span:nth-child(2){
                font-size: .26rem;
                margin-top: .2rem;
            }
        }
    }
    li{
        position: relative;
        float: left;
        margin-right: .06rem;
        width: 2.46rem;
        height: 2.46rem;
        padding: 0;
        margin-bottom: .06rem;
        list-style: none;
        &>span{
            width: 100%;
            height: 100%;
            background-size: cover;
            display: inline-block;
        }
    }
    li:nth-child(3n+3){
        margin: 0;
    }
    .img-detail{
        overflow: hidden;
        position: absolute;
        background: #fff;
        top: 0;
        bottom: 0;
        width: 100%;
        overflow-y: scroll;
        -webkit-overflow-scrolling: touch;
        ul{
            border-bottom: .4rem solid #f4f4f4;
            margin: 0
        }
    }
    .car-img div.tit p:after {
    content: "";
    display: inline-block;
    padding-top: .16rem;
    padding-right: .16rem;
    border-top: 2px solid #ccc;
    border-right: 2px solid #ccc;
    -webkit-transform: rotate(135deg);
    transform: rotate(135deg);
    margin-left: .2rem;
    vertical-align: 20%;
}
.img-swiper{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,1);
        display: flex;
        align-items: center;
        img{
            width: 100%;
        }
    }
</style>