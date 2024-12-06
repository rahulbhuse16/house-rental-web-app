import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

const AppFormField = ({
  form,
  name,
  label,
  inputType,
  inputPlaceholder,
  isPending = false,
  options = [],
  setValue
}) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            {inputType === "textarea" ? (
              <Textarea placeholder={inputPlaceholder} {...field} />
            ) : inputType === "select" ? (
              <select
                style={{
                   width:400,
                   marginTop:10,
                   height:38,
                   borderColor:'silver',
                   borderWidth:1
                   
                   
                }}
                {...field}
                disabled={isPending}
                className="form-select"
              >
                <option 
                  style={{
                    borderColor:'silver',
                   borderWidth:1
                  }}
                  
                  value="" disabled>
                  {inputPlaceholder}
                </option>
                {options.map((option) => (
                  <option 
                   onClick={()=>setValue(option)}
                    style={{
                      backgroundColor:"#262727",
                      borderColor:'silver',
                   borderWidth:1,
                      
                      
                      color:"white"
                    }}
                    key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            ) : (
              <Input
                placeholder={inputPlaceholder}
                type={inputType}
                {...field}
                disabled={isPending}
              />
            )}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default AppFormField;
