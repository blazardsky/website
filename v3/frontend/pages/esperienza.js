import Head from 'next/head'
import Image from 'next/image'

import groq from 'groq';
import {client} from '@lib/client';

import {Navbar, Footer, Main, ExpCard} from '../components';


const query = groq`*[_type == "experience" && !(_id in path("drafts.**")) ] | order(_startDate, asc)[]{
  title, 
  desc,
  startDate,
  endDate,
  "categories": field[]->title,
  type
}`

export async function getStaticProps() {
  const _data = await client.fetch(query)
  return {
    props: {
      _data
    }
  }
}


export default function Exp({_data}) {

  return (
    <div className="bg-pink-600 bg-[url('https://i.pinimg.com/564x/89/8a/56/898a56461164016aed300f5fac1a52f9.jpg')] bg-cover bg-no-repeat bg-center bg-fixed min-h-screen">
      <Head>
        <title>Esperienze &ndash; Lavoro, Istruzione, Interesse</title>
        <meta name="description" content="Una timeline delle esperienze che ritengo più significative." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <Main h1="Esperienze" h2="Una timeline delle esperienze che ritengo più significative." />
      <section className="w-fit mx-auto">
        {
          _data.map((exp, index) => (

            <ExpCard key={`$E{index}_${exp[0]}`} expData={exp} index={index} />

          ))
        }
      </section>
      <Footer />
    </div>
  )
}
