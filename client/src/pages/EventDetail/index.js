import React, { Fragment } from 'react';
import { Query, Mutation } from 'react-apollo';
import { useAuth } from '../../contexts/AuthContext';
import { StaticMap, Button, Loader } from '../../components';
import { GET_EVENT, ADD_PARTICIPANT } from '../../query';
import { dateParser } from '../utils';
import { Container } from '../styles';
import { Header, HeaderLeft, HeaderRight, Title, Author, Details, Description, Venue, Address, MapContainer } from './styles';

function isUpcomingEvent(startDate) {
  return +startDate > new Date().getTime();
}

function EventDetail(props) {
  const [user] = useAuth();

  function renderEventInfo({ name, creator }) {
    return (
      <Fragment>
        <Title>
          {name}
        </Title>
        <Author>
          Hosted by <span>{creator.name}</span>
        </Author>
      </Fragment>
    );
  }

  function renderEventParticipation({ id, participants }) {
    const isAttended = participants.includes(user.info.id);

    return (
      <Fragment>
        <p>{isAttended ? 'Cancel attendance ?' : 'Want to attend ?'}</p>
        <Mutation
          mutation={ADD_PARTICIPANT}
          variables={{
            id,
            userId: user.info.id,
            isAttending: !isAttended
          }}
          refetchQueries={[{ query: GET_EVENT, variables: { id } }]}
        >
          {addParticipant => <Button secondary={true} onClick={addParticipant}>Yes</Button>}
        </Mutation>
      </Fragment>
    );
  }

  function renderDetals({ description }) {
    return (
      <Description>
        <h4>Details</h4>
        <p>{description || 'No details'}</p>
      </Description>
    );
  }

  function renderVenue({ startDate, endDate, location }) {
    return (
      <Venue>
        <Address>
          <p>{dateParser(startDate)} - {dateParser(endDate)}</p>
          <p>{location.address}</p>
        </Address>
        <MapContainer>
          <StaticMap
            lat={location.lat}
            lng={location.lng}
          />
        </MapContainer>
      </Venue>
    );
  }

  return (
    <Query
      query={GET_EVENT}
      variables={{
        id: props.match.params.id
      }}
    >
      {
        ({ data, loading, error }) => {
          if (loading) return <Loader />
          if (error) return <div>Error</div>

          const { event } = data;

          return (
            <Fragment>
              <Header>
                <HeaderLeft>
                  {renderEventInfo(event)}
                </HeaderLeft>
                <HeaderRight>
                  {user.isLoggedIn && isUpcomingEvent(event.startDate) && renderEventParticipation(event)}
                </HeaderRight>
              </Header>
              <Container>
                <Details>
                  {renderDetals(event)}
                  {renderVenue(event)}
                </Details>
              </Container>
            </Fragment>
          );
        }
      }
    </Query>
  );
}

export default EventDetail;