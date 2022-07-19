const Texture = ({blend='multiply',opacity='30'}) => {
  return (
    <picture>
        <source srcSet="/bg/background.avif" type="image/avif" />
        <source srcSet="/bg/background.webp" type="image/webp" />
        <img className={`fixed top-0 left-0 right-0 bottom-0 w-100 min-h-screen object-cover pointer-events-none opacity-${opacity} mix-blend-${blend}`} src="bg/background.png" alt="" />
    </picture>
  )
}

export default Texture