const Footer = () => {
  
  return (
    <div className="relative">
    <footer className={`text-center p-3 mt-5 font-mono font-semibold text-white`}>
      &copy; Nic 2022 – Creato con ❤️‍🔥 a <a className="hover:underline" href="https://kipoproduzioni.it?utm_source=blzspace&utm_medium=website">Kipo s.r.l.</a>
    </footer>
    <div className="w-100 checkerboard-wrapper">
      <div className="bg-repeat-space w-100 bg-left-top checkerboard-reverse"></div>
      <div className="bg-repeat-space w-100 bg-left-top checkerboard"></div>
    </div>
    </div>
  )
}

export default Footer