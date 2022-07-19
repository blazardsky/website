export default function Main({h1,h2}){
    return(
        <main className="relative p-5 w-100 flex content-center justify-center">
        <div clasname="mx-auto">
          <h1 className="punk-font text-center text-white text-8xl tracking-wider mt-9">{h1}</h1>
          <h2 className="font-bold font-mono text-center uppercase text-white">{h2}</h2>
        </div>
      </main>
    )
}
