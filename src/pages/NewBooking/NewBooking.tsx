import Logo from '../../components/Logo/Logo.js';
// import BookingCalendar from '../../components/BookingCalendar/BookingCalendar.tsx';
import NavBar from '../../components/NavBar/NavBar.tsx';
import SecondaryNavBar from '../../components/SecondaryNavBar/SecondaryNavBar.tsx';
import Wrapper from '../../components/Wrapper/Wrapper.tsx';
import WrapperNav from '../../components/WrapperNav/WrapperNav.tsx';
import FormBooking from '../../components/Forms/FormBooking/FormBooking.tsx';

import './NewBooking.css'

function NewBooking() {

  return (
    <div className="new-booking-page">
        <NavBar />    
        <WrapperNav>
          <Logo color="dark" size="medium" />
          <SecondaryNavBar />
        </WrapperNav>
        <Wrapper>
           <FormBooking /> 
        </Wrapper>
    </div>
  )
}

export default NewBooking;

        // {/* <div className='box-content'>
        //     {/* <BookingCalendar /> */}
        //     <Bono active type="5" reservations="5"/>
        //     <Bono type="10" reservations="6"/>
        // </div> */}