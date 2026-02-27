import { useState, useEffect } from 'react';
import { API_URL } from '../config/api';

/**
 * Hook to check if user has active subscription
 * Returns subscription status and loading state
 */
export function usePaymentCheck() {
  const [subscription, setSubscription] = useState({
    status: 'free',
    hasAccess: false,
    loading: true,
    error: null
  });

  useEffect(() => {
    checkSubscriptionStatus();
  }, []);

  const checkSubscriptionStatus = async () => {
    const token = localStorage.getItem('token');
    
    // If no token, user is not logged in
    if (!token) {
      setSubscription({
        status: 'free',
        hasAccess: false,
        loading: false,
        error: null
      });
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/payment/subscription-status`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to check subscription');
      }

      const data = await response.json();
      
      setSubscription({
        status: data.subscription.status,
        hasAccess: data.subscription.hasAccess,
        paidAt: data.subscription.paidAt,
        loading: false,
        error: null
      });

    } catch (error) {
      console.error('Subscription check error:', error);
      setSubscription({
        status: 'free',
        hasAccess: false,
        loading: false,
        error: error.message
      });
    }
  };

  const refreshSubscription = () => {
    setSubscription(prev => ({ ...prev, loading: true }));
    checkSubscriptionStatus();
  };

  return {
    subscription,
    refreshSubscription
  };
}
