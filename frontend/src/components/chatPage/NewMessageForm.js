import { useFormik } from 'formik';
import { useEffect, useRef } from 'react';
import { InputGroup, Form, Button } from 'react-bootstrap';
import { ArrowRightSquare } from 'react-bootstrap-icons';
import * as yup from 'yup';
import { useSelector } from 'react-redux';
import { useSendMessageMutation } from '../../services/chatApi';

const newMessageSchema = yup.object().shape({
  newMessage: yup.string().required().trim().min(1),
});

const NewMessageForm = () => {
  const [sendMessage] = useSendMessageMutation();

  const channelId = useSelector((state) => state.channelData.currentChannelID);
  const { username } = useSelector((state) => state.authData);
  const refControl = useRef(null);
  const formik = useFormik({
    initialValues: {
      newMessage: '',
    },
    isInitialValid: false,
    validationSchema: newMessageSchema,
    onSubmit: async ({ newMessage }) => {
      try {
        await sendMessage({
          body: newMessage,
          channelId,
          username,
        });
        formik.values.newMessage = '';
      } catch (err) {
        console.log('Ошибка сети: ', err);
      }
    },
  });

  useEffect(() => {
    refControl.current.focus();
  }, []);

  const {
    handleChange, values: { newMessage }, handleSubmit, isValid, isSubmitting,
  } = formik;

  return (
    <div className="mt-auto px-5 py-3">
      <Form onSubmit={handleSubmit} className="py-1 border rounded-2">
        <InputGroup>
          <Form.Control
            ref={refControl}
            onChange={handleChange}
            value={newMessage}
            name="newMessage"
            className="border-0 p-0 ps-2"
            placeholder="Введите сообщение..."
            aria-label="Новое сообщение"
          />
          <Button disabled={(!isValid || isSubmitting)} type="submit" className="btn-group-vertical" variant="">
            <ArrowRightSquare width="20" height="20" />
            <span className="visually-hidden">Отправить</span>
          </Button>
        </InputGroup>
      </Form>
    </div>
  );
};

export default NewMessageForm;
