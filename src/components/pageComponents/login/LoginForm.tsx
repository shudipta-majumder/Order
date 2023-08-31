"use client";
import SimpleBackdrop from "@/components/common/SimpleBackdrop";
import theme from "@/utility/theme/theme";
import { yupResolver } from "@hookform/resolvers/yup";
import LoginIcon from "@mui/icons-material/Login";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import {
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { signIn } from "next-auth/react";
import NextImage from "next/image";
import NextLink from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";

const schema = yup.object({
  userId: yup.string().required().label("User ID"),
  password: yup
    .string()
    .required()
    .min(8, "Password min 8 character")
    .label("Password"),
});

const defaultValues = {
  userId: "",
  password: "",
};

interface IFormInput {
  userId: string;
  password: string;
}

interface PasswordType {
  password: string;
  showPassword: boolean;
}

const LoginForm = () => {
  const [backdropOpen, setBackdropOpen] = useState(false);
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");
  const router = useRouter();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setBackdropOpen(true);
    const result = await signIn("credentials", {
      ...data,
      redirect: false,
      callbackUrl: "/",
    });
    if (result.error === null && result && result?.ok) {
      setBackdropOpen(false);
      toast.success("Welcome! Your login was successful.");
      router.push(`/${redirect ? redirect : "/"}`);
      router.refresh();
    } else {
      setBackdropOpen(false);
      toast.error(result?.error);
    }
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });

  const [values, setValues] = useState<PasswordType>({
    password: "",
    showPassword: false,
  });

  const handleChange =
    (prop: keyof PasswordType) => (event: ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  return (
    <>
      {backdropOpen && <SimpleBackdrop />}
      <Box className="h-[calc(100vh-64px)] flex justify-center items-center">
        <Box
          className="max-w-md relative before:top-[-79px] before:content-[''] before:left-[-46px] before:w-[238px] before:h-[234px] before:absolute before:z-[-1] after:bottom-[-54px] after:content-[''] after:right-[-57px] after:w-[180px] after:h-[180px] after:absolute after:z-[-1]"
          sx={{
            "&:before": {
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='239' height='234' viewBox='0 0 239 234' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='88.5605' y='0.700195' width='149' height='149' rx='19.5' stroke='%23${theme.palette.primary.main.slice(
                1
              )}' stroke-opacity='0.16'/%3E%3Crect x='0.621094' y='33.761' width='200' height='200' rx='10' fill='%23${theme.palette.primary.main.slice(
                1
              )}' fill-opacity='0.08'/%3E%3C/svg%3E")`,
            },

            "&:after": {
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='181' height='181' viewBox='0 0 181 181' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='1.30469' y='1.44312' width='178' height='178' rx='19' stroke='%23${theme.palette.primary.main.slice(
                1
              )}' stroke-opacity='0.16' stroke-width='2' stroke-dasharray='8 8'/%3E%3Crect x='22.8047' y='22.9431' width='135' height='135' rx='10' fill='%23${theme.palette.primary.main.slice(
                1
              )}' fill-opacity='0.08'/%3E%3C/svg%3E")`,
            },
          }}
        >
          <Card variant="outlined" className="pt-4 pb-4">
            <NextLink href="/quotation">
              <Box component="figure">
                <NextImage
                  src="/images/logo/logo.png"
                  width="100"
                  height="100"
                  alt="logo"
                  className="m-auto"
                />
              </Box>
            </NextLink>
            <CardContent>
              <Typography variant="h6" className="mb-4">
                <Typography
                  variant="h5"
                  component="span"
                  className="font-semibold"
                >
                  {" "}
                  Sign in
                </Typography>{" "}
                <br />
                to continue to{" "}
                <Typography component="span" variant="h6" className="font-bold">
                  &quot;Corporate Price Quotation!&quot;
                </Typography>
              </Typography>
              <Box
                component="form"
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit(onSubmit)}
              >
                <Controller
                  name="userId"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      size="small"
                      label="User ID"
                      margin="dense"
                      error={!!errors.userId?.message}
                      helperText={errors.userId?.message}
                    />
                  )}
                />
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => {
                    return (
                      <TextField
                        {...field}
                        label="Password"
                        onChange={(e) => {
                          field.onChange(e);
                          handleChange("password");
                        }}
                        type={values.showPassword ? "text" : "password"}
                        fullWidth
                        size="small"
                        margin="dense"
                        error={!!errors.password?.message}
                        helperText={errors.password?.message}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                edge="end"
                                onClick={handleClickShowPassword}
                                onMouseDown={(e) => e.preventDefault()}
                              >
                                {values.showPassword ? (
                                  <VisibilityOffRoundedIcon />
                                ) : (
                                  <VisibilityRoundedIcon />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    );
                  }}
                />
                <Button
                  variant="contained"
                  startIcon={<LoginIcon />}
                  fullWidth
                  size="small"
                  type="submit"
                  className="mt-4"
                >
                  Login
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </>
  );
};

export default LoginForm;
