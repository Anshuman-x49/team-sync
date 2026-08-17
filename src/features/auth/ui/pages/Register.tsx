import { Link } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWandMagicSparkles, faUser, faEnvelope, faLock, faShieldHalved } from "@fortawesome/free-solid-svg-icons";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { useRegisterForm } from "../../hooks/useAuth";
import AuthSubmitButton from "../components/AuthSubmitButton";
import SocialButton from "../components/SocialButton";

const Register = () => {
    const {
        register,
        handleSubmit,
        errors,
        passwordStrength,
        getStrengthText,
        onSubmit,
    } = useRegisterForm();

    return (
        <div className="h-screen overflow-hidden bg-(--background) font-['Inter'] text-(--text)">
            {/* Header */}
            <header className="fixed left-0 top-0 z-50 flex w-full items-center justify-between px-6 py-4">
                <div className="text-xl font-bold tracking-tight text-(--primary)">
                    Team Sync
                </div>
            </header>

            {/* Main */}
            <main className="flex h-screen w-full overflow-hidden">
                {/* Left Side */}
                <section className="relative hidden h-full w-[40%] flex-col justify-end overflow-hidden border-r border-(--border) bg-linear-to-br from-(--surface-low) to-(--surface-high) p-10 md:flex lg:p-12">
                    {/* Background image */}
                    <div className="absolute inset-0">
                        <img
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCKFssbCNBW8f-0tJgLllgAqAWDBNzNAy3bF5hZHj6AqDD0XL_akzAHMKZFk5xWYQCr3oSIZzV4OS7NZLkSQR6c-ww1c2h5EV8j_DX_4vZ9IeWDEVRbo697BVSHU-H4hr95r0PaC86EEhuuzAtjPVfxhuXT1cV2QpxAMeB_h_yELwhUs3PDszkwE2osVYRL8EbHGlrvBMAAw19qBCzcVr8KGwWB55RmaRlIKT-_tIv2KO6pLY79Dq6eYB0hTHWbcC2VvDIkov6jF2Av"
                            alt="Neural network visualization"
                            className="h-full w-full object-cover opacity-40 mix-blend-luminosity"
                        />

                        <div className="absolute inset-0 bg-linear-to-t from-(--background) via-transparent to-transparent" />
                    </div>

                    {/* Left Content */}
                    <div className="relative z-10 space-y-3">
                        <div className="flex items-center gap-2 text-(--primary)">
                            <FontAwesomeIcon icon={faWandMagicSparkles} className="text-sm text-(--primary)" />

                            <span className="text-[11px] font-semibold uppercase tracking-[0.2em]">
                                Next-Gen Intelligence
                            </span>
                        </div>

                        <h1 className="max-w-md text-2xl font-bold leading-tight tracking-tight lg:text-3xl">
                            Accelerate your team's intelligence.
                        </h1>

                        <p className="max-w-sm text-sm leading-5 text-(--text-muted)">
                            Connect your enterprise data to our specialized AI models and
                            unlock unparalleled strategic insights in seconds.
                        </p>

                        {/* Stats */}
                        <div className="flex gap-8 pt-4 opacity-60">
                            <div className="flex flex-col">
                                <span className="text-lg font-bold">99.9%</span>
                                <span className="text-xs text-(--text-muted)">
                                    Uptime SLA
                                </span>
                            </div>

                            <div className="flex flex-col">
                                <span className="text-lg font-bold">ISO</span>
                                <span className="text-xs text-(--text-muted)">
                                    27001 Certified
                                </span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Right Side */}
                <section className="flex h-full w-full items-center justify-center bg-(--background) px-6 py-8 md:w-[60%] md:px-12 lg:px-16 overflow-y-auto md:overflow-hidden">
                    <div className="w-full max-w-110">
                        {/* Heading */}
                        <div className="mb-5 space-y-1">
                            <h2 className="text-2xl font-bold tracking-tight">
                                Create your account
                            </h2>

                            <p className="text-xs text-(--text-muted)">
                                Experience the future of collaborative data intelligence.
                            </p>
                        </div>

                        {/* Form */}
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="space-y-4"
                        >
                            {/* Name */}
                            <div>
                                <label
                                    htmlFor="name"
                                    className="mb-1 block text-[11px] font-semibold uppercase tracking-wider text-(--text-muted)"
                                >
                                    Full Name
                                </label>

                                <div className="relative">
                                    <FontAwesomeIcon icon={faUser} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs text-(--text-muted)" />

                                    <input
                                        id="name"
                                        type="text"
                                        placeholder="Enter your full name"
                                        {...register("name", {
                                            required: "Full name is required",
                                            minLength: {
                                                value: 2,
                                                message: "Name must contain at least 2 characters",
                                            },
                                        })}
                                        className={`w-full rounded-lg border bg-(--surface-low) py-2.5 pl-10 pr-4 text-sm text-(--text) outline-none transition placeholder:text-(--text-muted) focus:border-transparent focus:ring-2 focus:ring-(--primary) ${errors.name
                                            ? "border-(--error)"
                                            : "border-(--border)"
                                            }`}
                                    />
                                </div>

                                {errors.name && (
                                    <p className="mt-1 text-xs text-(--error)">
                                        {errors.name.message}
                                    </p>
                                )}
                            </div>

                            {/* Email */}
                            <div>
                                <label
                                    htmlFor="email"
                                    className="mb-1 block text-[11px] font-semibold uppercase tracking-wider text-(--text-muted)"
                                >
                                    Email Address
                                </label>

                                <div className="relative">
                                    <FontAwesomeIcon icon={faEnvelope} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs text-(--text-muted)" />

                                    <input
                                        id="email"
                                        type="email"
                                        placeholder="name@company.com"
                                        {...register("email", {
                                            required: "Email address is required",
                                            pattern: {
                                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                                message: "Enter a valid email address",
                                            },
                                        })}
                                        className={`w-full rounded-lg border bg-(--surface-low) py-2.5 pl-10 pr-4 text-sm text-(--text) outline-none transition placeholder:text-(--text-muted) focus:border-transparent focus:ring-2 focus:ring-(--primary) ${errors.email
                                            ? "border-(--error)"
                                            : "border-(--border)"
                                            }`}
                                    />
                                </div>

                                {errors.email && (
                                    <p className="mt-1 text-xs text-(--error)">
                                        {errors.email.message}
                                    </p>
                                )}
                            </div>

                            {/* Password */}
                            <div>
                                <label
                                    htmlFor="password"
                                    className="mb-1 block text-[11px] font-semibold uppercase tracking-wider text-(--text-muted)"
                                >
                                    Password
                                </label>

                                <div className="relative">
                                    <FontAwesomeIcon icon={faLock} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs text-(--text-muted)" />

                                    <input
                                        id="password"
                                        type="password"
                                        placeholder="••••••••"
                                        {...register("password", {
                                            required: "Password is required",
                                            minLength: {
                                                value: 8,
                                                message: "Password must be at least 8 characters",
                                            },
                                        })}
                                        className={`w-full rounded-lg border bg-(--surface-low) py-2.5 pl-10 pr-4 text-sm text-(--text) outline-none transition placeholder:text-(--text-muted) focus:border-transparent focus:ring-2 focus:ring-(--primary) ${errors.password
                                            ? "border-(--error)"
                                            : "border-(--border)"
                                            }`}
                                    />
                                </div>

                                {errors.password && (
                                    <p className="mt-1 text-xs text-(--error)">
                                        {errors.password.message}
                                    </p>
                                )}

                                {/* Password Strength */}
                                <div className="flex flex-col gap-1 pt-1.5">
                                    <div className="flex gap-1">
                                        {[1, 2, 3, 4].map((item) => (
                                            <div
                                                key={item}
                                                className={`h-1 flex-1 rounded-full ${item <= passwordStrength
                                                    ? "bg-(--primary)"
                                                    : "bg-(--border)/40"
                                                    }`}
                                            />
                                        ))}
                                    </div>

                                    <span className="text-[11px] text-(--primary)">
                                        {getStrengthText()}
                                    </span>
                                </div>
                            </div>

                            {/* Terms */}
                            <div className="flex items-start gap-2.5 py-0.5">
                                <input
                                    id="terms"
                                    type="checkbox"
                                    {...register("terms", {
                                        required: "You must accept the terms",
                                    })}
                                    className="mt-0.5 h-4 w-4 rounded border-(--border) bg-(--surface-low) text-(--primary) focus:ring-(--primary)"
                                />

                                <label
                                    htmlFor="terms"
                                    className="text-xs leading-relaxed text-(--text-muted)"
                                >
                                    I agree to the{" "}
                                    <a
                                        href="#"
                                        className="text-(--primary) hover:underline"
                                    >
                                        Terms of Service
                                    </a>{" "}
                                    and{" "}
                                    <a
                                        href="#"
                                        className="text-(--primary) hover:underline"
                                    >
                                        Privacy Policy
                                    </a>
                                    .
                                </label>
                            </div>

                            {errors.terms && (
                                <p className="-mt-2 text-xs text-(--error)">
                                    {errors.terms.message}
                                </p>
                            )}

                            {/* Submit */}
                            <AuthSubmitButton label="Create Account" />
                        </form>

                        {/* Divider */}
                        <div className="flex items-center gap-4 py-3">
                            <div className="h-px flex-1 bg-(--border)/30" />

                            <span className="text-[11px] font-semibold uppercase tracking-wider text-(--text-muted)">
                                Or continue with
                            </span>

                            <div className="h-px flex-1 bg-(--border)/30" />
                        </div>

                        {/* SSO */}
                        <div className="grid grid-cols-2 gap-4">
                            <SocialButton label="Google" icon={faGoogle} />
                            <SocialButton label="SSO" icon={faShieldHalved} />
                        </div>

                        {/* Login */}
                        <div className="pt-4 text-center">
                            <p className="text-sm text-(--text-muted)">
                                Already have an account?{" "}
                                <Link
                                    to="/auth/login"
                                    className="ml-1 font-bold text-(--primary) hover:underline"
                                >
                                    Log In
                                </Link>
                            </p>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}

export default Register;