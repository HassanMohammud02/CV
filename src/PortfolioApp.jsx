import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CaseStudyModal from './components/CaseStudyModal';
import CommandPalette from './components/CommandPalette';
import AIAssistant from './components/AIAssistant';
import HomePage from './pages/HomePage';
import RecruiterDashboardPage from './pages/RecruiterDashboardPage';
import AboutPage from './pages/AboutPage';
import ResumePage from './pages/ResumePage';
import ProjectsPage from './pages/ProjectsPage';
import SkillsPage from './pages/SkillsPage';
import BlogPage from './pages/BlogPage';
import AnalyticsPage from './pages/AnalyticsPage';
import ContactPage from './pages/ContactPage';
import AdminCmsPage from './pages/AdminCmsPage';
import {
  INITIAL_ANALYTICS,
  INITIAL_EXPERIENCE,
  INITIAL_POSTS,
  INITIAL_PROFILE,
  INITIAL_PROJECTS,
  INITIAL_SKILLS,
} from './data/portfolioData';
import { useLocalStorage } from './hooks/useLocalStorage';
import { incrementMetric, incrementProjectView } from './utils/analytics';

export default function PortfolioApp() {
  const [activePage, setActivePage] = useState('home');
  const [darkMode, setDarkMode] = useLocalStorage('hm_portfolio_dark_mode', false);
  const [profile, setProfile] = useLocalStorage('hm_portfolio_profile_v1', INITIAL_PROFILE);
  const [projects, setProjects] = useLocalStorage('hm_portfolio_projects_v1', INITIAL_PROJECTS);
  const [posts, setPosts] = useLocalStorage('hm_portfolio_posts_v1', INITIAL_POSTS);
  const [skills, setSkills] = useLocalStorage('hm_portfolio_skills_v1', INITIAL_SKILLS);
  const [analytics, setAnalytics] = useLocalStorage('hm_portfolio_analytics_v1', INITIAL_ANALYTICS);
  const [inquiries, setInquiries] = useLocalStorage('hm_portfolio_inquiries_v1', []);

  const [selectedProject, setSelectedProject] = useState(null);
  const [commandOpen, setCommandOpen] = useState(false);
  const [aiOpen, setAiOpen] = useState(false);

  // Sync dark mode class on <html>
  useEffect(() => {
    document.documentElement.classList.toggle('dark', Boolean(darkMode));
  }, [darkMode]);

  // Increment visitor counter once on mount
  useEffect(() => {
    incrementMetric(setAnalytics, 'totalVisitors', 1);
  }, [setAnalytics]);

  // Keyboard shortcut Ctrl+K / Cmd+K for Quick Command Palette
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCommandOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleNavigate = (pageId) => {
    setActivePage(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProject = (project) => {
    setSelectedProject(project);
    incrementProjectView(setProjects, project.id);
  };

  const handleDownloadCv = () => {
    incrementMetric(setAnalytics, 'resumeDownloads', 1);
  };

  const handleSubmitInquiry = (inquiryData) => {
    const newInquiry = {
      id: `inq-${Date.now()}`,
      date: new Date().toISOString().slice(0, 10),
      ...inquiryData,
    };
    setInquiries((prev) => [newInquiry, ...prev]);
    incrementMetric(setAnalytics, 'recruiterInquiries', 1);
  };

  const handleAddComment = (postId, comment) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? { ...post, comments: [...(post.comments || []), comment] }
          : post
      )
    );
  };

  const handleResetAllData = () => {
    setProfile(INITIAL_PROFILE);
    setProjects(INITIAL_PROJECTS);
    setPosts(INITIAL_POSTS);
    setSkills(INITIAL_SKILLS);
    setAnalytics(INITIAL_ANALYTICS);
  };

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900 transition-colors dark:bg-navy-950 dark:text-slate-100">
      <Navbar
        activePage={activePage}
        onNavigate={handleNavigate}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode((d) => !d)}
        onOpenCommandPalette={() => setCommandOpen(true)}
      />

      <main className="flex-1">
        {activePage === 'home' && (
          <HomePage
            profile={profile}
            projects={projects}
            onNavigate={handleNavigate}
            onSelectProject={handleSelectProject}
            onDownloadCv={handleDownloadCv}
          />
        )}

        {activePage === 'recruiter' && (
          <RecruiterDashboardPage
            profile={profile}
            experience={INITIAL_EXPERIENCE}
            projects={projects}
            skills={skills}
            onNavigate={handleNavigate}
            onSelectProject={handleSelectProject}
            onDownloadCv={handleDownloadCv}
            onSubmitInquiry={handleSubmitInquiry}
          />
        )}

        {activePage === 'about' && (
          <AboutPage
            profile={profile}
            experience={INITIAL_EXPERIENCE}
            onNavigate={handleNavigate}
          />
        )}

        {activePage === 'resume' && (
          <ResumePage
            profile={profile}
            experience={INITIAL_EXPERIENCE}
            projects={projects}
            onDownloadCv={handleDownloadCv}
          />
        )}

        {activePage === 'projects' && (
          <ProjectsPage
            projects={projects}
            onSelectProject={handleSelectProject}
          />
        )}

        {activePage === 'skills' && (
          <SkillsPage
            skills={skills}
            profile={profile}
            onNavigate={handleNavigate}
          />
        )}

        {activePage === 'blog' && (
          <BlogPage
            posts={posts}
            onAddComment={handleAddComment}
          />
        )}

        {activePage === 'analytics' && (
          <AnalyticsPage
            analytics={analytics}
            projects={projects}
            inquiries={inquiries}
          />
        )}

        {activePage === 'contact' && (
          <ContactPage
            profile={profile}
            onDownloadCv={handleDownloadCv}
            onSubmitInquiry={handleSubmitInquiry}
          />
        )}

        {activePage === 'admin' && (
          <AdminCmsPage
            profile={profile}
            setProfile={setProfile}
            projects={projects}
            setProjects={setProjects}
            posts={posts}
            setPosts={setPosts}
            skills={skills}
            setSkills={setSkills}
            inquiries={inquiries}
            onResetAllData={handleResetAllData}
          />
        )}
      </main>

      <Footer
        profile={profile}
        onNavigate={handleNavigate}
        onDownloadCv={handleDownloadCv}
      />

      <CaseStudyModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      <CommandPalette
        isOpen={commandOpen}
        onClose={() => setCommandOpen(false)}
        projects={projects}
        onNavigate={handleNavigate}
        onSelectProject={handleSelectProject}
        onDownloadCv={handleDownloadCv}
        onOpenAi={() => setAiOpen(true)}
        profile={profile}
      />

      <AIAssistant
        isOpen={aiOpen}
        onToggle={() => setAiOpen((prev) => !prev)}
        profile={profile}
        projects={projects}
        skills={skills}
        onNavigate={handleNavigate}
      />
    </div>
  );
}
