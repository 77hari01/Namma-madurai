import React, { useState, useEffect } from 'react';
import { Heart, MapPin, Calendar, Clock, Music, Users, Utensils, ShoppingBag, Star, Phone, Mail, Instagram, Facebook, Twitter } from 'lucide-react';

const EventWebsite = () => {
  const [scrollY, setScrollY] = useState(0);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', tickets: '1' });
  const [clickHearts, setClickHearts] = useState([]);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle click/tap to show hearts
  const handleClick = (e) => {
    const newHeart = {
      id: Date.now(),
      x: e.clientX,
      y: e.clientY
    };
    
    setClickHearts(prev => [...prev, newHeart]);
    
    // Remove heart after animation completes
    setTimeout(() => {
      setClickHearts(prev => prev.filter(h => h.id !== newHeart.id));
    }, 1000);
  };

  const handleSubmit = () => {
    if (formData.name && formData.email && formData.phone) {
      alert('Registration submitted! We\'ll contact you soon.');
      setFormData({ name: '', email: '', phone: '', tickets: '1' });
    } else {
      alert('Please fill in all fields');
    }
  };

  const activities = [
    { icon: Users, title: 'Ramp Walk Show', desc: 'Glamorous runway featuring youth fashion' },
    { icon: Music, title: 'Fun Shows', desc: 'Live performances & entertainment' },
    { icon: Star, title: 'Surprise Events', desc: 'Exciting unannounced activities' },
    { icon: Heart, title: 'Couple Games', desc: 'Interactive games for couples' },
    { icon: Users, title: 'Youth Contests', desc: 'Competitions with exciting prizes' }
  ];

  const schedule = [
    { time: '5:00 PM', event: 'Gates Open & Welcome' },
    { time: '5:30 PM', event: 'Food & Shopping Zone Opens' },
    { time: '6:00 PM', event: 'Grand Ramp Walk Show Begins' },
    { time: '7:30 PM', event: 'Couple Games & Contests' },
    { time: '8:30 PM', event: 'Surprise Events & Performances' },
    { time: '10:00 PM', event: 'Closing Ceremony' }
  ];

  return (
    <div onClick={handleClick} style={styles.mainContainer}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Poppins:wght@300;400;600;700&display=swap');
      `}</style>

      {/* Click Hearts */}
      {clickHearts.map(heart => (
        <div
          key={heart.id}
          style={{
            position: 'fixed',
            left: heart.x,
            top: heart.y,
            pointerEvents: 'none',
            zIndex: 9999,
            animation: 'floatUp 1s ease-out forwards'
          }}
        >
          <Heart size={30} fill="#FF6B6B" color="#FF6B6B" />
        </div>
      ))}

      <style>{`
        @keyframes floatUp {
          0% {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
          100% {
            transform: translateY(-100px) scale(1.5);
            opacity: 0;
          }
        }
        
        @keyframes float {
          0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.3;
          }
          90% {
            opacity: 0.3;
          }
          100% {
            transform: translateY(-100px) rotate(360deg);
            opacity: 0;
          }
        }
        
        @keyframes sparkle {
          0%, 100% {
            opacity: 0;
            transform: scale(0);
          }
          50% {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.8;
          }
        }
      `}</style>

      {/* Floating Hearts Background */}
      <div style={styles.floatingHeartsContainer}>
        {[...Array(15)].map((_, i) => (
          <Heart
            key={i}
            style={{
              position: 'absolute',
              left: `${Math.random() * 100}%`,
              opacity: 0.3,
              animation: `float 15s infinite`,
              animationDelay: `${Math.random() * 15}s`,
              fontSize: `${Math.random() * 20 + 15}px`,
              color: i % 3 === 0 ? '#FFD700' : i % 3 === 1 ? '#FF6B6B' : '#C41E3A'
            }}
            fill="currentColor"
          />
        ))}
      </div>

      {/* Hero Section */}
      <section style={styles.heroSection}>
        <div style={styles.heroOverlay}></div>
        
        <div style={{
          ...styles.heroAnimatedBg,
          animation: 'pulse 8s ease-in-out infinite'
        }}></div>

        <div style={{
          ...styles.heroContent,
          transform: `translateY(${scrollY * 0.3}px)`
        }}>
          <div style={styles.heroIconContainer}>
            <Heart style={styles.heroIcon} size={48} fill="currentColor" />
          </div>
          
          <h1 style={styles.heroTitle}>
            NAMMA MADURAI SWAG 2026
          </h1>
          
          <div style={styles.subtitleContainer}>
            <h2 style={styles.subtitle}>
              Grand Runway Show
            </h2>
            <div style={{...styles.sparkle, top: '-10px', right: '-10px'}}></div>
            <div style={{...styles.sparkle, bottom: '-10px', left: '-10px', animationDelay: '1s'}}></div>
          </div>
          
          <div style={styles.eventDetailsContainer}>
            <div style={styles.eventDetail}>
              <Calendar style={styles.eventIcon} size={20} />
              <span>February 14, 2026</span>
            </div>
            <div style={styles.eventDetail}>
              <Clock style={styles.eventIcon} size={20} />
              <span>5:00 PM Onwards</span>
            </div>
            <div style={styles.eventDetail}>
              <MapPin style={styles.eventIcon} size={20} />
              <span>Party Park, Madurai</span>
            </div>
          </div>
          
          <div style={styles.buttonContainer}>
            <a href="#register" style={styles.primaryButton}>
              Register Now
            </a>
            <a href="#highlights" style={styles.secondaryButton}>
              Explore Events
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section style={styles.aboutSection}>
        <div style={styles.sectionContent}>
          <h2 style={styles.sectionTitle}>About The Event</h2>
          <div style={styles.divider}></div>
          <p style={styles.aboutText}>
            Namma Madurai Swag 2026 is the ultimate celebration of love, style, and youth energy! Join us for an unforgettable evening featuring glamorous runway shows, exciting couple games, delicious food, trendy shopping, and surprise performances. Whether you're celebrating with your partner or friends, this Valentine's Day event promises romance, fashion, and pure entertainment in the heart of Madurai.
          </p>
        </div>
      </section>

      {/* Highlights Section */}
      <section id="highlights" style={styles.highlightsSection}>
        <div style={styles.sectionContent}>
          <h2 style={styles.sectionTitle}>Event Highlights</h2>
          <div style={styles.divider}></div>
          
          <div style={styles.gridContainer}>
            {activities.map((activity, idx) => (
              <div key={idx} style={styles.activityCard}>
                <activity.icon style={styles.activityIcon} size={48} />
                <h3 style={styles.activityTitle}>{activity.title}</h3>
                <p style={styles.activityDesc}>{activity.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Food & Shopping Zone */}
      <section style={styles.foodSection}>
        <div style={styles.sectionContent}>
          <h2 style={styles.sectionTitle}>Food & Shopping Zone</h2>
          <div style={styles.divider}></div>
          
          <div style={styles.foodGridContainer}>
            <div style={styles.foodCard}>
              <Utensils style={styles.foodIcon} size={48} />
              <h3 style={styles.foodTitle}>Food Stalls</h3>
              <p style={styles.foodDesc}>Delicious street food and local delicacies</p>
            </div>
            <div style={styles.foodCard}>
              <Heart style={styles.foodIcon} size={48} fill="currentColor" />
              <h3 style={styles.foodTitle}>Love-themed Cafes</h3>
              <p style={styles.foodDesc}>Romantic dining experiences for couples</p>
            </div>
            <div style={styles.foodCard}>
              <ShoppingBag style={styles.foodIcon} size={48} />
              <h3 style={styles.foodTitle}>Fashion & Accessories</h3>
              <p style={styles.foodDesc}>Trendy outfits, jewelry, and gifts</p>
            </div>
          </div>
        </div>
      </section>

      {/* Schedule Section */}
      <section style={styles.scheduleSection}>
        <div style={styles.scheduleContent}>
          <h2 style={styles.sectionTitle}>Event Schedule</h2>
          <div style={styles.divider}></div>
          
          <div style={styles.scheduleList}>
            {schedule.map((item, idx) => (
              <div key={idx} style={styles.scheduleItem}>
                <div style={styles.scheduleTime}>
                  {item.time}
                </div>
                <div style={styles.scheduleEvent}>
                  <p style={styles.scheduleEventText}>{item.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Venue Section */}
      <section style={styles.venueSection}>
        <div style={styles.venueContent}>
          <h2 style={styles.sectionTitle}>Venue</h2>
          <div style={styles.divider}></div>
          
          <div style={styles.venueCard}>
            <MapPin style={styles.venueIcon} size={64} />
            <h3 style={styles.venueTitle}>Party Park, Madurai</h3>
            <p style={styles.venueDesc}>The perfect venue for an unforgettable celebration</p>
            <div style={styles.mapPlaceholder}>
              <p style={styles.mapText}>Map Location</p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section style={styles.gallerySection}>
        <div style={styles.sectionContent}>
          <h2 style={styles.sectionTitle}>Gallery</h2>
          <div style={styles.divider}></div>
          
          <div style={styles.galleryGrid}>
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} style={styles.galleryItem}>
                <Heart style={styles.galleryHeart} size={80} fill="currentColor" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Registration Section */}
      <section id="register" style={styles.registerSection}>
        <div style={styles.registerContent}>
          <h2 style={styles.sectionTitle}>Register Now</h2>
          <div style={styles.divider}></div>
          
          <div style={styles.formCard}>
            <div style={styles.formGroup}>
              <label style={styles.formLabel}>Full Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                style={styles.formInput}
                placeholder="Enter your name"
              />
            </div>
            
            <div style={styles.formGroup}>
              <label style={styles.formLabel}>Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                style={styles.formInput}
                placeholder="your.email@example.com"
              />
            </div>
            
            <div style={styles.formGroup}>
              <label style={styles.formLabel}>Phone Number</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                style={styles.formInput}
                placeholder="+91 XXXXX XXXXX"
              />
            </div>
            
            <div style={styles.formGroup}>
              <label style={styles.formLabel}>Number of Tickets</label>
              <select
                value={formData.tickets}
                onChange={(e) => setFormData({...formData, tickets: e.target.value})}
                style={styles.formInput}
              >
                <option value="1">1 Ticket</option>
                <option value="2">2 Tickets (Couple)</option>
                <option value="3">3 Tickets</option>
                <option value="4">4 Tickets</option>
              </select>
            </div>
            
            <button onClick={handleSubmit} style={styles.submitButton}>
              Submit Registration
            </button>
          </div>
          
          <div style={styles.contactInfo}>
            <div style={styles.contactIcons}>
              <Phone style={styles.contactIcon} size={24} />
              <Mail style={styles.contactIcon} size={24} />
            </div>
            <p style={styles.contactText}>For queries: contact@nammamaduraiswag.com | +91 XXXXX XXXXX</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.footerContent}>
          <h3 style={styles.footerTitle}>Celebrate Love, Style & Swag</h3>
          
          <div style={styles.socialIcons}>
            <a href="#" style={styles.socialLink}>
              <Instagram size={32} />
            </a>
            <a href="#" style={styles.socialLink}>
              <Facebook size={32} />
            </a>
            <a href="#" style={styles.socialLink}>
              <Twitter size={32} />
            </a>
          </div>
          
          <div style={styles.footerTagline}>
            <Heart style={styles.footerHeart} size={20} fill="currentColor" />
            <p style={styles.footerText}>Namma Madurai Swag 2026</p>
            <Heart style={styles.footerHeart} size={20} fill="currentColor" />
          </div>
          
          <p style={styles.copyright}>© 2026 Namma Madurai Swag. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

// All CSS Styles in JavaScript Objects
const styles = {
  mainContainer: {
    backgroundColor: '#000000',
    color: '#ffffff',
    overflow: 'hidden',
    fontFamily: "'Poppins', sans-serif"
  },
  
  floatingHeartsContainer: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
    zIndex: 1,
    overflow: 'hidden'
  },
  
  // Hero Section Styles
  heroSection: {
    position: 'relative',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden'
  },
  
  heroOverlay: {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(to bottom right, #000000, #4c0519, #000000)',
    opacity: 0.9
  },
  
  heroAnimatedBg: {
    position: 'absolute',
    inset: 0,
    backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255, 215, 0, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(196, 30, 58, 0.1) 0%, transparent 50%)'
  },
  
  heroContent: {
    position: 'relative',
    zIndex: 10,
    textAlign: 'center',
    padding: '0 20px',
    maxWidth: '1550px',
    margin: '0 auto'
  },
  
  heroIconContainer: {
    marginBottom: '24px'
  },
  
  heroIcon: {
    color: '#ef4444',
    marginBottom: '16px'
  },
  
  heroTitle: {
    fontFamily: "'Playfair Display', serif",
    fontWeight: 900,
    letterSpacing: '2px',
    fontSize: 'clamp(2.5rem, 8vw, 6rem)',
    marginBottom: '16px',
    background: 'linear-gradient(135deg, #FFD700, #FF6B6B, #C41E3A)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text'
  },
  
  subtitleContainer: {
    position: 'relative',
    display: 'inline-block'
  },
  
  subtitle: {
    fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
    fontWeight: 300,
    color: '#FFD700',
    marginBottom: '32px',
    letterSpacing: '8px'
  },
  
  sparkle: {
    position: 'absolute',
    width: '4px',
    height: '4px',
    background: '#FFD700',
    borderRadius: '50%',
    animation: 'sparkle 2s infinite'
  },
  
  eventDetailsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '32px',
    flexWrap: 'wrap'
  },
  
  eventDetail: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '18px'
  },
  
  eventIcon: {
    color: '#facc15'
  },
  
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    justifyContent: 'center',
    alignItems: 'center'
  },
  
  primaryButton: {
    padding: '16px 32px',
    background: 'linear-gradient(to right, #eab308, #dc2626)',
    color: '#ffffff',
    fontWeight: 'bold',
    borderRadius: '9999px',
    fontSize: '18px',
    textDecoration: 'none',
    boxShadow: '0 0 20px rgba(255, 215, 0, 0.3)',
    transition: 'all 0.3s ease',
    cursor: 'pointer'
  },
  
  secondaryButton: {
    padding: '16px 32px',
    background: 'transparent',
    border: '2px solid #eab308',
    color: '#facc15',
    fontWeight: 'bold',
    borderRadius: '9999px',
    fontSize: '18px',
    textDecoration: 'none',
    transition: 'all 0.3s ease',
    cursor: 'pointer'
  },
  
  // Section Styles
  aboutSection: {
    padding: '80px 20px',
    background: 'linear-gradient(to bottom, #000000, #4c0519)'
  },
  
  sectionContent: {
    maxWidth: '1200px',
    margin: '0 auto'
  },
  
  sectionTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 'clamp(2rem, 5vw, 3rem)',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '24px',
    background: 'linear-gradient(135deg, #FFD700, #FF6B6B, #C41E3A)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text'
  },
  
  divider: {
    height: '4px',
    width: '96px',
    background: 'linear-gradient(to right, #eab308, #dc2626)',
    margin: '0 auto 48px'
  },
  
  aboutText: {
    fontSize: 'clamp(1rem, 2vw, 1.25rem)',
    lineHeight: '1.8',
    color: '#d1d5db',
    textAlign: 'center',
    maxWidth: '900px',
    margin: '0 auto'
  },
  
  // Highlights Section
  highlightsSection: {
    padding: '80px 20px',
    backgroundColor: '#000000'
  },
  
  gridContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '24px'
  },
  
  activityCard: {
    background: 'linear-gradient(to bottom right, #1f2937, #4c0519)',
    padding: '24px',
    borderRadius: '16px',
    border: '1px solid rgba(255, 215, 0, 0.2)',
    transition: 'all 0.3s ease'
  },
  
  activityIcon: {
    color: '#facc15',
    marginBottom: '16px'
  },
  
  activityTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '8px',
    color: '#facc15'
  },
  
  activityDesc: {
    color: '#d1d5db'
  },
  
  // Food Section
  foodSection: {
    padding: '80px 20px',
    background: 'linear-gradient(to bottom, #000000, #4c0519)'
  },
  
  foodGridContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '24px'
  },
  
  foodCard: {
    background: 'linear-gradient(to bottom right, #1f2937, #000000)',
    padding: '32px',
    borderRadius: '16px',
    textAlign: 'center',
    border: '1px solid rgba(255, 215, 0, 0.2)',
    transition: 'all 0.3s ease'
  },
  
  foodIcon: {
    color: '#ef4444',
    margin: '0 auto 16px'
  },
  
  foodTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '8px',
    color: '#facc15'
  },
  
  foodDesc: {
    color: '#d1d5db'
  },
  
  // Schedule Section
  scheduleSection: {
    padding: '80px 20px',
    backgroundColor: '#000000'
  },
  
  scheduleContent: {
    maxWidth: '900px',
    margin: '0 auto'
  },
  
  scheduleList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  
  scheduleItem: {
    background: 'linear-gradient(to right, #1f2937, #4c0519)',
    padding: '24px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    border: '1px solid rgba(255, 215, 0, 0.2)',
    flexWrap: 'wrap'
  },
  
  scheduleTime: {
    background: '#eab308',
    color: '#000000',
    fontWeight: 'bold',
    padding: '8px 16px',
    borderRadius: '8px',
    minWidth: '100px',
    textAlign: 'center'
  },
  
  scheduleEvent: {
    flex: 1
  },
  
  scheduleEventText: {
    fontSize: '18px',
    color: '#e5e7eb',
    margin: 0
  },
  
  // Venue Section
  venueSection: {
    padding: '80px 20px',
    background: 'linear-gradient(to bottom, #000000, #4c0519)'
  },
  
  venueContent: {
    maxWidth: '900px',
    margin: '0 auto',
    textAlign: 'center'
  },
  
  venueCard: {
    background: 'linear-gradient(to bottom right, #1f2937, #000000)',
    padding: '32px',
    borderRadius: '16px',
    border: '1px solid rgba(255, 215, 0, 0.2)'
  },
  
  venueIcon: {
    color: '#facc15',
    margin: '0 auto 16px'
  },
  
  venueTitle: {
    fontSize: '32px',
    fontWeight: 'bold',
    marginBottom: '16px',
    color: '#facc15'
  },
  
  venueDesc: {
    color: '#d1d5db',
    fontSize: '18px',
    marginBottom: '24px'
  },
  
  mapPlaceholder: {
    background: '#1f2937',
    height: '256px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  
  mapText: {
    color: '#9ca3af'
  },
  
  // Gallery Section
  gallerySection: {
    padding: '80px 20px',
    backgroundColor: '#000000'
  },
  
  galleryGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '24px'
  },
  
  galleryItem: {
    background: 'linear-gradient(to bottom right, #1f2937, #4c0519)',
    height: '256px',
    borderRadius: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    border: '1px solid rgba(255, 215, 0, 0.2)',
    transition: 'all 0.3s ease'
  },
  
  galleryHeart: {
    color: '#facc15',
    opacity: 0.3
  },
  
  // Registration Section
  registerSection: {
    padding: '80px 20px',
    background: 'linear-gradient(to bottom, #000000, #4c0519)'
  },
  
  registerContent: {
    maxWidth: '700px',
    margin: '0 auto'
  },
  
  formCard: {
    background: 'linear-gradient(to bottom right, #1f2937, #000000)',
    padding: '32px',
    borderRadius: '16px',
    border: '1px solid rgba(255, 215, 0, 0.2)'
  },
  
  formGroup: {
    marginBottom: '24px'
  },
  
  formLabel: {
    display: 'block',
    color: '#facc15',
    marginBottom: '8px',
    fontWeight: 600
  },
  
  formInput: {
    width: '100%',
    padding: '12px 16px',
    borderRadius: '8px',
    background: '#1f2937',
    color: '#ffffff',
    border: '1px solid #eab308',
    fontSize: '16px',
    outline: 'none',
    boxSizing: 'border-box'
  },
  
  submitButton: {
    width: '100%',
    padding: '16px 32px',
    background: 'linear-gradient(to right, #eab308, #dc2626)',
    color: '#ffffff',
    fontWeight: 'bold',
    borderRadius: '9999px',
    fontSize: '18px',
    border: 'none',
    cursor: 'pointer',
    boxShadow: '0 0 20px rgba(255, 215, 0, 0.3)',
    transition: 'all 0.3s ease'
  },
  
  contactInfo: {
    marginTop: '32px',
    textAlign: 'center'
  },
  
  contactIcons: {
    display: 'flex',
    justifyContent: 'center',
    gap: '24px',
    marginBottom: '16px'
  },
  
  contactIcon: {
    color: '#facc15'
  },
  
  contactText: {
    color: '#d1d5db'
  },
  
  // Footer
  footer: {
    backgroundColor: '#000000',
    borderTop: '1px solid #eab308',
    padding: '48px 20px'
  },
  
  footerContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    textAlign: 'center'
  },
  
  footerTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: '32px',
    fontWeight: 'bold',
    marginBottom: '16px',
    background: 'linear-gradient(135deg, #FFD700, #FF6B6B, #C41E3A)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text'
  },
  
  socialIcons: {
    display: 'flex',
    justifyContent: 'center',
    gap: '24px',
    marginBottom: '24px'
  },
  
  socialLink: {
    color: '#facc15',
    transition: 'color 0.3s ease',
    textDecoration: 'none'
  },
  
  footerTagline: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    marginBottom: '16px'
  },
  
  footerHeart: {
    color: '#ef4444'
  },
  
  footerText: {
    color: '#9ca3af',
    margin: 0
  },
  
  copyright: {
    color: '#6b7280',
    fontSize: '14px'
  }
};

export default EventWebsite;