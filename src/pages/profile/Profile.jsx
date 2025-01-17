// import styles from './profile.module.css';
// import React, { useState } from 'react';
// import md5 from 'md5';  // Ensure you have the 'md5' package installed

// const Profile = () => {
//     const profileData = {
//         email: "abc@gmail.com",  // Assuming you get the email from user data
//         fullName: "Kshitij M Gajbhiye",
//         aboutMe: "I am a software engineer and love building amazing applications.",
//         contests: [
//             {
//                 name: "Hackathon 2023",
//                 team: "Team Alpha",
//                 teammates: [
//                     { name: "Alice", role: "Frontend Developer" },
//                     { name: "Bob", role: "Backend Developer" },
//                     { name: "Charlie", role: "Designer" }
//                 ]
//             },
//             {
//                 name: "CodeFest 2024",
//                 team: "Team Beta",
//                 teammates: [
//                     { name: "Dave", role: "Full Stack Developer" },
//                     { name: "Eve", role: "Data Scientist" },
//                     { name: "Frank", role: "UI/UX Designer" }
//                 ]
//             }
//         ],
//         details: {
//             university: "IIT Guwahati",
//             age: 23,
//             phone: "9876543210",
//             altPhone: "9876543211",
//             email: "abc@gmail.com",
//             altEmail: "abc@iitg.ac.in"
//         }
//     };

//     const [aboutMe, setAboutMe] = useState(profileData.aboutMe);
//     const [isEditing, setIsEditing] = useState(false);

//     // Function to get the Gravatar URL from the email
//     const getGravatarUrl = (email) => {
//         const hash = md5(email.trim().toLowerCase());
//         return `https://www.gravatar.com/avatar/${hash}?d=404`;  // '404' will fail if no gravatar is found
//     };

//     // Fallback to the first letter of the full name if no profile picture
//     const getInitials = (name) => {
//         return name ? name.charAt(0).toUpperCase() : "";
//     };

//     const gravatarUrl = getGravatarUrl(profileData.details.email);

//     const handleAboutMeChange = (e) => {
//         setAboutMe(e.target.value);
//     };

//     const toggleEdit = () => {
//         setIsEditing(!isEditing);
//     };

//     return (
//         <div className={styles.example}>
//             <div className={styles.container_1}>
//                 <div className={styles.profileCard}>
//                     {/* Profile picture with fallback to initials */}
//                     <img
//                         src={gravatarUrl}
//                         alt="Profile Pic"
//                         className={styles.profilePic}
//                         onError={(e) => {
//                             // If no Gravatar, show the initials
//                             e.target.style.display = "none";  // Hide broken image
//                         }}
//                     />
//                     <div className={styles.initials}>
//                         {getInitials(profileData.fullName)}
//                     </div>
//                     <h2>{profileData.fullName}</h2>
//                     {isEditing ? (
//                         <textarea
//                             className={styles.aboutMeInput}
//                             value={aboutMe}
//                             onChange={handleAboutMeChange}
//                         />
//                     ) : (
//                         <p>{aboutMe}</p>
//                     )}
//                     <button className={styles.editButton} onClick={toggleEdit}>
//                         {isEditing ? "Save" : "Edit"}
//                     </button>
//                 </div>
//             </div>

//             <div className={styles.container_2}>
//                 <div className={styles.card}>
//                     <div>
//                         <h3>Personal Details</h3>
//                         <p><strong>University:</strong> {profileData.details.university}</p>
//                         <p><strong>Age:</strong> {profileData.details.age}</p>
//                         <p><strong>Phone:</strong> {profileData.details.phone}</p>
//                         <p><strong>Alternate Phone:</strong> {profileData.details.altPhone}</p>
//                         <p><strong>Email:</strong> {profileData.details.email}</p>
//                         <p><strong>Alternate Email:</strong> {profileData.details.altEmail}</p>
//                         <h3>Joined Contests</h3>
//                     </div>
//                     <div className={styles.contestsContainer}>
//                         {profileData.contests.map((contest, index) => (
//                             <div key={index} className={styles.contestCard}>
//                                 <p><strong>Contest Name:</strong> {contest.name}</p>
//                                 <p><strong>Team:</strong> {contest.team}</p>
//                                 <p><strong>Teammates:</strong></p>
//                                 <ul>
//                                     {contest.teammates.map((teammate, idx) => (
//                                         <li key={idx}>
//                                             {teammate.name} - {teammate.role}
//                                         </li>
//                                     ))}
//                                 </ul>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Profile;

import styles from './profile.module.css';
import React, { useState, useEffect } from 'react';
import md5 from 'md5';  // Ensure you have the 'md5' package installed
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import { useGetMyUser } from '../../api/MyUserApi';
import { useGetAllTeams } from '../../api/MyUserApi';

