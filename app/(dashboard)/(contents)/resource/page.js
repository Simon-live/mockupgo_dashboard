'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { toastError } from '@components/toast';
import PageHeader from '@components/pageHeader';
import SearchBar from '@components/searchBar';
import SpringButton from '@components/springButton';
import Icon from '@components/icon';
import DataTable from '@components/dataTable';
import DataRecord from './dataRecord';
// Service
import resourceService from '@services/contents/resourceService';

const Resource = () => {
  // 数据列表
  const [data, setData] = useState({});
  // 索引条件
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState({ name: '', order: 1 });
  const [searchField, setField] = useState('');

  const getData = async () => {
    try {
      const res = await resourceService.retrieve({
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
    { title: 'Thumbnail', value: 'thumbnail' },
    { title: 'Title', value: 'title' },
    { title: 'Price', value: 'price', isSorted: true },
    { title: 'Supplier', value: 'supplier' },
    { title: 'Collection', value: 'collection_id' },
    { title: 'Create Time', value: 'create_date', isSorted: true },
    { title: 'Publish', value: 'is_published' },
    { title: 'Operation' },
  ];

  // 初始化数据列表
  useEffect(() => {
    getData();
  }, [page, sort]);

  return (
    <div>
      <PageHeader
        title="Resource"
        digest="Organise, modify and config your resources."
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
          controlBtn: (
            <SpringButton className="btn">
              <Link href="/resource/add">
                <span className="text-sm">
                  <Icon icon="fa-solid fa-plus" className="mr-2" />
                  Add
                </span>
              </Link>
            </SpringButton>
          ),
        }}
      />
    </div>
  );
};

export default Resource;
