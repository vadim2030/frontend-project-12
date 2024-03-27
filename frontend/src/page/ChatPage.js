import { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import ChannelsList from '../components/chatPage/ChannelsList.js';
import { useGetChannelsQuery, useGetMessagesQuery } from '../services/chatApi';
import Chat from '../components/chatPage/Chat.js';
import { addMessage } from '../slices/messagesSlice.js';
import getModal from '../components/modals';
import { addChannel, removeChannel, renameChannel } from '../slices/channelSlice.js';
import { SocketContext } from '../providers/SocketProvider';

const ChatPage = () => {
  const socket = useContext(SocketContext);
  const dispatch = useDispatch();
  const { type } = useSelector((state) => state.ui.modal);
  const { isLoading: isLoadChannels } = useGetChannelsQuery();
  const { isLoading: isLoadMessages } = useGetMessagesQuery();

  useEffect(() => {
    socket.connect();
    socket.on('newMessage', (payload) => {
      dispatch(addMessage(payload));
    });
    socket.on('newChannel', (payload) => {
      dispatch(addChannel(payload));
    });
    socket.on('renameChannel', (payload) => {
      dispatch(renameChannel(payload));
    });
    socket.on('removeChannel', (payload) => {
      dispatch(removeChannel(payload));
    });
    return () => {
      socket.disconnect();
      socket.off('newMessage');
      socket.off('newChannel');
      socket.off('renameChannel');
      socket.off('removeChannel');
    };
  }, [dispatch]);

  if (isLoadChannels || isLoadMessages) return (<Loader />);

  return (
    <>
      <div className="container h-100 my-4 overflow-hidden rounded shadow">
        <div className="row h-100 bg-white flex-md-row">
          <ChannelsList />
          <Chat />
        </div>
      </div>
      {getModal(type)}
    </>
  );
};

export default ChatPage;
