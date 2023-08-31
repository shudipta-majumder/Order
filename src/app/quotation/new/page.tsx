import StepperWrap from "@/components/pageComponents/quotation/StepperWrap";
import axios from "@/lib/axios";

const Quotation = async () => {
  let data = {};
  try {
    const reqPaymentMode = axios.get(`/api/dds/payment/`);
    const reqPriceValidity = axios.get("/api/dds/price_validity/");

    const [resPaymentMode, resPriceValidity] = await Promise.all([
      reqPaymentMode,
      reqPriceValidity,
    ]);
    const paymentModeData = resPaymentMode.data;
    const priceValidityData = resPriceValidity.data;
    if (paymentModeData.code == "200" && priceValidityData.code == "200") {
      data = {
        ...data,
        paymentModeData,
        priceValidityData,
      };
    }
  } catch (error) {
    data = {
      error,
    };
  }
  return <StepperWrap data={data} />;
};

export default Quotation;
