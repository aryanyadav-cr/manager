import React from 'react';

export default function Sidebar() {
  return (
    <aside className="hidden md:flex flex-col h-full py-md w-64 border-r border-outline-variant bg-surface-container-low shrink-0">
      <div className="px-md mb-lg">
        <h2 className="font-label-md text-label-md uppercase tracking-widest text-on-surface-variant opacity-60">Control Center</h2>
      </div>
      <nav className="flex flex-col gap-xs">
        <a 
          className="flex items-center gap-md px-md py-sm text-primary font-bold border-l-2 border-primary bg-surface-container hover:bg-surface-container-high transition-all duration-200" 
          href="#"
          onClick={(e) => e.preventDefault()}
        >
          <span className="material-symbols-outlined">lock</span>
          <span className="font-label-md text-label-md">Vault</span>
        </a>
        <a 
          className="flex items-center gap-md px-md py-sm text-on-surface-variant hover:bg-surface-container-high transition-all duration-200" 
          href="#"
          onClick={(e) => e.preventDefault()}
        >
          <span className="material-symbols-outlined">security</span>
          <span className="font-label-md text-label-md">Audit</span>
        </a>
        <a 
          className="flex items-center gap-md px-md py-sm text-on-surface-variant hover:bg-surface-container-high transition-all duration-200" 
          href="#"
          onClick={(e) => e.preventDefault()}
        >
          <span className="material-symbols-outlined">password</span>
          <span className="font-label-md text-label-md">Generator</span>
        </a>
        <a 
          className="flex items-center gap-md px-md py-sm text-on-surface-variant hover:bg-surface-container-high transition-all duration-200" 
          href="#"
          onClick={(e) => e.preventDefault()}
        >
          <span className="material-symbols-outlined">settings</span>
          <span className="font-label-md text-label-md">Settings</span>
        </a>
      </nav>
      <div className="mt-auto px-md py-md border-t border-outline-variant opacity-40">
        <p className="font-label-md text-label-md text-on-surface-variant">Engine: v1.0.4</p>
      </div>
    </aside>
  );
}
