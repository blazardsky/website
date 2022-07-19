/*
const colors = {
    'Behance' : 'hover:bg-blue-400',
    'DaFont' : 'hover:bg-red-500',
    'LinkedIn' : 'hover:bg-indigo-400',
    'TikTok' : 'hover:bg-teal-500',
    'Twitter' : 'hover:bg-sky-400',
    'GitHub' : 'hover:bg-purple-500',
    'Medium' : 'hover:bg-emerald-500',
    'Instagram' : 'hover:bg-rose-500',
    'Facebook' : 'hover:bg-violet-500',
}

*/

const SocialMedia = ({socialData}) => {
    const {
      name,
      href
    } = socialData;
  
    return (
      <a
      className={`inline-block font-bold font-mono text-center mx-2 p-1 bg-yellow-400 -skew-x-6 border-2 border-black bezier transition-all hover:scale-105 hover:bg-rose-500`} 
      href={href}>
          <span className="skew-x-6">{name}</span>
      </a>
    )
  }
  
  export default SocialMedia