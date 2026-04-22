import { useState, useEffect } from 'react';
import { API_URL } from '../config/api';

/**
 * PAYMENT REMOVED FOR DEMO: Hook modified to always grant access
 * Original: checked subscription status via API
 * Demo: always returns 'active' status for all authenticated users
 */
export function usePaymentCheck() {
  const [subscription, setSubscription] = useState({
    status: 'active',  // Always active for demo
    hasAccess: true,   // Always grant access
    loading: false,    // No loading needed
    error: null
  });

  useEffect(() => {
    // Demo mode: instantly grant access without API check
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

    // DEMO MODE: Always grant access to authenticated users
    setSubscription({
      status: 'active',
      hasAccess: true,
      paidAt: new Date(),
      loading: false,
      error: null
    });

    /* ORIGINAL PAYMENT CHECK (DISABLED FOR DEMO):
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
    */
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
