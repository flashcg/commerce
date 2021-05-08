export default  ({store,$content, route, redirect}) => {    

    route.matched.forEach(async (item, index) => {
        let breadcrumbs = await $content("pages"+item.path.slice(0,-1), { deep: true }).only(['breadcrumb']).fetch();

        if(Array.isArray(breadcrumbs)){
            breadcrumbs = await $content("pages"+item.path.slice(0,-1)+'/index', { deep: true }).only(['breadcrumb']).fetch();
        }

        item.meta.title = breadcrumbs.breadcrumb;

    })
}