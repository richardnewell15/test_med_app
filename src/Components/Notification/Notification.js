import React, { useEffect, useState } from 'react';
import "./Notification.css";
import Navbar from '../Navbar/Navbar';

const Notification = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [doctorData, setDoctorData] = useState(null);
  const [appointmentData, setAppointmentData] = useState(null);

  useEffect(() => {
    // Retrieve stored username, doctor data, and appointment data from sessionStorage and localStorage
    const storedUsername = sessionStorage.getItem('email');
    const storedDoctorData = JSON.parse(localStorage.getItem('doctorData'));
    const storedAppointmentData = JSON.parse(localStorage.getItem('appointmentData'));

    if (storedUsername) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
    }

    if (storedDoctorData) {
      setDoctorData(storedDoctorData);
    }

    if (storedAppointmentData) {
      setAppointmentData(storedAppointmentData);
    }
  }, []);

  return (
    <div className="notification-container">
      <Navbar />
      {children}
      {isLoggedIn && appointmentData && (
        <div className="appointment-card">
          <div className="appointment-card__content">
            <h3 className="appointment-card__title">Appointment Details</h3>
            <div>
              <p className="appointment-card__message">
                <strong>Doctor:</strong> {appointmentData.doctorNameAppt}
              </p>
              <p className="appointment-card__message">
                <strong>Speciality:</strong> {appointmentData.doctorSpecialityAppt}
              </p>
              <p className="appointment-card__message">
                <strong>Name:</strong> {appointmentData.userNameAppt}
              </p>
              <p className="appointment-card__message">
                <strong>Phone Number:</strong> {appointmentData.phoneNumberAppt}
              </p>
              <p className="appointment-card__message">
                <strong>Date of Appointment:</strong> {appointmentData.appointmentDateAppt}
              </p>
              <p className="appointment-card__message">
                <strong>Time Slot:</strong> {appointmentData.timeSlotAppt}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notification;