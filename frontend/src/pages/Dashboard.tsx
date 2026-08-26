function Dashboard() {
    return (
        <div className="page">
            <header className="page-header">
                <h1>Dashboard</h1>
                <p>Bem-vindo ao Sistema Bordezan.</p>
            </header>

            <section className="dashboard-grid">
                <div className="dashboard-card">
                    <span className="dashboard-card-label">Suppliers</span>
                    <strong>Gerenciar fornecedores</strong>
                    <p>Cadastro, consulta, edição e exclusão.</p>
                </div>

                <div className="dashboard-card">
                    <span className="dashboard-card-label">Products</span>
                    <strong>Gerenciar produtos</strong>
                    <p>Cadastro, consulta, edição e exclusão.</p>
                </div>

                <div className="dashboard-card">
                    <span className="dashboard-card-label">System</span>
                    <strong>Módulos do sistema</strong>
                    <p>Outras áreas poderão ser adicionadas aqui.</p>
                </div>
            </section>
        </div>
    );
}

export default Dashboard;
