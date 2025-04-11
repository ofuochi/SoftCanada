import { Form, FormProps } from "antd";
import { useEffect, useState } from "react";

// Constants moved to the hook file
const AMORTIZATION_PERIODS = [
  { label: "15 Years", value: "15" },
  { label: "20 Years", value: "20" },
  { label: "25 Years", value: "25" },
  { label: "30 Years", value: "30" },
];

const PAYMENT_FREQUENCIES = [
  { label: "Weekly", value: "Weekly" },
  { label: "Bi-weekly", value: "Bi-weekly" },
  { label: "Monthly", value: "Monthly" },
];

const PAYMENT_FREQUENCY_CONFIG = {
  Weekly: {
    paymentsPerYear: 52,
    label: "Weekly",
  },
  "Bi-weekly": {
    paymentsPerYear: 26,
    label: "Bi-weekly",
  },
  Monthly: {
    paymentsPerYear: 12,
    label: "Monthly",
  },
};

const ALLOWED_KEYS = [
  "Backspace",
  "Delete",
  "ArrowLeft",
  "ArrowRight",
  "Tab",
  "Home",
  "End",
  ".",
  ",",
];

export type MortgageCalculatorFormType = {
  paymentFrequency: string;
  homePrice: number;
  downPayment: number;
  interestRate: number;
  amortizationPeriod: number;
};

export const useMortgageCalculator = () => {
  const [form] = Form.useForm<MortgageCalculatorFormType>();
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(0);
  const [principal, setPrincipal] = useState<number>(0);
  const [interest, setInterest] = useState<number>(0);
  const [paymentAmount, setPaymentAmount] = useState<number>(0);

  const scrollToChartContainer = () => {
    const element = document.getElementById("chart_container");
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  };

  // Utility function for input number formatting
  const currencyFormatter = (value: number | undefined) =>
    `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  const currencyParser = (value: string | undefined) =>
    value?.replace(/\$\s?|(,*)/g, "") as unknown as number;

  const percentFormatter = (value: number | undefined) =>
    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  const percentParser = (value: string | undefined) =>
    value?.replace(/(,*)/g, "") as unknown as number;

  // Handler for key press validation
  const validateNumericInput = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    const isNumber = /^[0-9]$/.test(event.key);
    const isAllowedKey = ALLOWED_KEYS.includes(event.key);

    if (!isNumber && !isAllowedKey) {
      event.preventDefault();
    }
  };

  // Calculate required minimum down payment based on home price
  const calculateMinimumDownPayment = (homePrice: number): number => {
    if (homePrice <= 500000) {
      return 5;
    } else if (homePrice <= 1500000) {
      const amountOfFivePercent = 0.05 * 500000;
      const amountOfTenPercent = 0.1 * (homePrice - 500000);
      const totalAmount = amountOfFivePercent + amountOfTenPercent;
      return Number(((totalAmount / homePrice) * 100).toFixed(2));
    } else {
      return 20;
    }
  };

  const calculateMortgage = (): void => {
    form
      .validateFields()
      .then((values) => {
        const {
          homePrice,
          downPayment,
          interestRate,
          amortizationPeriod,
          paymentFrequency,
        } = values;

        // Calculate principal amount (loan amount)
        const principalAmount: number = homePrice - downPayment;

        // Get payment frequency details
        const frequencyConfig =
          PAYMENT_FREQUENCY_CONFIG[
            paymentFrequency as keyof typeof PAYMENT_FREQUENCY_CONFIG
          ];
        const paymentsPerYear = frequencyConfig.paymentsPerYear;

        // Calculate total number of payments based on frequency
        const totalPayments: number =
          Number(amortizationPeriod) * paymentsPerYear;

        // Calculate periodic interest rate (annual rate divided by payments per year)
        const periodicRate: number = interestRate / 100 / paymentsPerYear;

        // Calculate payment using amortization formula
        const payment: number =
          (principalAmount *
            (periodicRate * Math.pow(1 + periodicRate, totalPayments))) /
          (Math.pow(1 + periodicRate, totalPayments) - 1);

        // For the first payment, calculate interest and principal portions
        const firstInterestPayment = principalAmount * periodicRate;
        const firstPrincipalPayment = payment - firstInterestPayment;

        // Set state values
        setPrincipal(firstPrincipalPayment);
        setInterest(firstInterestPayment);
        setPaymentAmount(payment);
      })
      .catch((errorInfo) => {
        console.log("Failed:", errorInfo);
      });
  };

  const handleSubmit: FormProps<MortgageCalculatorFormType>["onFinish"] =
    () => {
      calculateMortgage();
      scrollToChartContainer();
    };

  // Form value change handler
  const handleValuesChange = (
    changedValues: any,
    allValues: MortgageCalculatorFormType
  ) => {
    const isDownPaymentOrHomePriceChanged =
      "downPayment" in changedValues || "homePrice" in changedValues;

    if (!isDownPaymentOrHomePriceChanged) return;

    const { homePrice, downPayment } = allValues;

    // Only perform calculations if both values exist and are positive
    if (homePrice && downPayment && homePrice > 0 && downPayment > 0) {
      const percentOfDownPayment = (downPayment / homePrice) * 100;
      setDownPaymentPercent(Number(percentOfDownPayment.toFixed(2)));
    } else {
      setDownPaymentPercent(0);
    }
  };

  const getPaymentFrequencyLabel = (): string => {
    const paymentFrequency = form.getFieldValue("paymentFrequency");
    if (!paymentFrequency) return "";

    return (
      PAYMENT_FREQUENCY_CONFIG[
        paymentFrequency as keyof typeof PAYMENT_FREQUENCY_CONFIG
      ]?.label || ""
    );
  };

  useEffect(() => {
    const handleKeyDown = () => {
      form.submit();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    form,
    downPaymentPercent,
    principal,
    interest,
    paymentAmount,
    currencyFormatter,
    currencyParser,
    percentFormatter,
    percentParser,
    validateNumericInput,
    calculateMinimumDownPayment,
    handleSubmit,
    handleValuesChange,
    getPaymentFrequencyLabel,
    AMORTIZATION_PERIODS,
    PAYMENT_FREQUENCIES,
  };
};

