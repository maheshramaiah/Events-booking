import React, { Fragment } from 'react';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';
import history from '../../history';
import { useAuth } from '../../contexts/AuthContext';
import { GET_EVENTS } from '../../query';
import { dateParser } from '../utils';
import { Container } from '../styles';
import { Banner, Bar, Page, EventCreate, EventList, Name, Content } from './styles';

function Events() {
  const [user] = useAuth();

  function onEventClick(id) {
    history.push(`/event/${id}`);
  }

  return (
    <Fragment>
      <Banner>
        <h2>Find your next event</h2>
      </Banner>
      <Container>
        <Bar className="clearfix">
          {
            user.isLoggedIn &&
            <EventCreate>
              <Link to='/createEvent'>Create Event</Link>
            </EventCreate>
          }
        </Bar>
        <Page>
          <Query query={GET_EVENTS}>
            {
              ({ data, loading, error }) => {
                if (loading) return <span>Loading ...</span>
                if (error) return <span>Error</span>

                return (
                  <EventList>
                    {
                      data.events.map(event => {
                        return (
                          <li key={event.id} onClick={() => onEventClick(event.id)}>
                            <Name>{event.name}</Name>
                            <Content>{event.description}</Content>
                            <Content>{dateParser(event.startDate)}</Content>
                            <Content>{event.participants.length} Member(s) going</Content>
                          </li>
                        )
                      })
                    }
                  </EventList>
                )
              }
            }
          </Query>
        </Page>
      </Container>
    </Fragment>
  );
}

export default Events;