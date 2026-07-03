import React from 'react';

import PageCard from '../components/pageCard/PageCard';
import img1 from '../assets/img-1.jpg';
import img2 from '../assets/img-2.jpg';
import img3 from '../assets/img-3.jpg';

const Home: React.FC = () => {
    return (
        <div className="page-container">
            <PageCard 
            title="About Me" 
            content="I am a Financial Services Professional with 5 years of experience as a software engineer." 
            backgroundImage={img2} />
            <PageCard 
            title="Bookkeeping" 
            content="I offer comprehensive bookkeeping services to help you stay organized and compliant." 
            backgroundImage={img3} />
            <PageCard 
            title="Tax Preparation" 
            content="I provide expert tax preparation services to ensure you maximize your deductions and minimize your liabilities." 
            backgroundImage={img1} />
            <PageCard 
            title="Payroll Services" 
            content="I offer payroll services to help you manage your employees' compensation and benefits." 
            backgroundImage={img2} />
            <PageCard 
            title="Financial Reporting/Analysis" 
            content="I provide financial reporting and analysis services to help you make informed business decisions." 
            backgroundImage={img3} />
        </div>
    )
}

export default Home;