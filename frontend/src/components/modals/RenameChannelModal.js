import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button, Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useContext, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useRenameChannelMutation } from '../../services/chatApi';
import { closeModal } from '../../slices/modalSlice';
import { FilterContext } from '../../hoc/FilterProfanityProvider';

const RenameChannelModal = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { isOpened, chnId } = useSelector((state) => state.modal);
  const { channels } = useSelector((state) => state.channelData);
  const { name: initialNameChannel } = channels.find((chl) => chl.id === chnId);
  const channelNames = channels.map((chl) => chl.name);
  const btnSubmit = useRef(null);
  const [renameChannel] = useRenameChannelMutation();
  const handleClose = () => dispatch(closeModal());
  const inputRef = useRef(null);
  const filter = useContext(FilterContext);

  const newChannelSchema = yup.object().shape({
    name: yup.string().required().trim().min(3, t('modals.errors.minLength'))
      .max(20, t('modals.errors.maxLength'))
      .test({
        message: t('modals.errors.uniqueName'),
        test: (newName) => !channelNames.includes(newName),
      }),
  });

  const formik = useFormik({
    initialValues: {
      name: initialNameChannel,
    },
    validationSchema: newChannelSchema,
    onSubmit: async ({ name }) => {
      try {
        btnSubmit.current.disabled = true;
        const response = await renameChannel({
          name: filter.clean(name),
          id: chnId,
        });
        if (response.error) throw new Error(response.error);
        handleClose();
        toast.success(t('notifications.renameChannelSuccess'));
      } catch (err) {
        btnSubmit.current.disabled = false;
        toast.error(t('notifications.networkError'));
      }
    },
  });

  const {
    handleChange, handleSubmit, values: { name }, isValid, errors, touched,
  } = formik;

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <Modal onHide={handleClose} show={isOpened} dialogClassName="modal-dialog-centered">
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.RenameChannel.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formNewNameChl">
            <Form.Label className="visually-hidden">{t('modals.RenameChannel.lable')}</Form.Label>
            <Form.Control
              ref={inputRef}
              onChange={handleChange}
              name="name"
              value={name}
              type="text"
              required
              isInvalid={touched.name && errors.name}
            />
            {!isValid && <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>}
          </Form.Group>
          <Modal.Footer>
            <Button onClick={handleClose} type="button">{t('modals.btnCancel')}</Button>
            <Button ref={btnSubmit} type="submit">{t('modals.btnSend')}</Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RenameChannelModal;
