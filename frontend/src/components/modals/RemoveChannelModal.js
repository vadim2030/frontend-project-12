import { Modal, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { closeModal } from '../../slices/uiSlice';
import { useRemoveChannelMutation } from '../../services/chatApi';

const RemoveChannelModal = () => {
  const { t } = useTranslation();
  const { isOpened, chnId } = useSelector((state) => state.ui.modal);
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
      toast.success(t('notifications.removeChannelSuccess'));
    } catch (err) {
      btnRemove.current.disabled = false;
      toast.error(t('notifications.networkError'));
    }
  };

  return (
    <Modal show={isOpened} onHide={handleClose} dialogClassName="modal-dialog-centered">
      <Modal.Header closeButton>
        <Modal.Title className="modal-title h4">{t('modals.RemoveChannel.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{t('modals.RemoveChannel.textBox')}</p>
        <Modal.Footer className="d-flex justify-content-end">
          <Button className="me-2 btn btn-secondary" onClick={handleClose} type="button">{t('modals.btnCancel')}</Button>
          <Button className="btn btn-danger" ref={btnRemove} onClick={handleRemoveChannel} type="button">{t('modals.btnRemove')}</Button>
        </Modal.Footer>
      </Modal.Body>
    </Modal>
  );
};

export default RemoveChannelModal;
