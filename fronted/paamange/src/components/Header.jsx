import React from 'react';

export default function Header() {
  return (
    <header className="bg-background w-full h-16 border-b border-outline-variant sticky top-0 z-50">
      <div className="flex items-center justify-between px-gutter max-w-container-max mx-auto h-full">
        <div className="flex items-center gap-sm">
          <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
            lock
          </span>
          <span className="font-headline-md text-headline-md font-bold text-primary">PassKeeper</span>
        </div>
        <div className="flex items-center gap-md">
          <button 
            type="button"
            className="hover:bg-surface-container-high transition-colors p-sm rounded active:scale-95 duration-100 flex items-center cursor-pointer"
            title="Help"
          >
            <span className="material-symbols-outlined text-on-surface-variant">help</span>
          </button>
          <button 
            type="button"
            className="hover:bg-surface-container-high transition-colors p-sm rounded active:scale-95 duration-100 flex items-center cursor-pointer"
            title="Settings"
          >
            <span className="material-symbols-outlined text-on-surface-variant">settings</span>
          </button>
        </div>
      </div>
    </header>
  );
}
