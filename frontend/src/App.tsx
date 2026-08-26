import { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import AppRoutes from "./routes/AppRoutes";

function App() {
    const [currentPath, setCurrentPath] = useState(window.location.pathname || "/dashboard");

    useEffect(() => {
        const handlePopState = () => {
            setCurrentPath(window.location.pathname || "/dashboard");
        };

        window.addEventListener("popstate", handlePopState);
        return () => window.removeEventListener("popstate", handlePopState);
    }, []);

    function navigate(path: string) {
        window.history.pushState({}, "", path);
        setCurrentPath(path);
    }

    return (
        <div className="app-shell">
            <Sidebar currentPath={currentPath} onNavigate={navigate} />

            <main className="main-content">
                <AppRoutes currentPath={currentPath} />
            </main>
        </div>
    );
}

export default App;
