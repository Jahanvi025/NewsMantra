import React from 'react';

const About = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-extrabold text-gray-900 font-[Supreme] leading-tight">
          About NewMantra News App
        </h1>
        <p className=" text-black mt-4 font-[Supreme]">
          Your one-stop platform to stay updated with worldwide news and explore different perspectives from various newspapers.
        </p>
      </div>

      <div className="space-y-12">
        <section className="space-y-8 bg-gray-100 p-8 rounded-lg shadow-lg">
          <h2 className="text-4xl font-semibold text-gray-900 font-[Supreme]">About Me</h2>
          <p className=" text-black font-[Supreme] leading-relaxed">
            Hello! I'm <span className="font-semibold text-[#F7374F]">Jahanvi Sharma</span>, the creator of the NewMantra app. As a passionate web developer with a deep interest in technology and user experience, I wanted to create a platform that brings the world’s news from various newspapers directly to your fingertips. My goal is to build a smooth, intuitive, and engaging app that not only delivers breaking news but also helps you stay informed with ease. With my background in web development, I combine my technical skills with my passion for creating valuable user experiences, ensuring the app is both functional and enjoyable for everyone.
          </p>

          <p className=" text-black font-[Supreme] leading-relaxed">
            I've spent significant time working on various projects that focus on growth, self-reflection, and building positive habits. The idea behind NewMantra is to give you the tools to incorporate mindfulness into your everyday life. You can also check out some of my other projects and contributions on my{' '}
            <a href="https://github.com/Jahanvi025/" className="text-[#F7374F] hover:underline" target="_blank" rel="noopener noreferrer">GitHub</a>.
          </p>
        </section>

        <section className="space-y-8 bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-4xl font-semibold font-[Supreme] text-gray-900">Why NewMantra?</h2>
          <p className=" font-[Supreme] text-black leading-relaxed">
            NewMantra News brings together the best of the world’s leading newspapers and news sources into a single, easy-to-navigate app. Whether you're interested in global events, local news, or specialized topics like politics, sports, or entertainment, NewMantra provides a one-stop platform for all your news needs.
          </p>
          <p className=" font-[Supreme] text-black leading-relaxed">
            Our app features a comprehensive news feed that covers everything from breaking headlines to in-depth stories, making sure you're always in the loop. You can trust that we’ve curated the most relevant and timely news, sourced from a variety of respected outlets.
          </p>
          <p className=" font-[Supreme] text-black leading-relaxed">
            <span className="font-semibold text-gray-900">Notes Section:</span> Apart from the news, the app also offers a Notes Section where you can easily add and manage your personal notes. Whether you're capturing ideas sparked by articles, keeping track of key takeaways, or just organizing your thoughts, the Notes Section helps you stay organized and makes your news experience even more productive.
          </p>
        </section>

        <section className="space-y-8 bg-gray-100 p-8 rounded-lg shadow-lg">
          <h2 className="text-4xl font-semibold font-[Supreme] text-gray-900">Get in Touch</h2>
          <p className=" font-[Supreme] text-black leading-relaxed">
            I would love to hear your feedback, suggestions, or stories about how NewMantra has helped you. Feel free to reach out at any time through the contact form or via email at{' '}
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
