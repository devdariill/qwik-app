import { component$, useSignal } from '@builder.io/qwik'
import type { DocumentHead } from '@builder.io/qwik-city'
import { server$ } from '@builder.io/qwik-city'
import Hero from '~/components/starter/hero/hero'
import Contenido from '../routes/contenido.md'
import { clickExport, clickSearch } from './apis'
export default component$(() => {
  const count = useSignal(1)
  return (
    <>
      <Hero />
      <div class="container center gap-y-5 grid -mt-36">
        <h3>
          <Contenido />
        </h3>
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
        <button onClick$={async () => (count.value = await clickExport(count))}>
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
