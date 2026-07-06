type Certificate = {
  id: string;
  title: string;
  issuer: string;
  date: string;
  skills: string[];
  imagePath: string;
  verificationUrl: string;
};

function CertificateCard({
  certificate,
  activeTab
}: {
  certificate: Certificate;
  activeTab: "specialization" | "all";
}) {
  const folder = activeTab === "specialization" ? "specializations" : "all";

  const imageUrl = new URL(
    `/images/certificates/${folder}/${certificate.imagePath}`,
    import.meta.url
  ).href;

  return (
    <li className="group h-full flex flex-col space-y-4 md:space-y-3 mx-4 sm:mx-8 md:mx-0 bg-linear-to-br dark:bg-none dark:bg-slate-700 from-slate-950 to-slate-700 text-slate-100 rounded-2xl hover:scale-[1.02] duration-200">
      <a
        href={certificate.verificationUrl}
        aria-label={`Verify ${certificate.title} Course Completion`}
        target="_blank"
        rel="noreferrer"
        className="aspect-video overflow-hidden"
      >
        <img
          src={imageUrl}
          alt={certificate.title}
          loading="lazy"
          className="w-full object-cover border-t border-l border-r dark:border-0 border-slate-900 rounded-t-lg"
        />
      </a>

      <div className="flex flex-col space-y-3 md:space-y-1 lg:space-y-2 px-4 py-1">
        <div className="flex justify-between items-center text-xs font-mono text-slate-300">
          <span className="font-semibold uppercase tracking-wider">
            {certificate.issuer}
          </span>
          <span>{certificate.date}</span>
        </div>

        <h3 className="font-medium lg:text-lg text-slate-50">
          {certificate.title}
        </h3>

        <ul className="flex flex-wrap gap-1.5 pt-1 text-xs md:text-xxs lg:text-xs">
          {certificate.skills.map(skill => (
            <li
              key={skill}
              className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-300 border border-slate-200/50 dark:border-slate-700/50"
            >
              {skill}
            </li>
          ))}
        </ul>

        <div className="w-full flex justify-end pb-2">
          <a
            href={certificate.verificationUrl}
            aria-label={`Verify ${certificate.title} Course Completion`}
            target="_blank"
            rel="noreferrer"
            className="flex text-sm px-2 py-1 md:py-0.5 lg:py-1 bg-slate-100 dark:bg-neutral-200 text-slate-800 rounded-sm group-hover:animate-pulse"
          >
            Verify Credential
            <span className="ml-0.5 -mt-0.5 animate-arrow-bounce">↗</span>
          </a>
        </div>
      </div>
    </li>
  );
}

export default CertificateCard;
