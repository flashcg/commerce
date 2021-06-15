export default  ({
    route,
    query,
    error,
    redirect
  })=> {

/*     if (route.path.search('/dvd-cloner/articles/') === 0) {
      route.path= route.path.replace('articles/','')
      return redirect({path:route.path,query})
    } */
    if (route.path.slice(-1) != '/') {
        route.path = route.path+'/'
        return redirect({path:route.path,query})
    }  
      

  }