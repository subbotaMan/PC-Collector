"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useActionState } from "react";
import { signupAction, SignupState } from "@/app/signup/actions";
import { ErrorMessage } from "./error-message";

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
  // state - данные ({error: ...}) из signupAction.  formAction - функция, которая запускает signupAction с данными формы. isPending - true во время выполнения signupAction, иначе false (!!!потенциально можно прикрутить крутилку во время выполнения action).
  const [state, formAction, isPending] = useActionState<
    SignupState | null,
    FormData
  >(signupAction, null);

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Создать аккаунт</CardTitle>
        <CardDescription>Введите корректные данные</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">Имя</FieldLabel>
              {/* Name Field */}
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="John Doe"
                required
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="email">Электронная почта</FieldLabel>
              {/* Email Field */}
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="email@example.com"
                required
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Пароль</FieldLabel>
              {/* Password Field */}
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Не менее 8 символов"
                required
              />
            </Field>
            {/* Error Field */}
            {state?.error && <ErrorMessage message={state.error} />}
            <FieldGroup>
              <Field>
                <Button type="submit">Создать аккаунт</Button>
                <FieldDescription className="px-6 text-center">
                  Есть аккаунт? <a href="/login">Войти</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
