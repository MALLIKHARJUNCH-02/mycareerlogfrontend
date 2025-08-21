import React from 'react';

export default function SearchBar({ search, setSearch }) {
  return (
    <input
      type="text"
      value={search}
      onChange={e => setSearch(e.target.value)}
      placeholder="Search by company"
      style={{ width: '100%', marginBottom: '15px', padding: '8px' }}
    />
  );
}
