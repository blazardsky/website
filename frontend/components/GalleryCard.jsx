import Link from 'next/link';
import { urlFor } from '@lib/client';



function getRotation(num) {
    const neg = (num % 2 === 0);
    let rand = 3 + Math.floor(Math.random() * 3);
    let rotation = `rotate(${neg ? '-' : ''}${rand}deg)`;

    return rotation
}

const GalleryCard = ({galleryData}) => {
  const {
    title,
    slug,
    gallery
  } = galleryData;

  return (
    <Link href={`galleria/${slug}`}>
        <div className="m-10 text-center relative">
            <div className="grid grid-rows-1 grid-cols-1 place-items-center transition-all bezier hover:scale-110 hover:rotate-6 cursor-pointer">
                <span className="block bg-black border-2 border-white w-[258px] h-[368px]" style={{transform: getRotation(2), gridArea: '1 / 1 / 1 / 1'}}> </span>
                {
                    gallery.map((image,index)=> (
                        <div 
                        key={`${title}__${index}`} 
                        style={{transform: getRotation(index), gridArea: '1 / 1 / 1 / 1'}}
                        className="origin-center border-2 border-white p-0"
                        >
                            <div className="max-h-[360px] bg-black border-black border-8 flex items-center justify-center overflow-hidden object-contain">
                                <img 
                                    className="max-h-100 max-w-100" 
                                    src={urlFor(image).width(250).quality(60).auto('format').url()} 
                                    alt="" 
                                />
                            </div>
                        </div>
                    ))
                }
                <h2 className="font-bold tracking-wider text-xl bg-white border-2 border-black text-black skew-x-6 w-fit px-10 py-1 absolute bottom-12 -right-10">{title}</h2>
            </div>
        </div>
    </Link>
  )
}

export default GalleryCard