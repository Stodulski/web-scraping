import { useLogin } from '../hooks/useLogin'
export const Login = () => {
  const {
    login,
    handleUsernameChange,
    handlePasswordChange,
    username,
    password
  } = useLogin()
  return (
    <main className='min-w-full min-h-screen grid place-content-center bg-[#212121]'>
      <div className='card px-8 py-6 rounded-lg bg-violet-800 w-72'>
        <h1 className='text-center font-bold text-3xl text-white'>Login</h1>
        <form className='my-6' onSubmit={login}>
          <input
            className='p-2 my-2 rounded w-[100%] focus:outline-violet-600'
            placeholder='Username'
            type='text'
            value={username}
            onChange={handleUsernameChange}
          />
          <input
            className='p-2 my-2 rounded w-[100%] focus:outline-violet-600'
            placeholder='Password'
            type='password'
            value={password}
            onChange={handlePasswordChange}
          />
          <button className='bg-violet-600 hover:bg-violet-500 text-white font-semibold p-2 mt-3 rounded w-[100%]'>
            Login
          </button>
        </form>
      </div>
    </main>
  )
}
