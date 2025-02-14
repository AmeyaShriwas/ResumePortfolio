import React, { useEffect, useState } from 'react';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import { useSelector } from 'react-redux';
import PdfComponent from './PdfComponent';
import PdfGenerator from './PdfComponent';

const SelectResume = ({ isMobile, setIsMobile }) => {
    const personalDetails = useSelector(state => state.personalDetails);
    const educationalDetails = useSelector(state => state.educationalDetails);
    const trainingExperienceDetails = useSelector(state => state.traningExperienceDetails);
    const skillsDetails = useSelector(state => state.skillDetails);
    const bioDetails = useSelector(state => state.bio);

    const [data, setData] = useState({ personal: {}, educational: [], training_expe: [], skill: [], bio: {} });

    useEffect(() => {
        setData({
            personal: personalDetails,
            educational: educationalDetails,
            training_expe: trainingExperienceDetails,
            skill: skillsDetails,
            bio: bioDetails
        });
    }, [personalDetails, educationalDetails, trainingExperienceDetails, skillsDetails]);

    return (
        <>
            <Header isMobile={isMobile} setIsMobile={setIsMobile} />
            <div className="p-4" style={{ minHeight: '100vh' }}>
                <h2>Select Your Preferred Resume Template and Click to Download Yours</h2>
                <p>Browse through our collection of professionally designed resume templates and choose the one that best represents your skills and experience.</p>
                <p>Ensure your resume stands out by selecting a layout that highlights your strengths effectively.</p>
                <PdfGenerator data={data} />
            </div>
            <div>
            {/* <Footer isMobile={isMobile} setIsMobile={setIsMobile} /> */}
            </div>
        </>
    );
};

export default SelectResume;