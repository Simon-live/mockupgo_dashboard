'use client';
import { Children, useEffect, useState } from 'react';
import { toastError } from '@components/toast';
import PageHeader from '@components/pageHeader';
import SpringButton from '@components/springButton';
import Dropdownbox from '@components/dropdownBox';
import Icon from '@components/icon';
import DataCard from './dataCard';
import CrawlerCreationModal from './crawlerCreationModal';
// Service
import crawlerService from '@services/contents/crawlerService';

const Crawler = () => {
  // 标签数据列表
  const [data, setData] = useState({});
  const [filter, setFilter] = useState(null);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState('');
  const [sortOrder, setSortOrder] = useState(-1);
  // Modal
  const [visibility, setVisibility] = useState(false);

  // 异步数据请求
  const getData = async () => {
    try {
      const res = await crawlerService.retrieve({
        pageNumber: page,
        ...(filter && { filter }),
        ...(sort && { sort }),
        ...(sortOrder && { order: sortOrder }),
      });
      setData(res.data.data);
    } catch (error) {
      toastError(error.response.data.message);
    }
  };

  // 初始化数据列表
  useEffect(() => {
    getData();
  }, [page, sort, sortOrder, filter]);

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
        title="Crawler"
        digest="Organise, modify and config your crawlers"
      >
        {/* 新建按钮 */}
        <SpringButton
          onClick={() => setVisibility(!visibility)}
          className="btn-primary h-10"
        >
          <span className="text-sm">
            <Icon icon="fa-solid fa-plus" className="mr-2" />
            Add
          </span>
        </SpringButton>
      </PageHeader>

      {/* 综合操作 */}
      <div className="w-full py-6 px-6 bg-white rounded-xl mb-6">
        <div className="grid grid-cols-4 gap-2">
          {/* 爬虫状态筛选 */}
          <Dropdownbox
            className="col-span-4 md:col-span-2 lg:col-span-1"
            icon="fa-solid fa-filter"
            isDefault={true}
            data={[
              { title: 'All', value: null },
              { title: 'Waiting', value: 'waiting' },
              { title: 'Processing', value: 'processing' },
            ]}
            onSelect={(item) => {
              setFilter(item.value);
            }}
          />
          {/* 排序条件选择 */}
          <Dropdownbox
            className="col-span-4 md:col-span-2 lg:col-span-1"
            icon="fa-solid fa-sort"
            isDefault={true}
            data={[
              { title: 'Newest', value: 'create_date', order: -1 },
              { title: 'Oldest', value: 'create_date', order: 1 },
            ]}
            onSelect={(item) => {
              setSort(item.value);
              setSortOrder(item.order);
            }}
          />
          <div className="col-span-4 md:col-start-5 md:col-span-2 lg:col-start-5 lg:col-span-1 flex gap-2 justify-end">
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

      {/* 数据列表 */}
      {data.total && data.total !== 0 ? (
        <div className="grid grid-cols-6 gap-3">
          {Children.toArray(
            data.result.map((crawler) => (
              <DataCard {...{ crawler, getData }} />
            )),
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

      {/* Modal */}
      <CrawlerCreationModal
        {...{
          visibility,
          setVisibility,
          onComplete: () => {
            if (page === 1) {
              getData();
            } else {
              setPage(1);
            }
          },
        }}
      />
    </div>
  );
};

export default Crawler;
