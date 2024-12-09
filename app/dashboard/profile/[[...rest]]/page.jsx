'use client';

import { UserProfile } from '@clerk/nextjs';
import React from 'react';

export default function ProfilePage() {
  return (
    <div className="h-screen bg-gray-50 p-5">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Profile Settings</h1>
        <div className="border-t-2 pt-6">
          <UserProfile 
            appearance={{
              variables: {
                colorPrimary: '#4A90E2',
              },
              layout: {
                showOptionalFields: true,
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}
