"use client";

import CustomFormSelect from "@/components/form/CustomFormSelect";
import MortgagePaymentChart from "@/components/mortgage-calculator/PaymentBreakdownChart";
import {
  MortgageCalculatorFormType,
  useMortgageCalculator,
} from "@/hooks/useMortgageCalculator";
import { Button, Form, InputNumber } from "antd";
import { useMemo } from "react";

const MortgageCalculator = () => {
  const {
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
  } = useMortgageCalculator();

  const memoizedChart = useMemo(() => {
    return (
      <MortgagePaymentChart
        principal={principal}
        interest={interest}
        paymentAmount={paymentAmount}
        paymentFrequency={getPaymentFrequencyLabel()}
      />
    );
  }, [principal, interest, form.getFieldValue("paymentFrequency")]);

  return (
    <section className="w-full bg-white py-[30px] max-w-7xl mx-auto font-lato">
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

        <div id="chart_container" className="w-full xl:max-w-[800px]">
          {memoizedChart}
        </div>
      </section>
    </section>
  );
};

export default MortgageCalculator;

