import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../app/store/store";
import { addEmployee, removeEmployee } from "../state/auth/AuthSlice";
import { loginEmployee } from "../state/auth/AuthActions";

export type LoginFormInputs = {
    email: string;
    password: string;
    remember: boolean;
};

export type RegisterFormInputs = {
    name: string;
    email: string;
    password: string;
    terms: boolean;
};

export const useLoginForm = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<LoginFormInputs>({
        defaultValues: {
            email: "",
            password: "",
            remember: false,
        },
    });

    const onSubmit = (data: LoginFormInputs) => {
        dispatch(loginEmployee(data));
    };

    return {
        register,
        handleSubmit,
        reset,
        errors,
        onSubmit,
    };
};

export const useRegisterForm = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm<RegisterFormInputs>({
        mode: "onChange",
        defaultValues: {
            name: "",
            email: "",
            password: "",
            terms: false,
        },
    });

    const password = watch("password", "");

    const passwordStrength = useMemo(() => {
        let score = 0;
        if (password.length >= 8) score++;
        if (/[A-Z]/.test(password)) score++;
        if (/[0-9]/.test(password)) score++;
        if (/[^A-Za-z0-9]/.test(password)) score++;
        return score;
    }, [password]);

    const getStrengthText = () => {
        if (!password) return "Enter a password";
        if (passwordStrength <= 1) return "Weak password";
        if (passwordStrength === 2) return "Fair password";
        if (passwordStrength === 3) return "Good password";
        return "Strong password";
    };

    const onSubmit = (data: RegisterFormInputs) => {
        console.log("Registration data:", data);
        dispatch(addEmployee({ name: data.name, email: data.email }));
    };

    return {
        register,
        handleSubmit,
        watch,
        reset,
        errors,
        password,
        passwordStrength,
        getStrengthText,
        onSubmit,
    };
};

const useAuth = () => {
    const dispatch = useDispatch<AppDispatch>();
    const authState = useSelector((state: RootState) => state.auth);
    const loginForm = useLoginForm();
    const registerForm = useRegisterForm();

    const logout = () => {
        dispatch(removeEmployee());
    };

    return {
        ...authState,
        logout,
        loginForm,
        registerForm,
        useLoginForm,
        useRegisterForm,
    };
};

export default useAuth;