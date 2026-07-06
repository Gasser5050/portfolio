function ServicesCard({
  title,
  description
}: {
  title: string;
  description: string;
}) {
  return (
    <li className="flex flex-col px-7 md:px-10 py-8 sm:py-10 space-y-3 md:space-y-4 xl:space-y-5 border text-slate-200 dark:text-slate-900 bg-slate-900 dark:bg-slate-200 border-slate-200 dark:border-slate-900 shadow-2xl rounded-lg">
      <h3 className="grow text-md sm:text-xl md:text-2xl font-bold underline underline-offset-2">
        {title}
      </h3>
      <p className="grow text-sm sm:text-lg md:text-xl leading-7">{description}</p>
    </li>
  );
}

export default ServicesCard;
