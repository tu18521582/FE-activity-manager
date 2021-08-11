import React, { useState } from 'react';
import { Form, Input, Button, Select, DatePicker, TimePicker } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { RouteComponentProps } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import LayoutContainer from 'components/common/Layout/LayoutContainer';
import './form-style.scss';

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: '${label} is required!',
};
/* eslint-enable no-template-curly-in-string */

interface FormComponentProps extends RouteComponentProps {
  onSubmitCreateActivityProps: Function;
}

export interface infoOfCreateActivity {
  title: string;
  description: string;
  category: string;
  date: string;
  time: string;
  city: string;
  venue: string;
}

const initialState = {
  title: '',
  description: '',
  category: '',
  date: '',
  time: '',
  city: '',
  venue: '',
};

const FormComponent = (props: FormComponentProps) => {
  const [state, setState] = useState(initialState);

  const history = useHistory();

  const onChangeDataPicker = (date: any, dateString: string) => {
    setState((prevState) => ({
      ...prevState,
      date: dateString,
    }));
  };

  const onChangeTimePicker = (time: any, timeString: string) => {
    setState((prevState) => ({
      ...prevState,
      time: timeString,
    }));
  };

  const onChangeTitle = (e: React.SyntheticEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setState((prevState) => ({
      ...prevState,
      title: value,
    }));
  };

  const onChangeDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.currentTarget.value;
    setState((prevState) => ({
      ...prevState,
      description: value,
    }));
  };

  const onChangeCategory = (category: string) => {
    setState((prevState) => ({
      ...prevState,
      category: category,
    }));
  };

  const onChangeCity = (e: React.SyntheticEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setState((prevState) => ({
      ...prevState,
      city: value,
    }));
  };

  const onChangeVenue = (e: React.SyntheticEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setState((prevState) => ({
      ...prevState,
      venue: value,
    }));
  };

  const onFinishSubmit = () => {
    props.onSubmitCreateActivityProps(state);
  };

  return (
    <>
      <LayoutContainer>
        <Form
          className={'form-component'}
          name='nest-messages'
          validateMessages={validateMessages}
          onFinish={onFinishSubmit}
        >
          <Form.Item name={'Title'} rules={[{ required: true }]}>
            <Input placeholder='Title' onChange={onChangeTitle} />
          </Form.Item>
          <Form.Item
            name={'Description'}
            rules={[
              {
                required: true,
                min: 5,
                message: 'Description needs to be at least 5 characters',
              },
            ]}
            className='form-component__textarea-description'
          >
            <TextArea
              placeholder='Description'
              onChange={onChangeDescription}
            />
          </Form.Item>
          <Form.Item
            name={'Category'}
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
          <Form.Item name={'City'} rules={[{ required: true }]}>
            <Input placeholder='City' onChange={onChangeCity} />
          </Form.Item>
          <Form.Item name={'Venue'} rules={[{ required: true }]}>
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
            <Button type='primary' htmlType='submit'>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </LayoutContainer>
    </>
  );
};

export default FormComponent;
