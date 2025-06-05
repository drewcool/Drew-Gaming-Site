
import React, { useEffect, useRef } from 'react';
import Hero from './components/Hero'
import './index.css';
import About from './components/About';
import Navbar from './components/Navbar';
import Feature from './components/Feature';
import Story from './components/Story';
import Contact from './components/Contact';
import Footer from './components/Footer';

import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const App = () => {
   const lenisRef = useRef(null);

   useEffect(() => {
    // 1. Initialize Lenis
    const lenis = new Lenis({
      smooth: true,
      lerp: 0.1,
    });
    lenisRef.current = lenis;

    // 2. Sync with requestAnimationFrame
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // 3. Sync Lenis with ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // 4. Let ScrollTrigger use Lenis scroller
    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop(value) {
        return arguments.length ? lenis.scrollTo(value) : lenis.scroll.instance.scroll.y;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      pinType: document.body.style.transform ? 'transform' : 'fixed',
    });

    // 5. Refresh ScrollTrigger after setup
    ScrollTrigger.addEventListener ('refresh', () => lenis.raf(performance.now()))
    ScrollTrigger.refresh();

    // Cleanup on unmount
    return () => {
      lenis.destroy();
      ScrollTrigger.kill();
    };
  }, []);
  return (
    <main className='relative min-h-screen w-screen overflow-x-hidden '>
      <Navbar />
      <Hero />
      <About />
      <Feature />
      <Story />
      <Contact />
      <Footer />
      
    </main>
  )
}

export default App
