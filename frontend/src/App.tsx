import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Registration from './components/Registration';
import LiveStream from './components/LiveStream';
import Feedback from './components/Feedback';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-slate-900">
      <Navigation />
      <Hero />
      <About />
      <Registration />
      <LiveStream />
      <Feedback />
      <Footer />
    </div>
  );
}

export default App;
