import PageContainer from '@jumbo/components/PageComponents/layouts/PageContainer';
import React from 'react';
import TablesList from './TablesList';

export default function Tables() {
  const breadcrumbs = [
    { label: 'Ana Menü', link: '/' },
    { label: 'Masalar', isActive: true },
  ];

  return (
    <PageContainer heading="Masalar" breadcrumbs={breadcrumbs}>
      <TablesList />
    </PageContainer>
  );
}
