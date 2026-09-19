import Dashboard from "../pages/Dashboard";
import Suppliers from "../pages/Suppliers";
import Products from "../pages/Products";

interface AppRoutesProps {
    currentPath: string;
}

function PlaceholderPage({ title }: { title: string }) {
    return (
        <div className="page">
            <header className="page-header">
                <h1>{title}</h1>
            </header>

            <section className="placeholder-card">
                <h2>{title}</h2>
                <p>Esta área será implementada nas próximas etapas do sistema.</p>
            </section>
        </div>
    );
}

function AppRoutes({ currentPath }: AppRoutesProps) {
    switch (currentPath) {
        case "/dashboard":
        case "/":
            return <Dashboard />;
        case "/suppliers":
            return <Suppliers />;
        case "/products":
            return <Products />;
        case "/ingredients":
            return <PlaceholderPage title="Matérias-Primas" />;
        case "/recipes":
            return <PlaceholderPage title="Fichas Técnicas" />;
        case "/orders":
            return <PlaceholderPage title="Encomendas" />;
        case "/users":
            return <PlaceholderPage title="Usuários" />;
        default:
            return <PlaceholderPage title="Página não encontrada" />;
    }
}

export default AppRoutes;
