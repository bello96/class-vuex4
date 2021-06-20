<template>
  <p>取值：{{ num }}</p>
  <p>$store取值：{{ $store.state.count }}</p>
  <p>getters双倍值：{{ double }}</p>

  <button @click="add">同步修改+2</button>
  <button @click="asyncAdd">异步修改+3</button>
</template>

<script>
import { computed } from "vue";
import { useStore } from "@/calssvuex";

export default {
  name: "App",
  setup() {
    const store = useStore();
    function add() {
      store.commit("add", 2);
    }
    function asyncAdd() {
      store.dispatch("asyncAdd", 3);
    }
    return {
      num: computed(() => store.state.count),
      double: computed(() => store.getters.double),
      add,
      asyncAdd,
    };
  },
};
</script>

<style></style>
