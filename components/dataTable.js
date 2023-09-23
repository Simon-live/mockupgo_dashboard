import { Children } from 'react';
import Icon from '@components/icon';
import SpringButton from '@components/springButton';

const DataTable = ({
  title,
  page,
  setPage,
  sort,
  setSort,
  data,
  getData,
  tableHeader,
  controlBtn,
  DataRecord,
}) => {
  const { total, pageNumber, pageSize, result } = data || {};

  const prevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const nextPage = () => {
    if (page < Math.ceil(total / pageSize)) {
      setPage(page + 1);
    }
  };

  const onSort = (path) => {
    if (path === sort.name) {
      const _type = sort.order === 1 ? -1 : 1;
      setSort({ name: path, order: _type });
    } else {
      setSort({ name: path, order: 1 });
    }
  };

  const onRefresh = () => {
    getData();
    setPage(1);
  };

  return (
    <section className="w-full py-4 px-6 bg-white rounded-xl">
      {/* 数据表顶部 */}
      <div className="w-full flex mb-6 justify-between items-center">
        <h1 className="font-medium text-lg">{title ? title : 'Data'}</h1>
        <div className="flex gap-2">
          {/* 顶部右侧控制按钮 */}
          {controlBtn ? controlBtn : ''}
          {/* 数据刷新按钮 */}
          <SpringButton
            onClick={() => onRefresh()}
            className="btn-icon bg-slate-100 text-sm"
          >
            <Icon icon="fa-solid fa-rotate-right" />
          </SpringButton>
        </div>
      </div>

      {/* 数据列表：没有数据或数据错误显示404组件 */}
      {total &&
      total !== 0 &&
      Array.isArray(tableHeader) &&
      Array.isArray(result) ? (
        <>
          <div className="w-full overflow-auto mb-6">
            <table className="w-full border-separate">
              {/* 
                数据列名参考格式：{ title:"", value:"", isSorted } 
                - title: 列名
                - value: 排序依据（严格与数据库数据属性名对照）
                - isSorted: 是否可排序
              */}
              <thead className="text-left text-slate-400">
                <tr className="text-sm whitespace-nowrap">
                  {Children.toArray(
                    tableHeader.map((item) => (
                      <th
                        className={`px-4 py-2 text-xs font-medium border-b-[1px] border-slate-100 ${
                          item.isSorted ? 'cursor-pointer' : ''
                        }`}
                        onClick={() => {
                          if (item.isSorted) onSort(item.value);
                        }}
                      >
                        {item.title.toLocaleUpperCase()}
                        {item.isSorted ? (
                          <Icon
                            icon="fa-solid fa-arrow-right-arrow-left"
                            className="rotate-90 text-xs ml-2 text-theme-blue"
                          />
                        ) : (
                          ''
                        )}
                      </th>
                    )),
                  )}
                </tr>
              </thead>
              {/* Table Body */}
              <tbody>
                {Children.toArray(
                  result.map((item, index) => (
                    <DataRecord {...{ tableHeader, item, index, getData }} />
                  )),
                )}
              </tbody>
            </table>
          </div>
          {/* 表格底部翻页按钮 */}
          {pageNumber && pageSize ? (
            <div className="w-full mb-2 flex justify-end items-center">
              <div className="flex gap-2">
                <SpringButton
                  disabled={parseInt(pageNumber) === 1}
                  onClick={() => prevPage()}
                  className="btn-icon bg-slate-100 text-sm"
                >
                  <Icon icon="fa-solid fa-angle-left" />
                </SpringButton>
                <div className="px-4 py-2 rounded-xl flex justify-center items-center">
                  <span className="text-slate-600 text-sm">
                    {pageNumber}/{Math.ceil(total / pageSize)}
                  </span>
                </div>
                <SpringButton
                  disabled={
                    parseInt(pageNumber) === Math.ceil(total / pageSize)
                  }
                  onClick={() => nextPage()}
                  className="btn-icon bg-slate-100 text-sm"
                >
                  <Icon icon="fa-solid fa-angle-right" />
                </SpringButton>
              </div>
            </div>
          ) : null}
        </>
      ) : (
        <div className="w-full py-20 overflow-auto mb-6 text-slate-300">
          <div className="grid place-items-center gap-2">
            <Icon className="text-[3rem] opacity-75" icon="fa-solid fa-inbox" />
            <h1 className="text-sm">There is nothing here.</h1>
          </div>
        </div>
      )}
    </section>
  );
};

export default DataTable;
