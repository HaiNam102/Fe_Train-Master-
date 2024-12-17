const Header = ({ title }) => {
    return (
        <header 
            className="p-3 mb-2 bg-dark text-white border-bottom" 
            style={{ margin: 0, paddingTop: 0 }}
        >
            <div className="container py-3">
                <h1 className="h4 text-light fw-semibold">{title}</h1>
            </div>
        </header>
    );
};

export default Header;
