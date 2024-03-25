import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button, Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useContext, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { closeModal } from '../../slices/uiSlice';
import { useSendChannelMutation } from '../../services/chatApi';
import { FilterContext } from '../../hoc/FilterProfanityProvider';

const AddChannelModal = () => {
  const { t } = useTranslation();
  const { isOpened } = useSelector((state) => state.ui.modal);
  const { channels } = useSelector((state) => state.channelData);
  const dispatch = useDispatch();
  const handleClose = () => dispatch(closeModal());
  const [sendChannel] = useSendChannelMutation();
  const inputRef = useRef(null);
  const filter = useContext(FilterContext);

  const channelNames = channels.map((chl) => chl.name);

  const newChannelSchema = yup.object().shape({
    name: yup.string().required(t('modals.errors.requiredField')).trim().min(3, t('modals.errors.minLength'))
      .max(20, t('modals.errors.maxLength'))
      .test({
        message: t('modals.errors.uniqueName'),
        test: (newName) => !channelNames.includes(newName),
      }),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: newChannelSchema,
    onSubmit: async ({ name }) => {
      try {
        const response = await sendChannel({ name: filter.clean(name) });
        if (response.error) throw new Error(response.error);
        handleClose();
        toast.success(t('notifications.addChannelSuccess'));
      } catch (err) {
        toast.error(t('notifications.networkError'));
      }
    },
  });

  const {
    handleChange, handleSubmit, values: { name }, isValid, errors, touched, isSubmitting,
  } = formik;

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <Modal onHide={handleClose} show={isOpened} dialogClassName="modal-dialog-centered">
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.AddChannel.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <fieldset disabled={isSubmitting}>
            <Form.Group controlId="formNewNameChl">
              <Form.Label className="visually-hidden">{t('modals.AddChannel.formLable')}</Form.Label>
              <Form.Control
                ref={inputRef}
                onChange={handleChange}
                name="name"
                value={name}
                type="text"
                isInvalid={touched.name && errors.name}
              />
              {!isValid && <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>}
            </Form.Group>
            <Modal.Footer>
              <Button onClick={handleClose} type="button">{t('modals.btnCancel')}</Button>
              <Button type="submit">{t('modals.btnSend')}</Button>
            </Modal.Footer>
          </fieldset>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddChannelModal;
