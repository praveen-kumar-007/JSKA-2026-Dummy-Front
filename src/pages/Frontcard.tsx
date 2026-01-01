
import React from 'react';
import type { IDCardData } from '../types';

interface Props {
  data: IDCardData;
}

export const IDCardFront: React.FC<Props> = ({ data }) => {
  const formatDOB = (dobString: string) => {
    try {
      const date = new Date(dobString);
      return date.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
    } catch {
      return dobString;
    }
  };

  return (
    <div 
      style={{ 
        width: '210px', 
        height: '330px', 
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: '0 8px 25px rgba(0, 20, 40, 0.12)',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#ffffff',
        position: 'relative',
        fontFamily: "'Poppins', sans-serif"
      }}
    >
      {/* Watermark Logos */}
      <div style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        opacity: 0.08,
        zIndex: 0
      }}>
        <div style={{position: 'absolute', top: '16px', left: '16px', fontSize: '24px', fontWeight: 900, color: '#ff6b35'}}>AKFI</div>
        <div style={{position: 'absolute', bottom: '16px', right: '16px', fontSize: '24px', fontWeight: 900, color: '#ff6b35'}}>JH-KBD</div>
      </div>

      {/* Header */}
      <div 
        style={{
          background: 'linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)',
          padding: '12px 12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          zIndex: 1,
          gap: '8px'
        }}
      >
        <div style={{
          width: '28px',
          height: '28px',
          backgroundColor: 'white',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <span style={{fontSize: '12px'}}>🇮🇳</span>
        </div>
        <div style={{textAlign: 'center', flex: 1}}>
          <h1 style={{
            fontSize: '12px',
            fontWeight: 700,
            color: 'white',
            margin: 0,
            lineHeight: 1.2
          }}>DDKA ID</h1>
        </div>
        <div style={{
          width: '28px',
          height: '28px',
          backgroundColor: 'white',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <span style={{fontSize: '12px'}}>🏏</span>
        </div>
      </div>

      {/* Photo Section - Circular with negative margin */}
      <div style={{
        marginTop: '-32px',
        textAlign: 'center',
        position: 'relative',
        zIndex: 2,
        paddingBottom: '8px'
      }}>
        <div style={{
          width: '70px',
          height: '70px',
          margin: '0 auto',
          borderRadius: '50%',
          border: '4px solid white',
          overflow: 'hidden',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          backgroundColor: '#e0e0e0',
          backgroundImage: `url(${data.photoUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}>
          <img 
            src={data.photoUrl} 
            alt={data.name}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block'
            }}
          />
        </div>
      </div>

      {/* Details Section */}
      <div style={{
        padding: '8px 10px 10px 10px',
        textAlign: 'center',
        flex: 1,
        display: 'flex',
        flexDirection: 'column'
      }}>
        <h2 style={{
          fontSize: '12px',
          fontWeight: 700,
          color: '#1a1a1a',
          margin: '0 0 2px 0',
          textTransform: 'uppercase'
        }}>
          {data.name}
        </h2>
        <p style={{
          fontSize: '8px',
          fontWeight: 600,
          color: '#ff6b35',
          margin: '0 0 8px 0',
          textTransform: 'uppercase',
          letterSpacing: '0.4px'
        }}>
          Kabaddi Player
        </p>

        {/* Detail Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'auto 1fr',
          gap: '3px 6px',
          textAlign: 'left',
          fontSize: '8px',
          marginTop: 'auto',
          lineHeight: 1.3
        }}>
          <span style={{fontWeight: 600, color: '#333', fontSize: '7.5px'}}>ID:</span>
          <span style={{fontWeight: 600, color: '#ff6b35', fontSize: '8px'}}>{data.idNo}</span>

          <span style={{fontWeight: 600, color: '#333', fontSize: '7.5px'}}>DOB:</span>
          <span style={{fontWeight: 500, color: '#1a1a1a', fontSize: '8px'}}>{formatDOB(data.dob)}</span>

          <span style={{fontWeight: 600, color: '#333', fontSize: '7.5px'}}>Blood:</span>
          <span style={{fontWeight: 700, color: '#d32f2f', fontSize: '8.5px'}}>{data.bloodGroup}</span>

          <span style={{fontWeight: 600, color: '#333', fontSize: '7.5px'}}>Phone:</span>
          <span style={{fontWeight: 500, color: '#1a1a1a', fontSize: '8px'}}>{data.phone}</span>

          <span style={{gridColumn: '1 / -1', fontWeight: 600, color: '#333', fontSize: '7.5px', marginTop: '2px'}}>Address:</span>
          <span style={{gridColumn: '1 / -1', fontWeight: 500, color: '#1a1a1a', fontSize: '7.5px', lineHeight: 1.2}}>{data.address}</span>

          <span style={{gridColumn: '1 / -1', fontWeight: 600, color: '#333', fontSize: '7.5px', marginTop: '2px'}}>Father:</span>
          <span style={{gridColumn: '1 / -1', fontWeight: 500, color: '#1a1a1a', fontSize: '7.5px'}}>{data.fathersName}</span>
        </div>
      </div>

      {/* Bottom Bar */}
      <div 
        style={{
          height: '5px',
          background: 'linear-gradient(135deg, #ff6b35, #f7931e)',
          marginTop: 'auto'
        }}
      />
    </div>
  );
};
