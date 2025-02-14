import React from 'react'

const Template = ({data}) => {
  const resumeColors = [
    { bgColor: "rgb(225, 61, 99)", textColor: "rgb(255, 255, 255)" }, // Format 1
    { bgColor: "rgb(34, 109, 11)", textColor: "rgb(255, 255, 255)" }, // Format 2
    { bgColor: " #282c36", textColor: "rgb(255, 255, 255)" }, // Format 3
    { bgColor: "rgb(55, 49, 49)", textColor: "rgb(255, 255, 255)" }, // Format 4
    { bgColor: "rgb(235, 89, 67)", textColor: "rgb(255, 255, 255)" }, // Format 5
];
  const htmlString = [
    `<html>
<body>
<style>
body {
font-family: Arial, sans-serif;
width: 210mm;
height: 297mm;
margin: 0 auto;
padding: 5mm;
box-sizing: border-box;
background-color: white;
}
.resume-container {
background: white;
padding: 20px;
box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}
.header {
display: flex;
align-items: center;
background:${resumeColors[0].bgColor};
color:${resumeColors[0].textColor};
padding: 20px;
border-radius: 8px;
}
.headerTwo {
margin-top:20px;
}
.profile-img {
max-width: 80px;
max-height: 80px;
border-radius: 50%;
background: white;
display: flex;
align-items: center;
justify-content: center;
font-size: 20px;
font-weight: bold;
color:${resumeColors[0].bgColor};
margin-right: 20px;
}
.header-text {
flex: 1;
}
.name {
font-size: 32px;
font-weight: bold;
text-transform: uppercase;
}
.contact {
font-size: 14px;
margin-top: 5px;
}
.content-wrapper {
display: flex;
margin-top: 20px;
}
.left-section {
width: 70%;
padding-right: 20px;
border-right: 2px solid #ddd;
}
.right-section {
width: 30%;
padding-left: 20px;
}
.section-title {
font-size: 24px;
font-weight: bold;
color:${resumeColors[0].bgColor};
margin-bottom: 20px;
}
.experience-item,
.education-item {
margin-bottom: 25px;
}
.date-range {
font-size: 14px;
color: #666;
font-weight: bold;
}
.job-title {
font-size: 16px;
font-weight: bold;
margin-top: 5px;
}
.description {
font-size: 14px;
color: #333;
margin-top: 5px;
}
.skills {
margin-top: 10px;
display: flex;
flex-wrap: wrap;
}
.skill-badge {
background:${resumeColors[0].bgColor};
color: ${resumeColors[0].textColor};
padding: 5px 10px;
margin: 5px;
border-radius: 4px;
font-size: 12px;
}
</style>

<div class="resume-container">
<div class="header">
<div class="profile-img">
<img class="profile-img" src=${data.personal.photo} alt="Profile" />
</div>


<div class="header-text">
  <div class="name">${data.personal.fullName || "Your Name"}</div>
  <div class="contact">📧 ${data.personal.email || ""} | 📞 ${data.personal.number || ""} | 📍 ${data.personal.address || ""}</div>
</div>
</div>

<div class="headerTwo">

<div class="header-text">
<div class="section-title">About Me</div>
  <div class="">${data.bio.bio || "Your Name"}</div>
</div>
</div>

<div class="content-wrapper">
<div class="left-section">
  <div class="section-title">Experience & Training</div>
  ${data.training_expe
        .map(
            (exp) => `
      <div class="experience-item">
        <div class="date-range">${exp.from} - ${exp.to}</div>
        <div class="job-title">${exp.training_company} - ${exp.course_job}</div>
        <div class="description">${exp.description}</div>
      </div>
    `
        )
        .join("")}
</div>

<div class="right-section">
  <div class="section-title">Education</div>
  ${data.educational
        .map(
            (edu) => `
      <div class="education-item">
        <div class="date-range">${edu.from} - ${edu.to}</div>
        <div class="job-title">${edu.university_school} - ${edu.degree_class}</div>
      </div>
    `
        )
        .join("")}

  <div class="section-title">Skills</div>
  <div class="skills">
    ${data.skill.map((s) => `<div class="skill-badge">${s.skill}</div>`).join("")}
  </div>
</div>
</div>
</div>
</body>
</html>
`,


    `<html>
<body>
<style>
body {
font-family: Arial, sans-serif;
width: 210mm;
height: 297mm;
margin: 0 auto;
padding: 5mm;
box-sizing: border-box;
background-color: white;
}
.name {
font-size: 32px;
font-weight: bold;
text-transform: uppercase;
margin-bottom: 30px;
color:${resumeColors[1].textColor};
}
.resume-container {
background: white;
padding: 20px;
box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
display: flex;
height: 100%
}
.headerTwo {
margin-top:20px;
margin-bottom:20px;
}
.left-section {
width: 30%;
background:${resumeColors[1].bgColor};
padding: 20px;
border-radius: 8px;
}
.profile-img {
width: 100px;
height: 100px;
border-radius: 50%;
background: white;
display: flex;
align-items: center;
justify-content: center;
font-size: 24px;
font-weight: bold;
color: darkgreen;
margin: 0 auto 20px;
}
.personal-details, {
margin-bottom: 20px;
color:${resumeColors[1].textColor};
}
.education, .skills {
margin-bottom: 20px;
color:${resumeColors[1].textColor};
}
.section-title {
font-size: 20px;
font-weight: bold;
color: darkgreen;
margin-bottom: 10px;
}
.section-titles {
font-size: 20px;
font-weight: bold;
color: ${resumeColors[1].textColor};
margin-bottom: 10px;
margin-top:20px
}
.contact {
font-size: 14px;
color:${resumeColors[1].textColor};
}
.skills .skill-badge {
background: darkgreen;
color: ${resumeColors[1].textColor};
padding: 5px 10px;
margin: 5px 0;
border-radius: 4px;
font-size: 12px;
display: block;
}
.right-section {
width: 70%;
padding-left: 20px;
}
.experience-item {
margin-bottom: 15px;
}
//   .date-range {
//     font-size: 14px;
//     color: #666;
//     font-weight: bold;
//   },
.date-ranges {
font-size: 14px;
color: ${resumeColors[1].textColor};
font-weight: bold;
margin-top: 25px
}
.job-title {
font-size: 16px;
font-weight: bold;
margin-top: 5px;
}
.job-titles {
font-size: 16px;
font-weight: bold;
margin-top: 15px;
}
.description {
font-size: 14px;
color: #333;
margin-top: 5px;
}
</style>

<div class="resume-container">

<div class="left-section">
<div class="name">${data.personal.fullName || "Your Name"}</div>
<div class="personal-details">
<div class="section-titles">Personal Details</div>
<div class="contact">📧 ${data.personal.email || ""} <br> 📞 ${data.personal.number || ""} <br> 📍 ${data.personal.address || ""}</div>
</div>
<div class="education">
<div class="section-titles">Education</div>
${data.educational.map((edu) => `
<div class="education-item">
  <div class="date-ranges">${edu.from} - ${edu.to}</div>
  <div class="job-titles">${edu.university_school} - ${edu.degree_class}</div>
</div>
`).join("")}
</div>
<div class="skills">
<div class="section-titles">Skills</div>
${data.skill.map((s) => `<div class="skill-badge">${s.skill}</div>`).join("")}
</div>
</div>

<div class="right-section">

<div class="headerTwo">

<div class="header-text">
<div class="section-title">About Me</div>
  <div class="">${data.bio.bio || "Your Name"}</div>
</div>
</div>
<div class="section-title">Experience & Training</div>
${data.training_expe.map((exp) => `
<div class="experience-item">
<div class="date-range">${exp.from} - ${exp.to}</div>
<div class="job-title">${exp.training_company} - ${exp.course_job}</div>
<div class="description">${exp.description}</div>
</div>
`).join("")}
</div>
</div>
</body>
</html>`,


    `<html>
<body>
<style>
body {
font-family: Arial, sans-serif;
width: 210mm;
height: 297mm;
margin: 0 auto;
padding: 10mm;
box-sizing: border-box;
background-color: #1e1e2e;
color: ${resumeColors[2].textColor};
}
.resume-container {
display: flex;
background:${resumeColors[2].bgColor};
box-shadow: 0px 0px 15px rgba(255, 255, 255, 0.1);
border-radius: 10px;
overflow: hidden;
height: 100%
}
.sidebar {
width: 30%;
background: #181a22;
padding: 20px;
text-align: center;
}
.profile-img {
width: 120px;
height: 120px;
border-radius: 50%;
background:${resumeColors[2].textColor};;
display: flex;
align-items: center;
justify-content: center;
font-size: 24px;
font-weight: bold;
color: #181a22;
margin: 0 auto 20px;
}
.section-title {
font-size: 18px;
font-weight: bold;
color: #4caf50;
margin-bottom: 10px;
border-bottom: 2px solid #4caf50;
padding-bottom: 5px;
margin-top:20px;
}
.contact-info, .education, .skills {
text-align: left;
font-size: 14px;
margin-top: 10px;
}
.skill-badge {
background: #4caf50;
color: ${resumeColors[2].textColor};
padding: 6px 12px;
margin: 4px 0;
border-radius: 4px;
font-size: 12px;
display: inline-block;
}
.main-content {
width: 70%;
padding: 30px;
}
.name {
font-size: 28px;
font-weight: bold;
text-transform: uppercase;
}
.experience-item {
margin-bottom: 20px;
}
.date-range {
font-size: 14px;
color: #4caf50;
font-weight: bold;
}
.job-title {
font-size: 16px;
font-weight: bold;
margin-top: 5px;
}
.description {
font-size: 14px;
color: #ddd;
margin-top: 5px;
}
</style>

<div class="resume-container">
<div class="sidebar">
<div class="profile-img">
<img class="profile-img" src=${data.personal.photo} alt="Profile" />
</div>
<div class="section-title">Contact</div>
<div class="contact-info">📧 ${data.personal.email || ""} <br> 📞 ${data.personal.number || ""} <br> 📍 ${data.personal.address || ""}</div>

<div class="section-title">Education</div>
${data.educational.map((edu) => `
<div class="education">
<div class="date-range">${edu.from} - ${edu.to}</div>
<div>${edu.university_school} - ${edu.degree_class}</div>
</div>
`).join("")}

<div class="section-title">Skills</div>
${data.skill.map((s) => `<div class="skill-badge">${s.skill}</div>`).join("")}
</div>

<div class="main-content">
<div class="name">${data.personal.fullName || "Your Name"}</div>
<div class="section-title">About Me</div>
<div>${data.bio.bio || "Your Bio Here"}</div>

<div class="section-title">Experience & Training</div>
${data.training_expe.map((exp) => `
<div class="experience-item">
<div class="date-range">${exp.from} - ${exp.to}</div>
<div class="job-title">${exp.training_company} - ${exp.course_job}</div>
<div class="description">${exp.description}</div>
</div>
`).join("")}
</div>
</div>
</body>
</html>
`,
    `<html>
<head>
<style>
body {
font-family: 'Arial', sans-serif;
width: 210mm;
height: 297mm;
margin: 0 auto;
padding: 4mm;
box-sizing: border-box;
background-color: #121212;
color: #ffffff;
}
.resume-container {
display: flex;
background: #1e1e1e;
box-shadow: 0px 0px 15px rgba(255, 255, 255, 0.1);
border-radius: 12px;
overflow: hidden;
height: 100%
}
.sidebar {
width: 35%;
background: #181a1f;
padding: 25px;
text-align: center;
color: #ffffff;
height: 100%
}
.profile-img {
width: 130px;
height: 130px;
border-radius: 50%;
background: #ffffff;
display: flex;
align-items: center;
justify-content: center;
font-size: 26px;
font-weight: bold;
color: #181a1f;
margin: 0 auto 20px;
}
.section-title {
font-size: 20px;
font-weight: bold;
color: #ff9800;
margin-bottom: 12px;
border-bottom: 2px solid #ff9800;
padding-bottom: 6px;
text-align: left;
margin-top:20px;
}
.contact-info, .education, .skills {
text-align: left;
font-size: 15px;
margin-top: 10px;
}
.skill-badge {
background: #ff9800;
color: white;
padding: 6px 14px;
margin: 5px 2px;
border-radius: 6px;
font-size: 13px;
display: inline-block;
}
.main-content {
width: 65%;
padding: 35px;
background: ${resumeColors[3].bgColor};
}
.name {
font-size: 30px;
font-weight: bold;
text-transform: uppercase;
color: #ff9800;
margin-bottom: 15px;
}
.experience-item {
margin-bottom: 25px;
}
.date-range {
font-size: 15px;
color: #ff9800;
font-weight: bold;
}
.job-title {
font-size: 17px;
font-weight: bold;
margin-top: 6px;
color: #ffffff;
}
.description {
font-size: 14px;
color: #ddd;
margin-top: 6px;
}
</style>
</head>
<body>
<div class="resume-container">
<div class="sidebar">
<div class="profile-img">
<img class="profile-img" src=${data.personal.photo} alt="Profile" />
</div>
<div class="section-title">Contact</div>
<div class="contact-info">📧 ${data.personal.email || ""} <br> 📞 ${data.personal.number || ""} <br> 📍 ${data.personal.address || ""}</div>

<div class="section-title">Education</div>
${data.educational.map((edu) => `
<div class="education">
<div class="date-range">${edu.from} - ${edu.to}</div>
<div>${edu.university_school} - ${edu.degree_class}</div>
</div>
`).join("")}

<div class="section-title">Skills</div>
${data.skill.map((s) => `<div class="skill-badge">${s.skill}</div>`).join("")}
</div>
<div class="main-content">
<div class="name">${data.personal.fullName || "Your Name"}</div>
<div class="section-title">About Me</div>
<div>${data.bio.bio || "Your Bio Here"}</div>

<div class="section-title">Experience & Training</div>
${data.training_expe.map((exp) => `
<div class="experience-item">
<div class="date-range">${exp.from} - ${exp.to}</div>
<div class="job-title">${exp.training_company} - ${exp.course_job}</div>
<div class="description">${exp.description}</div>
</div>
`).join("")}
</div>
</div>
</body>
</html>
`,
    `<html>
<body>
<style>
body {
font-family: Arial, sans-serif;
width: 210mm;
height: 297mm;
margin: 0 auto;
padding: 5mm;
box-sizing: border-box;
background-color: #F8F9FA; /* Light gray background */

}
.resume-container {
display: flex;
flex-direction: column;
background: white;
box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
padding: 20px;
border-radius: 8px;
height: 100%;
}
.header {
text-align: center;
background-color:${resumeColors[4].bgColor};
color: white;
padding: 15px;
border-radius: 8px;
}
.name {
font-size: 28px;
font-weight: bold;
text-transform: uppercase;
}
.contact-info {
margin-top: 5px;
font-size: 14px;
}
.content {
display: flex;
margin-top: 20px;
min-height: 100%;
height: 100%
}
.left-section {
width: 35%;
background:${resumeColors[4].bgColor};
color: white;
padding: 15px;
border-radius: 8px;
height: 100%
}
.education-item{
margin-top:20px
}
.profile-img {
width: 120px;
height: 120px;
border-radius: 50%;
background: white;
display: flex;
align-items: center;
justify-content: center;
font-size: 24px;
font-weight: bold;
color:${resumeColors[4].bgColor};
margin: 0 auto 20px;
}
.profile-img img {
width: 100%;
height: 100%;
border-radius: 50%;
object-fit: cover;
}
.section-title {
font-size: 18px;
font-weight: bold;
margin-bottom: 10px;
border-bottom: 2px solid #ddd;
padding-bottom: 5px;
margin-top: 20px
}
.section-title.white {
color: white;
border-bottom-color: rgba(255, 255, 255, 0.5);
}
.skills .skill-badge {
background: white;
color:${resumeColors[4].bgColor};
padding: 6px 12px;
margin: 4px 0;
border-radius: 4px;
font-size: 12px;
display: inline-block;
}
.right-section {
width: 65%;
padding-left: 20px;
}
.experience-item {
margin-bottom: 15px;
}
.date-range, .date-ranges {
font-size: 14px;
font-weight: bold;
}
.date-range {
color: #666;
}
.date-ranges {
color: white;
}
.job-title {
font-size: 16px;
font-weight: bold;
color:${resumeColors[4].bgColor};
}
.job-titles {
font-size: 16px;
font-weight: bold;
color: white;
}
.description {
font-size: 14px;
color: #333;
margin-top: 5px;
}
</style>

<div class="resume-container">
<div class="header">
<div class="name">${data.personal.fullName || "Your Name"}</div>
<div class="contact-info">
📧 ${data.personal.email || ""} | 📞 ${data.personal.number || ""} | 📍 ${data.personal.address || ""}
</div>
</div>

<div class="content">
<div class="left-section">
<div class="profile-img">
<img src="${data.personal.photo || ''}" alt="Profile Picture" />
</div>
<div class="section-title white">Education</div>
${data.educational.map((edu) => `
<div class="education-item">
  <div class="date-ranges">${edu.from} - ${edu.to}</div>
  <div class="job-titles">${edu.university_school} - ${edu.degree_class}</div>
</div>
`).join("")}

<div class="section-title white">Skills</div>
${data.skill.map((s) => `<div class="skill-badge">${s.skill}</div>`).join("")}
</div>

<div class="right-section">
<div class="headerTwo">
<div class="header-text">
  <div class="section-title">About Me</div>
  <div class="">${data.bio.bio || "Your Bio Here"}</div>
</div>
</div>
<div class="section-title">Experience & Training</div>
${data.training_expe.map((exp) => `
<div class="experience-item">
  <div class="date-range">${exp.from} - ${exp.to}</div>
  <div class="job-title">${exp.training_company} - ${exp.course_job}</div>
  <div class="description">${exp.description}</div>
</div>
`).join("")}
</div>
</div>
</div>
</body>
</html>
`,

]

  return htmlString
}

export default Template
