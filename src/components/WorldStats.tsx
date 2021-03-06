import React, { FC } from 'react'
import { formatDistanceToNow, format } from 'date-fns';
import StatCard from './StatCard'
import useFetch from '../hooks/useFetch';
import { BASE_URL } from '../api';
import { toPercentage } from '../utils/toPercentage';
import { IStat } from '../definitions/IStat';

const WorldStats: FC = () => {
    const [data, loading] = useFetch<IStat>(BASE_URL);
    
    return (
      <>
        <h2 className="my-3 text-2xl">World data</h2>

        {!loading && (
          <div className="flex sx-2 sm:sx-5">
            <StatCard title="Confirmed (100%)" value={data?.confirmed?.value} />
            <StatCard
              title={`Recovered (${toPercentage(data?.recovered?.value, data?.confirmed?.value)})`}
              value={data?.recovered?.value}
            />
            <StatCard
              title={`Deaths (${toPercentage(data?.deaths?.value, data?.confirmed?.value)})`}
              value={data?.deaths?.value}
            />
          </div>
        )}

        <div className="mt-3 text-xs text-muted text-center">
          <span>Last updated: </span>
          {data?.lastUpdate && (
            <>
              <span>{format(new Date(data?.lastUpdate), "MM/dd/yyyy @ hh:mma")} </span>
              <span>({formatDistanceToNow(new Date(data?.lastUpdate))})</span>
            </>
          )}
        </div>
      </>
    )
}

export default WorldStats
