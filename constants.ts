

export const INITIAL_HTML = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Your Project</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet">
    <style>
        :root {
            --background-start: #6D72C3;
            --background-end: #363A76;
            --card-background: #ffffff;
            --text-color: #333;
            --heading-color: #0033a0;
            --accent-color: #f37021;
        }
        body {
            font-family: 'Inter', sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            margin: 0;
            background: linear-gradient(135deg, var(--background-start), var(--background-end));
            color: var(--text-color);
            transition: background-color 0.3s;
        }
        .container {
            text-align: center;
            padding: 3rem 2rem;
            background-color: var(--card-background);
            border-radius: 12px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
            max-width: 90%;
            width: 500px;
            transform: translateY(-20px);
            animation: float-in 0.8s ease-out forwards;
        }
        @keyframes float-in {
            from {
                opacity: 0;
                transform: translateY(0px);
            }
            to {
                opacity: 1;
                transform: translateY(-20px);
            }
        }
        h1 {
            color: var(--heading-color);
            font-size: 2.5rem;
            margin-bottom: 0.5rem;
        }
        p {
            font-size: 1.1rem;
            line-height: 1.6;
            margin-bottom: 1.5rem;
        }
        .prompt {
            background-color: #f0f4f8;
            padding: 1rem;
            border-radius: 8px;
            border-left: 4px solid var(--accent-color);
            text-align: left;
            font-size: 1rem;
        }
        .prompt code {
            font-weight: bold;
            color: var(--accent-color);
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Let's Get Started!</h1>
        <p>This is your canvas. Edit the code and see your ideas come to life in the preview pane.</p>
        <div class="prompt">
            <p><strong>Try this:</strong> Tell Gemini to <code>"add a button with a gradient background that says 'Learn More'"</code>.</p>
        </div>
    </div>
</body>
</html>
`;

export const DETAILED_PLAN_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Project Phoenix: Development Roadmap</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&display=swap" rel="stylesheet">
    <style>
        :root {
            --bg-color: #111827;
            --timeline-color: #374151;
            --card-bg: #1F2937;
            --text-light: #F9FAFB;
            --text-gray: #D1D5DB;
            --accent-1: #38BDF8;
            --accent-2: #818CF8;
            --accent-3: #F472B6;
            --accent-4: #34D399;
        }
        * { box-sizing: border-box; }
        body {
            font-family: 'Roboto', sans-serif;
            background-color: var(--bg-color);
            color: var(--text-light);
            margin: 0;
            padding: 3rem 0;
        }
        .container {
            max-width: 1000px;
            margin: 0 auto;
            padding: 0 2rem;
        }
        .header {
            text-align: center;
            margin-bottom: 4rem;
        }
        .header h1 {
            font-size: 3rem;
            font-weight: 700;
            margin-bottom: 0.5rem;
        }
        .header p {
            font-size: 1.2rem;
            color: var(--text-gray);
            font-weight: 300;
        }
        .timeline {
            position: relative;
            max-width: 1200px;
            margin: 0 auto;
        }
        .timeline::after {
            content: '';
            position: absolute;
            width: 6px;
            background-color: var(--timeline-color);
            top: 0;
            bottom: 0;
            left: 50%;
            margin-left: -3px;
        }
        .timeline-container {
            padding: 10px 40px;
            position: relative;
            background-color: inherit;
            width: 50%;
        }
        .timeline-container.left { left: 0; }
        .timeline-container.right { left: 50%; }
        .timeline-container::after {
            content: '';
            position: absolute;
            width: 25px;
            height: 25px;
            right: -17px;
            background-color: var(--bg-color);
            border: 4px solid var(--accent-1);
            top: 15px;
            border-radius: 50%;
            z-index: 1;
        }
        .right::after { left: -16px; }
        .content {
            padding: 20px 30px;
            background-color: var(--card-bg);
            position: relative;
            border-radius: 6px;
            border-top: 4px solid var(--accent-1);
            transition: transform 0.3s ease;
        }
        .content:hover {
            transform: scale(1.03);
        }
        .timeline-container:nth-child(1)::after, .timeline-container:nth-child(1) .content { border-color: var(--accent-1); }
        .timeline-container:nth-child(2)::after, .timeline-container:nth-child(2) .content { border-color: var(--accent-2); }
        .timeline-container:nth-child(3)::after, .timeline-container:nth-child(3) .content { border-color: var(--accent-3); }
        .timeline-container:nth-child(4)::after, .timeline-container:nth-child(4) .content { border-color: var(--accent-4); }

        h2 { margin-top: 0; font-size: 1.5rem; }
        p { color: var(--text-gray); line-height: 1.6; }
        .date {
            font-weight: 700;
            font-size: 0.9rem;
            color: var(--text-gray);
            margin-bottom: 0.5rem;
            display: block;
        }
        @media screen and (max-width: 600px) {
            .timeline::after { left: 31px; }
            .timeline-container { width: 100%; padding-left: 70px; padding-right: 25px; }
            .timeline-container.right, .timeline-container.left { left: 0%; }
            .right::after, .left::after { left: 15px; }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Project Phoenix Roadmap</h1>
            <p>Our strategic journey to rebuild and innovate our core platform.</p>
        </div>
        <div class="timeline">
            <div class="timeline-container left">
                <div class="content">
                    <span class="date">Q1 2025</span>
                    <h2>Phase 1: Research & Discovery</h2>
                    <p>Conducting user research, competitive analysis, and technical feasibility studies to define project scope and requirements.</p>
                </div>
            </div>
            <div class="timeline-container right">
                <div class="content">
                    <span class="date">Q2 2025</span>
                    <h2>Phase 2: Design & Prototyping</h2>
                    <p>Developing wireframes, high-fidelity mockups, and interactive prototypes. Establishing the new design system and brand guidelines.</p>
                </div>
            </div>
            <div class="timeline-container left">
                <div class="content">
                    <span class="date">Q3-Q4 2025</span>
                    <h2>Phase 3: Core Development</h2>
                    <p>Building the foundational architecture and core features of the new platform. Focus on backend services and initial frontend scaffolding.</p>
                </div>
            </div>
            <div class="timeline-container right">
                <div class="content">
                    <span class="date">Q1 2026</span>
                    <h2>Phase 4: Launch & Iterate</h2>
                    <p>Deploying the minimum viable product (MVP), gathering user feedback, and beginning the iterative cycle of improvements and feature additions.</p>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
`;

export const PORTFOLIO_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Alex Ray - Digital Craftsman</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap" rel="stylesheet">
    <style>
        :root {
            --bg-dark: #111827;
            --bg-card: #1F2937;
            --text-light: #F3F4F6;
            --text-gray: #9CA3AF;
            --accent: #F9A826;
            --accent-hover: #FBBF24;
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body {
            font-family: 'Poppins', sans-serif;
            background-color: var(--bg-dark);
            color: var(--text-light);
        }
        .container { width: 100%; max-width: 1100px; margin: 0 auto; padding: 0 2rem; }
        .section { padding: 6rem 0; }
        h1, h2 { font-weight: 700; }
        h2 { font-size: 2.5rem; margin-bottom: 3rem; text-align: center; }
        h2 span { color: var(--accent); }
        /* --- Header & Nav --- */
        .navbar {
            position: fixed;
            width: 100%;
            padding: 1.5rem 0;
            background-color: rgba(17, 24, 39, 0.8);
            backdrop-filter: blur(10px);
            z-index: 100;
            transition: all 0.3s ease;
        }
        .nav-container { display: flex; justify-content: space-between; align-items: center; }
        .logo { font-size: 1.5rem; font-weight: 700; color: var(--text-light); }
        .nav-links { list-style: none; display: flex; gap: 2rem; }
        .nav-links a { text-decoration: none; color: var(--text-gray); font-weight: 600; transition: color 0.3s; }
        .nav-links a:hover { color: var(--accent); }
        /* --- Hero Section --- */
        #hero {
            min-height: 100vh;
            display: flex;
            align-items: center;
            text-align: center;
        }
        .hero-content h1 { font-size: 4rem; margin-bottom: 1rem; }
        .hero-content p { font-size: 1.25rem; color: var(--text-gray); margin-bottom: 2rem; }
        .btn {
            display: inline-block;
            background: var(--accent);
            color: var(--bg-dark);
            padding: 0.8rem 2rem;
            border-radius: 5px;
            text-decoration: none;
            font-weight: 700;
            transition: background-color 0.3s ease;
        }
        .btn:hover { background: var(--accent-hover); }
        /* --- About Section --- */
        .about-grid { display: grid; grid-template-columns: 1fr 2fr; gap: 3rem; align-items: center; }
        .about-grid img { width: 100%; max-width: 300px; border-radius: 10px; box-shadow: 0 10px 20px rgba(0,0,0,0.3); }
        /* --- Projects Section --- */
        .project-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; }
        .project-card {
            background: var(--bg-card);
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0,0,0,0.2);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .project-card:hover { transform: translateY(-10px); box-shadow: 0 10px 20px rgba(0,0,0,0.4); }
        .project-card img { width: 100%; height: 200px; object-fit: cover; }
        .project-info { padding: 1.5rem; }
        .project-info h3 { font-size: 1.5rem; margin-bottom: 0.5rem; }
        .project-info p { color: var(--text-gray); margin-bottom: 1rem; }
        /* --- Footer --- */
        footer { text-align: center; padding: 2rem 0; background: var(--bg-card); }
        
        @media screen and (max-width: 768px) {
            .about-grid { grid-template-columns: 1fr; text-align: center; }
            .about-grid img { margin: 0 auto 2rem auto; }
            .hero-content h1 { font-size: 2.5rem; }
            .nav-links { display: none; } /* Basic responsive nav */
        }

    </style>
