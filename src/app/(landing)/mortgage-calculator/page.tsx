"use client";

import CustomFormSelect from "@/components/form/CustomFormSelect";
import MortgagePaymentChart from "@/components/mortgage-calculator/PaymentBreakdownChart";
import { Button, Form, FormProps, InputNumber } from "antd";
import { useMemo, useState } from "react";

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

type MortgageCalculatorFormType = {
  paymentFrequency: string;
  homePrice: number;
  downPayment: number;
  interestRate: number;
  amortizationPeriod: number;
};

const MortgageCalculator = () => {
  const [form] = Form.useForm<MortgageCalculatorFormType>();
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(0);
  const [principal, setPrincipal] = useState<number>(0);
  const [interest, setInterest] = useState<number>(0);
  const [paymentAmount, setPaymentAmount] = useState<number>(0);

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
  const handleSubmit: FormProps<MortgageCalculatorFormType>["onFinish"] = (
    values
  ) => {
    calculateMortgage();
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

  const memoizedChart = useMemo(() => {
    return (
      <MortgagePaymentChart
        principal={principal}
        interest={interest}
        paymentAmount={paymentAmount}
        paymentFrequency={getPaymentFrequencyLabel()}
      />
    );
  }, [
    principal,
    interest,
    paymentAmount,
    form.getFieldValue("paymentFrequency"),
  ]);

  return (
    <section className="w-full bg-white py-[30px] max-w-7xl mx-auto rounded-xl font-lato">
      <section className="font-lato text-black">
        <h1 className="font-semibold text-[38px] leading-[49.8px]">
          Mortgage Calculator
        </h1>
        <p className="text-lg">
          Estimate your monthly payments and affordability.
        </p>
      </section>

      <section className="mt-10 flex flex-col xl:flex-row gap-10 w-full">
        <Form
          form={form}
          name="MortgageCalculator"
          onFinish={handleSubmit}
          onValuesChange={handleValuesChange}
          autoComplete="off"
          layout="vertical"
          initialValues={{
            paymentFrequency: "Monthly",
            amortizationPeriod: 25,
            interestRate: 5,
          }}
        >
          <div className="flex flex-col w-full xl:w-[400px]">
            <Form.Item<MortgageCalculatorFormType>
              label="Home price"
              name="homePrice"
              rules={[
                {
                  required: true,
                  message: "Please input your home price",
                },
                {
                  type: "number",
                  message: "Home price must be a number",
                },
                {
                  validator: (_, value) =>
                    value >= 0
                      ? Promise.resolve()
                      : Promise.reject(
                          new Error("Home price cannot be negative")
                        ),
                },
              ]}
            >
              <InputNumber<number>
                formatter={currencyFormatter}
                parser={currencyParser}
                onKeyDown={validateNumericInput}
                className="!py-2.5 !w-full border border-[#CBCBCB] !font-poppins"
              />
            </Form.Item>

            <Form.Item<MortgageCalculatorFormType>
              label="Down payment"
              name="downPayment"
              dependencies={["homePrice"]}
              rules={[
                { required: true, message: "Please input your down payment" },
                { type: "number", message: "Down payment must be a number" },
                {
                  validator: (_, value) =>
                    value >= 0
                      ? Promise.resolve()
                      : Promise.reject(
                          new Error("Down payment cannot be negative")
                        ),
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    const homePrice = getFieldValue("homePrice");
                    if (!value || !homePrice || homePrice <= 0) {
                      return Promise.resolve();
                    }

                    const percentOfDownPayment = (value / homePrice) * 100;
                    const requiredMinimumPercent =
                      calculateMinimumDownPayment(homePrice);

                    return Number(percentOfDownPayment.toFixed(2)) >=
                      Number(requiredMinimumPercent.toFixed(2))
                      ? Promise.resolve()
                      : Promise.reject(
                          `Down payment must be at least ${requiredMinimumPercent}%`
                        );
                  },
                }),
              ]}
            >
              <InputNumber<number>
                formatter={currencyFormatter}
                parser={currencyParser}
                onKeyDown={validateNumericInput}
                variant="borderless"
                className="!py-2.5 !w-full border border-[#CBCBCB] !font-poppins !text-black rounded"
                addonAfter={
                  <div className="font-poppins text-base text-black">
                    <span> {downPaymentPercent} </span>
                    <span> % </span>
                  </div>
                }
              />
            </Form.Item>

            <Form.Item<MortgageCalculatorFormType>
              label="Interest rate"
              name="interestRate"
              rules={[
                {
                  required: true,
                  message: "Please input the interest rate",
                },
                {
                  type: "number",
                  message: "Interest rate must be a number",
                },
                {
                  validator: (_, value) =>
                    value > 0
                      ? Promise.resolve()
                      : Promise.reject(
                          new Error("Interest rate must be greater than 0")
                        ),
                },
              ]}
            >
              <InputNumber<number>
                formatter={percentFormatter}
                parser={percentParser}
                onKeyDown={validateNumericInput}
                variant="borderless"
                addonAfter="%"
                className="!py-2.5 !w-full border border-[#CBCBCB] !font-poppins rounded"
              />
            </Form.Item>

            <CustomFormSelect<MortgageCalculatorFormType>
              label="Amortization Period"
              name="amortizationPeriod"
              rules={[
                {
                  required: true,
                  message: "Please input the amortization period",
                },
              ]}
              optionValues={AMORTIZATION_PERIODS}
            />

            <CustomFormSelect<MortgageCalculatorFormType>
              label="Payment Frequency"
              name="paymentFrequency"
              rules={[
                {
                  required: true,
                  message: "Please input the payment frequency",
                },
              ]}
              optionValues={PAYMENT_FREQUENCIES}
            />

            <Form.Item label={null}>
              <Button
                htmlType="submit"
                className="w-full !bg-[#010B18] !border-[#010B18] !py-1 !px-3 !text-white !h-[50px] !rounded-md !font-normal !text-lg !font-lato"
              >
                Update
              </Button>
            </Form.Item>
          </div>
        </Form>

        <div className="w-full xl:max-w-[800px]">{memoizedChart}</div>
      </section>
    </section>
  );
};

export default MortgageCalculator;

