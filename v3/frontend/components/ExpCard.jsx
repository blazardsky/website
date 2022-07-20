import { CategoryBoucingPoint } from "./CategoryBoucingPoint";


const getExpTypeColor = (expType) => {
  let values = {
    'Lavoro' : 'bg-pink-400 text-white',
    'Istruzione' : 'bg-yellow-400 text-gray-900',
    'Hobby' : 'bg-red-400 text-white'
  }

  return values[expType];
} 


const getSkewSide = (num,withMargins=true) => {

  let side = num%2 === 0 ? 'even' : 'odd';
  const sideStyle = {
    'even' : `md:skew-x-6 md:-skew-y-3 md:rotate-3 ${withMargins && 'md:-mr-12'}`,
    'odd'  : `md:-skew-x-6 md:skew-y-3 md:-rotate-3 ${withMargins && 'md:-ml-12'}`
  }

  return sideStyle[side];

}



const ExpCard = ({index, expData}) => {
  
  const {title,desc,startDate,endDate,categories,type} = expData;

  const getLocaleDate = (date) => {
    return new Date(date).toLocaleString('it-IT', {month: 'short', year: 'numeric' });
  }

  return (
    <div className={`relative origin-center mt-6 py-4 px-6 m-2 md:py-12 md:px-16 max-w-full w-fit h-fit flex flex-col items-center gap-6 border-2 border-white text-white bg-gray-900 ${getSkewSide(index)}`}>
        <div className="absolute -right-2 -bottom-2 px-4 py-1 font-bold capitalize bg-gray-700 border-2 rounded-tl-xl">
            {getLocaleDate(startDate)} &ndash; {getLocaleDate(endDate)}
        </div>
        <div className="block max-w-prose">
            <span className={`font-mono font-semibold text-sm px-2 py-1 ${getExpTypeColor(type)}`}>{ type }</span>
            <div className="inline-flex flex-row gap-2 justify-center items-center m-2">
            {
              categories.map((cat,index) => (
                <CategoryBoucingPoint key={`CBP${index}__${title}-${cat}`} category={cat} bounce={false} explicit={true} />
              ))
            }
            </div>
            <div className={`origin-center ${getSkewSide(index+1,false)}`}>
              <h4 className="text-xl font-bold mt-4 mb-2">{ title }</h4>
              <p className="mb-5">{ desc }</p>
            </div>
        </div>
    </div>
  )
}

export default ExpCard;