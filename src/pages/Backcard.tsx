import React from 'react';
import type { IDCardData } from '../types';

interface Props {
  data: IDCardData;
}

export const IDCardBack: React.FC<Props> = ({ data }) => {
  const qrData = `DDKA:${data.idNo}:${data.name}`;
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=70x70&data=${encodeURIComponent(qrData)}&color=ff6b35`;

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
          color: 'white',
          textAlign: 'center',
          padding: '9px 10px',
          position: 'relative',
          zIndex: 1
        }}
      >
        <h3 style={{
          fontSize: '11px',
          fontWeight: 600,
          margin: '0 0 2px 0'
        }}>
          Dhanbad District Kabaddi
        </h3>
        <p style={{
          fontSize: '8px',
          fontWeight: 400,
          opacity: 0.95,
          margin: 0
        }}>
          Member ID Card
        </p>
      </div>

      {/* Main Content */}
      <div style={{
        padding: '10px 11px',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        fontSize: '8px',
        color: '#333',
        lineHeight: 1.3,
        zIndex: 1
      }}>
        {/* About Section */}
        <h4 style={{
          fontSize: '9px',
          fontWeight: 600,
          color: '#ff6b35',
          marginBottom: '3px',
          textAlign: 'center'
        }}>
          About DDKA
        </h4>
        <p style={{
          textAlign: 'center',
          marginBottom: '7px',
          fontSize: '7.5px',
          lineHeight: 1.25,
          color: '#555'
        }}>
          Promoting excellence in Kabaddi. Dedicated to developing talent, fitness, and sportsmanship.
        </p>

        {/* QR Section */}
        <div style={{
          textAlign: 'center',
          margin: '5px 0'
        }}>
          <img 
            src={qrUrl} 
            alt="QR Code" 
            style={{
              width: '70px',
              height: '70px',
              border: '2px solid #ff6b35',
              borderRadius: '4px',
              margin: '0 auto 4px auto',
              display: 'block',
              backgroundColor: '#fff'
            }}
          />
          <p style={{
            fontSize: '7.5px',
            fontWeight: 500,
            color: '#ff6b35',
            margin: 0
          }}>
            Scan for Details
          </p>
        </div>

        {/* Club Info Grid */}
        <div style={{
          fontSize: '7.5px',
          textAlign: 'center',
          margin: '5px 0 3px 0',
          paddingTop: '4px',
          borderTop: '1px dashed #ff6b35',
          color: '#444',
          lineHeight: 1.2
        }}>
          <p style={{margin: '2px 0'}}>
            <strong style={{color: '#ff6b35'}}>Phone:</strong> +91-6542-8765-43
          </p>
          <p style={{margin: '2px 0'}}>
            <strong style={{color: '#ff6b35'}}>Email:</strong> ddka@kabaddi.in
          </p>
        </div>

        {/* Address Info */}
        <div style={{
          fontSize: '7px',
          textAlign: 'center',
          margin: '3px 0 5px 0',
          color: '#555',
          lineHeight: 1.25,
          wordWrap: 'break-word'
        }}>
          <p style={{margin: 0}}>
            <strong style={{color: '#ff6b35'}}>Address:</strong> Dhanbad, Jharkhand, India
          </p>
        </div>

        {/* Contact Footer */}
        <div style={{
          fontSize: '7px',
          textAlign: 'center',
          color: '#666',
          marginTop: 'auto',
          paddingTop: '4px',
          borderTop: '1px solid #ff6b35',
          lineHeight: 1.2
        }}>
          <p style={{margin: '2px 0 0 0'}}>
            If found, please return to DDKA office
          </p>
          <p style={{margin: '1px 0'}}>Est. 2017</p>
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
