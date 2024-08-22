import React, { useState } from 'react';
import './DoctorCard.css'; 
import docIcon from '../Assets/Medical_icon.svg';
import AppointmentsForm from '../AppointmentsForm/AppointmentsForm';

const DoctorCard = ({ name, speciality, experience, ratings, profilePic }) => {
  const [isAppointmentBooked, setIsAppointmentBooked] = useState(false);
  const [appointment, setAppointment] = useState(null); 
  const [showAppointmentsForm, setShowAppointmentsForm] = useState(false);

  const handleBookNow = (formData) => {
    console.log("Booking appointment with data:", formData); // Debugging line
    setIsAppointmentBooked(true);
    setAppointment(formData);
    setShowAppointmentsForm(false); 
  };

  const handleCancelAppointment = () => {
    console.log("Cancelling appointment."); // Debugging line
    setIsAppointmentBooked(false);
    setAppointment(null); 
  };

  const openAppointmentsForm = () => {
    setShowAppointmentsForm(true); 
  };

  return (
    <div className="doctor-card-container">
      <div className="doctor-card-details-container" style={{ backgroundColor: '#847DF9', padding: '0px' }}>
        <div className="doctor-card-profile-image-container" style={{ justifyContent: 'center' }}>
        <img src={docIcon} alt="Doctor Profile" style={{ height: '50px', width: '60px', borderRadius: '0%' }} />
        </div>
        <div className="doctor-card-details">
          <div className="doctor-card-detail-name">{name}</div>
          <div className="doctor-card-detail-speciality">{speciality}</div>
          <div className="doctor-card-detail-experience">{experience} years experience</div>
          <div className="doctor-card-detail-ratings">Ratings: {ratings}</div>
          {isAppointmentBooked ? (
            <div className="appointment-info">
              <p>Appointment Booked!</p>
              <p>Date: {appointment.appointmentDateAppt}</p>
              <p>Time Slot: {appointment.timeSlotAppt}</p>
              <button onClick={handleCancelAppointment}>Cancel</button>
            </div>
          ) : (
            <button className="book-now-button" onClick={openAppointmentsForm}>Book Now</button>
          )}
        </div>
      </div>
      {showAppointmentsForm && (
        <AppointmentsForm
          doctor={{ name, speciality, experience, ratings, profilePic }}
          onBookNow={handleBookNow}
          onClose={() => setShowAppointmentsForm(false)}
        />
      )}
    </div>
  );
};

export default DoctorCard;