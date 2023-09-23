'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import _ from 'lodash';
import { toastError, toastSuccess } from '@components/toast';
import PageHeader from '@components/pageHeader';
import SpringButton from '@components/springButton';
import Icon from '@components/icon';
import InputWithTitle from '@components/inputWithTitle';
import MultiComboBox from '@components/multiComboBox';
import Dropdownbox from '@components/dropdownBox';
import config from '@config/default.json';
import ContentSection from './contentSection';
import SectionHeader from './sectionHeader';
// Service
import resourceService from '@services/contents/resourceService';
import tagService from '@services/contents/tagService';
import categoryService from '@services/contents/categoryService';
import supplierService from '@services/contents/supplierService';
import collectionService from '@services/contents/collectionService';

const ResourceCreationPage = ({ params }) => {
  const { id } = params;

  const router = useRouter();
  const [supplier, setSupplier] = useState([]);
  const [collection, setCollection] = useState([]);
  const [resource, setResource] = useState({
    title: '',
    thumbnail: {},
    price: 0,
    tag: [],
    category: [],
    supplier: {},
    file_properties: {},
    preview_data: [],
  });

  useEffect(() => {
    const getSupplier = () => {
      supplierService
        .retrieve()
        .then((res) => {
          let supplier = res.data.data.result;
          setSupplier(supplier);
        })
        .catch((error) => {
          toastError(error.response.data.message);
        });
    };
    getSupplier();
  }, []);

  useEffect(() => {
    const getCollection = () => {
      collectionService
        .retrieve({ search: resource.title })
        .then((res) => {
          let collections = [
            { _id: 'new', title: 'New Collection' },
            ...res.data.data.result,
          ];
          setCollection(collections);
        })
        .catch((error) => {
          toastError(error.response.data.message);
        });
    };
    getCollection();
  }, [resource.title]);

  useEffect(() => {
    if (id !== 'add') {
      const getData = async () => {
        try {
          const res = await resourceService.retrieve({ id });
          setResource(res.data.data.result[0]);
        } catch (error) {
          toastError(error.response.data.message);
        }
      };
      getData();
    }
  }, []);

  // 资源对象属性更新函数
  const handleResource = (prop, value, removeOnEmpty = false) => {
    setResource((prev) => {
      if (removeOnEmpty && !value) {
        // 如果值不存在且removeOnEmpty为true，则创建一个不包含该属性的新对象
        const { [prop]: _, ...newState } = prev;
        return newState;
      } else {
        // 否则，返回原始状态
        return { ...prev, [prop]: value };
      }
    });
  };

  // 上传缩略图
  const handleUpload = async (e) => {
    const data = new FormData();
    data.append('file', e.target.files[0]);
    try {
      const res = await resourceService.upload(data);
      handleResource('thumbnail', _.pick(res.data.data, ['_id', 'file_name']));
      if (res.data.data.similarity && res.data.data.similarity.length !== 0) {
        toastError('similar image detected');
      }
    } catch (error) {
      toastError(error.message);
    }
  };

  // 格式化数据,将对象转换为id
  const formatData = (data, fields) => {
    return _.mapValues(data, (value, key) => {
      if (_.includes(fields, key)) {
        if (Array.isArray(value)) {
          return value.map((item) => item._id);
        } else if (_.isObject(value)) {
          return value._id;
        }
      }
      return value;
    });
  };

  // 资源提交函数
  const handleSubmission = async (data) => {
    try {
      let formattedData = formatData(data, [
        'tag',
        'category',
        'collection_id',
        'thumbnail',
      ]);
      formattedData.supplier = formatData(formattedData.supplier, ['ref']);
      // 将preview_data中每个item的data从对象数组转换为id数组
      formattedData.preview_data = formattedData.preview_data.map((item) => {
        return {
          type: item.type,
          data: item.data.map((i) => i._id),
        };
      });
      let res;
      if (id === 'add') {
        res = await resourceService.create(null, formattedData);
      } else {
        res = await resourceService.update(id, formattedData);
      }
      toastSuccess(res.data.message);
      router.back();
    } catch (error) {
      toastError(error.response.data.message);
    }
  };

  return (
    <>
      <PageHeader
        title="Create New Resource"
        digest="Here you can create new resource with full properties."
        onBack={true}
      >
        <SpringButton
          onClick={() => handleSubmission(resource)}
          className="group btn h-10 bg-theme-pink text-white"
        >
          <span className="text-sm">
            <Icon icon="fa-solid fa-floppy-disk" className="mr-2" />
            Save
          </span>
        </SpringButton>
      </PageHeader>

      {/* General information */}
      <SectionHeader title="Details" icon="fa-solid fa-circle-info">
        <div className="grid grid-rows-5 grid-cols-6 gap-y-6 gap-x-8 mb-6">
          {/* Recourse Title */}
          <InputWithTitle
            className="col-span-6 md:col-span-4"
            title="Title"
            value={resource.title}
            onChange={(e) => handleResource('title', e.target.value)}
          />
          {/* Thumbnail */}
          <div className="row-span-3 col-span-6 md:col-span-2 flex flex-col gap-2 relative">
            <span className="text-sm pl-1 text-slate-800">Thumbnail</span>
            <div className="h-full w-full relative overflow-hidden rounded-2xl">
              <div className="absolute z-50 pointer-events-none w-full h-full flex justify-around items-center text-slate-400">
                <div
                  className={`${
                    _.isEmpty(resource.thumbnail)
                      ? 'opacity-100 visible'
                      : 'opacity-0 invisible'
                  } w-1/2 flex flex-col items-center gap-2`}
                >
                  <Icon className="text-3xl" icon="fa-solid fa-image" />
                  <span className="text-xs">Choose thumbnail</span>
                </div>
              </div>
              <div
                onClick={(e) => e?.currentTarget?.firstElementChild?.click()}
                className="bg-slate-50 w-full h-full bg-center bg-cover rounded-xl"
                style={{
                  backgroundImage: `url(${config.contentPath}/${resource.thumbnail.file_name})`,
                }}
              >
                <input
                  type="file"
                  accept=".jpg,.jpeg,.png,.webp"
                  className="hidden"
                  onChange={(e) => handleUpload(e)}
                />
              </div>
            </div>
          </div>
          {/* Digest */}
          <InputWithTitle
            className="col-span-6 md:col-span-2"
            title="Digest"
            value={resource.digest}
            onChange={(e) => handleResource('digest', e.target.value, true)}
          />
          {/* Collection */}
          <Dropdownbox
            className="col-span-6 md:col-span-2"
            title="Collection"
            placeholder={resource?.collection_id?.title || 'No Collection'}
            data={collection}
            onSelect={(item) => {
              handleResource('collection_id', item || null, true);
            }}
          />
          {/* Category */}
          <MultiComboBox
            className="col-span-6 md:col-span-4"
            title="Category"
            service={categoryService.retrieve}
            selectedData={resource.category}
            onSelect={(data) => handleResource('category', data)}
            limit={3}
          />
          {/* Tag */}
          <MultiComboBox
            className="col-span-6 md:col-span-6"
            title="Tag"
            service={tagService.retrieve}
            selectedData={resource.tag}
            onSelect={(data) => handleResource('tag', data)}
            limit={15}
          />
          {/* Supplier */}
          <Dropdownbox
            className="col-span-6 md:col-span-2"
            title="Supplier"
            placeholder={resource?.supplier?.ref?.name || '下拉选择供应商'}
            data={supplier}
            onSelect={(item) =>
              handleResource('supplier', {
                ...resource.supplier,
                ref: item._id,
              })
            }
          />
          {/* Supplier URL */}
          <InputWithTitle
            className="col-span-6 md:col-span-4"
            title="Supplier URL"
            value={resource.supplier.url}
            onChange={(e) =>
              handleResource('supplier', {
                ...resource.supplier,
                url: e.target.value,
              })
            }
          />
        </div>
      </SectionHeader>

      {/* Attachment information */}
      <SectionHeader title="Additional" icon="fa-solid fa-box-archive">
        <div className="grid grid-cols-3 gap-y-6 gap-x-8 mb-6">
          <Dropdownbox
            className="col-span-1"
            title="Price"
            placeholder={resource?.price || '下拉选择价格'}
            data={[{ title: '1.99' }, { title: '2.99' }, { title: '3.99' }]}
            onSelect={(item) => handleResource('price', item.title)}
          />
          <Dropdownbox
            className="col-span-1"
            title="File Type"
            placeholder={resource?.file_properties?.type || '下拉选择附件类型'}
            data={[
              { title: 'Photoshop' },
              { title: 'C4D' },
              { title: '3DMAX' },
            ]}
            onSelect={(item) =>
              handleResource('file_properties', {
                ...resource.file_properties,
                type: item.title,
              })
            }
          />
          <InputWithTitle
            className="col-span-1"
            title="File Size"
            value={resource.file_properties.size || ''}
            onChange={(e) =>
              handleResource(
                'file_properties',
                {
                  ...resource.file_properties,
                  size: e.target.value,
                },
                true,
              )
            }
          />
          <InputWithTitle
            className="col-span-3"
            title="Donwload URL"
            value={resource.file_properties.url || ''}
            onChange={(e) =>
              handleResource('file_properties', {
                ...resource.file_properties,
                url: e.target.value,
              })
            }
          />
        </div>
      </SectionHeader>

      {/* Content data */}
      <ContentSection
        selectedData={resource.preview_data}
        setSelectedData={(data) => handleResource('preview_data', data)}
      />
    </>
  );
};

export default ResourceCreationPage;
