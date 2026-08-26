interface SidebarProps {
    currentPath: string;
    onNavigate: (path: string) => void;
}

const menuItems = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Fornecedores", path: "/suppliers" },
    { label: "Produtos", path: "/products" },
    { label: "Matérias-Primas", path: "/ingredients" },
    { label: "Fichas Técnicas", path: "/recipes" },
    { label: "Encomendas", path: "/orders" },
    { label: "Usuários", path: "/users" },
];

function Sidebar({ currentPath, onNavigate }: SidebarProps) {
    function handleNavigate(path: string) {
        onNavigate(path);
    }

    return (
        <aside className="sidebar">
            <div className="sidebar-brand">
                <span className="sidebar-brand-title">Sistema Bordezan</span>
            </div>

            <nav className="sidebar-nav">
                {menuItems.map((item) => (
                    <button
                        key={item.path}
                        type="button"
                        className={`sidebar-link ${currentPath === item.path ? "active" : ""}`}
                        onClick={() => handleNavigate(item.path)}
                    >
                        {item.label}
                    </button>
                ))}
            </nav>
        </aside>
    );
}

export default Sidebar;
