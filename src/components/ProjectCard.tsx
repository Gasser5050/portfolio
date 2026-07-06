type Project = {
  id: string;
  title: string;
  description: string;
  skills: string[];
  imagePath: string;
  projectUrl: string;
  insightUrl?: string;
};

function ProjectCard({ project }: { project: Project }) {
  const imgUrl = `/images/projects/${project.imagePath}`;

  return (
    <li className="h-full flex flex-col space-y-4 md:space-y-6 lg:space-y-4 mx-2 sm:mx-8 md:mx-10 lg:mx-0 bg-linear-to-br dark:bg-none dark:bg-slate-700 from-slate-950 to-slate-700 text-slate-100 rounded-2xl hover:scale-[1.02] duration-200">
      <a
        href={project.projectUrl}
        aria-label={`Visit ${project.title} live website`}
        target="_blank"
        rel="noreferrer"
        className="w-full aspect-video block overflow-hidden bg-slate-900/50"
      >
        <img
          src={imgUrl}
          alt={project.title}
          loading="lazy"
          className="w-full h-full object-cover rounded-t-sm border-t border-l border-r border-slate-900 dark:border-slate-700 transition-opacity duration-300"
        />
      </a>

      <div className="flex flex-col space-y-2 md:space-y-2 px-4 pb-1">
        <h3 className="text-lg md:text-2xl lg:text-lg font-medium  text-slate-50">
          {project.title}
        </h3>

        <p className="text-sm md:text-lg lg:text-sm font-sans pb-1 text-slate-300">
          {project.description}
        </p>

        <ul className="flex flex-wrap gap-1.5 text-xxs md:text-xs lg:text-xxs lg:text-xs">
          {project.skills.map(skill => (
            <li
              key={skill}
              className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-950 text-slate-600 dark:text-slate-400 border border-slate-200/50 dark:border-slate-700/50"
            >
              {skill}
            </li>
          ))}
        </ul>

        <div className="w-full flex justify-end pt-1 md:pt-2 pb-2 space-x-3">
          {project.insightUrl && (
            <a
              href={project.insightUrl}
              aria-label={`Check PageSpeed metrics for ${project.title}`}
              target="_blank"
              rel="noreferrer"
              className="flex text-sm px-2 py-1 md:py-0.5 lg:py-1 bg-slate-100 dark:bg-neutral-200 text-slate-800 rounded-sm hover:animate-pulse"
            >
              Check Metrics
              <span className="ml-0.5 -mt-0.5 animate-arrow-bounce">↗</span>
            </a>
          )}

          <a
            href={project.projectUrl}
            aria-label={`Visit ${project.title} live website`}
            target="_blank"
            rel="noreferrer"
            className="flex text-sm px-2 py-1 md:py-0.5 lg:py-1 bg-slate-100 dark:bg-neutral-200 text-slate-800 rounded-sm hover:animate-pulse"
          >
            Visit Website
            <span className="ml-0.5 -mt-0.5 animate-arrow-bounce">↗</span>
          </a>
        </div>
      </div>
    </li>
  );
}

export default ProjectCard;
