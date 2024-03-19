import { useFormik } from 'formik';
import {
  useContext, useEffect, useRef, useState,
} from 'react';
import { InputGroup, Form, Button } from 'react-bootstrap';
import { ArrowRightSquare } from 'react-bootstrap-icons';
import * as yup from 'yup';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useSendMessageMutation } from '../../services/chatApi';
import { FilterContext } from '../../hoc/FilterProfanityProvider';

const newMessageSchema = yup.object().shape({
  newMessage: yup.string().required().trim().min(1),
});

const NewMessageForm = () => {
  const [sendMessage] = useSendMessageMutation();
  const { t } = useTranslation();
  const channelId = useSelector((state) => state.channelData.currentChannelID);
  const { username } = useSelector((state) => state.authData);
  const refControl = useRef(null);
  const filter = useContext(FilterContext);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formik = useFormik({
    initialValues: {
      newMessage: '',
    },
    validateOnMount: true,
    validationSchema: newMessageSchema,
    onSubmit: async ({ newMessage }) => {
      setIsSubmitting(true);
      try {
        await sendMessage({
          body: filter.clean(newMessage),
          channelId,
          username,
        });
        formik.values.newMessage = '';
        setIsSubmitting(false);
      } catch (err) {
        toast.error(t('notifications.networkError'));
        setIsSubmitting(false);
      }
    },
  });

  const {
    handleChange, values: { newMessage }, handleSubmit,
  } = formik;

  useEffect(() => {
    if (!isSubmitting) {
      refControl.current.focus();
    }
  }, [isSubmitting]);

  return (
    <div className="mt-auto px-5 py-3">
      <Form onSubmit={handleSubmit} className="py-1 border rounded-2">
        <fieldset disabled={(isSubmitting)}>
          <InputGroup>
            <Form.Control
              ref={refControl}
              onChange={handleChange}
              value={newMessage}
              name="newMessage"
              className="border-0 p-0 ps-2"
              placeholder={t('ChatPage.Chat.form.inputPlaceholder')}
              aria-label={t('ChatPage.Chat.form.inputLabel')}
            />
            <Button type="submit" className="btn-group-vertical" variant="">
              <ArrowRightSquare width="20" height="20" />
              <span className="visually-hidden">{t('ChatPage.Chat.form.btnSubmit')}</span>
            </Button>
          </InputGroup>
        </fieldset>
      </Form>
    </div>
  );
};

export default NewMessageForm;
