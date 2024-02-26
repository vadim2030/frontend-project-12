import { Button, ButtonGroup, Dropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { switchChannel } from '../../slices/channelSlice';
import { openModal } from '../../slices/modalSlice';

const ChannelBtn = ({ channel }) => {
  const dispatch = useDispatch();
  const { id, name, removable: isRemovable } = channel;
  const { currentChannelID } = useSelector((state) => state.channelData);

  const handleRemoveModal = () => {
    dispatch(openModal({
      type: 'removeChannel',
      chnId: id,
      isOpened: true,
    }));
  };
  const handleRenameModal = () => {
    dispatch(openModal({
      type: 'renameChannel',
      isOpened: true,
      chnId: id,
    }));
  };

  if (!isRemovable) {
    return (
      <li className="nav-item w-100">
        <Button onClick={() => dispatch(switchChannel(id))} className="w-100 rounded-0 text-start" variant={id === currentChannelID ? 'secondary' : ''}>
          <span className="me-1">#</span>
          {name}
        </Button>
      </li>
    );
  }

  return (
    <li className="nav-item w-100">
      <ButtonGroup className="d-flex dropdown">
        <Button onClick={() => dispatch(switchChannel(id))} className="w-100 rounded-0 text-start text-truncate" variant={id === currentChannelID ? 'secondary' : ''}>
          <span className="me-1">#</span>
          {name}
        </Button>
        <Dropdown>
          <Dropdown.Toggle style={{ borderRadius: 0 }} className="flex-grow-0 dropdown-toggle dropdown-toggle-split" variant={id === currentChannelID ? 'secondary' : ''}>
            <span className="visually-hidden">Управление каналом</span>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={handleRemoveModal}>Удалить</Dropdown.Item>
            <Dropdown.Item onClick={handleRenameModal}>Переименовать</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </ButtonGroup>
    </li>
  );
};

export default ChannelBtn;
