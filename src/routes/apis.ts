import { server$ } from '@builder.io/qwik-city'
export interface Item {
  Poster: string
  Title: string
  Type: string
  Year: string
  imdbID: string
}
export const clickExport = server$((count) => {
  console.log('click export')
  const tempCount = count.value + 1
  console.log('tempCount', tempCount)
  return tempCount
})

export const clickSearch = server$((search) => {
  console.log('tempCount', search)
  return new Date()
})

export const clickFetch = server$(async (search) => {
  console.log('Task', search)
  if (!search) return
  console.log('entro')
  const url = new URL('https://omdbapi.com/')
  url.searchParams.set('s', search)
  url.searchParams.set('apikey', '3067b2f9')
  console.log(url)
  //   const URL = `http://omdbapi.com/?s=${search.value}&apikey=3067b2f9`
  const res = await fetch(url)
  const data = await res.json()
  const list = data.Search as Item[]
  return list ?? []
})
