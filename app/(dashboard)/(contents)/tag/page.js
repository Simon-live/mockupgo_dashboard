'use client';
import { useEffect, useState } from 'react';
import { toastError } from '@components/toast';
import PageHeader from '@components/pageHeader';
import SearchBar from '@components/searchBar';
import DataTable from '@components/dataTable';
import Icon from '@components/icon';
import SpringButton from '@components/springButton';
import DataRecord from './dataRecord';
import TagCreationModal from './tagCreationModal';
// Service
import tagService from '@services/contents/tagService';

const Tag = () => {
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
      const res = await tagService.retrieve({
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
    { title: 'Related Item', value: 'related_item', isSorted: true },
    { title: 'Operation' },
  ];

  // 初始化数据列表
  useEffect(() => {
    getData();
  }, [page, sort]);

  return (
    <>
      <PageHeader
        title="Tag"
        digest="Organise, modify and config your tags."
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
      <TagCreationModal
        {...{
          visibility,
          setVisibility,
          onComplete: () => {
            getData();
            setPage(1);
          },
        }}
      />
    </>
  );
};

export default Tag;
