import { CategoryBoucingPoint } from ".";

const SkillsBlock = ({skillsData}) => {
  const [title, b64, isPrimary, categories] = skillsData;

  let iconSize = isPrimary ? 32 : 26;

  return (
    <div className="mx-auto w-fit h-fit max-w-sm border-2 text-white py-4 px-5">
        <h3 className="text-xl font-black tracking-wide">Tech Stack</h3>
        <p className="text-sm font-medium text-gray-400 mb-4">Quali competenze mi sono servite per realizzare questo lavoro:</p>
        {
            title.map(
                (elem, index) => (
                <div key={elem} className="flex flex-row gap-4 mb-4 items-center">
                    <img src={`data:image/svg+xml;base64,${b64[index]}`} alt="" width={iconSize} height={iconSize}/>
                    <em className="text-gray-100">{elem}</em>
                    <CategoryBoucingPoint category={categories[index]} bounce={isPrimary} />
                </div>
                )
            )
        }
    </div>
  )
}

export default SkillsBlock;