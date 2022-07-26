const Texture = ({blend='mix-blend-multiply', opacity='opacity-30'}) => {
  return (
    <picture>
        <source srcSet="/bg/background.avif" type="image/avif" />
        <source srcSet="/bg/background.webp" type="image/webp" />
        <img className={`fixed top-0 left-0 right-0 bottom-0 min-w-full min-h-screen object-cover pointer-events-none ${opacity} ${blend}`} src="bg/background.png" alt="" />
    </picture>
  )
}

export default Texture