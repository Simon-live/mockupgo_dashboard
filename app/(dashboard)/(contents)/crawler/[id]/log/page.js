'use client';
import { useState, useEffect, Children } from 'react';
import { useParams } from 'next/navigation';
import _ from 'lodash';
import { toastError } from '@components/toast';
import PageHeader from '@components/pageHeader';
import Icon from '@components/icon';
import SpringButton from '@components/springButton';
import Checkbox from '@components/checkbox';
import DataRecord from './dataRecord';
// Service
import crawlerService from '@services/contents/crawlerService';

const Page = () => {
  const { id } = useParams();

  const [data, setData] = useState({});
  const [filter, setFilter] = useState([-1, 0, 200]);
  const [page, setPage] = useState(1);

  const handleCheck = (value) => {
    if (_.includes(filter, value)) {
      if (filter.length > 1) {
        setFilter(_.without(filter, value));
      } else {
        toastError('Only one filter is required');
      }
    } else {
      setFilter(_.concat(filter, value));
    }
  };

  const getData = async () => {
    try {
      const res = await crawlerService.retrieveLog(id, {
        pageNumber: page,
        ...(filter?.length > 0 && { filter: _.join(filter, ',') }),
      });
      setData(res.data.data);
    } catch (error) {
      toastError(error.response.data.message);
    }
  };
  // 初始化数据列表
  useEffect(() => {
    if (id) getData();
  }, [page]);

  useEffect(() => {
    if (page === 1) {
      getData();
    } else {
      setPage(1);
    }
  }, [filter]);

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
    <>
      <PageHeader
        title="Crawler Log"
        digest="Organise, modify and config your crawlers"
        onBack={true}
      />

      {/* 综合操作 */}
      <div className="w-full p-6 bg-white rounded-xl mb-6">
        <div className="grid grid-cols-4 gap-2">
          {/* 爬虫状态筛选 */}
          <Checkbox
            className="col-span-4 md:col-span-2 lg:col-span-1"
            label="Significant error"
            icon="fa-solid fa-clone"
            checked={_.includes(filter, -1)}
            onChange={() => handleCheck(-1)}
          />
          <Checkbox
            className="col-span-4 md:col-span-2 lg:col-span-1"
            label="Insignificant error"
            icon="fa-solid fa-clone"
            checked={_.includes(filter, 0)}
            onChange={() => handleCheck(0)}
          />
          <Checkbox
            className="col-span-4 md:col-span-2 lg:col-span-1"
            label="Duplicate item"
            icon="fa-solid fa-clone"
            checked={_.includes(filter, 2)}
            onChange={() => handleCheck(2)}
          />
          <Checkbox
            className="col-span-4 md:col-span-2 lg:col-span-1"
            label="Normal log"
            icon="fa-solid fa-clone"
            checked={_.includes(filter, 200)}
            onChange={() => handleCheck(200)}
          />
          {/* Paginate */}
          <div className="col-span-4 md:col-span-2 md:col-start-3 lg:col-span-1 lg:col-start-4 w-full flex justify-end items-center">
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

      {data?.result?.length > 0 ? (
        <div className="space-y-2 mb-6">
          {Children.toArray(
            data.result.map((item) => <DataRecord item={item} />),
          )}
        </div>
      ) : (
        <div className="w-full py-20 overflow-auto mb-6 text-slate-300">
          <div className="grid place-items-center gap-2">
            <Icon className="text-[3rem] opacity-75" icon="fa-solid fa-inbox" />
            <h1 className="text-sm font-semibold">There is nothing here.</h1>
          </div>
        </div>
      )}
    </>
  );
};

export default Page;
