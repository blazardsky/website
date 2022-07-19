import {urlFor, ptComponents} from '@lib/client';
import {PortableText} from '@portabletext/react';

import {TbExternalLink} from 'react-icons/tb';

const ClientCard = ({clientData}) => {
  
  const [name,href,image,bio] = clientData;

  return (
    <div className="mx-auto w-fit h-fit max-w-sm flex flex-col items-center gap-6 text-white py-4 px-5 border-2 border-white mt-5">
        <img src={urlFor(image).width(150)} className="rounded-full inline-block aspect-square object-cover" alt={`Immagine di ${name}`} />
        <div className="inline-block">
            <h4 className="text-xl font-bold mb-2">
              <a href={href} target="_blank" rel="noopener noreferrer nofollow" className="transition-all duration-75 ease-out border-b-2 border-transparent w-fit hover:border-yellow-400 hover:text-yellow-600">
                {name}
                <span className="inline-block w-4 h-4 align-text-top opacity-70"><TbExternalLink /></span>
              </a>
            </h4>
            <PortableText
                value={bio}
                components={ptComponents}
            />
        </div>
    </div>
  )
}

export default ClientCard