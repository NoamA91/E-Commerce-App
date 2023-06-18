import React from 'react';
import {
  Box,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
  VStack,
  Center,
  Container,
} from '@chakra-ui/react';
import { Bar, Doughnut } from 'react-chartjs-2';
import { Chart } from 'chart.js';
import { ArcElement, BarElement, CategoryScale, LinearScale, Title } from 'chart.js';

// Register the elements
Chart.register(ArcElement, BarElement, CategoryScale, LinearScale, Title);

const barData = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June'],
  datasets: [
    {
      label: '# of Sales',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: 'teal',
    },
  ],
};

const pieData = {
  labels: ['Red', 'Blue', 'Yellow'],
  datasets: [
    {
      label: '# of Votes',
      data: [300, 50, 100],
      backgroundColor: ['Red', 'Blue', 'Yellow'],
    },
  ],
};

const Dashboard = () => {
  return (
    <Box>
      <StatGroup>
        <Stat>
          <StatLabel>Sent</StatLabel>
          <StatNumber>345,670</StatNumber>
          <StatHelpText>
            <StatArrow type='increase' />
            23.36%
          </StatHelpText>
        </Stat>

        <Stat>
          <StatLabel>Clicked</StatLabel>
          <StatNumber>45</StatNumber>
          <StatHelpText>
            <StatArrow type='decrease' />
            9.05%
          </StatHelpText>
        </Stat>
      </StatGroup>

      <VStack spacing={10}>
        <Container centerContent maxW="container.md" p={5} bg="gray.100" borderRadius="xl">
          <Center>
            <Box boxSize="md">
              <Bar data={barData} options={{ responsive: true, maintainAspectRatio: true }} />
            </Box>
          </Center>
          <Center>
            <Box boxSize="md">
              <Doughnut data={pieData} options={{ responsive: true, maintainAspectRatio: true }} />
            </Box>
          </Center>
        </Container>
      </VStack>
    </Box>


  );
};

export default Dashboard;