const Profile = () => {
    const { allTeams, isLoading: isLoadingTeams } = useGetAllTeams();
    const { user,logout } = useAuth0();  // Import logout function from Auth0
    const [userContests, setUserContests] = useState([]);

    const navigate = useNavigate();
    const { currentUser, isLoading:isGetLoading } = useGetMyUser(); 
    const profileData = {
        email: "abc@gmail.com",  // Assuming you get the email from user data
        fullName: "Your Name",
        aboutMe: "I am a software engineer and love building amazing applications.",
        contests: [
            {
                name: "Hackathon 2023",
                team: "Team Alpha",
                teammates: [
                    { name: "Alice", university: "MIT" },
                    { name: "Bob", university: "MIT" },
                    { name: "Charlie", university: "MIT" }
                ]
            },
            {
                name: "CodeFest 2024",
                team: "Team Beta",
                teammates: [
                    { name: "Dave", university: "Lund University" },
                    { name: "Eve", university: "Lund University" },
                    { name: "Frank", university: "Lund University" }
                ]
            }
        ],
        details: {
            university: "IIT Guwahati",
            age: 23,
            phone: "9876543210",
            altPhone: "9876543211",
            email: "abc@gmail.com",
            altEmail: "abc@iitg.ac.in"
        }
    };

    useEffect(() => {
        if (allTeams && user) {
            // Filter teams where user is either registerer or member
            const userTeams = allTeams.filter(team => 
                team.registeredBy === user.email || 
                team.members.some(member => member.email === user.email)
            );

            // Transform teams data to match your dummy contest structure
            const transformedContests = userTeams.map(team => ({
                name: team.hackathonName,
                team: team.teamName,
                teammates: team.members.map(member => ({
                    name: member.name,
                    university: member.university
                }))
            }));

            setUserContests(transformedContests);
        }
    }, [allTeams, user]);

    const [aboutMe, setAboutMe] = useState(profileData.aboutMe);
    const [isEditing, setIsEditing] = useState(false);

    // Function to get the Gravatar URL from the email
    const getGravatarUrl = (email) => {
        const hash = md5(email.trim().toLowerCase());
        return `https://www.gravatar.com/avatar/${hash}?d=404`;  // '404' will fail if no gravatar is found
    };

    // Fallback to the first letter of the full name if no profile picture
    const getInitials = (name) => {
        return name ? name.charAt(0).toUpperCase() : "";
    };

    const gravatarUrl = getGravatarUrl(profileData.details.email);

    const handleAboutMeChange = (e) => {
        setAboutMe(e.target.value);
    };

    const toggleEdit = () => {
        setIsEditing(!isEditing);
    };

    const handleClick = () => {
         navigate("/profile-form");
    };

    if(isGetLoading) {
        return <span>Loading....</span>
    }
    
    if(!currentUser){
    return (
            <button className={styles.logoutButton} onClick={() => logout()}>
                Unable to load profile page - logout
            </button>
        )
    }

    return (
        <div className={styles.example}>
            <div className={styles.container_1}>
                <div className={styles.profileCard}>
                    {/* Profile picture with fallback to initials */}
                    <img
                        src={gravatarUrl}
                        alt="Profile Pic"
                        className={styles.profilePic}
                        onError={(e) => {
                            // If no Gravatar, show the initials
                            e.target.style.display = "none";  // Hide broken image
                        }}
                    />
                    <div className={styles.initials}>
                        {currentUser.name? getInitials(currentUser.name):getInitials(profileData.fullName)}
                    </div>
                    <h2>{currentUser.name? currentUser.name : profileData.fullName}</h2>
                    {isEditing ? (
                        <textarea
                            className={styles.aboutMeInput}
                            value={aboutMe}
                            onChange={handleAboutMeChange}
                        />
                    ) : (
                        <p>{aboutMe}</p>
                    )}
                    <button className={styles.editButton} onClick={toggleEdit}>
                        {isEditing ? "Save" : "Edit"}
                    </button>

                    <button className={styles.updateButton} onClick={handleClick}>
                        Update
                    </button>
                    
                    {/* Logout Button */}
                    
                    <button className={styles.logoutButton} onClick={() => logout()}>
                        Logout
                    </button>
                    
                </div>
            </div>

            <div className={styles.container_2}>
                <div className={styles.card}>
                    <div>
                        <h3>Personal Details</h3>
                        <p><strong>University:</strong> {currentUser.university}</p>
                        <p><strong>Age:</strong> {currentUser.age}</p>
                        <p><strong>Phone:</strong> {currentUser.phone}</p>
                        <p><strong>Alternate Phone:</strong> {currentUser.alternatePhone}</p>
                        <p><strong>Email:</strong> {currentUser.email}</p>
                        <p><strong>Alternate Email:</strong> {currentUser.alternateEmail}</p>
                        <h3>Joined Contests</h3>
                    </div>
                    <div className={styles.contestsContainer}>
                    {isLoadingTeams ? (
                            <div className={styles.loading}>Loading contests...</div>
                        ) : userContests.length === 0 ? (
                            <div className={styles.noContests}>
                                No contests joined yet
                            </div>
                        ) : (
                            userContests.map((contest, index) => (
                                <div key={index} className={styles.contestCard}>
                                    <p><strong>Contest Name:</strong> {contest.name}</p>
                                    <p><strong>Team:</strong> {contest.team}</p>
                                    <p><strong>Teammates:</strong></p>
                                    <ul>
                                        {contest.teammates.map((teammate, idx) => (
                                            <li key={idx}>
                                                {teammate.name} - {teammate.university}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;

