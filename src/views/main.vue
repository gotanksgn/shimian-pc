<template>
<div>
    <div>{{username}}</div>
    <div v-for="(item, index) in list" :key="index">
        {{item}}
    </div>
</div>
</template>

<script>
import { mapState } from 'vuex'
export default{
    computed:{
        ...mapState('data', ['username', 'list']),
    },
}
</script>

<style>
</style>
