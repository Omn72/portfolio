
import React, { useEffect } from 'react';
import Layout from '../components/Layout';
import SpaceGame from '../components/games/SpaceGame';

const GamePage = () => {
  useEffect(() => {
    // Change document title
    document.title = "CosmicDev | Space Games";
  }, []);

  return (
    <Layout>
      <SpaceGame />
    </Layout>
  );
};

export default GamePage;
