import React, { useState, useEffect } from 'react';

export default function PasswordForm({ onSave, editingCredential, onCancelEdit }) {
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    website: "",
    username: "",
    password: "",
  });

  // Fill form when editingCredential changes
  useEffect(() => {
    if (editingCredential) {
      setFormData({
        website: editingCredential.website,
        username: editingCredential.username,
        password: editingCredential.password,
      });
    } else {
      setFormData({
        website: "",
        username: "",
        password: "",
      });
    }
  }, [editingCredential]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    if (!editingCredential) {
      setFormData({
        website: "",
        username: "",
        password: "",
      });
    }
  };

  return (
    <section className="mb-xl">
      <div className="bg-surface-container-low border border-outline-variant p-md rounded-lg shadow-sm">
        <div className="flex justify-between items-center mb-md">
          <h3 className="font-label-md text-label-md text-on-surface-variant uppercase">
            {editingCredential ? 'Edit Credentials' : 'Add New Credentials'}
          </h3>
          {editingCredential && (
            <button
              onClick={onCancelEdit}
              type="button"
              className="text-[11px] font-label-md text-error hover:underline cursor-pointer"
            >
              Cancel Edit
            </button>
          )}
        </div>
        <form className="grid grid-cols-1 md:grid-cols-4 gap-md" onSubmit={handleSubmit}>
          <div className="relative">
            <span className="material-symbols-outlined absolute left-sm top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px] pointer-events-none">
              language
            </span>
            <input
              name="website"
              className="w-full bg-surface-container border border-outline-variant focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary text-on-surface font-code-md text-code-md pl-lg py-sm transition-colors rounded"
              placeholder="Website"
              type="text"
              value={formData.website}
              onChange={handleChange}
              required
            />
          </div>
          <div className="relative">
            <span className="material-symbols-outlined absolute left-sm top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px] pointer-events-none">
              person
            </span>
            <input
              name="username"
              className="w-full bg-surface-container border border-outline-variant focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary text-on-surface font-code-md text-code-md pl-lg py-sm transition-colors rounded"
              placeholder="Username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="relative">
            <span className="material-symbols-outlined absolute left-sm top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px] pointer-events-none">
              lock
            </span>
            <input
              name="password"
              className="w-full bg-surface-container border border-outline-variant focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary text-on-surface font-code-md text-code-md pl-lg pr-lg py-sm transition-colors rounded"
              placeholder="Password"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button
              className="absolute right-sm top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary transition-colors cursor-pointer flex items-center"
              onClick={() => setShowPassword(!showPassword)}
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">
                {showPassword ? 'visibility_off' : 'visibility'}
              </span>
            </button>
          </div>
          <button
            className="bg-primary-container text-on-primary-container font-label-md text-label-md py-sm px-md rounded hover:brightness-110 active:scale-95 transition-all duration-200 flex items-center justify-center gap-xs cursor-pointer"
            type="submit"
          >
            <span className="material-symbols-outlined text-[18px]">save</span>
            {editingCredential ? 'Update Password' : 'Save Password'}
          </button>
        </form>
      </div>
    </section>
  );
}

