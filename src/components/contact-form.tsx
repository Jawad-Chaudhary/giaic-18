"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { Textarea } from "@/components/ui/textarea"
import { client } from "@/sanity/lib/client";

const formSchema = z.object({
  firstName: z.string().min(1, { message: "First name should be atleast 1 charachter. " }).max(50, { message: "First name should be atmost 50 charachters. " }),
  lastName: z.string().min(1, { message: "Last name should be atleast 1 charachter. " }).max(50, { message: "Last name should be atmost 50 charachters. " }),
  email: z.string().email({ message: "Invalid email address. " }),
  message : z.string().min(10, { message: "Message should be atleast 10 charachters. " }).max(1000, { message: "Message should be atmost 1000 charachters. " }),
});

export default function ContactForm() {
  type FormType = z.infer<typeof formSchema>;

  // 1. Define your form schema
  const form = useForm<FormType>({
    resolver: zodResolver(formSchema), //resolver is used to show error message in form
    defaultValues: {firstName: "", lastName: "", email: "", message: ""} //default values for form,
  });
  //2. Define a submit handler. This function will be called when the form is submitted.
  async function onSubmit(values: FormType) {
    await client.create({
      _type: "contactForm",
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      message: values.message,
    })
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-fit border border-gray-200 p-8 rounded-lg bg-slate-100 shadow-lg">
          <div className="flex justify-between space-x-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Firstname</FormLabel>
                <FormControl>
                  <Input placeholder="First Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Last Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          </div>

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />  

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Message</FormLabel>
                <FormControl>
                <Textarea
                  placeholder="Tell us a little bit about yourself"
                  className="resize-none"
                  {...field}
                />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />  
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}
