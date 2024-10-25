import Dashboard from '@/components/Dashboard';

import Main from '@/components/Main';
import React from 'react';

export const metadata = {
  title: "Moodap.Dashboard",
}

function DashboardPage() {
  return <Main><Dashboard/></Main>;
}

export default DashboardPage;
