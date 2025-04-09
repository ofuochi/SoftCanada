import React, { useEffect, useMemo, useState } from "react";
import { Typography } from "antd";
import { Pie } from "@ant-design/charts";

const { Title, Text } = Typography;

type MortgagePaymentChartProps = {
  principal: number;
  interest: number;
  paymentAmount: number;
  paymentFrequency: string;
  title?: string;
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
}) => {
  // Use payment frequency for the title if no custom title is provided
  const chartTitle = title || `${paymentFrequency} Payment Breakdown`;

  // Format currency values
  const formatCurrency = (value: number) => {
    return value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // Data for pie chart
  const pieData: ChartDataItem[] = useMemo(
    () => [
      { type: "Principal", value: Number(principal.toFixed(2)) },
      { type: "Interest", value: Number(interest.toFixed(2)) },
    ],
    [principal, interest]
  );

  // Pie chart configuration
  const pieConfig = {
    data: pieData,
    angleField: "value",
    colorField: "type",
    innerRadius: 0.6,
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
          text: `$${paymentAmount.toFixed(2)}`,
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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Title level={3}>{chartTitle}</Title>
      <div style={{ width: "100%", height: "400px" }}>
        <Pie className={"w-full"} {...pieConfig} />
      </div>
      <div className="mt-5">
        <Text className="!font-poppins !text-base !font-semibold">
          Principal: ${formatCurrency(principal)}
        </Text>
        <br />
        <Text className="!font-poppins !text-base !font-semibold">
          Interest: ${formatCurrency(interest)}
        </Text>
        <br />
        <Text className="!font-poppins !text-base !font-semibold">
          Total {paymentFrequency} Payment: ${formatCurrency(paymentAmount)}
        </Text>
      </div>
    </div>
  );
};

export default MortgagePaymentChart;

