import React, { useCallback, useEffect, useState } from 'react';
import { Form, Input, Button, Select, DatePicker, TimePicker } from 'antd';
import cx from 'classnames';
import moment from 'moment';
import { RouteComponentProps } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import './form-style.scss';

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: '${label} is required!',
};
/* eslint-enable no-template-curly-in-string */

interface ActivityFormProps extends RouteComponentProps {
  onSubmitActivity: Function;
  dataForm: any;
}

export interface ActivityCreationInfo {
  title: string;
  description: string;
  category: string;
  date: string;
  time: string;
  city: string;
  venue: string;
}

const initialState: ActivityCreationInfo = {
  title: '',
  description: '',
  category: '',
  date: '',
  time: '',
  city: '',
  venue: '',
};
const ActivityForm = (props: ActivityFormProps) => {
  const [state, setState] = useState(initialState);
  const [form] = Form.useForm();

  const history = useHistory();

  const onChangeDataPicker = useCallback(
    (date: any, dateString: string): void => {
      setState((prevState) => ({
        ...prevState,
        date: dateString,
      }));
    },
    []
  );

  const onChangeTimePicker = useCallback(
    (time: any, timeString: string): void => {
      setState((prevState) => ({
        ...prevState,
        time: timeString,
      }));
    },
    []
  );

  const onChangeTitle = useCallback(
    (e: React.SyntheticEvent<HTMLInputElement>): void => {
      const value = e.currentTarget.value;
      setState((prevState) => ({
        ...prevState,
        title: value,
      }));
    },
    []
  );

  const onChangeDescription = useCallback(
    (e: React.SyntheticEvent<HTMLTextAreaElement>): void => {
      const value = e.currentTarget.value;
      setState((prevState) => ({
        ...prevState,
        description: value,
      }));
    },
    []
  );

  const onChangeCategory = useCallback((category: string): void => {
    setState((prevState) => ({
      ...prevState,
      category: category,
    }));
  }, []);

  const onChangeCity = useCallback(
    (e: React.SyntheticEvent<HTMLInputElement>): void => {
      const value = e.currentTarget.value;
      setState((prevState) => ({
        ...prevState,
        city: value,
      }));
    },
    []
  );

  const onChangeVenue = useCallback(
    (e: React.SyntheticEvent<HTMLInputElement>): void => {
      const value = e.currentTarget.value;
      setState((prevState) => ({
        ...prevState,
        venue: value,
      }));
    },
    []
  );

  const onFinishSubmit = useCallback(() => {
    props.onSubmitActivity(state);
  }, [props, state]);

  useEffect(() => {
    if (props.dataForm.id) {
      form.setFieldsValue({
        title: props.dataForm.title,
        description: props.dataForm.description,
        category: props.dataForm.category,
        date: moment(props.dataForm.date, 'YYYY-MM-DD'),
        time: moment(props.dataForm.time, 'HH:mm:ss'),
        city: props.dataForm.city,
        venue: props.dataForm.venue,
      });
    }
    setState(props.dataForm);
  }, [props.dataForm, form]);
  return (
    <Form
      form={form}
      className={'form-component'}
      name='nest-messages'
      validateMessages={validateMessages}
      onFinish={onFinishSubmit}
    >
      <Form.Item name={'title'} rules={[{ required: true }]}>
        <Input placeholder='Title' onChange={onChangeTitle} />
      </Form.Item>
      <Form.Item
        name={'description'}
        rules={[
          {
            required: true,
            min: 5,
            message: 'Description needs to be at least 5 characters',
          },
        ]}
        className='form-component__textarea-description'
      >
        <Input.TextArea
          placeholder='Description'
          onChange={onChangeDescription}
          value={props.dataForm?.description}
        />
      </Form.Item>
      <Form.Item
        name={'category'}
        rules={[{ required: true, message: 'Please select category!' }]}
      >
        <Select
          placeholder='Category'
          className='form-component__select-input'
          size={'large'}
          onChange={onChangeCategory}
        >
          <Select.Option value='drink'>Drink</Select.Option>
          <Select.Option value='culture'>Culture</Select.Option>
          <Select.Option value='film'>Film</Select.Option>
          <Select.Option value='food'>Food</Select.Option>
          <Select.Option value='music'>Music</Select.Option>
          <Select.Option value='travel'>Travel</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item>
        <Form.Item
          name={'date'}
          className='form-component__date-picker'
          rules={[
            {
              type: 'object' as const,
              required: true,
              message: 'Please select date!',
            },
          ]}
        >
          <DatePicker onChange={onChangeDataPicker} />
        </Form.Item>
        <Form.Item
          name={'time'}
          rules={[
            {
              type: 'object' as const,
              required: true,
              message: 'Please select time!',
            },
          ]}
          className={'form-component__time-picker'}
        >
          <TimePicker format={'HH:mm'} onChange={onChangeTimePicker} />
        </Form.Item>
      </Form.Item>
      <Form.Item name={'city'} rules={[{ required: true }]}>
        <Input placeholder='City' onChange={onChangeCity} />
      </Form.Item>
      <Form.Item name={'venue'} rules={[{ required: true }]}>
        <Input placeholder='Venue' onChange={onChangeVenue} />
      </Form.Item>
      <Form.Item className={'form-component__btn'}>
        <Button
          htmlType='button'
          type='default'
          onClick={() => {
            history.goBack();
          }}
        >
          Cancel
        </Button>
        <Button
          type='primary'
          htmlType='submit'
          className={cx('', {
            disabled:
              !state.title ||
              !state.description ||
              !state.category ||
              !state.date ||
              !state.time ||
              !state.city ||
              !state.venue,
          })}
        >
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ActivityForm;
