"use client";
import { toast } from "sonner";
import { Button } from "./ui/button"; // Assuming this is your custom Button component
import { useActionState, useState } from "react";
import { Textarea } from "./ui/textarea"; // Assuming this is your custom Textarea component
import MDEditor from "@uiw/react-md-editor";
import { Send } from "lucide-react";
import { formSchema } from "@/lib/validations";
import { z } from "zod"; // Import z for ZodError
import { set } from "sanity";
import { useRouter } from "next/router";

const StartUpForm = () => {
  // State to hold validation errors, mapping field name to error message
  const [errors, setErrors] = useState<Record<string, string>>({});
  // State for the markdown editor content
  const [pitch, setPitch] = useState<string>("");
  const router = useRouter();

  const handleFormSubmit = async (prevState: any, formData: FormData) => {
    // 1. Clear previous errors on a new submission attempt
    setErrors({});

    try {
      const formValues = {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        category: formData.get("category") as string,
        link: formData.get("link") as string,
        pitch, // Use the state value for the pitch
      };

      // 2. Validate the form data asynchronously
      await formSchema.parseAsync(formValues);

      console.log("Validation Successful:", formValues);
      toast.success("Startup pitch submitted successfully! 🚀");

      // TODO: Add your successful form submission logic here (e.g., API call, DB save)

      // Return a success state for useActionState
      return { status: "SUCCESS" };
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors = error.flatten().fieldErrors;
        setErrors(fieldErrors as unknown as Record<string, string>);

        toast.error("Please fix the errors in the form.");

        return { ...prevState, error: "Validation failed", status: "ERROR" };
      }
      toast.error("An unexpected error occurred. Please try again.");

      return {
        ...prevState,
        error: "An unexpected error occurred",
        status: "ERROR",
      };
    }
  };

  // 4. useActionState hook to manage form submission and pending status
  const [state, formAction, isPending] = useActionState(handleFormSubmit, {
    error: "",
    status: "INITIAL",
  });

  return (
    <div>
      {/* 5. Connect the form's action to formAction */}
      <form className="startup-form" action={formAction}>
        {/* Title Field */}
        <div className="flex flex-col">
          <label htmlFor="title" className="startup-form_label">
            Title
          </label>
          <input
            id="title"
            name="title"
            required
            className="startup-form_input"
            type="text"
            placeholder="Startup Title"
          />
          {/* Display error message */}
          {errors.title && <p className="startup-form_error">{errors.title}</p>}
        </div>

        {/* Description Field */}
        <div className="flex flex-col">
          <label htmlFor="description" className="startup-form_label">
            Description
          </label>
          <Textarea
            id="description"
            name="description"
            required
            className="startup-form_textarea"
            placeholder="Startup Description"
          />
          {errors.description && (
            <p className="startup-form_error">{errors.description}</p>
          )}
        </div>

        {/* Category Field */}
        <div className="flex flex-col">
          <label htmlFor="category" className="startup-form_label">
            Category
          </label>
          <input
            id="category"
            name="category"
            required
            className="startup-form_input"
            type="text"
            placeholder="Startup category (technology, healthcare, etc)"
          />
          {errors.category && (
            <p className="startup-form_error">{errors.category}</p>
          )}
        </div>

        {/* Image URL Field */}
        <div className="flex flex-col">
          <label htmlFor="link" className="startup-form_label">
            Image URL
          </label>
          <input
            id="link"
            name="link"
            required
            className="startup-form_input"
            type="text"
            placeholder="Startup Image URL"
          />
          {errors.link && <p className="startup-form_error">{errors.link}</p>}
        </div>

        {/* Pitch Field (Markdown Editor) */}
        <div data-color-mode="light" className="flex flex-col">
          <label htmlFor="pitch" className="startup-form_label">
            Pitch
          </label>
          <MDEditor
            value={pitch}
            id="pitch"
            preview="edit"
            height={400}
            style={{ borderRadius: 20, overflow: "hidden" }}
            textareaProps={{
              placeholder: "briefly describe your startup...",
            }}
            previewOptions={{
              disallowedElements: ["style"],
            }}
            // Update the pitch state on change
            onChange={(value) => setPitch(value ?? "")}
          />

          {errors.pitch && <p className="startup-form_error">{errors.pitch}</p>}
        </div>

        {/* Submit Button */}
        <Button type="submit" className="startup-form_btn" disabled={isPending}>
          {isPending ? "Submitting..." : "Submit"}
          <Send className="size-6 ml-2" />
        </Button>
      </form>
    </div>
  );
};

export default StartUpForm;
