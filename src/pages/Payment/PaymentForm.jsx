import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { formatIndianRupee } from "@/lib/utils";
import { purchaseHouse } from "@/Redux/ThunkFunction/Payment";
import { Navigate, Route, useNavigate, useParams } from "react-router-dom";

const formSchema = z.object({
  email: z.string().email({ message: "Enter a valid email." }),
  cardHolder: z.string().min(3, { message: "Card holder name must be at least 3 characters." }),
  cardDetails: z.string().regex(/^\d{16}$/, { message: "Enter a valid card number." }),
  expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, { message: "Enter a valid expiry date (MM/YY)." }),
  cvc: z.string().length(3, { message: "Enter a valid 3-digit CVC." }),
});

const PaymentForm = ({ price, houseId }) => {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth.authState);
  const email=localStorage.getItem('email')
  const params=useParams()
  const navigate=useNavigate()
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: email,
      cardHolder: "",
      cardDetails: "",
      expiryDate: "",
      cvc: "",
    },
  });

  function onSubmit(values) {
    const {email, cardHolder, cardDetails, expiryDate, cvc } = values;
    console.log({userId: authState.id,
      houseId:params.id,
      cardHolder,
      cardNumber: cardDetails,
      expiryDate,
      cvc,
      email,
      token: authState.token})

    dispatch(
      purchaseHouse({
        email:email,
        userId: authState.id,
        houseId:params.id,
        cardHolder,
        cardNumber: cardDetails,
        expiryDate,
        cvc,
        token: authState.token,
      })
    )
      .unwrap()
      .then((response) => {
        navigate('/admin/dashboard')
        console.log("Success:", response);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
  console.log("email",email)
  return (
    <Form  {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0 py-5">
          <p className="text-xl font-medium font-space">Payment Page</p>
          <p className="text-gray-400">Before proceeding to payment, please review your rental house.</p>

          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      
                     placeholder="sara@gmail.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="cardHolder"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Card Holder</FormLabel>
                  <FormControl>
                    <Input placeholder="Sara" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="cardDetails"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Card Details</FormLabel>
                  <FormControl>
                    <div className="flex gap-2">
                      <Input placeholder="xxxx-xxxx-xxxx-xxxx" {...field} />
                      <Input type="text" className="w-1/4" placeholder="MM/YY" {...form.register("expiryDate")} />
                      <Input type="number" className="w-1/4" placeholder="CVC" {...form.register("cvc")} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-900">Total</p>
              <p className="text-2xl font-semibold text-gray-900 font-space">
                {formatIndianRupee(price || 5000)}
              </p>
            </div>

            <Button 
             
             type="submit" size="lg" className="mt-4 w-full">
              Pay Now
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default PaymentForm;
