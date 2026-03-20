import BrandLogo from '@/components/BrandLogo';

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 to-blue-800">
      <div className="text-center text-white">
        <div className="mb-4 flex justify-center">
          <BrandLogo size={84} textClassName="text-5xl font-bold text-white" variant="dark" />
        </div>
        <p className="text-xl mb-8">AI-Powered Fitness & Diet Tracking</p>
        <div className="space-y-4">
          <a
            href="/register"
            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
          >
            Get Started
          </a>
          <p className="text-sm">
            Already have an account?{' '}
            <a href="/login" className="underline hover:text-gray-200">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
