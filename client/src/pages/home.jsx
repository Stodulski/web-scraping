import { Logout } from '../components/logout'
import { History } from '../components/history'
import { useGetFiles } from '../hooks/useGetFiles'
import { useCreateFile } from '../hooks/useCreateFile'

export const Home = () => {
  const { files, setFiles, loaderRef, hasMore } = useGetFiles()
  const { url, handleUrl, generateCSV } = useCreateFile(files, setFiles)

  return (
    <main className='min-w-full min-h-screen flex flex-col justify-start items-center bg-[#212121]'>
      <Logout />
      <form
        className='grid place-content-center h-[60vh]'
        onSubmit={generateCSV}
      >
        <input
          className='rounded-lg my-5 bg-violet-100 text-lg border-2 border-purple-500 px-4 py-2 placeholder-purple-400 focus:text-violet-950 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-500 w-[90vw] max-w-[650px]'
          placeholder='www.6pm.com/example'
          value={url ?? ''}
          onChange={handleUrl}
        />
        <div className='flex flex-col gap-5 sm:flex-row'>
          <button
            type='submit'
            value='Generate CSV'
            className='w-full bg-violet-100 rounded-lg text-lg px-4 py-2 border-2 border-violet-100 cursor-pointer text-violet-950 font-semibold hover:border-purple-700 focus:ring-1 focus:ring-purple-500 focus:border-purple-700 focus:outline-none disabled:hover:border-violet-100 disabled:text-violet-400 disabled:cursor-not-allowed'
          >
            Create CSV
          </button>
        </div>
      </form>
      <History files={files} setFiles={setFiles} loaderRef={loaderRef} hasMore={hasMore} />
    </main>
  )
}
