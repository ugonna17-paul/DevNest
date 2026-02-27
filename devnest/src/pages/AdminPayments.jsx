import { AuthLayout } from '../components/auth/AuthLayout';
import { 
  CreditCard, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Eye,
  DollarSign,
  Users,
  TrendingUp,
  Image as ImageIcon
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { API_URL } from '../config/api';

export function AdminPayments() {
  const [payments, setPayments] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('pending'); // pending, approved, rejected, all
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [showImageModal, setShowImageModal] = useState(false);
  const [actionNote, setActionNote] = useState('');
  const [processingPaymentId, setProcessingPaymentId] = useState(null);
  
  // Users state
  const [users, setUsers] = useState([]);
  const [usersStats, setUsersStats] = useState(null);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [showUsersSection, setShowUsersSection] = useState(false);

  useEffect(() => {
    fetchPayments();
    fetchStats();
    fetchUsers();
  }, [filter]);

  // Real-time polling - fetch data every 10 seconds
  useEffect(() => {
    const pollInterval = setInterval(() => {
      fetchPayments();
      fetchStats();
      if (showUsersSection) {
        fetchUsers();
      }
    }, 10000); // Poll every 10 seconds

    // Cleanup on unmount
    return () => clearInterval(pollInterval);
  }, [filter, showUsersSection]);

  const fetchPayments = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const url = filter === 'pending' 
        ? `${API_URL}/api/payment/pending`
        : `${API_URL}/api/payment/all?status=${filter === 'all' ? '' : filter}`;

      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const result = await response.json();

      if (response.ok) {
        setPayments(result.payments || []);
      } else {
        toast.error(result.message || 'Failed to load payments');
      }
    } catch (error) {
      console.error('Fetch payments error:', error);
      toast.error('Failed to load payments');
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/payment/stats`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const result = await response.json();
      if (response.ok) {
        setStats(result.stats);
      }
    } catch (error) {
      console.error('Fetch stats error:', error);
    }
  };

  const fetchUsers = async () => {
    setLoadingUsers(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/auth/users`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const result = await response.json();
      if (result.success) {
        setUsers(result.users || []);
        setUsersStats(result.stats);
      } else {
        toast.error(result.message || 'Failed to load users');
      }
    } catch (error) {
      console.error('Fetch users error:', error);
      toast.error('Failed to load users');
    } finally {
      setLoadingUsers(false);
    }
  };

  const handleApprove = async (paymentId) => {
    if (!window.confirm('Are you sure you want to approve this payment? This will grant the user lifetime access.')) {
      return;
    }

    setProcessingPaymentId(paymentId);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/payment/approve/${paymentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          note: actionNote || 'Payment verified and approved'
        })
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to approve payment');
      }

      toast.success(`✅ Payment approved! User now has premium access.`, {
        autoClose: 3000
      });

      setActionNote('');
      // Refresh all data to show updated status
      fetchPayments();
      fetchStats();
      fetchUsers();

    } catch (error) {
      toast.error(error.message || 'Failed to approve payment');
    } finally {
      setProcessingPaymentId(null);
    }
  };

  const handleReject = async (paymentId) => {
    if (!actionNote.trim() || actionNote.length < 10) {
      toast.error('Please provide a detailed rejection reason (min 10 characters)');
      return;
    }

    if (!window.confirm('Are you sure you want to reject this payment?')) {
      return;
    }

    setProcessingPaymentId(paymentId);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/payment/reject/${paymentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          note: actionNote
        })
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to reject payment');
      }

      toast.success('Payment rejected', {
        autoClose: 2000
      });

      setActionNote('');
      // Refresh all data to show updated status
      fetchPayments();
      fetchStats();
      fetchUsers();

    } catch (error) {
      toast.error(error.message || 'Failed to reject payment');
    } finally {
      setProcessingPaymentId(null);
    }
  };

  const viewPaymentProof = (payment) => {
    setSelectedPayment(payment);
    setShowImageModal(true);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'approved':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-[#3FB950]/20 text-[#3FB950] rounded-full text-sm font-medium">
            <CheckCircle size={14} />
            Approved
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-[#F85149]/20 text-[#F85149] rounded-full text-sm font-medium">
            <XCircle size={14} />
            Rejected
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-[#E3B341]/20 text-[#E3B341] rounded-full text-sm font-medium">
            <Clock size={14} />
            Pending
          </span>
        );
    }
  };

  return (
    <AuthLayout>
      <div className="max-w-7xl">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-[#C9D1D9] text-[24px] md:text-[32px] font-bold mb-2">
            Payment Management
          </h1>
          <p className="text-[#8B949E] text-sm md:text-base">
            Review and approve student payments
          </p>
        </div>

        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6">
            <div className="bg-[#161B22] border border-[#30363D] rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <Clock className="text-[#E3B341]" size={18} />
                <span className="text-[#8B949E] text-xs md:text-sm">Pending</span>
              </div>
              <p className="text-[#C9D1D9] text-xl md:text-2xl font-bold">{stats.payments.pending}</p>
            </div>

            <div className="bg-[#161B22] border border-[#30363D] rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <CheckCircle className="text-[#3FB950]" size={18} />
                <span className="text-[#8B949E] text-xs md:text-sm">Approved</span>
              </div>
              <p className="text-[#C9D1D9] text-xl md:text-2xl font-bold">{stats.payments.approved}</p>
            </div>

            <div className="bg-[#161B22] border border-[#30363D] rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <DollarSign className="text-[#58A6FF]" size={18} />
                <span className="text-[#8B949E] text-xs md:text-sm">Revenue</span>
              </div>
              <p className="text-[#C9D1D9] text-xl md:text-2xl font-bold">₦{stats.revenue.toLocaleString()}</p>
            </div>

            <div className="bg-[#161B22] border border-[#30363D] rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <Users className="text-[#D29922]" size={18} />
                <span className="text-[#8B949E] text-xs md:text-sm">Active Users</span>
              </div>
              <p className="text-[#C9D1D9] text-xl md:text-2xl font-bold">{stats.activeSubscriptions}</p>
            </div>
          </div>
        )}

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {['pending', 'approved', 'rejected', 'all'].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-3 md:px-4 py-2 rounded-md font-medium transition-colors text-sm md:text-base ${
                filter === tab
                  ? 'bg-[#1F6FEB] text-white'
                  : 'bg-[#161B22] text-[#8B949E] hover:text-[#C9D1D9] border border-[#30363D]'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Payments List */}
        <div className="bg-[#161B22] border border-[#30363D] rounded-lg">
          {loading ? (
            <div className="p-8 text-center">
              <div className="text-[#8B949E]">Loading payments...</div>
            </div>
          ) : payments.length === 0 ? (
            <div className="p-8 text-center">
              <CreditCard size={48} className="mx-auto mb-4 text-[#8B949E]" />
              <p className="text-[#8B949E]">No {filter} payments found</p>
            </div>
          ) : (
            <div className="divide-y divide-[#30363D]">
              {payments.map((payment) => (
                <div key={payment.id} className="p-4 md:p-6 hover:bg-[#0D1117] transition-colors">
                  <div className="flex flex-col md:flex-row items-start justify-between mb-4 gap-3">
                    <div className="flex-1 w-full md:w-auto">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 mb-2">
                        <h3 className="text-[#C9D1D9] font-semibold text-base md:text-lg">
                          {payment.user.name}
                        </h3>
                        {getStatusBadge(payment.status)}
                      </div>
                      <p className="text-[#8B949E] text-sm break-all">{payment.user.email}</p>
                    </div>
                    <button
                      onClick={() => viewPaymentProof(payment)}
                      className="flex items-center gap-2 px-3 md:px-4 py-2 bg-[#0D1117] hover:bg-[#161B22] border border-[#30363D] text-[#C9D1D9] rounded-md transition-colors text-sm w-full sm:w-auto justify-center"
                    >
                      <Eye size={16} />
                      View Proof
                    </button>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-4">
                    <div>
                      <p className="text-[#8B949E] text-xs mb-1">Amount</p>
                      <p className="text-[#C9D1D9] font-semibold">₦{payment.amount.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-[#8B949E] text-xs mb-1">Reference</p>
                      <p className="text-[#C9D1D9] font-mono text-sm">{payment.reference}</p>
                    </div>
                    <div>
                      <p className="text-[#8B949E] text-xs mb-1">Submitted</p>
                      <p className="text-[#C9D1D9] text-sm">
                        {new Date(payment.submittedAt).toLocaleString()}
                      </p>
                    </div>
                    {payment.approvedAt && (
                      <div>
                        <p className="text-[#8B949E] text-xs mb-1">Processed</p>
                        <p className="text-[#C9D1D9] text-sm">
                          {new Date(payment.approvedAt).toLocaleString()}
                        </p>
                      </div>
                    )}
                  </div>

                  {payment.adminNote && (
                    <div className="mb-4 p-3 bg-[#0D1117] rounded-md">
                      <p className="text-[#8B949E] text-xs mb-1">Admin Note:</p>
                      <p className="text-[#C9D1D9] text-sm">{payment.adminNote}</p>
                    </div>
                  )}

                  {payment.status === 'pending' && (
                    <div className="mt-4 space-y-3">
                      <div>
                        <label className="block text-[#C9D1D9] text-sm font-medium mb-2">
                          Note (optional for approval, required for rejection)
                        </label>
                        <textarea
                          value={actionNote}
                          onChange={(e) => setActionNote(e.target.value)}
                          className="w-full px-3 py-2 bg-[#0D1117] border border-[#30363D] text-[#C9D1D9] rounded-md focus:outline-none focus:border-[#58A6FF] transition-colors text-sm"
                          rows="2"
                          placeholder="e.g., Payment verified in bank account"
                        />
                      </div>

                      <div className="flex gap-3">
                        <button
                          onClick={() => handleApprove(payment.id)}
                          disabled={processingPaymentId === payment.id}
                          className="flex items-center gap-2 px-4 py-2 bg-[#238636] hover:bg-[#2EA043] text-white rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <CheckCircle size={16} />
                          {processingPaymentId === payment.id ? 'Approving...' : 'Approve Payment'}
                        </button>

                        <button
                          onClick={() => handleReject(payment.id)}
                          disabled={processingPaymentId === payment.id}
                          className="flex items-center gap-2 px-4 py-2 bg-[#DA3633] hover:bg-[#F85149] text-white rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <XCircle size={16} />
                          {processingPaymentId === payment.id ? 'Rejecting...' : 'Reject Payment'}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Users Section */}
        <div className="mt-6 md:mt-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
            <div>
              <h2 className="text-[#C9D1D9] text-[20px] md:text-[24px] font-bold mb-2">
                Registered Users
              </h2>
              <p className="text-[#8B949E] text-sm md:text-base">
                View all registered users and their subscription status
              </p>
            </div>
            <button
              onClick={() => {
                if (!showUsersSection) {
                  fetchUsers(); // Refetch when showing
                }
                setShowUsersSection(!showUsersSection);
              }}
              className="px-4 py-2 bg-[#1F6FEB] hover:bg-[#1a5dc7] text-white rounded-md transition-colors text-sm w-full sm:w-auto"
            >
              {showUsersSection ? 'Hide Users' : 'Show Users'}
            </button>
          </div>

          {/* Users Stats */}
          {usersStats && showUsersSection && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6">
              <div className="bg-[#161B22] border border-[#30363D] rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <Users className="text-[#58A6FF]" size={18} />
                  <span className="text-[#8B949E] text-xs md:text-sm">Total Users</span>
                </div>
                <p className="text-[#C9D1D9] text-xl md:text-2xl font-bold">{usersStats.total}</p>
              </div>

              <div className="bg-[#161B22] border border-[#30363D] rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <Users className="text-[#8B949E]" size={18} />
                  <span className="text-[#8B949E] text-xs md:text-sm">Free Users</span>
                </div>
                <p className="text-[#C9D1D9] text-xl md:text-2xl font-bold">{usersStats.free}</p>
              </div>

              <div className="bg-[#161B22] border border-[#30363D] rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <Clock className="text-[#E3B341]" size={18} />
                  <span className="text-[#8B949E] text-xs md:text-sm">Pending</span>
                </div>
                <p className="text-[#C9D1D9] text-xl md:text-2xl font-bold">{usersStats.pending}</p>
              </div>

              <div className="bg-[#161B22] border border-[#30363D] rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <CheckCircle className="text-[#3FB950]" size={18} />
                  <span className="text-[#8B949E] text-xs md:text-sm">Premium Users</span>
                </div>
                <p className="text-[#C9D1D9] text-xl md:text-2xl font-bold">{usersStats.active}</p>
              </div>
            </div>
          )}

          {/* Users List */}
          {showUsersSection && (
            <div className="bg-[#161B22] border border-[#30363D] rounded-lg">
              {loadingUsers ? (
                <div className="p-8 text-center">
                  <div className="text-[#8B949E]">Loading users...</div>
                </div>
              ) : users.length === 0 ? (
                <div className="p-8 text-center">
                  <Users size={48} className="mx-auto mb-4 text-[#8B949E]" />
                  <p className="text-[#8B949E]">No users found</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[600px]">
                    <thead className="bg-[#0D1117] border-b border-[#30363D]">
                      <tr>
                        <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-[#8B949E] uppercase tracking-wider">
                          Name
                        </th>
                        <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-[#8B949E] uppercase tracking-wider">
                          Email
                        </th>
                        <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-[#8B949E] uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-[#8B949E] uppercase tracking-wider">
                          Joined
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#30363D]">
                      {users.map((user) => (
                        <tr key={user.id} className="hover:bg-[#0D1117] transition-colors">
                          <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                            <div className="text-[#C9D1D9] font-medium text-sm">{user.name}</div>
                            {user.role === 'admin' && (
                              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-[#1F6FEB]/20 text-[#58A6FF]">
                                Admin
                              </span>
                            )}
                          </td>
                          <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                            <div className="text-[#8B949E] text-sm truncate max-w-[200px]">{user.email}</div>
                          </td>
                          <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                            {user.subscription.status === 'active' ? (
                              <span className="inline-flex items-center gap-1 px-3 py-1 bg-[#3FB950]/20 text-[#3FB950] rounded-full text-sm font-medium">
                                <CheckCircle size={14} />
                                Premium
                              </span>
                            ) : user.subscription.status === 'pending' ? (
                              <span className="inline-flex items-center gap-1 px-3 py-1 bg-[#E3B341]/20 text-[#E3B341] rounded-full text-sm font-medium">
                                <Clock size={14} />
                                Pending
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-3 py-1 bg-[#8B949E]/20 text-[#8B949E] rounded-full text-sm font-medium">
                                Free
                              </span>
                            )}
                          </td>
                          <td className="px-4 md:px-6 py-4 whitespace-nowrap text-[#8B949E] text-xs md:text-sm">
                            {new Date(user.joinedAt).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Image Modal */}
        {showImageModal && selectedPayment && (
          <div
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
            onClick={() => setShowImageModal(false)}
          >
            <div
              className="bg-[#161B22] border border-[#30363D] rounded-lg max-w-4xl w-full p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-[#C9D1D9] font-semibold text-lg">Payment Proof</h3>
                  <p className="text-[#8B949E] text-sm">{selectedPayment.user.name} - {selectedPayment.reference}</p>
                </div>
                <button
                  onClick={() => setShowImageModal(false)}
                  className="text-[#8B949E] hover:text-[#C9D1D9] transition-colors"
                >
                  <XCircle size={24} />
                </button>
              </div>

              <div className="bg-[#0D1117] rounded-lg p-4">
                <img
                  src={`${API_URL}/${selectedPayment.proofImage}`}
                  alt="Payment Proof"
                  className="max-w-full max-h-[70vh] mx-auto rounded"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML = '<p class="text-[#F85149] text-center">Failed to load image</p>';
                  }}
                />
              </div>

              <div className="mt-4 grid grid-cols-2 gap-4 p-4 bg-[#0D1117] rounded-lg">
                <div>
                  <p className="text-[#8B949E] text-xs mb-1">Amount</p>
                  <p className="text-[#C9D1D9] font-semibold">₦{selectedPayment.amount.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-[#8B949E] text-xs mb-1">Reference</p>
                  <p className="text-[#C9D1D9] font-mono">{selectedPayment.reference}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AuthLayout>
  );
}
