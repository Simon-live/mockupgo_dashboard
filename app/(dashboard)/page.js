'use client';
import { useState, useEffect, Children } from 'react';
import { toastError } from '@components/toast';
import Icon from '@components/icon';
import PageHeader from '@components/pageHeader';
import config from '@config/default.json';
import BarChart from './barChart';
import PieChart from './pieChart';
// Service
import generalService from '@services/contents/generalService';

const Dashboard = () => {
  const [data, setData] = useState({});
  const getData = async () => {
    try {
      const res = await generalService.getDashboardData();
      setData(res.data.data);
    } catch (error) {
      toastError(error.response.data.message);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <PageHeader
        title="Tag"
        digest="Organise, modify and config your tags."
        onBack={true}
      />

      <div className="grid grid-cols-6 gap-6">
        {/* Left Flow */}
        <div className="col-span-6 md:col-span-3 lg:col-span-4 grid grid-cols-6 gap-6">
          {/* Overview Statistic */}
          <div className="col-span-6 lg:col-span-2 py-4 px-5 bg-white rounded-xl space-y-2">
            <div className="flex justify-between items-start">
              <span className="text-xs">Draft Resource</span>
              <div className="w-8 h-8 bg-theme-blue/5 text-xs rounded-full text-theme-blue flex justify-center items-center">
                <Icon icon="fa-solid fa-envelopes-bulk" />
              </div>
            </div>
            <div className="flex justify-between items-end">
              <span className="text-2xl font-medium">
                {data.draft_resource_count}
              </span>
              <span className="text-xs text-slate-400">
                {data.resource_count} Public
              </span>
            </div>
          </div>
          <div className="col-span-6 lg:col-span-2 py-4 px-5 bg-white rounded-xl space-y-2">
            <div className="flex justify-between items-start">
              <span className="text-xs">Modular Crawler</span>
              <div className="w-8 h-8 bg-theme-blue/5 text-xs rounded-full text-theme-blue flex justify-center items-center">
                <Icon icon="fa-solid fa-spider" />
              </div>
            </div>
            <div className="flex justify-between items-end">
              <span className="text-2xl font-medium">{data.crawler_count}</span>
              <span className="text-xs text-slate-400">
                {data.processing_crawler_count} Procressing
              </span>
            </div>
          </div>
          <div className="col-span-6 lg:col-span-2 py-4 px-5 bg-white rounded-xl space-y-2">
            <div className="flex justify-between items-start">
              <span className="text-xs">Run Days</span>
              <div className="w-8 h-8 bg-theme-blue/5 text-xs rounded-full text-theme-blue flex justify-center items-center">
                <Icon icon="fa-solid fa-shield-halved" />
              </div>
            </div>
            <div className="flex justify-between items-end">
              <span className="text-2xl font-medium">{data.day_count}</span>
              <span className="text-xs text-slate-400">Since Started</span>
            </div>
          </div>

          {/* Bar Chart */}
          <div className="col-span-6 py-4 px-6 bg-white rounded-xl space-y-4">
            <div className="w-full flex justify-between items-center">
              <span className="font-medium text-lg">Latest Updates</span>
              <span className="text-xs text-slate-400">From Resource</span>
            </div>
            <BarChart data={data.resource_update_statistic} />
          </div>
          {/* Resource Table */}
          <div className="col-span-6 w-full py-4 px-6 bg-white rounded-xl space-y-4">
            <div className="w-full flex justify-between items-center">
              <span className="font-medium text-lg">Resource Statistic</span>
              <span className="text-xs text-slate-400">Lastest Updates</span>
            </div>
            {data ? (
              <div className="w-full overflow-auto">
                <table className="border-separate">
                  {/* Table Body */}
                  <tbody>
                    {Children.toArray(
                      data?.latest_resource?.map((item, index) => (
                        <tr className="text-slate-800 text-sm whitespace-nowrap">
                          <td className="p-4 text-slate-600 border-b-[1px] border-slate-100">
                            {index + 1}
                          </td>
                          <td className="p-4 text-slate-600 border-b-[1px] border-slate-100">
                            <div
                              className="bg-slate-100 w-28 h-16 bg-center bg-cover rounded-xl"
                              style={{
                                backgroundImage: `url(${config.contentPath}/${item.thumbnail.file_name})`,
                              }}
                            ></div>
                          </td>
                          <td className="p-4 border-b-[1px] border-slate-100">
                            <div className="flex flex-col gap-1 max-w-xl whitespace-normal">
                              <span className="font-medium text-sm">
                                {item.title}
                              </span>
                              <span className="text-slate-300 text-xs font-light whitespace-nowrap">
                                ID:{item._id}
                              </span>
                            </div>
                          </td>
                          <td className="p-4 text-slate-800 border-b-[1px] border-slate-100">
                            <span className="font-medium">
                              {item.price === 0 ? 'Free' : '$' + item.price}
                            </span>
                          </td>
                          <td className="p-4 text-slate-600 border-b-[1px] border-slate-100">
                            <div
                              className={`inline-flex rounded-full ${
                                item.collection_id
                                  ? 'bg-theme-blue/5 text-theme-blue'
                                  : 'bg-slate-100 text-slate-400'
                              } text-xs flex items-center px-2 py-1`}
                            >
                              <Icon
                                icon="fa-solid fa-circle"
                                className="mr-1 text-[0.5rem]"
                              />
                              {item.collection_id ? 'Collection' : 'Single'}
                            </div>
                          </td>
                          <td className="p-4 text-slate-600 border-b-[1px] border-slate-100">
                            <Icon
                              icon="fa-solid fa-calendar-days"
                              className="mr-2"
                            />
                            {new Date(item.create_date).toLocaleString()}
                          </td>
                        </tr>
                      )),
                    )}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="w-full py-20 overflow-auto mb-6 text-slate-300">
                <div className="grid place-items-center gap-2">
                  <Icon
                    className="text-[3rem] opacity-75"
                    icon="fa-solid fa-inbox"
                  />
                  <h1 className="text-sm">There is nothing here.</h1>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Flow */}
        <div className="col-span-6 md:col-span-3 lg:col-span-2 flex flex-col gap-6">
          {/* Pie Chart */}
          <div className="py-4 px-6 bg-white rounded-xl space-y-4">
            <div className="w-full flex justify-between items-center">
              <span className="font-medium text-lg">Distribution</span>
              <span className="text-xs text-slate-400">By Category</span>
            </div>
            <PieChart data={data.category_distribution} />
          </div>
          {/* Rank */}
          <div className="py-4 px-6 bg-white rounded-xl space-y-4">
            <div className="w-full flex justify-between items-center">
              <span className="font-medium text-lg">Trending</span>
              <span className="text-xs text-slate-400">Related Tag</span>
            </div>
            {data ? <ul className="w-full flex flex-col gap-4">
              {Children.toArray(
                data?.tag_distribution?.map((item, index) => (
                  <li className="flex justify-between items-center">
                    <div className='flex items-center gap-3'>
                      <span className={`w-6 h-6 flex items-center justify-center rounded-full text-xs  ${index < 3 ? "text-theme-blue bg-theme-blue/5" : "text-slate-800"}`}>
                        {index + 1}
                      </span>
                    <span className="text-sm text-slate-800 capitalize">
                      {item.title}
                    </span>
                    </div>
                    <span className="text-sm text-slate-400">
                      {item.related_item}
                    </span>
                  </li>
                )),
              )}
            </ul> : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
