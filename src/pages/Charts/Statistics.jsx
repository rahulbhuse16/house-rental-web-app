import React from 'react';
import { Bar, Line, Pie, Doughnut, Scatter, Radar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, ArcElement, PointElement, LineElement, Tooltip, Legend, CategoryScale, LinearScale, RadialLinearScale, Filler, Title } from 'chart.js';
import { useSelector } from 'react-redux';
import BarChartIcon from '@mui/icons-material/BarChart';
import PieChartIcon from '@mui/icons-material/PieChart';
import DonutSmallIcon from '@mui/icons-material/DonutSmall';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

// Register chart.js components
ChartJS.register(
  BarElement, ArcElement, PointElement, LineElement, Tooltip, Legend, 
  CategoryScale, LinearScale, RadialLinearScale, Filler, Title
);

const ChartsPage = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook

  // Example data from the redux state (to be adjusted based on your app's actual state)
  const houseListState = useSelector((state) => state.house.houseListRelatedState);
  const list = houseListState.houseList.houses;
  const villaCount = list?.filter((e) => e.houseType === 'villa').length;
  const apartMentCount = list?.filter((e) => e.houseType === 'apartment').length;
  const bunglowCount = list?.filter((e) => e.houseType === 'bungalow').length;

  const barData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [{
      label: 'Sales ($)',
      data: [1200, 1900, 3000, 5000, 2000, 3000],
      backgroundColor: '#51158c',
    }],
  };

  const pieData = {
    labels: ['Villa', 'Apartment', 'Bunglow'],
    datasets: [{
      label: 'Category Sales',
      data: [villaCount, apartMentCount, bunglowCount],
      backgroundColor: ['#FF4D68', '#FFAA2A', '#00C48C'],
      hoverOffset: 6,
      hoverBackgroundColor: ['#FF69B4', '#FF8C00', '#32CD32'],
    }],
  };

  const lineData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [{
      label: 'Sales Trend',
      data: [1200, 1900, 3000, 5000, 2000, 3000],
      borderColor: '#FF5733',
      backgroundColor: 'rgba(255, 87, 51, 0.2)',
      fill: true,
    }],
  };

  const scatterData = {
    datasets: [{
      label: 'Spatial Data',
      data: [
        { x: 1, y: 3 },
        { x: 2, y: 2 },
        { x: 3, y: 4 },
        { x: 4, y: 6 },
        { x: 5, y: 1 },
      ],
      backgroundColor: 'rgba(255, 99, 132, 0.6)',
      pointBorderColor: 'rgba(255, 99, 132, 1)',
      pointRadius: 5,
    }],
  };

  const radarData = {
    labels: ['Metric 1', 'Metric 2', 'Metric 3', 'Metric 4'],
    datasets: [{
      label: 'Performance',
      data: [65, 59, 90, 81],
      backgroundColor: 'rgba(179,181,198,0.2)',
      borderColor: 'rgba(179,181,198,1)',
      pointBackgroundColor: 'rgba(179,181,198,1)',
      pointBorderColor: '#fff',
    }],
  };

  return (
    <div style={styles.container}>
        <div className="flex items-center justify-between mb-6 ">
        <div style={{
            marginRight:1160
        }} className="flex items-center">
          <ArrowBackIcon
            onClick={() => navigate(-1)}
            style={{ cursor: "pointer", marginRight: 10 }}
          />
          <h5 className="text-4xl font-semibold text-gray-800">
            House Statistics
          </h5>
        </div>
        
      </div>
      
      
      <div style={styles.grid}>
        <div style={styles.chartBlock}>
          <h3 style={styles.title}>Bar Chart</h3>
          <BarChartIcon />
          <Bar data={barData} options={{ responsive: true }} />
        </div>
        <div style={styles.chartBlock}>
          <h3 style={styles.title}>Line Chart</h3>
          <Line data={lineData} options={{ responsive: true }} />
        </div>
        <div style={styles.chartBlock}>
          <h3 style={styles.title}>Pie Chart</h3>
          <PieChartIcon />
          <Pie data={pieData} options={{ responsive: true }} />
        </div>
        <div style={styles.chartBlock}>
          <h3 style={styles.title}>Doughnut Chart</h3>
          <DonutSmallIcon />
          <Doughnut data={pieData} options={{ responsive: true }} />
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
  },
  backButton: {
    marginBottom: '20px',
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '20px',
    width: '100%',
  },
  chartBlock: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '300px',
  },
  title: {
    marginBottom: '20px',
    fontSize: '18px',
  },
};

export default ChartsPage;
