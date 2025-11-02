import React from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { motion } from "framer-motion"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form"
import { Input } from "../../components/ui/input"
import { Textarea } from "../../components/ui/textarea"
import { Button } from "../../components/ui/button"

const schema = z.object({
  title: z.string().min(3, "Enter a valid title"),
  description: z.string().min(10, "Enter at least 10 characters for the description"),
  location: z.string().nonempty("Please enter the location"),
  date: z.string().nonempty("Please enter the date"),
  maxParticipants: z.string().nonempty("Enter maximum participants"),
  currentParticipants: z.string().nonempty("Enter current participants"),
})

export type EventForm = z.infer<typeof schema>

const CreateEvent = () => {
  const form = useForm<EventForm>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      description: "",
      location: "",
      date: "",
      maxParticipants: "",
      currentParticipants: "",
    },
  })

  const onSubmit = async (data: EventForm) => {
    console.log(data)
    const createdRes = await fetch("http://localhost:8080/api/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    const val: any = await createdRes.json()
    console.log(val)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-900 via-neutral-800 to-black px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-xl bg-white/10 backdrop-blur-2xl shadow-2xl rounded-3xl p-10 border border-white/20 mt-8"
      >
        <h1 className="text-4xl font-extrabold text-white text-center mb-6">
          🕶️ Create Your Event
        </h1>
        <p className="text-center text-gray-300 mb-10">
          Fill out the details below to schedule a new event.
        </p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-100 font-semibold">Event Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter event title"
                      className="bg-neutral-900 text-white border border-gray-700 rounded-xl focus:ring-2 focus:ring-gray-400"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-gray-400" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-100 font-semibold">Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter event description"
                      className="bg-neutral-900 text-white border border-gray-700 rounded-xl focus:ring-2 focus:ring-gray-400"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-gray-400" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-100 font-semibold">Location</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter event location"
                      className="bg-neutral-900 text-white border border-gray-700 rounded-xl focus:ring-2 focus:ring-gray-400"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-gray-400" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-100 font-semibold">Date</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      className="bg-neutral-900 text-white border border-gray-700 rounded-xl focus:ring-2 focus:ring-gray-400"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-gray-400" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="maxParticipants"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-100 font-semibold">Max Participants</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter max participants"
                      className="bg-neutral-900 text-white border border-gray-700 rounded-xl focus:ring-2 focus:ring-gray-400"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-gray-400" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="currentParticipants"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-100 font-semibold">Current Participants</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter current participants"
                      className="bg-neutral-900 text-white border border-gray-700 rounded-xl focus:ring-2 focus:ring-gray-400"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-gray-400" />
                </FormItem>
              )}
            />
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="pt-4"
            >
              <Button
                type="submit"
                className="w-full bg-white text-black text-lg font-semibold py-3 rounded-xl shadow-lg hover:bg-gray-200 transition-all"
              >
                Create Event
              </Button>
            </motion.div>
          </form>
        </Form>
      </motion.div>
    </div>
  )
}

export default CreateEvent
