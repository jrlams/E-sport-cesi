import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Registration from './components/Registration';
import LiveStream from './components/LiveStream';
import Feedback from './components/Feedback';
import Footer from './components/Footer';
import Admin from './components/Admin';
import Schedule from './components/Schedule';
import Games from './components/Games';

function App() {
  const is_admin = window.location.pathname === '/admin';
  return (
    <div className={`min-h-screen`}>
      {is_admin ? (
        <Admin />
      ) : (
        <>
          <Navigation />
          <Hero />
          <About />
          <Schedule />
          <Games />
          <Registration />
          <LiveStream />
          <Feedback />
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;
