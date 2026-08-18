import { useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faArrowLeft,
    faUserPlus,
    faPenToSquare,
    faCheck,
    faUser,
    faEnvelope,
    faBuilding,
    faUserShield,
    faCircleCheck,
    faUpload,
    faTrash,
    faCamera,
} from "@fortawesome/free-solid-svg-icons";
import { useEmployee, type Employee, type EmployeeFormData } from "../../hooks/useEmployee";
import EmployeeAvatar from "../components/EmployeeAvatar";

const AddEmployee = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id?: string }>();
    const isEdit = Boolean(id);

    const { data } = useEmployee();

    // Extract employee list to find target employee if editing
    const employees: Employee[] = useMemo(() => {
        if (!data) return [];
        if (Array.isArray(data)) return data as Employee[];
        if (typeof data === "object") {
            const maybeArr = (data as unknown as { employees?: Employee[] }).employees;
            if (Array.isArray(maybeArr)) return maybeArr;
            if ("name" in data && "email" in data) return [data as Employee];
        }
        return [];
    }, [data]);

    const targetEmployee = useMemo(() => {
        if (!id) return null;
        const decoded = decodeURIComponent(id);
        return employees.find((e) => e.email === decoded || e.name === decoded) || null;
    }, [employees, id]);

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<EmployeeFormData>({
        defaultValues: {
            name: "",
            email: "",
            department: "developer",
            role: "employee",
            status: "active",
            avatar: "",
        },
    });

    const avatarValue = watch("avatar");
    const watchName = watch("name");

    useEffect(() => {
        if (isEdit && targetEmployee) {
            reset({
                name: targetEmployee.name || "",
                email: targetEmployee.email || "",
                department: targetEmployee.department || "developer",
                role: targetEmployee.role || "employee",
                status: targetEmployee.status || "active",
                avatar: targetEmployee.avatar || "",
            });
        }
    }, [isEdit, targetEmployee, reset]);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                alert("File size exceeds 5MB limit");
                return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                if (typeof reader.result === "string") {
                    setValue("avatar", reader.result, { shouldValidate: true });
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveImage = () => {
        setValue("avatar", "", { shouldValidate: true });
    };

    const onFormSubmit = async (formData: EmployeeFormData) => {
        try {
            console.log(isEdit ? "Updating employee:" : "Creating employee:", formData);
            // Simulate / handle API save delay
            await new Promise((res) => setTimeout(res, 300));
            navigate("/home/employee");
        } catch (err) {
            console.error("Failed to save employee:", err);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6 pb-12">
            {/* Top Bar: Back Button & Navigation */}
            <div className="flex items-center justify-between">
                <button
                    type="button"
                    onClick={() => navigate("/home/employee")}
                    className="flex items-center gap-2 rounded-xl border border-(--border) bg-(--surface) px-4 py-2 text-xs font-semibold text-(--text-muted) hover:text-(--text) hover:bg-(--surface-high) transition-all cursor-pointer"
                >
                    <FontAwesomeIcon icon={faArrowLeft} className="h-3.5 w-3.5" />
                    <span>Back to Employees</span>
                </button>
            </div>

            {/* Form Card Header */}
            <div className="rounded-3xl border border-(--border) bg-(--surface) p-6 sm:p-8 shadow-xl space-y-6">
                <div className="flex items-center gap-4 border-b border-(--border) pb-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-(--primary)/15 text-(--primary) border border-(--primary)/20 shrink-0">
                        <FontAwesomeIcon icon={isEdit ? faPenToSquare : faUserPlus} className="h-5 w-5" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-(--text)">
                            {isEdit ? "Edit Employee Record" : "Add New Employee"}
                        </h1>
                        <p className="mt-1 text-sm text-(--text-muted)">
                            {isEdit
                                ? "Modify team member credentials and organizational metadata."
                                : "Create a new employee profile in your team workspace."}
                        </p>
                    </div>
                </div>

                {/* Main Form */}
                <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
                    {/* Avatar Image Picker Box */}
                    <div className="rounded-2xl border border-(--border) bg-(--surface-low) p-5">
                        <label className="block text-xs font-semibold uppercase tracking-wider text-(--text-muted) mb-3">
                            <FontAwesomeIcon icon={faCamera} className="mr-1.5 h-3 w-3 text-(--primary)" />
                            Profile Avatar Image
                        </label>

                        <div className="flex flex-col sm:flex-row items-center gap-5">
                            {/* Live Avatar Preview */}
                            <EmployeeAvatar
                                avatar={avatarValue}
                                name={watchName || "Employee Avatar"}
                                size="xl"
                                className="ring-4 ring-(--border) rounded-2xl shadow-md shrink-0"
                            />

                            <div className="flex-1 space-y-3 text-center sm:text-left w-full">
                                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                                    {/* Upload Image Button */}
                                    <label className="flex items-center gap-2 rounded-xl bg-(--primary) px-4 py-2.5 text-xs font-semibold text-(--on-primary) shadow-sm hover:opacity-90 transition-all cursor-pointer">
                                        <FontAwesomeIcon icon={faUpload} className="h-3.5 w-3.5" />
                                        <span>Upload Image File</span>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageUpload}
                                            className="hidden"
                                        />
                                    </label>

                                    {avatarValue && (
                                        <button
                                            type="button"
                                            onClick={handleRemoveImage}
                                            className="flex items-center gap-1.5 rounded-xl border border-rose-500/30 bg-rose-500/10 px-3.5 py-2.5 text-xs font-semibold text-rose-400 hover:bg-rose-500/20 transition-all cursor-pointer"
                                        >
                                            <FontAwesomeIcon icon={faTrash} className="h-3 w-3" />
                                            <span>Remove Image</span>
                                        </button>
                                    )}
                                </div>

                                <p className="text-xs text-(--text-muted)">
                                    Select an image file (JPG, PNG, GIF, WebP) or paste an image URL below.
                                </p>

                                {/* Direct URL Input */}
                                <input
                                    type="text"
                                    {...register("avatar")}
                                    placeholder="Or paste image URL (e.g. https://images.unsplash.com/...)"
                                    className="w-full rounded-xl border border-(--border) bg-(--surface) px-3.5 py-2 text-xs text-(--text) placeholder:text-(--text-muted) outline-none focus:border-(--primary)"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Full Name & Email Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        {/* Full Name */}
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-(--text-muted) mb-2">
                                <FontAwesomeIcon icon={faUser} className="mr-1.5 h-3 w-3 text-(--primary)" />
                                Full Name <span className="text-rose-400">*</span>
                            </label>
                            <input
                                type="text"
                                {...register("name", {
                                    required: "Full Name is required",
                                    minLength: { value: 2, message: "Name must be at least 2 characters" },
                                })}
                                placeholder="e.g. Netra Rajbanshi"
                                className={`w-full rounded-2xl border px-4 py-3 text-sm text-(--text) placeholder:text-(--text-muted) outline-none transition-all focus:bg-(--surface-high) ${
                                    errors.name ? "border-rose-500 focus:border-rose-500" : "border-(--border) focus:border-(--primary) bg-(--surface-low)"
                                }`}
                            />
                            {errors.name && (
                                <p className="mt-1.5 text-xs text-rose-400 font-medium">{errors.name.message}</p>
                            )}
                        </div>

                        {/* Email Address */}
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-(--text-muted) mb-2">
                                <FontAwesomeIcon icon={faEnvelope} className="mr-1.5 h-3 w-3 text-(--primary)" />
                                Email Address <span className="text-rose-400">*</span>
                            </label>
                            <input
                                type="email"
                                {...register("email", {
                                    required: "Email Address is required",
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "Please enter a valid email address",
                                    },
                                })}
                                placeholder="e.g. netra@gmail.com"
                                className={`w-full rounded-2xl border px-4 py-3 text-sm text-(--text) placeholder:text-(--text-muted) outline-none transition-all focus:bg-(--surface-high) ${
                                    errors.email ? "border-rose-500 focus:border-rose-500" : "border-(--border) focus:border-(--primary) bg-(--surface-low)"
                                }`}
                            />
                            {errors.email && (
                                <p className="mt-1.5 text-xs text-rose-400 font-medium">{errors.email.message}</p>
                            )}
                        </div>
                    </div>

                    {/* Department, Role, Status Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                        {/* Department */}
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-(--text-muted) mb-2">
                                <FontAwesomeIcon icon={faBuilding} className="mr-1.5 h-3 w-3 text-(--primary)" />
                                Department
                            </label>
                            <select
                                {...register("department")}
                                className="w-full rounded-2xl border border-(--border) bg-(--surface-low) px-4 py-3 text-sm text-(--text) outline-none transition-all focus:border-(--primary) cursor-pointer capitalize"
                            >
                                <option value="developer">Developer</option>
                                <option value="engineering">Engineering</option>
                                <option value="design">Design</option>
                                <option value="marketing">Marketing</option>
                                <option value="finance">Finance</option>
                                <option value="hr">HR</option>
                            </select>
                        </div>

                        {/* Role */}
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-(--text-muted) mb-2">
                                <FontAwesomeIcon icon={faUserShield} className="mr-1.5 h-3 w-3 text-(--primary)" />
                                Role
                            </label>
                            <select
                                {...register("role")}
                                className="w-full rounded-2xl border border-(--border) bg-(--surface-low) px-4 py-3 text-sm text-(--text) outline-none transition-all focus:border-(--primary) cursor-pointer capitalize"
                            >
                                <option value="employee">Employee</option>
                                <option value="admin">Admin</option>
                                <option value="manager">Manager</option>
                            </select>
                        </div>

                        {/* Status */}
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-(--text-muted) mb-2">
                                <FontAwesomeIcon icon={faCircleCheck} className="mr-1.5 h-3 w-3 text-(--primary)" />
                                Status
                            </label>
                            <select
                                {...register("status")}
                                className="w-full rounded-2xl border border-(--border) bg-(--surface-low) px-4 py-3 text-sm text-(--text) outline-none transition-all focus:border-(--primary) cursor-pointer"
                            >
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                                <option value="on_leave">On Leave</option>
                            </select>
                        </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="flex items-center justify-end gap-3 border-t border-(--border) pt-6 mt-8">
                        <button
                            type="button"
                            onClick={() => navigate("/home/employee")}
                            className="rounded-2xl border border-(--border) bg-(--surface-low) px-6 py-3 text-sm font-semibold text-(--text-muted) hover:text-(--text) hover:bg-(--surface-high) transition-colors cursor-pointer"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex items-center gap-2 rounded-2xl bg-(--primary) px-7 py-3 text-sm font-semibold text-(--on-primary) shadow-md hover:opacity-90 transition-all cursor-pointer disabled:opacity-50"
                        >
                            <FontAwesomeIcon icon={faCheck} className="h-4 w-4" />
                            <span>{isSubmitting ? "Saving..." : isEdit ? "Save Changes" : "Create Employee"}</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddEmployee;
