import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import PasswordForm from './components/PasswordForm';
import PasswordTable from './components/PasswordTable';
import { getpassword, createpassword, updatepassword, deletepassword } from './service/passwordApis.js';

const DEFAULT_CREDENTIALS = [];

function App() {
  const [credentials, setCredentials] = useState(DEFAULT_CREDENTIALS);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingCredential, setEditingCredential] = useState(null);

  const fetchCredentials = async () => {
    try {
      const res = await getpassword();
      setCredentials(res.data.message || res.data || []);
    } catch (err) {
      console.error('Error fetching credentials:', err);
    }
  };

  // Fetch passwords from database on mount
  useEffect(() => {
    fetchCredentials();
  }, []);

  const handleSave = async (formData) => {
    try {
      if (editingCredential) {
        // Update existing credential
        await updatepassword(editingCredential.id, formData);
        alert('Password Updated Successfully');
        setEditingCredential(null);
      } else {
        // Create new credential
        await createpassword(formData);
        alert('Password Added Successfully');
      }
      fetchCredentials();
    } catch (err) {
      console.error('Error saving credential:', err);
    }
  };

  const handleEdit = (credential) => {
    setEditingCredential(credential);
  };

  const handleCancelEdit = () => {
    setEditingCredential(null);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this credential?')) {
      try {
        await deletepassword(id);
        if (editingCredential && editingCredential.id === id) {
          setEditingCredential(null);
        }
        fetchCredentials();
      } catch (err) {
        console.error('Error deleting credential:', err);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-on-background font-body-md">
      <Header />

      <div className="flex-1 flex max-w-container-max mx-auto w-full min-h-[calc(100vh-128px)]">
        {/* <Sidebar /> */}

        <main className="flex-1 px-md md:px-xl py-xl">
          {/* Hero Section */}
          <section className="mb-xl text-center">
            <h1 className="font-headline-lg text-headline-lg text-on-surface mb-xs">PassKeeper</h1>
            <p className="font-body-md text-on-surface-variant tracking-wide uppercase text-[10px] opacity-70">
              Industrial-grade password management.
            </p>
          </section>

          {/* Form */}
          <PasswordForm
            onSave={handleSave}
            editingCredential={editingCredential}
            onCancelEdit={handleCancelEdit}
          />

          {/* Table list */}
          <PasswordTable
            credentials={credentials}
            setCredentials={setCredentials}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </main>
      </div>

      {/* Footer */}
      <footer className="w-full h-16 border-t border-outline-variant bg-background shrink-0">
        <div className="flex justify-between items-center px-gutter max-w-container-max mx-auto h-full text-xs">
          <span className="font-label-md text-label-md text-on-surface-variant opacity-60">
            PassKeeper Industrial Security © 2024
          </span>
          <div className="flex items-center gap-lg">
            <a
              className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors"
              href="#"
              onClick={(e) => e.preventDefault()}
            >
              Docs
            </a>
            <a
              className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors"
              href="#"
              onClick={(e) => e.preventDefault()}
            >
              Privacy
            </a>
            <a
              className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors"
              href="#"
              onClick={(e) => e.preventDefault()}
            >
              Security
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
