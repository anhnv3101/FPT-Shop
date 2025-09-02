import React, { useEffect, useState } from 'react';
import { Spin } from 'antd';

const Loading = () => {
  const [isVisible, setIsVisible] = useState(true);



  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <Spin size="large" />
     
    </div>
  );
};

export default Loading;