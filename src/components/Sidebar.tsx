import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Sidebar = () => {
  return (
    <aside className="w-64 h-full bg-gray-800 text-white p-4">
      <div className="mb-4">
        <Link href="/">
          <Image src="/portier-icon.png" alt="Company Logo" layout="responsive" width={64} height={64} />
        </Link>
      </div>
      <nav>
        <ul>
          <li className="mb-2"><Link href="/tenants">Tenants</Link></li>
          <li className="mb-2"><Link href="/users">Users</Link></li>
          <li className="mb-2"><Link href="/keys">Keys</Link></li>
          <li className="mb-2"><Link href="/copies">Copies</Link></li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;