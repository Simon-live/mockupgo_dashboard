import { Children, useEffect, useState } from 'react';
import _ from 'lodash';
import config from '@config/default.json';
import { toastError, toastSuccess } from '@components/toast';
import SpringButton from '@components/springButton';
import MultiComboBox from '@components/multiComboBox';
import Dropdownbox from '@components/dropdownBox';
import Icon from '@components/icon';
import SideBar from '@components/sideBar';
// Modal
import TagCreationModal from '../../tag/tagCreationModal';
import CategoryCreationModal from '../../category/categoryCreationModal';
// Service
import tagService from '@services/contents/tagService';
import categoryService from '@services/contents/categoryService';
import collectionService from '@services/contents/collectionService';
import resourceService from '@services/contents/resourceService';

const ReviewComponent = ({ item, getData }) => {
  const [visibility, setVisibility] = useState(false);
  const [collection, setCollection] = useState([]);
  const [resource, setResource] = useState({});
  // Modal
  const [tagModalVisibility, setTagModalVisibility] = useState(false);
  const [categoryModalVisibility, setCategoryModalVisibility] = useState(false);

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

  // 格式化数据,将对象转换为id，例如：{tag: [{_id: "1", name: "tag1"}, {_id: "2", name: "tag2"}]} => {tag: ["1", "2"]}
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

  // 获取Collection数据
  const getCollection = () => {
    collectionService
      .retrieve({
        search: item.title,
      })
      .then((res) => {
        const collections = res.data.data.result;

        // 如果返回结果的第一项完全匹配当前标题，则将其置顶，新建选择放在第二个位置
        if (
          collections[0] &&
          collections[0].title === item.title.toLowerCase()
        ) {
          setCollection([
            collections[0],
            { _id: 'new', title: 'New Collection' },
            ...collections.slice(1),
          ]);
          handleResource('collection_id', collections[0], true);
        } else {
          setCollection([
            { _id: 'new', title: 'New Collection' },
            ...collections,
          ]);
        }
      })
      .catch((error) => {
        toastError(error.response.data.message);
      });
  };

  // 资源提交函数
  const handleSubmission = async (id, data) => {
    try {
      let formattedData = formatData(data, [
        'tag',
        'category',
        'collection_id',
        'thumbnail',
      ]);
      // 将preview_data中每个item的data从对象数组转换为id数组
      formattedData.preview_data = formattedData.preview_data.map((item) => {
        return {
          type: item.type,
          data: item.data.map((i) => i._id),
        };
      });
      // 从爬虫数据导入资源需要提供该crawler_data的id
      const res = await resourceService.create(id, formattedData);
      const { code, message } = res.data;
      if (code === 1) {
        getData();
        setVisibility(!visibility);
        toastSuccess(message);
      }
    } catch (error) {
      toastError(error.response.data.message);
    }
  };

  // 初始化函数，绑定触发按钮
  const handleInit = () => {
    setVisibility(!visibility);
    getCollection();
  };

  useEffect(() => {
    setResource({
      title: item.title,
      thumbnail: item.thumbnail,
      price: item.price,
      tag: [],
      category: [],
      supplier: {
        ref: item.crawler.supplier,
        url: item.url,
      },
      file_properties: item.file_properties,
      preview_data: item.preview_data,
    });
  }, [visibility]);

  return (
    <>
      {/* Trigger Button */}
      <SpringButton
        onClick={() => handleInit()}
        className="text-teal-400 bg-teal-400/10 btn-icon bg-slate-100 text-xs"
      >
        <Icon icon="fa-solid fa-file-import" />
      </SpringButton>
      <SideBar visibility={visibility} setVisibility={setVisibility}>
        <div className="w-full h-full relative bg-white">
          <div className="w-full h-full pt-10 px-8 space-y-4 overflow-y-auto">
            {/* Header */}
            <div className="space-y-2">
              <h1 className="font-semibold text-4xl whitespace-normal">
                {item.title}
              </h1>
              <p className="text-xs text-slate-300 whitespace-normal">
                {item.description || "Please review the data below and confirm the creation of the resource."}
              </p>
            </div>
            {/* Thumbnail preview */}
            <div
              className="bg-slate-100 w-full h-2/5 bg-center bg-cover rounded-xl"
              style={{
                backgroundImage: `url(${config.contentPath}/${item?.thumbnail?.file_name})`,
              }}
            ></div>

            <div className="w-full grid grid-cols-2 gap-4">
              {/* Category */}
              <div className="col-span-2 space-y-2">
                <MultiComboBox
                  className="w-full"
                  title="Category(less than 3)"
                  onNew={() =>
                    setCategoryModalVisibility(!categoryModalVisibility)
                  }
                  service={categoryService.retrieve}
                  selectedData={resource.category}
                  onSelect={(data) => handleResource('category', data)}
                  limit={3}
                />
                {item.category && item.category.length > 0 && (
                  <ul className="flex gap-2 flex-wrap">
                    {Children.toArray(
                      item.category.map((i) => (
                        <li className="bg-slate-50 text-xs text-slate-400 px-2 py-1 rounded space-x-2 flex items-center">
                          <span className="whitespace-nowrap">{i}</span>
                        </li>
                      )),
                    )}
                  </ul>
                )}
              </div>
              {/* Tag */}
              <div className="col-span-2">
                <MultiComboBox
                  className="w-full"
                  title="Tag(less than 15)"
                  onNew={() => setTagModalVisibility(!tagModalVisibility)}
                  service={tagService.retrieve}
                  selectedData={resource.tag}
                  onSelect={(data) => handleResource('tag', data)}
                  limit={15}
                />
                {item.tag && item.tag.length > 0 && (
                  <ul className="flex gap-2 flex-wrap">
                    {Children.toArray(
                      item.tag.map((i) => (
                        <li className="bg-slate-50 text-xs text-slate-400 px-2 py-1 rounded space-x-2 flex items-center">
                          <span className="whitespace-nowrap">{i}</span>
                        </li>
                      )),
                    )}
                  </ul>
                )}
              </div>
              {/* Collection */}
              <Dropdownbox
                className="col-span-1"
                title="Collection"
                isDefault={collection[0] && collection[0]._id !== 'new'}
                placeholder="No Collection"
                data={collection}
                onSelect={(item) => {
                  handleResource('collection_id', item || null, true);
                }}
              />
              {/* Price */}
              <Dropdownbox
                className="col-span-1"
                title="Price"
                isDefault={visibility}
                data={[
                  { title: (item.price).toString() },
                  { title: '1.0' },
                  { title: '2.0' },
                  { title: '3.0' },
                ]}
                onSelect={(item) => handleResource('price', item.title)}
              />
            </div>
          </div>

          {/* Button */}
          <div className="absolute bottom-0 left-0 w-full px-8 pb-10 grid grid-cols-2 gap-4 bg-white">
            {/* Cancel */}
            <SpringButton
              onClick={() => {
                setVisibility(!visibility);
              }}
              className="col-span-1 btn py-3 font-medium"
            >
              Cancel
            </SpringButton>
            {/* Confirm */}
            <SpringButton
              disabled={
                (resource.tag && resource.tag.length === 0) ||
                (resource.category && resource.category.length === 0)
              }
              onClick={() => handleSubmission(item._id, resource)}
              className="col-span-1 btn-primary py-3 font-medium"
            >
              Confirm
            </SpringButton>
          </div>
        </div>
      </SideBar>
      {/* Modal */}
      <TagCreationModal
        visibility={tagModalVisibility}
        setVisibility={setTagModalVisibility}
      />
      <CategoryCreationModal
        visibility={categoryModalVisibility}
        setVisibility={setCategoryModalVisibility}
      />
    </>
  );
};

export default ReviewComponent;
