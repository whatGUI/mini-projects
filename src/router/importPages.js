function importPages(r) {
  const routes = []
  for (const key of r.keys()) {
    if (!key.includes('childComps') && !key.includes('Home')) {
      let [, path, name] = key.split('.')[1].split('/')
      path = '/' + path
      routes.push({
        path,
        name,
        component: () => r(key),
      })
    }
  }
  return routes
}

const pages = importPages(require.context('@/views', true, /\.vue$/, 'lazy'))

export default pages