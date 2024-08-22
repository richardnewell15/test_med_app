import React, { useState, useEffect } from 'react';
import FindDoctorSearch from '../FindDoctorSearch/FindDoctorSearch';
import DoctorCard from '../DoctorCard/DoctorCard';
import AppointmentsForm from '../AppointmentsForm/AppointmentsForm';
import './AppointmentsPage.css';

const initialDoctors = [
  {
    id: 1,
    name: 'Dr. Anthony Smith',
    speciality: 'Orthopedic Surgery',
    experience: 32,
    ratings: 4.5,
    profilePic: '../Assets/Medical_icon.svg'
  },
  {
    id: 2,
    name: 'Dr. Fatima Alima',
    speciality: 'Orthopedic Surgery',
    experience: 14,
    ratings: 4.8,
    profilePic: '/Assets/User_Fatima.jpg'
  },
  {
    id: 3,
    name: 'Dr. Malia Kekoa',
    speciality: 'Orthopedic Surgery',
    experience: 8,
    ratings: 4.9,
    profilePic: '/Assets/User_Malia.jpg'
  },
  {
    id: 4,
    name: 'Dr. David Jones',
    speciality: 'Orthopedic Surgery',
    experience: 18,
    ratings: 2.3,
    profilePic: '/Assets/User_Scott.png'
  },
  {
    id: 5,
    name: 'Dr. Samuel Evans',
    speciality: 'Dentist',
    experience: 6,
    ratings: 4.2,
    profilePic: '/Assets/User_Scott.png'
  },
  {
    id: 6,
    name: 'Dr. Stephanie Kim',
    speciality: 'Gynecologist/obstetrician',
    experience: 35,
    ratings: 3.6,
    profilePic: '/Assets/User_Scott.png'
  },
  {
    id: 7,
    name: 'Dr. Evangeline Simmon',
    speciality: 'Gynecologist/obstetrician',
    experience: 21,
    ratings: 4.7,
    profilePic: '/Assets/User_Scott.png'
  },
  {
    id: 8,
    name: 'Dr. Quanzi Luboko',
    speciality: 'Ear-nose-throat (ent) Specialist',
    experience: 25,
    ratings: 3.9,
    profilePic: '/Assets/User_Scott.png'
  },
  {
    id: 9,
    name: 'Dr. Cheryl Smith',
    speciality: 'Homeopath',
    experience: 2,
    ratings: 4.4,
    profilePic: '/Assets/User_Scott.png'
  },
  {
    id: 10,
    name: 'Dr. Miyoko Kimura',
    speciality: 'Homeopath',
    experience: 32,
    ratings: 4.6,
    profilePic: '/Assets/User_Scott.png'
  },
  {
    id: 11,
    name: 'Dr. Rashimi Rao',
    speciality: 'Ayurveda',
    experience: 18,
    ratings: 4.1,
    profilePic: '/Assets/User_Scott.png'
  },
  // Add more doctor objects as needed
];

const AppointmentsPage = () => {
  const [doctors, setDoctors] = useState(initialDoctors);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [appointmentInfo, setAppointmentInfo] = useState(null);
  const [selectedSpeciality, setSelectedSpeciality] = useState('');

  // Function to filter doctors based on selected speciality
  useEffect(() => {
    if (selectedSpeciality) {
      const filteredDoctors = initialDoctors.filter(doctor => doctor.speciality === selectedSpeciality);
      setDoctors(filteredDoctors);
    } else {
      // Reset to initial doctors list if no speciality is selected
      setDoctors(initialDoctors);
    }
  }, [selectedSpeciality]);

  const handleDoctorSelect = (doctor) => {
    setSelectedDoctor(doctor);
  };

  const handleCloseForm = () => {
    setSelectedDoctor(null);
  };

  const handleBookAppointment = (formData) => {
    setAppointmentInfo(formData);
  };

  return (
    <div className="appointments-page">
      <FindDoctorSearch onSpecialitySelect={setSelectedSpeciality} />
      <div className="doctor-cards-container" style={{ paddingTop: '20px' }}>
        {doctors.map((doctor) => (
          <DoctorCard
            key={doctor.id}
            name={doctor.name}
            speciality={doctor.speciality}
            experience={doctor.experience}
            ratings={doctor.ratings}
            profilePic={doctor.profilePic}
            report={doctor.report}
            onSelect={() => handleDoctorSelect(doctor)} // Pass onSelect callback
            appointmentInfo={appointmentInfo} // Pass appointmentInfo state
          />
        ))}
        {selectedDoctor && (
          <div className="modal-backdrop">
            <div className="modal-content">
              <AppointmentsForm
                doctor={selectedDoctor}
                onClose={handleCloseForm}
                onBookAppointment={handleBookAppointment} // Pass callback to handle appointment booking
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentsPage;