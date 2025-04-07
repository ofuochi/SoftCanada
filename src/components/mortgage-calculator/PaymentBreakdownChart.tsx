import React, { useEffect, useState } from "react";
import { Card, Typography } from "antd";
import { Pie } from "@ant-design/charts";

const { Title, Text } = Typography;

type MortgagePaymentChartProps = {
  principal: number;
  interest: number;
  paymentAmount: number;
  paymentFrequency: string;
  title?: string;
  style?: React.CSSProperties;
};

type ChartDataItem = {
  type: string;
  value: number;
};

/**
 * Reusable Mortgage Payment Chart Component
 * @param {MortgagePaymentChartProps} props - Component props
 * @returns {JSX.Element} - Pie chart showing payment breakdown
 */
const MortgagePaymentChart: React.FC<MortgagePaymentChartProps> = ({
  principal,
  interest,
  paymentAmount,
  paymentFrequency,
  title,
  style = {},
}) => {
  // Use payment frequency for the title if no custom title is provided
  const chartTitle = title || `${paymentFrequency} Payment Breakdown`;

  // Format currency values
  const formatCurrency = (value: number) => {
    return value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const [chartData, setChartData] = useState<ChartDataItem[]>([
    { type: "Principal", value: 0 },
    { type: "Interest", value: 0 },
  ]);

  // Update chart data when props change
  useEffect(() => {
    // Ensure values are numbers and not zero
    const principalValue = Number(principal.toFixed(2));
    const interestValue = Number(interest.toFixed(2));

    // Only set data if we have valid values
    if (principalValue > 0 || interestValue > 0) {
      setChartData([
        { type: "Principal", value: principalValue },
        { type: "Interest", value: interestValue },
      ]);
    }
  }, [principal, interest]);

  // Data for pie chart
  const pieData: ChartDataItem[] = chartData;

  // Pie chart configuration
  const pieConfig = {
    data: pieData,
    angleField: "value",
    colorField: "type",
    // radius: 1,
    innerRadius: 0.6,
    // label: {
    //   text: "value",
    //   style: {
    //     fontWeight: "bold",
    //   },
    // },
    legend: {
      color: {
        title: false,
        position: "right",
        rowPadding: 5,
      },
    },
    interactions: [{ type: "element-selected" }, { type: "element-active" }],
    statistic: {
      title: {
        style: {
          whiteSpace: "pre-wrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          fontSize: 16,
        },
        formatter: () => `${paymentFrequency} Payment`,
      },
      content: {
        style: {
          whiteSpace: "pre-wrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          fontSize: 20,
        },
        formatter: () => `$${formatCurrency(paymentAmount)}`,
      },
    },
    annotations: [
      {
        type: "text",
        style: {
          text: `$${paymentAmount.toFixed(2)} /mo`,
          x: "50%",
          y: "50%",
          textAlign: "center",
          fontSize: 26,
          fontStyle: "bold",
        },
      },
    ],
  };

  return (
    <Card style={{ ...style }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Title level={3}>{chartTitle}</Title>
        <div style={{ width: "100%", height: "400px" }}>
          <Pie {...pieConfig} />
        </div>
        <div style={{ marginTop: "20px" }}>
          <Text strong>Principal: ${formatCurrency(principal)}</Text>
          <br />
          <Text strong>Interest: ${formatCurrency(interest)}</Text>
          <br />
          <Text strong>
            Total {paymentFrequency} Payment: ${formatCurrency(paymentAmount)}
          </Text>
        </div>
      </div>
    </Card>
  );
};

export default MortgagePaymentChart;

