import {getCategoryColors, getCategoryOutlines} from '@lib/utils';

const CategoryBoucingPoint = ({category,bounce=true,explicit=false}) => {


  return (
    <div 
      data-content={`${explicit ? category : ''}`}
      className={`relative ${explicit && "flex items-center justify-center min-w-max md:border-2 py-0.5 px-2 after:hidden md:after:inline-block after:content-[attr(data-content)] after:static after:ml-2 after:text-sm after: after:text-white"} ${getCategoryOutlines(category)}`}>
    <span title={category} 
        className={`w-2 h-2 flex items-center justify-center cursor-pointer ${bounce && 'animate-bounce'}`}>
        <span className={`animate-ping absolute inline-flex h-2 w-2 rounded-full ${getCategoryColors(category)} opacity-75`}></span>
        <span className={`relative inline-flex rounded-full h-2 w-2 ${getCategoryColors(category)}`}></span>
   </span>
   </div>
  )
}


export {CategoryBoucingPoint};