
export default async ({store,$content, route, redirect}) => {
    let breadcrumbs = await $content("pages", { deep: true }).only(['breadcrumb']).fetch();
    //console.log(route.matched);
    route.matched.forEach((item, index) => {
        console.log(item);
        item.meta.title = route.meta[index].title || '';
    })
}