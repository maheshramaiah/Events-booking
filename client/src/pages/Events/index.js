import React, { Fragment } from 'react';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { GET_EVENTS } from '../../query';
import { Banner, Container, Bar, Page, EventCreate, EventList, Name, Content } from './styles';

function Events() {
  const [user] = useAuth();

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
                        const date = new Date(parseInt(event.startDate)).toLocaleString('en', {
                          day: 'numeric',
                          month: 'long',
                          weekday: 'long',
                          year: 'numeric',
                          hour: 'numeric',
                          minute: 'numeric'
                        });

                        return (
                          <li key={event.id}>
                            <Name>{event.name}</Name>
                            <Content>{event.description}</Content>
                            <Content>{date}</Content>
                            <Content>{event.location.address}</Content>
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