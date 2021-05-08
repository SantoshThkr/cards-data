import { useEffect, useState } from 'react';
import CustomerTable from '../components/CustomerTable';
import { getCustomers } from '../services/api';

function Customers() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    getCustomers().then(setCustomers);
  }, []);

  return (
    <div>
      <h1 className="page-title">Customers</h1>

      <div className="card">
        <CustomerTable customers={customers} />
      </div>
    </div>
  );
}

export default Customers;
