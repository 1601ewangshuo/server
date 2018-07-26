import {getBrandList} from "../../api/index";
const state = {
    letter: [],
    brandList: [],
    masterList: [],
    masterCls: ''
}
const mutations = {
    updateBrandList: (state, payload)=>{
        state.brandList = payload.brandList;
    },
    updateLetter: (state, payload)=>{
        state.letter = payload.letter;
    }
}
const actions ={
    getbandlist: ({commit}, payload)=>{
        getBrandList().then(res=>{
            res.json().then(data=>{
                console.log(data);
                let letter = [];
                let brandList=[];
                data.data.forEach((item)=>{
                  item.spelling=item.Spelling[0]
                    
                })
               data.data.forEach((item)=>{
                    if(letter.indexOf(item.spelling)===-1){
                        letter.push(item.spelling)
                    }
               })
               letter.forEach((item)=>{
                 let obj ={
                   title:item,
                   list:[]
                 }
                 data.data.forEach((val)=>{
                     if(obj.title==val.spelling){
                       obj.list.push(val)
                     }
                 })
                 brandList.push(obj)
               })
               
              
               letter.unshift("#")
               commit('updateBrandList', {brandList});
               commit('updateLetter', {letter});
            })
        })
  }
}

export default {
    namespaced : true,
    state,
    actions,
    mutations
}