import { server$ } from '@builder.io/qwik-city'

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
