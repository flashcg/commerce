export default async ({store,$content, route, redirect}) => {    
    
    let breadcrumbs
    if(route.path){
        breadcrumbs = await $content("pages"+route.path.slice(0,-1), { deep: true }).only(['breadcrumb']).fetch();
        if(Array.isArray(breadcrumbs)){
            breadcrumbs = await $content("pages"+route.path.slice(0,-1)+'/index', { deep: true }).only(['breadcrumb']).fetch();
        }
    }
    // if(route.params.slug) route.name = route.params.slug
    route.matched.forEach( (item, index) => {

        

        item.meta.title = breadcrumbs.breadcrumb;

    })
    console.log(route);
}