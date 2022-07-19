import Link from 'next/link'

const Navbar = ({isHome=false}) => {
    
  let menuItems = {
    'Lavori' : '/lavori',
    'Visuals' : '/galleria',
    'EXP' : '/esperienza',
  }

  if (!isHome) {
    menuItems = {
        'Home' : '/',
        ...menuItems
    }
  }

  return (
    <header className="relative p-3 flex align-center justify-center">
        <nav className="min-w-fit w-2/5 py-3 px-8 bg-yellow-500 text-black flex align-center justify-center -skew-x-3">
            <ul role="list" className="list-style-none">
                {
                    Object.entries(menuItems).map(item => (
                        <li key={`menu_${item[0]}`} className="relative mx-2 py-1 px-2 inline-block font-bold tracking-wide hover:text-white before:transition-all before:duration-75 before:linear before:hidden before:absolute before:-inset-1 before:-skew-y-3 before:bg-pink-500 hover:before:block ">
                            <span className="relative">
                                <Link href={item[1]}>
                                    { item[0] }
                                </Link>
                            </span>
                        </li>
                    ))
                }
            </ul>
        </nav>
    </header>
  )
}

export default Navbar