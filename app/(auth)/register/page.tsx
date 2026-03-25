import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import RegisterForm from '@/components/auth/register-form'

export default async function RegisterPage() {
  const session = await getServerSession(authOptions)
  if (session) redirect('/dashboard')

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">🈶</div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">HSK 学习平台</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">创建账号开始学习</p>
        </div>
        <RegisterForm />
      </div>
    </div>
  )
}
