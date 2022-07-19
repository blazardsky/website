import Head from 'next/head'
import Link from 'next/link'

import {Navbar, Footer, Main, Texture} from '../../components';

import groq from 'groq';
import {client, urlFor} from '@lib/client';
import {getCategoryOutlines} from '@lib/utils'

const query = groq`*[_type == "work" && !(_id in path("drafts.**"))] | order(_updatedAt desc, _createdAt desc)[]{
  mainImage,
  title,
  "slug": slug['current'],
  year,
  "categories": categories[]->title,
  "cliente": client->name,
}`

export async function getStaticProps() {
  const _data = await client.fetch(query)
  return {
    props: {
      _data
    }
  }
}


export default function Work({_data}) {

  return (
      <div className="bg-pink-700 relative min-h-screen">
      <Head>
        <title>Blazardsky &ndash; Portfolio Lavori</title>
        <meta name="description" content="Qui trovi una raccolta dei miei ultimi lavori di grafica e web development." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Texture blend='exclusion' opacity='70'/>
      <Navbar />
      <Main h1="Lavori" h2="Una selezione di lavori realizzati negli anni" />
      <section className="relative columns-1 md:columns-2 xl:columns-4 mx-auto min-w-fit w-11/12 max-w-7xl p-4">
        {
          _data.map(arr => {
            console.log(arr)
            const {
              mainImage,
              title,
              slug,
              year,
              categories,
              cliente
            } = arr;
            return (
              <article key={`key__${slug}`} className="block rougher-edges text-white p-3 bg-black mx-0 mb-4 break-inside-avoid">
                <Link href={`/lavori/${slug}`}>
                  <div className="cursor-pointer">
                    <img src={urlFor(mainImage).width(620)} className="roughest-edges" alt=""/>
                    <h1 className="text-2xl p-3 cursive"><strong>{title}</strong> {`[${year.slice(0,4)}]`}</h1>
                  </div>
                </Link>
                <h3 className="tracking-wide text-gray-200 px-3">Cliente: {cliente}</h3>
                <div className="p-4 -skew-x-3">
                  {categories.map(cat=>(
                    <span key={`${title}-${year}-${cat}`} className={`py-1 px-2 font-semibold mr-1 whitespace-nowrap border-2 ${ getCategoryOutlines(cat) }`}>
                      {cat}
                    </span>
                  ))}
                </div>
              </article>
            )
          })
        }
      </section>
      <Footer />
    </div>
  )
}