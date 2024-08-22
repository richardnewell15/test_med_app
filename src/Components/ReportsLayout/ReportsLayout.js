import React, { useState } from 'react';
import './ReportsLayout.css';

const ReportsLayout = () => {
    const [reports, setReports] = useState([
        { id: 1, doctorName: 'Dr. John Doe', doctorSpeciality: 'Cardiologist', report: '/Report.pdf', download: '/Report.pdf', reviewGiven: false },
        { id: 2, doctorName: 'Dr. Jane Smith', doctorSpeciality: 'Dermatologist', report: '/Report.pdf', download: '/Report.pdf', reviewGiven: false },
        { id: 3, doctorName: 'Dr. Mike Johnson', doctorSpeciality: 'Pediatrician', report: '/Report.pdf', download: '/Report.pdf', reviewGiven: false }
    ]);

    const [showReport, setShowReport] = useState(false);
    const [selectedDoctor, setSelectedDoctor] = useState(null);

    const openReport = (id) => {
        const doctor = reports.find(report => report.id === id);
        if (doctor) {
            // Open the PDF in a new window
            window.open(doctor.report, '_blank');
        }
    };

    const closeReport = () => {
        setShowReport(false);
        setSelectedDoctor(null);
    };

    const handleReportSubmit = (feedback, rating) => {
        const updatedReports = reports.map(report => {
            if (report.id === selectedDoctor.id) {
                return { ...report, reviewGiven: true };
            }
            return report;
        });
        setReports(updatedReports);
        closeReport();
    };

    return (
        <div className="reports-layout">
            <h1>Your Reports</h1>
            <table className="reports-table">
                <thead>
                    <tr>
                        <th>Serial Number</th>
                        <th>Doctor Name</th>
                        <th>Doctor Specialty</th>
                        <th>View Report</th>
                        <th>Download Report</th>
                    </tr>
                </thead>
                <tbody>
                    {reports.map((report, index) => (
                        <tr key={report.id}>
                            <td>{index + 1}</td>
                            <td>{report.doctorName}</td>
                            <td>{report.doctorSpeciality}</td>
                            <td>
                                <button onClick={() => openReport(report.id)}>View Report</button>
                            </td>
                            <td>
                                <a href={report.download} download={`Report_${report.id}.pdf`}>
                                    <button>Download</button>
                                </a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {showReport && selectedDoctor && (
                <div className="report-popup">
                    <div>
                        <h2>{selectedDoctor.doctorName}</h2>
                        <button onClick={closeReport}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ReportsLayout;