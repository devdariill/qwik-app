import { component$ } from '@builder.io/qwik'
import type { DocumentHead } from '@builder.io/qwik-city'
import { globalAction$ } from '@builder.io/qwik-city'
import { Form } from '@builder.io/qwik-city'
import { zod$, z } from '@builder.io/qwik-city'

export interface Item {
  Poster: string
  Title: string
  Type: string
  Year: string
  imdbID: string
}

export const useGetMovies = globalAction$(async (values) => {
  const url = new URL('https://omdbapi.com/')
  url.searchParams.set('s', values.search)
  // url.searchParams.set('s', values.search as string)
  url.searchParams.set('apikey', '3067b2f9')
  const res = await fetch(url)
  const data = await res.json()
  const list = data.Search as Item[]
  return { movies: list ?? [] }
}, zod$({ search: z.string() }))

export const Movies = component$(() => {
  const movies = useGetMovies()
  return (
    <>
      <div class="container center gap-y-5 grid -mt-36">
        <section>
          <h2>Fetch</h2>
          <Form action={movies}>
            <input type="text" name="search" required />
            <button type="submit">Search</button>
          </Form>
          <ul class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {movies.value?.movies?.map((item) => (
              <li key={item.imdbID} class="grid place-items-center gap-5">
                <span class="text-3xl">{item.Title}</span>
                <img width={80} src={item.Poster} alt={item.Poster} />
                <div>
                  <span>{item.Year}</span> <span>{item.Type}</span>
                </div>
              </li>
            ))}
          </ul>
          <p>{movies.value?.failed}</p>
          {/* <p>{movies.value?.fieldErrors}</p> */}
          <p>{movies.value?.formErrors}</p>
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
