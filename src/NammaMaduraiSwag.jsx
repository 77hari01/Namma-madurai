import React, { useState, useEffect, useRef } from 'react';
import './NammaMaduraiSwag.css';
import pixelra1 from "./assets/pixelra.jpeg";
import nammamadurai from "./assets/nammamadurai.jpeg";
import dk from "./assets/dk.PNG";
import dj from "./assets/djname.PNG";

const NammaMaduraiSwag = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [floatingHearts, setFloatingHearts] = useState([]);
  const [confetti, setConfetti] = useState([]);
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const heartContainerRef = useRef(null);

  const BOOKING_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLScHoQ3y2R15O1Oe4Vz_XdTCvq1q1Evxrz0DOr2is0B376TaAQ/viewform?usp=publish-editor';

  // Sponsors Data - Easy to add/remove
  const presentedBy = [
    {
      name: "PIXELRA",
      logo: pixelra1, // Replace with actual logo URL or component
      website: "#"
    },
    {
      name: "Team PhotokaraThambies",
      logo: dk, // Replace with actual logo URL or component
      website: "#"
    }
  ];

  const sponsors = [
    {
      category: "Photography Partner",
      items: [
        //{ name: "Pixelra", logo: "logo", website: "#" },
        { name: "Team PhotokaraThambies", logo: dk, website: "#" }
      ]
    },
    {
      category: "Vibe Partner",
      items: [
        { name: "DJ Marvel", logo: dj, website: "#" },
        //{ name: "Sound System", logo: "🎧", website: "#" }
      ]
    },
    // {
    //   category: "Food Partners",
    //   items: [
    //     { name: "Restaurant 1", logo: "🍽️", website: "#" },
    //     { name: "Restaurant 2", logo: "🍕", website: "#" },
    //     { name: "Restaurant 3", logo: "🍔", website: "#" }
    //   ]
    // },
    // {
    //   category: "Media Partners",
    //   items: [
    //     { name: "Media House 1", logo: "📺", website: "#" },
    //     { name: "Media House 2", logo: "📻", website: "#" }
    //   ]
    // }
  ];
  const allSponsors = [
    {
      name: "PIXELRA",
      logo: pixelra1,
      website: "#"
    },
    {
      name: "Team PhotokaraThambies",
      logo: dk,
      website: "#"
    },
    {
      name: "DJ Marvel",
      logo: dj,
      website: "#"
    },
    {
      name: "Namma Madurai",
      logo: nammamadurai,
      website: "#"
    }
    // Add more sponsors here as needed
  ];

  // Countdown Timer
  useEffect(() => {
    const targetDate = new Date('2026-02-14T17:00:00').getTime();
    
    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance > 0) {
        setCountdown({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      } else {
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = ['home', 'events', 'event-info', 'tickets', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Generate initial confetti
  useEffect(() => {
    const confettiColors = ['#FF1744', '#FFD700', '#FF4081', '#D32F2F', '#FFA000'];
    const newConfetti = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 3 + Math.random() * 2,
      color: confettiColors[Math.floor(Math.random() * confettiColors.length)]
    }));
    setConfetti(newConfetti);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenuOpen && !event.target.closest('.mobile-menu') && !event.target.closest('.mobile-menu-btn')) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('touchstart', handleClickOutside);
    document.addEventListener('click', handleClickOutside);
    
    return () => {
      document.removeEventListener('touchstart', handleClickOutside);
      document.removeEventListener('click', handleClickOutside);
    };
  }, [mobileMenuOpen]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setMobileMenuOpen(false);
    }
  };

  const openBookingForm = () => {
    window.open(BOOKING_FORM_URL, '_blank');
  };

  const createHeart = (e) => {
    if (e.type === 'touchstart') {
      e.preventDefault();
    }

    const hearts = ['💕', '💖', '💗', '💓', '💝', '❤️', '🌹', '✨', '🎉'];
    const randomHeart = hearts[Math.floor(Math.random() * hearts.length)];
    
    const rect = heartContainerRef.current.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    
    const newHeart = {
      id: Date.now() + Math.random(),
      emoji: randomHeart,
      x,
      y
    };
    
    setFloatingHearts(prev => [...prev, newHeart]);
    
    setTimeout(() => {
      setFloatingHearts(prev => prev.filter(h => h.id !== newHeart.id));
    }, 2000);
  };

  const events = [
    {
      title: "Runway Ramp Walk",
      description: "Walk the red carpet like a star! Showcase your best Valentine's Day outfit and compete for exciting prizes. Professional photography included!",
      icon: "💃",
      image: "👗",
      gradient: "linear-gradient(135deg, #ff6b9d 0%, #c44569 100%)",
      features: ["Professional Photography", "Prize Money", "Red Carpet Experience"]
    },
    {
      title: "Food Paradise",
      description: "Savor Madurai's iconic foods and spicy street food. 15+ food stalls with couple dining specials!",
      icon: "🍜",
      image: "🍰",
      gradient: "linear-gradient(135deg, #ffa751 0%, #ff6b35 100%)",
      features: ["15+ Food Stalls", "Couple Specials", "Live Cooking"]
    },
    {
      title: "Live Entertainment",
      description: "Top Tamil bands, Fun Entertainment, and surprise celebrity performances. Dance floor open all evening!",
      icon: "🎤",
      image: "🎸",
      gradient: "linear-gradient(135deg, #a29bfe 0%, #6c5ce7 100%)",
      features: ["Tamil Bands", "Celebrity Guests", "Open Dance Floor"]
    }
  ];

  const surpriseEvents = [
    { text: "Celebrity Guest Appearances", icon: "⭐", subtext: "Big names from Tamil cinema!" },
    { text: "Vibe Entertainment", icon: "💃", subtext: "Bringing sound and soul together" }, 
    { text: "Couple Games & Contests", icon: "👫", subtext: "Win amazing prizes" }
  ];

  const ticketPlans = [
    {
      title: "Solo Entry Pass",
      price: "₹100",
      subtitle: "per person",
      popular: false,
      emoji: "🎫",
      benefits: [
        "Full event access",
        "Food court entry",
        "Live shows & entertainment",
        "Photo booth access"
      ]
    },
    {
      title: "Couple Special",
      price: "₹149",
      subtitle: "for 2 people",
      savings: "Save ₹51!",
      popular: true,
      emoji: "💕",
      benefits: [
        "All event access",
        "couple seating",
        "Exclusive photo booth",
        "Couple contest entry"
      ]
    }
  ];

  const coupleActivities = [
    { emoji: "🍽️", label: "Food Stalls", color: "#FF6F61" },
    { emoji: "📸", label: "Couple Photo Booth", color: "#FF1744" },
    { emoji: "💕", label: "Two Lovers Point", color: "#D32F2F" },
    { emoji: "🎪", label: "Fun Games", color: "#FF4081" },
    { emoji: "🎵", label: "Vibe", color: "#6c5ce7" }
  ];

  return (
    <div className="landing-page">
      {/* Confetti Background */}
      <div className="confetti-container">
        {confetti.map(item => (
          <div
            key={item.id}
            className="confetti-piece"
            style={{
              left: `${item.left}%`,
              animationDelay: `${item.delay}s`,
              animationDuration: `${item.duration}s`,
              backgroundColor: item.color
            }}
          />
        ))}
      </div>

      {/* Interactive Hearts Container */}
      <div 
        ref={heartContainerRef}
        className="hearts-container" 
        onClick={createHeart}
        onTouchStart={createHeart}
      >
        {floatingHearts.map(heart => (
          <div
            key={heart.id}
            className="floating-heart-interactive"
            style={{
              left: `${heart.x}px`,
              top: `${heart.y}px`
            }}
          >
            {heart.emoji}
          </div>
        ))}
      </div>

      {/* Navbar */}
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <div className="nav-logo" onClick={() => scrollToSection('home')}>
            <span className="logo-icon">❤️</span>
            <span className="logo-text">Namma Madurai Swag</span>
          </div>
          
          <div className="nav-links">
            <a 
              href="#home" 
              className={activeSection === 'home' ? 'active' : ''}
              onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}
            >
              Home
            </a>
            <a 
              href="#events" 
              className={activeSection === 'events' ? 'active' : ''}
              onClick={(e) => { e.preventDefault(); scrollToSection('events'); }}
            >
              Events
            </a>
            <a 
              href="#event-info" 
              className={activeSection === 'event-info' ? 'active' : ''}
              onClick={(e) => { e.preventDefault(); scrollToSection('event-info'); }}
            >
              Event Info
            </a>
            <a 
              href="#tickets" 
              className={activeSection === 'tickets' ? 'active' : ''}
              onClick={(e) => { e.preventDefault(); scrollToSection('tickets'); }}
            >
              Tickets
            </a>
            <a 
              href="#contact" 
              className={activeSection === 'contact' ? 'active' : ''}
              onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}
            >
              Contact
            </a>
          </div>

          <button 
            className="nav-cta"
            onClick={openBookingForm}
          >
            Book Now
          </button>

          <button 
            className="mobile-menu-btn"
            onClick={(e) => {
              e.stopPropagation();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>

        <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
          <a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}>
            🏠 Home
          </a>
          <a href="#events" onClick={(e) => { e.preventDefault(); scrollToSection('events'); }}>
            🎭 Events
          </a>
          <a href="#event-info" onClick={(e) => { e.preventDefault(); scrollToSection('event-info'); }}>
            ℹ️ Event Info
          </a>
          <a href="#tickets" onClick={(e) => { e.preventDefault(); scrollToSection('tickets'); }}>
            🎫 Tickets
          </a>
          <a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}>
            📞 Contact
          </a>
          <button className="nav-cta mobile-menu-cta" onClick={openBookingForm}>
            Book Now 💖
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-decoration">
          <div className="heart-float heart-1">💕</div>
          <div className="heart-float heart-2">💖</div>
          <div className="heart-float heart-3">✨</div>
          <div className="heart-float heart-4">🌹</div>
          <div className="heart-float heart-5">💝</div>
          <div className="party-balloon balloon-1">🎈</div>
          <div className="party-balloon balloon-2">🎈</div>
          <div className="party-balloon balloon-3">🎈</div>
          <div className="spotlight spotlight-1"></div>
          <div className="spotlight spotlight-2"></div>
        </div>
        
        <div className="hero-content">
          <div className="hero-badge">💘 Valentine's Special 2026</div>
          <h1 className="hero-title">
            Namma Madurai<br />
            <span className="title-highlight">Swag 2026</span>
          </h1>
          <p className="hero-subtitle">🎪 The Ultimate Valentine's Youth Festival 🎪</p>
          <p className="hero-tagline">Where Love Meets Celebration!</p>
          
          {/* Countdown Timer */}
          <div className="countdown-container">
            <div className="countdown-title">⏰ Event Starts In ⏰</div>
            <div className="countdown-timer">
              <div className="countdown-item">
                <div className="countdown-number">{countdown.days}</div>
                <div className="countdown-label">Days</div>
              </div>
              <div className="countdown-separator">:</div>
              <div className="countdown-item">
                <div className="countdown-number">{countdown.hours}</div>
                <div className="countdown-label">Hours</div>
              </div>
              <div className="countdown-separator">:</div>
              <div className="countdown-item">
                <div className="countdown-number">{countdown.minutes}</div>
                <div className="countdown-label">Minutes</div>
              </div>
              <div className="countdown-separator">:</div>
              <div className="countdown-item">
                <div className="countdown-number">{countdown.seconds}</div>
                <div className="countdown-label">Seconds</div>
              </div>
            </div>
          </div>

          <div className="hero-ctas">
            <button 
              className="cta-primary"
              onClick={openBookingForm}
            >
              🎫 Book Tickets
            </button>
            <button 
              className="cta-secondary"
              onClick={() => scrollToSection('events')}
            >
              ✨ Explore Events
            </button>
          </div>

          <div className="event-info-chips">
            <div className="info-chip">
              <span className="chip-icon">📅</span>
              <div className="chip-content">
                <span className="chip-label">Date</span>
                <span className="chip-value">Feb 14, 2026</span>
              </div>
            </div>
            <div className="info-chip">
              <span className="chip-icon">📍</span>
              <div className="chip-content">
                <span className="chip-label">Venue</span>
                <span className="chip-value">Party Park</span>
              </div>
            </div>
            <div className="info-chip">
              <span className="chip-icon">⏰</span>
              <div className="chip-content">
                <span className="chip-label">Time</span>
                <span className="chip-value">5 PM - 10 PM</span>
              </div>
            </div>
          </div>

          <div className="hero-stats">
            <div className="stat-item">
              <div className="stat-number">15+</div>
              <div className="stat-label">Food Stalls</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">600+</div>
              <div className="stat-label">Expected Visitors</div>
            </div>
          </div>
        </div>
      </section>

      {/* Couple Activities Section */}
      <section className="couple-activities">
        <div className="section-container">
          <h2 className="activities-title">💕 Perfect for Couples 💕</h2>
          <div className="activities-grid">
            {coupleActivities.map((activity, index) => (
              <div 
                className="activity-card" 
                key={index}
                style={{ 
                  animationDelay: `${index * 0.1}s`,
                  '--activity-color': activity.color 
                }}
              >
                <div className="activity-icon">{activity.emoji}</div>
                <div className="activity-label">{activity.label}</div>
                <div className="activity-glow"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section id="events" className="events-section">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">What Awaits You 🎊</h2>
            <p className="section-description">
              Get ready for the most exciting Valentine's Day celebration Madurai has ever seen! 
              From fashion runways to food paradise, we've got it all!
            </p>
          </div>

          <div className="events-grid">
            {events.map((event, index) => (
              <div 
                className="event-card" 
                key={index}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="event-card-header" style={{ background: event.gradient }}>
                  <div className="event-icon-wrapper">
                    <div className="event-icon">{event.icon}</div>
                    <div className="event-image">{event.image}</div>
                  </div>
                  <div className="event-sparkles">
                    <span>✨</span>
                    <span>✨</span>
                    <span>✨</span>
                  </div>
                </div>
                <div className="event-card-body">
                  <h3 className="event-title">{event.title}</h3>
                  <p className="event-description">{event.description}</p>
                  
                  {/* Event Features */}
                  {/* <div className="event-features">
                    {event.features.map((feature, idx) => (
                      <span key={idx} className="event-feature-tag">
                        ✓ {feature}
                      </span>
                    ))}
                  </div> */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Surprise Section */}
      <section className="surprise-section">
        <div className="section-container">
          <div className="surprise-content">
            <div className="party-decoration">
              <span className="party-emoji">🎉</span>
              <span className="party-emoji">🎊</span>
              <span className="party-emoji">🎁</span>
              <span className="party-emoji">🎈</span>
            </div>
            <h2 className="surprise-title">🎉 Surprise Events Coming Soon! 🎉</h2>
            <p className="surprise-description">
              We're keeping some magical moments under wraps! Get ready for unexpected celebrity guests, 
              grand prizes, and experiences that will make this Valentine's Day legendary!
            </p>
            
            <div className="surprise-grid">
              {surpriseEvents.map((item, index) => (
                <div 
                  className="surprise-badge" 
                  key={index}
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  <span className="surprise-icon">{item.icon}</span>
                  <div className="surprise-content-text">
                    <span className="surprise-text">{item.text}</span>
                    <span className="surprise-subtext">{item.subtext}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Event Details */}
      <section id="event-info" className="event-details">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">Event Details 📋</h2>
          </div>

          <div className="details-grid">
            <div className="detail-card">
              <div className="detail-icon-wrapper">
                <div className="detail-icon">📅</div>
                <div className="icon-decoration">💕</div>
              </div>
              <h3 className="detail-title">Date & Time</h3>
              <p className="detail-content">
                <strong>February 14, 2026</strong><br />
                Friday - Valentine's Day<br />
                05:00 PM – 10:00 PM
              </p>
            </div>

            <div className="detail-card">
              <div className="detail-icon-wrapper">
                <div className="detail-icon">📍</div>
                <div className="icon-decoration">🎈</div>
              </div>
              <h3 className="detail-title">Venue</h3>
              <p className="detail-content">
                <strong>Party Park</strong><br />
                T.kodimangalam Main Road<br />
                Madurai, Tamil Nadu
              </p>
            </div>

            <div className="detail-card">
              <div className="detail-icon-wrapper">
                <div className="detail-icon">⏱️</div>
                <div className="icon-decoration">✨</div>
              </div>
              <h3 className="detail-title">Duration</h3>
              <p className="detail-content">
                <strong>5 Hours of Non-Stop Fun</strong><br />
                Multiple simultaneous events<br />
                Something for everyone!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tickets */}
      <section id="tickets" className="tickets-section">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">Get Your Tickets 🎫</h2>
            <p className="section-description">
              Limited seats available! Book now and get exclusive early bird benefits. 
              Bring your friends, bring your partner, and make memories that last forever!
            </p>
          </div>

          <div className="tickets-grid">
            {ticketPlans.map((plan, index) => (
              <div 
                className={`ticket-card ${plan.popular ? 'popular' : ''}`} 
                key={index}
              >
                {plan.popular && (
                  <>
                    <div className="popular-badge">
                      <span>⭐ Most Popular</span>
                    </div>
                  </>
                )}
                
                <div className="ticket-emoji">{plan.emoji}</div>
                
                <div className="ticket-header">
                  <h3 className="ticket-title">{plan.title}</h3>
                  {plan.savings && <div className="ticket-savings">{plan.savings}</div>}
                  <div className="ticket-price">
                    <span className="price-amount">{plan.price}</span>
                    <span className="price-subtitle">{plan.subtitle}</span>
                  </div>
                </div>

                <ul className="ticket-benefits">
                  {plan.benefits.map((benefit, i) => (
                    <li key={i}>
                      <span className="benefit-icon">✓</span>
                      <span className="benefit-text">{benefit}</span>
                    </li>
                  ))}
                </ul>

                <button className="ticket-cta" onClick={openBookingForm}>
                  {plan.popular ? '💖 Book Couple Pass' : '🎫 Book Now'}
                </button>
              </div>
            ))}
          </div>

          <div className="tickets-note">
            <p>💳 Multiple payment options available | 📱 E-tickets sent instantly | 🎉 No hidden charges</p>
          </div>
        </div>
      </section>

      {/* Sponsors Section */}
      <section className="sponsors-section">
        <div className="section-container">
          <div className="sponsors-content">
            <h2 className="sponsors-heading">Our Amazing Sponsors </h2>
            
            {/* Presented By Section */}
            <div className="presented-by-section">
              <h3 className="sponsor-section-title">Presented By</h3>
              <div className="presented-logos">
                {presentedBy.map((sponsor, index) => (
                  <a 
                    href={sponsor.website} 
                    key={index}
                    className="sponsor-logo-card main-sponsor"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="sponsor-logo">
                      <img
                        src={sponsor.logo}
                        alt={sponsor.name}
                        className="sponsor-logo-img"
                      />
                    </div>
                    <div className="sponsor-name">{sponsor.name}</div>
                  </a>
                ))}
              </div>
            </div>

            {/* Sponsored By Section */}
            <div className="sponsored-by-section">
              <h3 className="sponsor-section-title">Sponsored By</h3>
              {sponsors.map((category, catIndex) => (
                <div key={catIndex} className="sponsor-category">
                  <h4 className="sponsor-category-title">{category.category}</h4>
                  <div className="sponsor-logos-grid">
                    {category.items.map((sponsor, index) => (
                      <a 
                        href={sponsor.website} 
                        key={index}
                        className="sponsor-logo-card"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <div className="sponsor-logo">
                          <img
                            src={sponsor.logo}
                            alt={sponsor.name}
                            className="sponsor-logo-img"
                          />
                        </div>
                        <div className="sponsor-name">{sponsor.name}</div>
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="contact-section">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">Get in Touch 📞</h2>
            <p className="section-description">
              Have questions? Need group bookings or special arrangements? 
              We're here 24/7 to make your Valentine's Day perfect!
            </p>
          </div>

          <div className="contact-grid">
            <div className="contact-card">
              <div className="contact-icon">📧</div>
              <h3 className="contact-label">Email Us</h3>
              <a href="mailto:nammamaduraiswag@gmail.com" className="contact-value">
                nammamaduraiswag@gmail.com
              </a>
              <p className="contact-note">Response within 2 hours</p>
            </div>

            <div className="contact-card">
              <div className="contact-icon">📞</div>
              <h3 className="contact-label">Call / WhatsApp</h3>
              <a href="tel:+919042533115" className="contact-value">
                +91 90425 33115 
              </a>
              <a href="tel:+916381499921" className="contact-value">
                +91 63814 99921
              </a>
              <p className="contact-note">Available 9 AM - 9 PM</p>
            </div>
          </div>

          <div className="social-section">
            <h3 className="social-title">Follow Us for Updates! 🌟</h3>
            <div className="social-icons">
              <a href="https://www.instagram.com/namma_madurai_swag" className="social-icon instagram" aria-label="Instagram">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-grid">
            <div className="footer-col">
              <div className="footer-logo">
                <span className="logo-icon">❤️</span>
                <span className="logo-text">Namma Madurai Swag 2026</span>
              </div>
              <p className="footer-description">
                Join thousands of youth in celebrating love, friendship, and togetherness 
                at Madurai's grandest Valentine's Day festival. An unforgettable experience awaits!
              </p>
            </div>

            <div className="footer-col">
              <h4 className="footer-heading">Event Info</h4>
              <ul className="footer-list">
                <li>📅 February 14, 2026</li>
                <li>⏰ 05:00 PM - 10:00 PM</li>
                <li>📍 Party Park</li>
                <li>💌 T.Kodimangalam Main Road Madurai</li>
              </ul>
            </div>

            <div className="footer-col">
              <h4 className="footer-heading">Quick Links</h4>
              <ul className="footer-list">
                <li><a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}>Home</a></li>
                <li><a href="#events" onClick={(e) => { e.preventDefault(); scrollToSection('events'); }}>Events</a></li>
                <li><a href="#event-info" onClick={(e) => { e.preventDefault(); scrollToSection('event-info'); }}>Event Info</a></li>
                <li><a href="#tickets" onClick={(e) => { e.preventDefault(); scrollToSection('tickets'); }}>Get Tickets</a></li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <p className="copyright">
              © 2026 Namma Madurai Swag. All rights reserved. Made with love in Madurai ❤️
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default NammaMaduraiSwag;