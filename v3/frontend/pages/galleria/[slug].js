import Head from 'next/head'
import Link from 'next/link';
import groq from 'groq';
import {client} from '@lib/client';
import {Navbar, Footer, Texture,  GalleryImage} from 'components';
import {TbArrowBarLeft} from 'react-icons/tb';


const query = groq`*[_type == "illustration" && slug.current == $slug && !(_id in path("drafts.**"))][0]{
    title,
    description,
    "images": gallery[].asset,
    "captions": gallery[].caption,
    "links": gallery[].href,
  }`

export async function getStaticPaths() {
  const paths = await client.fetch(
    `*[_type == "illustration" && defined(slug.current)][].slug.current`
  )

  return {
    paths: paths.map((slug) => ({params: {slug}})),
    fallback: false,
  }
}

export async function getStaticProps(context) {
  // It's important to default the slug so that it doesn't return "undefined"
  const { slug = "" } = context.params
  const _data = await client.fetch(query, { slug })
  return {
    props: {
      _data
    }
  }
}


const Gallery = (props) => {

  const { 
    title,
    description,
    images,
    captions,
    links
  } = props._data

  return (
    <div className="bg-gray-800 text-white relative">
      <Head>
        <title>{`"${title}" – Galleria di illustrazioni`}</title>
        <meta name="keywords" content="illustrazioni, grafica, disegno, illustratore, editoria, grafico, disegnatore" />
        <meta name="description" content={`${description}...`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Link href='/galleria'>
        <button className="block absolute z-10 top-5 left-8 bg-yellow-400 p-1 -skew-x-6 transition-all duration-75 text-black hover:bg-pink-600 hover:scale-105 hover:text-white">
          <TbArrowBarLeft className="color-inherit skew-x-6 mx-3 my-2" />
        </button>
      </Link>
      <Texture />
      <section className="min-h-screen">
        <main className="w-100 p-5 pb-10 flex flex-col justify-center relative">
          <Navbar />
          <h1 className="text-6xl mx-auto fun-font relative p-3">{title}</h1>
          <p className="mx-auto font-semibold text-center max-w-prose text-xl">{description}</p>
          <small className="mx-auto font-light text-sm mt-2 p-1 ease-bezier transition-all duration-100 hover:scale-125 hover:bg-pink-700 hover:font-normal">Clicca sulle immagini per vederle a schermo intero e per qualche info</small>
        </main>
        <div className="p-5 flex flex-row flex-wrap items-start justify-evenly overflow-x-hidden">
            {
                //immmagini, captions e href sono sempre della stessa lunghezza
                images.map((src,index) => (
                    <GalleryImage key={`GI_0${index}`} src={src} desc={captions[index]} href={links[index]} />
                ))
            }
        </div>
      </section>
      <Footer />
    </div>
  )
}


export default Gallery