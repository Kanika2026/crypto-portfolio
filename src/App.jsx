import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <>
      <Navbar />

      <div className="layout">
        <Sidebar />

        <main className="content">
          <AppRoutes />
        </main>
      </div>
    </>
  );
}

export default App;