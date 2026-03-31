"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useActionState } from "react";
import { loginAction, LoginState } from "@/app/login/actions";
import { ErrorMessage } from "./error-message";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  // state - данные ({error: ...}) из loginAction.  formAction - функция, которая запускает signupAction с данными формы. isPending - true во время выполнения signupAction, иначе false (!!!потенциально можно прикрутить крутилку во время выполнения action).
  const [state, formAction] = useActionState<LoginState | null, FormData>(
    loginAction,
    null
  );

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Войти</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={formAction}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Электронная почта</FieldLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="email@example.com"
                  required
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Пароль</FieldLabel>
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Пароль"
                  required
                />
              </Field>
              {state?.error && <ErrorMessage message={state.error} />}
              <Field>
                <Button type="submit">Войти</Button>
                <FieldDescription className="text-center">
                  Нет аккаунта? <a href="/signup">Зарегистрироваться</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
