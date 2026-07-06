import { cn } from "../utils/cn";
import { useEffect, useRef } from "react";
import { Form, NavLink, useActionData, useNavigation } from "react-router-dom";
import services from "../assets/json/services.json";
import ServicesCard from "../components/ServicesCard";
import contactUs from "../assets/images/contact-us.webp";
import FormButton from "../components/FormButton";

function Home() {
  const formRef = useRef<HTMLFormElement>(null);
  const formResponse = useActionData();
  const { state } = useNavigation();

  const rawError =
    typeof formResponse === "string" ? formResponse : formResponse?.error;

  const error =
    rawError && typeof rawError === "object" && rawError !== null
      ? rawError.message || JSON.stringify(rawError)
      : rawError;

  const isSuccess =
    formResponse &&
    typeof formResponse === "object" &&
    "data" in formResponse &&
    typeof formResponse.data === "object" &&
    "ok" in formResponse.data &&
    formResponse.data.ok === true;

  useEffect(() => {
    if (isSuccess) {
      formRef.current?.reset();

      const messageTextArea = formRef.current?.querySelector("#message");
      if (messageTextArea instanceof HTMLTextAreaElement) {
        messageTextArea.style.height = "";
      }
    }
  }, [isSuccess]);

  return (
    <div className="container mx-auto max-w-2xl md:max-w-4xl lg:max-w-6xl px-7 sm:px-8 md:px-12 lg:px-16 xl:px-10 py-12 sm:py-15 md:py-18 lg:py-24 space-y-12 sm:space-y-16 lg:space-y-24 text-slate-800 dark:text-slate-100">
      <div
        aria-label="Introduction"
        className="space-y-4 sm:space-y-5 md:space-y-6"
      >
        <h1 className="text-xl sm:text-4xl lg:text-5xl xl:text-6xl font-medium tracking-tight leading-tight">
          I build clean, high-performance web applications.
        </h1>

        <p className="font-sans text-xs sm:text-sm lg:text-lg sm:pr-24 lg:pr-30 xl:pr-20 leading-tight">
          I specialize in{" "}
          <span className="font-semibold text-indigo-600 dark:text-indigo-400">
            React, TypeScript, and Tailwind CSS
          </span>
          . My focus is turning complex designs into pixel-perfect, highly
          responsive layouts while keeping data fetching fast, smooth, and
          secure.
        </p>
      </div>

      <section
        aria-labelledby="services-title"
        className="space-y-6 md:space-y-12 xl:space-y-6"
      >
        <h2
          id="services-title"
          className="text-sm md:text-md font-mono uppercase tracking-widest text-slate-600 dark:text-slate-400 border-b border-slate-400 dark:border-slate-600 pb-2"
        >
          // How I can help your project
        </h2>

        <div className="sm:px-2 lg:px-0 max-w-xl md:max-w-3xl lg:max-w-5xl xl:max-w-6xl mx-auto">
          <ul className="grid grid-cols-1 lg:grid-cols-2 space-y-6 md:space-y-10 lg:space-y-0 lg:gap-3 xl:gap-4">
            {services.map(service => {
              return (
                <ServicesCard
                  key={service.id}
                  title={service.title}
                  description={service.description}
                />
              );
            })}

            <li
              aria-labelledby="playground-title"
              className="flex flex-col px-7 md:px-10 py-8 sm:py-10 space-y-3 border bg-slate-900 dark:bg-slate-200 border-slate-200 dark:border-slate-900 shadow-2xl rounded-lg"
            >
              <h3
                id="playground-title"
                className="text-md sm:text-xl md:text-2xl text-indigo-400 dark:text-indigo-600 tracking-wide font-bold underline underline-offset-2"
              >
                Play an interactive Minesweeper game
              </h3>

              <p className="text-sm sm:text-md md:text-lg lg:text-md text-slate-200 dark:text-slate-900 leading-relaxed md:tracking-tighter">
                Click the{" "}
                <NavLink
                  to={"./minesweeper"}
                  className="font-mono text-xs dark:text-slate-50 bg-purple-700 hover:ring-1 hover:ring-white dark:hover:ring-black px-1.5 py-0.5 mx-1  rounded"
                >
                  Play Game 💣
                </NavLink>{" "}
                button here or up in the navigation bar to open a custom
                Minesweeper game built directly into this layout.
              </p>

              <p className="text-xs md:text-md lg:text-md text-slate-300 dark:text-slate-600 leading-relaxed">
                I built this isolated sandbox to showcase how I tackle complex
                frontend logic, specifically multi-dimensional array states,
                recursive tile revealing algorithms, and state history stacks
                that power a functional undo feature. Code available on{" "}
                <a
                  href={"https://github.com/Gasser5050"}
                  rel="noreferrer"
                  target="_blank"
                  className={"text-sm underline text-cyan-300 dark:text-indigo-700"}
                >
                  Github
                </a>
                .
              </p>
            </li>
          </ul>
        </div>
      </section>

      <section className="lg:flex lg:space-x-5 xl:space-x-8 bg-darkBlue dark:bg-slate-50 text-white dark:text-black mt-15 border rounded-lg py-4 sm:py-5 lg:px-10 max-w-2xl lg:max-w-5xl md:mx-auto mb-1">
        <div className="hidden lg:flex items-center">
          <img
            src={contactUs}
            alt="Email Us"
            className="w-90 xl:w-120 object-cover"
          />
        </div>

        <div className="w-full lg:border-l lg:pl-8">
          <h2 className="lg:hidden text-center text-2xl sm:text-3xl tracking-tight">
            Contact Us
          </h2>
          <h2 className="hidden lg:block text-center text-2xl tracking-tight mb-1">
            Get in touch
          </h2>
          <p
            className={cn(
              "opacity-0 text-sm text-red-500 text-center ease-in-out duration-200 -mb-1 px-5 pt-1 lg:pt-0",
              error ? "opacity-100" : ""
            )}
          >
            {error}
          </p>

          <Form
            action=""
            method="post"
            ref={formRef}
            className="px-4.5 sm:px-6"
          >
            <div className="group">
              <label
                htmlFor="name"
                className="pointer-events-none opacity-100 group-has-placeholder-shown:opacity-0 font-bold text-xs md:text-xs text-cyan-400 dark:text-cyan-600 pl-1 duration-100"
              >
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Enter Your Name"
                required
                className="w-full text-sm md:text-md py-2 px-2.5 border rounded-md bg-white text-black"
              />
            </div>

            <div className="group">
              <label
                htmlFor="email"
                className="pointer-events-none opacity-100 group-has-placeholder-shown:opacity-0 font-bold text-xs md:text-xs text-cyan-400 dark:text-cyan-600 pl-1 duration-100"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Enter Your Email"
                required
                className="w-full text-sm md:text-md py-2 px-2.5 border rounded-md bg-white text-black"
              />
            </div>

            <div className="group">
              <label
                htmlFor="message"
                className="pointer-events-none opacity-100 group-has-placeholder-shown:opacity-0 font-bold text-xs md:text-xs text-cyan-400 dark:text-cyan-600 pl-1 duration-100"
              >
                Message
              </label>
              <textarea
                name="message"
                id="message"
                placeholder="Type your message"
                required
                rows={2}
                onInput={e => {
                  const target = e.currentTarget;
                  target.style.height = "auto";
                  target.style.height = `${target.scrollHeight}px`;
                }}
                className="resize-none overflow-hidden w-full text-sm md:text-md py-2 px-2.5 border rounded-md bg-white text-black"
              ></textarea>
            </div>

            <div className="flex justify-center mt-2 md:pt-1">
              <FormButton state={state} isSuccess={isSuccess} />
            </div>
          </Form>
        </div>
      </section>
    </div>
  );
}

export default Home;
