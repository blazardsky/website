import Link from 'next/link'
import {urlFor} from '@lib/client';
import {getCategoryOutlines} from '@lib/utils'

const WorkCard = ({workData, index}) => {
    const {
        mainImage,
        title,
        slug,
        year,
        categories,
        cliente
      } = workData;
      return (
        <div className="opacity-60 translate-y-[50px]" data-gsapselector="workCard" data-gsapindex={index}>
        <Link href={`/lavori/${slug}`} >
            <article title="Che aspetti, clicca!" 
            className="cursor-pointer p-3 break-inside-avoid block rougher-edges mx-0 mb-4 transition-all duration-300 hover:scale-105 hover:rotate-1 text-white bg-gradient-to-b from-black/80 via-rose-900/75 to-black/90 to">
                <div className="hover:animate-pulse">
                    <img src={urlFor(mainImage).width(620).auto('format').quality(70).url()} className="transition-all duration-200 roughest-edges ease hover:saturate-150 hover:hue-rotate-180 hover:contrast-125" alt=""/>
                    <h2 className="text-2xl p-3 cursive"><strong>{title}</strong> {`[${year.slice(0,4)}]`}</h2>
                </div>
                <h3 className="tracking-wide text-gray-200 px-3">Cliente: {cliente}</h3>
                <div className="p-4 -skew-x-3">
                    {categories.map(cat=>(
                    <span key={`${title}-${year}-${cat}`} className={`py-1 px-2 text-sm font-medium mr-1 whitespace-nowrap border-2 ${ getCategoryOutlines(cat) }`}>
                        {cat}
                    </span>
                    ))}
                </div>
            </article>
        </Link>
        </div>
      )
}

export default WorkCard