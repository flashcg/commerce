<template>
    <div id="sic-banner" class="bigdata-analytics-banner py-lg-8 py-6">
            <div class="container position-relative" style="z-index:3">
                <div class="bigdata-analytics-content text-white">
                    <h1>{{data.title}} </h1>
                    <p class="lead">{{data.subtitle}}</p>
                    <p>{{data.text}}</p>
                    <b-link v-if="data.button&&data.button.path" :to="data.button.path+'/'" class="btn btn-primary btn-xl">{{data.button.text}} </b-link>
                </div>
            </div>
            <div v-if="data.background" class="position-absolute fill-position"  :style="{background:`url(${data.background.imageUrl}) 0% 0% /cover no-repeat`}"></div>
            <div class="banner-boxes-area mt-md-10 mt-4 mb-md-4 mb-0">
                <div class="container">
                    <div v-if="data.feature" class="row">
                        <div  :class="`col-lg-${12/data.feature.iconGird} col-md-${12/data.feature.iconGird*2}`" v-for="(item,index) in data.feature.icons" :key="index">

                            <div class="single-banner-boxes">
                                <div class="icon">
                                    <img :src="item.iconUrl" class="img-fluid" />
                                </div>
                                <h3>{{item.title}}</h3>
                                <p>{{item.text}} </p>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </div>
</template>

<script>
export default {
    name: 'MainBanner',
    props: ['data'],
    methods:{
        colHandle(gird){
            return `col-lg-${gird} col-lg-`
        }
    }
}
</script>
<style lang="scss" scoped>
$light-green-color: #44ce6f;
.bigdata-analytics-banner {
    position: relative;
    &::before{
        content: "";
    position: absolute;
    right: 0;
    width: 100%;
    height: 100%;
    bottom: 0;
    background: linear-gradient(135deg, #801300 0%,  #da8300 100%);
    }
    background: {
        position: center center;
        size: cover;
        repeat: no-repeat;
    };

}

.single-banner-boxes {
    margin-bottom: 30px;
    border: 1px dashed #687b6f;
    position: relative;
    border-radius: 5px;
    padding: 25px 25px 25px 95px;
    background-color: rgba(0, 0, 0, .50);
    transition: .3;
    z-index: 1;

    &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        border-radius: 5px;
        background: linear-gradient(135deg, #23bdb8 0%, #43e794 100%);
        z-index: -1;
        opacity: 0;
        margin: -1px;
        visibility: hidden;
        transition: .3;
    }
    .icon {
        display: inline-block;
        text-align: center;
        width: 55px;
        height: 55px;
        position: absolute;
        left: 20px;
        top: 25px;
        background: #cdf1d8;
        border-radius: 50%;
        transition: .3;
    }
    h3 {
        color: white;
        margin-bottom: 12px;
        font: {
            size: 18px;
            weight: 600;
        };
    }
    p {
        color: #dadada;
        transition: .3;
    }
    &:hover {
        background-color: transparent;
        border-color: transparent;

        .icon {
            color: $light-green-color;
            background-color: white;
        }
        &::before {
            opacity: 1;
            visibility: visible;
        }
        p {
            color: white;
        }
    }
}
</style>