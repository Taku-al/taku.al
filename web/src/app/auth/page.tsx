'use client';
import { useState } from 'react';

interface FormData {
    email: string;
    password: string;
    confirmPassword: string;
    firstName: string;
    lastName: string;
    phone: string;
}

interface FormErrors {
    email?: string;
    password?: string;
    confirmPassword?: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
}

export default function AuthPage() {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState<FormData>({
        email: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
        phone: ''
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (errors[name as keyof FormErrors]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors: FormErrors = {};

        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        if (!isLogin) {
            if (!formData.firstName) {
                newErrors.firstName = 'First name is required';
            }
            if (!formData.lastName) {
                newErrors.lastName = 'Last name is required';
            }
            if (formData.password !== formData.confirmPassword) {
                newErrors.confirmPassword = 'Passwords do not match';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        setIsLoading(true);
        
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            if (isLogin) {
                console.log('Login attempt:', { email: formData.email, password: formData.password });
                // Handle login logic here
            } else {
                console.log('Registration attempt:', formData);
                // Handle registration logic here
            }
            
            // Reset form
            setFormData({
                email: '',
                password: '',
                confirmPassword: '',
                firstName: '',
                lastName: '',
                phone: ''
            });
            
        } catch (error) {
            console.error('Authentication error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const toggleMode = () => {
        setIsLogin(!isLogin);
        setErrors({});
        setFormData({
            email: '',
            password: '',
            confirmPassword: '',
            firstName: '',
            lastName: '',
            phone: ''
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden" style={{ backgroundColor: '#f2f2f2' }}>
            {/* Professional Trustworthy Background */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Subtle Gradient Overlay */}
                <div className="absolute inset-0 opacity-8" style={{
                    background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 50%, #e2e8f0 100%)'
                }}></div>
                
                {/* Professional Grid Pattern */}
                <div className="absolute inset-0 opacity-3" style={{
                    backgroundImage: `
                        linear-gradient(#3e92cc 1px, transparent 1px),
                        linear-gradient(90deg, #3e92cc 1px, transparent 1px)
                    `,
                    backgroundSize: '40px 40px'
                }}></div>
                
                {/* Trust Elements - Subtle Geometric Shapes */}
                <div className="absolute top-20 left-20 w-16 h-16 rounded-lg opacity-5" style={{ 
                    backgroundColor: '#3e92cc',
                    transform: 'rotate(45deg)'
                }}></div>
                
                <div className="absolute top-32 right-24 w-12 h-12 rounded-full opacity-6" style={{ 
                    backgroundColor: '#2a628f'
                }}></div>
                
                <div className="absolute bottom-32 left-24 w-20 h-20 rounded-lg opacity-4" style={{ 
                    backgroundColor: '#3e92cc',
                    transform: 'rotate(12deg)'
                }}></div>
                
                <div className="absolute bottom-20 right-32 w-14 h-14 rounded-full opacity-5" style={{ 
                    backgroundColor: '#2a628f'
                }}></div>
                
                {/* Professional Accent Lines */}
                <div className="absolute top-1/4 left-0 w-32 h-px opacity-8" style={{ 
                    backgroundColor: '#3e92cc',
                    background: 'linear-gradient(90deg, transparent 0%, #3e92cc 50%, transparent 100%)'
                }}></div>
                
                <div className="absolute bottom-1/4 right-0 w-40 h-px opacity-6" style={{ 
                    backgroundColor: '#2a628f',
                    background: 'linear-gradient(270deg, transparent 0%, #2a628f 50%, transparent 100%)'
                }}></div>
                
                <div className="absolute top-1/2 left-0 w-24 h-px opacity-5" style={{ 
                    backgroundColor: '#3e92cc',
                    background: 'linear-gradient(90deg, transparent 0%, #3e92cc 50%, transparent 100%)'
                }}></div>
                
                {/* Subtle Corner Accents */}
                <div className="absolute top-0 left-0 w-64 h-64 opacity-2" style={{
                    background: 'radial-gradient(circle at top left, #3e92cc 0%, transparent 70%)'
                }}></div>
                
                <div className="absolute bottom-0 right-0 w-80 h-80 opacity-2" style={{
                    background: 'radial-gradient(circle at bottom right, #2a628f 0%, transparent 70%)'
                }}></div>
                
                {/* Professional Border Accent */}
                <div className="absolute inset-0 border border-transparent" style={{
                    background: 'linear-gradient(135deg, transparent 0%, transparent 100%) border-box',
                    borderImage: 'linear-gradient(135deg, transparent 0%, #3e92cc 20%, transparent 40%, transparent 60%, #2a628f 80%, transparent 100%) 1'
                }}></div>
            </div>

            <div className="relative z-10 max-w-md w-full space-y-8">
                {/* Header */}
                <div className="text-center">
                    <h2 className="text-3xl font-bold" style={{ color: '#1E1E1E' }}>
                        {isLogin ? 'Welcome Back' : 'Create Account'}
                    </h2>
                    <p className="mt-2 text-sm" style={{ color: '#9a9696' }}>
                        {isLogin 
                            ? 'Sign in to your account to continue booking' 
                            : 'Join Taku.al to start booking amazing services'
                        }
                    </p>
                </div>

                {/* Form */}
                <div className="bg-white py-8 px-6 shadow-xl rounded-xl border border-gray-100">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {/* Name fields for registration */}
                        {!isLogin && (
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="firstName" className="block text-sm font-medium mb-2" style={{ color: '#1E1E1E' }}>
                                        First Name
                                    </label>
                                    <input
                                        id="firstName"
                                        name="firstName"
                                        type="text"
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                        className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-colors ${
                                            errors.firstName 
                                                ? 'border-red-500 focus:ring-red-500' 
                                                : 'border-gray-300 focus:ring-blue-500'
                                        }`}
                                        placeholder="John"
                                    />
                                    {errors.firstName && (
                                        <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
                                    )}
                                </div>
                                <div>
                                    <label htmlFor="lastName" className="block text-sm font-medium mb-2" style={{ color: '#1E1E1E' }}>
                                        Last Name
                                    </label>
                                    <input
                                        id="lastName"
                                        name="lastName"
                                        type="text"
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                        className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-colors ${
                                            errors.lastName 
                                                ? 'border-red-500 focus:ring-red-500' 
                                                : 'border-gray-300 focus:ring-blue-500'
                                        }`}
                                        placeholder="Doe"
                                    />
                                    {errors.lastName && (
                                        <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium mb-2" style={{ color: '#1E1E1E' }}>
                                Email Address
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-colors ${
                                    errors.email 
                                        ? 'border-red-500 focus:ring-red-500' 
                                        : 'border-gray-300 focus:ring-blue-500'
                                }`}
                                placeholder="john@example.com"
                            />
                            {errors.email && (
                                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                            )}
                        </div>



                        {/* Password */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium mb-2" style={{ color: '#1E1E1E' }}>
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-colors ${
                                    errors.password 
                                        ? 'border-red-500 focus:ring-red-500' 
                                        : 'border-gray-300 focus:ring-blue-500'
                                }`}
                                placeholder="Enter your password"
                            />
                            {errors.password && (
                                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                            )}
                        </div>

                        {/* Confirm Password for registration */}
                        {!isLogin && (
                            <div>
                                <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2" style={{ color: '#1E1E1E' }}>
                                    Confirm Password
                                </label>
                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type="password"
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                    className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-colors ${
                                        errors.confirmPassword 
                                            ? 'border-red-500 focus:ring-red-500' 
                                            : 'border-gray-300 focus:ring-blue-500'
                                    }`}
                                    placeholder="Confirm your password"
                                />
                                {errors.confirmPassword && (
                                    <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
                                )}
                            </div>
                        )}

                        {/* Forgot Password for login */}
                        {isLogin && (
                            <div className="flex items-center justify-end">
                                <a href="#" className="text-sm hover:opacity-80 transition-colors" style={{ color: '#3e92cc' }}>
                                    Forgot your password?
                                </a>
                            </div>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl text-sm font-medium text-white transition-all duration-300 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            style={{ 
                                backgroundColor: '#3e92cc'
                            }}
                        >
                            {isLoading ? (
                                <div className="flex items-center">
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                    {isLogin ? 'Signing In...' : 'Creating Account...'}
                                </div>
                            ) : (
                                isLogin ? 'Sign In' : 'Create Account'
                            )}
                        </button>

                        {/* Social Login */}
                        <div className="mt-6">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-300" />
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-white" style={{ color: '#9a9696' }}>
                                        Or continue with
                                    </span>
                                </div>
                            </div>

                            <div className="mt-6 space-y-3">
                                {/* Apple Sign In */}
                                <button
                                    type="button"
                                    className="w-full inline-flex justify-center items-center py-3 px-4 border border-gray-300 rounded-xl shadow-sm bg-black text-sm font-medium transition-all duration-300 hover:bg-gray-800"
                                >
                                    <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="white">
                                        <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"/>
                                    </svg>
                                    <span className="text-white">Continue with Apple</span>
                                </button>

                                {/* Google Sign In */}
                                <button
                                    type="button"
                                    className="w-full inline-flex justify-center items-center py-3 px-4 border border-gray-300 rounded-xl shadow-sm bg-white text-sm font-medium transition-all duration-300 hover:bg-gray-50"
                                >
                                    <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                                    </svg>
                                    <span style={{ color: '#1E1E1E' }}>Continue with Google</span>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>

                {/* Toggle Mode */}
                <div className="text-center">
                    <p className="text-sm" style={{ color: '#9a9696' }}>
                        {isLogin ? "Don't have an account?" : "Already have an account?"}
                        <button
                            onClick={toggleMode}
                            className="ml-1 font-medium hover:opacity-80 transition-colors"
                            style={{ color: '#3e92cc' }}
                        >
                            {isLogin ? 'Sign up' : 'Sign in'}
                        </button>
                    </p>
                </div>

                {/* Back to Home */}
                <div className="text-center">
                    <a 
                        href="/" 
                        className="text-sm hover:opacity-80 transition-colors"
                        style={{ color: '#9a9696' }}
                    >
                        ← Back to Home
                    </a>
                </div>
            </div>
        </div>
    );
}
