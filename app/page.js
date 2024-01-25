import { formatTime, getItem, getLatest } from './utils';
export const revalidate = 3600; // revalidate the data at most every hour

export default async function Home({ items }) {
  const times = await getItem();

  const getLatest = (times) => {
    if (times && times.length > 0) {
      const mostRecentUpdate = times.reduce((latest, item) => {
        const currentUpdateTime = new Date(item.updatedAt);
        return currentUpdateTime > latest ? currentUpdateTime : latest;
      }, new Date(0)); // Initialize with the earliest possible date

      const formattedMostRecentUpdate = mostRecentUpdate.toLocaleString();
      return formattedMostRecentUpdate;
    }
  };

  return (
    <div
      style={{ backgroundImage: `url('/begobg.svg')` }}
      className='h-screen bg-cover px-24 py-10 font-sans'
    >
      <div className='px-60 py-20 '>
        <h2 className='text-white'>Time Results</h2>
        <h4 className='text-gray-300'>Current as of {getLatest(times)}</h4>
        <table className='my-12 w-full border-collapse bg-gray-200 text-left text-sm'>
          <thead>
            <tr>
              <th className='w-11 border-t-2 border-red-600 bg-gray-800 px-4 py-2 text-center text-white'>
                Rank
              </th>
              <th className='border-t-2 border-red-600 bg-gray-800 px-4 py-2 text-center text-white'>
                Driver
              </th>
              <th className='border-t-2 border-red-600 bg-gray-800 px-4 py-2 text-center text-white'>
                Time
              </th>
              <th className='border-t-2 border-red-600 bg-gray-800 px-4 py-2 text-center text-white'>
                Car Type
              </th>
              <th className='border-t-2 border-red-600 bg-gray-800 px-4 py-2 text-center text-white'>
                Gap
              </th>
            </tr>
          </thead>
          <tbody>
            {times.map((item, index) => {
              return (
                <tr key={index} className='bg-gray-600 text-white'>
                  <td className='border-b border-gray-300 px-4 py-2 text-center'>
                    {index + 1}
                  </td>
                  <td className='border-b border-gray-300 px-4 py-2 text-center'>
                    {item.driver}
                  </td>
                  <td className='border-b border-gray-300 px-4 py-2 text-center'>
                    {formatTime(item.best_lap)}
                  </td>
                  <td className='border-b border-gray-300 px-4 py-2 text-center'>
                    {item.car}
                  </td>

                  <td className='border-b border-gray-300 px-4 py-2 text-center'>{`+${item.gap}`}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}