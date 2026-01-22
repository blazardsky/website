export default function Main({h1,h2}){
    return(
        <main className="relative mx-auto w-fit max-w-screen flex content-center justify-center">
          <div className="p-6">
            <h1 className="punk-font text-center text-white text-5xl md:text-7xl xl:text-8xl tracking-wider mt-9">{h1}</h1>
            <h2 className="font-bold font-mono text-center uppercase text-white px-1">{h2}</h2>
          </div>
      </main>
    )
}
