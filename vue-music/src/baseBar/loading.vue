<template>
    <div class="loading" ref="loading">
        <img src="../assets/img/ing.gif">
        <p>{{title}}</p>
    </div>
</template>

<script>
export default {
    props: {
        title:{
            type: String,
            default: '正在加载.....'
        },
        
    },
    mounted(){
        this.top()
    },
    methods: {
        top(){
            // this.$refs.loading.style.marginTop = this.marginTop
        }
    }
}
</script>
<style lang="less" scoped>
    .loading{
        width: 100%;
        z-index: 4;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        // margin-top: 44%;
        img{
            width: 10vw;
            height: 10vw;
        }
    }
</style>


