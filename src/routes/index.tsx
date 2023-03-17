import { $, component$ } from '@builder.io/qwik'
import type { DocumentHead } from '@builder.io/qwik-city'
import { server$ } from '@builder.io/qwik-city'
import { Movies } from '~/components/movies/movies'
import Hero from '~/components/starter/hero/hero'

const api = server$((nu: string, url: URL, date: Date, obj: any) => {
  console.log(nu, url, date, obj)
  return
})

const apiFunction = server$((nu: number) => {
  console.log(nu)
  return {
    nu: nu * 2,
    foo: $(() => {
      console.log('from where')
    }),
  }
})

export default component$(() => {
  return (
    <>
      <div class="grid place-items-center w-full">
        <button
          onClick$={() => {
            // 123123123 : reusing the same string
            const obj: any = { nu: '123123123' }
            obj.self = obj
            api('123123123', new URL('https://google.com'), new Date(), obj)
          }}
        >
          Do Request
        </button>
        <button
          onClick$={async () => {
            const obj: any = { nu: '123123123' }
            obj.self = obj
            const result = await apiFunction(12)
            result.foo()
          }}
        >
          Do Function
        </button>
      </div>
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
