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
  HStack,
  Flex,
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
    <>

      <Flex
        h='100%'
        gap={5}
        m={10}
        flexDir='column'
        flexWrap='wrap'
      >

        <Flex
          bg="white"
          boxShadow='md'
          borderRadius="xl"
          w='400px'
        >

          <StatGroup w='500px'>
            <Stat p='5'>
              <Flex justifyContent='center'
                alignContent='center'
                alignItems='center'
                flexDir='column'
              >
                <StatLabel>Profit</StatLabel>
                <StatNumber>345,670$</StatNumber>
                <StatHelpText>
                  <StatArrow type='increase' />
                  23.36%
                </StatHelpText>
              </Flex>
            </Stat>

            <Stat p='5'>
              <Flex justifyContent='center'
                alignContent='center'
                alignItems='center'
                flexDir='column'
              >
                <StatLabel>Loss</StatLabel>
                <StatNumber>450$</StatNumber>
                <StatHelpText>
                  <StatArrow type='decrease' />
                  9.05%
                </StatHelpText>
              </Flex>
            </Stat>
          </StatGroup>

        </Flex >

        <Flex boxSize="sm" bg="white" boxShadow='md' borderRadius="xl" w="100%" >
          <Bar data={barData} options={{ responsive: true, maintainAspectRatio: true }} />
        </Flex>

        <Flex boxSize="sm" bg="white" boxShadow='md' borderRadius="xl" justifyContent='center' p={9} >
          <Doughnut data={pieData} options={{ responsive: true, maintainAspectRatio: true }} />
        </Flex>

      </Flex >

    </>
  );
};

export default Dashboard;
