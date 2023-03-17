import { component$ } from '@builder.io/qwik'
import type { DocumentHead } from '@builder.io/qwik-city'
import { Movies } from '~/components/movies/movies'
import Hero from '~/components/starter/hero/hero'

export default component$(() => {
  return (
    <>
      <Hero />
      <Movies />
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
