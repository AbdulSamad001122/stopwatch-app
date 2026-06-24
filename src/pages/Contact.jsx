// src/pages/Contact.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '../components/Toast'; // hypothetical toast util

const isValidEmail = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !isValidEmail(form.email)) { setError('Invalid data'); return; }
    setLoading(true);
    try {
      const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      if (res.ok) {
        toast.success('Your contact information has been saved.');
        setForm({ name: '', email: '' });
      } else {
        const msg = await res.text();
        toast.error(msg || 'Submission failed.');
      }
    } catch {
      toast.error('Network error.');
    } finally {
      setLoading(false);
    }
  };

  const isDisabled = !form.name || !isValidEmail(form.email);

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-white">Name</label>
        <input
          name="name"
          type="text"
          value={form.name}
          onChange={onChange}
          className="mt-1 block w-full rounded-md border-gray-700 bg-gray-800 text-white"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-white">Email</label>
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={onChange}
          className="mt-1 block w-full rounded-md border-gray-700 bg-gray-800 text-white"
          required
        />
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <button
        type="submit"
        disabled={isDisabled || loading}
        className="w-full rounded-md bg-emerald-600 px-4 py-2 text-white disabled:opacity-50"
      >
        {loading ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
};

export default Contact;