function getCategoryColors(cat) {
    let values = {
        'Web Development' : 'bg-blue-400 text-white ',
        'Programmazione':'bg-green-300 text-black ',
        'Design':'bg-fuchsia-400 text-white ',
        'Grafica':'bg-teal-400 text-black ',
        'Content & Marketing':'bg-red-300 text-black ',
        'Vario': 'bg-purple-400 text-white ',
        'Illustrazione':'bg-orange-400 text-white '
    }
    
    return values[cat];
}

export {getCategoryColors}


function getCategoryOutlines(cat) {
    let values = {
        'Web Development' : 'border-blue-400 text-blue-100',
        'Programmazione':'border-green-300 text-green-200 ',
        'Design':'border-fuchsia-400 text-fuchsia-200 ',
        'Grafica':'border-teal-400 text-teal-200 ',
        'Content & Marketing':'border-red-300 text-red-200 ',
        'Vario': 'border-purple-400 text-purple-200 ',
        'Illustrazione':'border-orange-400 text-orange-200 '
    }
    
    return values[cat];
}

export {getCategoryOutlines}

