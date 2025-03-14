import { ThemedInput } from "@/components/ThemedInput";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { ThemedButton } from "@/components/ThemedButton";
import { ThemedInputHorizontal } from "@/components/ThemedInputHorizontal";
import { CollapsibleSection } from "@/components/CollapsibleSection";

import { StackedBarChart } from "react-native-chart-kit";
import { Dimensions, useColorScheme } from "react-native";

import { useEffect, useState, useContext } from "react";
import { ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { router } from "expo-router";

import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";

import {
  CalculateRetirement,
  GetRetirement,
} from "@/hooks/auth/retirementHandler";

import { ServerContext } from "@/hooks/conText/ServerConText";
import { AuthContext } from "@/hooks/conText/AuthContext";
import { UserContext } from "@/hooks/conText/UserContext";
import axios from "axios";

// Helper to convert text into a number or fallback to 0
function safeNumber(text: string): number | string {
  // Allow empty input, a single dot, or numbers that end with a dot, so that the user can type decimals.
  if (text === "" || text === "." || /^[0-9]+\.$/.test(text)) {
    return text;
  }
  const n = parseFloat(text);
  return isNaN(n) ? 0 : n;
}

const screenWidth = Dimensions.get("window").width;

export default function Retire_form() {
  const theme = useColorScheme();
  const textColor = theme === "dark" ? "#F2F2F2" : "#2F2F2F";
  const backgroundColor = theme === "dark" ? "#2F2F2F" : "#F2F2F2";

  // Context
  const { URL } = useContext(ServerContext);
  const auth = useContext(AuthContext);
  const { setRetire, userID } = useContext(UserContext);

  // State
  const [step, setStep] = useState<number>(0);

  // Form 1
  const [currentAge, setCurrentAge] = useState<number | string>(0);
  const [ageToRetire, setAgeToRetire] = useState<number | string>(0);
  const [ageAfterRetire, setAgeAfterRetire] = useState<number | string>(0);

  // Form 2
  const [currentIncome, setCurrentIncome] = useState<number | string>(0);
  const [currentExpenses, setCurrentExpenses] = useState<number | string>(0);
  const [expectedRateFromSaving, setExpectedRateFromSaving] = useState<
    number | string
  >(5);
  const [monthlySalary, setMonthlySalary] = useState<number | string>(0);
  const [inflationRate, setInflationRate] = useState<number | string>(0);
  const [expectedRateFromSaving2, setExpectedRateFromSaving2] = useState<
    number | string
  >(5);

  // Form 3
  const [isSocialSecurityFund, setIsSocialSecurityFund] =
    useState<boolean>(false);
  const [startWorkingAge, setStartWorkingAge] = useState<number | string>(0);
  const [currentWorkingYear, setCurrentWorkingYear] = useState<number | string>(
    0
  );
  const [salaryIncreaseRate, setSalaryIncreaseRate] = useState<number | string>(
    0
  );

  const [isNationalSavingsFund, setIsNationalSavingsFund] =
    useState<boolean>(false);
  const [ageSavingsStarted, setAgeSavingsStarted] = useState<number | string>(
    0
  );
  const [savingsAmount, setSavingsAmount] = useState<number | string>(0);

  const [isProvidentFund, setIsProvidentFund] = useState<boolean>(false);
  const [salaryIncreaseRate2, setSalaryIncreaseRate2] = useState<
    number | string
  >(0);
  const [savingsRate, setSavingsRate] = useState<number | string>(0);
  const [contributionRate, setContributionRate] = useState<number | string>(0);
  const [investmentReturnRate, setInvestmentReturnRate] = useState<
    number | string
  >(0);
  const [accumulatedMoney, setAccumulatedMoney] = useState<number | string>(0);
  const [employeeContributions, setEmployeeContributions] = useState<
    number | string
  >(0);
  const [accumulatedBenefits, setAccumulatedBenefits] = useState<
    number | string
  >(0);
  const [contributionBenefits, setContributionBenefits] = useState<
    number | string
  >(0);

  const [isRetirementMutualFund, setIsRetirementMutualFund] =
    useState<boolean>(false);
  const [currentBalanceRMF, setCurrentBalanceRMF] = useState<number | string>(
    0
  );
  const [RMFInvestmentAmount, setRMFInvestmentAmount] = useState<
    number | string
  >(0);
  const [rateOfReturn, setRateOfReturn] = useState<number | string>(0);

  const [isSuperSavingsFund, setIsSuperSavingsFund] = useState<boolean>(false);
  const [currentBalanceSSF, setCurrentBalanceSSF] = useState<number | string>(
    0
  );
  const [SSFInvestmentAmount, setSSFInvestmentAmount] = useState<
    number | string
  >(0);
  const [rateOfReturn2, setRateOfReturn2] = useState<number | string>(0);

  const [isGovernmentPensionFund, setIsGovernmentPensionFund] =
    useState<boolean>(false);
  const [yearStartedWorking, setYearStartedWorking] = useState<number | string>(
    0
  );
  const [currentYear, setCurrentYear] = useState<number | string>(0);
  const [savingsRate2, setSavingsRate2] = useState<number | string>(0);
  const [contributionRate2, setContributionRate2] = useState<number | string>(
    0
  );
  const [rateOfReturn3, setRateOfReturn3] = useState<number | string>(0);
  const [accumulatedMoney2, setAccumulatedMoney2] = useState<number | string>(
    0
  );
  const [employeeContributions2, setEmployeeContributions2] = useState<
    number | string
  >(0);
  const [compensation, setCompensation] = useState<number | string>(0);
  const [initialMoney, setInitialMoney] = useState<number | string>(0);
  const [accumulatedBenefits2, setAccumulatedBenefits2] = useState<
    number | string
  >(0);
  const [contributionBenefits2, setContributionBenefits2] = useState<
    number | string
  >(0);
  const [compensationBenefits, setCompensationBenefits] = useState<
    number | string
  >(0);
  const [initialBenefits, setInitialBenefits] = useState<number | string>(0);

  const [isLifeInsurance, setIsLifeInsurance] = useState<boolean>(false);
  const [lifeInsuranceFund, setLifeInsuranceFund] = useState<number | string>(
    0
  );

  // Calculated retirement values
  const [totalNeededAtRetirement, setTotalNeededAtRetirement] = useState<
    number | string
  >(0);
  const [totalFundFV, setTotalFundFV] = useState<number | string>(0);
  const [netShortfallAtRetirement, setNetShortfallAtRetirement] = useState<
    number | string
  >(0);
  const [monthlySavingNeeded, setMonthlySavingNeeded] = useState<
    number | string
  >(0);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleFinish = async () => {
    setIsLoading(true);
    await axios
      .post(
        `${URL}/splitpayments/retirement`,
        {
          user_id: userID,
          amount_allocated: monthlySavingNeeded,
        },
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      )
      .then(async (response) => {
        if (response.data.success) {
          await GetRetirement(URL, auth?.token!).then((res) => {
            if (res.success && "result" in res) {
              setRetire([res.result]);
            }
          });
          console.log("Split payment success:", response.data);
          router.back();
        } else {
          console.log("Split payment failed:", response.data.message);
        }
        setIsLoading(false);
      });
  };

  const calculate_retirement = () => {
    setIsLoading(true);
    CalculateRetirement(
      URL,
      {
        currentAge: Number(currentAge),
        retirementAge: Number(ageToRetire),
        lifeExpectancy: Number(ageAfterRetire),
        monthlySalary: Number(currentIncome),
        monthlyExpenses: Number(currentExpenses),
        expectedReturn: Number(expectedRateFromSaving) / 100,
        monthlyExpensePostRetirement: Number(monthlySalary),
        inflationRate: Number(inflationRate) / 100,
        expectedPostRetirementReturn: Number(expectedRateFromSaving2) / 100,
        socialSecurityFunds: isSocialSecurityFund
          ? [
              {
                startWorkingYear: Number(startWorkingAge),
                currentYear: Number(currentWorkingYear),
                salaryIncreaseRate: Number(salaryIncreaseRate) / 100,
              },
            ]
          : [],
        nsfFunds: isNationalSavingsFund
          ? [
              {
                ageStarted: Number(ageSavingsStarted),
                savingsPerYear: Number(savingsAmount),
              },
            ]
          : [],
        pvdFunds: isProvidentFund
          ? [
              {
                salaryIncreaseRate: Number(salaryIncreaseRate2) / 100,
                savingsRate: Number(savingsRate) / 100,
                contributionRate: Number(contributionRate) / 100,
                investmentReturnRate: Number(investmentReturnRate) / 100,
                accumulatedMoney: Number(accumulatedMoney),
                employeeContributions: Number(employeeContributions),
                accumulatedBenefits: Number(accumulatedBenefits),
                contributionBenefits: Number(contributionBenefits),
              },
            ]
          : [],
        rmfFunds: isRetirementMutualFund
          ? [
              {
                currentBalance: Number(currentBalanceRMF),
                annualInvestment: Number(RMFInvestmentAmount),
                rateOfReturn: Number(rateOfReturn) / 100,
              },
            ]
          : [],
        ssfFunds: isSuperSavingsFund
          ? [
              {
                currentBalance: Number(currentBalanceSSF),
                annualInvestment: Number(SSFInvestmentAmount),
                rateOfReturn: Number(rateOfReturn2) / 100,
              },
            ]
          : [],
        gpfFunds: isGovernmentPensionFund
          ? [
              {
                yearStartedWorking: Number(yearStartedWorking),
                currentYear: Number(currentYear),
                savingsRate: Number(savingsRate2) / 100,
                contributionRate: Number(contributionRate2) / 100,
                rateOfReturn: Number(rateOfReturn3) / 100,
                accumulatedMoney: Number(accumulatedMoney2),
                employeeContributions: Number(employeeContributions2),
                compensation: Number(compensation),
                initialMoney: Number(initialMoney),
                accumulatedBenefits: Number(accumulatedBenefits2),
                contributionBenefits: Number(contributionBenefits2),
                compensationBenefits: Number(compensationBenefits),
                initialBenefits: Number(initialBenefits),
              },
            ]
          : [],
        lifeInsurance: isLifeInsurance
          ? [
              {
                currentValue: Number(lifeInsuranceFund),
              },
            ]
          : [],
      },
      auth?.token!
    ).then((res) => {
      if ("totalNeededAtRetirement" in res) {
        console.log(
          res.totalNeededAtRetirement,
          res.totalFundFV,
          res.netShortfallAtRetirement,
          res.monthlySavingNeeded
        );
        setTotalNeededAtRetirement(res.totalNeededAtRetirement ?? 0);
        setTotalFundFV(res.totalFundFV ?? 0);
        setNetShortfallAtRetirement(res.netShortfallAtRetirement ?? 0);
        setMonthlySavingNeeded(res.monthlySavingNeeded ?? 0);
        setStep(step + 1);
      } else {
        console.log("Retirement calculation failed:", res);
        alert("Retirement calculation failed some fields are missing");
      }
      setIsLoading(false);
    });
  };

  const [chartData, setChartData] = useState<{
    labels: string[];
    legend: string[];
    data: number[][];
    barColors: string[];
  } | null>(null);

  useEffect(() => {
    let accumulated = 0;
    let year = 0;

    const labels: string[] = [];
    const data: number[][] = [];

    while (
      accumulated < Number(totalNeededAtRetirement) &&
      Number(ageToRetire) - Number(currentAge) > year
    ) {
      year++;
      accumulated += Number(monthlySavingNeeded) * 12;

      const inflationPortion =
        accumulated * (Number(expectedRateFromSaving) / 100);

      data.push([accumulated - inflationPortion, inflationPortion]);

      labels.push(`${year}`);
    }

    const stackedData = {
      labels, // ["ปีที่ 1", "ปีที่ 2", ...]
      legend: ["เงินสะสม", "เงินเฟ้อ"],
      data, // [[accumulated, inflation], [accumulated, inflation], ...]
      barColors: ["#3ED07D", "#CDA82C"],
    };

    setChartData(stackedData);
  }, [
    totalNeededAtRetirement,
    monthlySavingNeeded,
    ageToRetire,
    currentAge,
    inflationRate,
  ]);

  return (
    <ThemedView className="h-full !justify-start">
      {/* Stage */}
      {step !== 3 && (
        <ThemedView className="flex-row justify-around w-full py-5">
          <ThemedView className="w-28">
            {step <= 0 ? (
              step === 0 ? (
                <AntDesign
                  key={"loading1"}
                  name="loading2"
                  size={44}
                  color="#CEB036"
                  className="animate-spin-ease"
                />
              ) : (
                <Entypo name="circle" size={44} color="#2B9348" />
              )
            ) : (
              <AntDesign name="checkcircle" size={44} color="#2B9348" />
            )}
            <ThemedText className="font-bold">AGE</ThemedText>
          </ThemedView>
          <ThemedView className="w-28">
            {step <= 1 ? (
              step === 1 ? (
                <AntDesign
                  key={"loading2"}
                  name="loading2"
                  size={44}
                  color="#CEB036"
                  className="animate-spin-ease"
                />
              ) : (
                <Entypo name="circle" size={44} color="#2B9348" />
              )
            ) : (
              <AntDesign name="checkcircle" size={44} color="#2B9348" />
            )}
            <ThemedText className="font-bold">FINANCE</ThemedText>
          </ThemedView>
          <ThemedView className="w-28">
            {step <= 2 ? (
              step === 2 ? (
                <AntDesign
                  key={"loading3"}
                  name="loading2"
                  size={44}
                  color="#CEB036"
                  className="animate-spin-ease"
                />
              ) : (
                <Entypo name="circle" size={44} color="#2B9348" />
              )
            ) : (
              <AntDesign name="checkcircle" size={44} color="#2B9348" />
            )}
            <ThemedText className="font-bold">INVESTMENT</ThemedText>
          </ThemedView>
        </ThemedView>
      )}

      <KeyboardAvoidingView
        style={{
          width: "100%",
          height: step === 3 ? "85%" : "70%",
        }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 150 : 100}
      >
        <ScrollView
          contentContainerStyle={{
            alignItems: "center",
            width: "100%",
          }}
        >
          {/* Form 1 */}
          {step === 0 && (
            <ThemedView className="w-full px-5 gap-10">
              <ThemedView className="w-[80%] flex-row !justify-between">
                <ThemedView className="w-[60%]">
                  <ThemedInput
                    title="Current Age"
                    className="w-full"
                    keyboardType="numeric"
                    value={currentAge.toString()}
                    onChangeText={(text) => setCurrentAge(safeNumber(text))}
                  />
                </ThemedView>
                <ThemedText className="text-2xl font-bold mt-5">
                  years
                </ThemedText>
              </ThemedView>
              <ThemedView className="w-[80%] flex-row !justify-between">
                <ThemedView className="w-[60%]">
                  <ThemedInput
                    title="Age to Retire"
                    className="w-full"
                    keyboardType="numeric"
                    value={ageToRetire.toString()}
                    onChangeText={(text) => setAgeToRetire(safeNumber(text))}
                  />
                </ThemedView>
                <ThemedText className="text-2xl font-bold mt-5">
                  years
                </ThemedText>
              </ThemedView>
              <ThemedView className="w-[80%] flex-row !justify-between">
                <ThemedView className="w-[60%]">
                  <ThemedInput
                    title="Age after Retire"
                    className="w-full"
                    keyboardType="numeric"
                    value={ageAfterRetire.toString()}
                    onChangeText={(text) => setAgeAfterRetire(safeNumber(text))}
                  />
                </ThemedView>
                <ThemedText className="text-2xl font-bold mt-5">
                  years
                </ThemedText>
              </ThemedView>
            </ThemedView>
          )}

          {/* Form 2 */}
          {step === 1 && (
            <ThemedView className="w-full px-5 gap-10 pb-10">
              <ThemedText className="text-3xl font-bold w-[80%]">
                Period Before Retirement
              </ThemedText>
              <ThemedView className="w-[80%] flex-row !justify-between">
                <ThemedView className="w-[60%]">
                  <ThemedInput
                    title="Current Income"
                    className="w-full"
                    keyboardType="numeric"
                    value={currentIncome.toString()}
                    onChangeText={(text) => setCurrentIncome(safeNumber(text))}
                  />
                </ThemedView>
                <ThemedText className="text-2xl font-bold mt-5">
                  Baht/Month
                </ThemedText>
              </ThemedView>
              <ThemedView className="w-[80%] flex-row !justify-between">
                <ThemedView className="w-[60%]">
                  <ThemedInput
                    title="Current Expenses"
                    className="w-full"
                    keyboardType="numeric"
                    value={currentExpenses.toString()}
                    onChangeText={(text) =>
                      setCurrentExpenses(safeNumber(text))
                    }
                  />
                </ThemedView>
                <ThemedText className="text-2xl font-bold mt-6">
                  Baht/Month
                </ThemedText>
              </ThemedView>
              <ThemedView className="w-[80%] flex-row !justify-between">
                <ThemedView className="w-[60%]">
                  <ThemedInput
                    title="Expected rate from saving"
                    className="w-full"
                    keyboardType="numeric"
                    value={expectedRateFromSaving.toString()}
                    onChangeText={(text) =>
                      setExpectedRateFromSaving(safeNumber(text))
                    }
                  />
                </ThemedView>
                <ThemedText className="text-2xl font-bold mt-14">
                  %/year
                </ThemedText>
              </ThemedView>
              <ThemedText className="text-3xl font-bold w-[80%] mt-5">
                Period After Retirement
              </ThemedText>
              <ThemedView className="w-[80%] flex-row !justify-between">
                <ThemedView className="w-[60%]">
                  <ThemedInput
                    title="Monthly salary"
                    className="w-full"
                    keyboardType="numeric"
                    value={monthlySalary.toString()}
                    onChangeText={(text) => setMonthlySalary(safeNumber(text))}
                  />
                </ThemedView>
                <ThemedText className="text-2xl font-bold mt-5">
                  Baht/Month
                </ThemedText>
              </ThemedView>
              <ThemedView className="w-[80%] flex-row !justify-between">
                <ThemedView className="w-[60%]">
                  <ThemedInput
                    title="Inflation rate"
                    className="w-full"
                    keyboardType="numeric"
                    value={inflationRate.toString()}
                    onChangeText={(text) => setInflationRate(safeNumber(text))}
                  />
                </ThemedView>
                <ThemedText className="text-2xl font-bold mt-6">
                  %/year
                </ThemedText>
              </ThemedView>
              <ThemedView className="w-[80%] flex-row !justify-between">
                <ThemedView className="w-[60%]">
                  <ThemedInput
                    title="Expected rate from saving"
                    className="w-full"
                    keyboardType="numeric"
                    value={expectedRateFromSaving2.toString()}
                    onChangeText={(text) =>
                      setExpectedRateFromSaving2(safeNumber(text))
                    }
                  />
                </ThemedView>
                <ThemedText className="text-2xl font-bold mt-14">
                  %/year
                </ThemedText>
              </ThemedView>
            </ThemedView>
          )}

          {/* Form 3 */}
          {step === 2 && (
            <ThemedView className="px-5 ">
              <CollapsibleSection
                title="Social Security Fund"
                onToggle={(isOpen) => setIsSocialSecurityFund(isOpen)}
                disabled={isNationalSavingsFund}
              >
                <ThemedInputHorizontal
                  title="Start working age"
                  className="w-full"
                  unit="years(B.E.)"
                  keyboardType="numeric"
                  value={startWorkingAge.toString()}
                  onChangeText={(text) => setStartWorkingAge(safeNumber(text))}
                />
                <ThemedInputHorizontal
                  title="Current working year"
                  className="w-full"
                  unit="years(B.E.)"
                  keyboardType="numeric"
                  value={currentWorkingYear.toString()}
                  onChangeText={(text) =>
                    setCurrentWorkingYear(safeNumber(text))
                  }
                />
                <ThemedInputHorizontal
                  title="Salary increase rate"
                  className="w-full"
                  unit="%/years"
                  keyboardType="numeric"
                  value={salaryIncreaseRate.toString()}
                  onChangeText={(text) =>
                    setSalaryIncreaseRate(safeNumber(text))
                  }
                />
              </CollapsibleSection>
              <CollapsibleSection
                title="National Savings Fund (NSF)"
                onToggle={(isOpen) => setIsNationalSavingsFund(isOpen)}
                disabled={
                  isSocialSecurityFund ||
                  isProvidentFund ||
                  isGovernmentPensionFund
                }
              >
                <ThemedInputHorizontal
                  title="Age savings started"
                  className="w-full"
                  unit="years"
                  keyboardType="numeric"
                  value={ageSavingsStarted.toString()}
                  onChangeText={(text) =>
                    setAgeSavingsStarted(safeNumber(text))
                  }
                />
                <ThemedInputHorizontal
                  title="Savings amount"
                  className="w-full"
                  unit="years(B.E.)"
                  keyboardType="numeric"
                  value={savingsAmount.toString()}
                  onChangeText={(text) => setSavingsAmount(safeNumber(text))}
                />
              </CollapsibleSection>
              <CollapsibleSection
                title="Provident Fund (PVD)"
                onToggle={(isOpen) => setIsProvidentFund(isOpen)}
                disabled={isNationalSavingsFund || isGovernmentPensionFund}
              >
                <ThemedInputHorizontal
                  title="Salary increase rate"
                  className="w-full"
                  unit="%/year"
                  keyboardType="numeric"
                  value={salaryIncreaseRate2.toString()}
                  onChangeText={(text) =>
                    setSalaryIncreaseRate2(safeNumber(text))
                  }
                />
                <ThemedInputHorizontal
                  title="Savings rate"
                  className="w-full"
                  unit="%/Month"
                  keyboardType="numeric"
                  value={savingsRate.toString()}
                  onChangeText={(text) => setSavingsRate(safeNumber(text))}
                />
                <ThemedInputHorizontal
                  title="Contribution rate"
                  className="w-full"
                  unit="%/Month"
                  keyboardType="numeric"
                  value={contributionRate.toString()}
                  onChangeText={(text) => setContributionRate(safeNumber(text))}
                />
                <ThemedInputHorizontal
                  title="Investment return rate"
                  className="w-full"
                  unit="%/year"
                  keyboardType="numeric"
                  value={investmentReturnRate.toString()}
                  onChangeText={(text) =>
                    setInvestmentReturnRate(safeNumber(text))
                  }
                />
                <ThemedText className="font-bold">
                  Latest amount of money in the fund
                </ThemedText>
                <ThemedInputHorizontal
                  title="Accumulated money"
                  className="w-full"
                  unit="Baht"
                  keyboardType="numeric"
                  value={accumulatedMoney.toString()}
                  onChangeText={(text) => setAccumulatedMoney(safeNumber(text))}
                />
                <ThemedInputHorizontal
                  title="Employee contributions"
                  className="w-full"
                  unit="Baht"
                  keyboardType="numeric"
                  value={employeeContributions.toString()}
                  onChangeText={(text) =>
                    setEmployeeContributions(safeNumber(text))
                  }
                />
                <ThemedInputHorizontal
                  title="Accumulated benefits"
                  className="w-full"
                  unit="Baht"
                  keyboardType="numeric"
                  value={accumulatedBenefits.toString()}
                  onChangeText={(text) =>
                    setAccumulatedBenefits(safeNumber(text))
                  }
                />
                <ThemedInputHorizontal
                  title="Contribution benefits"
                  className="w-full"
                  unit="Baht"
                  keyboardType="numeric"
                  value={contributionBenefits.toString()}
                  onChangeText={(text) =>
                    setContributionBenefits(safeNumber(text))
                  }
                />
              </CollapsibleSection>
              <CollapsibleSection
                title="Retirement Mutual Fund (RMF)"
                onToggle={(isOpen) => setIsRetirementMutualFund(isOpen)}
              >
                <ThemedInputHorizontal
                  title="Current balance RMF"
                  className="w-full"
                  unit="Baht"
                  keyboardType="numeric"
                  value={currentBalanceRMF.toString()}
                  onChangeText={(text) =>
                    setCurrentBalanceRMF(safeNumber(text))
                  }
                />
                <ThemedInputHorizontal
                  title="RMF investment amount"
                  className="w-full"
                  unit="Baht/year"
                  keyboardType="numeric"
                  value={RMFInvestmentAmount.toString()}
                  onChangeText={(text) =>
                    setRMFInvestmentAmount(safeNumber(text))
                  }
                />
                <ThemedInputHorizontal
                  title="Rate of return"
                  className="w-full"
                  unit="%/year"
                  keyboardType="numeric"
                  value={rateOfReturn.toString()}
                  onChangeText={(text) => setRateOfReturn(safeNumber(text))}
                />
              </CollapsibleSection>
              <CollapsibleSection
                title="Super Savings Fund (SSF)"
                onToggle={(isOpen) => setIsSuperSavingsFund(isOpen)}
              >
                <ThemedInputHorizontal
                  title="Current balance SSF"
                  className="w-full"
                  unit="Baht"
                  keyboardType="numeric"
                  value={currentBalanceSSF.toString()}
                  onChangeText={(text) =>
                    setCurrentBalanceSSF(safeNumber(text))
                  }
                />
                <ThemedInputHorizontal
                  title="SSF investment amount"
                  className="w-full"
                  unit="Baht/Month"
                  keyboardType="numeric"
                  value={SSFInvestmentAmount.toString()}
                  onChangeText={(text) =>
                    setSSFInvestmentAmount(safeNumber(text))
                  }
                />
                <ThemedInputHorizontal
                  title="Rate of return"
                  className="w-full"
                  unit="%/year"
                  keyboardType="numeric"
                  value={rateOfReturn2.toString()}
                  onChangeText={(text) => setRateOfReturn2(safeNumber(text))}
                />
              </CollapsibleSection>
              <CollapsibleSection
                title="Government Pension Fund (GPF)"
                onToggle={(isOpen) => setIsGovernmentPensionFund(isOpen)}
                disabled={isNationalSavingsFund}
              >
                <ThemedInputHorizontal
                  title="Year started working"
                  className="w-full"
                  unit="%/year"
                  keyboardType="numeric"
                  value={yearStartedWorking.toString()}
                  onChangeText={(text) =>
                    setYearStartedWorking(safeNumber(text))
                  }
                />
                <ThemedInputHorizontal
                  title="Current year"
                  className="w-full"
                  unit="%/month"
                  keyboardType="numeric"
                  value={currentYear.toString()}
                  onChangeText={(text) => setCurrentYear(safeNumber(text))}
                />
                <ThemedInputHorizontal
                  title="Savings rate"
                  className="w-full"
                  unit="%/month"
                  keyboardType="numeric"
                  value={savingsRate2.toString()}
                  onChangeText={(text) => setSavingsRate2(safeNumber(text))}
                />
                <ThemedInputHorizontal
                  title="Contribution rate"
                  className="w-full"
                  unit="%/year"
                  keyboardType="numeric"
                  value={contributionRate2.toString()}
                  onChangeText={(text) =>
                    setContributionRate2(safeNumber(text))
                  }
                />
                <ThemedInputHorizontal
                  title="Rate of return"
                  className="w-full"
                  unit="%/year"
                  keyboardType="numeric"
                  value={rateOfReturn3.toString()}
                  onChangeText={(text) => setRateOfReturn3(safeNumber(text))}
                />
                <ThemedText className="font-bold">
                  Latest amount of money in the fund
                </ThemedText>
                <ThemedInputHorizontal
                  title="Accumulated money"
                  className="w-full"
                  unit="Baht"
                  keyboardType="numeric"
                  value={accumulatedMoney2.toString()}
                  onChangeText={(text) =>
                    setAccumulatedMoney2(safeNumber(text))
                  }
                />
                <ThemedInputHorizontal
                  title="Employee contributions"
                  className="w-full"
                  unit="Baht"
                  keyboardType="numeric"
                  value={employeeContributions2.toString()}
                  onChangeText={(text) =>
                    setEmployeeContributions2(safeNumber(text))
                  }
                />
                <ThemedInputHorizontal
                  title="Compensation"
                  className="w-full"
                  unit="Baht"
                  keyboardType="numeric"
                  value={compensation.toString()}
                  onChangeText={(text) => setCompensation(safeNumber(text))}
                />
                <ThemedInputHorizontal
                  title="Initial money (if any)"
                  className="w-full"
                  unit="Baht"
                  keyboardType="numeric"
                  value={initialMoney.toString()}
                  onChangeText={(text) => setInitialMoney(safeNumber(text))}
                />
                <ThemedInputHorizontal
                  title="Accumulated benefits"
                  className="w-full"
                  unit="Baht"
                  keyboardType="numeric"
                  value={accumulatedBenefits2.toString()}
                  onChangeText={(text) =>
                    setAccumulatedBenefits2(safeNumber(text))
                  }
                />
                <ThemedInputHorizontal
                  title="Contribution benefits"
                  className="w-full"
                  unit="Baht"
                  keyboardType="numeric"
                  value={contributionBenefits2.toString()}
                  onChangeText={(text) =>
                    setContributionBenefits2(safeNumber(text))
                  }
                />
                <ThemedInputHorizontal
                  title="Compensation benefits"
                  className="w-full"
                  unit="Baht"
                  keyboardType="numeric"
                  value={compensationBenefits.toString()}
                  onChangeText={(text) =>
                    setCompensationBenefits(safeNumber(text))
                  }
                />
                <ThemedInputHorizontal
                  title="Initial benefits (if any)"
                  className="w-full"
                  unit="Baht"
                  keyboardType="numeric"
                  value={initialBenefits.toString()}
                  onChangeText={(text) => setInitialBenefits(safeNumber(text))}
                />
              </CollapsibleSection>
              <CollapsibleSection
                title="Life Insurance"
                onToggle={(isOpen) => setIsLifeInsurance(isOpen)}
              >
                <ThemedInputHorizontal
                  title="Life insurance fund"
                  className="w-full"
                  unit="Baht"
                  keyboardType="numeric"
                  value={lifeInsuranceFund.toString()}
                  onChangeText={(text) =>
                    setLifeInsuranceFund(safeNumber(text))
                  }
                />
              </CollapsibleSection>
            </ThemedView>
          )}

          {/* Result */}
          {step === 3 && (
            <ThemedView className="w-full gap-10 ">
              <ThemedView>
                <ThemedText>
                  Must save to retire according to plan per month
                </ThemedText>
                <ThemedView className="flex-row gap-5 !items-end py-5">
                  <ThemedText className="text-5xl font-bold !text-[#36CE85]">
                    {monthlySavingNeeded.toLocaleString("en-EN", {
                      maximumFractionDigits: 0,
                    })}
                  </ThemedText>
                  <ThemedText className="pb-1 text-xl !text-[#36CE85] font-bold">
                    BAht
                  </ThemedText>
                </ThemedView>
              </ThemedView>
              <ScrollView horizontal>
                <ThemedView className="w-full">
                  {chartData && (
                    <StackedBarChart
                      key={chartData.labels.join("-")}
                      decimalPlaces={0}
                      data={chartData}
                      width={Math.max(
                        screenWidth - 20,
                        chartData.labels.length * 50
                      )}
                      height={250}
                      yAxisLabel="฿"
                      yAxisSuffix=""
                      yLabelsOffset={-40}
                      hideLegend={true}
                      chartConfig={{
                        backgroundGradientFrom:
                          theme === "dark" ? "#2F2F2F" : "#F2F2F2",
                        backgroundGradientTo:
                          theme === "dark" ? "#2F2F2F" : "#F2F2F2",
                        decimalPlaces: 0,
                        color: (opacity = 1) =>
                          theme === "dark" ? "#36CE85" : "#36CE85",
                        labelColor: (opacity = 1) =>
                          theme === "dark" ? "#F2F2F2" : "#2F2F2F",
                        barPercentage: 1,
                      }}
                      style={{
                        marginVertical: 10,
                        borderRadius: 10,
                        paddingLeft: 30,
                      }}
                    />
                  )}
                </ThemedView>
              </ScrollView>
              <ThemedView className="w-[80%] gap-5">
                <ThemedView className="flex-row w-full !justify-between !items-start">
                  <ThemedText className="max-w-[60%]">
                    Amount of money use after retirement per month
                  </ThemedText>
                  <ThemedText className="font-bold ">
                    {(
                      Number(totalNeededAtRetirement) /
                      ((Number(ageAfterRetire) - Number(ageToRetire)) * 12)
                    ).toLocaleString("en-EN", {
                      maximumFractionDigits: 0,
                    })}{" "}
                    Baht
                  </ThemedText>
                </ThemedView>
                <ThemedView className="flex-row w-full !justify-between !items-start">
                  <ThemedText className="max-w-[60%]">
                    Money you need for retirement
                  </ThemedText>
                  <ThemedText className="font-bold ">
                    {totalNeededAtRetirement.toLocaleString("en-EN", {
                      maximumFractionDigits: 0,
                    })}{" "}
                    Baht
                  </ThemedText>
                </ThemedView>
                <ThemedView className="flex-row w-full !justify-between !items-start">
                  <ThemedText className="max-w-[60%]">
                    Deduct all source of funds accumulated for use after
                    retirement
                  </ThemedText>
                  <ThemedText className="font-bold ">
                    {totalFundFV.toLocaleString("en-EN", {
                      maximumFractionDigits: 0,
                    })}{" "}
                    Baht
                  </ThemedText>
                </ThemedView>
                <ThemedView className="flex-row w-full !justify-between !items-start">
                  <ThemedText className="max-w-[60%]">Still need</ThemedText>
                  <ThemedText className="font-bold ">
                    {(
                      Number(totalNeededAtRetirement) - Number(totalFundFV)
                    ).toLocaleString("en-EN", {
                      maximumFractionDigits: 0,
                    })}{" "}
                    Baht
                  </ThemedText>
                </ThemedView>
                <ThemedView className="flex-row w-full !justify-between !items-start">
                  <ThemedText className="max-w-[60%]">
                    Must save to retire according to plan per month
                  </ThemedText>
                  <ThemedText className="font-bold">
                    {Number(monthlySavingNeeded).toLocaleString("en-EN", {
                      maximumFractionDigits: 0,
                    })}{" "}
                    Baht
                  </ThemedText>
                </ThemedView>
              </ThemedView>
            </ThemedView>
          )}
        </ScrollView>
      </KeyboardAvoidingView>

      {/* BUTTON */}
      <ThemedView className="w-full">
        <ThemedView className="w-[80%] flex-row !justify-around py-5">
          <ThemedButton
            mode="normal"
            className="px-14 py-5"
            onPress={() => {
              step === 0 ? router.back() : setStep(step - 1);
            }}
          >
            {step === 3 ? "Recalculate" : step === 0 ? "cancel" : "back"}
          </ThemedButton>
          <ThemedButton
            isLoading={isLoading}
            mode="confirm"
            className="px-14 py-5"
            onPress={() => {
              step === 3
                ? handleFinish()
                : step === 2
                ? calculate_retirement()
                : setStep(step + 1);
            }}
          >
            {step === 2
              ? !isSocialSecurityFund &&
                !isNationalSavingsFund &&
                !isProvidentFund &&
                !isRetirementMutualFund &&
                !isSuperSavingsFund &&
                !isGovernmentPensionFund &&
                !isLifeInsurance
                ? "Skip and Calculate"
                : "Calculate"
              : step === 3
              ? "Finish Plan"
              : "Next"}
          </ThemedButton>
        </ThemedView>
      </ThemedView>
    </ThemedView>
  );
}
