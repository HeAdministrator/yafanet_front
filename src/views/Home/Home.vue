<template>
    <div>
        <!--首页轮播图-->
        <home-banner :banners="banners"></home-banner>

        <video-list :videoList="videoList"></video-list>

        <component-footer></component-footer>
    </div>
</template>

<script>

import HomeBanner from './Component/Banner'
import VideoList from './Component/VideoList'
import ComponentFooter from '@/components/CommonFooter'
import  { getBanner, getVideoList } from '@/api/getData.js'
export default {
    
    //注册组件
    components:{
        HomeBanner,
        VideoList,
        ComponentFooter
    },
    //声明的数据源
    data(){
        return {
            banners:[],
            videoList:[]
        }
    },
    methods:{

        //获取轮播图数据
        async getBannerData(){
            try{      
            
            const result = await getBanner();

            if(result.data.code == 0){
                this.banners = result.data.data;
            }

            }catch(error){
                console.log(error)
            }


        },

        //获取视频列表
        async getVideosList(){

            try{
                
                const result = await getVideoList();
                if(result.data.code ==0){
                    this.videoList = result.data.data
                }
            }catch(error){
                console.log(error)
            }

        }
    },
    mounted(){
        //页面渲染完成调用方法获取数据
        this.getBannerData();
        this.getVideosList();
    }

}
</script>

<style lang="scss" scoped>
</style>