<template>
    <div>
        <div>111111111</div>
        <div>111111111</div>
        <div>111111111</div>
        <div>111111111</div>
        <div>111111111</div>
        <div>111111111</div>
        <div>111111111</div>
        <div>111111111</div>
        <div>{{username||'null'}}</div>
        <router-link to="/main">Go to Foo</router-link>
        <div @click="login">login</div>
        <br>
        <br>
        <div @click="changeUsername">change username</div>
        <br>
        <br>
        <div @click="goToMain">go to main</div>
    </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
export default{
    computed:{
        ...mapState('data', ['username']),
    },
    methods: {
        ...mapMutations('data', ['setUsername']),
        ...mapActions('data', ['getList']),
        goToMain(){
            this.$router.push('/main')
        },
        changeUsername(){
            this.setUsername('siguangnan')
        },
        login(){
            this.getList()
            alert("已获取list")
            this.$router.push('/main')
        }
    }
}
</script>

<style>
</style>
