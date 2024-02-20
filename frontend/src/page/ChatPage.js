import { useEffect } from 'react';
import Loader from '../components/Loader';
import ChannelsList from '../components/chatPage/ChannelsList.js';
// import getRoutes from '../routes.js';
import { useGetChannelsQuery, useGetMessagesQuery } from '../services/chatApi';
import Chat from '../components/chatPage/Chat.js';

const ChatPage = () => {
  const { isLoading: isLoadChannels } = useGetChannelsQuery();
  const { isLoading: isLoadMessages } = useGetMessagesQuery();

  useEffect(() => {

  }, []);

  if (isLoadChannels || isLoadMessages) return (<Loader />);

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <ChannelsList />
        <Chat />
      </div>
    </div>
  );
};

export default ChatPage;
