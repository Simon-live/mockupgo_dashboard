'use client';
import { Children, useEffect, useState } from 'react';
import { toastError } from '@components/toast';
import PageHeader from '@components/pageHeader';
import SpringButton from '@components/springButton';
import Icon from '@components/icon';
import Dropdownbox from '@components/dropdownBox';
import DataRecord from './dataRecord';
// Service
import crawlerService from '@services/contents/crawlerService';

const CrawlerData = ({ params }) => {
  const { id } = params;

  const [data, setData] = useState({});
  const [filter, setFilter] = useState(false);
  const [trash, setTrash] = useState(false);
  const [page, setPage] = useState(1);
  // Modal

  const getData = async () => {
    try {
      const res = await crawlerService.retrieveData(id, {
        pageNumber: page,
        filter,
        trash,
      });
      setData(res.data.data);
    } catch (error) {
      toastError(error.response.data.message);
    }
  };

  // 初始化数据列表
  useEffect(() => {
    getData();
  }, [page, filter]);

  // 向前翻页
  const prevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  // 向后翻页
  const nextPage = () => {
    if (page < Math.ceil(data.total / data.pageSize)) {
      setPage(page + 1);
    }
  };

  return (
    <div>
      <PageHeader
        title="Crawler Data"
        digest="Organise, modify and config your crawlers"
        onBack={true}
      />
      {/* 数据筛选 */}
      <div className="w-full p-6 bg-white rounded-xl mb-6">
        <div className="grid grid-cols-4 gap-2">
          <Dropdownbox
            className="col-span-4 md:col-span-2 lg:col-span-1"
            icon="fa-solid fa-filter"
            isDefault={true}
            data={[
              { title: 'Pending', value: false },
              { title: 'Storage', value: true },
              { title: 'Trash', value: 'trash' },
              { title: 'All', value: null },
            ]}
            onSelect={(item) => {
              if (item.value === 'trash') {
                setTrash(true);
                setFilter(null);
              } else {
                setTrash(false);
                setFilter(item.value);
              }
            }}
          />
          {/* Paginate */}
          <div className="col-span-4 md:col-span-2 lg:col-span-1 lg:col-start-4 w-full flex justify-end items-center">
            <div className="flex gap-2">
              {/* 刷新数据按钮 */}
              <SpringButton
                onClick={() => getData()}
                className="btn-icon bg-slate-100 text-sm"
              >
                <Icon icon="fa-solid fa-rotate-right" />
              </SpringButton>
              {/* 页码 */}
              {data?.result?.length > 0 && (
                <>
                  <SpringButton
                    disabled={parseInt(data.pageNumber) === 1}
                    onClick={() => prevPage()}
                    className="btn-icon bg-slate-100 text-sm"
                  >
                    <Icon icon="fa-solid fa-angle-left" />
                  </SpringButton>
                  <div className="px-4 py-2 rounded-xl flex justify-center items-center">
                    <span className="text-slate-600 text-sm">
                      {data.pageNumber}/{Math.ceil(data.total / data.pageSize)}
                    </span>
                  </div>
                  <SpringButton
                    disabled={
                      parseInt(data.pageNumber) ===
                      Math.ceil(data.total / data.pageSize)
                    }
                    onClick={() => nextPage()}
                    className="btn-icon bg-slate-100 text-sm"
                  >
                    <Icon icon="fa-solid fa-angle-right" />
                  </SpringButton>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* 数据列表 */}
      {data?.total !== 0 ? (
        <div className="w-full py-2 px-6 bg-white rounded-xl overflow-auto">
          <table className="w-full border-separate">
            {Children.toArray(
              data?.result?.map((e, i) => (
                <DataRecord item={e} getData={getData} />
              )),
            )}
          </table>
        </div>
      ) : (
        <div className="w-full py-20 overflow-auto mb-6 text-slate-300">
          <div className="grid place-items-center gap-2">
            <Icon className="text-[3rem] opacity-75" icon="fa-solid fa-inbox" />
            <h1 className="text-sm font-semibold">There is nothing here.</h1>
          </div>
        </div>
      )}
    </div>
  );
};

export default CrawlerData;
