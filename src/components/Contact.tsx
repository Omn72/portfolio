
import React, { useState } from 'react';
import { Mail, MessageSquare, Send, Github, Linkedin, Twitter } from 'lucide-react';

const Contact = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{success?: boolean; message?: string} | null>(null);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setSubmitResult({
      success: true,
      message: "Thank you for your message! I'll respond as soon as possible."
    });
    
    // Reset form
    setFormState({
      name: '',
      email: '',
      message: '',
    });
    
    // Clear success message after 5 seconds
    setTimeout(() => {
      setSubmitResult(null);
    }, 5000);
  };

  return (
    <section id="contact" className="py-16 sm:py-20 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10 sm:mb-16 text-center">
            <div className="inline-block px-3 py-1 mb-4 rounded-full bg-space-200/30 backdrop-blur-sm border border-space-400/30">
              <span className="text-xs font-medium text-space-700">Contact</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
              Let's <span className="text-gradient-blue">Connect</span>
            </h2>
            <p className="text-base sm:text-lg text-space-700 max-w-3xl mx-auto">
              Have a project in mind or just want to say hello? I'd love to hear from you!
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-10">
            <div className="glass-panel rounded-2xl p-6 sm:p-8">
              <h3 className="font-orbitron text-lg sm:text-xl mb-4 sm:mb-6 flex items-center gap-2">
                <MessageSquare className="text-neon-blue" />
                Send Me a Message
              </h3>
              
              <form onSubmit={handleSubmit}>
                <div className="mb-4 sm:mb-6">
                  <label htmlFor="name" className="block text-sm font-medium text-space-700 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-space-300/30 border border-space-400/30 rounded-lg 
                    focus:outline-none focus:border-neon-blue focus:ring-1 focus:ring-neon-blue/50 transition-colors"
                    placeholder="Rocket Raccoon"
                  />
                </div>
                
                <div className="mb-4 sm:mb-6">
                  <label htmlFor="email" className="block text-sm font-medium text-space-700 mb-2">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-space-300/30 border border-space-400/30 rounded-lg 
                    focus:outline-none focus:border-neon-blue focus:ring-1 focus:ring-neon-blue/50 transition-colors"
                    placeholder="rocketraccoon@example.com"
                  />
                </div>
                
                <div className="mb-4 sm:mb-6">
                  <label htmlFor="message" className="block text-sm font-medium text-space-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 bg-space-300/30 border border-space-400/30 rounded-lg 
                    focus:outline-none focus:border-neon-blue focus:ring-1 focus:ring-neon-blue/50 transition-colors resize-none"
                    placeholder="Tell me about your project or inquiry..."
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-6 py-3 bg-gradient-to-r from-neon-blue to-neon-purple rounded-lg text-white font-medium 
                  hover:shadow-lg hover:shadow-neon-blue/20 transition-all duration-300 flex items-center justify-center gap-2
                  disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      Send Message
                    </>
                  )}
                </button>
                
                {submitResult && (
                  <div className={`mt-4 p-3 rounded-lg text-center ${
                    submitResult.success 
                      ? 'bg-neon-blue/10 text-neon-blue border border-neon-blue/30' 
                      : 'bg-neon-pink/10 text-neon-pink border border-neon-pink/30'
                  }`}>
                    {submitResult.message}
                  </div>
                )}
              </form>
            </div>
            
            <div className="flex flex-col gap-6">
              <div className="glass-panel rounded-2xl p-6 sm:p-8">
                <h3 className="font-orbitron text-lg sm:text-xl mb-4 sm:mb-6 flex items-center gap-2">
                  <Mail className="text-neon-blue" />
                  Get in Touch
                </h3>
                
                <p className="text-space-700 mb-4 sm:mb-6 text-sm sm:text-base">
                  Prefer to reach out directly? You can contact me via email or connect with me on social media.
                </p>
                
                <div className="flex flex-col gap-4">
                  <a href="mailto:contact@dev.om@outlook.com" className="flex items-center gap-3 group">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center glass-panel">
                      <Mail size={16} className="text-neon-blue group-hover:text-neon-purple transition-colors duration-300" />
                    </div>
                    <span className="text-space-700 text-sm sm:text-base group-hover:text-white transition-colors duration-300 truncate">
                      dev.om@outlook.com
                    </span>
                  </a>
                  
                  <a href="https://github.com/omn7" className="flex items-center gap-3 group">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center glass-panel">
                      <Github size={16} className="text-neon-blue group-hover:text-neon-purple transition-colors duration-300" />
                    </div>
                    <span className="text-space-700 text-sm sm:text-base group-hover:text-white transition-colors duration-300 truncate">
                      github.com/omn7
                    </span>
                  </a>
                  
                  <a href="https://linkedin.com/in/omnarkhede" className="flex items-center gap-3 group">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center glass-panel">
                      <Linkedin size={16} className="text-neon-blue group-hover:text-neon-purple transition-colors duration-300" />
                    </div>
                    <span className="text-space-700 text-sm sm:text-base group-hover:text-white transition-colors duration-300 truncate">
                      linkedin.com/in/omnarkhede
                    </span>
                  </a>
                  
                  <a href="https://x.com/mr_codex" className="flex items-center gap-3 group">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center glass-panel">
                      <Twitter size={16} className="text-neon-blue group-hover:text-neon-purple transition-colors duration-300" />
                    </div>
                    <span className="text-space-700 text-sm sm:text-base group-hover:text-white transition-colors duration-300 truncate">
                      X.com/mr_codex
                    </span>
                  </a>
                </div>
              </div>
              
              <div className="glass-panel rounded-2xl p-6 sm:p-8 mt-auto">
                <h3 className="font-orbitron text-lg sm:text-xl mb-3 sm:mb-4">Availability</h3>
                <p className="text-space-700 mb-3 sm:mb-4 text-sm sm:text-base">
                  I'm currently open to freelance projects, full-time positions, and interesting collaborations.
                </p>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-neon-green animate-pulse"></div>
                  <span className="text-xs sm:text-sm text-space-700">Available for new opportunities</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
