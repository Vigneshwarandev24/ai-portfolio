import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 px-4 text-center">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-gray-900 dark:text-white">
          Hi, I'm <span className="text-blue-600 dark:text-blue-400">Vigneshwaran M</span> 👋
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
          Full Stack Developer | AI Enthusiast
        </p>
        
        <p className="text-lg text-gray-500 dark:text-gray-400 mb-12 max-w-3xl mx-auto">
          I build modern web applications with cutting-edge technologies. 
          Passionate about AI, machine learning, and creating impactful software solutions.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="/Vigneshwaran_Resume.pdf"
            download
            className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 font-medium shadow-lg hover:shadow-xl"
          >
            📄 Download Resume
          </a>
          
          <Link
            href="/projects"
            className="px-8 py-3 border-2 border-blue-600 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-600 hover:text-white transition duration-300 font-medium"
          >
            🚀 View Projects
          </Link>
          
          <Link
            href="/chat"
            className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300 font-medium shadow-lg hover:shadow-xl"
          >
            🤖 Chat with AI
          </Link>
        </div>
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
            <div className="text-3xl mb-4">💻</div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Full Stack Development</h3>
            <p className="text-gray-600 dark:text-gray-300">Building scalable web applications with modern frameworks and best practices.</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
            <div className="text-3xl mb-4">🤖</div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">AI & Machine Learning</h3>
            <p className="text-gray-600 dark:text-gray-300">Integrating AI solutions and building intelligent applications.</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
            <div className="text-3xl mb-4">🚀</div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Cloud & DevOps</h3>
            <p className="text-gray-600 dark:text-gray-300">Deploying and maintaining applications in cloud environments.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
