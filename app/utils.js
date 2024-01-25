import { cache } from 'react';
import clientPromise from './lib/mongodb';

export const getItem = cache(async () => {
  const client = await clientPromise;
  const db = client.db('SimRacing_Results');

  // Query for the fastest lap
  const fastestLapResult = await db
    .collection('Times')
    .find({})
    .sort({ best_lap: 1 })
    .limit(1)
    .toArray();
  const fastestLap = fastestLapResult[0].best_lap;

  const results = await db
    .collection('Times')
    .find({})
    .sort({ best_lap: 1 })
    .toArray();

  const resultsWithGap = results.map((result) => {
    const gap = result.best_lap - fastestLap;
    return { ...result, gap: gap.toFixed(3) }; // gap rounded to 3 decimal places
  });

  return resultsWithGap;
});

export function formatTime(timeInSeconds) {
  try {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds) % 60;
    const milliseconds = Math.round(
      (timeInSeconds - Math.floor(timeInSeconds)) * 1000
    );

    return `${minutes}:${seconds.toString().padStart(2, '0')}:${milliseconds.toString().padStart(3, '0')}`;
  } catch (error) {
    return '-';
  }
}
