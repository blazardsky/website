import Head from 'next/head'

import groq from 'groq';
import {client} from '@lib/client';

import {Navbar, Footer, Main, SocialMedia} from '../components';
import { PortableText } from '@portabletext/react';


const query = groq`*[_type == "genericStuff"][0]{
  title, 
  tagline,
  intro[]
}`


const socQuery = groq`*[_type == "social" && !(_id in path("drafts.**"))]{
  name,
  href,
}`

export async function getStaticProps() {
  const _data = await client.fetch(query)
  const _socials = await client.fetch(socQuery)
  return {
    props: {
      _data,
      _socials
    }
  }
}


export default function Home(props) {

  const {
    title = "Blazardsky", 
    tagline,
    intro,
  } = props._data;

  return (
    <div className="bg-pink-600 bg-[url('https://i.pinimg.com/564x/89/8a/56/898a56461164016aed300f5fac1a52f9.jpg')] bg-cover bg-no-repeat bg-center bg-fixed min-h-screen">
      <Head>
        <title>{title} &ndash; {tagline}</title>
        <meta name="description" content="Ciao, mi chiamo Niccolò e sono uno sviluppatore web, grafico e illustratore digitale." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar isHome={true}/>
      <Main h1={title} h2={tagline} />
      <section>
        <div className="p-14 m-5 border-2 rounded-0 border-black border-solid -skew-y-3 w-auto max-w-fit relative bg-yellow-400">
          <h3 className="absolute top-6 -right-5 skew-y-4 -skew-x-12 border-2 rounded-0 bg-pink-600 text-white border-black border-solid py-1 px-3 tracking-wide font-mono font-semibold">
            Mi presento
          </h3>
          <div className="skew-y-3 prose prose-p:text-black prose-h3:font-bold prose-h3:text-2xl prose-h4:italic prose-h4:text-xl">
            <PortableText
                value={intro}
              />
          </div>
        </div>
        <div className="mx-auto w-fit py-5">
          {
            props._socials.map(
              social => (
                <SocialMedia key={`S__${social['name']}`} socialData={social} />
              )
            )
          }
        </div>
      </section>
      <Footer />
    </div>
  )
}
