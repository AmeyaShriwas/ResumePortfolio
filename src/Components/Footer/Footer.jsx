import React from 'react';

const Footer = ({ isMobile }) => {
    return (
        <footer
            style={{
                width: '100%',
                marginTop: '20px',
                padding: '10px',
                backgroundColor: '#222',
                color: '#fff',
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
            }}
        >
            <span>© {new Date().getFullYear()} Resume & Portfolio Builder &nbsp;|&nbsp;</span>
            <span>🚀 Build Your Professional Portfolio Today &nbsp;|&nbsp;</span>
            <span>✨ Designed by <strong>Ameya Shriwas</strong></span>
        </footer>
    );
};

export default Footer;
