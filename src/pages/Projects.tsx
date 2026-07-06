import projects from "../assets/json/projects.json";
import ProjectCard from "../components/ProjectCard";

function Projects() {
  return (
    <div className="container mx-auto max-w-2xl md:max-w-4xl lg:max-w-6xl px-8 md:px-10 py-12 md:py-15 lg:py-20 xl:py-24 space-y-12 md:space-y-24 text-slate-800 dark:text-slate-100">
      <div className="space-y-3 md:space-y-5 pt-3 pb-4 md:pb-6">
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold tracking-tight">
          Featured Projects
        </h1>
        <p className="font-sans text-sm sm:text-md md:text-lg leading-relaxed text-slate-500 dark:text-slate-400">
          I build clean, responsive frontend applications with a strict focus on
          web vitals and optimization. By minimizing bundle sizes and
          eliminating layout shifts, I ensure every project delivers a seamless
          user experience that hits near perfect performance scores as shown
          below.
        </p>
      </div>

      <section>
        <h2 className="sr-only">Project Catalog</h2>
        <ul className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-12 lg:gap-8 duration-200 mb-2 md:mb-0">
          {projects.map(project => {
            return <ProjectCard key={project.id} project={project} />;
          })}
        </ul>
      </section>
    </div>
  );
}

export default Projects;
