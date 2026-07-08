import React, { useState } from 'react';

// const getWebsiteIcon = (website) => {

// };

const getSecurityStatus = (password) => {
  if (password.length < 8 || password.toLowerCase().includes('123') || password.toLowerCase().includes('root') || password.toLowerCase().includes('admin')) {
    return { text: 'Leaked', colorClass: 'bg-amber-500/10 text-amber-400 border-amber-500/20' };
  }
  return { text: 'Secure', colorClass: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' };
};

export default function PasswordTable({ credentials, searchQuery, setSearchQuery, onEdit, onDelete }) {
  const [visiblePasswords, setVisiblePasswords] = useState({});
  const [copiedId, setCopiedId] = useState(null);

  const toggleVisibility = (id) => {
    setVisiblePasswords((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const copyToClipboard = async (id, password) => {
    try {
      await navigator.clipboard.writeText(password);
      setCopiedId(id);
      setTimeout(() => {
        setCopiedId(null);
      }, 2000);
    } catch (err) {
      console.error('Failed to copy!', err);
    }
  };

  const filteredCredentials = credentials.filter((item) => {
    const query = searchQuery.toLowerCase();
    return (
      item.website.toLowerCase().includes(query) ||
      item.username.toLowerCase().includes(query)
    );
  });

  return (
    <section>
      <div className="flex items-center justify-between mb-md">
        <h2 className="font-headline-sm text-headline-sm text-on-surface">Stored Credentials</h2>
        {/* <div className="flex items-center bg-surface-container-low border border-outline-variant rounded px-sm">
          <span className="material-symbols-outlined text-on-surface-variant text-[18px]">search</span>
          <input
            className="bg-transparent border-none focus:outline-none focus:ring-0 text-on-surface font-code-md text-code-md py-xs w-48 pl-2"
            placeholder="Filter vault..."
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div> */}
      </div>
      <div className="bg-surface-container-low border border-outline-variant rounded-lg overflow-hidden shadow-sm">
        {filteredCredentials.length === 0 ? (
          <div className="p-xl text-center text-on-surface-variant opacity-60">
            {credentials.length === 0 ? 'No credentials stored yet. Add one above!' : 'No matching credentials found.'}
          </div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container border-b border-outline-variant">
                <th className="font-label-md text-label-md text-on-surface-variant p-md uppercase opacity-60">Website</th>
                <th className="font-label-md text-label-md text-on-surface-variant p-md uppercase opacity-60">Username</th>
                <th className="font-label-md text-label-md text-on-surface-variant p-md uppercase opacity-60">Password</th>
                <th className="font-label-md text-label-md text-on-surface-variant p-md uppercase opacity-60 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant">
              {filteredCredentials.map((item, index) => {
                const isMasked = !visiblePasswords[item.id];
                const security = getSecurityStatus(item.password);
                return (
                  <tr
                    key={item.id}
                    className="hover:bg-surface-container transition-colors group animate-entry"
                    style={{ animationDelay: `${(index + 1) * 50}ms` }}
                  >
                    <td className="p-md align-middle">
                      <div className="flex items-center gap-sm">

                        <span className="font-code-md text-code-md text-on-surface">{item.website}</span>
                      </div>
                    </td>
                    <td className="p-md align-middle font-code-md text-code-md text-on-surface-variant">
                      {item.username}
                    </td>
                    <td className="p-md align-middle">
                      <div className="flex items-center gap-sm">
                        <span
                          className={`font-password-display text-password-display tracking-widest text-[12px] ${!isMasked ? 'text-primary' : 'text-on-surface-variant'}`}
                        >
                          {isMasked ? '••••••••••••' : item.password}
                        </span>
                        <div className={`px-xs py-[2px] text-[10px] rounded border font-label-md uppercase ${security.colorClass}`}>
                          {security.text}
                        </div>
                      </div>
                    </td>
                    <td className="p-md align-middle text-right">
                      <div className="flex items-center justify-end gap-xs">
                        <button
                          className="relative p-xs hover:bg-surface-container-high rounded transition-colors text-on-surface-variant hover:text-primary cursor-pointer flex items-center"
                          onClick={() => copyToClipboard(item.id, item.password)}
                          title="Copy Password"
                        >
                          <span className="material-symbols-outlined text-[20px]">content_copy</span>
                          <span
                            className={`absolute -top-8 left-1/2 -translate-x-1/2 bg-on-background text-background font-label-md text-[10px] px-sm py-xs rounded-sm pointer-events-none transition-all duration-200 ${copiedId === item.id ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-1'
                              }`}
                          >
                            Copied!
                          </span>
                        </button>
                        <button
                          className="p-xs hover:bg-surface-container-high rounded transition-colors text-on-surface-variant hover:text-primary cursor-pointer flex items-center"
                          onClick={() => toggleVisibility(item.id)}
                          title={isMasked ? 'Show Password' : 'Hide Password'}
                        >
                          <span className="material-symbols-outlined text-[20px]">
                            {isMasked ? 'visibility' : 'visibility_off'}
                          </span>
                        </button>
                        <button
                          className="p-xs hover:bg-surface-container-high rounded transition-colors text-on-surface-variant hover:text-primary cursor-pointer flex items-center"
                          onClick={() => onEdit(item)}
                          title="Edit"
                        >
                          <span className="material-symbols-outlined text-[20px]">edit</span>
                        </button>
                        <button
                          className="p-xs hover:bg-surface-container-high rounded transition-colors text-on-surface-variant hover:text-error cursor-pointer flex items-center"
                          onClick={() => onDelete(item.id)}
                          title="Delete"
                        >
                          <span className="material-symbols-outlined text-[20px]">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
}
