import React, { useEffect, useState } from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";  // Change this line
import LandingPage from "./pages/LandingPage";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import AuthPage from "./pages/AuthPage";
import { db } from "./firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth } from "./firebase";

const App = () => {
  const [registeredUsers, setRegisteredUsers] = useState(0);
  const [activeUsers, setActiveUsers] = useState(0);

  const fetchUserCounts = async () => {
    try {
      // Fetch registered users
      const usersCollection = collection(db, "users");
      const usersSnapshot = await getDocs(usersCollection);
      
      // Check if the snapshot is empty
      if (usersSnapshot.empty) {
        console.warn("No users found in the database.");
        setRegisteredUsers(0);
      } else {
        setRegisteredUsers(usersSnapshot.size);
      }
  
      // Fetch active users
      const activeUsersQuery = query(usersCollection, where("active", "==", true));
      const activeUsersSnapshot = await getDocs(activeUsersQuery);
  
      // Check if the snapshot for active users is empty
      if (activeUsersSnapshot.empty) {
        console.warn("No active users found in the database.");
        setActiveUsers(0);
      } else {
        setActiveUsers(activeUsersSnapshot.size);
      }
    } catch (error) {
      console.error("Error fetching users: ", error);
    }
  };
  

  useEffect(() => {
    fetchUserCounts();
  }, []);

  return (
    <Router>  
      <Routes>
        <Route
          path="/"
          element={
            <LandingPage
              registeredUsers={registeredUsers}
              activeUsers={activeUsers}
            />
          }
        />
        <Route
          path="/auth"
          element={<AuthPage onRegisterSuccess={fetchUserCounts} />}
        />
        <Route
          path="/user-dashboard"
          element={<UserDashboard userId={auth.currentUser?.uid} />}
        />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
