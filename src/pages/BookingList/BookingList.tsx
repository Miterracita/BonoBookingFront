// import { useState, useEffect } from 'react';
import Logo from '../../components/Logo/Logo.js';
import NavBar from '../../components/NavBar/NavBar.js';
import SecondaryNavBar from '../../components/SecondaryNavBar/SecondaryNavBar.js';
// import Notification from '../../components/Notification/Notification.js';
import Wrapper from '../../components/Wrapper/Wrapper.js';
import WrapperNav from '../../components/WrapperNav/WrapperNav.js';
// import User from '../../components/Items/User/User.js';

import './BookingList.css'

// import { getUsers } from '../../services/apiServicesUsers.js';


function BookingList() {


  return (
    <div className="booking-list">
      <NavBar />

      <WrapperNav>
        <Logo color="blue" size="medium" />
        <SecondaryNavBar />
      </WrapperNav>

      <Wrapper>
        <div className="bookings">
          <h2><span>Booking</span> List</h2>
          <div>

          </div>
        </div>
        
      </Wrapper>
    </div>
  )
}

export default BookingList;
