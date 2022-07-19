import {config} from './config'
import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = sanityClient({
  ...config
})


const builder = imageUrlBuilder(client);
export const urlFor = (source) => builder.image(source);


export const ptComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) {
        return null
      }
      return (
        <img
          alt={value.alt || ' '}
          loading="lazy"
          src={urlFor(value).width(1000).maxHeight(600).fit('max').auto('format')}
        />
      )
    }
  }
}