# 🌟 Jabed Islam Portfolio Website

[Live Demo](https://jabed-portfolio-app.vercel.app)

---

## Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation & Setup](#installation--setup)
- [Folder Structure](#folder-structure)
- [Usage](#usage)
- [Notes](#notes)
- [License](#license)

---

## Project Overview

This is the **personal portfolio website** of **Jabed Islam**, a passionate Fullstack Developer.  
The website showcases my skills, tech stack, projects, blogs, and contact information in a modern, interactive, and visually appealing design.  

It’s built using **Next.js, React, TypeScript, and Tailwind CSS**, with interactive animations powered by **Framer Motion & GSAP**.  

The portfolio highlights:

- Tech skills with experience and usage
- Featured projects with live & GitHub links
- Blog management system
- Contact section with social links
- Downloadable CV

---

## Features

- Responsive and fully mobile-friendly design
- Smooth animations and hover effects for tech cards and projects
- Horizontal text slider in the hero section
- Tech stack cards showing experience with each technology
- Featured projects section with live demo and GitHub link
- Blog management system (create, update, delete)
- Contact section with social icons and email
- Downloadable CV
- Dark theme with vibrant gradients and interactive UI
- Lazy loading for optimized performance

---

## Tech Stack

| Technology | Purpose |
|------------|---------|
| **React.js** | Building interactive UI components |
| **Next.js** | Server-side rendering & routing |
| **TypeScript** | Type safety and scalable code |
| **Node.js** | Backend API development |
| **Express.js** | REST API handling |
| **MongoDB** | NoSQL database |
| **PostgreSQL** | Relational database |
| **Docker** | Containerization for deployments |
| **AWS** | Hosting and cloud services |
| **Tailwind CSS** | Styling & responsive design |
| **Framer Motion & GSAP** | Animations and transitions |
| **Lucide Icons** | Modern SVG icons |

---

## Installation & Setup

### Prerequisites

- Node.js >= 18.x
- npm or yarn
- MongoDB/PostgreSQL database (if using backend features)
- Optional: Docker for containerized deployment

### Steps

1. **Clone the repository:**
```bash
git clone https://github.com/developer-jabed/portfolio.git
cd portfolio
Install dependencies:

bash
Copy code
npm install
# or
yarn install
Configure environment variables:
Create a .env.local file in the root:

env
Copy code
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
DATABASE_URL=your-database-url
Run the development server:

bash
Copy code
npm run dev
# or
yarn dev
Visit http://localhost:3000 to view your portfolio.

Build for production:

bash
Copy code
npm run build
npm start
Folder Structure (Optional)
bash
Copy code
/portfolio
├─ /components
│  ├─ /modules
│  │  ├─ Home
│  │  ├─ Blog
│  │  └─ About
├─ /pages
│  ├─ index.tsx
│  ├─ about.tsx
│  └─ blog.tsx
├─ /public
├─ /styles
├─ .env.local
├─ package.json
└─ tsconfig.json
Usage
Browse the portfolio and check out the tech stack and projects

Use the contact section to connect with me

Download CV from the About page

Manage blogs through the Blog page if authenticated

Notes
The project uses lazy loading for better performance

Animations use Framer Motion and some GSAP

Ensure API endpoints are running if you want backend features like blogs

Tailwind CSS handles the entire responsive design and dark theme

All assets (images, CV, icons) should be placed in the /public folder

License
This project is open-source and available under the MIT License.

Made with ❤️ by Jabed Islam

yaml
Copy code

---

If you want, I can also **make a shorter, visually rich README** with badges for GitHub stars, NPM version, Twitter, and LinkedIn that looks **super professional for GitHub**.  

Do you want me to create that version too?