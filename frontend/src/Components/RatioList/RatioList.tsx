import React from 'react'
import { CompanyKeyMetrics, CompanyKeyRatios, CompanyProfile } from '../../company'
import {v4 as uuid} from 'uuid'

interface Props {
    data: any 
    configs: any[]
}

const RatioList = ({data, configs}: Props) => {
    const renderedRowRatio = configs.map((el) => {
        return (
            <li key={uuid()} className='py-3 sm:py-4'>
                <div className="flex items-center space-x-4">
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                            {el.label}
                        </p>
                        <p className="text-sm text-gray-500 truncate">
                            {el.subTitle && el.subTitle}
                        </p>
                    </div>
                    <div className="inline-flex items-center font-semibold text-gray-900 align-right">
                        {el.render(data)}
                    </div>
                </div>
            </li>
        )
    })
  return (
    <div className='bg-white shadow rounded-lg ml-4 mt-4 mb-4 p-4 sm:p-6 h-full w-full'>
        <ul className='divide-y divided-gray-200'>{renderedRowRatio}</ul>
    </div>
  )
}

export default RatioList