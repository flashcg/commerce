<template>
<div v-if="youtubeData">

    <b-img v-if="template=='thumbnail'" :title="youtubeData.snippet.title" :src="youtubeData.snippet.thumbnails.standard?youtubeData.snippet.thumbnails.standard.url:youtubeData.snippet.thumbnails.high.url" fluid />
        <span v-else>{{youtubeData.snippet.title}}</span>
</div>
</template>
 
<script>
import { mapMutations } from "vuex";
export default {
  name: "get-youtube",
  props: ["id", "template"],
  data() {
    return {
      youtubeData: null
    };
  },

  methods: {
    ...mapMutations({
      youtubeDataPush: "youtubeDataPush",
      youtubeDataToState: "youtubeDataToState"
    }),
    getData() {
      let { data } = this.$axios
        .get("https://www.googleapis.com/youtube/v3/videos", {
          params: { part: "snippet", id: this.id ,key:'AIzaSyC65Fj-6x4PIryik9EjLxBQyy_EfgwrV-g' }
        })
        .then(res => {
          this.youtubeData = res.data.items[0];
          this.youtubeDataToState(this.youtubeData);
          localStorage.youtubeData = JSON.stringify(
            this.$store.state.youtubeData
          );
          console.log("youtube data has been loaded");
          
        });
    },

    findFromStorage(id) {
      let outData = JSON.parse(localStorage.youtubeData).find(
        res => res.id == id
      )
      return outData;
    }
  },
  mounted() {

    if (localStorage.youtubeData) {
      this.youtubeDataPush();
    }

    if (
      localStorage.youtubeData &&
      JSON.parse(localStorage.youtubeData).length > 0 &&
      this.findFromStorage(this.id)
    ) {
      this.youtubeData = this.findFromStorage(this.id);
    } else {
      this.getData();
    }
  }
};
</script>