import { NavLink } from 'react-router-dom';

function Sidebar() {
  return (
    <aside className="sidebar">
      <h2 className="sidebar-title">E-Commerce Admin</h2>
      <nav className="sidebar-nav">
        <NavLink to="/" end>
          Dashboard
        </NavLink>
        <NavLink to="/products">Products</NavLink>
        <NavLink to="/orders">Orders</NavLink>
        <NavLink to="/customers">Customers</NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;
