import React from 'react';

const About = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 font-[Supreme] leading-tight">
          About NewMantra News App
        </h1>
        <p className="text-black mt-4 font-[Supreme]">
          Your one-stop platform to stay updated with worldwide news and explore different perspectives from various newspapers
        </p>
      </div>

      <div className="space-y-12">
        <section className="space-y-8 bg-gray-100 p-8 rounded-lg shadow-lg text-center md:text-left">
          <h2 className="text-2xl md:text-4xl font-semibold text-gray-900 font-[Supreme]">About Me</h2>
          <p className="text-black font-[Supreme] leading-relaxed">
            Hello! I'm <span className="font-semibold text-[#F7374F]">Jahanvi Sharma</span>, the creator of the NewMantra app. As a passionate web developer with a deep interest in technology and user experience, I wanted to create a platform that brings the world’s news from various newspapers directly to your fingertips. My goal is to build a smooth, intuitive, and engaging app that not only delivers breaking news but also helps you stay informed with ease.
          </p>
          <p className="text-black font-[Supreme] leading-relaxed">
            I've spent significant time working on various projects that focus on growth, self-reflection, and building positive habits. The idea behind NewMantra is to give you the tools to incorporate mindfulness into your everyday life. You can also check out some of my other projects and contributions on my{' '}
            <a href="https://github.com/Jahanvi025/" className="text-[#F7374F] hover:underline" target="_blank" rel="noopener noreferrer">GitHub</a>.
          </p>
        </section>

        <section className="space-y-8 bg-white p-8 rounded-lg shadow-lg text-center md:text-left">
          <h2 className="text-2xl md:text-4xl font-semibold font-[Supreme] text-gray-900">Why NewMantra?</h2>
          <p className="font-[Supreme] text-black leading-relaxed">
            NewMantra News brings together the best of the world’s leading newspapers and news sources into a single, easy-to-navigate app. Whether you're into global events, local news, or topics like politics, sports, or entertainment — we've got you.
          </p>
          <p className="font-[Supreme] text-black leading-relaxed">
            Our app features a comprehensive feed from breaking headlines to in-depth stories. You’ll always be in the loop with the most relevant and timely news, sourced from trusted outlets.
          </p>
          <p className="font-[Supreme] text-black leading-relaxed">
            <span className="font-semibold text-gray-900">Notes Section:</span> Use it to add and manage personal notes — whether it’s ideas sparked by articles, highlights, or just thoughts. Stay organized while staying informed.
          </p>
        </section>

        <section className="space-y-8 bg-gray-100 p-8 rounded-lg shadow-lg text-center md:text-left">
          <h2 className="text-2xl md:text-4xl font-semibold font-[Supreme] text-gray-900">Get in Touch</h2>
          <p className="font-[Supreme] text-black leading-relaxed">
            I’d love to hear your feedback, suggestions, or stories about how NewMantra has helped you. You can reach me via the contact form or at{' '}
            <a href="mailto:789jahanvi@gmail.com" className="text-[#F7374F] hover:underline">
              789jahanvi@gmail.com
            </a>.
          </p>
        </section>
      </div>
    </div>
  );
};

export default About;
