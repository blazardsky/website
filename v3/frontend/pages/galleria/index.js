import Head from 'next/head'

import groq from 'groq';
import {client} from '@lib/client';

import {Navbar, Footer, Main, GalleryCard, Texture} from '../../components';


const query = groq`*[_type == "illustration" && !(_id in path("drafts.**"))]{
  title,
  "slug": slug.current,
  gallery[0...2]{
    asset
  }
}`

export async function getStaticProps() {
  const _data = await client.fetch(query)
  return {
    props: {
      _data
    }
  }
}


export default function Gallery({_data}) {

  return (
    <div className="bg-pink-700 relative min-h-screen">
      <Head>
        <title>Visuals &ndash; Galleria di immagini</title>
        <meta name="description" content="Portfolio di disegni, illustrazioni e grafiche di vario tipo" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Texture blend='mix-blend-exclusion' opacity='opacity-70'/>
      <Navbar />
      <Main h1="Galleria" h2="Un portfolio di disegni, illustrazioni e grafiche" />
      <section className="flex flex-row flex-wrap gap-10 justify-around items-center mx-auto w-fit">
        {
          _data.map((gallery, index) => (

            <GalleryCard key={`$G{index}_${gallery[0]}`} galleryData={gallery}/>

          ))
        }
      </section>
      <Footer />
    </div>
  )
}
