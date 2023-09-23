import { useState } from 'react';
import Link from 'next/link';
import SpringButton from '@components/springButton';
import Icon from '@components/icon';
import { toastError, toastSuccess } from '@components/toast';
import CrawlerRemovingModal from './crawlerRemovingModal';
// Service
import crawlerService from '@services/contents/crawlerService';

const DataCard = ({ crawler, getData }) => {
  const {
    _id: id,
    supplier,
    status,
    run_count,
    count,
    create_date,
    last_started_at,
  } = crawler;
  const updateDate = new Date(last_started_at);
  const [visibility, setVisibility] = useState(false);

  // 启动爬虫
  const handleStart = async (id) => {
    try {
      const res = await crawlerService.start({ id });
      getData();
      toastSuccess(res.data.message);
    } catch (error) {
      toastError(error.response.data.message);
    }
  };

  // 暂停爬虫
  const handlePause = async (id) => {
    try {
      const res = await crawlerService.suspended({ id });
      getData();
      toastSuccess(res.data.message);
    } catch (error) {
      toastError(error.response.data.message);
    }
  };

  const calculateDaysBetween = (d1, d2) => {
    let date1 = new Date(d1);
    let date2 = new Date(d2);

    // 确保输入是Date对象
    if (!(date1 instanceof Date) || !(date2 instanceof Date)) {
      return 'Both date1 and date2 must be Date objects';
    }

    // 计算两个日期之间的毫秒数
    const diff = Math.abs(date2.getTime() - date1.getTime());

    // 将毫秒转换为天数
    const diffDays = Math.ceil(diff / (1000 * 60 * 60 * 24));

    return diffDays;
  };

  return (
    <>
      <div className="py-6 px-6 space-y-6 col-span-6 md:col-span-3 lg:col-span-2 bg-white rounded-xl">
        <div className="flex items-start justify-between">
          <div className="flex flex-col overflow-hidden">
            <span className="text-xl font-medium">
              {(supplier?.name).toUpperCase()}
            </span>
            <span className="text-xs text-slate-300 font-light whitespace-nowrap text-ellipsis">
              ID: {id}
            </span>
          </div>
          {/* 爬虫状态按钮切换 */}
          {status === 'processing' ? (
            <SpringButton
              onClick={() => handlePause(id)}
              className="w-8 h-8 text-teal-400 bg-teal-400/10 btn-icon bg-slate-100 text-xs"
            >
              <Icon icon="fa-solid fa-pause" fade />
            </SpringButton>
          ) : (
            <SpringButton
              onClick={() => handleStart(id)}
              className="w-8 h-8 text-theme-pink bg-theme-pink/10 btn-icon bg-slate-100 text-xs"
            >
              <Icon icon="fa-solid fa-play" />
            </SpringButton>
          )}
        </div>
        {/* 爬虫入库进度百分比 */}
        <div className="space-y-2 relative">
          <div className="overflow-hidden h-2 mb-1 text-xs flex rounded bg-slate-100">
            <div
              style={{
                width:
                  count && count.total !== 0
                    ? Math.floor((count.storage / count.total) * 100)
                    : 0 + '%',
              }}
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-theme-blue"
            ></div>
          </div>
          <div className="flex items-center justify-between text-xs">
            {/* 入库数量统计 */}
            <span>
              {count.storage}/{count.total}
            </span>
            {/* 入库数量百分比 */}
            <span className="text-theme-blue">
              {count && count.total !== 0
                ? Math.floor((count.storage / count.total) * 100)
                : 0}
              %
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-2 overflow-hidden whitespace-nowrap">
            {/* 完成次数 */}
            <div className="col-span-1 flex items-center gap-3">
              <div className="w-12 h-12 flex items-center justify-center text-teal-400 text-xl bg-teal-400/10 p-s rounded-xl">
                <Icon
                  icon="fa-solid fa-robot"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-light text-xs">Finished</span>
                <span className="whitespace-nowrap text-ellipsis font-medium">
                  {run_count}
                </span>
              </div>
            </div>
            {/* 运行天数 */}
            <div className="col-span-1 flex items-center gap-3">
              <div className="w-12 h-12 flex items-center justify-center text-teal-400 text-xl bg-teal-400/10 p-s rounded-xl">
                <Icon
                  icon="fa-solid fa-stopwatch"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-light text-xs">Tracked</span>
                <span className="whitespace-nowrap text-ellipsis font-medium">
                  {last_started_at
                    ? calculateDaysBetween(last_started_at, create_date)
                    : '0'}
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* Buttons */}
        <div className="flex gap-2 items-center justify-between">
          <div className="flex gap-2 items-center">
            {/* Delete */}
            <SpringButton
              onClick={() => setVisibility(!visibility)}
              className="w-8 h-8 text-theme-pink bg-theme-pink/10 btn-icon bg-slate-100 text-xs"
            >
              <Icon icon="fa-solid fa-trash" />
            </SpringButton>
          </div>
          <div className="flex gap-2 items-center">
            {/* Log */}
            <SpringButton className="w-8 h-8 btn-icon text-slate-400 bg-slate-50 text-xs">
              <Link href={`/crawler/${id}/log`} className="text-sm">
                <Icon icon="fa-solid fa-triangle-exclamation" />
              </Link>
            </SpringButton>
            {/* Review */}
            <SpringButton className="h-8 text-theme-blue bg-theme-blue/5 btn px-4">
              <Link href={`/crawler/${id}`} className="text-sm">
                <Icon
                  icon="fa-solid fa-chart-simple"
                  className="mr-2 text-xs"
                />
                Review
              </Link>
            </SpringButton>
          </div>
        </div>
      </div>

      {/* Modal */}
      <CrawlerRemovingModal
        {...{
          visibility,
          setVisibility,
          onComplete: getData,
          data: crawler,
        }}
      />
    </>
  );
};

export default DataCard;
