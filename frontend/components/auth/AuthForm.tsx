import React from 'react';

interface AuthFormProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  onSubmit: (e: React.FormEvent) => void;
  submitButtonText: string;
  submitButtonDisabled?: boolean;
  footer?: React.ReactNode;
  error?: string;
  success?: string;
}

const AuthForm: React.FC<AuthFormProps> = ({
  title,
  subtitle,
  children,
  onSubmit,
  submitButtonText,
  submitButtonDisabled = false,
  footer,
  error,
  success,
}) => {
  return (
    <div className="sm:mx-auto sm:w-full sm:max-w-md">
      <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-2 text-center text-sm text-gray-600">
          {subtitle}
        </p>
      )}

      {error && (
        <div className="mt-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded relative" role="alert">
          {error}
        </div>
      )}

      {success && (
        <div className="mt-4 bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded relative" role="alert">
          {success}
        </div>
      )}

      <div className="mt-8 bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form className="space-y-6" onSubmit={onSubmit}>
          {children}
          <div>
            <button
              type="submit"
              disabled={submitButtonDisabled}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {submitButtonDisabled ? `Submitting...` : submitButtonText}
            </button>
          </div>
        </form>

        {footer && (
          <div className="mt-6">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthForm;