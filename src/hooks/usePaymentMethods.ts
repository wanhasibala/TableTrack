import { useState, useEffect } from 'react';
import { supabase } from '@/db/supabaseClient';
import { Database } from '@/types/supabase';

type PaymentMethod = Database['public']['Tables']['payment_method']['Row'];

export const usePaymentMethods = () => {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchPaymentMethods = async () => {
      try {
        const { data, error } = await supabase
          .from('payment_method')
          .select('*')
          .eq('is_active', true)
          .order('sort_order', { ascending: true });

        if (error) throw error;
        
        if (data) {
          setPaymentMethods(data);
          if (data.length > 0 && !selectedMethod) {
            setSelectedMethod(data[0].id);
          }
        }
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch payment methods'));
        console.error('Error fetching payment methods:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentMethods();
  }, []);

  return {
    paymentMethods,
    selectedMethod,
    setSelectedMethod,
    loading,
    error
  };
};