import React, { useState, useMemo } from 'react';
import { Mutation } from 'react-apollo';
import history from '../../history';
import { Input, DatePicker, TimePicker, MockPlace, Button } from '../../components';
import { CREATE_EVENT, GET_EVENTS } from '../../query';
import { getTimezoneOffset } from '../utils';
import { useValidation } from './useValidation';
import { Container } from '../styles';
import { DateTime, ButtonWrap, Error } from './styles';

function CreateEvent() {
  const date = useMemo(() => {
    const now = new Date();

    now.setHours(now.getHours() + 1, 0, 0, 0);
    return new Date(now);
  }, []);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState(date);
  const [endDate, setEndDate] = useState(date);
  const [location, setLocation] = useState(null);
  const err = useValidation({ name, startDate, endDate, location });

  function getPayload() {
    return {
      eventInput: {
        name,
        description,
        startDate: startDate.getTime().toString(),
        endDate: endDate.getTime().toString(),
        location
      }
    }
  }

  function onSuccess() {
    history.push('/');
  }

  function onError(data) {
    console.log(data);
  }

  function onCancel() {
    history.push('/');
  }

  return (
    <Mutation
      mutation={CREATE_EVENT}
      variables={getPayload()}
      onCompleted={onSuccess}
      onError={onError}
      refetchQueries={[{ query: GET_EVENTS, variables: { category: 'UPCOMING', timezoneOffset: getTimezoneOffset(), search: '' } }]}
    >
      {
        (createEvent, { loading, error }) => (
          <Container>
            <h2>Create Event</h2>
            <Input
              label='Name'
              type='text'
              value={name}
              required={true}
              onChange={value => setName(value)}
            />
            <Input
              label='Description'
              type='textarea'
              value={description}
              onChange={value => setDescription(value)}
            />
            <DateTime>
              <DatePicker
                label='Start Date'
                value={startDate}
                required={true}
                onChange={value => setStartDate(value)}
              />
              <TimePicker
                value={startDate}
                onChange={value => setStartDate(value)}
              />
            </DateTime>
            <DateTime>
              <DatePicker
                label='End Date'
                value={endDate}
                required={true}
                onChange={value => setEndDate(value)}
              />
              <TimePicker
                value={endDate}
                onChange={value => setEndDate(value)}
              />
            </DateTime>
            <MockPlace
              label='Place'
              onChange={value => setLocation(value)}
            />
            <ButtonWrap>
              <Button onClick={createEvent} disabled={!!err}>Save</Button>
              <Button secondary={true} onClick={onCancel}>Cancel</Button>
              {err && <Error>{err}</Error>}
            </ButtonWrap>
          </Container>
        )
      }
    </Mutation>
  );
}

export default CreateEvent;