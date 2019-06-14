import React, { Fragment } from 'react';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';
import history from '../../history';
import { useAuth } from '../../contexts/AuthContext';
import { GET_EVENTS } from '../../query';
import { dateParser } from '../utils';
import { Container } from '../styles';
import { Banner, Bar, Page, EventCreate, EventList, Event, EventTime, EventDetail, Content, TabList } from './styles';

const now = new Date().getTime().toString();
const TABS = [
  { name: 'Upcoming Events', value: 'UPCOMING' },
  { name: 'Ongoing Events', value: 'ONGOING' },
  { name: 'Past Events', value: 'PAST' },
  { name: 'My Events', value: 'MY' }
];

function Events({ location }) {
  const params = new URLSearchParams(location.search);
  const category = params.get('category') || TABS[0].value;
  const [user] = useAuth();

  function onEventClick(id) {
    history.push(`/event/${id}`);
  }

  function onFilterClick(value) {
    history.push({
      pathname: '/events',
      search: `?category=${value}`
    })
  }

  function renderEventsList({ events }) {
    return (
      <EventList>
        {
          events.map(event => {
            return (
              <li key={event.id} onClick={() => onEventClick(event.id)}>
                <Event>
                  <EventTime>
                    <Content>{dateParser(event.startDate)}</Content>
                  </EventTime>
                  <EventDetail>
                    <h3>{event.name}</h3>
                    <Content>{event.description}</Content>
                    <Content>{event.participants.length} Member(s) going</Content>
                  </EventDetail>
                </Event>
              </li>
            )
          })
        }
        {!events.length && <p>No Events</p>}
      </EventList>
    )
  }

  function renderFilters() {
    return (
      <TabList>
        {
          TABS.map(t =>
            <li
              key={t.value}
              className={t.value === category ? 'selected' : ''}
              onClick={() => onFilterClick(t.value)}>
              {t.name}
            </li>
          )
        }
      </TabList>
    );
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
          <Query
            query={GET_EVENTS}
            variables={{ category, time: now }}
          >
            {
              ({ data, loading, error }) => {
                if (loading) return <EventList>Loading ...</EventList>
                if (error) return <EventList>Error</EventList>

                return renderEventsList(data)
              }
            }
          </Query>
          {user.isLoggedIn && renderFilters()}
        </Page>
      </Container>
    </Fragment>
  );
}

export default Events;