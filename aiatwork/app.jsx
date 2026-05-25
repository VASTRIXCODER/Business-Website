/* AIATWORK redesign — app entry */
function App() {
  useReveal();
  return (
    <>
      <Navbar />
      <main className="relative">
        <Hero />
        <TrustStrip />
        <WhatWeBuild />
        <Showcase />
        <Process />
        <Industries />
        <Proof />
        <FinalCTA />
      </main>
      <Footer />
      <ChatbotWidget />
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
