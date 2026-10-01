import React from 'react';
import html2pdf from 'html2pdf.js';

export default function OPTicket({ ticket }) {
  const handleDownloadPDF = () => {
    const element = document.getElementById('op-ticket-card');
    const options = {
      margin:       10,
      filename:     `OP-Ticket-${ticket?.tokenNo || 'TOK-01'}.pdf`,
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2, useCORS: true },
      jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    // Directly downloads the PDF file to your system
    html2pdf().from(element).set(options).save();
  };

  return (
    <div style={{ maxWidth: '420px', margin: '20px auto' }}>
      {/* OP Ticket Card with standard inline hex colors to prevent oklch errors */}
      <div 
        id="op-ticket-card" 
        style={{
          backgroundColor: '#ffffff',
          border: '2px solid #065f46',
          borderRadius: '8px',
          padding: '24px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          fontFamily: 'Arial, sans-serif',
          color: '#1e293b'
        }}
      >
        {/* Ticket Header */}
        <div style={{ textAlign: 'center', borderBottom: '1px solid #e2e8f0', paddingBottom: '16px', marginBottom: '16px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#064e3b', margin: 0 }}>GOVERNMENT OF KERALA</h2>
          <p style={{ fontSize: '12px', color: '#475569', margin: '4px 0 0 0' }}>Department of Health Services - eHealth OP Ticket</p>
        </div>

        {/* Ticket Details */}
        <div style={{ fontSize: '14px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', backgroundColor: '#ecfdf5', padding: '12px', borderRadius: '6px', border: '1px solid #d1fae5', marginBottom: '16px', alignItems: 'center' }}>
            <span style={{ fontWeight: '600', color: '#064e3b' }}>Token Number:</span>
            <span style={{ fontWeight: 'bold', color: '#047857', fontSize: '20px' }}>{ticket?.tokenNo || 'TOK-01'}</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
            <div>
              <span style={{ fontSize: '11px', color: '#64748b', display: 'block' }}>Patient Name</span>
              <span style={{ fontWeight: '600', color: '#1e293b' }}>{ticket?.patientName || 'Patient'}</span>
            </div>
            <div>
              <span style={{ fontSize: '11px', color: '#64748b', display: 'block' }}>UHID</span>
              <span style={{ fontWeight: '600', color: '#1e293b' }}>{ticket?.uhid || 'KL-2026-001'}</span>
            </div>
            <div>
              <span style={{ fontSize: '11px', color: '#64748b', display: 'block' }}>Hospital</span>
              <span style={{ fontWeight: '600', color: '#1e293b' }}>{ticket?.hospital || 'General Hospital'}</span>
            </div>
            <div>
              <span style={{ fontSize: '11px', color: '#64748b', display: 'block' }}>Department</span>
              <span style={{ fontWeight: '600', color: '#1e293b' }}>{ticket?.department || 'General Medicine'}</span>
            </div>
            <div>
              <span style={{ fontSize: '11px', color: '#64748b', display: 'block' }}>Appointment Date</span>
              <span style={{ fontWeight: '600', color: '#1e293b' }}>{ticket?.appointmentDate || '2026-09-25'}</span>
            </div>
            <div>
              <span style={{ fontSize: '11px', color: '#64748b', display: 'block' }}>Time Slot</span>
              <span style={{ fontWeight: '600', color: '#1e293b' }}>{ticket?.timeSlot || '09:00 AM - 10:00 AM'}</span>
            </div>
          </div>

          <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '12px', display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#475569' }}>
            <span>Status: <strong style={{ color: '#047857' }}>{ticket?.status || 'CONFIRMED'}</strong></span>
            <span>Paid: <strong style={{ color: '#047857' }}>{ticket?.amountPaid || '₹20'}</strong></span>
          </div>
        </div>
      </div>

      {/* Direct Download Button */}
      <div style={{ marginTop: '16px', textAlign: 'center' }}>
        <button
          type="button"
          onClick={handleDownloadPDF}
          style={{
            backgroundColor: '#047857',
            color: '#ffffff',
            fontWeight: 'bold',
            padding: '12px 24px',
            borderRadius: '6px',
            border: 'none',
            cursor: 'pointer',
            width: '100%',
            fontSize: '14px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}
        >
          Download Ticket as PDF File
        </button>
      </div>
    </div>
  );
}