import React from 'react';

const About: React.FC = () => {
  return <><head>
<link href="/dist/output.css" rel="stylesheet"></link></head>
<div><h1 className="lg:py-16 text-3xl flex justify-center font-extrabold">Website Credits</h1>
<div className="container mx-auto">
  <div className="grid grid-cols-4 gap-5">
    <div className="flex justify-center p-2 text-sm bg-gray-10 border-2 border-gray-300 ">
      <ul className="justify-center">
        <li className="flex justify-center">Ben</li>
        <li className="flex justify-center">About Page/Nav Bar</li>
        <li></li>
      </ul>
    </div>
    <div className="flex justify-center p-2 text-sm bg-gray-10 border-2 border-gray-300">
      <ul>
        <li className="flex justify-center">Ethan</li>
        <li className="flex justify-center">Bus Info Component</li>
      </ul></div>
    <div className="flex justify-center p-2 text-sm bg-gray-10 border-2 border-gray-300">
     <ul>
        <li className="flex justify-center">Andrew</li>
        <li className="flex justify-center">Bus Radius Detection</li>
     </ul>
    </div>
    <div className="flex justify-center p-2 text-sm bg-gray-10 border-2 border-gray-300">
        <ul>
         <li className="flex justify-center">Zach</li>
         <li className="flex justify-center">Bus Card Information</li>
        </ul>
    </div>
  </div>
</div>
<section className="bg-white dark:bg-gray-900">
  <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
      <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">Contact Us</h2>
      <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">Have any feedback about our website? Any bugs or issues with the design? Please let us know!</p>
      <form action="#" className="space-y-8">
          <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your email</label>
              <input type="email" id="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="name@email.com" required></input>
          </div>
          <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Subject</label>
              <input type="text" id="subject" className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="Let us know how we can help you" required></input>
          </div>
          <div className="sm:col-span-2">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Your message</label>
              <textarea id="message" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Leave a comment..."></textarea>
          </div>
          <button type="submit" className="py-3 px-5 text-sm font-medium text-center bg-primary-600 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Send message</button>
      </form>
  </div>
</section>
  <footer>
    <nav className="footer-nav bg-gray-700" aria-labelledby="footer-nav-label">
      <div className="grid grid-cols-3 gap-4 col-md-3 text-white">
        <div className="flex justify-center p-2 text-sm py-3 ">
          <ul>
            <li><a href="http://localhost:3000/">Home</a></li>
            <li><a href="http://localhost:3000/about">About Us</a></li>
          </ul>
        </div>
        <div className="flex justify-center p-2 text-sm ">
          <ul>
            <li><a href="http://localhost:3000/list">Map</a></li>
            <li>Help</li>
          </ul>
        </div>
        <div className="flex justify-center p-2 text-sm ">
          <ul>
            <li>Feedback</li>
          </ul>
        </div>
      </div>
    </nav>
      <div className="bottomtag flex justify-center bg-gray-900 text-white">
        <div className="row">
          <p className="col-8">ITEC4012</p>
        </div>
      </div>
  </footer>
</div></>;
};

export default About;
