import { component$ } from '@builder.io/qwik'
import type { DocumentHead } from '@builder.io/qwik-city'
import Hero from '~/components/starter/hero/hero'
import Contenido from '../routes/contenido.md'
export default component$(() => {
  return (
    <>
      <Hero />
      <div class='section'>
        <div class='container center'>
          <h3>
            <Contenido />
          </h3>
        </div>
      </div>

    </>
  )
})

export const head: DocumentHead = {
  title: 'Welcome to Qwik',
  meta: [
    {
      name: 'description',
      content: 'Qwik site description'
    }
  ]
}
