'use client';
import { Children, useState } from 'react';
import _ from 'lodash';
import SectionHeader from './sectionHeader';
import Icon from '@components/icon';
import PreviewItem from './previewItem';
import ContentUploadModal from './contentUploadModal';

const ContentSection = ({ selectedData, setSelectedData }) => {
  // Popup Singal State
  const [popup, setPopup] = useState(false);

  return (
    <>
      {/* Section Title */}
      <SectionHeader title="Content" icon="fa-solid fa-folder-open">
        {/* Preview Data Table */}
        {selectedData && selectedData.length > 0 ? (
          <div className="grid grid-cols-12 gap-y-4 gap-x-6 mb-6">
            {Children.toArray(
              selectedData.map((i, index) => (
                <PreviewItem
                  details={i}
                  onDelete={() =>
                    setSelectedData(selectedData.filter((_, i) => i !== index))
                  }
                />
              )),
            )}
            {/* Last Item is Upload More */}
            <div
              onClick={() => setPopup(!popup)}
              className="h-40 col-span-3 space-y-2 rounded-xl border-2 border-dashed border-slate-200 hover:border-teal-400 transition-colors grid place-items-center cursor-pointer group"
            >
              <div className="grid place-items-center gap-2 text-slate-300 transition-colors group-hover:text-teal-400">
                <Icon
                  className="text-[3rem] opacity-75"
                  icon="fa-solid fa-cloud-arrow-up"
                />
                <h1 className="text-sm">Upload more</h1>
              </div>
            </div>
          </div>
        ) : (
          ''
        )}

        {/* Empty Notification */}
        {selectedData.length === 0 ? (
          <div
            onClick={() => setPopup(!popup)}
            className="w-full py-10 overflow-auto mb-6 text-slate-300 transition-colors hover:text-teal-400 cursor-pointer"
          >
            <div className="grid place-items-center gap-2">
              <Icon
                className="text-[3rem] opacity-75"
                icon="fa-solid fa-cloud-arrow-up"
              />
              <h1 className="text-sm">Upload your preview image</h1>
            </div>
          </div>
        ) : (
          ''
        )}
        {/* Image Upload Form */}
        <ContentUploadModal
          visibility={popup}
          onPopup={setPopup}
          handleSubmit={(item) => {
            setSelectedData([...selectedData, item]);
          }}
        />
      </SectionHeader>
    </>
  );
};

export default ContentSection;
