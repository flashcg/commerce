

<script>
export default {
  props: { to: [Object, String] ,hash:String},
  data(){
    return{href:'',path:''}
  },
  created() {

    if (this.to && typeof this.to === "string"&&this.hash ) {
      this.path = {path: this.to+'/',hash:this.hash}
    } else if (this.to && typeof this.to === "object") {
      this.path = this.to;
    } else if (this.to && typeof this.to === "string") {
      this.to.slice(0, 4).toLowerCase() === "http"
        ? (this.href = this.to)
        : (this.path = this.to+'/');
    } else {
      this.path = "#";
    }    
  },
  render(h) {
      let dom = this.href?<a class="external" href={this.href}>{this.$scopedSlots.default()} </a> :<nuxt-link to={this.path} class="internal">{this.$scopedSlots.default()} </nuxt-link>
 
      return dom
    }
};
</script>