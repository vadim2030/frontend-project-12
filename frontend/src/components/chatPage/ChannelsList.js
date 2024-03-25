import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useEffect, useRef } from 'react';
import { setCurrentChannelListPosition, openModal } from '../../slices/uiSlice';

import ChannelBtn from './ChannelBtn';

const ChannelsList = () => {
  const { t } = useTranslation();
  const { channels } = useSelector((state) => state.channelData);
  const { currentChannelListPosition } = useSelector((state) => state.ui);
  const startListRef = useRef(null);
  const endListRef = useRef(null);
  const dispatch = useDispatch();
  const handleOpenModal = () => {
    dispatch(openModal({
      type: 'addChannel',
      isOpened: true,
    }));
  };

  useEffect(() => {
    if (currentChannelListPosition === 'end') {
      endListRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
      dispatch(setCurrentChannelListPosition(null));
    }
    if (currentChannelListPosition === 'start') {
      startListRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      dispatch(setCurrentChannelListPosition(null));
    }
  }, [currentChannelListPosition]);

  return (
    <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>{t('ChatPage.ChannelsList.title')}</b>
        <button onClick={handleOpenModal} className="p-0 text-primary btn btn-group-vertical" type="button">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-plus-square" viewBox="0 0 16 16">
            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
          </svg>
          <span className="visually-hidden">{t('ChatPage.ChannelsList.btnAddChannel')}</span>
        </button>
      </div>
      <ul className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
        <div ref={startListRef} />
        {channels.map((channel) => (<ChannelBtn key={channel.id} channel={channel} />))}
        <div ref={endListRef} />
      </ul>
    </div>
  );
};

export default ChannelsList;
