'use client';
import { useEffect, useState } from 'react';
import { toastError } from '@components/toast';
import PageHeader from '@components/pageHeader';
import SearchBar from '@components/searchBar';
import DataTable from '@components/dataTable';
import SpringButton from '@components/springButton';
import Icon from '@components/icon';
import DataRecord from './dataRecord';
import SupplierCreationModal from './supplierCreationModal';
// Services
import supplierService from '@services/contents/supplierService';

const Supplier = () => {
  // 数据列表
  const [data, setData] = useState({});
  // 索引条件
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState({ name: '', order: 1 });
  const [searchField, setField] = useState('');
  // Modal
  const [visibility, setVisibility] = useState(false);

  // 异步数据请求
  const getData = async () => {
    try {
      const res = await supplierService.retrieve({
        pageNumber: page,
        ...(sort.name && {
          sort: sort.name,
          order: sort.order,
        }),
        ...(searchField && { search: searchField }),
      });
      setData(res.data.data);
    } catch (error) {
      toastError(error.response.data.message);
    }
  };

  const tableHeader = [
    { title: 'No' },
    { title: 'Icon', value: 'icon' },
    { title: 'Name', value: 'name' },
    { title: 'URL', value: 'url' },
    { title: 'Create Time', value: 'date', isSorted: true },
    { title: 'Items', value: 'related_item', isSorted: true },
    { title: 'Operation' },
  ];

  // 初始化数据列表
  useEffect(() => {
    getData();
  }, [page, sort]);

  return (
    <>
      <PageHeader
        title="Supplier"
        digest="Organise, modify and config your suppliers."
        onBack={true}
      />

      <SearchBar
        {...{
          title: '搜索溯源链',
          fieldData: searchField,
          onType: setField,
          getData,
          setPage,
        }}
      />

      <DataTable
        {...{
          data,
          getData,
          page,
          setPage,
          sort,
          setSort,
          tableHeader,
          DataRecord,
          controlBtn: (
            <SpringButton
              onClick={() => setVisibility(!visibility)}
              className="btn"
            >
              <span className="text-sm">
                <Icon icon="fa-solid fa-plus" className="mr-2" />
                Add
              </span>
            </SpringButton>
          ),
        }}
      />
      {/* Modal */}
      <SupplierCreationModal
        visibility={visibility}
        setVisibility={setVisibility}
        onComplete={() => {
          getData();
          setPage(1);
        }}
      />
    </>
  );
};

export default Supplier;
