import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Landing from './pages/Landing';
import Rentals from './pages/Rentals';
import RentalDetail from './pages/RentalDetails';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import Verification from './pages/Verification';
import Renters from './pages/Renters';
import RenterProfile from './pages/RenterProfile';
import ReportAbuse from './pages/ReportAbuse';
import RentalHistory from './pages/RentalHistory';
import WhoRentedMe from './pages/WhoRentedMe';
import Login from './pages/Login';
import Register from './pages/Register';
import VerifyEmail from './pages/VerifyEmail';
import HumanReviewDashboard from './pages/HumanReview';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navigation />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/rentals" element={<Rentals />} />
              <Route path="/rental/:id" element={<RentalDetail />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/profile/edit" element={<ProfileEdit />} />
              <Route path="/verification" element={<Verification />} />
              <Route path="/renters" element={<Renters />} />
              <Route path="/renter/:id" element={<RenterProfile />} />
              <Route path="/report-abuse" element={<ReportAbuse />} />
              <Route path="/rental-history" element={<RentalHistory />} />
              <Route path="/who-rented-me" element={<WhoRentedMe />} />
              <Route path="/contact" element={<HumanReviewDashboard />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/verify-email" element={<VerifyEmail />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
