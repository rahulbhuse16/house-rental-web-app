import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { sighUpSchema } from "../schema/authSchema";
import { Form } from "@/components/ui/form";
import AppFormField from "@/components/AppFormField";
import { Button } from "@/components/ui/button";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signUP } from "@/Redux/ThunkFunction/Authetication";
import { setAuthRelatedState } from "@/store/authReducer";

const formDetials = [

  {
    name: "email",
    label: "Email",
    inputType: "text",
    inputPlaceholder: "sample@gmail.com",
  },
  {
    name: "password",
    label: "Password",
    inputType: "password",
    inputPlaceholder: "*******",
  },
];

const SignUpForm = () => {
  const authState=useSelector(state=>state.auth.authState)

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const form = useForm({
    resolver: zodResolver(sighUpSchema),
    defaultValues: {
      username: "sara",
      email: authState.email,
      password: authState.password
    },
  });

  const {
    formState: { isSubmitting },
  } = form;
  const handleFormSubmit = (values) => {
    dispatch(signUP({
      username: values.email,
      password: values.password,
      role: authState.role,
    }))
    .unwrap()
    .then((response) => {
       // Adjust this condition based on your actual response structure
        navigate("/login");
      
    })
    .catch((error) => {
      console.error("Error during signup:", error);
    });
  };
  
  const selectAdmin=()=>{
    dispatch(setAuthRelatedState({
      ...authState,
      role:'admin'
    }))
  }
  const selectUser=()=>{
    dispatch(setAuthRelatedState({
      ...authState,
      role:'user'
    }))
  }
  return (
    <Form {...form}>
      <div className="grid gap-4">
        <form
          onSubmit={form.handleSubmit(handleFormSubmit)}
          className="grid gap-2"
        >
          {formDetials.map((formItems) => (
            <AppFormField
              form={form}
              inputPlaceholder={formItems.inputPlaceholder}
              inputType={formItems.inputType}
              label={formItems.label}
              name={formItems.name}
              key={formItems.name}
              isPending={isSubmitting}
            />
          ))}
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            gap: 20,
            marginTop: 20,
            justifyContent: 'center'
          }}>
            <div
              onClick={
                selectAdmin
              }
              onMouseEnter={(e) => (e.target.style.backgroundColor = 'violet')}
              onMouseLeave={(e) => (e.target.style.backgroundColor = 'purple')}

              style={{
                backgroundColor: 'purple',
                padding: 10,
                borderRadius: 8,
                color: "white",
                width: 120,
                justifyContent: "center",
                alignItems: 'center',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'background-color 0.3s ease',
              }} >
              ADMIN

            </div>
            <div

              onClick={
                selectUser

              }
              onMouseEnter={(e) => (e.target.style.backgroundColor = 'violet')}
              onMouseLeave={(e) => (e.target.style.backgroundColor = 'purple')}
              style={{
                backgroundColor: 'purple',
                padding: 10,
                borderRadius: 8,
                color: "white",
                width: 120,
                justifyContent: "center",
                alignItems: 'center',
                textAlign: 'center',
                cursor: 'pointer'
              }} >
              USER

            </div>
          </div>

          <Button type="submit" disabled={isSubmitting} className="w-full mt-6">
            {isSubmitting ? "Loading..." : "Sign Up"}
          </Button>
        </form>
      </div>
    </Form>
  );
};

export default SignUpForm;
