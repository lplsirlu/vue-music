<template>
    <div class="loading">
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
        }
    }
}
</script>
<style lang="less" scoped>
    .loading{
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 44%;
        img{
            width: 10vw;
            height: 10vw;
        }
    }
</style>


