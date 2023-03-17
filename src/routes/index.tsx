import { component$, useSignal, useTask$ } from '@builder.io/qwik'
import type { DocumentHead } from '@builder.io/qwik-city'
import { server$ } from '@builder.io/qwik-city'
import Hero from '~/components/starter/hero/hero'
import Contenido from '../routes/contenido.md'
import { clickExport, clickFetch, clickSearch } from './apis'

export interface Item {
  Poster: string
  Title: string
  Type: string
  Year: string
  imdbID: string
}

export default component$(() => {
  const count = useSignal(1)
  const lista = useSignal<Item[]>([])
  const search = useSignal('avengers')
  // manual fetch
  useTask$(async ({ track }) => {
    track(() => search.value) // track changes to search
    // track(search)
    // const data = await getMovies(search.value)
    const data = await clickFetch(search.value)
    console.log(data)
    lista.value = data || []
    // lista.value = await getMovies(search.value)
  })
  // auto fetch
  // useComputed$(async () => {
  //   const data = await clickFetch(search)
  //   data?.Search && (lista.value = data.Search)
  // })

  return (
    <>
      <Hero />
      <div class="container center gap-y-5 grid -mt-36">
        <h3>
          <Contenido />
        </h3>
        <section>
          <h2>Fetch</h2>
          <input
            type="text"
            name="search"
            onInput$={(_, el) => {
              search.value = el.value
            }}
          />
          {/* <p>{JSON.stringify(lista.value, null, 2)}</p> */}
          <p>Resultados para: {search.value}</p>
          <ul class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {lista.value.map((item) => (
              <li key={item.imdbID} class="grid place-items-center gap-5">
                <span class="text-3xl">{item.Title}</span>
                <img width={80} src={item.Poster} alt={item.Poster} />
                <div>
                  <span>{item.Year}</span> <span>{item.Type}</span>
                </div>
              </li>
            ))}
          </ul>
          <button
            onClick$={async () => {
              const search = await clickSearch('search')
              console.log(search)
            }}
          >
            Search Server
          </button>
        </section>
        <section>
          <button
            class={{ par: count.value % 2 === 0, impar: count.value % 2 === 1 }}
            onClick$={() => {
              console.log('click')
              count.value++
            }}
          >
            Click {count.value}
          </button>
          <button onClick$={async () => (await click(count)) && count.value++}>
            Server
          </button>
          <button
            onClick$={async () => (count.value = await clickExport(count))}
          >
            Export Server
          </button>
          <button
            onClick$={async () => {
              const search = await clickSearch('search')
              console.log(search)
            }}
          >
            Search Server
          </button>
        </section>
      </div>
    </>
  )
})

export const head: DocumentHead = {
  title: 'Welcome to Qwik',
  meta: [
    {
      name: 'description',
      content: 'Qwik site description',
    },
  ],
}

const click = server$((count) => {
  console.log(count.value)
  console.log('click actualizado')
  return true
})

export const getMovies = server$(async (search: string) => {
  console.log('Task', search)
  if (!search) return
  const url = new URL('https://omdbapi.com/')
  url.searchParams.set('s', search)
  url.searchParams.set('apikey', '3067b2f9')
  const res = await fetch(url)
  const data = await res.json()
  const list = data.Search as Item[]
  return list ?? []
})