</head>
<body>
    <nav class="navbar">
        <div class="container nav-container">
            <a href="#" class="logo">Alex Ray</a>
            <ul class="nav-links">
                <li><a href="#about">About</a></li>
                <li><a href="#projects">Projects</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
        </div>
    </nav>

    <section id="hero">
        <div class="container hero-content">
            <h1>Digital Craftsman & Web Developer</h1>
            <p>I design and build beautiful, responsive, and highly functional websites.</p>
            <a href="#projects" class="btn">View My Work</a>
        </div>
    </section>

    <section id="about" class="section">
        <div class="container">
            <h2>About <span>Me</span></h2>
            <div class="about-grid">
                <img src="https://images.unsplash.com/photo-1557862921-37829c790f19?q=80&w=800" alt="A portrait of Alex Ray">
                <div>
                    <h3>I'm Alex, a developer who loves building for the web.</h3>
                    <p>With a passion for clean code and user-centric design, I specialize in creating web experiences that are both intuitive and visually appealing. From static landing pages to complex web applications, I bring ideas to life with modern technologies.</p>
                    <p>My toolbox includes HTML, CSS, JavaScript, and a variety of frameworks that help me build efficient and scalable solutions. Let's create something amazing together!</p>
                </div>
            </div>
        </div>
    </section>

    <section id="projects" class="section">
        <div class="container">
            <h2>My <span>Projects</span></h2>
            <div class="project-grid">
                <div class="project-card">
                    <img src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800" alt="Project 1">
                    <div class="project-info">
                        <h3>E-commerce Platform</h3>
                        <p>A fully responsive online store built with modern frontend technologies, focusing on a seamless user experience.</p>
                        <a href="#" class="btn">View Details</a>
                    </div>
                </div>
                <div class="project-card">
                    <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=800" alt="Project 2">
                    <div class="project-info">
                        <h3>Data Visualization Dashboard</h3>
                        <p>An interactive dashboard for visualizing complex data sets, providing users with actionable insights.</p>
                        <a href="#" class="btn">View Details</a>
                    </div>
                </div>
                <div class="project-card">
                    <img src="https://images.unsplash.com/photo-1542744095-291d1f67b221?q=80&w=800" alt="Project 3">
                    <div class="project-info">
                        <h3>Corporate Landing Page</h3>
                        <p>A sleek and professional landing page designed to increase user engagement and drive conversions.</p>
                        <a href="#" class="btn">View Details</a>
                    </div>
                </div>
            </div>
        </div>
    </section>
    
    <footer id="contact">
        <div class="container">
            <p>Interested in working together? <a href="mailto:email@example.com" style="color: var(--accent);">email@example.com</a></p>
            <p>&copy; 2024 Alex Ray. All rights reserved.</p>
        </div>
    </footer>
