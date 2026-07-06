import { cn } from "../utils/cn";
import { useState } from "react";
import specializedCertificates from "../assets/json/specializedCertificates.json";
import allCertificates from "../assets/json/allCertificates.json";
import CertificateCard from "../components/CertificateCard";

function Certificates() {
  const [activeTab, setActiveTab] = useState("all");

  return (
    <div className="container mx-auto max-w-2xl md:max-w-4xl lg:max-w-6xl px-7 md:px-10 py-15 sm:py-15 md:py-18 lg:py-20 xl:py-24 space-y-12 md:space-y-24 text-slate-800 dark:text-slate-100 mb-2">
      <div className="space-y-2 md:space-y-6 pb-1 px-1">
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black tracking-tight">
          Verified Credentials
        </h1>
        <p className="font-sans text-sm sm:text-md md:text-lg leading-relaxed md:leading-7 text-slate-700 dark:text-slate-400 ">
          Structured technical training, professional specializations, and
          computer science foundations I have completed. This coursework covers
          modern frontend architectures, responsive interface design, core
          software engineering principles, and data management. Every credential
          links back to its official provider for instant verification.
        </p>
      </div>

      <section>
        <div className="flex justify-center space-x-3 lg:text-lg mb-4 sm:mb-5 md:mb-6">
          <button
            onClick={() => setActiveTab("all")}
            className={cn(
              "px-2 p-1 bg-slate-600 text-slate-100 border border-slate-400 rounded-lg cursor-pointer hover:scale-105",
              activeTab === "all" ? "underline underline-offset-4" : ""
            )}
          >
            All
          </button>
          <button
            onClick={() => setActiveTab("specialization")}
            className={cn(
              "px-2 p-1 bg-slate-600 text-slate-100 border border-slate-800 dark:border-slate-400 rounded-lg cursor-pointer hover:scale-105",
              activeTab === "specialization"
                ? "underline underline-offset-4"
                : ""
            )}
          >
            Specializations
          </button>
        </div>

        <h2 className="sr-only">Certificate Catalog</h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-6 lg:gap-8 xl:gap-10 duration-200 mb-2 md:mb-0">
          {activeTab === "specialization" &&
            specializedCertificates.map(certificate => {
              return (
                <CertificateCard
                  key={certificate.id}
                  certificate={certificate}
                  activeTab={activeTab}
                />
              );
            })}

          {activeTab === "all" &&
            allCertificates.map(certificate => {
              return (
                <CertificateCard
                  key={certificate.id}
                  certificate={certificate}
                  activeTab={activeTab}
                />
              );
            })}
        </ul>
      </section>
    </div>
  );
}

export default Certificates;
