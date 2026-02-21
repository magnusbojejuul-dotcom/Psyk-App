import React from 'react';

const GdprBanner = () => {
  const containerStyle = {
    backgroundColor: '#fff3cd', // Gul advarselsfarve
    color: '#856404',
    border: '1px solid #ffeeba',
    padding: '15px',
    borderRadius: '8px',
    marginBottom: '20px',
    fontSize: '0.9rem',
    maxWidth: '600px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  };

  const titleStyle = {
    marginTop: 0,
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    color: '#856404'
  };

  return (
    <div style={containerStyle}>
      <h3 style={titleStyle}>⚠️ OBS: GDPR & Datasikkerhed</h3>
      <p style={{ margin: '5px 0' }}>Dette er en lokal udviklingsversion. Indtast <strong>aldrig</strong> rigtige patientdata.</p>
      <ul style={{ paddingLeft: '20px', margin: '10px 0' }}>
        <li><strong>Direkte henførbar data:</strong> Undgå CPR-numre, fulde navne og specifikke adresser. Brug i stedet initialer (f.eks. "Pt. AA") eller løbenumre.</li>
        <li><strong>Passiv data:</strong> Vær opmærksom på metadata, som systemet potentielt kan logge (f.eks. tidsstempler, IP-adresse og browser-info), hvis dataen forlader din maskine.</li>
      </ul>
    </div>
  );
};

export default GdprBanner;