import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button, Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useEffect, useRef } from 'react';
import { closeModal } from '../../slices/modalSlice';
import { useSendChannelMutation } from '../../services/chatApi';

const AddChannelModal = () => {
  const { isOpened } = useSelector((state) => state.modal);
  const { channels } = useSelector((state) => state.channelData);
  const dispatch = useDispatch();
  const handleClose = () => dispatch(closeModal());
  const [sendChannel] = useSendChannelMutation();
  const btnSubmit = useRef(null);
  const inputRef = useRef(null);

  const channelNames = channels.map((chl) => chl.name);

  const newChannelSchema = yup.object().shape({
    name: yup.string().required().trim().min(3, 'Минимум 3 символа')
      .max(20, 'Максимум 20 символов!')
      .test({
        message: 'Должно быть уникальным',
        test: (newName) => !channelNames.includes(newName),
      }),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: newChannelSchema,
    onSubmit: async (val) => {
      try {
        btnSubmit.current.disabled = true;
        const response = await sendChannel(val);
        if (response.error) throw new Error(response.error);
        handleClose();
      } catch (err) {
        btnSubmit.current.disabled = false;
        console.log('Произошла сетевая ошибка: ', err);
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
        <Modal.Title>Добавить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formNewNameChl">
            <Form.Label className="visually-hidden">Имя канала</Form.Label>
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
            <Button onClick={handleClose} type="button">Отменить</Button>
            <Button ref={btnSubmit} type="submit">Отправить</Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddChannelModal;
