import AddChannelModal from './AddChannelModal.js';
import RemoveChannelModal from './RemoveChannelModal.js';
import RenameChannelModal from './RenameChannelModal.js';

const modals = {
  addChannel: <AddChannelModal />,
  removeChannel: <RemoveChannelModal />,
  renameChannel: <RenameChannelModal />,
};

export default (type) => modals[type];
