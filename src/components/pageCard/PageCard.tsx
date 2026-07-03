import React from 'react';

import '../../App.css';

const PageCard: React.FC<{ title: string; content: string; backgroundImage?: string }> = ({ title, content, backgroundImage }) => {
    const style: React.CSSProperties = {
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        width: '100%',
        height: 320,
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        border: '1px solid #000000',
        color: '#fff',
        overflow: 'hidden',
        boxShadow: '0 18px 40px rgba(0, 0, 0, 0.2)',
    };

    const overlayStyle: React.CSSProperties = {
        position: 'absolute',
        inset: 0,
        background: 'rgba(0, 0, 0, 0.35)',
        backdropFilter: 'blur(6px)',
        zIndex: 0,
    };


    return (
        <div style={style}>
            <div style={overlayStyle} />
            <div className="page-card-content">
                <h1>{title}</h1>
                <p>{content}</p>
            </div>
        </div>
    );
};

export default PageCard;