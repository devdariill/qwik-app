import { component$, useSignal } from '@builder.io/qwik'
import type { DocumentHead } from '@builder.io/qwik-city'
import { server$ } from '@builder.io/qwik-city'
import Hero from '~/components/starter/hero/hero'
import Contenido from '../routes/contenido.md'
export default component$(() => {
  const count = useSignal(0)
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
        <button
          class={{ par: count.value % 2 === 0, impar: count.value % 2 === 1 }}
          onClick$={server$(() => {
            console.log('click')
            count.value++
          })}
        >
          Server {count.value}
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
