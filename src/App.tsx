import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { HomeScreen } from './components/HomeScreen';
import { SearchScreen } from './components/SearchScreen';
import { PostJobScreen } from './components/PostJobScreen';
import { MyJobsScreen } from './components/MyJobsScreen';
import { MessagesScreen } from './components/MessagesScreen';
import { UserProfileScreen } from './components/UserProfileScreen';
import { PaymentModal } from './components/PaymentModal';
import { Toast } from './components/Toast';
import { MobileFrameWrapper } from './components/MobileFrameWrapper';

const MainAppContent: React.FC = () => {
  const { activeTab } = useApp();

  const renderActiveScreen = () => {
    switch (activeTab) {
      case 'home':
        return <HomeScreen />;
      case 'search':
        return <SearchScreen />;
      case 'post-job':
        return <PostJobScreen />;
      case 'my-jobs':
        return <MyJobsScreen />;
      case 'messages':
        return <MessagesScreen />;
      case 'profile':
        return <UserProfileScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <MobileFrameWrapper>
      <Header />
      <main className="mt-2">
        {renderActiveScreen()}
      </main>
      <BottomNav />
      <PaymentModal />
      <Toast />
    </MobileFrameWrapper>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}
