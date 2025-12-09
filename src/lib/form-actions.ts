"use server"

import { InvokeCommand, LambdaClient } from "@aws-sdk/client-lambda"
import { z } from "zod"

interface FormState {
  errors: Record<string, string[]>
  message: string
  success: boolean
}

export async function submitFormAction(formData: FormData): Promise<FormState> {
  const nameRaw = formData.get("contact-form-name")?.toString() ?? ""
  const emailRaw = formData.get("contact-form-email")?.toString() ?? ""
  const subjectRaw = formData.get("contact-form-subject")?.toString() ?? ""
  const messageRaw = formData.get("contact-form-message")?.toString() ?? ""

  const schema = z.object({
    name: z
      .string()
      .min(1, { message: "Name is required" })
      .max(100, { message: "Name too long" }),
    email: z
      .email({ message: "Invalid email address" })
      .max(254, { message: "Email too long" }),
    subject: z
      .string()
      .min(1, { message: "Subject is required" })
      .max(200, { message: "Subject too long" }),
    message: z
      .string()
      .trim()
      .min(1, { message: "Message is required" })
      .max(1000, { message: "Message too long" })
      .transform((val) => val.replace(/<[^>]*>/g, ""))
      .transform((val) => val.replace(/\s+/g, " ")),
  })

  const result = schema.safeParse({
    name: nameRaw,
    email: emailRaw,
    subject: subjectRaw,
    message: messageRaw,
  })

  if (!result.success) {
    console.log("[FormBuilder] Validation error:", result.error.issues)
    return {
      errors: result.error.flatten().fieldErrors,
      message: "Please fix the errors below",
      success: false,
    }
  }

  const payload = JSON.stringify({
    body: JSON.stringify(result.data),
  })

  const lambda = new LambdaClient({
    region: process.env.AWS_REGION || "eu-west-2",
    requestHandler: {
      requestTimeout: 10000,
    },
    maxAttempts: 3,
  })

  try {
    const command = new InvokeCommand({
      FunctionName: process.env.AWS_LAMBDA_CONTACT_FUNCTION,
      Payload: Buffer.from(payload),
    })

    await lambda.send(command)

    return {
      errors: {},
      message: "Message sent successfully!",
      success: true,
    }
  } catch (error) {
    console.error("[FormBuilder] Lambda error:", error)

    return {
      errors: {},
      message: "Failed to send message. Please try again.",
      success: false,
    }
  }
}
