'use client';
import { useEffect, useState } from 'react';
import { toastError } from '@components/toast';
import PageHeader from '@components/pageHeader';
import SearchBar from '@components/searchBar';
import DataTable from '@components/dataTable';
import DataRecord from './dataRecord';

import collectionService from '@services/contents/collectionService';

const Collection = () => {
  const [data, setData] = useState({});
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState({ name: '', order: 1 });
  const [searchField, setField] = useState('');

  const getData = async () => {
    try {
      const res = await collectionService.retrieve({
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
    { title: 'Title', value: 'title' },
    { title: 'Create Time', value: 'date', isSorted: true },
    { title: 'Items', value: 'related_item', isSorted: true },
    { title: 'Operation' },
  ];

  // 初始化数据列表
  useEffect(() => {
    getData();
  }, [page, sort]);

  return (
    <div>
      <PageHeader
        title="Collection"
        digest="Organise, modify and config your Collection."
        onBack={true}
      />

      <SearchBar
        {...{
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
        }}
      />
    </div>
  );
};

export default Collection;
