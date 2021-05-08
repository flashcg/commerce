export default  ({
    route,
    query,
    error,
    redirect
  })=> {
    if (route.path.slice(-1) != '/') {
        route.path = route.path+'/'
        return redirect({path:route.path,query})
    } 
      

  }