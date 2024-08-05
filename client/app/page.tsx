"use client";

import React, { useEffect } from 'react';
import { fetchBoardMembers} from './firebase';

export default function Home() {
  useEffect(() => {
    // Fetch initial data
    fetchBoardMembers();
    
    // Subscribe to real-time updates
  }, []);
  

  return (
    <div>
      <h1>Board Members</h1>
      <button>Sign In</button>
    </div>
  );
}
