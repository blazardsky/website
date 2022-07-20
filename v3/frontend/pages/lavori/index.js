import Head from 'next/head'
import Link from 'next/link'
import {useRef, useLayoutEffect } from 'react';
import {Navbar, Footer, Main, Texture} from '../../components';
import groq from 'groq';
import { gsap } from "gsap";
import {client, urlFor} from '@lib/client';
import {getCategoryOutlines} from '@lib/utils'

import '../../styles/Lavori.module.css';


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

  const worksRef = useRef();
  const q = gsap.utils.selector(worksRef);

  // useLayoutEffect functions exactly the same as useEffect, but runs before the DOM has been painted
  useLayoutEffect (()=> {
    
    gsap.to(q('.animateThisGsap'), {
      scrollTrigger: ".animateThisGsap",
      opacity: '1',
      translateY: '-10px;'
    });

  },[]);

  return (
      <div className="bg-pink-700 relative min-h-screen">
      <Head>
        <title>Blazardsky &ndash; Portfolio Lavori</title>
        <meta name="description" content="Qui trovi una raccolta dei miei ultimi lavori di grafica e web development." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Texture blend='mix-blend-exclusion' opacity='opacity-70'/>
      <Navbar />
      <Main h1="Lavori" h2="Una selezione di lavori realizzati negli anni" />
      <section ref={worksRef} className="relative columns-1 md:columns-2 xl:columns-4 mx-auto min-w-fit w-11/12 max-w-7xl p-4">
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
              <Link href={`/lavori/${slug}`}>
              <article key={`key__${slug}`} title="Che aspetti, clicca!"
              className="cursor-pointer p-3 break-inside-avoid block rougher-edges mx-0 mb-4 transition-all duration-300 hover:scale-105 hover:rotate-1 text-white bg-gradient-to-b from-black/80 via-rose-900/75 to-black/90 to">
                <div className="hover:animate-pulse">
                  <img src={urlFor(mainImage).width(620)} className="transition-all duration-200 roughest-edges ease hover:saturate-150 hover:hue-rotate-180 hover:contrast-125" alt=""/>
                  <h1 className="text-2xl p-3 cursive"><strong>{title}</strong> {`[${year.slice(0,4)}]`}</h1>
                </div>
                <h3 className="tracking-wide text-gray-200 px-3">Cliente: {cliente}</h3>
                <div className="p-4 -skew-x-3">
                  {categories.map(cat=>(
                    <span key={`${title}-${year}-${cat}`} className={`py-1 px-2 font-semibold mr-1 whitespace-nowrap border-2 ${ getCategoryOutlines(cat) }`}>
                      {cat}
                    </span>
                  ))}
                </div>
              </article>
              </Link>
            )
          })
        }
      </section>
      <Footer />
    </div>
  )
}