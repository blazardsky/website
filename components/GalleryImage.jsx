import { urlFor } from '@lib/client';
import Lightbox from './Lightbox'

import {TbExternalLink} from 'react-icons/tb';

const GalleryImage = ({src,desc,href}) => {
  const hasLink = !!(href);
  return (
    <div className="m-3 p-2">
        <Lightbox src={urlFor(src).auto('format').quality(100).url()} alt="" desc={desc} isSingle={false}/>
        {
            hasLink && 
            <a 
              className="underline color-inherit font-mono font-semibold relative float-right mt-2" 
              href={href} 
              target="_blank" 
              rel="noopener noreferrer nofollow" 
              title="Link esterno">
                Scopri altro
                <span className="inline-block w-4 h-4 align-text-top opacity-70"><TbExternalLink /></span>
            </a>    
        }
    </div>
  )
}

export default GalleryImage