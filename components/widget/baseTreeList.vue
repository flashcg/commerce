<template>
    <li class="nav-item">
        <b-link v-if="datas.href" class="nav-link method-href" :href="datas.href">{{datas.name}}</b-link>
        <b-link v-else-if="datas.path" class="nav-link" :to="'/'+datas.path+'/'">{{datas.name}}</b-link>
        <b-link v-else class="nav-link">{{datas.name}}</b-link>
        <ul v-if="datas.children" class="sub-items">
            <base-tree-list :datas="item" :index="index" v-for="(item,index) in datas.children" :key="index"></base-tree-list>
        </ul>
    </li>
</template>
 
<script>
export default {
  name: 'base-tree-list',
  props: ['datas'],
  data() {
    return {
      isShow: false
    }
  },
  computed: {
    //是否存在子级
    isChildern() {
      return this.datas.children && this.datas.children.length
    }
  },
  created() {},
  methods: {
    showFn() {
      this.isShow = true
    },
    hideFn() {
      this.isShow = false
    }
  }
}
</script>