import { useSelector } from 'react-redux';
import { useEffect, useRef } from 'react';
import NewMessageForm from './NewMessageForm';

const Chat = () => {
  const chatRef = useRef(null);
  const { currentChannelID, channels } = useSelector((state) => state.channelData);
  const { messages } = useSelector((state) => state.messagesData);
  const currentMessages = messages.filter(({ channelId }) => channelId === currentChannelID);
  const channelName = channels.find((channel) => channel.id === currentChannelID).name;

  useEffect(() => {
    const { scrollHeight } = chatRef.current;
    chatRef.current.scroll(0, scrollHeight);
  }, [currentMessages]);

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b>
              #
              {' '}
              {channelName}
            </b>
          </p>
          <span className="text-muted">
            {currentMessages.length}
            {' '}
            сообщений
          </span>
        </div>
        <div ref={chatRef} className="chat-messages overflow-auto px-5 ">
          {currentMessages.map(({ username, id, body }) => (
            <div key={id} className="text-break mb-2">
              <b>{username}</b>
              {`: ${body}`}
            </div>
          ))}
        </div>
        <NewMessageForm />
      </div>
    </div>
  );
};

export default Chat;
