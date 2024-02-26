import { Modal, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useRef } from 'react';
import { closeModal } from '../../slices/modalSlice';
import { useRemoveChannelMutation } from '../../services/chatApi';

const RemoveChannelModal = () => {
  const { isOpened, chnId } = useSelector((state) => state.modal);
  const dispatch = useDispatch();
  const handleClose = () => dispatch(closeModal());
  const [removeChannel] = useRemoveChannelMutation();
  const btnRemove = useRef(null);

  const handleRemoveChannel = async () => {
    try {
      btnRemove.current.disabled = true;
      const response = await removeChannel({ id: chnId });
      if (response.error) throw new Error(response.error);
      handleClose();
    } catch (err) {
      btnRemove.current.disabled = false;
      console.log('Произошла сетевая ошибка: ', err);
    }
  };

  return (
    <Modal show={isOpened} onHide={handleClose} dialogClassName="modal-dialog-centered">
      <Modal.Header closeButton>
        <Modal.Title className="modal-title h4">Удалить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">Уверены?</p>
        <Modal.Footer className="d-flex justify-content-end">
          <Button className="me-2 btn btn-secondary" onClick={handleClose} type="button">Отменить</Button>
          <Button className="btn btn-danger" ref={btnRemove} onClick={handleRemoveChannel} type="button">Удалить</Button>
        </Modal.Footer>
      </Modal.Body>
    </Modal>
  );
};

export default RemoveChannelModal;
