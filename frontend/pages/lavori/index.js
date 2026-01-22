import Head from 'next/head'
import {useRef, useLayoutEffect } from 'react';
import {Navbar, Footer, Main, Texture, WorkCard} from '../../components';
import groq from 'groq';
import { gsap } from "gsap";
import {client} from '@lib/client';


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
    q('[data-gsapselector="workCard"]').forEach((workCard, index) => {
      gsap.to(workCard, {
        opacity: 1,
        y: 0,
        duration: (index+1)*0.05,
        scrollTrigger: {
          trigger : workCard,
          start: 'top 10', //10px from top of elem
          end: 'bottom 100',
          toggleActions: 'play none none none', //onEnter, onLeave, onEnterBack, onLeaveBack
          markers: false,
          once: true,
        },
      });
    });
  },[q]);

  return (
      <div className="bg-pink-700 relative min-h-screen max-w-full">
      <Head>
        <title>Blazardsky &ndash; Portfolio Lavori</title>
        <meta name="description" content="Qui trovi una raccolta dei miei ultimi lavori di grafica e web development." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Texture blend='mix-blend-exclusion' opacity='opacity-70'/>
      <Navbar />
      <Main h1="Lavori" h2="Una selezione di lavori realizzati negli anni" />
      <section ref={worksRef} className="relative columns-1 sm:columns-2 md:columns-3 2xl:columns-4 mx-auto w-11/12 max-w-screen-2xl p-4">
        {
          _data.map( (arr, index) => (
            <WorkCard workData={arr} index={index} key={`WK__${arr['slug']}-${index}`} />
          ))
        }
      </section>
      <Footer />
    </div>
  )
}