</body>
</html>
`;

export const BLOG_POST_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>The Future of AI in Web Design</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400..700;1,400..700&family=Montserrat:wght@400;700&display=swap" rel="stylesheet">
    <style>
        :root {
            --text-color: #343a40;
            --bg-color: #f8f9fa;
            --heading-font: 'Montserrat', sans-serif;
            --body-font: 'Lora', serif;
            --accent-color: #007bff;
        }
        body {
            font-family: var(--body-font);
            line-height: 1.8;
            color: var(--text-color);
            background: var(--bg-color);
            margin: 0;
        }
        .progress-bar {
            position: fixed;
            top: 0;
            left: 0;
            height: 5px;
            background: var(--accent-color);
            width: 0%;
            z-index: 100;
        }
        .container { max-width: 720px; margin: 0 auto; padding: 2rem; }
        .post-header { text-align: center; margin-bottom: 3rem; }
        .post-header .meta { font-size: 0.9rem; color: #6c757d; margin-bottom: 1rem; }
        .post-header h1 {
            font-family: var(--heading-font);
            font-size: 3rem;
            margin: 0 0 0.5rem 0;
        }
        .featured-image { width: 100%; height: 400px; object-fit: cover; border-radius: 8px; margin-bottom: 3rem; }
        article h2 { font-family: var(--heading-font); color: #212529; margin-top: 2.5rem; }
        article p, article li { font-size: 1.1rem; }
        article a { color: var(--accent-color); text-decoration: none; }
        article a:hover { text-decoration: underline; }
        blockquote {
            border-left: 4px solid var(--accent-color);
            padding-left: 1.5rem;
            margin: 2rem 0;
            font-style: italic;
            color: #6c757d;
        }
        pre {
            background-color: #212529;
            color: #f8f9fa;
            padding: 1.5rem;
            border-radius: 8px;
            overflow-x: auto;
            font-family: 'Courier New', Courier, monospace;
        }
        footer { text-align: center; margin-top: 4rem; padding-top: 2rem; border-top: 1px solid #dee2e6; font-size: 0.9em; color: #6c757d; }
    </style>
</head>
<body>
    <div class="progress-bar" id="progressBar"></div>
    <div class="container">
        <header class="post-header">
            <p class="meta">Published on July 10, 2024 by Jane Doe</p>
            <h1>The Future of AI in Web Design</h1>
        </header>

        <img src="https://images.unsplash.com/photo-1620712943543-28fc886405b8?q=80&w=800" alt="Abstract AI art" class="featured-image">

        <article>
            <h2>A Paradigm Shift</h2>
            <p>The integration of Artificial Intelligence into web design is not just a fleeting trend; it's a fundamental shift in how we create digital experiences. From automated code generation to personalized user interfaces, AI is poised to become an indispensable tool for developers and designers alike.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa.</p>
            
            <h2>Smarter Tools, Faster Workflows</h2>
            <p>AI-powered tools can now analyze a design mockup and generate clean, semantic HTML and CSS in seconds. This capability dramatically accelerates the development process, freeing up developers to focus on more complex challenges like application logic and user experience optimization.</p>
            <blockquote>"AI won't replace designers, but designers who use AI will replace those who don't."</blockquote>
            <p>Consider the following code snippet, which can be generated by an AI assistant based on a simple prompt like "create a responsive card component":</p>
            <pre><code>&lt;div class="card"&gt;
  &lt;img src="image.jpg" alt="..."&gt;
  &lt;div class="card-body"&gt;
    &lt;h5 class="card-title"&gt;Card Title&lt;/h5&gt;
    &lt;p class="card-text"&gt;Some quick example text.&lt;/p&gt;
    &lt;a href="#" class="btn"&gt;Go somewhere&lt;/a&gt;
  &lt;/div&gt;
&lt;/div&gt;</code></pre>
            <p>Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero. Sed dignissim lacinia nunc. Curabitur tortor. Pellentesque nibh. Aenean quam. In scelerisque sem at dolor. Maecenas mattis. Sed convallis tristique sem. Proin ut ligula vel nunc egestas porttitor.</p>
        </article>
        
        <footer>
            <p>&copy; 2024 Modern Web Gazette</p>
        </footer>
    </div>
    <script>
        window.onscroll = function() {
            const progressBar = document.getElementById("progressBar");
            const totalHeight = document.body.scrollHeight - window.innerHeight;
            const progress = (window.pageYOffset / totalHeight) * 100;
            progressBar.style.width = progress + "%";
        };
    </script>
</body>
</html>
`;

export const TEMPLATES = [
    { name: 'Basic Starter', html: INITIAL_HTML },
    { name: 'Portfolio Page', html: PORTFOLIO_TEMPLATE },
    { name: 'Blog Post', html: BLOG_POST_TEMPLATE },
    { name: 'Detailed Project Plan', html: DETAILED_PLAN_TEMPLATE },
];
