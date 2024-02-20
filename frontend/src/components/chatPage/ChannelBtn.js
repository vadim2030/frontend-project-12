import { Button, ButtonGroup, Dropdown } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const ChannelBtn = ({ channel }) => {
  const { id, name, removable: isRemovable } = channel;

  const { currentChannelID } = useSelector((state) => state.channelData);

  if (!isRemovable) {
    return (
      <li className="nav-item w-100">
        <Button className="w-100 rounded-0 text-start" variant={id === currentChannelID ? 'secondary' : ''}>
          <span className="me-1">#</span>
          {name}
        </Button>
      </li>
    );
  }

  return (
    <li className="nav-item w-100">
      <ButtonGroup className="d-flex dropdown">
        <Button className="w-100 rounded-0 text-start text-truncate" variant={id === currentChannelID ? 'secondary' : ''}>
          <span className="me-1">#</span>
          {name}
        </Button>
        <Dropdown>
          <Dropdown.Toggle style={{ borderRadius: 0 }} className="flex-grow-0 dropdown-toggle dropdown-toggle-split" variant={id === currentChannelID ? 'secondary' : ''}>
            <span className="visually-hidden">Управление каналом</span>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item>Удалить</Dropdown.Item>
            <Dropdown.Item>Переименовать</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </ButtonGroup>
    </li>
  );
};

export default ChannelBtn;
