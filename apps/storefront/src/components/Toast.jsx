import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { CheckCircle, XCircle, Info } from 'lucide-react';
import './Toast.css';

const Toast = () => {
  const { toast, hideToast } = useContext(AppContext);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (toast) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(hideToast, 300); // wait for fade out animation
      }, 3000); // show for 3 seconds

      return () => clearTimeout(timer);
    }
  }, [toast, hideToast]);

  if (!toast) return null;

  return (
    <div className={`toast-container ${isVisible ? 'show' : 'hide'}`}>
      <div className={`toast toast-${toast.type}`}>
        <div className="toast-icon">
          {toast.type === 'success' && <CheckCircle size={20} />}
          {toast.type === 'error' && <XCircle size={20} />}
          {toast.type === 'info' && <Info size={20} />}
        </div>
        <p className="toast-message">{toast.message}</p>
      </div>
    </div>
  );
};

export default Toast;
