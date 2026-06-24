import React from "react";

export default function About() {
  return (
    <main className="w-full max-w-4xl mx-auto p-4 md:p-6">
      <div className="bg-[#0a120e]/80 border border-emerald-900/30 rounded-2xl p-6 md:p-8 shadow-lg">
        <h1 className="text-3xl md:text-4xl font-bold text-emerald-300 mb-4">
          My Stopwatch Co.
        </h1>

        <p className="text-emerald-100/80 leading-relaxed mb-8">
          We build simple, elegant tools that help people manage time
          effectively. Our focus is creating fast, reliable, and easy-to-use
          productivity applications with a clean user experience.
        </p>

        <section aria-labelledby="product-overview">
          <h2
            id="product-overview"
            className="text-2xl font-semibold text-emerald-300 mb-4"
          >
            Product Overview
          </h2>

          <p className="text-emerald-100/80 leading-relaxed">
            This stopwatch application provides accurate and reliable time
            tracking with a minimal, distraction-free interface. Whether you're
            measuring workouts, study sessions, tasks, or events, the app is
            designed to deliver a smooth experience across desktop and mobile
            devices.
          </p>
        </section>
      </div>
    </main>
  );
}
