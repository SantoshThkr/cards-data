import { useEffect, useState } from 'react';
import CustomerTable from '../components/CustomerTable';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import { getCustomers } from '../services/api';

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadCustomers = async () => {
      try {
        setCustomers(await getCustomers());
      } catch (err) {
        setError('Unable to load customers.');
      } finally {
        setLoading(false);
      }
    };

    loadCustomers();
  }, []);

  return (
    <div>
      <h1 className="page-title">Customers</h1>

      {error && <ErrorMessage message={error} />}

      <div className="card">
        {loading ? (
          <Loading text="Loading customers..." />
        ) : (
          <CustomerTable customers={customers} />
        )}
      </div>
    </div>
  );
}

export default Customers;
