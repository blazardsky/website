import {useRef} from 'react';
import Head from 'next/head'
import Link from 'next/link';
import groq from 'groq';
import {client, ptComponents} from '@lib/client';
import {getCategoryOutlines} from '@lib/utils';
import { PortableText } from '@portabletext/react'
import {Navbar, Footer, ClientCard, SkillsBlock, Texture, Lightbox} from 'components';
import {BsArrowDown} from 'react-icons/bs';
import {TbArrowBarLeft} from 'react-icons/tb';


const query = groq`*[_type == "work" && slug.current == $slug][0]{
  title, 
  year,
  mainImage {
    "src" : asset->url,
    "colorBg": asset->metadata.palette['darkMuted']['background'],
    "colorFg": asset->metadata.palette['dominant']['background'],
    "colorTxt": asset->metadata.palette['dominant']['foreground'],
    "colorArrow": asset->metadata.palette['lightVibrant']['background'],
  },
  body[],
  "categories": categories[]->title,
  "clientData" : [
    client->name,
    client->href,
    client->image,
    client->bio,
  ],
  "skills": [
    skills[]->title,
    skills[]->b64,
    skills[]->isPrimary,
    skills[]->categories->title
  ],
  seoDesc
}`

export async function getStaticPaths() {
  const paths = await client.fetch(
    `*[_type == "work" && defined(slug.current)][].slug.current`
  )

  return {
    paths: paths.map((slug) => ({params: {slug}})),
    fallback: true,
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


const Work = (props) => {

  const scrollToRef = useRef(null);

  const scrollToText = () => {
    scrollToRef.current?.scrollIntoView({
      behavior: 'smooth', 
      block: "start", 
      inline: "center"
    })
  }

  const { 
    title, 
    year,
    mainImage,
    body,
    categories,
    clientData, 
    skills,
    seoDesc,
  } = props._data || ['Errore',1900,{},{},{},{},{},'']

  return (
    <div className="bg-black text-white relative">
      <Head>
        <title>{`${title} – ${categories[0]}`}</title>
        <meta name="keywords" content={[...categories,...skills[0]].map(key => ' '+key)} />
        <meta name="description" content={`${seoDesc}...`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Link href='/lavori'>
        <button className="block absolute z-10 top-5 left-8 bg-yellow-400 p-1 -skew-x-6 transition-all duration-75 text-black hover:bg-pink-600 hover:scale-105 hover:text-white">
          <TbArrowBarLeft className="color-inherit skew-x-6 mx-3 my-2" />
        </button>
      </Link>
      <article>
        <main className="w-100 min-h-screen p-5 pb-10 flex flex-col justify-center relative rough-edges" style={{backgroundColor : mainImage["colorBg"]}}>
        <Texture blend='mix-blend-exclusion' opacity='opacity-70'/>
          <h1 className="text-6xl my-6 mx-auto fun-font relative p-3" style={{background: mainImage["colorFg"], color: mainImage["colorTxt"]}}>{title} [{year.slice(0,4)}]</h1>
          <Lightbox src={mainImage["src"]} alt={`Immagine per ${title}`} />
          <BsArrowDown 
            onClick={scrollToText}
            className="relative block mx-auto mt-10 p-1 h-8 w-8 border-2 bg-black/25 rounded-full animate-bounce" 
            style={{
            borderColor: mainImage["colorArrow"],
            animationDelay: 3 + 's !important',
          }} />
        </main>
        <section ref={scrollToRef} className="flex flex-wrap py-5 relative bg-black">
          <section className="mx-auto max-w-4xl pt-10">
            <Navbar />
            <div className="prose prose-xl prose-invert p-5 prose-h1:mb-0">
              <h1 className="text-3xl font-bold text-white/50">{title}</h1>
              <PortableText
                components={ptComponents}
                value={body}
              />
            </div>
          </section>
          <div className="p-5 mx-auto">
            <div className="text-xl mx-auto my-6"> 
              {
                categories && categories.map(cat => (
                  <span key={`${title}-${year}-${cat}`} className={`py-1 px-2 relative inline-block mr-2 whitespace-nowrap -skew-y-2 border-2 ${getCategoryOutlines(cat)}`}>
                    <div className="skew-y-2 text-sm font-semibold tracking-wide p-1">{cat}</div>
                  </span>
                  )
                )}
              </div>
            <SkillsBlock skillsData={skills} />
            <ClientCard clientData={clientData}/>
          </div>
        </section>
      </article>
      <Footer />
    </div>
  )
}


export default Work