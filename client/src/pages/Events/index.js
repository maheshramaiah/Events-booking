import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Banner, Container, Bar, Page, EventCreate } from './styles';

function Events() {
  return (
    <Fragment>
      <Banner>
        <h2>Find your next event</h2>
      </Banner>
      <Container>
        <Bar className="clearfix">
          <EventCreate>
            <Link to='/createEvent'>Create Event</Link>
          </EventCreate>
        </Bar>
        <Page>
          <div>Events</div>
        </Page>
      </Container>
    </Fragment>
  );
}

export default Events;