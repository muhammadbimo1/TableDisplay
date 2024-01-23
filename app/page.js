import { formatTime, getItem, getLatest } from './utils'
export const revalidate = 3600 // revalidate the data at most every hour
 
export default async function Home({items}) {

    const times = await getItem()

    const getLatest = (times)=> {
        if (times && times.length > 0) {
            const mostRecentUpdate = times.reduce((latest, item) => {
                const currentUpdateTime = new Date(item.updatedAt);
                return currentUpdateTime > latest ? currentUpdateTime : latest;
            }, new Date(0)); // Initialize with the earliest possible date
        
            const formattedMostRecentUpdate = mostRecentUpdate.toLocaleString();
            return formattedMostRecentUpdate;
      }
    }
      
  return (
    <div style={{ backgroundImage: `url('/begobg.svg')` }} className="font-sans bg-cover py-10 px-24 h-screen">
<div className="py-20 px-60 ">
    <h2 className="text-white">Time Results</h2>
    <h4 className="text-gray-300">Current as of {getLatest(times)}</h4>
    <table className="w-full border-collapse my-12 text-sm bg-gray-200 text-left">
        <thead>
            <tr>
                <th className="w-11 px-4 py-2 text-center border-t-2 border-red-600 bg-gray-800 text-white">Rank</th>
                <th className="px-4 py-2 text-center border-t-2 border-red-600 bg-gray-800 text-white">Driver</th>
                <th className="px-4 py-2 text-center border-t-2 border-red-600 bg-gray-800 text-white">Time</th>
                <th className="px-4 py-2 text-center border-t-2 border-red-600 bg-gray-800 text-white">Car Type</th>
                <th className="px-4 py-2 text-center border-t-2 border-red-600 bg-gray-800 text-white">Gap</th>
            </tr>
        </thead>
        <tbody>
            {times.map((item,index)=>{
                return(
                    <tr className="bg-gray-600 text-white">
                    <td className="px-4 py-2 text-center border-b border-gray-300">{index+1}</td>
                    <td className="px-4 py-2 text-center border-b border-gray-300">{item.driver}</td>
                    <td className="px-4 py-2 text-center border-b border-gray-300">{formatTime(item.best_lap)}</td>
                    <td className="px-4 py-2 text-center border-b border-gray-300">{item.car}</td>

                    <td className="px-4 py-2 text-center border-b border-gray-300">{`+${item.gap}`}</td>
                </tr>
                )
            })}


        </tbody>
    </table>
</div>
</div>
  );
}